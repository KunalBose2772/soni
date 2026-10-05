import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseServiceRoleKey, getSupabaseUrl } from "@/lib/supabase-config";
import { getPublicImageUrl } from "@/lib/storage-public-url";
import {
  getRegisteredBuckets,
  joinStoragePath,
  splitStoragePath,
  type StoragePathParts,
} from "@/lib/storage-path";

export {
  splitStoragePath,
  joinStoragePath,
  getRegisteredBuckets,
  type StoragePathParts,
} from "@/lib/storage-path";

export const GALLERY_BUCKET = "gallery";

const GALLERY_LEGACY_OPTIONS = { legacyDefaultBucket: GALLERY_BUCKET } as const;

let supabaseAdmin: SupabaseClient | null = null;
const ensuredBuckets = new Set<string>();

function getSupabase(): SupabaseClient {
  if (supabaseAdmin) return supabaseAdmin;

  supabaseAdmin = createClient(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return supabaseAdmin;
}

function resolvePath(fullPath: string, legacy = false): StoragePathParts {
  return splitStoragePath(fullPath, legacy ? GALLERY_LEGACY_OPTIONS : undefined);
}

/** Creates a public bucket if missing (requires service role key). */
export async function ensureStorageBucket(bucketName: string): Promise<void> {
  const bucket = bucketName.trim().toLowerCase();
  if (ensuredBuckets.has(bucket)) return;

  const supabase = getSupabase();
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    throw new Error(`Cannot list storage buckets: ${listError.message}`);
  }

  const exists = buckets?.some((item) => item.name === bucket);
  if (!exists) {
    const { error: createError } = await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
    });

    if (createError && !/already exists/i.test(createError.message)) {
      throw new Error(
        `Failed to create "${bucket}" bucket: ${createError.message}. Create it in Supabase → Storage → New bucket (public).`,
      );
    }
  }

  ensuredBuckets.add(bucket);
}

/** Ensures all buckets listed in SUPABASE_STORAGE_BUCKETS (or defaults). */
export async function ensureRegisteredBuckets(): Promise<void> {
  for (const bucket of getRegisteredBuckets()) {
    await ensureStorageBucket(bucket);
  }
}

/** @deprecated Use ensureStorageBucket("gallery") or ensureRegisteredBuckets(). */
export async function ensureGalleryBucket(): Promise<void> {
  await ensureStorageBucket(GALLERY_BUCKET);
}

/** "Luxury Moving" → "luxury-moving" */
export function categoryNameToSlug(categoryName: string): string {
  return categoryName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Keep original file name; only strip path segments (no rename). */
export function sanitizeFileName(fileName: string): string {
  const base = fileName.split(/[/\\]/).pop()?.trim();
  if (!base || base === "." || base === "..") return "image";
  return base;
}

/** Gallery object path inside the gallery bucket: `gallery/{category}/{file}`. */
export function buildGalleryStoragePath(categoryName: string, fileName: string): string {
  const folder = categoryNameToSlug(categoryName);
  const safeName = sanitizeFileName(fileName);
  return joinStoragePath(GALLERY_BUCKET, `${folder}/${safeName}`);
}

/** @deprecated Use buildGalleryStoragePath */
export const buildStoragePath = buildGalleryStoragePath;

export type GalleryUploadResult = {
  imageUrl: string;
  storagePath: string;
  originalName: string;
};

async function uploadToStorage(
  fullPath: string,
  file: File,
  options?: { legacyPath?: boolean },
): Promise<GalleryUploadResult> {
  const { bucket, filePath, fullPath: canonicalPath } = resolvePath(fullPath, options?.legacyPath);

  await ensureStorageBucket(bucket);

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await getSupabase()
    .storage.from(bucket)
    .upload(filePath, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
    });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  return {
    imageUrl: getPublicImageUrl(canonicalPath),
    storagePath: canonicalPath,
    originalName: file.name,
  };
}

export async function uploadGalleryImage(
  file: File,
  categoryName: string,
): Promise<GalleryUploadResult> {
  const fullPath = buildGalleryStoragePath(categoryName, file.name);
  return uploadToStorage(fullPath, file);
}

export async function deleteStorageObject(fullPath: string): Promise<void> {
  const path = fullPath.trim();
  if (!path) return;

  const { bucket, filePath } = resolvePath(path, true);
  await ensureStorageBucket(bucket);

  const { error } = await getSupabase().storage.from(bucket).remove([filePath]);

  if (error) {
    throw new Error(`Supabase delete failed: ${error.message}`);
  }
}

/** @deprecated Use deleteStorageObject */
export async function deleteGalleryImage(storagePath: string): Promise<void> {
  return deleteStorageObject(storagePath);
}

export async function moveGalleryImage(
  fromPath: string,
  categoryName: string,
  originalFileName: string,
): Promise<GalleryUploadResult> {
  const from = resolvePath(fromPath, true);
  const toFullPath = buildGalleryStoragePath(categoryName, originalFileName);
  const to = resolvePath(toFullPath);

  await ensureStorageBucket(from.bucket);

  if (from.fullPath === to.fullPath) {
    return {
      imageUrl: getPublicImageUrl(to.fullPath),
      storagePath: to.fullPath,
      originalName: originalFileName,
    };
  }

  if (from.bucket !== to.bucket) {
    throw new Error("Cannot move objects across different storage buckets.");
  }

  const { error } = await getSupabase().storage.from(from.bucket).move(from.filePath, to.filePath);

  if (error) {
    throw new Error(`Supabase move failed: ${error.message}`);
  }

  return {
    imageUrl: getPublicImageUrl(to.fullPath),
    storagePath: to.fullPath,
    originalName: originalFileName,
  };
}

export type StoragePathParts = {
  bucket: string;
  filePath: string;
  fullPath: string;
};

const BUCKET_NAME_RE = /^[a-z0-9][a-z0-9-]{0,62}$/i;
const DEFAULT_BUCKETS = ["gallery", "assets", "blogs", "services"] as const;

/** Buckets allowed as the first path segment (from env or defaults). */
export function getRegisteredBuckets(): string[] {
  const fromEnv =
    process.env.SUPABASE_STORAGE_BUCKETS?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKETS?.trim();

  if (fromEnv) {
    return [...new Set(fromEnv.split(",").map((b) => b.trim().toLowerCase()).filter(Boolean))];
  }

  return [...DEFAULT_BUCKETS];
}

export function validateBucketName(bucket: string): void {
  const name = bucket.trim().toLowerCase();
  if (!BUCKET_NAME_RE.test(name)) {
    throw new Error(`Invalid bucket name "${bucket}". Use lowercase letters, numbers, and hyphens.`);
  }
}

export function validateFilePath(filePath: string): void {
  const path = filePath.trim().replace(/^\/+/, "");
  if (!path) {
    throw new Error("Storage file path cannot be empty.");
  }
  if (path.includes("..")) {
    throw new Error(`Invalid storage file path "${filePath}". Path traversal is not allowed.`);
  }
}

/**
 * Parses `bucket/folder/file.ext`.
 * First segment = bucket; remainder = object path inside the bucket.
 *
 * Legacy gallery rows (`office/img.jpg`) resolve with `legacyDefaultBucket: "gallery"`.
 */
export function splitStoragePath(
  fullPath: string,
  options?: { legacyDefaultBucket?: string },
): StoragePathParts {
  const normalized = fullPath.trim().replace(/^\/+/, "").replace(/\/+/g, "/");
  if (!normalized) {
    throw new Error("Storage path cannot be empty.");
  }

  const segments = normalized.split("/").filter(Boolean);
  if (segments.length < 2) {
    throw new Error(
      `Invalid storage path "${fullPath}". Expected format: bucket/folder/file.ext (e.g. assets/logo/logo.png).`,
    );
  }

  const registered = getRegisteredBuckets();
  const first = segments[0].toLowerCase();

  if (registered.includes(first)) {
    const bucket = first;
    const filePath = segments.slice(1).join("/");
    validateBucketName(bucket);
    validateFilePath(filePath);
    return { bucket, filePath, fullPath: `${bucket}/${filePath}` };
  }

  if (options?.legacyDefaultBucket) {
    const bucket = options.legacyDefaultBucket.trim().toLowerCase();
    validateBucketName(bucket);
    validateFilePath(normalized);
    return { bucket, filePath: normalized, fullPath: `${bucket}/${normalized}` };
  }

  throw new Error(
    `Unknown bucket in path "${fullPath}". Register buckets in SUPABASE_STORAGE_BUCKETS or use a known prefix: ${registered.join(", ")}.`,
  );
}

/** Builds a canonical `bucket/path/to/file` string. */
export function joinStoragePath(bucket: string, filePath: string): string {
  const bucketName = bucket.trim().toLowerCase();
  const objectPath = filePath.trim().replace(/^\/+/, "").replace(/\/+/g, "/");
  validateBucketName(bucketName);
  validateFilePath(objectPath);
  return `${bucketName}/${objectPath}`;
}

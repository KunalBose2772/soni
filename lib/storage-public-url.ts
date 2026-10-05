import { getStoragePublicBaseUrl } from "@/lib/supabase-config";
import { splitStoragePath } from "@/lib/storage-path";

/**
 * Server-side / dynamic URLs (admin gallery, DB `storagePath` values).
 * Static site images: use `siteAssets` from `@/lib/site-assets`.
 */
export function getPublicImageUrl(
  relativePath: string,
  options?: { legacyDefaultBucket?: string },
): string {
  const { bucket, filePath } = splitStoragePath(relativePath, options);
  const baseUrl = getStoragePublicBaseUrl();
  const encodedObjectPath = filePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${baseUrl}/${bucket}/${encodedObjectPath}`;
}

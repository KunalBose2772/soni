/** Resolve Supabase project ref from env (DATABASE_URL, DIRECT_URL, or explicit URL). */
export function getSupabaseProjectRef(): string | null {
  const explicit = process.env.SUPABASE_PROJECT_REF?.trim();
  if (explicit) return explicit;

  for (const envKey of ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL", "DATABASE_URL", "DIRECT_URL"]) {
    const value = process.env[envKey];
    if (!value) continue;

    const urlMatch = value.match(/https?:\/\/([a-z0-9]+)\.supabase\.co/i);
    if (urlMatch?.[1]) return urlMatch[1];

    const dbMatch = value.match(/postgres(?:ql)?:\/\/postgres\.([a-z0-9]+)/i);
    if (dbMatch?.[1]) return dbMatch[1];
  }

  return null;
}

export function getSupabaseUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const ref = getSupabaseProjectRef();
  if (ref) return `https://${ref}.supabase.co`;

  throw new Error(
    "Supabase URL not configured. Set NEXT_PUBLIC_SUPABASE_URL in .env (or use a Supabase DATABASE_URL).",
  );
}

/**
 * Public storage base for all site images.
 * .env: NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL
 * Example: https://your-project.supabase.co/storage/v1/object/public
 */
export function getStoragePublicBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BASE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  return `${getSupabaseUrl()}/storage/v1/object/public`;
}

/** Server secret key (new `sb_secret_…` or legacy service_role JWT). */
export function getSupabaseServiceRoleKey(): string {
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_KEY?.trim();

  if (key) return key;

  throw new Error(
    "Missing SUPABASE_SERVICE_ROLE_KEY in .env. Add your secret API key from Supabase → Settings → API Keys.",
  );
}

/** Client-safe publishable key (new `sb_publishable_…` or legacy anon JWT). */
export function getSupabaseAnonKey(): string | null {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    null
  );
}

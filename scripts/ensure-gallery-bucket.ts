import "dotenv/config";

import { ensureRegisteredBuckets, getRegisteredBuckets } from "../lib/supabase-storage";

async function main() {
  await ensureRegisteredBuckets();
  console.log(`Storage buckets ready: ${getRegisteredBuckets().join(", ")}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

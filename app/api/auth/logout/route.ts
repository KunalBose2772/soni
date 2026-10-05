import { clearSessionCookie, applyNoStoreHeaders } from "@/lib/auth";
import { jsonSuccess } from "@/lib/api-utils";

export async function POST() {
  await clearSessionCookie();
  const response = jsonSuccess({});
  return applyNoStoreHeaders(response);
}

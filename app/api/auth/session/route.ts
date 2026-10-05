import { getSession, applyNoStoreHeaders } from "@/lib/auth";
import { jsonSuccess, unauthorized } from "@/lib/api-utils";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return unauthorized();
  }
  const response = jsonSuccess({ session });
  return applyNoStoreHeaders(response);
}

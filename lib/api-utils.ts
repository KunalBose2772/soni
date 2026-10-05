import { NextResponse } from "next/server";

import { applyNoStoreHeaders } from "@/lib/auth";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export function jsonSuccess<T extends Record<string, unknown>>(data: T, status = 200) {
  return NextResponse.json({ success: true, ...data }, { status });
}

export function unauthorized() {
  return applyNoStoreHeaders(jsonError("Unauthorized", 401));
}

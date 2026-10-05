import bcrypt from "bcryptjs";
import { z } from "zod";

import { getSession } from "@/lib/auth";
import { jsonError, jsonSuccess, unauthorized } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(1),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return unauthorized();

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Invalid input", 400);
    }

    const { currentPassword, newPassword, confirmPassword } = parsed.data;

    if (newPassword !== confirmPassword) {
      return jsonError("New password and confirmation do not match", 400);
    }

    const admin = await prisma.admin.findUnique({ where: { id: session.adminId } });
    if (!admin) return unauthorized();

    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid) {
      return jsonError("Current password is incorrect", 400);
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashed },
    });

    return jsonSuccess({ message: "Password updated successfully" });
  } catch {
    return jsonError("Failed to update password", 500);
  }
}

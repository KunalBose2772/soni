import { z } from "zod";

import { getSession } from "@/lib/auth";
import { jsonError, jsonSuccess, unauthorized } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  name: z.string().min(1).max(80),
});

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { id } = await context.params;

  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Category name is required", 400);
    }

    const name = parsed.data.name.trim();
    const duplicate = await prisma.galleryCategory.findFirst({
      where: { name, NOT: { id } },
    });

    if (duplicate) {
      return jsonError("Category name already in use", 409);
    }

    const category = await prisma.galleryCategory.update({
      where: { id },
      data: { name },
      include: { _count: { select: { galleries: true } } },
    });

    return jsonSuccess({
      category: {
        id: category.id,
        name: category.name,
        createdAt: category.createdAt.toISOString(),
        galleryCount: category._count.galleries,
      },
    });
  } catch {
    return jsonError("Failed to update category", 500);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { id } = await context.params;

  try {
    await prisma.galleryCategory.delete({ where: { id } });
    return jsonSuccess({});
  } catch {
    return jsonError("Failed to delete category. It may still have gallery images.", 500);
  }
}

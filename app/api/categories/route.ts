import { z } from "zod";

import { getSession } from "@/lib/auth";
import { jsonError, jsonSuccess, unauthorized } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";

const createSchema = z.object({
  name: z.string().min(1).max(80),
});

export async function GET() {
  const session = await getSession();
  if (!session) return unauthorized();

  const categories = await prisma.galleryCategory.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { galleries: true } } },
  });

  return jsonSuccess({
    categories: categories.map((c) => ({
      id: c.id,
      name: c.name,
      createdAt: c.createdAt.toISOString(),
      galleryCount: c._count.galleries,
    })),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return unauthorized();

  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Category name is required", 400);
    }

    const name = parsed.data.name.trim();

    const existing = await prisma.galleryCategory.findUnique({ where: { name } });
    if (existing) {
      return jsonError("Category already exists", 409);
    }

    const category = await prisma.galleryCategory.create({ data: { name } });

    return jsonSuccess({
      category: {
        id: category.id,
        name: category.name,
        createdAt: category.createdAt.toISOString(),
        galleryCount: 0,
      },
    });
  } catch {
    return jsonError("Failed to create category", 500);
  }
}

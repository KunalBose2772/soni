import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const [categories, items] = await Promise.all([
    prisma.galleryCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
  ]);

  return NextResponse.json({
    success: true,
    categories: categories.map((c) => c.name),
    items: items.map((item) => ({
      id: item.id,
      src: item.imageUrl,
      title: item.title,
      type: item.category.name,
    })),
  });
}

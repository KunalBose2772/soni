import { getSession } from "@/lib/auth";
import { jsonError, jsonSuccess, unauthorized } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";
import { uploadGalleryImage } from "@/lib/supabase-storage";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { searchParams } = new URL(request.url);
  const categoryId = (searchParams.get("categoryId") ?? "").trim();

  const items = await prisma.gallery.findMany({
    where: categoryId ? { categoryId } : undefined,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return jsonSuccess({
    items: items.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
      title: item.title,
      categoryId: item.categoryId,
      categoryName: item.category.name,
      createdAt: item.createdAt.toISOString(),
    })),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return unauthorized();

  try {
    const formData = await request.formData();
    const title = String(formData.get("title") ?? "").trim();
    const categoryId = String(formData.get("categoryId") ?? "").trim();
    const file = formData.get("image");

    if (!title) return jsonError("Title is required", 400);
    if (!categoryId) return jsonError("Category is required", 400);
    if (!(file instanceof File) || file.size === 0) {
      return jsonError("Image file is required", 400);
    }

    const category = await prisma.galleryCategory.findUnique({ where: { id: categoryId } });
    if (!category) return jsonError("Invalid category", 400);

    const { imageUrl, storagePath, originalName } = await uploadGalleryImage(file, category.name);

    const item = await prisma.gallery.create({
      data: { title, categoryId, imageUrl, storagePath, originalName },
      include: { category: true },
    });

    return jsonSuccess({
      item: {
        id: item.id,
        imageUrl: item.imageUrl,
        title: item.title,
        categoryId: item.categoryId,
        categoryName: item.category.name,
        createdAt: item.createdAt.toISOString(),
      },
    });
  } catch (err) {
    console.error("[gallery] upload failed:", err);
    const message = err instanceof Error ? err.message : "Failed to upload image";
    return jsonError(message, 500);
  }
}

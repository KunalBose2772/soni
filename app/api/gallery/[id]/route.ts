import { z } from "zod";

import { getSession } from "@/lib/auth";
import { jsonError, jsonSuccess, unauthorized } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";
import {
  deleteGalleryImage,
  moveGalleryImage,
  uploadGalleryImage,
} from "@/lib/supabase-storage";

const patchSchema = z.object({
  title: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
});

async function removeStoredImage(storagePath: string | null | undefined) {
  if (!storagePath?.trim()) return;
  try {
    await deleteGalleryImage(storagePath);
  } catch (err) {
    console.error("[gallery] storage delete failed:", err);
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { id } = await context.params;

  try {
    const existing = await prisma.gallery.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!existing) return jsonError("Gallery item not found", 404);

    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const title = formData.get("title");
      const categoryId = formData.get("categoryId");
      const file = formData.get("image");

      const data: {
        title?: string;
        categoryId?: string;
        imageUrl?: string;
        storagePath?: string;
        originalName?: string;
      } = {};

      if (typeof title === "string" && title.trim()) data.title = title.trim();

      let targetCategory = existing.category;
      if (typeof categoryId === "string" && categoryId.trim()) {
        const category = await prisma.galleryCategory.findUnique({
          where: { id: categoryId.trim() },
        });
        if (!category) return jsonError("Invalid category", 400);
        data.categoryId = category.id;
        targetCategory = category;
      }

      if (file instanceof File && file.size > 0) {
        const uploaded = await uploadGalleryImage(file, targetCategory.name);
        data.imageUrl = uploaded.imageUrl;
        data.storagePath = uploaded.storagePath;
        data.originalName = uploaded.originalName;
        await removeStoredImage(existing.storagePath);
      } else if (
        data.categoryId &&
        data.categoryId !== existing.categoryId &&
        existing.storagePath?.trim()
      ) {
        const moved = await moveGalleryImage(
          existing.storagePath,
          targetCategory.name,
          existing.originalName || existing.storagePath.split("/").pop() || "image",
        );
        data.imageUrl = moved.imageUrl;
        data.storagePath = moved.storagePath;
        data.originalName = moved.originalName;
      }

      const item = await prisma.gallery.update({
        where: { id },
        data,
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
    }

    const body = await request.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Invalid update data", 400);
    }

    let targetCategory = existing.category;
    if (parsed.data.categoryId) {
      const category = await prisma.galleryCategory.findUnique({
        where: { id: parsed.data.categoryId },
      });
      if (!category) return jsonError("Invalid category", 400);
      targetCategory = category;
    }

    const updateData: {
      title?: string;
      categoryId?: string;
      imageUrl?: string;
      storagePath?: string;
      originalName?: string;
    } = { ...parsed.data };

    if (
      parsed.data.categoryId &&
      parsed.data.categoryId !== existing.categoryId &&
      existing.storagePath?.trim()
    ) {
      const moved = await moveGalleryImage(
        existing.storagePath,
        targetCategory.name,
        existing.originalName || existing.storagePath.split("/").pop() || "image",
      );
      updateData.imageUrl = moved.imageUrl;
      updateData.storagePath = moved.storagePath;
      updateData.originalName = moved.originalName;
    }

    const item = await prisma.gallery.update({
      where: { id },
      data: updateData,
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
    console.error("[gallery] update failed:", err);
    const message = err instanceof Error ? err.message : "Failed to update gallery item";
    return jsonError(message, 500);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { id } = await context.params;

  try {
    const existing = await prisma.gallery.findUnique({ where: { id } });
    if (!existing) return jsonError("Gallery item not found", 404);

    await prisma.gallery.delete({ where: { id } });
    await removeStoredImage(existing.storagePath);

    return jsonSuccess({});
  } catch (err) {
    console.error("[gallery] delete failed:", err);
    const message = err instanceof Error ? err.message : "Failed to delete gallery item";
    return jsonError(message, 500);
  }
}

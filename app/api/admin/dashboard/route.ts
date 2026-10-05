import { getSession } from "@/lib/auth";
import { jsonSuccess, unauthorized } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) return unauthorized();

  const [totalLeads, newLeads, followUpLeads, convertedLeads, lostLeads, totalGallery, totalCategories] =
    await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "New" } }),
      prisma.booking.count({ where: { status: "Follow-up" } }),
      prisma.booking.count({ where: { status: "Converted" } }),
      prisma.booking.count({ where: { status: "Lost" } }),
      prisma.gallery.count(),
      prisma.galleryCategory.count(),
    ]);

  return jsonSuccess({
    stats: {
      totalLeads,
      newLeads,
      followUpLeads,
      convertedLeads,
      lostLeads,
      totalGallery,
      totalCategories,
    },
  });
}

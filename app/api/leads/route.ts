import { getSession } from "@/lib/auth";
import { jsonSuccess, unauthorized } from "@/lib/api-utils";
import { getKolkataDayRange } from "@/lib/lead-crm";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? "10") || 10));
  const search = (searchParams.get("search") ?? "").trim();
  const status = (searchParams.get("status") ?? "").trim();

  const where = {
    AND: [
      search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { phone: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
              { movingFrom: { contains: search, mode: "insensitive" as const } },
              { movingTo: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {},
      status ? { status } : {},
    ],
  };

  const { start, end } = getKolkataDayRange();

  const [leads, total, statusCounts, todayFollowUps, overdueFollowUps] = await Promise.all([
    prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.booking.count({ where }),
    Promise.all([
      prisma.booking.count({ where: { status: "New" } }),
      prisma.booking.count({ where: { status: "Follow-up" } }),
      prisma.booking.count({ where: { status: "Converted" } }),
      prisma.booking.count({ where: { status: "Lost" } }),
    ]),
    prisma.booking.count({
      where: {
        status: "Follow-up",
        nextFollowUpAt: {
          gte: start,
          lt: end,
        },
      },
    }),
    prisma.booking.count({
      where: {
        status: "Follow-up",
        nextFollowUpAt: {
          lt: new Date(),
        },
      },
    }),
  ]);

  const [newCount, followUpCount, convertedCount, lostCount] = statusCounts;

  return jsonSuccess({
    leads: leads.map((lead) => ({
      ...lead,
      moveDate: lead.moveDate.toISOString(),
      createdAt: lead.createdAt.toISOString(),
      nextFollowUpAt: lead.nextFollowUpAt?.toISOString() ?? null,
      adminNote: lead.adminNote,
      statusUpdatedAt: lead.statusUpdatedAt?.toISOString() ?? null,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
    statusCounts: {
      new: newCount,
      followUp: followUpCount,
      converted: convertedCount,
      lost: lostCount,
    },
    todayFollowUps,
    overdueFollowUps,
  });
}

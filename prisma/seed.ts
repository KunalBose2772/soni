import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const DEFAULT_CATEGORIES = [
  "Residential",
  "Office",
  "Packing",
  "Vehicle",
  "Warehouse",
  "Intercity",
  "Other",
];

const ADMIN_LOGIN_ID = process.env.ADMIN_LOGIN_ID ?? "Admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin123";

async function main() {
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

  await prisma.admin.upsert({
    where: { loginId: ADMIN_LOGIN_ID },
    update: { password: hashedPassword },
    create: {
      loginId: ADMIN_LOGIN_ID,
      password: hashedPassword,
    },
  });

  for (const name of DEFAULT_CATEGORIES) {
    await prisma.galleryCategory.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Seed completed: admin + gallery categories");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

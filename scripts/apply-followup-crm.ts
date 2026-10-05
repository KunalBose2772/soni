import fs from "node:fs";
import path from "node:path";

import { PrismaClient } from "@prisma/client";

function loadEnvValue(filePath: string, key: string) {
  const content = fs.readFileSync(filePath, "utf8");
  const line = content
    .split(/\r?\n/)
    .find((entry) => entry.startsWith(`${key}=`));

  if (!line) return null;

  const value = line.slice(key.length + 1).trim();
  return value.replace(/^"|"$/g, "");
}

async function main() {
  const envPath = path.join(process.cwd(), ".env");
  const databaseUrl = loadEnvValue(envPath, "DATABASE_URL");
  const directUrl = loadEnvValue(envPath, "DIRECT_URL");

  if (!databaseUrl || !directUrl) {
    throw new Error("DATABASE_URL or DIRECT_URL missing from .env");
  }

  process.env.DATABASE_URL = databaseUrl;
  process.env.DIRECT_URL = directUrl;

  const prisma = new PrismaClient();

  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Booking"
      ADD COLUMN IF NOT EXISTS "nextFollowUpAt" TIMESTAMP(3),
      ADD COLUMN IF NOT EXISTS "adminNote" TEXT,
      ADD COLUMN IF NOT EXISTS "statusUpdatedAt" TIMESTAMP(3);
    `);

    console.log("Follow-up CRM columns are in place.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(async (error) => {
  console.error(error);
  process.exitCode = 1;
});

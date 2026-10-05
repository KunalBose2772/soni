-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN "storagePath" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Gallery" ADD COLUMN "originalName" TEXT NOT NULL DEFAULT '';

-- Remove defaults after backfill (existing rows keep empty strings until re-uploaded)
ALTER TABLE "Gallery" ALTER COLUMN "storagePath" DROP DEFAULT;
ALTER TABLE "Gallery" ALTER COLUMN "originalName" DROP DEFAULT;

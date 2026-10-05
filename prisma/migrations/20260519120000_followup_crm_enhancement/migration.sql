-- Add follow-up CRM columns without touching existing production data.
ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "nextFollowUpAt" TIMESTAMP(3);
ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "adminNote" TEXT;
ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "statusUpdatedAt" TIMESTAMP(3);

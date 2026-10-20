import { NextResponse } from "next/server";
import { z } from "zod";

import { sendQuoteBookingEmails } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { companyInfo } from "@/lib/company-info";

const quoteSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  movingFrom: z.string().min(1),
  movingTo: z.string().min(1),
  moveDate: z.string().min(1),
  moveType: z.string().min(1),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Something went wrong" },
        { status: 400 },
      );
    }

    const { moveDate, ...rest } = parsed.data;
    const date = new Date(moveDate);

    if (Number.isNaN(date.getTime())) {
      return NextResponse.json(
        { success: false, message: "Something went wrong" },
        { status: 400 },
      );
    }

    const mailPayload = {
      name: rest.name,
      email: rest.email,
      phone: rest.phone,
      movingFrom: rest.movingFrom,
      movingTo: rest.movingTo,
      moveDate: date,
      moveType: rest.moveType,
      message: rest.message,
    };

    let bookingCreated = false;
    let bookingId: string | null = null;

    // 1. Persist lead in PostgreSQL Database
    try {
      const booking = await prisma.booking.create({
        data: {
          ...rest,
          moveDate: date,
        },
      });
      bookingCreated = true;
      bookingId = booking.id;
    } catch (dbErr) {
      console.error("[quote] Database booking save error:", dbErr);
      // Emergency backup log so customer details are never lost in server logs
      console.warn("[EMERGENCY LEAD BACKUP]:", JSON.stringify(mailPayload));
    }

    // 2. Dispatch Email Notifications (Admin + Customer)
    let emailSent = false;
    try {
      await sendQuoteBookingEmails(mailPayload);
      emailSent = true;

      // If booking was saved, record confirmation in lead email history
      if (bookingId) {
        const senderEmail = process.env.SMTP_USER || companyInfo.email;
        const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || companyInfo.email;
        await prisma.leadEmail
          .createMany({
            data: [
              {
                bookingId,
                direction: "SENT",
                from: senderEmail,
                to: adminEmail,
                subject: "New Quote Request Received (Admin)",
                body: `Admin notification dispatched for quote #${bookingId}`,
              },
              {
                bookingId,
                direction: "SENT",
                from: senderEmail,
                to: mailPayload.email,
                subject: "Quote Request Received Successfully (Customer)",
                body: `Confirmation email dispatched to ${mailPayload.email}`,
              },
            ],
          })
          .catch(() => {});
      }
    } catch (mailErr) {
      console.error("[quote] Email delivery failed:", mailErr);
    }

    // If both DB and email failed, return helpful fallback message
    if (!bookingCreated && !emailSent) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to submit quote online right now. Please call our Ranchi team directly at +91 9835983331.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote request received! Our moving coordinator will contact you within 15 minutes.",
    });
  } catch (err: unknown) {
    console.error("[quote] Unhandled submission error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please call our team directly at +91 9835983331.",
      },
      { status: 500 },
    );
  }
}

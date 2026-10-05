import { NextResponse } from "next/server";
import { z } from "zod";

import { sendQuoteBookingEmails } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

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

    await prisma.booking.create({
      data: {
        ...rest,
        moveDate: date,
      },
    });

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

    try {
      await sendQuoteBookingEmails(mailPayload);
    } catch (mailErr) {
      console.error("[quote] Email delivery failed:", mailErr);
      return NextResponse.json(
        { success: false, message: "Something went wrong" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}

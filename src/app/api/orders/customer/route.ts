import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import handleError from "../../helpers/handleError";

const OrderSchema = z.object({
  customerName: z.string(),
  email: z.string().email(),
  address: z.string(),
  phone: z.string(),
  dressDetails: z.string(),
  neckSize: z.number(),
  chestSize: z.number(),
  hipSize: z.number(),
  shoulderSize: z.number(),
  otherMeasurements: z.string().optional(),
  selectedDesign: z.object({
    type: z.enum(["neck", "hand"]),
    name: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = OrderSchema.parse(body);

    const newOrder = await prisma.order.create({
      data: {
        ...validatedData,
      },
    });

    return NextResponse.json(
      { success: true, order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "Failed to create order");
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import privateRoute from "../../helpers/privateRoute";
import handleError from "../../helpers/handleError";
import nodemailer from "nodemailer";

const StatusSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED", "DONE"]),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return privateRoute(request, async (user) => {
    try {
      const body = await request.json();
      const validatedData = StatusSchema.parse(body);

      const updatedOrder = await prisma.order.update({
        where: { id: params.id },
        data: { status: validatedData.status },
      });

      // send email
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      let message = "";

      switch (validatedData.status) {
        case "ACCEPTED":
          message = `Hello ${updatedOrder.customerName}, your order for ${updatedOrder.dressDetails} has been accepted! 🎉`;
          break;
        case "REJECTED":
          message = `Hello ${updatedOrder.customerName}, unfortunately your order for ${updatedOrder.dressDetails} has been rejected. Please contact the tailor for more info.`;
          break;
        case "DONE":
          message = `Hello ${updatedOrder.customerName}, your order for ${updatedOrder.dressDetails} is complete! You can pick it up or arrange delivery.`;
          break;
        default:
          message = `Hello ${updatedOrder.customerName}, your order status has been updated to ${validatedData.status}.`;
      }

      await transporter.sendMail({
        from: `"Tailor Shop" <${process.env.SMTP_USER}>`,
        to: updatedOrder.email,
        subject: `Your order status is ${validatedData.status}`,
        text: message,
      });

      return NextResponse.json(
        { success: true, order: updatedOrder },
        { status: 200 }
      );
    } catch (error) {
      return handleError(error, "Failed to update order status");
    }
  });
}

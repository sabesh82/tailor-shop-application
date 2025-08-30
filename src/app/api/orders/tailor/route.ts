import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import privateRoute from "../../helpers/privateRoute";
import handleError from "../../helpers/handleError";

export async function GET(request: NextRequest) {
  return privateRoute(request, async (user) => {
    try {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({ success: true, orders }, { status: 200 });
    } catch (error) {
      return handleError(error, "Failed to fetch orders");
    }
  });
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verify } from "argon2";
import generateToken from "../../helpers/generateToken";
import handleError from "../../helpers/handleError";
import { UserLoginSchema } from "./login.schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = UserLoginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    const invalidCredientials = NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALIED_CREDIENTIALS",
          message: "invalid email or password",
        },
      },
      { status: 401 }
    );

    if (!user) {
      return invalidCredientials;
    }

    const isPasswordValid = await verify(user.password, validatedData.password);

    if (!isPasswordValid) {
      return invalidCredientials;
    }

    const token = generateToken(user.id);

    return NextResponse.json({ user, token }, { status: 200 });
  } catch (error) {
    return handleError(error, "login failed!");
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import generateToken from "../../helpers/generateToken";
import handleError from "../../helpers/handleError";
import { UserRegistrationSchema } from "./register.schema";
import { hash } from "argon2";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = UserRegistrationSchema.parse(body);

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (isUserExist) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_ALREADY_EXISTS",
            message: "user already exist",
          },
        },
        { status: 409 }
      );
    }

    const hasedPassword = await hash(validatedData.password);

    const newUser = await prisma.user.create({
      data: {
        ...validatedData,
        password: hasedPassword,
      },
    });

    const token = generateToken(newUser.id);

    return NextResponse.json({ ...newUser, token }, { status: 201 });
  } catch (error) {
    return handleError(error, "failed to create user");
  }
}

export async function GET(_: NextRequest) {
  try {
    const [users, count] = await prisma.$transaction([
      prisma.user.findMany({
        omit: {
          password: true,
        },
      }),
      prisma.user.count(),
    ]);

    return NextResponse.json({ items: users, total: count }, { status: 200 });
  } catch (error) {
    return handleError(error, "failed to get users");
  }
}

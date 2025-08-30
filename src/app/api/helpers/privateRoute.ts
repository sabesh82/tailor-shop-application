import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Jwt, { JwtPayload } from "jsonwebtoken";
import handleError from "./handleError";

export default async function privateRoute(
  _: NextRequest,
  cb: (user: { id: string }, token: string) => Promise<NextResponse>
) {
  try {
    const authorization = (await headers()).get("Authorization");
    const token = authorization?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_NOT_AUTHORIZED",
            message: "user not authorized",
          },
        },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    Jwt.verify(token, secret);
    const decodedToken = Jwt.decode(token) as JwtPayload & { id: string };

    return await cb(decodedToken, token);
  } catch (error) {
    return handleError(error, "authorization failed");
  }
}

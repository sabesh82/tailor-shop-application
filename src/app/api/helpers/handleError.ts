import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";

export default function handleError(error: unknown, defaultMessage: string) {
  console.error(error, defaultMessage);

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_FAILED",
          message: "validation failed",
        },
      },
      { status: 400 }
    );
  }

  if (error instanceof JsonWebTokenError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code:
            error instanceof TokenExpiredError
              ? "TOKEN_EXPIRED"
              : "INVALID_TOKEN",
          message: error.message,
        },
      },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: "SERVER_ERROR",
        message: defaultMessage,
      },
    },
    { status: 500 }
  );
}

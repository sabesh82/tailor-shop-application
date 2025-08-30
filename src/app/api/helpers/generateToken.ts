import Jwt from "jsonwebtoken";

export default function generateToken(id: string) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw {
      code: "JWT_SECRET_MISSING",
      message: "JWT_SECRET is not defined in environment variables",
    };
  }

  try {
    const token = Jwt.sign(
      {
        id,
      },
      secret,
      {
        expiresIn: "1w",
      }
    );

    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw {
      code: "TOKEN_GENERATE_FAILED",
      message: "failed to generate token",
    };
  }
}

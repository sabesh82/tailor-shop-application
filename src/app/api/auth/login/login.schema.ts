import z from "zod";

const UserLoginSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .trim()
    .email({ message: "invalid email format" }),

  password: z
    .string()
    .trim()
    .min(8, { message: "password should be atleast 8 characters" }),
});

export { UserLoginSchema };

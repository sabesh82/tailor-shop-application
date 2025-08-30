import { z } from "zod";

const UserRegistrationSchema = z.object({
  firstName: z
    .string({ message: "firstName is required" })
    .min(2, { message: "the min length should be atleast 2 chars" })
    .max(100, { message: "firstName should not exceed more than 100 chars" })
    .trim()
    .regex(/^[a-zA-Z\s-]+$/, { message: "can have a-z or A-Z or space or -" }),

  lastName: z
    .string({ message: "lastName is required" })
    .min(2, { message: "the min length should be atleast 2 chars" })
    .max(100, { message: "the lastName should not exceed more than 100 chars" })
    .trim()
    .regex(/^[a-zA-Z\s-]+$/, { message: "can have a-z or A-Z or space or -" }),

  email: z
    .string({ message: "email is required" })
    .email({ message: "invalid email format" })
    .max(100, { message: "email should not exceed more than 100 chars" })
    .trim()
    .toLowerCase(),

  password: z
    .string({ message: "password is required" })
    .min(8, { message: "should be atleast 8 characters" })
    .max(100, {
      message: "password should not exceed more than 100 characters",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one number",
    })
    .refine((val) => /[!@#$%^&*]/.test(val), {
      message:
        "Password must contain at least one special character (!@#$%^&*)",
    })
    .refine((val) => /^[A-Za-z\d!@#$%^&*]+$/.test(val), {
      message:
        "Password can only contain letters, numbers, and special characters (!@#$%^&*)",
    }),
});

export { UserRegistrationSchema };

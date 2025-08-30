import z from "zod";
import { UserRegistrationSchema } from "./register.schema";

export type TailorRegisterInput = z.infer<typeof UserRegistrationSchema>;

import z from "zod";
import { UserLoginSchema } from "./login.schema";

export type TailorLoginInput = z.infer<typeof UserLoginSchema>;

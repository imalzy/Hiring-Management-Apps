import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(1, "Required"),
  email: z.email().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type RegisterType = z.infer<typeof registerSchema>;

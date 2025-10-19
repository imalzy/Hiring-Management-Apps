import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type LoginType = z.infer<typeof loginSchema>;

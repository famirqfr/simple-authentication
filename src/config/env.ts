import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_API_BASE: z.string().url(),
  AUTH_SECRET: z.string().min(16),
});

export const ENV = schema.parse({
  NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
  AUTH_SECRET: process.env.AUTH_SECRET,
});

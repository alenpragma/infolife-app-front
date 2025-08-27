import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Input valid email" }),
  password: z.string().min(6, { message: "Input valid password" }),
});

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .nonempty({ message: "Please enter your password" })
      .min(5, { message: "Password must be at least 5 characters" }),

  })

import { z } from "zod";

export function useBuySchema(minAmount: any) {
  return z.object({
    address: z.string().nonempty({ message: "Address is required" }),
    amount: z.coerce
      .number({ invalid_type_error: "Amount must be a number" })
      .min(minAmount, { message: `Minimum amount is ${minAmount}` }),
    note: z.string().optional(),
  });
}


export const userSchema = z.object({
  id: z.string().uuid().optional(), // optional for create
  name: z.string().min(2, "Name must be at least 2 characters").max(20),
  position: z.string().min(2, "position must be at least 2 characters").max(20),
  location: z.string().min(2, "location must be at least 2 characters").max(30),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .optional(),
  img: z
    .string()
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  isActive: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});


// ✅ Update User Schema
export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  position: z.string().min(2, "position must be at least 2 characters").max(20),
  location: z.string().min(2, "location must be at least 2 characters").max(30),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  img: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(), // optional
});
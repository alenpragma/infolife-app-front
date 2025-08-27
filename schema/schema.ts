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

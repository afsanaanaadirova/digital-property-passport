import { z } from "zod";

export const saleTransactionTypesSchema = z.object({
  saleTransactionTypes: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array(),
});




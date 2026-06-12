import { z } from "zod";

export const landOwnershipTypeSchema = z.object({
  landOwnershipTypes: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array(),
});

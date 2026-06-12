import { z } from "zod";

export const ownerTypesSchema = z.object({
  ownerTypes: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array(),
});

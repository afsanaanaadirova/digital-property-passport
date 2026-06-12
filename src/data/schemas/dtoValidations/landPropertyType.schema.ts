import { z } from "zod";

export const landPropertyTypeSchema = z.object({
  landPropertyTypes: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array(),
});

import { z } from "zod";

export const areaSchema = z.object({
  areas: z
    .object({
      id: z.number(),
      name: z.string(),
      description: z.string()
    })
    .array(),
});

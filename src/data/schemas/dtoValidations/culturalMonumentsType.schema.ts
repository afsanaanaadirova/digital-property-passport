import { z } from "zod";

export const culturalMonumentsTypeSchema = z.object({
    culturalMonuments: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array(),
});

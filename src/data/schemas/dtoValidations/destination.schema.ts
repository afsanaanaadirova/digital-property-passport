import { z } from "zod";

export const destinationSchema = z.object({
  destinations: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array(),
});

import { z } from "zod";

export const buildingPropertyTypeSchema = z.object({
  buildingPropertyTypes: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array(),
});

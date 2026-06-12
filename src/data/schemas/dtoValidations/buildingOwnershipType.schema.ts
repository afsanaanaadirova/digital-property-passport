import { z } from "zod";

export const buildingOwnershipTypeSchema = z.object({
  buildingOwnershipTypes: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array(),
});

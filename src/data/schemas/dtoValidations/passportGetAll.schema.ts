import { z } from "zod";

export const passportGetAllSchema = z.object({
  pageResponse: z.object({
    size: z.number(),
    index: z.number(),
    total: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
    datas: z.array(
      z.object({
        id: z.number(),
        passportNumber:z.string().nullable(),
        ownerName: z.string().nullable(),
        finOrVoen: z.string().nullable(),
        address: z.string(),
        destination: z.string(),
        propertyType: z.string(),
        ownershipType: z.string(),
        status: z.boolean(),
        actions:z.object({
          id:z.number(),
          name:z.string()
        }).array()
      })
    ),
    min: z.number(),
    max: z.number(),
  }),
});

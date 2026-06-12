import { z } from "zod";

export const passportFileTypesSchema = z.object({
  passportFileTypes: z
    .object({
      id: z.number(),
      name: z.string(),
      fileAccept:z.string()
    })
    .array(),
});

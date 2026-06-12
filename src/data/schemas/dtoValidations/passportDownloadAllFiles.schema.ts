import { z } from "zod";

export const passportDownloadAllFilesSchema = z.object({
  compressedFile: z.string(),
  fileName: z.string(),
  fileSize: z.number(),
  contentType: z.string(),
});

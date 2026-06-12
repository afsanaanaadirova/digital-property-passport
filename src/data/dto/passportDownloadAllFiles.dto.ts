import { z } from "zod";
import { passportDownloadAllFilesSchema } from "../schemas/dtoValidations/passportDownloadAllFiles.schema"

export type PassportDownloadAllFilesDTO = z.infer<typeof passportDownloadAllFilesSchema>;
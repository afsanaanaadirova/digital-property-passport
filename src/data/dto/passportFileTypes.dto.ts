import { z } from "zod";
import { passportFileTypesSchema } from "../schemas/dtoValidations/passportFileTypes.schema";


export type PassportFileTypesDTO = z.infer<typeof passportFileTypesSchema>;





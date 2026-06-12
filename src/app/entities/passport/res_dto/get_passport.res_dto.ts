import { z } from "zod";
import { passportByIdSchema } from "../schemas/resDtoValidations/get_passport_by_id.schema"
import { passportGetAllSchema } from "../schemas/resDtoValidations/get_passport.schema" ;


export type PassportByIdDTO = z.infer<typeof passportByIdSchema>;

export type PassportGetAllDTO = z.infer<typeof passportGetAllSchema>;




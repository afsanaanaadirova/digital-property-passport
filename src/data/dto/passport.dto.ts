import { z } from "zod";
import { passportSchema } from "../schemas/formValidations/passport.schema";
import { passportByIdSchema } from "../schemas/dtoValidations/passportById.schmea";
import { passportGetAllSchema } from "../schemas/dtoValidations/passportGetAll.schema";


export type PassportAddDTO = z.infer<typeof passportSchema>;

export type PassportByIdDTO = z.infer<typeof passportByIdSchema>;

export type PassportGetAllDTO = z.infer<typeof passportGetAllSchema>;




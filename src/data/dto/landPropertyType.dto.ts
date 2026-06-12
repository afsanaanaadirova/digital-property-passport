import { z } from "zod";
import { landPropertyTypeSchema } from "../schemas/dtoValidations/landPropertyType.schema";

export type LandPropertyTypeDTO = z.infer<typeof landPropertyTypeSchema>;

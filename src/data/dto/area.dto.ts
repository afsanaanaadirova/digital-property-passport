import { z } from "zod";
import { areaSchema } from "../schemas/dtoValidations/area.schema";

export type AreaDTO = z.infer<typeof areaSchema>;

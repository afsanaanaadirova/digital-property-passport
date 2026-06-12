import { z } from "zod";
import { buildingPropertyTypeSchema } from "../schemas/dtoValidations/buildingPropertyType.schema";

export type BuildingPropertyTypeDTO = z.infer<typeof buildingPropertyTypeSchema>;

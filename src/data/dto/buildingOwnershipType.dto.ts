import { z } from "zod";
import { buildingOwnershipTypeSchema } from "../schemas/dtoValidations/buildingOwnershipType.schema";

export type BuildingOwnershipTypeDTO = z.infer<typeof buildingOwnershipTypeSchema>;

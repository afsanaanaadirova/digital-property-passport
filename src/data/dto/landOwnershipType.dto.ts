import { z } from "zod";
import { landOwnershipTypeSchema } from "../schemas/dtoValidations/landOwnershipType.schema";

export type LandOwnershipTypeDTO = z.infer<typeof landOwnershipTypeSchema>;

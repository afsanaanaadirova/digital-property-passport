import { z } from "zod";
import { ownerTypesSchema } from "../schemas/dtoValidations/ownerType.schema";

export type OwnerTypeDTO = z.infer<typeof ownerTypesSchema>


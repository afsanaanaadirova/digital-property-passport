import { z } from "zod";
import { culturalMonumentsTypeSchema } from "../schemas/dtoValidations/culturalMonumentsType.schema";

export type CulturalMonumentsDTO = z.infer<typeof culturalMonumentsTypeSchema>;

import { z } from "zod";
import { destinationSchema } from "../schemas/dtoValidations/destination.schema";

export type DestinationDTO = z.infer<typeof destinationSchema>;

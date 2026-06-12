import { z } from "zod";
import { saleTransactionTypesSchema } from "../schemas/dtoValidations/saleTransactionType.schema";

export type SaleTransactionTypesDTO = z.infer<typeof saleTransactionTypesSchema>
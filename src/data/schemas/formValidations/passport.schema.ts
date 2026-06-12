import { z } from "zod";
const individualSchema = z.object({
  id: z.number().optional(),
  ownerTypeId: z.literal(1),
  contactNumber: z
    .string().min(1, "Bu xana doldurulmalıdır")
    .regex(
      /^[1-9]\d{1} ?\d{3} ?\d{2} ?\d{2}$/,
      "Məlumatı düzgün daxil edin"
    ),
  pin: z.string().nullable(),
  fullname: z.string().min(1, "Bu xana doldurulmalıdır"),
});

const companySchema = z.object({
  id: z.number().optional(),
  ownerTypeId: z.literal(2),
  contactNumber: z
    .string().min(1, "Bu xana doldurulmalıdır")
    .regex(
      /^[1-9]\d{1} ?\d{3} ?\d{2} ?\d{2}$/,
      "Məlumatı düzgün daxil edin"
    ),
  tin: z
    .string()
    .min(1, "Bu xana doldurulmalıdır")
    .max(10, "VOEN 10 rəqəmdən çox ola bilməz"),
  companyName: z.string().min(1, "Bu xana doldurulmalıdır"),
});

export const passportSchema = z.object({
  passportNumber: z.string().nullable().optional(),
  objectLocation: z.string().min(1, "Bu xana doldurulmalıdır"),
  objectArea: z.coerce.number({
    required_error: "Bu xana doldurulmalıdır",
    invalid_type_error: "Bu xana doldurulmalıdır",
  }),
  objectDesignation: z.coerce.number({
    required_error: "Bu xana doldurulmalıdır",
    invalid_type_error: "Bu xana doldurulmalıdır",
  }),
  landProperty: z.coerce.number().nullable().optional(),
  buildingProperty: z.coerce.number().nullable().optional(),
  landPropertyOfLawType: z.coerce.number().nullable().optional(),
  isDismantlingPossible: z.boolean().nullable().optional(),
  culturalMonumentId: z.number().nullable().optional(),
  buildingPropertyOfLawType: z.coerce.number().nullable().optional(),
  objectCode: z.string().nullable().optional(),
  numberOfFloors: z.coerce.number().nullable().optional(),
  totalLandArea: z.coerce.number().nullable().optional(),
  totalLandAreaForDocument: z.coerce.number().nullable().optional(),
  totalBuildingArea: z.coerce.number().nullable().optional(),
  totalBuildingAreaForDocument: z.coerce.number().nullable().optional(),
  residentialArea: z.coerce.number().nullable().optional(),
  nonRresidentialArea: z.coerce.number().nullable().optional(),
  numberOfRooms: z.coerce.number().nullable().optional(),
  sellingPriceOfLand1KVM: z.coerce.number().nullable().optional(),
  sellingTotalPriceOfLand: z.coerce.number().nullable().optional(),
  sellingPriceOfBuilding1KVM: z.coerce.number().nullable().optional(),
  sellingTotalPriceOfBuilding: z.coerce.number().nullable().optional(),
  sellingTotalPriceOfObject: z.coerce.number().nullable().optional(),
  numberOfResidentsInTheResidentialFacility: z.coerce
    .number({
      required_error: "Bu xana doldurulmalıdır",
      invalid_type_error: "Bu xana doldurulmalıdır",
    })
    .nullable()
    .optional(),
  numberOfActualRegisteredResidents: z.coerce.number().nullable().optional(),
  PurchaseAndSaleProtocol: z.coerce.number().nullable().optional(),
  passportFiles: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        files: z.array(z.object({ id: z.union([z.number(), z.string()]), file: z.any() })).optional(),
      })
    )
    .optional(),
  personTypes: z
    .array(
      z.discriminatedUnion("ownerTypeId", [individualSchema, companySchema])
    )
    .nonempty("Şəxs növü daxil edilməlidir."),
  location: z
    .object({
      lat: z.number().optional().nullable(),
      lng: z.number().optional().nullable(),
      name: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  note: z.string().optional().nullable(),
  signatureOfPropertyAffairsStateService: z.string().nullable().optional(),
  representativeOfDSHAK: z.string().nullable().optional(),
  representativeOfTheLocalExecutiveAuthority: z.string().nullable().optional(),
  ministryOfCultureRepresentative: z.string().nullable().optional(),
  passportIssueDate: z
    .date({
      required_error: "Bu xana doldurulmalıdır",
      invalid_type_error: "Bu xana doldurulmalıdır",
    })
    .nullable()
    .optional(),
  dismantlingPossible: z.boolean().nullable().optional(),
  culturalMonument: z.number().nullable().optional(),
}).superRefine((val, ctx) => {
  if (val.dismantlingPossible === true && !val.culturalMonument) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["culturalMonument"],
      message: "Bu xana doldurulmalıdır"
    });
  }
});

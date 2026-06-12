import { z } from "zod";

export const passportByIdSchema = z.object({
  passport: z.object({
    id: z.number(),
    number: z.string().nullable(),
    issueDate: z.string().nullable(),
    createDate: z.string(),
    createdBy: z.string(),
    estate: z.object({
      id: z.number(),
      owners: z
        .object({
          id: z.number(),
          ownerType: z.object({
            id: z.number(),
            name: z.string(),
          }),
          contactNumber:z.string(),
          ownerLegalDetail: z.object({
            id: z.number(),
            ownerId: z.number(),
            tin: z.string(),
            companyName: z.string(),
          }).nullable(),
          ownerCitizenDetail: z.object({
            id: z.number(),
            ownerId: z.number(),
            pin: z.string().optional(),
            fullname: z.string(),
          }).nullable(),
        })
        .array(),
      area: z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
      }),
      destination: z.object({
        id: z.number(),
        name: z.string(),
      }),
      landPropertyType: z.object({
        id: z.number(),
        name: z.string(),
      }).nullable().optional(),
      buildingPropertyType: z.object({
        id: z.number(),
        name: z.string(),
      }).nullable(),
      landOwnershipType: z.object({
        id: z.number(),
        name: z.string(),
      }).nullable(),
      buildingOwnershipType: z.object({
        id: z.number(),
        name: z.string(),
      }).nullable(),
      address: z.string().nullable(),
      code: z.string().nullable(),
      floorCount: z.number().nullable(),
      totalLandArea: z.number().nullable(),
      legalTotalLandArea: z.number().nullable(),
      totalBuildingArea: z.number().nullable(),
      legalTotalBuildingArea: z.number().nullable(),
      residentialArea: z.number().nullable(),
      nonResidentialArea: z.number().nullable(),
      roomCount: z.number().nullable(),
      residentsCount: z.number().nullable(),
      registeredResidentsCount: z.number().nullable(),
      saleTransactionTypeId: z.number().nullable(),
      saleTransactionType: z.object({
        id: z.number(),
        name: z.string(),
      }).nullable(),
      location: z.object({
        id: z.number(),
        name: z.string(),
        longitude: z.number(),
        latitude: z.number(),
        note: z.string().nullable(),
      }).nullable(),
      pricing: z.object({
        id: z.number(),
        estimatedLandSalePricePerSquareMeter: z.number(),
        estimatedLandSalePrice: z.number(),
        estimatedBuildingSalePricePerSquareMeter: z.number(),
        estimatedBuildingSalePrice: z.number(),
        estimatedTotalSalePrice: z.number(),
      }).nullable(),
      isDismantlingPossible: z.boolean(),
      culturalMonument: z.object({
          id: z.number(),
          name: z.string()
      }).nullable()
    }),
    passportFiles: z.array(
      z.object({
        files: z
          .object({
            id: z.number(),
            name: z.string(),
            token: z.string(),
            extension: z.string(),
            size: z.number(),
            url: z.string(),
          })
          .array(),
        passportFileType: z.object({
          id: z.number(),
          name: z.string(),
          fileAccept: z.string(),
        }),
      })
    ),
    passportStatuses: z.array(
      z.object({
        status: z.object({
          id: z.number(),
          name: z.string(),
        }),
      })
    ),
    signatory: z.object({
      propertyServiceRepresentative: z.string(),
      planningArchitectureCommitteeRepresentative: z.string(),
      localExecutiveAuthorityRepresentative: z.string(),
      ministryOfCultureRepresentative:z.string()
    }).nullable(),
  }),
});

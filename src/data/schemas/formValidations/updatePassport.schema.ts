import { z } from "zod";

export const updatePassportSchema = z.object({
  passport: z.object({
    id: z.number(),
    number: z.string(),
    issueDate: z.string(),
    estate: z.object({
      owner: z.object({
        ownerTypeId: z.number(),
        contactNumber: z.string(),
        ownerLegalDetail: z.object({
          tin: z.string().optional(),
          companyName: z.string().optional(),
        }).nullable(),
        ownerCitizenDetail: z.object({
          pin: z.string().optional(),
          fullname: z.string().optional(),
        }).nullable(),
      }),
      areaId: z.number(),
      destinationId: z.number(),
      landPropertyTypeId: z.number(),
      buildingPropertyTypeId: z.number(),
      landOwnershipTypeId: z.number(),
      buildingOwnershipTypeId: z.number(),
      address: z.string(),
      code: z.string(),
      floorCount: z.number(),
      totalLandArea: z.number(),
      legalTotalLandArea: z.number(),
      totalBuildingArea: z.number(),
      legalTotalBuildingArea: z.number(),
      residentialArea: z.number(),
      nonResidentialArea: z.number(),
      roomCount: z.number(),
      residentsCount: z.number(),
      registeredResidentsCount: z.number(),
      saleTransactionTypeId: z.number(),
      location: z.object({
        name: z.string(),
        longitude: z.number(),
        latitude: z.number(),
        note: z.string().optional().nullable(),
      }),
      pricing: z.object({
        estimatedLandSalePricePerSquareMeter: z.number(),
        estimatedLandSalePrice: z.number(),
        estimatedBuildingSalePricePerSquareMeter: z.number(),
        estimatedBuildingSalePrice: z.number(),
        estimatedTotalSalePrice: z.number(),
      }),
    }),
    passportFiles: z.object({
      deletedIds: z.array(z.number()),
      newPassportFiles: z.array(
        z.object({
          passportFileTypeId: z.number().optional(),
          token: z.string().optional(),
        })
      ),
    }),
    signatory: z.object({
      propertyServiceRepresentative: z.string(),
      planningArchitectureCommitteeRepresentative: z.string(),
      localExecutiveAuthorityRepresentative: z.string(),
    }),
  }),
});

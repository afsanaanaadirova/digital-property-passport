// export type PassportUpdateDSO = z.infer<typeof updatePassportSchema>;

export type PassportDSO = {
  passport: {
    id?: number;
    number: string | null| undefined;
    issueDate: string;
    estate: {
      owner: {
        id: number;
        ownerTypeId: number;
        contactNumber: string;
        ownerLegalDetail?: {
          tin: string;
          companyName: string;
        } | null;
        ownerCitizenDetail?: {
          pin: string;
          fullname: string;
        } | null;
      }[];
      areaId: number;
      destinationId: number;
      landPropertyTypeId: number | null | undefined;
      buildingPropertyTypeId: number | null | undefined;
      landOwnershipTypeId: number | null | undefined;
      buildingOwnershipTypeId: number | null | undefined;
      address: string | null | undefined;
      code: string | null | undefined;
      floorCount: number | null;
      totalLandArea: number| null | undefined;
      legalTotalLandArea: number| null | undefined;
      totalBuildingArea: number| null | undefined;
      legalTotalBuildingArea: number| null | undefined;
      residentialArea: number| null | undefined;
      nonResidentialArea: number | null;
      roomCount: number | null;
      residentsCount: number| null | undefined;
      registeredResidentsCount: number| null | undefined;
      saleTransactionTypeId: number| null | undefined;
      location: {
        name: string| null | undefined;
        longitude: number| null | undefined;
        latitude: number| null | undefined;
        note?: string | null| undefined;
      };
      pricing: {
        estimatedLandSalePricePerSquareMeter: number| null| undefined;
        estimatedLandSalePrice: number| null| undefined;
        estimatedBuildingSalePricePerSquareMeter: number| null| undefined;
        estimatedBuildingSalePrice: number| null| undefined;
        estimatedTotalSalePrice: number| null| undefined;
      };
      isDismantlingPossible: boolean,
      culturalMonumentId: number | null | undefined
    };
    passportFiles:
      | {
          passportFileTypeId: number;
          tokens: string[];
        }[]
      | [];
    signatory: {
      propertyServiceRepresentative: string| null| undefined;
      planningArchitectureCommitteeRepresentative: string| null| undefined;
      localExecutiveAuthorityRepresentative: string| null| undefined;
      ministryOfCultureRepresentative: string| null| undefined;
    };
  };
};

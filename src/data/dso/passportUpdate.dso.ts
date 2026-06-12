import { BaseType } from "../types/base.type";

export type PassportUpdateDSO = {
  id: number;
  number: string | null | undefined;
  issueDate: string;
  ownerDeleteIds: number[];
  estate: {
    owners: {
      id: number;
      ownerTypeId: number;
      contactNumber: string;
      ownerLegalDetail: {
        tin: string;
        companyName: string;
      } | null;
      ownerCitizenDetail?: {
        pin: string | null;
        fullname: string;
      } | null;
    }[];
    areaId: number | BaseType | null;
    destinationId: number;
    landPropertyTypeId: number | null | undefined;
    buildingPropertyTypeId: number | null | undefined;
    landOwnershipTypeId: number | null | undefined;
    buildingOwnershipTypeId: number | null | undefined;
    address: string | null | undefined;
    code: string | null | undefined;
    floorCount: number | null | undefined;
    totalLandArea: number | null | undefined;
    legalTotalLandArea: number | null | undefined;
    totalBuildingArea: number | null | undefined;
    legalTotalBuildingArea: number | null | undefined;
    residentialArea: number | null | undefined;
    nonResidentialArea: number | null;
    roomCount: number | null;
    residentsCount: number | null | undefined;
    registeredResidentsCount: number | null | undefined;
    saleTransactionTypeId: number | null | undefined;
    location: {
      name: string | null | undefined;
      longitude: number | null | undefined;
      latitude: number | null | undefined;
      note: string | null | undefined;
    } | null;
    pricing: {
      estimatedLandSalePricePerSquareMeter: number | null | undefined;
      estimatedLandSalePrice: number | null | undefined;
      estimatedBuildingSalePricePerSquareMeter: number | null | undefined;
      estimatedBuildingSalePrice: number | null | undefined;
      estimatedTotalSalePrice: number | null | undefined;
    } | null;
    isDismantlingPossible: boolean,
    culturalMonumentId: number | null | undefined
  };
  passportFiles:
  | {
    deletedTokens: string[];
    newPassportFiles: {
      passportFileTypeId: number;
      tokens: string[];
    }[];
  }
  | [];
  signatory: {
    propertyServiceRepresentative: string | null | undefined;
    planningArchitectureCommitteeRepresentative: string | null | undefined;
    localExecutiveAuthorityRepresentative: string | null | undefined;
    ministryOfCultureRepresentative: string | null | undefined;
  } | null;
};

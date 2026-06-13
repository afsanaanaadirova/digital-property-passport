import { BaseType } from "../types/base.type";

export type PassportModel = {
  existingTokens?: any;
  passpostId: number;
  id?: number;
  createdBy: string;
  createDate: string;
  passportIssueInfo: string;
  passportIssueDate: Date | null;
  passportNumber: string | null;
  objectLocation: string | null;
  objectArea: BaseType | number;
  objectDec?: string;
  objectAreaName?: string;
  objectDesignation: number;
  objectDesignationName?: string;
  landProperty: number | null | undefined;
  landPropertyName?: string | null | undefined;
  buildingProperty: number | null | undefined;
  buildingPropertyName?: string | null | undefined;
  landPropertyOfLawType: number | null | undefined;
  landPropertyOfLawTypeName?: string | null | undefined;
  buildingPropertyOfLawTypeName?: string | null | undefined;
  buildingPropertyOfLawType: number | null | undefined;
  personType?: number;
  personTypeName?: string;
  voen?: string;
  companyName?: string;
  fin?: string;
  fullname?: string;
  contactInfo?: string;
  objectCode: string | null;
  numberOfFloors: number | null;
  totalLandArea: number | null;
  totalLandAreaForDocument?: number | null;
  totalBuildingArea: number | null;
  totalBuildingAreaForDocument?: number | null;
  residentialArea: number | null;
  nonRresidentialArea: number | null;
  numberOfRooms: number | null;
  sellingPriceOfLand1KVM: number | null | undefined;
  sellingTotalPriceOfLand: number | null | undefined;
  sellingPriceOfBuilding1KVM: number | null | undefined;
  sellingTotalPriceOfBuilding: number | null | undefined;
  sellingTotalPriceOfObject: number | null | undefined;
  numberOfResidentsInTheResidentialFacility: number | null;
  numberOfActualRegisteredResidents: number | null;
  PurchaseAndSaleProtocol: number | null | undefined;
  PurchaseAndSaleProtocolName?: string | null | undefined;
  dismantlingPossible: boolean,
  culturalMonument: number | null | undefined,
  culturalMonumentName?: string | null | undefined,
  deleteIds?: string[];
  passportFiles: {
    id: number;
    name: string;
    fileAccept: string;
    files: {
      id: string ;
      name?: string;
      url?: string;
      file: string;
    }[];
  }[];
  ownerDeleteId?: number[];
  personTypes: {
    id: number;
    ownerTypeId: number;
    ownerTypeName: string;
    contactNumber: string;
    tin: string;
    companyName: string;
    pin: string;
    fullname: string;
    value?:number;
    personType?:string;
  }[];
  location: {
    name: string | null | undefined;
    lat: number | null | undefined;
    lng: number | null | undefined;
  };
  note: string | null | undefined;
  signatureOfPropertyAffairsStateService: string | null | undefined;
  representativeOfDSHAK: string | null | undefined;
  representativeOfTheLocalExecutiveAuthority: string | null | undefined;
  ministryOfCultureRepresentative:string | null | undefined;
  statusName: string;
};

export type PassportFormModel = {
  passpostId: number;
  id: number;

  createdBy: string;
  createDate: string;
  passportIssueInfo: string;

  passportIssueDate: Date | null;

  passportNumber: string;
  objectLocation: string;

  objectArea: number;
  objectDesignation: number;

  landProperty: number | null;
  buildingProperty: number | null;

  landPropertyOfLawType: number | null;
  buildingPropertyOfLawType: number | null;

  objectCode: string;

  numberOfFloors: number | null;
  totalLandArea: number | null;
  totalLandAreaForDocument?: number | null;
  totalBuildingArea: number | null;
  totalBuildingAreaForDocument?: number | null;

  residentialArea: number | null;
  nonRresidentialArea: number | null;
  numberOfRooms: number | null;

  sellingPriceOfLand1KVM: number | null;
  sellingTotalPriceOfLand: number | null;
  sellingPriceOfBuilding1KVM: number | null;
  sellingTotalPriceOfBuilding: number | null;
  sellingTotalPriceOfObject: number | null;

  numberOfResidentsInTheResidentialFacility: number | null;
  numberOfActualRegisteredResidents: number | null;

  PurchaseAndSaleProtocol: number | null;

  dismantlingPossible: boolean;
  culturalMonument: number | null;

  existingTokens: any[];

  passportFiles: any[];

  personTypes: any[];

  location: {
    name: string | null;
    lat: number | null;
    lng: number | null;
  } | null;
  note: string;
  signatureOfPropertyAffairsStateService: string;
  representativeOfDSHAK: string;
  representativeOfTheLocalExecutiveAuthority: string;
  ministryOfCultureRepresentative: string;
};
export const emptyPassportForm: PassportFormModel = {
  passpostId: 0,
  id: 0,

  createdBy: "",
  createDate: "",
  passportIssueInfo: "",

  passportIssueDate: null,

  passportNumber: "",
  objectLocation: "",

  objectArea: 0,
  objectDesignation: 0,

  landProperty: null,
  buildingProperty: null,
  landPropertyOfLawType: null,
  buildingPropertyOfLawType: null,

  objectCode: "",

  numberOfFloors: null,
  totalLandArea: null,
  totalBuildingArea: null,
  residentialArea: null,
  nonRresidentialArea: null,
  numberOfRooms: null,

  sellingPriceOfLand1KVM: null,
  sellingTotalPriceOfLand: null,
  sellingPriceOfBuilding1KVM: null,
  sellingTotalPriceOfBuilding: null,
  sellingTotalPriceOfObject: null,

  numberOfResidentsInTheResidentialFacility: null,
  numberOfActualRegisteredResidents: null,

  PurchaseAndSaleProtocol: null,

  dismantlingPossible: false,
  culturalMonument: null,

  existingTokens: [],
  passportFiles: [],
  personTypes: [],

  location: null,

  note: "",
  signatureOfPropertyAffairsStateService: "",
  representativeOfDSHAK: "",
  representativeOfTheLocalExecutiveAuthority: "",
  ministryOfCultureRepresentative: "",
};
export type IncomeOrdersItemModel = {
  id: number;
  transporterName: string;
  customerName: string;
  startDate: string;
  endDate: string;
  passengerCount: number;
  startLocationName: string;
  endLocationName: string;
  status: BaseType;
  actorTypeDtos: BaseType[];
  actions: BaseType[];
};

type DataType = {
  id: number;
  passportNumber:string | null;
  ownerName: string | null;
  finOrVoen: string | null;
  address: string;
  destination: string;
  propertyType: string;
  ownershipType: string;
  status: boolean;
  actions:BaseType[]
};

export type PassportGetAllModel = {
  datas: DataType[];
  size: number;
  index: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
  min: number;
  max: number;
};
export type UpdatePassportRequest = PassportFormModel & {
  id: number;
  deleteIds: string[];
  ownerDeleteIds: string[];
  existingTokens?: any[];
};
import { AreaModel } from "@/data/model/area.model";
import { BuildingOwnershipTypeModel } from "@/data/model/buildingOwnershipType.model";
import { BuildingPropertyTypeModel } from "@/data/model/buildingPropertyType.model";
import { DestinationModel } from "@/data/model/destination.model";
import { LandOwnershipTypeModel } from "@/data/model/landOwnershipType.model";
import { LandPropertyTypeModel } from "@/data/model/landPropertyType.model";
import { OwnerTypeModel } from "@/data/model/ownerType.model";
import { SaleTransactionTypeModel } from "@/data/model/saleTransactionType.model";
import { BaseType } from "@/data/types/base.type";

export type DropdownsRespositoryType = {
  getDestination(): Promise<DestinationModel[]>;
  getArea(): Promise<AreaModel[]>;
  getSaleTransactionType(): Promise<SaleTransactionTypeModel[]>;
  getOwnerType(): Promise<OwnerTypeModel[]>;
  getBuildingPropertyType(): Promise<BuildingPropertyTypeModel[]>;
  getBuildingOwnershipType(): Promise<BuildingOwnershipTypeModel[]>;
  getLandPropertyType(): Promise<LandPropertyTypeModel[]>;
  getLandOwnershipType(): Promise<LandOwnershipTypeModel[]>;
  getCulturalMonumentsType():Promise<BaseType[]>;
};

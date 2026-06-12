import { AreaDTO } from "@/data/dto/area.dto";
import { BuildingOwnershipTypeDTO } from "@/data/dto/buildingOwnershipType.dto";
import { BuildingPropertyTypeDTO } from "@/data/dto/buildingPropertyType.dto";
import { CulturalMonumentsDTO } from "@/data/dto/culturalMonuments.dto";
import { DestinationDTO } from "@/data/dto/destination.dto";
import { LandOwnershipTypeDTO } from "@/data/dto/landOwnershipType.dto";
import { LandPropertyTypeDTO } from "@/data/dto/landPropertyType.dto";
import { OwnerTypeDTO } from "@/data/dto/ownerType.dto";
import { SaleTransactionTypesDTO } from "@/data/dto/saleTransactionType.dto";
import { AreaModel } from "@/data/model/area.model";
import { BuildingOwnershipTypeModel } from "@/data/model/buildingOwnershipType.model";
import { BuildingPropertyTypeModel } from "@/data/model/buildingPropertyType.model";
import type { DestinationModel } from "@/data/model/destination.model";
import { LandOwnershipTypeModel } from "@/data/model/landOwnershipType.model";
import { LandPropertyTypeModel } from "@/data/model/landPropertyType.model";
import { OwnerTypeModel } from "@/data/model/ownerType.model";
import { SaleTransactionTypeModel } from "@/data/model/saleTransactionType.model";
import { BaseType } from "@/data/types/base.type";

export const destinationMigration = {
  migrateToModel(dto: DestinationDTO): DestinationModel[] {
    const destinations = dto.destinations;
    return destinations.map((destination) => {
      return {
        id: destination.id,
        name: destination.name,
      };
    });
  },
};

export const areaMigration = {
  migrateToModel(dto: AreaDTO): AreaModel[] {
    const areas = dto.areas;
    return areas.map((area) => {
      return {
        id: area.id,
        name: area.name,
        description: area.description,
      };
    });
  },
};

export const saleTransactionTypeMigration = {
  migrateToModel(dto: SaleTransactionTypesDTO): SaleTransactionTypeModel[] {
    const saleTransactionTypes = dto.saleTransactionTypes;
    return saleTransactionTypes.map((saleTransactionType) => {
      return {
        id: saleTransactionType.id,
        name: saleTransactionType.name,
      };
    });
  },
};

export const ownerTypeMigration = {
  migrateToModel(dto: OwnerTypeDTO): OwnerTypeModel[] {
    const ownerTypes = dto.ownerTypes;
    return ownerTypes.map((ownerType) => {
      return {
        id: ownerType.id,
        name: ownerType.name,
      };
    });
  },
};

export const buildingPropertyTypeMigration = {
  migrateToModel(dto: BuildingPropertyTypeDTO): BuildingPropertyTypeModel[] {
    const buildingPropertyTypes = dto.buildingPropertyTypes;
    return buildingPropertyTypes.map((buildingPropertyType) => {
      return {
        id: buildingPropertyType.id,
        name: buildingPropertyType.name,
      };
    });
  },
};

export const buildingOwnershipTypeMigration = {
  migrateToModel(dto: BuildingOwnershipTypeDTO): BuildingOwnershipTypeModel[] {
    const buildingOwnershipTypes = dto.buildingOwnershipTypes;
    return buildingOwnershipTypes.map((buildingOwnershipType) => {
      return {
        id: buildingOwnershipType.id,
        name: buildingOwnershipType.name,
      };
    });
  },
};

export const landPropertyTypeMigration = {
  migrateToModel(dto: LandPropertyTypeDTO): LandPropertyTypeModel[] {
    const landPropertyTypes = dto.landPropertyTypes;
    return landPropertyTypes.map((landPropertyType) => {
      return {
        id: landPropertyType.id,
        name: landPropertyType.name,
      };
    });
  },
};

export const landOwnershipTypeMigration = {
  migrateToModel(dto: LandOwnershipTypeDTO): LandOwnershipTypeModel[] {
    const landOwnershipTypes = dto.landOwnershipTypes;
    return landOwnershipTypes.map((landOwnershipType) => {
      return {
        id: landOwnershipType.id,
        name: landOwnershipType.name,
      };
    });
  },
};

export const culturalMonumentsMigration = {
  migrateToModel(dto: CulturalMonumentsDTO): BaseType[] {
    const culturalMonuments = dto.culturalMonuments;
    return culturalMonuments.map((culturalMonument) => {
      return {
        id: culturalMonument.id,
        name: culturalMonument.name,
      };
    });
  },
};
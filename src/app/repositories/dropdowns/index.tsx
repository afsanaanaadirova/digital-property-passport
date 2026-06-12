import {
  areaMigration,
  buildingOwnershipTypeMigration,
  buildingPropertyTypeMigration,
  culturalMonumentsMigration,
  destinationMigration,
  landOwnershipTypeMigration,
  landPropertyTypeMigration,
  ownerTypeMigration,
  saleTransactionTypeMigration,
} from "@/app/migration/dropdowns.migration";
import {
  getAreasService,
  getBuildingOwnershipTypeService,
  getBuildingPropertyTypesService,
  getCulturalMonumentsService,
  getDestinationsService,
  getLandOwnershipTypesService,
  getLandPropertyTypesService,
  getOwnerTypesService,
  getSaleTransactionTypesService,
} from "@/app/services/dropdowns.service";
import { DropdownsRespositoryType } from "./dropdowns.repository.type";

const DropdownsRepository: DropdownsRespositoryType = {
  async getDestination() {
    const destinations = await getDestinationsService();
    const migratedDestination =
      destinationMigration.migrateToModel(destinations);
    return migratedDestination;
  },
  async getArea() {
    const areas = await getAreasService();
    const migratedArea = areaMigration.migrateToModel(areas);
    return migratedArea;
  },
  async getSaleTransactionType() {
    const saleTransactionTypes = await getSaleTransactionTypesService();
    const migratedSaleTransactionType =
      saleTransactionTypeMigration.migrateToModel(saleTransactionTypes);
    return migratedSaleTransactionType;
  },
  async getOwnerType() {
    const ownerTypes = await getOwnerTypesService();
    const migratedOwnerType = ownerTypeMigration.migrateToModel(ownerTypes);
    return migratedOwnerType;
  },
  async getBuildingPropertyType() {
    const buildingPropertyTypes = await getBuildingPropertyTypesService();
    const migratedBuildingPropertyType =
      buildingPropertyTypeMigration.migrateToModel(buildingPropertyTypes);
    return migratedBuildingPropertyType;
  },
  async getBuildingOwnershipType() {
    const buildingOwnershipType = await getBuildingOwnershipTypeService();
    const migratedBuildingOwnershipType =
      buildingOwnershipTypeMigration.migrateToModel(buildingOwnershipType);
    return migratedBuildingOwnershipType;
  },
  async getLandPropertyType() {
    const landPropertyTypes = await getLandPropertyTypesService();
    const migratedLandPropertyType =
      landPropertyTypeMigration.migrateToModel(landPropertyTypes);
    return migratedLandPropertyType;
  },
  async getLandOwnershipType() {
    const landPropertyTypes = await getLandOwnershipTypesService();
    const migratedLandPropertyType =
      landOwnershipTypeMigration.migrateToModel(landPropertyTypes);
    return migratedLandPropertyType;
  },
  async getCulturalMonumentsType() {
    const culturalMonuments = await getCulturalMonumentsService();
    const migratedCulturalMonuments =
      culturalMonumentsMigration.migrateToModel(culturalMonuments);
    return migratedCulturalMonuments;
  }
};

export default DropdownsRepository;

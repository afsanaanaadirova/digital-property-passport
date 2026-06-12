import { endpoints } from "@/data/utils/endpoints";
import axiosInstance from "../lib/axios.config";
import { validator } from "@/app/helpers/validator";
import { DestinationDTO } from "@/data/dto/destination.dto";
import { destinationSchema } from "@/data/schemas/dtoValidations/destination.schema";
import { areaSchema } from "@/data/schemas/dtoValidations/area.schema";
import { AreaDTO } from "@/data/dto/area.dto";
import { SaleTransactionTypesDTO } from "@/data/dto/saleTransactionType.dto";
import { saleTransactionTypesSchema } from "@/data/schemas/dtoValidations/saleTransactionType.schema";
import { ownerTypesSchema } from "@/data/schemas/dtoValidations/ownerType.schema";
import { OwnerTypeDTO } from "@/data/dto/ownerType.dto";
import { BuildingPropertyTypeDTO } from "@/data/dto/buildingPropertyType.dto";
import { buildingPropertyTypeSchema } from "@/data/schemas/dtoValidations/buildingPropertyType.schema";
import { BuildingOwnershipTypeDTO } from "@/data/dto/buildingOwnershipType.dto";
import { buildingOwnershipTypeSchema } from "@/data/schemas/dtoValidations/buildingOwnershipType.schema";
import { LandPropertyTypeDTO } from "@/data/dto/landPropertyType.dto";
import { landPropertyTypeSchema } from "@/data/schemas/dtoValidations/landPropertyType.schema";
import { LandOwnershipTypeDTO } from "@/data/dto/landOwnershipType.dto";
import { landOwnershipTypeSchema } from "@/data/schemas/dtoValidations/landOwnershipType.schema";
import { CulturalMonumentsDTO } from "@/data/dto/culturalMonuments.dto";
import { culturalMonumentsTypeSchema } from "@/data/schemas/dtoValidations/culturalMonumentsType.schema";

export const getDestinationsService = async () => {
  const res = await axiosInstance.get<DestinationDTO>(endpoints.destinations());
  return validator({
    endpoint: endpoints.destinations(),
    schema: destinationSchema,
    response: res.data,
  });
};

export const getAreasService = async () => {
  const res = await axiosInstance.get<AreaDTO>(endpoints.areas());

  return validator({
    endpoint: endpoints.areas(),
    schema: areaSchema,
    response: res.data,
  });
};

export const getSaleTransactionTypesService = async () => {
  const res = await axiosInstance.get<SaleTransactionTypesDTO>(
    endpoints.saleTransactionTypes()
  );

  return validator({
    endpoint: endpoints.saleTransactionTypes(),
    schema: saleTransactionTypesSchema,
    response: res.data,
  });
};

export const getOwnerTypesService = async () => {
  const res = await axiosInstance.get<OwnerTypeDTO>(endpoints.ownerTypes());

  return validator({
    endpoint: endpoints.ownerTypes(),
    schema: ownerTypesSchema,
    response: res.data,
  });
};

export const getBuildingPropertyTypesService = async () => {
  const res = await axiosInstance.get<BuildingPropertyTypeDTO>(
    endpoints.buildingPropertyTypes()
  );

  return validator({
    endpoint: endpoints.buildingPropertyTypes(),
    schema: buildingPropertyTypeSchema,
    response: res.data,
  });
};

export const getBuildingOwnershipTypeService = async () => {
  const res = await axiosInstance.get<BuildingOwnershipTypeDTO>(
    endpoints.buildingOwnershipTypes()
  );
  return validator({
    endpoint: endpoints.buildingOwnershipTypes(),
    schema: buildingOwnershipTypeSchema,
    response: res.data,
  });
};

export const getLandPropertyTypesService = async () => {
  const res = await axiosInstance.get<LandPropertyTypeDTO>(
    endpoints.landPropertyTypes()
  );

  return validator({
    endpoint: endpoints.landPropertyTypes(),
    schema: landPropertyTypeSchema,
    response: res.data,
  });
};

export const getLandOwnershipTypesService = async () => {
  const res = await axiosInstance.get<LandOwnershipTypeDTO>(
    endpoints.landOwnershipTypes()
  );
  return validator({
    endpoint: endpoints.landOwnershipTypes(),
    schema: landOwnershipTypeSchema,
    response: res.data,
  });
};

export const getCulturalMonumentsService = async () => {
  const res = await axiosInstance.get<CulturalMonumentsDTO>(
    endpoints.culturalMonuments()
  );
  return validator({
    endpoint: endpoints.culturalMonuments(),
    schema: culturalMonumentsTypeSchema,
    response: res.data,
  });
};

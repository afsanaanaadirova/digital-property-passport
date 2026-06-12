import { RevalidateTagsEnum } from "@/data/enum/revalidate_tags.enum";
import { useQuery } from "@tanstack/react-query";
import CommonRepository from "@/app/repositories/dropdowns";

export const useDestinations = () => {
  return useQuery({
    queryKey: [RevalidateTagsEnum.DESTINATION],
    queryFn: () => {
      return CommonRepository.getDestination();
    },
  });
};

export const useAreas = () => {
  return useQuery({
    queryKey: [RevalidateTagsEnum.AREAS],
    queryFn: () => {
      return CommonRepository.getArea();
    },
  });
};

export const useSaleTransactionTypes = () => {
  return useQuery({
    queryKey: [RevalidateTagsEnum.SALETRANSACTIONTYPES],
    queryFn: () => {
      return CommonRepository.getSaleTransactionType();
    },
  });
};

export const useOwnerTypes = () => {
  return useQuery({
    queryKey: [RevalidateTagsEnum.OWNERTYPES],
    queryFn: () => {
      return CommonRepository.getOwnerType();
    },
  });
};

export const useBuildingPropertyTypes = () => {
  return useQuery({
    queryKey: [RevalidateTagsEnum.BUILDINGPROPERTYTYPES],
    queryFn: () => {
      return CommonRepository.getBuildingPropertyType();
    },
  });
};

export const useBuildingOwnershipTypes = () => {
  return useQuery({
    queryKey: [RevalidateTagsEnum.BUILDINGOWNERSHIPTYPES],
    queryFn: () => {
      return CommonRepository.getBuildingOwnershipType();
    },
  });
};

export const useLandPropertyshipTypes = () => {
  return useQuery({
    queryKey: [RevalidateTagsEnum.LANDPROPERTYTYPES],
    queryFn: () => {
      return CommonRepository.getLandPropertyType();
    },
  });
};

export const useLandOwnershipTypes = () => {
  return useQuery({
    queryKey: [RevalidateTagsEnum.LANDOWNERSHIPTYPES],
    queryFn: () => {
      return CommonRepository.getLandOwnershipType();
    },
  });
};

export const useCulturalMonuments = () =>{
  return useQuery({
    queryKey:[],
    queryFn:()=>{
      return CommonRepository.getCulturalMonumentsType()
    }
  })
}

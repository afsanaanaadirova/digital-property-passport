import { BaseType } from "@/data/types/base.type";

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

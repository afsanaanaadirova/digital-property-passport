import { RequestStateEnum } from "@/ui/shared/Select/request_state.enum";
import type { ReactNode } from "react";

export type CardHeadDataType<T> = {
  id: number;
  name?: ((row: T) => ReactNode) | string;
  key?:any;
  render?: (row: T) => ReactNode;
  status?: string[];
  className?: string;
  rowClassName?: string;
  suffix?: string;
};

export type CardType<T> = {
  title?: ReactNode;
  headData: CardHeadDataType<T>[];
  bodyData: T | undefined | any;
  state?: RequestStateEnum;
  className?: string;
  rowClassName?: string;
};

export type CardFactoryType<T> = Pick<CardType<T>,"bodyData">

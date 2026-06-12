import { PropsWithChildren, ReactNode } from "react";
import { ETable } from "../Table/e_table";

export type THeadDataType<T> = {
  id: number;
  name?: string | ReactNode;
  className?: string;
  key?: (number | string)[];
  render?: (item: T, index?: number) => void;
};

export type TRTDType = PropsWithChildren<{
  className?: string;
}>;

export type THeadType<T> = {
  data?: THeadDataType<T>[];
};

export type TTable<T> = {
  tHeadData: THeadDataType<T>[];
  tableData: T[];
  state: ETable | any;
  title?: ReactNode;
  loading?: boolean;
  pagination?: {
    totalCount: number;
    setCurrentPage: (page: number) => void;
    currentPage: number;
    size: number;
  };
  handleClickPrivilage?: (id: number, appealId?: number) => void;
  className?: string;
};

export type TTitleData = PropsWithChildren<{
  className?: string;
}>;

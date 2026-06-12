import { ReactEventHandler } from "react";

export type TCombineClickActionsP = (
  btnType: "previous" | "next" | "page",
  page?: number | null,
  originalOnClick?: ReactEventHandler<Element> | (() => void)
) => () => void;

export type TPaginationComponent = {
  totalPagesCount: number;
  currentPage: number;
  isLoading: boolean;
  isError: boolean;
  setCurrentPage: (current: number) => void;
};

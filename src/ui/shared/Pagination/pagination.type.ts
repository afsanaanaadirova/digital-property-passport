export interface PaginationType {
  total: number;
  perPage?: number;
  active?: number;
  pageChange?: (page: number) => void;
}

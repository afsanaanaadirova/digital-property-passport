import { QueryClient } from "@tanstack/react-query";

export type MutateType<T> = {
  queryClient: QueryClient;
  queryKey: string[];
  updateFunction: (previousData: T) => T;
};

import type { MutateType } from "@/data/types/mutate.type";

export const mutate = async <T>({
  queryClient,
  queryKey,
  updateFunction,
}: MutateType<T>): Promise<{ previousData: T }> => {
  await queryClient.cancelQueries({ queryKey });
  const previousData = queryClient.getQueryData<T>(queryKey)!;
  queryClient.setQueryData<T>(queryKey, updateFunction(previousData));

  return { previousData };
};

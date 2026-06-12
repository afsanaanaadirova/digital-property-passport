import type { FieldValues, UseFormReturn } from "react-hook-form";

export const handleError = (
  key: string,
  methods: UseFormReturn<FieldValues, any, undefined>
): string => {
  const keys = key.split(".");
  let result: Record<string, any> = methods.formState.errors;
  for (const k of keys) {
    if (result && result.hasOwnProperty(k)) {
      result = result[k];
    } else {
      return "";
    }
  }
  return result.message;
};

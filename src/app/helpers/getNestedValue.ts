import type { NestedKeysType } from "@/data/types/nested_keys.type";

export const getNestedValue = <T>(
  obj: T,
  keys: NestedKeysType<T>,
  defaultText: string = "Təyin olunmayıb",
  suffix: string = ""
) => {
  if (Array.isArray(keys)) {
    return (
      keys.reduce((acc: any, part) => acc && (acc[part] || defaultText), obj) +
      " " +
      (suffix && suffix)
    );
  }
  return obj[keys];
};

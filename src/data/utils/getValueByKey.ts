export const getNestedValue = <T>(obj: T, keys?: (number | string)[]) => {
    return keys?.reduce((acc: any, key) => acc?.[key], obj);
  };
  
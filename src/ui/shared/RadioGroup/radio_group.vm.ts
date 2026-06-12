import { ReactNode, useState } from "react";
import {
  type FieldValues,
  useFormContext,
  type UseFormReturn,
} from "react-hook-form";
import { RadioGroupType } from "./radio_group.type";

export const RadioGroupVM = <
  T extends { id: number; disabled?: boolean; render: ReactNode }
>({
  data,
  name,
  value,
  onChange,
}: Pick<RadioGroupType<T>, "data" | "name" | "value" | "onChange">) => {
  const methods: UseFormReturn<FieldValues, any, undefined> = useFormContext();
  const hasMethods = methods && methods.formState;
  const mainValue = hasMethods ? methods.getValues(name) : value;

  const initialValue = (val: T | null | number | undefined) => {
    if (val === undefined || val === null) {
      return null;
    }
    if (typeof val === "number") {
      return data.find((d) => d.id === val)?.id || null;
    }
    return val;
  };
  const [innerValue, setInnerValue] = useState(() => initialValue(mainValue));

  const handleSelect = (val: T): void => {
    if (methods) {
      methods.setValue(name, val.id);
      methods.trigger(name);
    }
    setInnerValue(val);
    onChange?.(val);
  };

  return { innerValue, handleSelect };
};

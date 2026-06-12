import { Fragment, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { TRadio } from "./TRadio";
import RadioOption from "./RadioOption";
import { BaseType } from "@/data/types/base.type";
import { twMerge } from "tailwind-merge";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";

const Radio = <T extends BaseType>({
  dataError,
  data,
  option,
  title,
  value,
  onChange,
  error,
  className,
}: TRadio<T>) => {
  const [selected, setSelected] = useState<number | null | boolean | undefined>(value ?? null);

  useUpdateEffect(() => {
    if (value !== null || value !== undefined ) {
      setSelected(value);
    }
  }, [value]);
  useUpdateEffect(() => {
    if (value !== null || value !== undefined) {
      setSelected(value)
    }
  }, [value])
  return (
    <div
      className={twMerge("w-full errorFieldFocus", className)}
      data-error={dataError}
    >
      <RadioGroup
        value={selected}
        onChange={(val) => {
          setSelected(val);
          onChange?.(data.find((d) => d.id === val)!);
        }}
      >
        {title && (
          <RadioGroup.Label className="mb-4">
            <h5 className="text-16px500 text-gray-800">{title}</h5>
          </RadioGroup.Label>
        )}
        <div className={twMerge("flex flex-col gap-3 w-full md:flex-row  mt-3", className)}>
          {data?.map((d) => (
            <Fragment key={d.id}>{option(d)}</Fragment>
          ))}
        </div>
        {error && (
          <span role="alert" className="text-error-500 text-14px400">
            {error.message}
          </span>
        )}
      </RadioGroup>
    </div>
  );
};
Radio.Option = RadioOption;
export default Radio;

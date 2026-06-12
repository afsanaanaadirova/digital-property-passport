import { Field, Radio, RadioGroup as HRadioGroup } from "@headlessui/react";
import { type ReactNode } from "react";
import type { RadioGroupType } from "./radio_group.type";
import { RadioGroupVM } from "./radio_group.vm";

const RadioGroup = <
  T extends { id: number; disabled?: boolean; render: ReactNode }
>({
  name,
  data,
  className,
  value,
  onChange,
}: RadioGroupType<T>) => {
  const { innerValue, handleSelect } = RadioGroupVM({
    data,
    name,
    value,
    onChange,
  });

  return (
    <HRadioGroup
      value={innerValue}
      onChange={handleSelect}
      className={className}
      aria-label={name}
    >
      {data.map((d) => (
        <Field
          key={d.id}
          disabled={d.disabled}
          className="w-full cursor-pointer"
        >
          <Radio value={d} className="group">
            {d.render}
          </Radio>
        </Field>
      ))}
    </HRadioGroup>
  );
};

export default RadioGroup;

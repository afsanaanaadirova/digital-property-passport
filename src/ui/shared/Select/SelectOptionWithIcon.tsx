import { ListboxOption } from "@headlessui/react";
import type { SelectDataType } from "./select.type";
import ChevronUpSVG from "@svg/chevron_up.svg?react";

const SelectOptionWithIcon = <T extends SelectDataType>({
  data,
}: {
  data: T;
}) => {
  return (
    <ListboxOption
      className="flex items-center relative cursor-default select-none text-gray-900 p-2 rounded data-[focus]:bg-gray-100 data-[selected]:bg-blue-50"
      disabled={data.disabled}
      value={data}
    >
      <ChevronUpSVG className="size-4" />
      {data.name}
    </ListboxOption>
  );
};

export default SelectOptionWithIcon;

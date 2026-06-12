import { ListboxOption } from "@headlessui/react";
import type { SelectDataType } from "./select.type";

const SelectOptionBase = <T extends SelectDataType>({ data }: { data: T }) => {
  return (
    <ListboxOption
      className="relative cursor-pointer select-none text-gray-900 p-2 rounded data-[focus]:bg-gray-100 data-[selected]:bg-blue-50"
      disabled={data.disabled}
      value={data}
    >
      {data.name}
    </ListboxOption>
  );
};

export default SelectOptionBase;

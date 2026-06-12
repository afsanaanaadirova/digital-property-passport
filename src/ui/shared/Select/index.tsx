import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment, ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import type { SelectDataType, SelectType } from "./select.type";
import { SelectOptionVariantEnum } from "./select.enum";
import { SelectVM } from "./select.vm";
import XSVG from "@svg/x.svg?react";
import ChevronUpSVG from "@svg/chevron_up.svg?react";
import SelectOptionFactory from "./SelectOptionFactory";
import { handleError } from "@/app/helpers/handleError";

const Select = <T extends SelectDataType>({
  data,
  className,
  classNameSelect,
  label,
  name,
  hasReset = true,
  selectionMode = true,
  variant = SelectOptionVariantEnum.BASE,
  value,
  onChange,
}: SelectType<T>): ReactElement => {
  const {
    innerValue,
    handleSelect,
    resetHandler,
    hasMethods,
    methods,
    rectLocation,
    listsRef,
    selectRef,
    handleScroll
  } = SelectVM({
    data,
    value,
    name,
    onChange,
  });

  return (
    <div className={twMerge("w-full", className)} onClick={handleScroll}>
      <Listbox value={innerValue} onChange={handleSelect} ref={selectRef}>
        {({ open }) => {
          return (
            <div className="relative">
              <ListboxButton
                className={[
                  "relative flex items-center justify-between w-full cursor-default h-11 rounded-lg bg-[#F5F5F5] py-2 p-3 border text-left sm:text-sm",
                  hasMethods &&
                  handleError(name, methods) &&
                  methods.formState.submitCount > 0
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-gray-400",
                  classNameSelect,
                ].join(" ")}
              >
                {label && (
                  <span
                    className={`block truncate duration-100 text-11px400 absolute text-gray-500 ${
                      innerValue?.id === null
                        ? "opacity-0"
                        : "top-1/2 -translate-y-[20px] px-1 left-2 text-xs"
                    }`}
                  >
                    {label}
                  </span>
                )}
                <span
                  className={[
                    "block truncate duration-100",
                    innerValue.id !== null && !!label ? "translate-y-1.5" : "",
                    innerValue.id === null && !label ? "text-gray-500" : "",
                  ].join(" ")}
                >
                  {innerValue.id !== null ? innerValue.name : label || "Seçin"}
                </span>
                <div className={`flex items-center gap-2 pl-3 ml-auto`}>
                  {innerValue?.id !== null && hasReset && (
                    <div className="bg-gray-200 rounded-full cursor-pointer size-6 flex items-center justify-center">
                      <XSVG onClick={resetHandler} className="size-4" />
                    </div>
                  )}
                  <span
                    className={[
                      "pointer-events-none relative duration-300 ease-in  flex items-center",
                      open ? "-rotate-0" : "rotate-180",
                    ].join(" ")}
                  >
                    <ChevronUpSVG className="size-3" />
                  </span>
                </div>
              </ListboxButton>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions
                  className={`absolute mt-1 max-h-52 w-full overflow-auto rounded-md bg-white p-1 ring-1 ring-black/5 z-50 ${
                    selectionMode && rectLocation && rectLocation < 350
                      ? "bottom-[65px]"
                      : ""
                  }`}
                >
                  <div ref={listsRef}>
                    {data.length ? (
                      data.map((d) => (
                        <SelectOptionFactory
                          key={d.id}
                          data={d}
                          variant={variant}
                        />
                      ))
                    ) : (
                      <p className="text-center">Məlumat yoxdur</p>
                    )}
                  </div>
                </ListboxOptions>
              </Transition>
            </div>
          );
        }}
      </Listbox>
      {hasMethods &&
      handleError(name, methods) &&
      methods.formState.submitCount > 0 ? (
        <span role="alert" className="text-red-500 text-14px400">
          {handleError(name, methods)}
        </span>
      ) : null}
    </div>
  );
};

export default Select;

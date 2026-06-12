import { BaseType } from "@/data/types/base.type";
import { RadioGroup } from "@headlessui/react";
import { ReactNode } from "react";
type Props = {
  data: BaseType;
  radioOptionClasses?: string;
  Icon?: ReactNode;
};
const RadioOption = ({ data, radioOptionClasses, Icon }: Props) => {
  return (
    <RadioGroup.Option
      key={data.name}
      value={data.id}
      className={[
        `bg-[#F5F5F5] relative flex items-center gap-2 cursor-pointer rounded-lg px-[14px] py-4 border border-gray-300`,
        radioOptionClasses,
      ].join(" ")}
    >
      {({ checked }) => (
        <>
          <div
            className={[
              "relative min-w-[24px] min-h-[24px] w-6 h-6 border rounded-full",
              checked
                ? "border-[#D2AB67] bg-[#D2AB67] after:absolute after:inset-1.5 after:bg-white after:rounded-full"
                : "border-gray",
            ].join(" ")}
          />

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center w-full">
              <div className="text-sm w-full">
                <div className="flex justify-between">
                  <RadioGroup.Label
                    as="p"
                    className="text-black text-16px400 ml-1 flex justify-between w-max"
                  >
                    {data.name}
                  </RadioGroup.Label>
                  {Icon}
                </div>
                <RadioGroup.Description
                  as="span"
                  className={`inline ${
                    checked ? "text-sky-100" : "text-gray-500"
                  }`}
                ></RadioGroup.Description>
              </div>
            </div>
          </div>
        </>
      )}
    </RadioGroup.Option>
  );
};
export default RadioOption;

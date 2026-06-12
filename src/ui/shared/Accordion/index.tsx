import { Disclosure, Transition } from "@headlessui/react";
import { TAccordion } from "./TAccordion";
import { twMerge } from "tailwind-merge";

const Accordion = ({
  className,
  accordionButton,
  defaultOpen,
  setClose,
  buttonClassName,
  panelClassName,
  children,
}: TAccordion) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open, close }) => {
        setClose && open && close();
        return (
          <>
            <div className={twMerge(`flex flex-col items-end w-full`, className)}>
              <Disclosure.Button
                className={["text-inherit", buttonClassName].join(" ")}
              >
                {accordionButton}
              </Disclosure.Button>
              <Transition
                enter="transition transition-all duration-300 ease-in !overflow-hidden"
                enterFrom="transform max-h-0 w-full"
                enterTo="transform max-h-[2000px] pt-0 w-full md:pt-5"
                leave="transition transition-all duration-200 ease-out !overflow-hidden"
                leaveFrom="transform max-h-[2000px] pt-0 w-full md:pt-5"
                leaveTo="transform max-h-0 w-full"
              >
                <Disclosure.Panel className={panelClassName}>
                  {children}
                </Disclosure.Panel>
              </Transition>
            </div>
          </>
        );
      }}
    </Disclosure>
  );
};

export default Accordion;

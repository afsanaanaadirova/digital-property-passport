import { Popover as PopoverH } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { TPopover } from "@/ui/shared/Popover/TPopover.ts";
import { useState } from "react";

const Popover = ({
  button,
  panelClassName = "",
  popoverClassName = "",
  popoverButtonClassName = "",
  children,
  onMouseEnter,
  setPopOverOpen,
  popOverOpen,
  onMouseLeave,
  onClick
}: TPopover) => {
  const [isOpen, setIsOpen] = useState(popOverOpen);
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-30 pointer-events-none"></div>
      )}
      <PopoverH
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={twMerge(
          "relative h-full w-fit after:absolute",
          popoverClassName
        )}
      >
        {({ open }) => {
          if (setPopOverOpen) {
            setIsOpen(open);
          }

          return (
            <>
              <PopoverH.Button
                className={twMerge("w-full h-full", popoverButtonClassName)}
                onClick={onClick}
              >
                {button}
              </PopoverH.Button>
              
              {open ? (
                <PopoverH.Panel
                  static
                  className={twMerge(
                    "absolute border-gray-300 bg-white rounded-lg z-40 right-0",
                    panelClassName
                  )}
                >
                  {children}
                </PopoverH.Panel>
              ) : null}
            </>
          );
        }}
      </PopoverH>
    </div>
  );
};

export default Popover;

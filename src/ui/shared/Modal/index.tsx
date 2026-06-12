import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TModal } from "./modal.type";
import XSVG from "@svg/x.svg?react";

const Modal = ({
  children,
  title,
  dialogClassName,
  dialogClassNameHeader,
  visible,
  clickOutside = true,
  setVisible,
  hasClose,
}: TModal) => {
  return (
    <Transition show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 "
        onClose={() => clickOutside && setVisible(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="w-full flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={[
                  "transform rounded bg-white text-left align-middle shadow-xl transition-all md:p-8 p-5",
                  dialogClassName,
                ].join(" ")}
              >
                <div
                  className={[
                    "flex items-center justify-between gap-4",
                    dialogClassNameHeader,
                  ].join(" ")}
                >
                  {title && (
                    <h3 className="text-16px600 md:text-18px600">{title}</h3>
                  )}

                  {hasClose && (
                    <button
                      onClick={() => setVisible(false)}
                      className="ml-auto hover:bg-gray-100 rounded-full p-[10px]"
                    >
                      <XSVG className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

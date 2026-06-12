import { PropsWithChildren } from "react";

export type TModal = PropsWithChildren & {
  title?: any;
  hasClose?: boolean;
  dialogClassName?: string;
  dialogClassNameHeader?:string;
  visible: boolean;
  clickOutside?: boolean;
  setVisible: (visible: boolean) => void;
};

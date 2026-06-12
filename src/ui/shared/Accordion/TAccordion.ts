import { PropsWithChildren, ReactNode } from "react";

export type TAccordion = PropsWithChildren & {
    accordionButton: ReactNode;
    defaultOpen?: boolean;
    setClose?: boolean;
    overflow?: boolean;
    buttonClassName?: string;
    panelClassName?: string;
    className?: string;
  }
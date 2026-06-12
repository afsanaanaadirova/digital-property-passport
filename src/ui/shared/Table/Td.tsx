import { TRTDType } from "../Title/TTable";
import { twMerge } from "tailwind-merge";

export const TD = ({ children, className }: TRTDType) => {
  return <td className={twMerge(`w-auto ${className || ""}`)}>{children}</td>;
};

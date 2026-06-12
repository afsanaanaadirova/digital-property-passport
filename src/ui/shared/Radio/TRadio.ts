import { BaseType } from "@/data/types/base.type";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

export type TRadio<T> = {
  dataError: string;
  data: T[];
  option: (opt: T) => ReactNode;
  selected?:any,
  title?: string;
  value: number | null | boolean | undefined;
  error?: FieldError;
  className?: string;
  radioOptionClasses?: string;
  onChange: (value: BaseType) => void;
  defaultValue?:number,
};

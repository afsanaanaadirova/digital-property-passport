import type { TextareaHTMLAttributes } from "react";

//TODO: if onDebounce works isDebounce required

export type TextareaType = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange"
> & {
  label?: string;
  placeholder?: string;
  name: string;
  isDebounce?: boolean;
  inputClassName?: string;
  onChange?: (value: string) => void;
  onDebounce?: (value: string) => void;
};
import { ReactNode } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

export type TTextarea = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange"
> & {
  rows?: number;
  label?: string;
  placeholder?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  name: string;
  value?: string | number | readonly string[] | undefined | null;
  register?: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  isDebounce?: boolean;
  inputClassName?: string;
  className?: string;
  onChange?: (value: string) => void;
  onDebounce?: (val: string) => void;
};

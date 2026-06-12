import type { DetailedHTMLProps, FormHTMLAttributes } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export type FormType = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  methods: UseFormReturn<FieldValues, any, FieldValues> | any;
};

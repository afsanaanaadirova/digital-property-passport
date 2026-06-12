import { FieldError } from "react-hook-form";

export type TDatepickerProps = {
  dataError?: string;
  title?: string;
  value: Date;
  error?: FieldError | undefined;
  className?: string;
  disabled?: boolean;
  disablePast?: boolean;
  // Date | undefined | null
  onChange: (value: string) => void;
};

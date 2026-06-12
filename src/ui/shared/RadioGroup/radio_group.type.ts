import type { ReactNode } from "react";

export type RadioGroupType<
  T extends { id: number; disabled?: boolean; render: ReactNode }
> = {
  name: string;
  data: T[];
  className?: string;
  value?: T | null | number;
  onChange?: (value: T) => void;
};

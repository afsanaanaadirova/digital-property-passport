import { TR } from ".";
import { THeadType } from "../Title/TTable"
import { twMerge } from "tailwind-merge";

export const THead = <T,>({ data }: THeadType<T>) => {
  return (
    <thead>
      <TR className="border-b border-gray-200">
        {data?.map((th) => {
          return (
            <th key={th.id} className={twMerge(`h-12 text-14px500`,th.className)}>
              {th.name}
            </th>
          );
        })}
      </TR>
    </thead>
  );
};

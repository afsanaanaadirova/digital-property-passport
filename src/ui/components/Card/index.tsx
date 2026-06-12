import type { CardType } from "./card.type";
import { cn } from "@/app/utils/cn";
import { RequestStateEnum } from "@/ui/shared/Select/request_state.enum";
import Skeleton from "@/ui/shared/Skeleton";
import { CardFactory } from "./card.factory";

const Card = <T,>({
  headData,
  bodyData,
  title,
  state,
  className,
}: CardType<T>) => {
  const { renderCard} = CardFactory<T>({bodyData})

  return (
    <div className={cn("w-full h-full rounded-xl overflow-y-auto", className)}>
      {title && <div className="mb-2">{title}</div>}
      <ul className={cn(state !== RequestStateEnum.LOADING && "divide-y")}>
        {headData.map((header) =>
          state === RequestStateEnum.LOADING ? (
            <li
              key={header.id}
              className="flex justify-between items-center h-12 mb-2"
            >
              <Skeleton className="w-2/5 h-4" />
              <Skeleton className="w-1/5 h-4" />
            </li>
          ) : (
            <li
              key={header.id}
              className={cn('flex justify-between items-end  py-4', header.rowClassName)}
            >
              <span className="text-gray-500 w-full">
                {typeof header.name === "string" ? header.name : header.name!(bodyData!)}
              </span>
              <a
                className={cn(
                  "text-end text-gray-700 w-full b",
                  header.className
                )}
              >
                {
                  renderCard(header)[
                  state as Exclude<RequestStateEnum, RequestStateEnum.LOADING>
                  ]
                }
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Card;

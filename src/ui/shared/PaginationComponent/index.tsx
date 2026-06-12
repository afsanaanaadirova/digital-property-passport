import ArrowLeft from "@svg/leftArrowIcon.svg?react";
import ArrowRight from "@svg/rightArrowIcon.svg?react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/system";
import {
  TCombineClickActionsP,
  TPaginationComponent,
} from "./TPaginationComponent";
import { ReactEventHandler, SyntheticEvent } from "react";
import Select from "../Select";
import { useSearchParams } from "react-router-dom";

const List = styled("ul")({
  listStyle: "none",
  padding: "10px",
  margin: 0,
  display: "flex",
});

function PaginationComponent({
  setCurrentPage,
  currentPage,
  totalPagesCount,
}: TPaginationComponent) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { items } = usePagination({
    count: totalPagesCount,
    boundaryCount: 2,
    siblingCount: 2,
    defaultPage: 1,
    disabled: false,
    page: currentPage,
  });
  const combineClickActions: TCombineClickActionsP =
    (btnType, page, originalOnClick) => () => {
      const index = page ?? 1;
      if (btnType === "previous") {
        setCurrentPage(currentPage - 1);
      } else if (btnType === "next") {
        setCurrentPage(currentPage + 1);
      } else {
        setCurrentPage(index);
      }
      if (originalOnClick) {
        originalOnClick(undefined as unknown as SyntheticEvent<Element, Event>);
      }
    };

  const renderPaginationPage = (
    type: string,
    page: number | null,
    item: { onClick: ReactEventHandler<Element>; disabled: boolean }
  ) => {
    switch (type) {
      case "page":
        return renderButton(type, page, item);
      case "next":
        return renderButton(type, 0, item, <ArrowRight />);
      case "previous":
        return renderButton(type, 10000, item, <ArrowLeft />);
    }
  };
  const renderButton = (
    type: "page" | "next" | "previous",
    page: number | null,
    item: { onClick: ReactEventHandler<Element>; disabled: boolean },
    icon?: JSX.Element | undefined
  ) => (
    <button
      className={`px-4 py-2 ${
        type !== "page" &&
        `flex px-3 py-[13px] items-center gap-3 rounded-lg border   bg-white ${
          item.disabled && "text-gray-400"
        }`
      }`}
      type="button"
      {...item}
      onClick={combineClickActions(type, page, item.onClick)}
    >
      {type === "next" ? (
        <>
          {page === 0 ? "" : page}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {page === 10000 ? "" : page}
        </>
      )}
    </button>
  );

  return (
    <>
      <nav>
        {totalPagesCount > 1 && (
          <List className="items-center">
            {items.map(({ page, type, selected, ...item }, index) => {
              let children = null;
              if (type === "start-ellipsis" || type === "end-ellipsis") {
                children = <div className="px-6 py-4"> …</div>;
              } else {
                children = renderPaginationPage(type, page, item);
              }
              return (
                <li
                  className={`first:rounded-l-xl first:mr-5 last:ml-5 text-gray-700 text-14px600  rounded-[10px]  ${
                    selected && "bg-gray-200 border"
                  }`}
                  key={index}
                >
                  {children}
                </li>
              );
            })}
          </List>
        )}
      </nav>
      <div className="flex items-center">
        <span className="text-xs w-24">Səhifədə göstər</span>
        <Select
          hasReset={false}
          className="h-12 w-24"
          name="pageSize"
          data={[
            { id: 1, name: 5 },
            { id: 2, name: 10 },
            { id: 3, name: 20 },
          ]}
          onChange={(item: any) => {
            searchParams.set("index", '1');
            searchParams.set("size", item.name);
            setSearchParams(searchParams);
          }}
        />
      </div>
    </>
  );
}

export default PaginationComponent;

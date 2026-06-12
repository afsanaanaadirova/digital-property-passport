import Accordion from "@/ui/shared/Accordion";
import ArrowDown from "@svg/arrowIcon.svg?react";
import { Fragment, useState } from "react";
import DeleteIcon from "@svg/deleteIcon.svg?react";
import { TResultAction, handlePrivigeles } from "@/app/utils/actions";
import { useSearchParams } from "react-router-dom";
import { THeadDataType } from "@/ui/shared/Title/TTable";
import { getNestedValue } from "@/data/utils/getValueByKey";

interface IProps<T> {
  title?: {
    name: string;
    count: string;
  };
  sliceCount?: number;
  dataTitle: THeadDataType<T>[];
  tableData?: T[];
  isLoading?: boolean;
  deleteBtn?: boolean;
  handleDeleteItem?: (item: any) => void;
  handleClickPrivilage?: (id: number, appealId?: number) => void;
  pagination?: {
    totalCount: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    size: number;
  };
}
let currentPageData = 1;
const MobileTable = <T extends { [key: string]: any }>({
  dataTitle,
  tableData,
  //   isLoading,
  title,
  sliceCount = 2,
  handleDeleteItem,
  handleClickPrivilage,
  pagination,
}: IProps<T>) => {
  const [activeAcc, setActiveAcc] = useState(0);
  const [_, setSearchParams] = useSearchParams();
  const handleClickPagination = (name: string) => {
    if (name === "prev") {
      currentPageData = Number(pagination?.currentPage) - 1;
      pagination?.setCurrentPage(pagination.currentPage - 1);
      setSearchParams((prevParams: URLSearchParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("Index", currentPageData.toString());
        return newParams;
      });
    } else if (name === "next") {
      currentPageData = Number(pagination?.currentPage) + 1;
      pagination?.setCurrentPage(pagination.currentPage + 1);
      setSearchParams((prevParams: URLSearchParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("Index", currentPageData.toString());
        return newParams;
      });
    }
  };

  return (
    <div className="inline-block md:hidden w-full">
      <div className="my-5">
        {/* {isLoading && <MobileTableSkeleton />} */}
        {title && (
          <div className="flex items-center justify-between gap-x-2 px-4 py-5 border border-b-transparent rounded-t-lg">
            <h2 className="text-11px600 text-gray-900">{title?.name}</h2>
            <div className="px-2 py-1/2 border border-blue-200 bg-blue-50 rounded-2xl flex items-center justify-center">
              <h4 className="text-11px500 text-blue-600">{title?.count}</h4>
            </div>
          </div>
        )}

        <ul className={`flex items-center border border-b-transparent`}>
          {tableData?.length
            ? dataTitle?.slice(0, sliceCount)?.map((dataT: any) => {
                return (
                  <li
                    key={dataT.id}
                    className={`text-14px500 text-gray-700 p-3 ${dataT.className}`}
                  >
                    {dataT.name}
                  </li>
                );
              })
            : null}
        </ul>
        {tableData?.length ? (
          tableData?.map((el: any, index: number) => (
            <Accordion
              key={el.id}
              buttonClassName="w-full"
              panelClassName="w-full"
              setClose={activeAcc !== 1}
              accordionButton={
                <div
                  className="w-full flex items-center justify-between odd:bg-[#FCFCFD] border px-3"
                  onClick={() => setActiveAcc(1)}
                >
                  <div className="w-full flex items-center gap-3 border-[#E3E8EF] last:border-0 text-14px400 h-16">
                    {dataTitle?.slice(0, sliceCount)?.map((dataT: any) => {
                      return (
                        <p
                          key={dataT.id}
                          className={`text-14px400 text-gray-600   ${dataT.className}`}
                        >
                          {dataT.render
                            ? dataT.render(el, index)
                            : el[dataT.key] === null
                            ? "Yoxdur"
                            : getNestedValue(el, dataT.key)}
                        </p>
                      );
                    })}
                  </div>
                  {dataTitle.length !== 2 && <ArrowDown />}
                </div>
              }
            >
              <ul className="py-4 px-2 border">
                {dataTitle?.slice(sliceCount)?.map((dataT: any) => {
                  return (
                    <Fragment key={dataT.id}>
                      <li className="flex justify-between items-center my-4 last:mb-0">
                        <span className="text-14px400 text-gray-500">
                          {dataT.name}
                        </span>
                        <span
                          className={`text-end text-14px400 text-gray-800  ${dataT.className} `}
                        >
                          {dataT.render
                            ? dataT.render(el, index)
                            : el[dataT.key] === null
                            ? "Yoxdur"
                            : getNestedValue(el, dataT.key)}
                        </span>
                      </li>

                      {handleDeleteItem && (
                        <button
                          onClick={() => handleDeleteItem(el)}
                          className="cursor-pointer mt-3 hidden last:flex justify-center items-center border border-gray-300 rounded-xl w-full p-2.5 text-error-500 text-14px600"
                        >
                          <span>Silmək</span>
                          <DeleteIcon />
                        </button>
                      )}

                      {handleClickPrivilage && (
                        <ul className="hidden last:flex gap-y-3 flex-col">
                          {handlePrivigeles(el?.actions)?.map(
                            (action: TResultAction) => (
                              <li
                                onClick={() => {
                                  handleClickPrivilage(+action.id, el.id);
                                }}
                                key={action.id}
                                className="border rounded-md flex justify-center items-center p-2 gap-x-3"
                              >
                                <span>{action.icon}</span>
                                <p>{action.value}</p>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </Fragment>
                  );
                })}
              </ul>
            </Accordion>
          ))
        ) : (
          <div className="flex items-center justify-center h-32 text-15px400 border border-t-transparent rounded-b-xl text-gray-400">
            Məlumat yoxdur...
          </div>
        )}
      </div>
      {pagination && tableData?.length ? (
        <div className="my-6 mb-16 flex justify-between items-center">
          <div
            onClick={() => handleClickPagination("prev")}
            className={`p-2 rounded-lg border border-b-[#CDD5DF] -rotate-180 cursor-pointer ${
              pagination?.currentPage === 1
                ? "pointer-events-none opacity-30"
                : "pointer-events-auto opacity-100"
            }`}
          >
            <ArrowDown />
          </div>
          <div className="text-14px500 text-[#344054]">
            Səhifə {pagination?.currentPage} /{" "}
            {Math.ceil(pagination?.totalCount / pagination.size)}
          </div>
          <div
            onClick={() => handleClickPagination("next")}
            className={`p-2 rounded-lg border border-b-[#CDD5DF] rotate-360 cursor-pointer ${
              pagination?.currentPage ===
              Math.ceil(pagination?.totalCount / pagination.size)
                ? "pointer-events-none opacity-30"
                : "pointer-events-auto opacity-100"
            }`}
          >
            <ArrowDown />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MobileTable;

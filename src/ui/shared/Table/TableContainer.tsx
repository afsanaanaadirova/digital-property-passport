import { TD, THead, TR } from ".";
import { ETable } from "./e_table";
import { TTable } from "../Title/TTable";
import Shimmer from "../Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MobileTable from "@/ui/shared/MobileTable";
import { getNestedValue } from "@/data/utils/getValueByKey";
import PaginationComponent from "../PaginationComponent";
import { twMerge } from "tailwind-merge";

export const TableContainer = <T extends { [key: string]: any }>({
  tHeadData,
  state = ETable.READY,
  tableData,
  title,
  pagination,
  loading,
  className,
  handleClickPrivilage,
}: TTable<T>) => {
  const perPage = pagination?.size ? pagination?.size : 10;

  const render = () => {
    switch (state) {
      case ETable.LOADING:
        return [...Array(5)].map((_, i) => (
          <TR
            key={i}
            className="odd:bg-[#FCFCFD] border-transparent border-y last:border-0"
          >
            {[...Array(tHeadData?.length)].map((_, idx) => (
              <TD key={idx}>
                <Shimmer className="w-full bg-gray-100 h-4" />
              </TD>
            ))}
          </TR>
        ));
      case ETable.READY:
        return tableData?.map((d, index) => {
          return(
             <TR
            key={index}
            className={`even:bg-gray-25 border-gray-200 border-y relative last:border-0 text-14px400 h-16  ${
              d.statusDto?.id === 3 && `text-error-600`
            }`}
          >
            {tHeadData?.map((dataT, ind) => (
              <TD key={ind} className="w-auto">
                {dataT.render
                  ? dataT.render(d, index)
                  : getNestedValue(d, dataT.key)}
              </TD>
            ))}
          </TR>
          )
        });

      case ETable.NODATA:
        return (
          <TR>
            {[...Array(tHeadData?.length)].map((_, idx) => (
              <TD key={idx} className="w-auto">
                ----
              </TD>
            ))}
          </TR>
        );
    }
  };

  return (
    <>
      <MobileTable
        title={{
          name: "Müraciət sayı",
          count: tableData?.length + " ədəd",
        }}
        dataTitle={tHeadData}
        tableData={tableData}
        pagination={pagination}
        handleClickPrivilage={handleClickPrivilage}
      />
      <div className="hidden md:flex flex-col">
        <div className="grid -mx-6">
          <div className="grid min-w-full py-2 md:px-6">
            <div
              className={twMerge(
                "rounded-lg border border-[#E3E8EF] bg-white",
                className
              )}
            >
              {tableData && title}
              <table className="min-w-full text-left text-sm font-light table-auto">
                <THead data={tHeadData} />
                {loading ? (
                  <div className="flex justify-center w-[900%] overflow-hidden p-6">
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  </div>
                ) : (
                  <tbody>{render()}</tbody>
                )}
              </table>
            </div>
            <div className="w-full flex justify-between">
              {!!pagination && pagination.totalCount > perPage && (
                <PaginationComponent
                  currentPage={pagination.currentPage}
                  totalPagesCount={Math.ceil(pagination.totalCount / perPage)}
                  setCurrentPage={(val: any) => pagination.setCurrentPage(val)}
                  isLoading={false}
                  isError={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

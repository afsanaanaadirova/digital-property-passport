import ReactPaginate from "react-paginate";
import type { PaginationType } from "./pagination.type";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ total, perPage = 10, pageChange }: PaginationType) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handlePageClick = (page: { selected: number }) => {
    page.selected !== 0
      ? params.set("index", (Number(page.selected) + 1).toString())
      : params.delete("index");
    pageChange?.(page.selected);
  };

  return (
    <div className={`w-full items-center gap-x-4 ${total ? "flex" : "hidden"}`}>
      {total > perPage && (
        <ReactPaginate
          containerClassName="w-fit py-1 px-4 mx-auto flex items-center gap-x-4 border border-solid border-gray rounded select-none"
          pageClassName="h-9 flex items-center text-center rounded hover:bg-gray-300"
          pageLinkClassName="py-2 px-4"
          activeClassName="bg-blue-600 text-white pointer-events-none"
          previousLabel={<h1>prev</h1>}
          nextLabel={<h1>next</h1>}
          breakLabel="..."
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          initialPage={
            searchParams.get("index")
              ? Number(searchParams.get("index")) - 1
              : undefined
          }
          pageCount={Math.ceil(total / perPage)}
          onPageChange={handlePageClick}
        />
      )}
    </div>
  );
};

export default Pagination;

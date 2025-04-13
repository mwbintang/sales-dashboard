import React, { useMemo } from "react";
// import { useRouter } from 'next/navigation'

import ReactPaginate from "react-paginate";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

import { LIMIT_CONFIG } from "../../constant/config";
// import { PaginationProps } from ".";

export const Pagination = ({
  limit,
  page,
  totalCount,
  handlePageChange,
  handleLimitChange
}) => {
  const pageCount = useMemo<number>(() => Math.ceil(totalCount / Number(limit)), [limit, totalCount])

  const handleListLimitChange = (newLimit) => {
    const parsedSelectedLimit = parseInt(newLimit)
    handleLimitChange(parsedSelectedLimit)
  }

  const isPaginationDisplayed = totalCount >= Number(limit)

  return (
    <div className="flex justify-between items-start mb-6">
      <div></div>
      <div className="flex items-center justify-center self-center pt-1">
        {isPaginationDisplayed && (
          <ReactPaginate
            previousLabel={<div className="relative bottom-6"><MdOutlineKeyboardArrowLeft size={24} /></div>}
            nextLabel={<div className="relative bottom-6"><MdOutlineKeyboardArrowRight size={24} /></div>}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            forcePage={page - 1}
            onPageChange={({ selected }) => handlePageChange(selected + 1)}
            containerClassName="pagination pt-12 sm:pt-0"
            activeLinkClassName="active"
            pageLinkClassName="mx-1"
          />
        )}
      </div>
      <div className="flex flex-row gap-x-3 mt-2 text-black">
        <label className="text-sm">Rows per page:</label>
        <select
          name="limit"
          className="text-sm bg-transparent focus:border-none focus:ring-0 focus:outline-none"
          value={limit}
          onChange={(event) => handleListLimitChange(event.target.value)}
        >
          {LIMIT_CONFIG.map(limit => (
            <option value={limit} key={limit}>{limit}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

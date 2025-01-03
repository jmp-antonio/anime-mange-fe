import { Pagination } from 'flowbite-react';
import React, { useState } from 'react'

// type Props = {
//     currentPage: number,
//     from: number,
//     to: number,
//     totalPages: number
// }

type Props = {
    current_page: number,
    last_page: number,
    per_page: number,
    from: number,
    to: number,
    total: number,
    pageChange: (direction: string) => void
}

const PageInfo = ({current_page, from, to, total, pageChange} : Props) => {

  const onPageChange = () => console.log("page change");

  return (
    <div className="flex flex-col items-center mt-10">
        {/* Help text */}
        <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{from}</span> to <span className="font-semibold text-gray-900 dark:text-white">{to}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
        </span>
        {/* Buttons */}
        <div className="inline-flex mt-2 xs:mt-0">
            <button onClick={() => pageChange("previousPage")} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-black bg-gray-300 rounded-s hover:bg-gray-400">
                Prev
            </button>
            <button onClick={() => pageChange("nextPage")} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-black bg-gray-300 border-0 border-s border-gray-400 rounded-e hover:bg-gray-400">
                Next
            </button>
        </div>
    </div>

  );
}

export default PageInfo
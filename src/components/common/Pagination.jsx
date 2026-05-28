import React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // PAGE NUMBERS
  const generatePages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
      {/* INFO */}
      <p className="text-sm text-slate-500">
        Page <span className="font-semibold text-slate-700">{currentPage}</span>{" "}
        of <span className="font-semibold text-slate-700">{totalPages}</span>
      </p>

      {/* BUTTONS */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* PREVIOUS */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>

        {/* PAGE NUMBERS */}
        {generatePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 min-w-[40px] rounded-xl px-3 text-sm font-semibold transition ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* NEXT */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

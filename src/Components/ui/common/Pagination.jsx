import React from "react";

export default function Pagination({ page, total, pageSize, onPage }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const prev = () => onPage?.(Math.max(1, page - 1));
  const next = () => onPage?.(Math.min(pages, page + 1));
  return (
    <div className="flex items-center gap-2 text-sm text-slate-300">
      <button
        onClick={prev}
        className="h-8 px-2 rounded border"
        style={{ borderColor: "rgba(110,86,207,0.25)" }}
      >
        Prev
      </button>
      <span>
        Page {page} / {pages}
      </span>
      <button
        onClick={next}
        className="h-8 px-2 rounded border"
        style={{ borderColor: "rgba(110,86,207,0.25)" }}
      >
        Next
      </button>
    </div>
  );
}

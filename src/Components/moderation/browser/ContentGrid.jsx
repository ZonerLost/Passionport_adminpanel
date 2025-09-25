import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function ContentGrid({
  data,
  onPage,
  onApprove,
  onHide,
  onRemove,
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.rows.map((ct) => (
          <div
            key={ct.id}
            className="rounded-xl border p-3 space-y-2"
            style={{
              borderColor: "rgba(110,86,207,0.25)",
              background: "#0F1118",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-white font-medium">
                {ct.type.toUpperCase()}
              </div>
              {ct.flagged && (
                <span
                  className="px-2 py-0.5 text-xs rounded"
                  style={{ background: "#3f1d0f", color: "#f97316" }}
                >
                  Auto-flagged
                </span>
              )}
            </div>
            <div className="text-slate-400 text-xs">
              {ct.author} • {ct.brand}
            </div>
            <div className="text-slate-200 text-sm line-clamp-4">{ct.text}</div>
            <div className="text-slate-400 text-xs">
              Pop: {ct.popularity.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-xs underline"
                onClick={() => onApprove(ct.id)}
              >
                Approve
              </button>
              <button
                className="text-xs underline"
                onClick={() => onHide(ct.id)}
              >
                Hide
              </button>
              <button
                className="text-xs underline"
                onClick={() => onRemove(ct.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <Pagination
          page={data.page}
          total={data.total}
          pageSize={data.pageSize}
          onPage={onPage}
        />
      </div>
    </div>
  );
}

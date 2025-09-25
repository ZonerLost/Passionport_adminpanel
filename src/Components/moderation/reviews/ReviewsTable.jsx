import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function ReviewsTable({
  data,
  onPage,
  onApprove,
  onHide,
  onRemove,
  onEscalate,
}) {
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-[960px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Campaign</th>
              <th className="px-3 py-2">Author</th>
              <th className="px-3 py-2">Stars</th>
              <th className="px-3 py-2">Backer-only</th>
              <th className="px-3 py-2">Text</th>
              <th className="px-3 py-2">Brigade?</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {data.rows.map((r) => (
              <tr key={r.id}>
                <td className="px-3 py-2 text-slate-300">{r.campaign}</td>
                <td className="px-3 py-2 text-slate-300">{r.author}</td>
                <td className="px-3 py-2 text-slate-300">{r.stars}</td>
                <td className="px-3 py-2 text-slate-300">
                  {r.backerOnly ? "Yes" : "No"}
                </td>
                <td
                  className="px-3 py-2 text-slate-200 max-w-[380px] truncate"
                  title={r.text}
                >
                  {r.text}
                </td>
                <td className="px-3 py-2">
                  {r.suspectedBrigade ? (
                    <span
                      className="px-2 py-0.5 text-xs rounded"
                      style={{ background: "#3f1d0f", color: "#f97316" }}
                    >
                      Suspected
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-2 text-right text-gray-400">
                  <div className="inline-flex items-center gap-2">
                    <button
                      className="text-xs underline"
                      onClick={() => onApprove(r.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onHide(r.id)}
                    >
                      Hide
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onRemove(r.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onEscalate(r.id)}
                    >
                      Escalate
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
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

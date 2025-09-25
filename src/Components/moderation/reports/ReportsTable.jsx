import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function ReportsTable({
  data,
  onPage,
  onOpen,
  onApprove,
  onHide,
  onRemove,
  onEscalate,
  onEvidence,
}) {
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Severity</th>
              <th className="px-3 py-2">Reporters</th>
              <th className="px-3 py-2">Keyword hits</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {data.rows.map((r) => (
              <tr key={r.id} className="hover:bg-white/5">
                <td className="px-3 py-2">
                  <button className="underline text-gray-400" onClick={() => onOpen(r)}>
                    {r.id}
                  </button>
                </td>
                <td className="px-3 py-2 text-slate-300">{r.type}</td>
                <td className="px-3 py-2 text-slate-300">{r.severity}</td>
                <td className="px-3 py-2 text-slate-300">{r.reporterCount}</td>
                <td className="px-3 py-2 text-slate-300">
                  {(r.keywordHits || []).join(", ") || "—"}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="inline-flex text-gray-400 items-center gap-2">
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
                    <button
                      className="text-xs underline"
                      onClick={() => onEvidence(r.id)}
                    >
                      Evidence
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

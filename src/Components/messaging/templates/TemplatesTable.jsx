import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function TemplatesTable({ data, onPage, onOpen }) {
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-gray-400 text-sm">
          <thead>
            <tr
              className="text-left text-xs text-gray-400 uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Event</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Channels</th>
              <th className="px-3 py-2">Version</th>
              <th className="px-3 py-2">Updated</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {data.rows.map((t) => (
              <tr key={t.id} className="hover:bg-white/5">
                <td className="px-3 py-2">
                  <button className="underline" onClick={() => onOpen(t.id)}>
                    {t.name}
                  </button>
                </td>
                <td className="px-3 py-2 text-slate-300">{t.event}</td>
                <td className="px-3 py-2 text-slate-300 capitalize">
                  {t.category}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {Object.entries(t.channels)
                    .filter(([, v]) => v)
                    .map(([k]) => k)
                    .join(", ") || "—"}
                </td>
                <td className="px-3 py-2 text-slate-300">{t.currentVersion}</td>
                <td className="px-3 py-2 text-slate-300">
                  {new Date(t.updatedAt).toLocaleString()}
                </td>
                <td className="px-3 py-2 text-gray-400 text-right">
                  <span className="text-xs text-gray-400 opacity-70">
                    Open to edit…
                  </span>
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

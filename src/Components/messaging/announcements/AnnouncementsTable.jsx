import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function AnnouncementsTable({ data, onPage, onOpen }) {
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-[880px] w-full text-white text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Segments</th>
              <th className="px-3 py-2">Window</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(227,227,235,0.87)]">
            {data.rows.map((a) => (
              <tr key={a.id} className="hover:bg-white/5">
                <td className="px-3 py-2">
                  <button className="underline" onClick={() => onOpen(a.id)}>
                    {a.title}
                  </button>
                </td>
                <td className="px-3 py-2 text-slate-300">{a.type}</td>
                <td className="px-3 py-2 text-slate-300">
                  {a.segments?.join(", ") || "All"}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {new Date(a.startAt).toLocaleString()} →{" "}
                  {new Date(a.endAt).toLocaleString()}
                </td>
                <td className="px-3 py-2 text-slate-300 capitalize">
                  {a.status}
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    className="text-xs underline"
                    style={{ color: "#e2e8f0" }}
                    onClick={() => onOpen?.(a.id)}
                  >
                    Edit
                  </button>
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

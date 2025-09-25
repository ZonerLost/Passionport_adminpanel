import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function CMSBlocksTable({
  data,
  onPage,
  onOpen,
  onTogglePublish,
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
              <th className="px-3 py-2">Key</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Updated</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {data.rows.map((b) => (
              <tr key={b.id} className="hover:bg-white/5">
                <td className="px-3 py-2">
                  <button className="underline" onClick={() => onOpen(b.id)}>
                    {b.key}
                  </button>
                </td>
                <td className="px-3 py-2 text-slate-300">{b.title}</td>
                <td className="px-3 py-2 text-slate-300">{b.location}</td>
                <td className="px-3 py-2 text-slate-300 capitalize">
                  {b.status}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {new Date(b.updatedAt).toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    className="text-xs underline"
                    onClick={() =>
                      onTogglePublish(b.id, b.status !== "published")
                    }
                  >
                    {b.status === "published" ? "Unpublish" : "Publish"}
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

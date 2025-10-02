import React, { useState, useEffect } from "react";
import Pagination from "../../ui/common/Pagination";

export default function AnnouncementsTable({ data, onPage, onOpen, onDelete }) {
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const handler = () => setOpenMenu(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
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
          <tbody className="divide-y divide-[rgb(80,49,25)]">
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
                <td className="px-3 py-2 text-right relative">
                  <div
                    className="inline-block text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      aria-haspopup="true"
                      aria-expanded={openMenu === a.id}
                      className="p-1 w-6 h-6 rounded-md text-slate-200 hover:bg-white/5 flex items-center justify-center"
                      onClick={() =>
                        setOpenMenu((s) => (s === a.id ? null : a.id))
                      }
                      title="More actions"
                    >
                      <svg
                        width="4"
                        height="14"
                        viewBox="0 0 4 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                        <circle cx="2" cy="7" r="1" fill="currentColor" />
                        <circle cx="2" cy="12" r="1" fill="currentColor" />
                      </svg>
                    </button>

                    {openMenu === a.id && (
                      <div
                        className="absolute right-0 mt-2 w-32 rounded bg-[#0F1118] border"
                        style={{ borderColor: "rgba(255,122,0,0.12)" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/5"
                          onClick={() => {
                            setOpenMenu(null);
                            onOpen?.(a.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/5"
                          onClick={() => {
                            setOpenMenu(null);
                            if (onDelete) onDelete(a.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
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

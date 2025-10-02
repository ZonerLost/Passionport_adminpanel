import React from "react";

// Simple fans table — lightweight and safe defaults
export default function FansTable({ rows = [], onOpen }) {
  if (!rows || rows.length === 0) {
    return <div className="py-8 text-center text-slate-400">No fans found</div>;
  }

  return (
    <div
      className="overflow-auto rounded-lg border"
      style={{ borderColor: "rgba(255,122,0,0.15)", background: "#0F1118" }}
    >
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-3 text-xs text-slate-400">Name</th>
            <th className="px-4 py-3 text-xs text-slate-400">Handle</th>
            <th className="px-4 py-3 text-xs text-slate-400">Email</th>
            <th className="px-4 py-3 text-xs text-slate-400">Status</th>
            <th className="px-4 py-3 text-xs text-slate-400">Joined</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id}
              className="border-t"
              style={{ borderColor: "rgba(255,122,0,0.06)" }}
            >
              <td className="px-4 py-3">
                <div className="text-sm text-white">{r.name}</div>
                <div className="text-xs text-slate-400">{r.country}</div>
              </td>
              <td className="px-4 py-3 text-sm text-slate-200">{r.handle}</td>
              <td className="px-4 py-3 text-sm text-slate-200">{r.email}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    r.status === "banned"
                      ? "rgb(226, 105, 0)"
                      : r.status === "suspended"
                      ? "text-yellow-300"
                      : "text-green-300"
                  }`}
                >
                  {r.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-slate-200">
                {new Date(r.joinedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  className="text-xs underline"
                  style={{ color: "#e2e8f0" }}
                  onClick={() => onOpen?.(r.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

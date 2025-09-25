import React from "react";

export default function SegmentsTable({ rows, onOpen, onRemove }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {rows.map((s) => (
        <div
          key={s.id}
          className="rounded-lg border p-3"
          style={{
            borderColor: "rgba(110,86,207,0.25)",
            background: "#0F1118",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="text-slate-200 font-medium">{s.name}</div>
            <div className="text-slate-400 text-sm">
              {s.sizeEstimate.toLocaleString()}
            </div>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Role: {s.rules.role.join(", ")} • Country:{" "}
            {s.rules.country.join(", ")} • Badges: {s.rules.badges.join(", ")} •
            Activity: {s.rules.activity.minActions}+ in{" "}
            {s.rules.activity.lastNDays}d
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button className="text-xs underline" onClick={() => onOpen(s)}>
              Edit
            </button>
            <button
              className="text-xs underline"
              onClick={() => onRemove(s.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

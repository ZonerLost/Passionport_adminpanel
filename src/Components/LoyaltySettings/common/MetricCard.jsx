import React from "react";
export default function MetricCard({ label, value, sub }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: "rgba(255,122,0,0.25)",
        background: "#0F1118",
      }}
    >
      <div className="text-slate-300 text-xs uppercase tracking-wide">
        {label}
      </div>
      <div className="text-white text-xl font-semibold mt-0.5">{value}</div>
      {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
    </div>
  );
}

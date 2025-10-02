import React from "react";
import { fmtInt, fmtCurrency, pct } from "../../utils/format";

export default function KpiCard({
  label,
  value,
  trendPct,
  isCurrency,
  footnote,
  children,
}) {
  const v = isCurrency ? fmtCurrency(value) : fmtInt(value);
  const trendColor =
    trendPct > 0
      ? "text-emerald-400"
      : trendPct < 0
      ? "text-rose-400"
      : "text-slate-400";
  return (
    <div
      className="rounded-xl border p-4 flex items-center gap-3"
      style={{
        borderColor: "rgba(255,122,0,0.25)",
        backgroundColor: "#0F1118",
      }}
    >
      <div className="flex-1 min-w-0">
        <div className="text-slate-300 text-xs uppercase tracking-wide">
          {label}
        </div>
        <div className="text-white text-xl md:text-2xl font-semibold mt-0.5">
          {v}
        </div>
        {typeof trendPct === "number" && (
          <div className={`text-xs ${trendColor} mt-0.5`}>{pct(trendPct)}</div>
        )}
        {footnote && (
          <div className="text-xs text-slate-400 mt-1">{footnote}</div>
        )}
      </div>
      {children}
    </div>
  );
}

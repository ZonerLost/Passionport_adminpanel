import React from "react";
import SectionCard from "./SectionCard";
import { fmtCurrency } from "../../utils/format";

export default function RevenueSnapshot({ data }) {
  if (!data) return null;
  const total = data.byMethod.reduce((s, m) => s + m.gross, 0);
  return (
    <SectionCard title="Revenue & Payout Snapshot">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {data.byMethod.map((m) => (
              <div
                key={m.method}
                className="rounded-xl border p-4"
                style={{
                  borderColor: "rgba(110,86,207,0.25)",
                  background: "#0F1118",
                }}
              >
                <div className="text-slate-300 text-xs uppercase">
                  {m.method}
                </div>
                <div className="text-white text-lg font-semibold">
                  {fmtCurrency(m.gross)}
                </div>
                <div className="text-xs text-slate-400">{m.pct}% of total</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="rounded-xl border p-4"
          style={{
            borderColor: "rgba(110,86,207,0.25)",
            background: "#0F1118",
          }}
        >
          <div className="text-slate-300 text-xs uppercase">Operational</div>
          <div className="mt-2 space-y-2 text-sm text-slate-200">
            <div className="flex items-center justify-between">
              <span>Pending payouts</span>
              <b>{data.pendingPayouts}</b>
            </div>
            <div className="flex items-center justify-between">
              <span>Disputes open</span>
              <b>{data.disputesOpen}</b>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[rgba(110,86,207,0.15)]">
              <span>Total gross</span>
              <b>{fmtCurrency(total)}</b>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

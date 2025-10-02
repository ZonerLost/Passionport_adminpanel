import React from "react";
import SectionCard from "./SectionCard";
import KpiCard from "./KpiCard";
import Sparkline from "./Sparkline";
import { fmtCurrency } from "../../utils/format";

export default function ExecOverview({ exec }) {
  if (!exec) return null;
  return (
    <SectionCard
      title="Executive Overview"
      action={
        <div className="flex items-center gap-2">
          <button
            className="px-3 text-white h-8 rounded-lg text-xs border"
            style={{ borderColor: "rgba(255,122,0,0.25)" }}
          >
            Export CSV
          </button>
          <button
            className="px-3 text-white h-8 rounded-lg text-xs border"
            style={{ borderColor: "rgba(255,122,0,0.25)" }}
          >
            Export PDF
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        <KpiCard
          label="DAU"
          value={exec.dau}
          trendPct={
            +(
              ((exec.series?.dau?.at(-1)?.y - exec.series?.dau?.[0]?.y) /
                exec.series?.dau?.[0]?.y) *
              100
            ).toFixed(1)
          }
        >
          <Sparkline data={exec.series?.dau || []} />
        </KpiCard>
        <KpiCard label="WAU" value={exec.wau} />
        <KpiCard label="MAU" value={exec.mau} />
        <KpiCard label="New Fans" value={exec.newFans} />
        <KpiCard
          label="New Brands"
          value={exec.newBrands}
          footnote={`${exec.approvalsPending} in verification`}
        />
        <KpiCard label="Active Campaigns" value={exec.activeCampaigns} />
        <KpiCard
          label="Amount Raised (Today)"
          value={exec.amountRaisedToday}
          isCurrency
        >
          <Sparkline data={exec.series?.amount || []} />
        </KpiCard>
        <div
          className="rounded-xl border p-4"
          style={{
            borderColor: "rgba(255,122,0,0.25)",
            background: "#0F1118",
          }}
        >
          <div className="text-slate-300 text-xs uppercase tracking-wide">
            Backings & Orders
          </div>
          <div className="text-white text-xl md:text-2xl font-semibold mt-0.5">
            {exec.orders} orders
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {exec.refunds} refunds in last 7d
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div>
              7d: <b>{fmtCurrency(exec.amountRaised7d)}</b>
            </div>
            <div>
              30d: <b>{fmtCurrency(exec.amountRaised30d)}</b>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

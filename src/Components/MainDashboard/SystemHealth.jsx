import React from "react";
import SectionCard from "./SectionCard";
import { since } from "../../utils/format";

export default function SystemHealth({ data }) {
  if (!data) return null;
  return (
    <SectionCard title="System Health">
      <div className="grid grid-cols-2 gap-4">
        <HealthStat label="API error rate" value={`${data.apiErrorRate}%`} />
        <HealthStat label="p95 latency" value={`${data.p95LatencyMs} ms`} />
        <HealthStat label="Jobs backlog" value={String(data.jobsBacklog)} />
        <HealthStat label="Notif success" value={`${data.notifSuccessPct}%`} />
      </div>
      <div className="text-xs text-slate-400 mt-4">
        Last deploy {since(data.lastDeploy)}
      </div>
    </SectionCard>
  );
}

function HealthStat({ label, value }) {
  return (
    <div
      className="rounded-xl border p-5 min-h-[100px] flex flex-col justify-between"
      style={{ borderColor: "rgba(255,122,0,0.25)", background: "#0F1118" }}
    >
      <div className="text-slate-300 text-xs uppercase mb-2">{label}</div>
      <div className="text-white text-sm font-semibold leading-tight break-words">
        {value}
      </div>
    </div>
  );
}

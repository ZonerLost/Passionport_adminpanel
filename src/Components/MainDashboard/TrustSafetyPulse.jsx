import React from "react";
import SectionCard from "./SectionCard";

export default function TrustSafetyPulse({ data }) {
  if (!data) return null;
  return (
    <SectionCard
      title="Trust & Safety Pulse"
      action={
        <div className="flex items-center text-white gap-2 text-xs">
          {data.topQueues.map((q) => (
            <a
              key={q.label}
              href={q.href}
              className="px-2.5 h-8 inline-flex items-center rounded-lg border hover:bg-white/5"
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            >
              {q.label} ({q.count})
            </a>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <PulseCard label="Flagged Posts" value={data.flagged.posts} />
        <PulseCard label="Flagged Stories" value={data.flagged.stories} />
        <PulseCard label="Flagged Reviews" value={data.flagged.reviews} />
        <PulseCard label="Blocked Users" value={data.blockedUsers} />
      </div>
      <div className="mt-3 text-xs text-slate-300">
        Avg resolution time: <b>{data.avgResolutionHrs}h</b>
      </div>
    </SectionCard>
  );
}

function PulseCard({ label, value }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: "rgba(110,86,207,0.25)", background: "#0F1118" }}
    >
      <div className="text-slate-300 text-xs uppercase">{label}</div>
      <div className="text-white text-lg font-semibold">{value}</div>
    </div>
  );
}

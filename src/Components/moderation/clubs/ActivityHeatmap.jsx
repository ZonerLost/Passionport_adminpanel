import React from "react";
import SectionCard from "../../ui/common/SectionCard";

export default function ActivityHeatmap({ clubs }) {
  // Simple 4-week x 7-day heatmap using div blocks
  return (
    <SectionCard title="Activity Heatmap (last 4 weeks)">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clubs.map((c) => (
          <div key={c.id}>
            <div className="text-slate-200 text-sm mb-2">{c.name}</div>
            <div className="grid grid-cols-7 gap-1">
              {c.heat.map((v, i) => (
                <div
                  key={i}
                  className="h-4 rounded"
                  title={`${v} posts`}
                  style={{
                    background: `rgba(110,86,207,${Math.min(0.1 + v / 60, 1)})`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

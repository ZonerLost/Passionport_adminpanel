import React from "react";
import SectionCard from "../../ui/common/Pagination";

export default function ClubsRoster({ clubs }) {
  return (
    <SectionCard title="Owners & Mods Roster">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {clubs.map((c) => (
          <div
            key={c.id}
            className="rounded-lg border p-3"
            style={{
              borderColor: "rgba(255,122,0,0.25)",
              background: "#0F1118",
            }}
          >
            <div className="text-slate-200 font-medium">{c.name}</div>
            <div className="text-xs text-slate-400 mt-1">
              Owners: {c.owners.join(", ")}
            </div>
            <div className="text-xs text-slate-400">
              Mods: {c.mods.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

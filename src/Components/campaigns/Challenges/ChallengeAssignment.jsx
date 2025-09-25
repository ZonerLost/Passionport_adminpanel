import React from "react";
import SectionCard from "../../ui/common/SectionCard";

export default function ChallengeAssignment({ all, assigned, onAssign }) {
  return (
    <SectionCard title="Challenge / Bundle Assignment">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="text-slate-300 text-xs uppercase mb-1">
            Available Bundles
          </div>
          <ul className="space-y-2">
            {all.map((c) => (
              <li
                key={c.id}
                className="rounded-lg border p-3 flex items-center justify-between"
                style={{
                  borderColor: "rgba(110,86,207,0.25)",
                  background: "#0F1118",
                }}
              >
                <span className="text-slate-200">
                  {c.badge} {c.name}
                </span>
                <button
                  className="text-xs underline"
                  onClick={() =>
                    onAssign([...new Set([...assigned.map((x) => x.id), c.id])])
                  }
                >
                  Attach
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-slate-300 text-xs uppercase mb-1">Assigned</div>
          <ul className="space-y-2">
            {assigned.map((id) => {
              const c = all.find((x) => x.id === id) || { name: id, badge: "" };
              return (
                <li
                  key={id}
                  className="rounded-lg border p-3 flex items-center justify-between"
                  style={{
                    borderColor: "rgba(110,86,207,0.25)",
                    background: "#0F1118",
                  }}
                >
                  <span className="text-slate-200">
                    {c.badge} {c.name}
                  </span>
                  <button
                    className="text-xs underline"
                    onClick={() => onAssign(assigned.filter((x) => x !== id))}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="text-xs text-slate-400 mt-2">
        Badge & copy logic preview can render here.
      </div>
    </SectionCard>
  );
}

import React, { useState } from "react";
import SectionCard from "../../ui/common/SectionCard";

const BASE_PERKS = [
  { id: "pk_1", name: "Gold Free Shipping", tier: "Gold", active: true },
  { id: "pk_2", name: "Platinum Early Access", tier: "Platinum", active: true },
];

export default function PerksEditor() {
  const [rows, setRows] = useState(BASE_PERKS);
  const add = () => {
    const name = prompt("Perk name:");
    if (!name) return;
    const tier =
      prompt("Tier (Bronze/Silver/Gold/Platinum):", "Gold") || "Gold";
    setRows((r) => [
      { id: `pk_${Date.now()}`, name, tier, active: true },
      ...r,
    ]);
  };
  const toggle = (id) =>
    setRows((r) =>
      r.map((x) => (x.id === id ? { ...x, active: !x.active } : x))
    );
  return (
    <SectionCard title="Badge-gated Perks">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={add}
          className="h-9 px-3 text-gray-400 rounded-lg border text-sm"
          style={{ borderColor: "rgba(255,122,0,0.25)" }}
        >
          Add Perk
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {rows.map((p) => (
          <div
            key={p.id}
            className="rounded-lg border p-3 flex items-center justify-between"
            style={{
              borderColor: "rgba(255,122,0,0.25)",
              background: "#0F1118",
            }}
          >
            <div>
              <div className="text-slate-200">{p.name}</div>
              <div className="text-xs text-slate-400">Tier: {p.tier}</div>
            </div>
            <label className="text-xs text-slate-400">
              Active{" "}
              <input
                type="checkbox"
                className="ml-1"
                checked={p.active}
                onChange={() => toggle(p.id)}
              />
            </label>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

import React, { useState } from "react";
import SectionCard from "../../MainDashboard/SectionCard";
export default function LoyaltyEditor({
  tiers = [],
  rules = [],
  streak = { enabled: false, weeklyTarget: 0, recoverWith: "extra-share" },
  challenges = [],
  onSave,
  onSimulate,
}) {
  const [state, setState] = useState({ tiers, rules, streak, challenges });
  const [sim, setSim] = useState({
    backs: 1,
    shares: 3,
    refs: 0,
    result: null,
  });

  const bind = (key, idx, field) => (e) => {
    const v =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setState((s) => ({
      ...s,
      [key]: (s[key] || []).map((x, i) =>
        i === idx ? { ...x, [field]: v } : x
      ),
    }));
  };

  // const save = () => onSave(state);

  const simulate = async () => {
    const res = await onSimulate({
      backs: sim.backs,
      shares: sim.shares,
      refs: sim.refs,
    });
    setSim((s) => ({ ...s, result: res.total }));
  };

  return (
    <div className="space-y-4">
      {/* Tiers */}
      <SectionCard title="Tiers">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(state.tiers || []).map((t, i) => (
            <div
              key={t.id || i}
              className="rounded-lg border p-3 grid grid-cols-2 gap-2"
              style={{
                borderColor: "rgba(255,122,0,0.25)",
                background: "#0F1118",
              }}
            >
              <label className="text-xs text-slate-400">
                Name
                <input
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  defaultValue={t.name}
                  onChange={bind("tiers", i, "name")}
                  style={{ borderColor: "rgba(255,122,0,0.25)" }}
                />
              </label>
              <label className="text-xs text-slate-400">
                Min Points
                <input
                  type="number"
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  defaultValue={t.min}
                  onChange={bind("tiers", i, "min")}
                  style={{ borderColor: "rgba(255,122,0,0.25)" }}
                />
              </label>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Rules */}
      <SectionCard title="Points Rules">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(state.rules || []).map((r, i) => (
            <label
              key={r.id || i}
              className="rounded-lg border p-3 text-sm"
              style={{
                borderColor: "rgba(255,122,0,0.25)",
                background: "#0F1118",
              }}
            >
              <div className="text-slate-200 mb-2">{r.label}</div>
              <input
                type="number"
                defaultValue={r.points}
                onChange={bind("rules", i, "points")}
                className="h-8 w-full rounded border text-gray-400 bg-transparent px-2 text-sm"
                style={{ borderColor: "rgba(255,122,0,0.25)" }}
              />
            </label>
          ))}
        </div>
      </SectionCard>

      {/* Streak */}
      <SectionCard title="Streak Logic">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label
            className="rounded-lg border p-3 text-sm"
            style={{
              borderColor: "rgba(255,122,0,0.25)",
              background: "#0F1118",
            }}
          >
            <div className="text-slate-200 mb-2">Enabled</div>
            <input
              type="checkbox"
              defaultChecked={state.streak?.enabled}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  streak: { ...s.streak, enabled: e.target.checked },
                }))
              }
            />
          </label>
          <label
            className="rounded-lg border text-gray-400 p-3 text-sm"
            style={{
              borderColor: "rgba(255,122,0,0.25)",
              background: "#0F1118",
            }}
          >
            <div className="text-slate-200 mb-2">Weekly Target</div>
            <input
              type="number"
              defaultValue={state.streak?.weeklyTarget}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  streak: { ...s.streak, weeklyTarget: Number(e.target.value) },
                }))
              }
              className="h-8 w-full rounded border text-gray-400 bg-transparent px-2 text-sm"
              style={{ borderColor: "rgba(255,122,0,0.25)" }}
            />
          </label>
          <label
            className="rounded-lg border p-3 text-sm"
            style={{
              borderColor: "rgba(255,122,0,0.25)",
              background: "#0F1118",
            }}
          >
            <div className="text-slate-200 mb-2">Recover With</div>
            <select
              defaultValue={state.streak?.recoverWith}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  streak: { ...s.streak, recoverWith: e.target.value },
                }))
              }
              className="h-8 w-full rounded border text-gray-400 bg-transparent px-2 text-sm"
              style={{ borderColor: "rgba(255,122,0,0.25)" }}
            >
              <option value="extra-share">Extra Share</option>
              <option value="bonus-back">Bonus Back</option>
            </select>
          </label>
        </div>
      </SectionCard>

      {/* Challenges */}
      <SectionCard title="Challenge Definitions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(state.challenges || []).map((c, i) => (
            <div
              key={c.id || i}
              className="rounded-lg border p-3 grid grid-cols-2 gap-2"
              style={{
                borderColor: "rgba(255,122,0,0.25)",
                background: "#0F1118",
              }}
            >
              <label className="text-xs text-slate-400">
                Name
                <input
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  defaultValue={c.name}
                  onChange={bind("challenges", i, "name")}
                  style={{ borderColor: "rgba(255,122,0,0.25)" }}
                />
              </label>
              <label className="text-xs text-slate-400">
                Badge
                <input
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  defaultValue={c.badge}
                  onChange={bind("challenges", i, "badge")}
                  style={{ borderColor: "rgba(255,122,0,0.25)" }}
                />
              </label>
            </div>
          ))}
        </div>
      </SectionCard>
      {/* Simulate Button Example */}
      <div className="flex items-center gap-2 mt-4">
        <button
          type="button"
          className="px-4 py-2 rounded bg-violet-700 text-white"
          onClick={simulate}
        >
          Simulate
        </button>
        {sim.result !== null && (
          <span className="text-slate-200">Result: {sim.result}</span>
        )}
        <button
          type="button"
          className="px-4 py-2 rounded bg-green-700 text-white ml-2"
          onClick={() => onSave(state)}
        >
          Save
        </button>
      </div>
    </div>
  );
}

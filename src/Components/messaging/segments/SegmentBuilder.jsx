import React, { useEffect, useState } from "react";
import { COLORS } from "../../ui/shared/theme";

export default function SegmentBuilder({
  open,
  segment,
  onClose,
  onSave,
  onEstimate,
}) {
  const [state, setState] = useState(
    segment || {
      name: "New Segment",
      rules: {
        role: [],
        country: [],
        badges: [],
        activity: { lastNDays: 30, minActions: 1 },
      },
    }
  );
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    setState(
      segment || {
        name: "New Segment",
        rules: {
          role: [],
          country: [],
          badges: [],
          activity: { lastNDays: 30, minActions: 1 },
        },
      }
    );
    setEstimate(null);
  }, [segment]);
  if (!open) return null;

  const parseCSV = (s) =>
    s
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.ring }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b" style={{ borderColor: COLORS.ring }}>
          <div className="text-white text-lg font-semibold">
            {segment ? "Edit Segment" : "Create Segment"}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <label className="text-xs text-slate-400">
            Name
            <input
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              value={state.name}
              onChange={(e) =>
                setState((s) => ({ ...s, name: e.target.value }))
              }
              style={{ borderColor: COLORS.ring }}
            />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="text-xs text-slate-400">
              Roles (CSV)
              <input
                className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                placeholder="Fan,Brand"
                defaultValue={state.rules.role.join(",")}
                onBlur={(e) =>
                  setState((s) => ({
                    ...s,
                    rules: { ...s.rules, role: parseCSV(e.target.value) },
                  }))
                }
                style={{ borderColor: COLORS.ring }}
              />
            </label>
            <label className="text-xs text-slate-400">
              Countries (CSV)
              <input
                className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                placeholder="US,PK"
                defaultValue={state.rules.country.join(",")}
                onBlur={(e) =>
                  setState((s) => ({
                    ...s,
                    rules: { ...s.rules, country: parseCSV(e.target.value) },
                  }))
                }
                style={{ borderColor: COLORS.ring }}
              />
            </label>
            <label className="text-xs text-slate-400">
              Badges (CSV)
              <input
                className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                placeholder="Gold,Platinum"
                defaultValue={state.rules.badges.join(",")}
                onBlur={(e) =>
                  setState((s) => ({
                    ...s,
                    rules: { ...s.rules, badges: parseCSV(e.target.value) },
                  }))
                }
                style={{ borderColor: COLORS.ring }}
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs text-slate-400">
                Last N days
                <input
                  type="number"
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  defaultValue={state.rules.activity.lastNDays}
                  onBlur={(e) =>
                    setState((s) => ({
                      ...s,
                      rules: {
                        ...s.rules,
                        activity: {
                          ...s.rules.activity,
                          lastNDays: Number(e.target.value),
                        },
                      },
                    }))
                  }
                  style={{ borderColor: COLORS.ring }}
                />
              </label>
              <label className="text-xs text-slate-400">
                Min actions
                <input
                  type="number"
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  defaultValue={state.rules.activity.minActions}
                  onBlur={(e) =>
                    setState((s) => ({
                      ...s,
                      rules: {
                        ...s.rules,
                        activity: {
                          ...s.rules.activity,
                          minActions: Number(e.target.value),
                        },
                      },
                    }))
                  }
                  style={{ borderColor: COLORS.ring }}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="h-9 px-3 rounded-lg border text-sm"
              onClick={async () => setEstimate(await onEstimate(state.rules))}
              style={{ borderColor: COLORS.ring }}
            >
              Estimate Size
            </button>
            {estimate != null && (
              <span className="text-slate-300 text-sm">
                ≈ {estimate.toLocaleString()} users
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="h-9 px-3 rounded-lg border text-sm"
              onClick={() => onSave({ ...(segment || {}), ...state })}
              style={{ borderColor: COLORS.ring }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

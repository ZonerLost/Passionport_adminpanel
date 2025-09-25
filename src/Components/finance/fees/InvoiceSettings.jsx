import React, { useState, useEffect } from "react";
import { COLORS } from "../../ui/shared/theme";

export default function InvoiceSettings({ settings, onSave }) {
  const [state, setState] = useState(settings || {});
  useEffect(() => {
    setState(settings || {});
  }, [settings]);

  return (
    <div
      className="rounded-xl border p-4 space-y-3"
      style={{ borderColor: "rgba(110,86,207,0.25)", background: "#0F1118" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="text-xs text-slate-400">
          Prefix
          <input
            className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
            value={state.prefix || ""}
            onChange={(e) =>
              setState((s) => ({ ...s, prefix: e.target.value }))
            }
            style={{ borderColor: COLORS.ring }}
          />
        </label>
        <label className="text-xs text-slate-400">
          Next Number
          <input
            type="number"
            className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
            value={state.nextNumber || 1000}
            onChange={(e) =>
              setState((s) => ({ ...s, nextNumber: Number(e.target.value) }))
            }
            style={{ borderColor: COLORS.ring }}
          />
        </label>
        <label className="text-xs text-slate-400">
          Footer
          <input
            className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
            value={state.footer || ""}
            onChange={(e) =>
              setState((s) => ({ ...s, footer: e.target.value }))
            }
            style={{ borderColor: COLORS.ring }}
          />
        </label>
      </div>
      <button
        className="h-9 px-3 text-gray-400  rounded-lg border text-sm"
        onClick={() => onSave(state)}
        style={{ borderColor: COLORS.ring }}
      >
        Save Invoice Settings
      </button>
    </div>
  );
}

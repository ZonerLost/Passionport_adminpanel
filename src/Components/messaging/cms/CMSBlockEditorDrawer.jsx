import React, { useEffect, useState } from "react";
import { COLORS } from "../../ui/shared/theme";

export default function CMSBlockEditorDrawer({ open, block, onClose, onSave }) {
  const [state, setState] = useState(block || null);
  useEffect(() => setState(block || null), [block]);
  if (!open || !state) return null;

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
          <div className="text-white text-lg font-semibold">Edit CMS Block</div>
          <div className="text-sm text-slate-300">{state.id}</div>
        </div>
        <div className="p-5 space-y-3">
          <label className="text-xs text-slate-400">
            Key
            <input
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              value={state.key}
              onChange={(e) => setState((s) => ({ ...s, key: e.target.value }))}
              style={{ borderColor: COLORS.ring }}
            />
          </label>
          <label className="text-xs text-slate-400">
            Title
            <input
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              value={state.title}
              onChange={(e) =>
                setState((s) => ({ ...s, title: e.target.value }))
              }
              style={{ borderColor: COLORS.ring }}
            />
          </label>
          <label className="text-xs text-slate-400">
            Location
            <select
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              value={state.location}
              onChange={(e) =>
                setState((s) => ({ ...s, location: e.target.value }))
              }
              style={{ borderColor: COLORS.ring }}
            >
              <option>home_hero</option>
              <option>explore_hero</option>
              <option>help_center</option>
              <option>policy</option>
            </select>
          </label>
          <label className="text-xs text-slate-400">
            Content (HTML)
            <textarea
              rows={10}
              className="mt-1 w-full rounded border bg-transparent p-2 text-sm"
              value={state.content}
              onChange={(e) =>
                setState((s) => ({ ...s, content: e.target.value }))
              }
              style={{ borderColor: COLORS.ring }}
            />
          </label>
          <button
            className="h-9 px-3 rounded-lg border text-sm"
            onClick={() => onSave({ ...state })}
            style={{ borderColor: COLORS.ring }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

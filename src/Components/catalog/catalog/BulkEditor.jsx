import React, { useState } from "react";
import { COLORS } from "../../ui/shared/theme";

export default function BulkEditor({ open, selectedIds, onApply, onClose }) {
  const [priceDelta, setPriceDelta] = useState(0);
  const [stockDelta, setStockDelta] = useState(0);
  const [status, setStatus] = useState("");

  if (!open) return null;

  const apply = () => {
    onApply({
      priceDelta: Number(priceDelta),
      stockDelta: Number(stockDelta),
      newStatus: status || undefined,
    });
  };

  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l shadow-md shadow-[#ff7a00]"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.ring }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b" style={{ borderColor: COLORS.ring }}>
          <div className="text-white text-lg font-semibold">Bulk Edit</div>
          <div className="text-sm text-slate-300">
            {selectedIds.length} selected
          </div>
        </div>
        <div className="p-5 space-y-3">
          <label className="text-xs text-slate-400">
            Price Delta (±)
            <input
              type="number"
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              value={priceDelta}
              onChange={(e) => setPriceDelta(e.target.value)}
              style={{ borderColor: COLORS.ring }}
            />
          </label>
          <label className="text-xs text-slate-400">
            Stock Delta (±)
            <input
              type="number"
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              value={stockDelta}
              onChange={(e) => setStockDelta(e.target.value)}
              style={{ borderColor: COLORS.ring }}
            />
          </label>
          <label className="text-xs text-slate-400">
            Set Status
            <select
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ borderColor: COLORS.ring }}
            >
              <option value="">— keep as-is —</option>
              <option value="draft">Draft</option>
              <option value="live">Live</option>
              <option value="paused">Paused</option>
            </select>
          </label>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={apply}
              className="h-9 px-3 rounded-lg border text-sm"
              style={{ borderColor: COLORS.ring }}
            >
              Apply
            </button>
            <button
              onClick={onClose}
              className="h-9 px-3 rounded-lg border text-sm"
              style={{ borderColor: COLORS.ring, opacity: 0.8 }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { COLORS } from "../../ui/shared/theme";

export default function TransactionDrawer({ open, txn, onClose }) {
  if (!open || !txn) return null;
  const money = (n) => (n < 0 ? "-" : "") + "$" + Math.abs(n).toFixed(2);
  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l shadow-md shadow-[#ff7a00]"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.ring }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b" style={{ borderColor: COLORS.ring }}>
          <div className="text-white text-lg font-semibold">
            Transaction {txn.id}
          </div>
          <div className="text-sm text-slate-300">
            {txn.method} • {txn.type} • {txn.status}
          </div>
        </div>
        <div className="p-5 space-y-3">
          <Row k="Brand" v={txn.brand} />
          <Row k="User" v={txn.user} />
          <Row k="Amount" v={money(txn.amount)} />
          <Row k="Campaign" v={txn.metadata?.campaign || "—"} />
          <Row k="Created" v={new Date(txn.createdAt).toLocaleString()} />
        </div>
      </div>
    </div>
  );
}
function Row({ k, v }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border p-3"
      style={{ borderColor: "rgba(255,122,0,0.25)", background: "#0F1118" }}
    >
      <div className="text-slate-400 text-sm">{k}</div>
      <div className="text-slate-200">{v}</div>
    </div>
  );
}

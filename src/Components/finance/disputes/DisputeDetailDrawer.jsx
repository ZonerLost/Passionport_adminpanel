import React, { useRef } from "react";
import { COLORS } from "../../ui/shared/theme";

export default function DisputeDetailDrawer({
  open,
  dispute,
  onClose,
  onEvidence,
  onCloseCase,
}) {
  const fileRef = useRef(null);
  if (!open || !dispute) return null;
  const money = (n) => "$" + Number(n).toFixed(2);

  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.ring }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b" style={{ borderColor: COLORS.ring }}>
          <div className="text-white text-lg font-semibold">{dispute.id}</div>
          <div className="text-sm text-slate-300">
            {dispute.method} • Txn {dispute.txnId} •{" "}
            {dispute.status.replace("_", " ")}
          </div>
        </div>
        <div className="p-5 space-y-3">
          <Row k="Brand" v={dispute.brand} />
          <Row k="Reason" v={dispute.reason} />
          <Row k="Amount" v={money(dispute.amount)} />
          <Row k="Deadline" v={new Date(dispute.deadline).toLocaleString()} />

          <section>
            <h3 className="text-slate-200 font-medium mb-2">Evidence</h3>
            <div
              className="rounded-lg border p-3 space-y-2"
              style={{
                borderColor: "rgba(110,86,207,0.25)",
                background: "#0F1118",
              }}
            >
              <input ref={fileRef} type="file" className="text-sm" />
              <div className="flex items-center gap-2">
                <button
                  className="h-8 px-3 rounded-lg border text-sm"
                  onClick={() => {
                    const f = fileRef.current?.files?.[0];
                    if (f) onEvidence(dispute.id, f);
                  }}
                  style={{ borderColor: COLORS.ring }}
                >
                  Upload
                </button>
                <span className="text-xs text-slate-400">
                  Attach screenshots, logs, TOS acceptance, etc.
                </span>
              </div>
              <ul className="text-xs text-slate-300 list-disc pl-4">
                {dispute.evidence.map((ev) => (
                  <li key={ev.id}>
                    {ev.name} ({Math.round((ev.size || 0) / 1024)} KB)
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-slate-200 font-medium mb-2">Close Case</h3>
            <div className="flex items-center gap-2">
              <button
                className="h-8 px-3 rounded-lg border text-sm"
                onClick={() => onCloseCase(dispute.id, "won")}
                style={{ borderColor: COLORS.ring }}
              >
                Mark Won
              </button>
              <button
                className="h-8 px-3 rounded-lg border text-sm"
                onClick={() => onCloseCase(dispute.id, "lost")}
                style={{ borderColor: COLORS.ring }}
              >
                Mark Lost
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
function Row({ k, v }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border p-3"
      style={{ borderColor: "rgba(110,86,207,0.25)", background: "#0F1118" }}
    >
      <div className="text-slate-400 text-sm">{k}</div>
      <div className="text-slate-200">{v}</div>
    </div>
  );
}

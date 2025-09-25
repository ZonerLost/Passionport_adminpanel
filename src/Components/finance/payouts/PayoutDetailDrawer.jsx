import React, { useState } from "react";
import { COLORS } from "../../ui/shared/theme";

export default function PayoutDetailDrawer({
  open,
  payout,
  onClose,
  onHold,
  onRelease,
  onSchedule,
}) {
  const [hold, setHold] = useState({ amount: 0, note: "" });
  const [releaseAmt, setReleaseAmt] = useState(0);
  const [nextDate, setNextDate] = useState("");

  if (!open || !payout) return null;
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
          <div className="text-white text-lg font-semibold">{payout.brand}</div>
          <div className="text-sm text-slate-300">
            KYC: {payout.kycStatus} • Bank ****{payout.bank.last4}
          </div>
        </div>
        <div className="p-5 space-y-4">
          <Row k="Balance" v={money(payout.balance)} />
          <Row k="Holds" v={money(payout.holds)} />
          <Row k="Reserve" v={money(payout.reserve)} />
          <Row
            k="Next Payout"
            v={new Date(payout.nextPayoutAt).toLocaleString()}
          />

          <section>
            <h3 className="text-slate-200 font-medium mb-2">Manage Holds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                className="rounded-lg border p-3"
                style={{
                  borderColor: "rgba(110,86,207,0.25)",
                  background: "#0F1118",
                }}
              >
                <label className="text-xs text-slate-400">Add Hold (USD)</label>
                <input
                  type="number"
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  value={hold.amount}
                  onChange={(e) =>
                    setHold((s) => ({ ...s, amount: e.target.value }))
                  }
                  style={{ borderColor: COLORS.ring }}
                />
                <input
                  placeholder="Reason/Note"
                  className="mt-2 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  value={hold.note}
                  onChange={(e) =>
                    setHold((s) => ({ ...s, note: e.target.value }))
                  }
                  style={{ borderColor: COLORS.ring }}
                />
                <button
                  className="mt-2 h-8 px-3 rounded-lg border text-sm"
                  onClick={() => onHold(payout.brand, hold.amount, hold.note)}
                  style={{ borderColor: COLORS.ring }}
                >
                  Add Hold
                </button>
              </div>
              <div
                className="rounded-lg border p-3"
                style={{
                  borderColor: "rgba(110,86,207,0.25)",
                  background: "#0F1118",
                }}
              >
                <label className="text-xs text-slate-400">
                  Release Hold (USD)
                </label>
                <input
                  type="number"
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  value={releaseAmt}
                  onChange={(e) => setReleaseAmt(e.target.value)}
                  style={{ borderColor: COLORS.ring }}
                />
                <button
                  className="mt-2 h-8 px-3 rounded-lg border text-sm"
                  onClick={() => onRelease(payout.brand, releaseAmt)}
                  style={{ borderColor: COLORS.ring }}
                >
                  Release
                </button>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-slate-200 font-medium mb-2">Schedule Payout</h3>
            <div className="flex items-center gap-2">
              <input
                type="datetime-local"
                className="h-8 rounded border bg-transparent px-2 text-sm"
                value={nextDate}
                onChange={(e) => setNextDate(e.target.value)}
                style={{ borderColor: COLORS.ring }}
              />
              <button
                className="h-8 px-3 rounded-lg border text-sm"
                onClick={() =>
                  onSchedule(
                    payout.id,
                    nextDate
                      ? new Date(nextDate).toISOString()
                      : new Date().toISOString()
                  )
                }
                style={{ borderColor: COLORS.ring }}
              >
                Save
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

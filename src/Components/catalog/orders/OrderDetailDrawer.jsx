import React, { useState } from "react";
import { COLORS } from "../../ui/shared/theme";

export default function OrderDetailDrawer({
  open,
  order,
  onClose,
  onRefundItem,
  onMarkShipped,
  onReship,
  onContact,
}) {
  const [ship, setShip] = useState({ carrier: "DHL", tracking: "", eta: "" });
  if (!open || !order) return null;
  const o = order;

  const refundPrompt = (item) => {
    const amt = prompt(
      `Refund amount for ${item.name} (max $${(item.qty * item.price).toFixed(
        2
      )}):`,
      `${item.price}`
    );
    if (!amt) return;
    const reason =
      prompt("Reason code (e.g., damaged, late, other):", "other") || "other";
    onRefundItem(o.id, item.id, { amount: Number(amt), reason });
  };

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
          <div className="text-white text-lg font-semibold">Order {o.id}</div>
          <div className="text-sm text-slate-300">
            {new Date(o.date).toLocaleString()} • {o.status.toUpperCase()}
          </div>
        </div>

        <div className="p-5 space-y-4">
          <section>
            <h3 className="text-slate-200 font-medium mb-2">Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-[640px] w-full text-sm">
                <thead>
                  <tr
                    className="text-left text-xs uppercase"
                    style={{ color: "#A3A7B7" }}
                  >
                    <th className="px-3 py-2">Item</th>
                    <th className="px-3 py-2">Qty</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
                  {o.items.map((it) => (
                    <tr key={it.id}>
                      <td className="px-3 py-2 text-slate-200">{it.name}</td>
                      <td className="px-3 py-2 text-slate-300">{it.qty}</td>
                      <td className="px-3 py-2 text-slate-300">${it.price}</td>
                      <td className="px-3 py-2 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            className="text-xs underline"
                            onClick={() => refundPrompt(it)}
                          >
                            Refund
                          </button>
                          <button
                            className="text-xs underline"
                            onClick={() => onReship(o.id, it.id)}
                          >
                            Replace/Reship
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-slate-200 font-medium mb-2">Shipment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="text-xs text-slate-400">
                Carrier
                <select
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  value={ship.carrier}
                  onChange={(e) =>
                    setShip((s) => ({ ...s, carrier: e.target.value }))
                  }
                  style={{ borderColor: COLORS.ring }}
                >
                  <option>DHL</option>
                  <option>UPS</option>
                  <option>USPS</option>
                </select>
              </label>
              <label className="text-xs text-slate-400">
                Tracking
                <input
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  value={ship.tracking}
                  onChange={(e) =>
                    setShip((s) => ({ ...s, tracking: e.target.value }))
                  }
                  style={{ borderColor: COLORS.ring }}
                />
              </label>
              <label className="text-xs text-slate-400">
                ETA
                <input
                  type="date"
                  className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
                  value={ship.eta}
                  onChange={(e) =>
                    setShip((s) => ({ ...s, eta: e.target.value }))
                  }
                  style={{ borderColor: COLORS.ring }}
                />
              </label>
            </div>
            <div className="mt-3">
              <button
                className="h-9 px-3 rounded-lg border text-sm"
                onClick={() =>
                  onMarkShipped(o.id, {
                    ...ship,
                    eta: ship.eta ? new Date(ship.eta).toISOString() : "",
                  })
                }
                style={{ borderColor: COLORS.ring }}
              >
                Mark Shipped
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-slate-200 font-medium mb-2">Contact</h3>
            <div className="flex items-center gap-2">
              <button
                className="h-9 px-3 rounded-lg border text-sm"
                onClick={() => onContact(o.id, "buyer")}
                style={{ borderColor: COLORS.ring }}
              >
                Contact Buyer
              </button>
              <button
                className="h-9 px-3 rounded-lg border text-sm"
                onClick={() => onContact(o.id, "brand")}
                style={{ borderColor: COLORS.ring }}
              >
                Contact Brand
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

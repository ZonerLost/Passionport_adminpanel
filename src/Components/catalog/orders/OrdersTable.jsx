import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function OrdersTable({ data, onPage, onOpen, onUpdateStatus }) {
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-[960px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Order</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Buyer</th>
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Items</th>
              <th className="px-3 py-2">Total</th>
              <th className="px-3 py-2">Msgs</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {data.rows.map((o) => (
              <tr key={o.id} className="hover:bg-white/5">
                <td className="px-3 text-gray-400 py-2">
                  <button className="underline" onClick={() => onOpen(o.id)}>
                    {o.id}
                  </button>
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {new Date(o.date).toLocaleString()}
                </td>
                <td className="px-3 py-2 text-slate-300 capitalize">
                  {o.status}
                </td>
                <td className="px-3 py-2 text-slate-300">{o.buyer}</td>
                <td className="px-3 py-2 text-slate-300">{o.brand}</td>
                <td className="px-3 py-2 text-slate-300">{o.items.length}</td>
                <td className="px-3 py-2 text-slate-300">
                  ${o.total.toFixed(2)}
                </td>
                <td className="px-3 py-2 text-slate-300">{o.messagesCount}</td>
                <td className="px-3 py-2 text-right">
                  <div className="inline-flex text-gray-400 items-center gap-2">
                    {o.status !== "shipped" && (
                      <button
                        className="text-xs underline"
                        onClick={() => onUpdateStatus(o.id, "shipped")}
                      >
                        Mark shipped
                      </button>
                    )}
                    {o.status !== "refunded" && (
                      <button
                        className="text-xs underline"
                        onClick={() => onUpdateStatus(o.id, "refunded")}
                      >
                        Refund
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <Pagination
          page={data.page}
          total={data.total}
          pageSize={data.pageSize}
          onPage={onPage}
        />
      </div>
    </div>
  );
}

import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function TransactionsTable({ data, onPage, onOpen, onRefund }) {
  const money = (n) => (n < 0 ? "-" : "") + "$" + Math.abs(n).toFixed(2);
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Txn</th>
              <th className="px-3 py-2">Method</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">User</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,122,0,0.15)]">
            {data.rows.map((t) => (
              <tr key={t.id} className="hover:bg-white/5">
                <td className="px-3 text-gray-400  py-2">
                  <button className="underline" onClick={() => onOpen(t.id)}>
                    {t.id}
                  </button>
                </td>
                <td className="px-3 py-2 text-slate-300">{t.method}</td>
                <td className="px-3 py-2 text-slate-300 capitalize">
                  {t.type}
                </td>
                <td className="px-3 py-2 text-slate-300 capitalize">
                  {t.status}
                </td>
                <td className="px-3 py-2 text-slate-300">{t.brand}</td>
                <td className="px-3 py-2 text-slate-300">{t.user}</td>
                <td className="px-3 py-2 text-slate-300">{money(t.amount)}</td>
                <td className="px-3 py-2 text-slate-300">
                  {new Date(t.createdAt).toLocaleString()}
                </td>
                <td className="px-3 py-2 text-gray-400 text-right">
                  <div className="inline-flex items-center gap-2">
                    {t.type !== "refund" && t.status === "succeeded" && (
                      <button
                        className="text-xs underline"
                        onClick={() => onRefund(t.id, "policy_violation")}
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

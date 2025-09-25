import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function DisputesTable({ data, onPage, onOpen }) {
  const money = (n) => "$" + Number(n).toFixed(2);
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-[960px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Dispute</th>
              <th className="px-3 py-2">Method</th>
              <th className="px-3 py-2">Txn</th>
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Reason</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Deadline</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {data.rows.map((d) => (
              <tr
                key={d.id}
                className="hover:bg-white/5"
                onClick={() => onOpen(d.id)}
              >
                <td className="px-3 py-2 text-gray-400  underline">{d.id}</td>
                <td className="px-3 py-2 text-slate-300">{d.method}</td>
                <td className="px-3 py-2 text-slate-300">{d.txnId}</td>
                <td className="px-3 py-2 text-slate-300">{d.brand}</td>
                <td className="px-3 py-2 text-slate-300">{d.reason}</td>
                <td className="px-3 py-2 text-slate-300">{money(d.amount)}</td>
                <td className="px-3 py-2 text-slate-300">
                  {new Date(d.deadline).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 text-slate-300 capitalize">
                  {d.status.replace("_", " ")}
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

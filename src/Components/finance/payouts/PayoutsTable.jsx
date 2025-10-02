import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function PayoutsTable({ data, onPage, onOpen }) {
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
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Balance</th>
              <th className="px-3 py-2">Holds</th>
              <th className="px-3 py-2">Reserve</th>
              <th className="px-3 py-2">KYC</th>
              <th className="px-3 py-2">Next Payout</th>
              <th className="px-3 py-2">Bank</th>
              <th className="px-3 py-2">Frequency</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,122,0,0.15)]">
            {data.rows.map((p) => (
              <tr key={p.id} className="hover:bg-white/5">
                <td className="px-3 text-gray-400  py-2">
                  <button className="underline" onClick={() => onOpen(p.id)}>
                    {p.brand}
                  </button>
                </td>
                <td className="px-3 py-2 text-slate-300">{money(p.balance)}</td>
                <td className="px-3 py-2 text-slate-300">{money(p.holds)}</td>
                <td className="px-3 py-2 text-slate-300">{money(p.reserve)}</td>
                <td className="px-3 py-2 text-slate-300 capitalize">
                  {p.kycStatus}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {new Date(p.nextPayoutAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 text-slate-300">****{p.bank.last4}</td>
                <td className="px-3 py-2 text-slate-300">{p.frequency}</td>
                <td className="px-3 py-2 text-right">
                  <div className="inline-flex text-gray-400  items-center gap-2 text-xs">
                    <span className="opacity-70">Open to manage…</span>
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

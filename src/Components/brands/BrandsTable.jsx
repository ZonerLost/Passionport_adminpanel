import React from "react";
const DIV = "rgba(255,122,0,0.15)";

export default function BrandsTable({ rows, onOpen }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[700px] w-full text-sm table-fixed">
        <thead>
          <tr
            className="text-left text-xs uppercase"
            style={{ color: "#A3A7B7" }}
          >
            <th className="px-3 py-2 w-48">Brand</th>
            <th className="px-3 py-2 w-56">Owner</th>
            <th className="px-3 py-2 w-20">Campaigns</th>
            <th className="px-3 py-2 w-24">Verification</th>
            <th className="px-3 py-2 w-24">KYC</th>
            <th className="px-3 py-2 w-20 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y" style={{ borderColor: DIV }}>
          {rows.map((b) => (
            <tr key={b.id} className="hover:bg-white/5">
              <td className="px-3 py-2 text-slate-200">{b.name}</td>
              <td className="px-3 py-2 text-slate-300">
                {b.owner.name}{" "}
                <span className="text-slate-500">({b.owner.email})</span>
              </td>
              <td className="px-3 py-2 text-slate-300">{b.campaignsCount}</td>
              <td className="px-3 py-2 text-slate-300">
                {b.verified ? "Verified" : "Unverified"}
              </td>
              <td className="px-3 py-2 text-slate-300 capitalize">
                {b.kycStatus}
              </td>
              <td className="px-3 py-2 text-right">
                <button
                  className="text-xs underline"
                  style={{ color: "#e2e8f0" }}
                  onClick={() => onOpen?.(b.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td className="px-3 py-6 text-slate-400" colSpan={6}>
                No brands found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

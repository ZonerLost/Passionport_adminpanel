import React, { useState } from "react";
import Pagination from "../../ui/common/Pagination";

export default function ProductTable({
  data,
  onPage,
  onOpen,
  onApprove,
  onPause,
  onFreeze,
  onSelectMany,
}) {
  const [checked, setChecked] = useState({});
  const toggleAll = (e) => {
    const v = e.target.checked;
    const n = {};
    data.rows.forEach((p) => (n[p.id] = v));
    setChecked(n);
    onSelectMany(v ? data.rows.map((r) => r.id) : []);
  };
  const toggleOne = (id) => (e) => {
    const v = e.target.checked;
    setChecked((s) => ({ ...s, [id]: v }));
    const ids = Object.entries({ ...checked, [id]: v })
      .filter(([, on]) => on)
      .map(([k]) => k);
    onSelectMany(ids);
  };

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">
                <input type="checkbox" onChange={toggleAll} />
              </th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Stock</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Linked</th>
              <th className="px-3 py-2">Last price change</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {data.rows.map((p) => (
              <tr key={p.id} className="hover:bg-white/5">
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={!!checked[p.id]}
                    onChange={toggleOne(p.id)}
                  />
                </td>
                <td className="px-3 py-2">
                  <button className="underline text-gray-400" onClick={() => onOpen(p.id)}>
                    {p.name}
                  </button>
                </td>
                <td className="px-3 py-2 text-slate-300">{p.brand}</td>
                <td className="px-3 py-2 text-slate-300 capitalize">
                  {p.status}
                </td>
                <td className="px-3 py-2 text-slate-300">{p.stock}</td>
                <td className="px-3 py-2 text-slate-300">${p.price}</td>
                <td className="px-3 py-2 text-slate-300">
                  {p.linkedCampaign || "—"}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {new Date(p.lastPriceChange).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="inline-flex text-gray-400 items-center gap-2">
                    <button
                      className="text-xs underline"
                      onClick={() => onApprove(p.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onPause(p.id)}
                    >
                      Pause
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onFreeze(p.id)}
                    >
                      Freeze
                    </button>
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

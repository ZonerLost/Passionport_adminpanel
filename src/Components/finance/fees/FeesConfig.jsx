import React from "react";
import { COLORS } from "../../ui/shared/theme";

export default function FeesConfig({ rows, onSave, onDelete }) {
  const add = () => {
    const scope =
      prompt("Scope (platform/product/campaign):", "platform") || "platform";
    const target =
      prompt("Target (All / Brand 1 / Category:A):", "All") || "All";
    const pct = Number(prompt("Percent fee (e.g., 10):", "10"));
    const fixed = Number(prompt("Fixed fee (e.g., 0):", "0"));
    onSave({ scope, target, pct, fixed });
  };
  const edit = (r) => {
    const pct = Number(prompt("Percent fee", r.pct));
    const fixed = Number(prompt("Fixed fee", r.fixed));
    onSave({ ...r, pct, fixed });
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={add}
          className="h-9 px-3 text-gray-400  rounded-lg border text-sm"
          style={{ borderColor: COLORS.ring }}
        >
          Add Fee Rule
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[820px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Scope</th>
              <th className="px-3 py-2">Target</th>
              <th className="px-3 py-2">Percent</th>
              <th className="px-3 py-2">Fixed</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-3 py-2 text-slate-300">{r.scope}</td>
                <td className="px-3 py-2 text-slate-300">{r.target}</td>
                <td className="px-3 py-2 text-slate-300">{r.pct}%</td>
                <td className="px-3 py-2 text-slate-300">${r.fixed}</td>
                <td className="px-3 py-2 text-right">
                  <div className="inline-flex text-gray-400  items-center gap-2">
                    <button
                      className="text-xs underline"
                      onClick={() => edit(r)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onDelete(r.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

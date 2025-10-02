import React from "react";
import { COLORS } from "../../ui/shared/theme";

export default function TaxRulesTable({ rows, onSave, onDelete }) {
  const add = () => {
    const region = prompt("Region (e.g., US-CA, EU-DE):", "US-CA") || "US-CA";
    const rate = Number(prompt("Rate %", "8.25"));
    const inclusive = window.confirm("Inclusive tax? OK = yes, Cancel = no");
    const threshold = Number(prompt("Threshold amount (0 for none)", "0"));
    onSave({ region, rate, inclusive, threshold });
  };
  const edit = (r) => {
    const rate = Number(prompt("Rate %", r.rate));
    const inclusive = window.confirm("Inclusive tax? OK = yes, Cancel = no");
    const threshold = Number(prompt("Threshold", r.threshold));
    onSave({ ...r, rate, inclusive, threshold });
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={add}
          className="h-9 px-3 rounded-lg text-gray-400  border text-sm"
          style={{ borderColor: COLORS.ring }}
        >
          Add Tax Rule
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[820px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Region</th>
              <th className="px-3 py-2">Rate</th>
              <th className="px-3 py-2">Inclusive</th>
              <th className="px-3 py-2">Threshold</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,122,0,0.15)]">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-3 py-2 text-slate-300">{r.region}</td>
                <td className="px-3 py-2 text-slate-300">{r.rate}%</td>
                <td className="px-3 py-2 text-slate-300">
                  {r.inclusive ? "Yes" : "No"}
                </td>
                <td className="px-3 py-2 text-slate-300">${r.threshold}</td>
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

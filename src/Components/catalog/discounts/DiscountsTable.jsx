import React from "react";
import { COLORS } from "../../ui/shared/theme";

export default function DiscountsTable({ rows, brands, onSave, onRemove }) {
  const add = () => {
    const code = prompt("Promo code (e.g., SAVE20):");
    if (!code) return;
    const type = prompt("Type (percent/amount):", "percent");
    const value = Number(prompt("Value (e.g., 20):", "10"));
    const appliesTo = prompt("Applies to (all/brand/product):", "all");
    const target =
      appliesTo === "brand"
        ? prompt(`Brand (${brands.join(", ")}):`, brands[0])
        : appliesTo === "product"
        ? prompt("Product ID (e.g., p_1):", "p_1")
        : null;
    const allowedTiers = prompt(
      "Allowed Tiers (comma: Bronze,Silver,Gold,Platinum):",
      "Bronze,Silver,Gold,Platinum"
    )
      .split(",")
      .map((x) => x.trim());
    onSave({
      code,
      type,
      value,
      appliesTo,
      target,
      allowedTiers,
      active: true,
    });
  };
  const edit = (d) => {
    const value = Number(prompt("New value", d.value));
    if (Number.isNaN(value)) return;
    onSave({ ...d, value });
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={add}
          className="h-9 px-3 text-gray-400 rounded-lg border text-sm"
          style={{ borderColor: COLORS.ring }}
        >
          Add Discount
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Code</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Value</th>
              <th className="px-3 py-2">Scope</th>
              <th className="px-3 py-2">Allowed Tiers</th>
              <th className="px-3 py-2">Active</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,122,0,0.15)]">
            {rows.map((d) => (
              <tr key={d.id}>
                <td className="px-3 py-2 text-slate-200">{d.code}</td>
                <td className="px-3 py-2 text-slate-300">{d.type}</td>
                <td className="px-3 py-2 text-slate-300">{d.value}</td>
                <td className="px-3 py-2 text-slate-300">
                  {d.appliesTo}
                  {d.target ? `:${d.target}` : ""}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {d.allowedTiers.join(", ")}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {d.active ? "Yes" : "No"}
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="inline-flex items-center text-gray-400 gap-2">
                    <button
                      className="text-xs underline"
                      onClick={() => edit(d)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onRemove(d.id)}
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

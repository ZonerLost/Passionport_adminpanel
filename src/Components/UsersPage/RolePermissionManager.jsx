import React, { useMemo, useState } from "react";
import SectionCard from "../../Components/ui/common/SectionCard";

const ALL_PERMS = [
  "users.read",
  "users.write",
  "campaigns.read",
  "campaigns.moderate",
  "orders.read",
  "orders.refund",
  "payments.read",
  "payouts.manage",
  "content.flag",
  "content.remove",
  "audit.read",
  "settings.write",
];

export default function RolePermissionManager({ roles, onUpdate }) {
  const [sel, setSel] = useState(roles?.[0]?.id || null);
  const role = useMemo(
    () => roles?.find((r) => r.id === sel) || roles?.[0],
    [roles, sel]
  );
  if (!roles?.length) return null;

  const has = (p) => role?.permissions?.includes(p);
  const toggle = (p) => {
    const next = has(p)
      ? role.permissions.filter((x) => x !== p)
      : [...role.permissions, p];
    onUpdate(role.id, next);
  };

  return (
    <SectionCard title="Role & Permission Manager">
      <div className="flex items-center gap-3 mb-3">
        <select
          value={role?.id}
          onChange={(e) => setSel(e.target.value)}
          className="h-9 rounded-lg px-2 text-sm border"
          style={{
            background: "#0F1118",
            color: "#E6E8F0",
            borderColor: "rgba(110,86,207,0.25)",
          }}
        >
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {ALL_PERMS.map((p) => (
          <label
            key={p}
            className="flex items-center gap-2 rounded-lg border p-2 text-sm"
            style={{
              borderColor: "rgba(110,86,207,0.25)",
              background: "#0F1118",
            }}
          >
            <input
              type="checkbox"
              checked={!!has(p)}
              onChange={() => toggle(p)}
            />
            <span className="text-slate-200">{p}</span>
          </label>
        ))}
      </div>
    </SectionCard>
  );
}

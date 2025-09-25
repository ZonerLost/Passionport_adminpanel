import React from "react";

export function RoleBadge({ role }) {
  const map = {
    Admin: ["#1f2937", "#93c5fd"],
    Support: ["#1f2937", "#fcd34d"],
    Finance: ["#1f2937", "#86efac"],
    Moderator: ["#1f2937", "#fda4af"],
    BrandOwner: ["#1f2937", "#c4b5fd"],
    Fan: ["#1f2937", "#a7f3d0"],
    Brand: ["#1f2937", "#c7d2fe"],
  };
  const [bg, fg] = map[role] || ["#1f2937", "#e5e7eb"];
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-medium"
      style={{ backgroundColor: bg, color: fg }}
    >
      {role}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    active: ["#052e16", "#22c55e"],
    suspended: ["#3f1d0f", "#f97316"],
    banned: ["#4c0519", "#fb7185"],
    pending: ["#0f172a", "#60a5fa"],
  };
  const [bg, fg] = map[status] || ["#111827", "#e5e7eb"];
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-medium"
      style={{ backgroundColor: bg, color: fg }}
    >
      {status}
    </span>
  );
}

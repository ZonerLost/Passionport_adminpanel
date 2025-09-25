import React from "react";
import { COLORS } from "../ui/shared/theme";
import { RoleBadge, StatusBadge } from "../ui/common/Badge";

export default function UserProfileDrawer({ open, user, onClose }) {
  if (!open || !user) return null;
  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-lg overflow-y-auto border-l"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.ring }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b" style={{ borderColor: COLORS.ring }}>
          <div className="text-white text-lg font-semibold">{user.name}</div>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <RoleBadge role={user.type} />
            <RoleBadge role={user.role} />
            <StatusBadge status={user.status} />
          </div>
        </div>
        <div className="p-5 space-y-4">
          <Section title="Account">
            <Row k="Email" v={user.email} />
            <Row k="Phone" v={user.phone} />
            <Row k="Created" v={new Date(user.createdAt).toLocaleString()} />
            <Row k="Sessions" v={user.sessions} />
            <Row k="Devices" v={(user.devices || []).join(", ")} />
          </Section>
          <Section title="Activity">
            <Row k="Orders" v={user.orders} />
            <Row k="Backings" v={user.backings} />
            <Row k="Clubs" v={user.clubs} />
            <Row k="Strikes" v={user.strikes} />
          </Section>
          <Section title="Audit Log">
            <div className="text-xs text-slate-400">
              (Wire to audit endpoint later)
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div className="text-slate-200 font-medium mb-2">{title}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{children}</div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{ borderColor: "rgba(110,86,207,0.25)", background: "#0F1118" }}
    >
      <div className="text-xs text-slate-400">{k}</div>
      <div className="text-slate-200">{String(v ?? "-")}</div>
    </div>
  );
}

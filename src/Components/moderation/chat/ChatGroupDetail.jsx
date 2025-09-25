import React from "react";
import { COLORS } from "../../ui/shared/theme";

export default function ChatGroupDetail({ open, group, onClose }) {
  if (!open || !group) return null;
  const s = group.spamIndicators || {};
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
          <div className="text-white text-lg font-semibold">{group.name}</div>
          <div className="text-sm text-slate-300">
            {group.members} members • {group.messages24h} msgs/24h
          </div>
        </div>
        <div className="p-5 space-y-3 text-slate-200">
          <Row
            k="Duplicate rate"
            v={(s.duplicateRate * 100).toFixed(1) + "%"}
          />
          <Row
            k="Link share rate"
            v={(s.linkShareRate * 100).toFixed(1) + "%"}
          />
          <Row
            k="New member spike"
            v={(s.newMemberSpike * 100).toFixed(1) + "%"}
          />
          <Row k="Abuse score" v={(s.abuseScore * 100).toFixed(1) + "%"} />
          <div className="text-xs text-slate-400">
            Content is metadata-only by default. Retention upgrades require
            legal approval.
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border p-3"
      style={{ borderColor: "rgba(110,86,207,0.25)", background: "#0F1118" }}
    >
      <div className="text-slate-400 text-sm">{k}</div>
      <div className="text-slate-200">{v}</div>
    </div>
  );
}

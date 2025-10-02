import React from "react";

const RING = "rgba(255,122,0,0.25)";

export default function FansFiltersBar({
  filters = {},
  onSearch,
  onStatus,
  onVerification,
  onExport,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search name/email/handle"
          value={filters.query || ""}
          onChange={(e) => onSearch?.(e.target.value)}
          className="h-9 w-64 rounded-lg pl-3 pr-3 text-sm focus:outline-none"
          style={{
            backgroundColor: "#0F1118",
            color: "#E6E8F0",
            border: `1px solid ${RING}`,
          }}
        />
      </div>

      <select
        value={filters.status ?? "all"}
        onChange={(e) => onStatus?.(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: RING,
        }}
      >
        <option value="all">All status</option>
        <option value="active">Active</option>
        <option value="suspended">Suspended</option>
        <option value="banned">Banned</option>
      </select>

      <select
        value={filters.verification ?? "all"}
        onChange={(e) => onVerification?.(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: RING,
        }}
      >
        <option value="all">All verification</option>
        <option value="verified">Verified</option>
        <option value="unverified">Unverified</option>
      </select>

      <div className="flex-1" />

      {onExport && (
        <button
          onClick={onExport}
          className="h-9 px-3 text-gray-400 rounded-lg border text-sm"
          style={{ borderColor: RING }}
        >
          Export CSV
        </button>
      )}
    </div>
  );
}

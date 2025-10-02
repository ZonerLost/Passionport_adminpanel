import React from "react";
const RING = "rgba(255,122,0,0.25)";

export default function BrandsFiltersBar({ filters, onSearch, onKyc }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search brand/owner"
        onChange={(e) => onSearch?.(e.target.value)}
        className="h-9 w-64 rounded-lg px-3 text-sm focus:outline-none"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          border: `1px solid ${RING}`,
        }}
      />
      <select
        value={filters.kyc}
        onChange={(e) => onKyc?.(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{ background: "#0F1118", color: "#E6E8F0", borderColor: RING }}
      >
        <option value="all">All KYC</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
}

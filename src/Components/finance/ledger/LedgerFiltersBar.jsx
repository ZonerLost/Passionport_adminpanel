import React from "react";
import SearchInput from "../../ui/common/SearchInput";
import { COLORS } from "../../ui/shared/theme";

export default function LedgerFiltersBar({
  filters,
  onSearch,
  onMethod,
  onType,
  onStatus,
  onExport,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput
        placeholder="Search (id/brand/user/campaign)"
        onChange={onSearch}
      />
      <select
        value={filters.method}
        onChange={(e) => onMethod(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All methods</option>
        <option>Stripe</option>
        <option>PayPal</option>
        <option>Apple Pay</option>
        <option>Google Pay</option>
      </select>
      <select
        value={filters.type}
        onChange={(e) => onType(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All types</option>
        <option value="backing">Backing</option>
        <option value="order">Order</option>
        <option value="fee">Fee</option>
        <option value="refund">Refund</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) => onStatus(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All status</option>
        <option value="succeeded">Succeeded</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>
      <div className="flex-1" />
      <button
        onClick={onExport}
        className="h-9 px-3 text-gray-400  rounded-lg border text-sm"
        style={{ borderColor: COLORS.ring }}
      >
        Export CSV
      </button>
    </div>
  );
}

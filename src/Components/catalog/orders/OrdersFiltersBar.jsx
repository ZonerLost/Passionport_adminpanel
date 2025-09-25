import React from "react";
import SearchInput from "../../ui/common/SearchInput";
import { COLORS } from "../../ui/shared/theme";

export default function OrdersFiltersBar({
  filters,
  onSearch,
  onStatus,
  onExport,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput
        placeholder="Search orders (id/buyer/brand)"
        onChange={onSearch}
      />
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
        <option value="paid">Paid</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="refunded">Refunded</option>
      </select>
      <div className="flex-1" />
      <button
        onClick={onExport}
        className="h-9 px-3 rounded-lg text-gray-400 border text-sm"
        style={{ borderColor: COLORS.ring }}
      >
        Export CSV
      </button>
    </div>
  );
}

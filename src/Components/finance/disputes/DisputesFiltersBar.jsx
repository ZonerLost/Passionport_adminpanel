import React from "react";
import SearchInput from "../../ui/common/SearchInput";
import { COLORS } from "../../ui/shared/theme";

export default function DisputesFiltersBar({
  filters,
  onSearch,
  onStatus,
  onExport,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput placeholder="Search (id/brand/txn)" onChange={onSearch} />
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
        <option value="needs_response">Needs Response</option>
        <option value="under_review">Under Review</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
        <option value="closed">Closed</option>
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

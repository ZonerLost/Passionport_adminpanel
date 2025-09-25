import React from "react";
import SearchInput from "../../ui/common/SearchInput";
import { COLORS } from "../../ui/shared/theme";

export default function PayoutsFiltersBar({
  filters,
  onSearch,
  onKyc,
  onExport,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput placeholder="Search brand/bank" onChange={onSearch} />
      <select
        value={filters.kyc}
        onChange={(e) => onKyc(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All KYC status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
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

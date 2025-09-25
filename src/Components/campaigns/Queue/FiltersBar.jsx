import React from "react";
import SearchInput from "../../ui/common/SearchInput";
import { COLORS } from "../../ui/shared/theme";

export default function FiltersBar({ filters, onSearch, onStatus }) {
  return (
    <div className="flex flex-wrap  items-center gap-3">
      <SearchInput
        placeholder="Search title/brand/status"
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
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="live">Live</option>
        <option value="paused">Paused</option>
        <option value="rejected">Rejected</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

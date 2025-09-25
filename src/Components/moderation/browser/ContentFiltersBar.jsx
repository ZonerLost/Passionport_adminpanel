import React from "react";
import SearchInput from "../../ui/common/SearchInput";
import { COLORS } from "../../ui/shared/theme";

export default function ContentFiltersBar({
  filters,
  onSearch,
  onFlagged,
  onBy,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput placeholder="Search content" onChange={onSearch} />
      <select
        value={filters.flagged}
        onChange={(e) => onFlagged(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All</option>
        <option value="flagged">Flagged</option>
        <option value="clean">Clean</option>
      </select>
      <input
        placeholder="By brand/user"
        value={filters.by === "all" ? "" : filters.by}
        onChange={(e) => onBy(e.target.value || "all")}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      />
    </div>
  );
}

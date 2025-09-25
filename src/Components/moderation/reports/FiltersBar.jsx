import React from "react";
import SearchInput from "../../ui/common/SearchInput";
import { COLORS } from "../../ui/shared/theme";

export default function FiltersBar({ filters, onSearch, onType, onSeverity }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput placeholder="Search reports" onChange={onSearch} />
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
        <option>post</option>
        <option>story</option>
        <option>review</option>
        <option>comment</option>
        <option>club</option>
      </select>
      <select
        value={filters.severity}
        onChange={(e) => onSeverity(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All severity</option>
        <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>
    </div>
  );
}

import React from "react";
import SearchInput from "../../ui/common/SearchInput";
import { COLORS } from "../../ui/shared/theme";

export default function CMSFiltersBar({
  filters,
  onSearch,
  onLocation,
  onStatus,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput placeholder="Search CMS blocks" onChange={onSearch} />
      <select
        value={filters.location}
        onChange={(e) => onLocation(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All locations</option>
        <option value="home_hero">home_hero</option>
        <option value="explore_hero">explore_hero</option>
        <option value="help_center">help_center</option>
        <option value="policy">policy</option>
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
        <option value="draft">draft</option>
        <option value="published">published</option>
      </select>
    </div>
  );
}

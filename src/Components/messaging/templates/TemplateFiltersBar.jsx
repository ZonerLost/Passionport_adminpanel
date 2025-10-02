import React from "react";
import SearchInput from "../../ui/common/SearchInput";
import { COLORS } from "../../ui/shared/theme";

export default function TemplateFiltersBar({
  filters,
  onSearch,
  onEvent,
  onChannel,
  onCategory,
  onExport,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput placeholder="Search templates" onChange={onSearch} />
      <select
        value={filters.event}
        onChange={(e) => onEvent(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All events</option>
        <option value="follow">Follow</option>
        <option value="like">Like</option>
        <option value="backer_thank_you">Backer thank-you</option>
        <option value="order_update">Order update</option>
        <option value="live_stream">Live stream</option>
      </select>
      <select
        value={filters.channel}
        onChange={(e) => onChannel(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All channels</option>
        <option value="push">Push</option>
        <option value="email">Email</option>
        <option value="inapp">In-app</option>
      </select>
      <select
        value={filters.category}
        onChange={(e) => onCategory(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All categories</option>
        <option value="general">General</option>
        <option value="loyalty">Loyalty & Streaks</option>
      </select>
      <div className="flex-1" />
      <button
        onClick={onExport}
        className="h-9 px-3 text-white rounded-lg border text-sm"
        style={{ borderColor: COLORS.ring }}
      >
        Export CSV
      </button>
    </div>
  );
}

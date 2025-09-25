import React from "react";
import SearchInput from "../../ui/common/SearchInput";
import { COLORS } from "../../ui/shared/theme";

export default function ProductFiltersBar({
  filters,
  brands,
  onSearch,
  onBrand,
  onStatus,
  onLinked,
  onExport,
  onBulk,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput placeholder="Search products" onChange={onSearch} />
      <select
        value={filters.brand}
        onChange={(e) => onBrand(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All brands</option>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
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
        <option value="draft">Draft</option>
        <option value="live">Live</option>
        <option value="paused">Paused</option>
      </select>
      <select
        value={filters.linked}
        onChange={(e) => onLinked(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All (linked/unlinked)</option>
        <option value="linked">Linked to campaign</option>
        <option value="unlinked">Not linked</option>
      </select>
      <div className="flex-1 text-gray-400" />
      <button
        onClick={onBulk}
        className="h-9 px-3 text-gray-400 rounded-lg border text-sm"
        style={{ borderColor: COLORS.ring }}
      >
        Bulk Edit
      </button>
      <button
        onClick={onExport}
        className="h-9 px-3 text-gray-400 rounded-lg border text-sm"
        style={{ borderColor: COLORS.ring }}
      >
        Export CSV
      </button>
    </div>
  );
}

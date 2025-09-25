import React from "react";
import SearchInput from "../ui/common/SearchInput";
import { COLORS } from "../../Components/ui/shared/theme";

export default function FiltersBar({
  filters,
  onSearch,
  onType,
  onRole,
  onStatus,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput
        placeholder="Search name/email/handle/phone"
        onChange={onSearch}
      />
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
        <option value="Fan">Fans</option>
        <option value="Brand">Brands</option>
        <option value="Admin">Admins</option>
      </select>
      <select
        value={filters.role}
        onChange={(e) => onRole(e.target.value)}
        className="h-9 rounded-lg px-2 text-sm border"
        style={{
          background: "#0F1118",
          color: "#E6E8F0",
          borderColor: COLORS.ring,
        }}
      >
        <option value="all">All roles</option>
        <option>Admin</option>
        <option>Support</option>
        <option>Finance</option>
        <option>Moderator</option>
        <option>BrandOwner</option>
        <option>Fan</option>
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
        <option>active</option>
        <option>suspended</option>
        <option>banned</option>
        <option>pending</option>
      </select>
    </div>
  );
}

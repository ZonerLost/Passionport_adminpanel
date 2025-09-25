import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { COLORS } from "../../ui/shared/theme";

export default function SearchInput({
  placeholder = "Search",
  delay = 350,
  onChange,
}) {
  const [val, setVal] = useState("");
  useEffect(() => {
    const t = setTimeout(() => onChange?.(val), delay);
    return () => clearTimeout(t);
  }, [val, delay, onChange]);
  return (
    <div className="relative">
      <MdSearch
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: "#A3A7B7" }}
      />
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-60 xl:w-80 rounded-full pl-9 pr-3 text-sm focus:outline-none"
        style={{
          backgroundColor: "#12131A",
          color: "#E6E8F0",
          border: `1px solid ${COLORS.ring}`,
        }}
      />
    </div>
  );
}

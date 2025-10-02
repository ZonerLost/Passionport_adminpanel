// ...existing code...
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdMenu, MdSearch, MdNotificationsNone } from "react-icons/md";

const COLORS = {
  bg: "#0B0B0F",
  bg2: "#12131A",
  card: "#161821",
  text: "#E6E8F0",
  text2: "#A3A7B7",
  gold: "#ff7a00",
  purple: "#ff7a00",
};

export default function Header({ onMenuClick = () => {} }) {
  const { pathname } = useLocation();
  const pageName =
    pathname === "/"
      ? "Dashboard"
      : pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") || "";

  return (
    <div className="px-3 md:px-4 pt-3">
      <header
        className="h-14 w-full rounded-2xl shadow-[#ff7a00] flex items-center gap-3 px-3 md:px-4 border"
        style={{
          backgroundColor: COLORS.card,
          borderColor: "rgba(255,122,0,0.25)",
        }}
      >
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg lg:hidden transition"
          style={{ color: COLORS.text, backgroundColor: "transparent" }}
          aria-label="Open menu"
        >
          <MdMenu size={18} />
        </button>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm">
          <Link
            to="/"
            className="font-medium hover:underline"
            style={{
              background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.purple})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dashboard
          </Link>
          {pathname !== "/" && (
            <>
              <span style={{ color: "#2A2C38" }}>/</span>
              <span className="capitalize" style={{ color: COLORS.text2 }}>
                {pageName}
              </span>
            </>
          )}
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <MdSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: COLORS.text2 }}
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search"
              className="h-9 w-60 xl:w-80 rounded-full pl-9 pr-12 text-sm focus:outline-none"
              style={{
                backgroundColor: COLORS.bg2,
                color: COLORS.text,
                border: `1px solid ${COLORS.ring}`,
              }}
              aria-label="Search"
            />
            <kbd
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
              style={{ color: COLORS.text2 }}
            >
              ⌘K
            </kbd>
          </div>

          <button
            className="p-2 rounded-lg transition"
            aria-label="Notifications"
            title="Notifications"
            style={{ color: COLORS.text, backgroundColor: "transparent" }}
          >
            <div className="relative" aria-hidden="true">
              <MdNotificationsNone size={18} />
              <span
                className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.purple})`,
                }}
              />
            </div>
          </button>
        </div>
      </header>
    </div>
  );
}

// ...existing code...
import React, { useState, useRef, useEffect } from "react";
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
  let pageName =
    pathname === "/"
      ? "Dashboard"
      : pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") || "";

  // show a friendly module name for the messaging route
  if (pathname.startsWith("/messaging")) pageName = "Announcements";

  // mock notifications (replace with real service/hook later)
  const [notifs, setNotifs] = useState([
    { id: 1, title: "New campaign submitted", ts: "9/24/2025", unread: true },
    { id: 2, title: "User reported a post", ts: "9/23/2025", unread: true },
    { id: 3, title: "Payout processed", ts: "9/22/2025", unread: false },
  ]);
  const [openNotifs, setOpenNotifs] = useState(false);
  const notifsRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (
        openNotifs &&
        notifsRef.current &&
        !notifsRef.current.contains(e.target)
      ) {
        setOpenNotifs(false);
      }
    }
    document.addEventListener("pointerdown", onDocClick);
    return () => document.removeEventListener("pointerdown", onDocClick);
  }, [openNotifs]);

  const unreadCount = notifs.filter((n) => n.unread).length;

  function markRead(id) {
    setNotifs((s) => s.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }

  function markAllRead() {
    setNotifs((s) => s.map((n) => ({ ...n, unread: false })));
  }

  function clearAll() {
    setNotifs([]);
  }

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
        <div className="hidden md:flex items-center gap-3 relative">
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
            className="p-2 rounded-lg transition relative"
            aria-label="Notifications"
            title="Notifications"
            style={{ color: COLORS.text, backgroundColor: "transparent" }}
            aria-expanded={openNotifs}
            onClick={() => setOpenNotifs((v) => !v)}
          >
            <div className="relative" aria-hidden="true">
              <MdNotificationsNone size={18} />
              <span
                className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full flex items-center justify-center text-[10px] text-black font-semibold"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.purple})`,
                }}
              >
                {unreadCount > 0 ? unreadCount : ""}
              </span>
            </div>
          </button>

          {/* Notification dropdown panel */}
          {openNotifs && (
            <div
              ref={notifsRef}
              className="absolute right-0 top-full mt-3 w-80 rounded-md border bg-[#0F1118] z-50 shadow-md shadow-[#ff7a00]"
              style={{ borderColor: "rgba(255,122,0,0.15)" }}
            >
              <div
                className="p-3 border-b"
                style={{ borderColor: "rgba(255,122,0,0.06)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-200 font-medium">
                    Notifications
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <button className="text-xs underline" onClick={markAllRead}>
                      Mark all read
                    </button>
                    <button className="text-xs underline" onClick={clearAll}>
                      Clear
                    </button>
                  </div>
                </div>
              </div>
              <div className="max-h-64 overflow-auto p-2 space-y-2">
                {notifs.length === 0 && (
                  <div className="text-sm text-slate-400 p-3">
                    No notifications
                  </div>
                )}
                {notifs.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-md ${n.unread ? "bg-white/2" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm text-slate-200">{n.title}</div>
                      <div className="text-xs text-slate-400">{n.ts}</div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      {n.unread && (
                        <button
                          className="text-xs px-2 py-1 rounded bg-[#ff7a00] text-white"
                          onClick={() => markRead(n.id)}
                        >
                          Mark read
                        </button>
                      )}
                      <button
                        className="text-xs underline text-slate-400"
                        onClick={() =>
                          setNotifs((s) => s.filter((x) => x.id !== n.id))
                        }
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

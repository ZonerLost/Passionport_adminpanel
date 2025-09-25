import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/ui/section/Header";
import LeftSidebar from "../Components/ui/section/LeftSidebar";

const COLORS = {
  bg: "#0B0B0F", // Onyx (app background)
  bg2: "#12131A", // Charcoal (content surface)
  card: "#161821", // Card surface
  ring: "rgba(110,86,207,0.20)", // subtle purple ring
};

export default function DashboardLayout() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-screen overflow-hidden relative"
      style={{ backgroundColor: COLORS.bg }}
    >
      {/* Left Sidebar */}
      <LeftSidebar isOpen={leftSidebarOpen} setIsOpen={setLeftSidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setLeftSidebarOpen(true)} />

        <main
          className="flex-1 overflow-y-auto p-4 md:p-5"
          style={{
            backgroundColor: COLORS.bg2,
            borderTop: `1px solid ${COLORS.ring}`,
          }}
        >
          <div className="mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

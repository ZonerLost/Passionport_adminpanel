import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/ui/section/Header";
import LeftSidebar from "../Components/ui/section/LeftSidebar";

const COLORS = {
  bg: "#0B0B0F", // Onyx (app background)
  bg2: "#12131A", // Charcoal (content surface)
  card: "#161821", // Card surface
  ring: "rgba(255,122,0,0.20)", // subtle orange ring
};

export default function DashboardLayout() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  return (
    <div
      className="flex h-dvh min-h-screen overflow-hidden relative"
      style={{ backgroundColor: COLORS.bg }}
    >
      {/* Left Sidebar */}
      <LeftSidebar isOpen={leftSidebarOpen} setIsOpen={setLeftSidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setLeftSidebarOpen(true)} />

        <main
          className="flex-1 overflow-y-auto px-4 sm:px-5 lg:px-6 2xl:px-8 py-4 lg:py-5"
          style={{
            backgroundColor: COLORS.bg2,
            borderTop: `1px solid ${COLORS.ring}`,
          }}
        >
          {/* Responsive container:
             - Default: readable max width
             - xl: grows to screen-xl
             - 2xl: grows further
             - ≥3xl (~1920px+): no max (use full width)
          */}
          <div
            className="
              mx-auto w-full
              max-w-screen-lg
              xl:max-w-screen-xl
              2xl:max-w-[1600px]
              [@media(min-width:1920px)]:max-w-none
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

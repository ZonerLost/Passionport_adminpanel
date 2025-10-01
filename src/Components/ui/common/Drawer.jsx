import React from "react";
import { IoClose } from "react-icons/io5";

export default function Drawer({ open, onClose, title, children, footer }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-[#12131A] shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h3 className="text-white font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/10 text-slate-300"
            aria-label="Close"
          >
            <IoClose size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-56px-72px)]">
          {children}
        </div>

        <div className="border-t border-white/10 p-4 bg-[#0B0B0F]">
          {footer}
        </div>
      </aside>
    </>
  );
}

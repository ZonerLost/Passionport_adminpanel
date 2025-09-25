import React from "react";
import { COLORS } from "../shared/theme";

export default function Dialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  children,
}) {
  if (!open) return null;
  return (
    <div
      className="fixed text-center inset-0 z-50 grid place-items-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border p-5"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.ring }}
      >
        <h4 className="text-white text-lg font-semibold">{title}</h4>
        {description && (
          <p className="text-sm text-slate-300 mt-1">{description}</p>
        )}
        <div className="mt-3">{children}</div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            className="h-9 px-3 rounded-lg border text-sm"
            style={{ borderColor: COLORS.ring }}
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className="h-9 px-3 rounded-lg border text-sm"
            style={{ borderColor: COLORS.ring }}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { COLORS } from "../shared/theme";

export default function SectionCard({ title, action, children }) {
  return (
    <section
      className="rounded-2xl border p-4 md:p-5"
      style={{ backgroundColor: COLORS.card, borderColor: COLORS.ring }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

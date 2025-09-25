import React, { useMemo, useState } from "react";
import { COLORS } from "../../ui/shared/theme";

function redact(text, { emails, phones, links }) {
  let out = text || "";
  if (emails)
    out = out.replace(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
      "[redacted email]"
    );
  if (phones) out = out.replace(/\+?\d[\d\-\s()]{7,}\d/g, "[redacted phone]");
  if (links) out = out.replace(/https?:\/\/\S+/g, "[redacted link]");
  return out;
}

export default function PreviewDrawer({ open, report, content, onClose }) {
  const [red, setRed] = useState({ emails: true, phones: true, links: true });
  const text = useMemo(() => redact(content?.text || "", red), [content, red]);

  if (!open || !report) return null;
  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.ring }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b" style={{ borderColor: COLORS.ring }}>
          <div className="text-white text-lg font-semibold">
            Report {report.id}
          </div>
          <div className="text-sm text-slate-300">
            Content: {report.contentId} • Type: {report.type} • Severity:{" "}
            {report.severity}
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <div className="text-slate-300 text-xs uppercase mb-2">
              Redaction
            </div>
            <div className="flex items-center gap-3 text-sm">
              <label>
                <input
                  type="checkbox"
                  checked={red.emails}
                  onChange={(e) =>
                    setRed((s) => ({ ...s, emails: e.target.checked }))
                  }
                />{" "}
                Emails
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={red.phones}
                  onChange={(e) =>
                    setRed((s) => ({ ...s, phones: e.target.checked }))
                  }
                />{" "}
                Phones
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={red.links}
                  onChange={(e) =>
                    setRed((s) => ({ ...s, links: e.target.checked }))
                  }
                />{" "}
                Links
              </label>
            </div>
          </div>
          <div
            className="rounded-lg border p-3"
            style={{
              borderColor: "rgba(110,86,207,0.25)",
              background: "#0F1118",
            }}
          >
            <div className="text-slate-200 whitespace-pre-wrap">{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

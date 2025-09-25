import React, { useState } from "react";
import SectionCard from "../../ui/common/SectionCard";
export default function PlatformSettings({ data, onSave }) {
  const [s, setS] = useState(data);

  const save = () => onSave(s);

  const set = (path, v) =>
    setS((prev) => {
      const next = { ...prev };
      const seg = path.split(".");
      let ref = next;
      for (let i = 0; i < seg.length - 1; i++) {
        ref = ref[seg[i]];
      }
      ref[seg.at(-1)] = v;
      return next;
    });

  return (
    <div className="space-y-4">
      {/* Branding */}
      <SectionCard title="Branding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="text-xs text-slate-400">
            App Name
            <input
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              defaultValue={s.branding.appName}
              onChange={(e) => set("branding.appName", e.target.value)}
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            />
          </label>

          <label className="text-xs text-slate-400">
            Primary Color
            <input
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              defaultValue={s.branding.primary}
              onChange={(e) => set("branding.primary", e.target.value)}
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            />
          </label>
        </div>
      </SectionCard>

      {/* Legal Versions */}
      <SectionCard title="Legal Versions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-xs text-slate-400">
            TOS Version
            <input
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              defaultValue={s.legal.tosVersion}
              onChange={(e) => set("legal.tosVersion", e.target.value)}
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            />
          </label>

          <label className="text-xs text-slate-400">
            Privacy Version
            <input
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              defaultValue={s.legal.privacyVersion}
              onChange={(e) => set("legal.privacyVersion", e.target.value)}
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            />
          </label>
        </div>
      </SectionCard>

      {/* Moderation & Feed Weights */}
      <SectionCard title="Moderation & Feed Weights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-xs text-slate-400">
            Risk Flags (comma separated)
            <input
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              defaultValue={s.moderation.riskFlags.join(",")}
              onChange={(e) =>
                set(
                  "moderation.riskFlags",
                  e.target.value.split(",").map((x) => x.trim())
                )
              }
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            />
          </label>

          <label className="text-xs text-slate-400">
            Auto-ban Threshold
            <input
              type="number"
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              defaultValue={s.moderation.autoBanThreshold}
              onChange={(e) =>
                set("moderation.autoBanThreshold", Number(e.target.value))
              }
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {["recency", "engagement", "affinity"].map((k) => (
            <label key={k} className="text-xs text-slate-400">
              {k}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                defaultValue={s.feedWeights[k]}
                onChange={(e) =>
                  set(`feedWeights.${k}`, Number(e.target.value))
                }
                className="mt-2 w-full"
              />
            </label>
          ))}
        </div>
      </SectionCard>

      {/* Backup & Retention */}
      <SectionCard title="Backup & Retention">
        <label className="text-xs text-slate-400">
          Retention Days
          <input
            type="number"
            className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
            defaultValue={s.backup.retentionDays}
            onChange={(e) =>
              set("backup.retentionDays", Number(e.target.value))
            }
            style={{ borderColor: "rgba(110,86,207,0.25)" }}
          />
        </label>
      </SectionCard>

      {/* Save Button */}
      <button
        onClick={save}
        className="h-9 px-3 rounded-lg text-gray-400 border text-sm"
        style={{ borderColor: "rgba(110,86,207,0.25)" }}
      >
        Save Settings
      </button>
    </div>
  );
}

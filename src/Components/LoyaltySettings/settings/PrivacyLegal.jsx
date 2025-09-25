import React from "react";
import SectionCard from "../../ui/common/SectionCard";

export default function PrivacyLegal({
  data,
  onSave,
  onAdvanceExport,
  onAdvanceDelete,
}) {
  if (!data) return null;

  return (
    <div className="space-y-4">
      <SectionCard title="GDPR/CCPA – DSR SLAs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className="text-xs text-slate-400">
            SLA Hours
            <input
              type="number"
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              defaultValue={data.dsrSlaHours}
              onChange={(e) => onSave({ dsrSlaHours: Number(e.target.value) })}
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            />
          </label>

          <label className="text-xs text-slate-400">
            Export Window (days)
            <input
              type="number"
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              defaultValue={data.dataWindows.exportsDays}
              onChange={(e) =>
                onSave({
                  dataWindows: {
                    ...data.dataWindows,
                    exportsDays: Number(e.target.value),
                  },
                })
              }
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            />
          </label>

          <label className="text-xs text-slate-400">
            Deletion Window (days)
            <input
              type="number"
              className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
              defaultValue={data.dataWindows.deletionsDays}
              onChange={(e) =>
                onSave({
                  dataWindows: {
                    ...data.dataWindows,
                    deletionsDays: Number(e.target.value),
                  },
                })
              }
              style={{ borderColor: "rgba(110,86,207,0.25)" }}
            />
          </label>
        </div>
      </SectionCard>

      {/* Export Requests */}
      <SectionCard title="Export Requests">
        <Queue rows={data.exportQueue} onAdvance={onAdvanceExport} />
      </SectionCard>

      {/* Deletion Requests */}
      <SectionCard title="Deletion Requests">
        <Queue rows={data.deleteQueue} onAdvance={onAdvanceDelete} />
      </SectionCard>
    </div>
  );
}

function Queue({ rows, onAdvance }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[560px] w-full text-sm">
        <thead>
          <tr
            className="text-left text-xs uppercase"
            style={{ color: "#A3A7B7" }}
          >
            <th className="px-3 py-2">User</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="px-3 py-2 text-slate-200">{r.user}</td>
              <td className="px-3 py-2 text-slate-300">{r.status}</td>
              <td className="px-3 py-2 text-right">
                <button
                  className="h-8 px-3 rounded-lg text-gray-400 border text-xs"
                  onClick={() => onAdvance(r.id)}
                  style={{ borderColor: "rgba(110,86,207,0.25)" }}
                >
                  Advance
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from "react";
import SectionCard from "../../ui/common/SectionCard";

export default function UpdateReviewPane({
  updates,
  onApprove,
  onRollback,
  onSchedule,
  onBackerOnly,
}) {
  return (
    <SectionCard title="Updates & Stories Review">
      <div className="overflow-x-auto">
        <table className="min-w-[820px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Version</th>
              <th className="px-3 py-2">Scheduled</th>
              <th className="px-3 py-2">Backer-only</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {updates.map((u) => (
              <tr key={u.id}>
                <td className="px-3 py-2 text-slate-300">{u.kind}</td>
                <td className="px-3 py-2 text-slate-200">{u.title}</td>
                <td className="px-3 py-2 text-slate-300">v{u.version}</td>
                <td className="px-3 py-2 text-slate-300">
                  {u.scheduledAt
                    ? new Date(u.scheduledAt).toLocaleString()
                    : "-"}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  <input
                    type="checkbox"
                    checked={!!u.backerOnly}
                    onChange={(e) => onBackerOnly(u.id, e.target.checked)}
                  />
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      className="text-xs underline"
                      onClick={() => onApprove(u.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onRollback(u.id)}
                    >
                      Rollback
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => {
                        const when = prompt(
                          "Schedule ISO (YYYY-MM-DDTHH:mm):",
                          new Date(Date.now() + 3600e3)
                            .toISOString()
                            .slice(0, 16)
                        );
                        if (when) onSchedule(u.id, when);
                      }}
                    >
                      Schedule
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

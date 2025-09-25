import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function ChatMetaTable({
  data,
  onPage,
  onOpen,
  onMute,
  onEscalate,
}) {
  const pct = (x) => (x * 100).toFixed(0) + "%";
  const sev = (v) =>
    v > 0.8
      ? "text-rose-400"
      : v > 0.6
      ? "text-orange-400"
      : "text-emerald-400";
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Group</th>
              <th className="px-3 py-2">Members</th>
              <th className="px-3 py-2">Msgs (24h)</th>
              <th className="px-3 py-2">Dup</th>
              <th className="px-3 py-2">Links</th>
              <th className="px-3 py-2">Spike</th>
              <th className="px-3 py-2">Abuse</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {data.rows.map((g) => (
              <tr key={g.id}>
                <td className="px-3 py-2 text-gray-400">
                  <button className="underline" onClick={() => onOpen(g)}>
                    {g.name}
                  </button>
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {g.members.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {g.messages24h.toLocaleString()}
                </td>
                <td
                  className={`px-3 py-2 ${sev(g.spamIndicators.duplicateRate)}`}
                >
                  {pct(g.spamIndicators.duplicateRate)}
                </td>
                <td
                  className={`px-3 py-2 ${sev(g.spamIndicators.linkShareRate)}`}
                >
                  {pct(g.spamIndicators.linkShareRate)}
                </td>
                <td
                  className={`px-3 py-2 ${sev(
                    g.spamIndicators.newMemberSpike
                  )}`}
                >
                  {pct(g.spamIndicators.newMemberSpike)}
                </td>
                <td className={`px-3 py-2 ${sev(g.spamIndicators.abuseScore)}`}>
                  {pct(g.spamIndicators.abuseScore)}
                </td>
                <td className="px-3 py-2 text-gray-400 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      className="text-xs underline"
                      onClick={() => onMute(g.id, 12)}
                    >
                      Mute 12h
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onEscalate(g.id)}
                    >
                      Escalate
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <Pagination
          page={data.page}
          total={data.total}
          pageSize={data.pageSize}
          onPage={onPage}
        />
      </div>
    </div>
  );
}

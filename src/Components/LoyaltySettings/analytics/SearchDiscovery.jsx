import React from "react";
import SectionCard from "../../MainDashboard/SectionCard"; // keep the correct path

export default function SearchDiscovery({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-4">
      <SectionCard title="Top Queries">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-[rgba(255,122,0,0.15)]">
            {data.topQueries.map((r) => (
              <tr key={r.q}>
                <td className="px-3 py-2 text-slate-200">{r.q}</td>
                <td className="px-3 py-2 text-right text-slate-300">
                  {r.count.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      <SectionCard title="Zero-result Terms">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-[rgba(255,122,0,0.15)]">
            {data.zeroResults.map((r) => (
              <tr key={r.q}>
                <td className="px-3 py-2 text-slate-200">{r.q}</td>
                <td className="px-3 py-2 text-right text-slate-300">
                  {r.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      <SectionCard title="Trending Tags">
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {data.trendingTags.map((t) => (
            <li
              key={t.tag}
              className="rounded-lg border p-3 flex items-center justify-between"
              style={{
                borderColor: "rgba(255,122,0,0.25)",
                background: "#0F1118",
              }}
            >
              <span className="text-slate-200">{t.tag}</span>
              <span className="text-xs text-emerald-400">+{t.lift}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}

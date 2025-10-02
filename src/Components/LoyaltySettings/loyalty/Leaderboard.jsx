import React from "react";
import SectionCard from "../../../../src/Components/LoyaltySettings/loyalty/LoyaltyEditor";
export default function Leaderboard({ rows }) {
  return (
    <SectionCard title="Leaderboard (Backers)">
      <div className="overflow-x-auto">
        <table className="min-w-[560px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{
                color: "#A3A7B7",
              }}
            >
              <th className="px-3 py-2">Rank</th>
              <th className="px-3 py-2">User</th>
              <th className="px-3 py-2">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,122,0,0.15)]">
            {rows.map((r) => (
              <tr key={r.rank}>
                <td className="px-3 py-2 text-slate-300">{r.rank}</td>
                <td className="px-3 py-2 text-slate-200">{r.user}</td>
                <td className="px-3 py-2 text-slate-300">{r.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

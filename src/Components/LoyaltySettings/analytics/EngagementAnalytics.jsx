import React from "react";
import SectionCard from "../../MainDashboard/SectionCard";
import ChartCard from "../common/ChartCard";
import MetricCard from "../common/MetricCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export default function EngagementAnalytics({ data }) {
  if (!data) return null;

  const conv = (from, to) =>
    from ? ((to / from) * 100).toFixed(1) + "%" : "—";

  return (
    <div className="space-y-4">
      {/* Funnel */}
      <ChartCard title="Funnel">
        <BarChart
          data={data.funnel}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="stage" tick={{ fill: "#A3A7B7", fontSize: 12 }} />
          <YAxis tick={{ fill: "#A3A7B7", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: "#0F1118",
              border: "1px solid rgba(255,122,0,0.25)",
              borderRadius: 12,
            }}
          />
          <Bar dataKey="value" fill="#ff7a00" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ChartCard>

      {/* Conversion & Cohorts */}
      <SectionCard title="Conversion & Cohorts">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <MetricCard
            label="Visit → Follow"
            value={conv(data.funnel[0].value, data.funnel[1].value)}
          />
          <MetricCard
            label="Follow → Back"
            value={conv(data.funnel[1].value, data.funnel[2].value)}
          />
          <MetricCard
            label="Back → Purchase"
            value={conv(data.funnel[2].value, data.funnel[3].value)}
          />
          <MetricCard
            label="Visit → Purchase"
            value={conv(data.funnel[0].value, data.funnel[3].value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-sm">
            <thead>
              <tr
                className="text-left text-xs uppercase"
                style={{ color: "#A3A7B7" }}
              >
                <th className="px-3 py-2">Cohort</th>
                <th className="px-3 py-2">M+1</th>
                <th className="px-3 py-2">M+2</th>
                <th className="px-3 py-2">M+3</th>
                <th className="px-3 py-2">M+4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,122,0,0.15)]">
              {data.cohorts.map((c) => (
                <tr key={c.cohort}>
                  <td className="px-3 py-2 text-slate-200">{c.cohort}</td>
                  <td className="px-3 py-2 text-slate-300">{c.m1}%</td>
                  <td className="px-3 py-2 text-slate-300">{c.m2}%</td>
                  <td className="px-3 py-2 text-slate-300">{c.m3}%</td>
                  <td className="px-3 py-2 text-slate-300">{c.m4}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Creator Performance */}
      <ChartCard title="Creator Performance (raised)">
        <LineChart
          data={data.creators}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2532" />
          <XAxis dataKey="brand" tick={{ fill: "#A3A7B7", fontSize: 12 }} />
          <YAxis tick={{ fill: "#A3A7B7", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: "#0F1118",
              border: "1px solid rgba(255,122,0,0.25)",
              borderRadius: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="raised"
            stroke="#6E56CF"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartCard>

      {/* Club Activity */}
      <SectionCard title="Club Activity">
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-sm">
            <thead>
              <tr
                className="text-left text-xs uppercase"
                style={{ color: "#A3A7B7" }}
              >
                <th className="px-3 py-2">Club</th>
                <th className="px-3 py-2">Members</th>
                <th className="px-3 py-2">Posts</th>
                <th className="px-3 py-2">Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,122,0,0.15)]">
              {data.clubs.map((c) => (
                <tr key={c.club}>
                  <td className="px-3 py-2 text-slate-200">{c.club}</td>
                  <td className="px-3 py-2 text-slate-300">
                    {c.members.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-slate-300">
                    {c.posts.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-slate-300">{c.act}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

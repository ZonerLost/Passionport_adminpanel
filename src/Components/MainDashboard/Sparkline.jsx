import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

export default function Sparkline({ data = [], dataKey = "y" }) {
  return (
    <div className="w-28 h-14 md:w-32 md:h-16">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 6, right: 6, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff7a00" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#ff7a00" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#ff7a00"
            fill="url(#grad)"
            strokeWidth={2}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              background: "#0F1118",
              border: "1px solid rgba(255,122,0,0.25)",
              borderRadius: 12,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

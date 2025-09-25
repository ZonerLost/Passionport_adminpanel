import React from "react";
import SectionCard from "../../../../src/Components/LoyaltySettings/common/MetricCard";
import { ResponsiveContainer } from "recharts";
export default function ChartCard({ title, action, children, height = 240 }) {
  return (
    <SectionCard title={title} action={action}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}

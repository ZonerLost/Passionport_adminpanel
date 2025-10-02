import React from "react";
import useDashboardMetrics from "../hooks/useDashboardMetrics";
import ExecOverview from "../Components/MainDashboard/ExecOverview";
import RevenueSnapshot from "../Components/MainDashboard/RevenueSnapshot";
import TrustSafetyPulse from "../Components/MainDashboard/TrustSafetyPulse";
import SystemHealth from "../Components/MainDashboard/SystemHealth";

export default function OverviewDashboard() {
  const { exec, rev, ts, sys, loading, error } = useDashboardMetrics();

  if (loading) {
    return (
      <div className="p-6 grid gap-4">
        <Skeleton h={160} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton h={200} />
          <Skeleton h={200} />
          <Skeleton h={200} />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-6">
        <div
          className="rounded-xl border p-4 text-rose-300"
          style={{
            borderColor: "rgba(255,122,0,0.25)",
            background: "#2A0E12",
          }}
        >
          Failed to load dashboard. Please retry.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      <ExecOverview exec={exec} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <RevenueSnapshot data={rev} />
          <TrustSafetyPulse data={ts} />
        </div>
        <SystemHealth data={sys} />
      </div>
    </div>
  );
}

function Skeleton({ h = 140 }) {
  return (
    <div
      className="rounded-2xl animate-pulse"
      style={{
        height: h,
        background: "linear-gradient(90deg,#0e1016,#11131a,#0e1016)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}

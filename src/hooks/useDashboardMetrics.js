import { useEffect, useMemo, useState } from "react";
import {
  getExecutiveOverview,
  getRevenueSnapshot,
  getTrustSafetyPulse,
  getSystemHealth,
} from "../data/metrics.service";

export default function useDashboardMetrics() {
  const [exec, setExec] = useState(null);
  const [rev, setRev] = useState(null);
  const [ts, setTs] = useState(null);
  const [sys, setSys] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const [e, r, t, s] = await Promise.all([
          getExecutiveOverview(),
          getRevenueSnapshot(),
          getTrustSafetyPulse(),
          getSystemHealth(),
        ]);
        if (!mounted) return;
        setExec(e);
        setRev(r);
        setTs(t);
        setSys(s);
      } catch (err) {
        console.error("[overview] load error", err);
        setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const state = useMemo(
    () => ({ exec, rev, ts, sys, loading, error }),
    [exec, rev, ts, sys, loading, error]
  );
  return state;
}

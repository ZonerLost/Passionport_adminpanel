import { useEffect, useState } from "react";
import { fetchEngagement } from "../Data/analytics.service";
export default function useEngagementAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setData(await fetchEngagement());
      setLoading(false);
    })();
  }, []);
  return { data, loading };
}

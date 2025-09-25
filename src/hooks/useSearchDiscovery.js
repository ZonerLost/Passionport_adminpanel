import { useEffect, useState } from "react";
import { fetchSearchDiscovery } from "../Data/analytics.service";
export default function useSearchDiscovery() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setData(await fetchSearchDiscovery());
      setLoading(false);
    })();
  }, []);
  return { data, loading };
}

import { useEffect, useMemo, useState } from "react";
import { fetchLogs, exportLogsCSV } from "../Data/messaging.service";
export default function useLogs() {
  const [filters, setFilters] = useState({
    query: "",
    channel: "all",
    status: "all",
  });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setRes(await fetchLogs({ ...filters, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [filters, page, pageSize]);

  const actions = useMemo(
    () => ({
      setQuery: (v) => setFilters((s) => ({ ...s, query: v })),
      setChannel: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, channel: v }));
      },
      setStatus: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, status: v }));
      },
      setPage,
      exportCSV: async () => {
        const blob = await exportLogsCSV();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "delivery_logs.csv";
        a.click();
        URL.revokeObjectURL(url);
      },
      reload: load,
    }),
    []
  );

  return { ...res, loading, filters, actions };
}

import { useEffect, useMemo, useState } from "react";
import {
  fetchPayouts,
  getPayout,
  putHold,
  releaseHold,
  schedulePayout,
  exportPayoutsCSV,
} from "../Data/finance.service";

export default function usePayouts() {
  const [filters, setFilters] = useState({ query: "", kyc: "all" });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    setRes(await fetchPayouts({ ...filters, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [filters, page, pageSize]);

  const actions = useMemo(
    () => ({
      setQuery: (v) => setFilters((s) => ({ ...s, query: v })),
      setKyc: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, kyc: v }));
      },
      setPage,
      open: async (id) => setSelected(await getPayout(id)),
      close: () => setSelected(null),
      hold: async (brand, amount, note) => {
        await putHold(brand, amount, note);
        await load();
      },
      release: async (brand, amount) => {
        await releaseHold(brand, amount);
        await load();
      },
      schedule: async (id, whenISO) => {
        await schedulePayout(id, whenISO);
        await load();
      },
      exportCSV: async () => {
        const blob = await exportPayoutsCSV();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "payouts.csv";
        a.click();
        URL.revokeObjectURL(url);
      },
      reload: load,
    }),
    []
  );

  return { ...res, loading, filters, actions, selected };
}

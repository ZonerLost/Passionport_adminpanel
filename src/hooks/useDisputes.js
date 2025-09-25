import { useEffect, useMemo, useState } from "react";
import {
  fetchDisputes,
  getDispute,
  uploadEvidence,
  closeDispute,
  exportDisputesCSV,
} from "../data/finance.service";

export default function useDisputes() {
  const [filters, setFilters] = useState({ query: "", status: "all" });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    setRes(await fetchDisputes({ ...filters, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [filters, page, pageSize]);

  const actions = useMemo(
    () => ({
      setQuery: (v) => setFilters((s) => ({ ...s, query: v })),
      setStatus: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, status: v }));
      },
      setPage,
      open: async (id) => setSelected(await getDispute(id)),
      close: () => setSelected(null),
      evidence: async (id, file) => {
        await uploadEvidence(id, { name: file.name, size: file.size });
        await load();
      },
      close: async (id, outcome) => {
        await closeDispute(id, outcome);
        await load();
      },
      exportCSV: async () => {
        const blob = await exportDisputesCSV();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "disputes.csv";
        a.click();
        URL.revokeObjectURL(url);
      },
      reload: load,
    }),
    []
  );

  return { ...res, loading, filters, actions, selected };
}

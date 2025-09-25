import { useEffect, useMemo, useState } from "react";
import {
  fetchTransactions,
  getTransaction,
  exportTransactionsCSV,
  initiateRefund,
} from "../Data/finance.service";

export default function useLedger() {
  const [filters, setFilters] = useState({
    query: "",
    method: "all",
    type: "all",
    status: "all",
  });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    setRes(await fetchTransactions({ ...filters, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [filters, page, pageSize]);

  const actions = useMemo(
    () => ({
      setQuery: (v) => setFilters((s) => ({ ...s, query: v })),
      setMethod: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, method: v }));
      },
      setType: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, type: v }));
      },
      setStatus: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, status: v }));
      },
      setPage,
      open: async (id) => setSelected(await getTransaction(id)),
      close: () => setSelected(null),
      exportCSV: async () => {
        const blob = await exportTransactionsCSV();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "transactions.csv";
        a.click();
        URL.revokeObjectURL(url);
      },
      refund: async (id, reason) => {
        await initiateRefund(id, reason);
        await load();
      },
      reload: load,
    }),
    []
  );

  return { ...res, loading, filters, actions, selected };
}

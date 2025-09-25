import { useEffect, useMemo, useState } from "react";
import {
  fetchCMS,
  getCMS,
  saveCMS,
  publishCMS,
} from "../Data/messaging.service";

export default function useCMS() {
  const [filters, setFilters] = useState({
    query: "",
    location: "all",
    status: "all",
  });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    setRes(await fetchCMS({ ...filters, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [filters, page, pageSize]);

  const actions = useMemo(
    () => ({
      setQuery: (v) => setFilters((s) => ({ ...s, query: v })),
      setLocation: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, location: v }));
      },
      setStatus: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, status: v }));
      },
      setPage,
      open: async (id) => setSelected(await getCMS(id)),
      close: () => setSelected(null),
      save: async (b) => {
        await saveCMS(b);
        await load();
      },
      publish: async (id, on) => {
        await publishCMS(id, on);
        await load();
      },
      reload: load,
    }),
    []
  );

  return { ...res, loading, filters, actions, selected };
}

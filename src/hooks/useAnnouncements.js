import { useEffect, useMemo, useState } from "react";
import {
  fetchAnnouncements,
  getAnnouncement,
  saveAnnouncement,
  scheduleAnnouncement,
} from "../Data/messaging.service";

export default function useAnnouncements() {
  const [filters, setFilters] = useState({ query: "", status: "all" });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    setRes(await fetchAnnouncements({ ...filters, page, pageSize }));
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
      open: async (id) => setSelected(await getAnnouncement(id)),
      close: () => setSelected(null),
      save: async (a) => {
        await saveAnnouncement(a);
        await load();
      },
      schedule: async (id, startAt, endAt, segments) => {
        await scheduleAnnouncement(id, startAt, endAt, segments);
        await load();
      },
      reload: load,
    }),
    []
  );

  return { ...res, loading, filters, actions, selected };
}

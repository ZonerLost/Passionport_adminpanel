import { useEffect, useMemo, useState } from "react";
import { fetchClubs, moderate } from "../Data/moderation.service";

export default function useClubs() {
  const [query, setQuery] = useState("");
  const [onlyPending, setOnlyPending] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setRes(await fetchClubs({ query, onlyPending, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [query, onlyPending, page, pageSize]);

  const actions = useMemo(
    () => ({
      approve: (id) => moderate("approve", "club", id),
      remove: (id) => moderate("remove", "club", id),
      mute: (id, hours) => moderate("mute", "club", id, { hours }),
      reload: load,
      setQuery,
      setOnlyPending,
      setPage,
    }),
    []
  );

  return { ...res, loading, filters: { query, onlyPending }, actions };
}

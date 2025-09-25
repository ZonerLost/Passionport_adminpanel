import { useEffect, useMemo, useState } from "react";
import { fetchReviews, moderate } from "../Data/moderation.service";

export default function useReviews() {
  const [query, setQuery] = useState("");
  const [suspected, setSuspected] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setRes(await fetchReviews({ query, suspected, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [query, suspected, page, pageSize]);

  const actions = useMemo(
    () => ({
      approve: (id) => moderate("approve", "review", id),
      hide: (id) => moderate("hide", "review", id),
      remove: (id) => moderate("remove", "review", id),
      escalate: (id) => moderate("escalate", "review", id),
      reload: load,
      setQuery,
      setSuspected,
      setPage,
    }),
    []
  );

  return { ...res, loading, filters: { query, suspected }, actions };
}

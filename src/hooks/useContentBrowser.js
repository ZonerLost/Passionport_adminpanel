import { useEffect, useMemo, useState } from "react";
import { fetchContent, moderate } from "../Data/moderation.service";

export default function useContentBrowser() {
  const [query, setQuery] = useState("");
  const [flagged, setFlagged] = useState("all");
  const [by, setBy] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setRes(await fetchContent({ query, flagged, by, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [query, flagged, by, page, pageSize]);

  const actions = useMemo(
    () => ({
      approve: (id) => moderate("approve", "content", id),
      hide: (id) => moderate("hide", "content", id),
      remove: (id) => moderate("remove", "content", id),
      reload: load,
      setQuery,
      setFlagged,
      setBy,
      setPage,
    }),
    []
  );

  return { ...res, loading, filters: { query, flagged, by }, actions };
}

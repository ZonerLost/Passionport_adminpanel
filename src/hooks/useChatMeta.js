import { useEffect, useMemo, useState } from "react";
import { fetchChatMeta, moderate } from "../Data/moderation.service";

export default function useChatMeta() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    setRes(await fetchChatMeta({ query, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [query, page, pageSize]);

  const actions = useMemo(
    () => ({
      mute: (id, hours) => moderate("mute", "chat", id, { hours }),
      requireEdit: (id) => moderate("requireEdit", "chat", id),
      escalate: (id) => moderate("escalate", "chat", id),
      reload: load,
      setQuery,
      setPage,
      setSelected,
    }),
    []
  );

  return { ...res, loading, filters: { query }, selected, actions };
}

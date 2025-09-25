import { useEffect, useMemo, useState } from "react";
import {
  fetchReports,
  moderate,
  evidencePack,
} from "../Data/moderation.service";

export default function useReports() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [severity, setSeverity] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    setRes(await fetchReports({ query, type, severity, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [query, type, severity, page, pageSize]);

  const actions = useMemo(
    () => ({
      approve: (id) => moderate("approve", "report", id),
      hide: (id) => moderate("hide", "report", id),
      remove: (id) => moderate("remove", "report", id),
      shadowBan: (userId) => moderate("shadowBan", "user", userId),
      mute: (userId, hours) => moderate("mute", "user", userId, { hours }),
      requireEdit: (id, note) =>
        moderate("requireEdit", "report", id, { note }),
      escalate: (id) => moderate("escalate", "report", id),
      evidence: evidencePack,
      reload: load,
      setQuery,
      setType,
      setSeverity,
      setPage,
      setSelected,
    }),
    []
  );

  return {
    ...res,
    loading,
    filters: { query, type, severity },
    selected,
    actions,
  };
}

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  fetchFans,
  getFanDetail,
  suspendFan,
  banFan,
  deleteFan,
  reset2FA,
  resetPassword,
  exportGDPR,
} from "../Data/fans.service";

export default function useFans() {
  const [filters, setFilters] = useState({
    query: "",
    status: "all", // all | active | inactive
    verification: "all", // all | verified | unverified
  });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setRes(await fetchFans({ ...filters, page, pageSize }));
    setLoading(false);
  }, [filters, page, pageSize]);

  useEffect(() => {
    load();
  }, [load]);
  const actions = useMemo(
    () => ({
      setQuery: (v) => setFilters((s) => ({ ...s, query: v })),
      setStatus: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, status: v }));
      },
      setVerification: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, verification: v }));
      },
      setPage,
      open: async (id) => await getFanDetail(id),
      suspend: async (id, days) => {
        await suspendFan(id, days);
        await load();
      },
      ban: async (id, reason) => {
        await banFan(id, reason);
        await load();
      },
      remove: async (id) => {
        await deleteFan(id);
        await load();
      },
      reset2FA: async (id) => reset2FA(id),
      resetPassword: async (id) => resetPassword(id),
      exportGDPR: async (id) => exportGDPR(id),
      reload: load,
    }),
    [load]
  );

  return { ...res, loading, filters, actions };
}

import { useEffect, useMemo, useState } from "react";
import {
  fetchUsers,
  promoteUserRole,
  suspendUser,
  banUser,
  reset2FA,
  forcePasswordReset,
  signOutAllDevices,
  exportUserData,
  deleteUser,
} from "../data/users.service";

export default function useUsersDirectory() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      const r = await fetchUsers({ query, type, role, status, page, pageSize });
      setRes(r);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(); // eslint-disable-next-line
  }, [query, type, role, status, page, pageSize]);

  const actions = useMemo(
    () => ({
      promote: promoteUserRole,
      suspend: suspendUser,
      ban: banUser,
      reset2FA,
      forcePasswordReset,
      signOutAllDevices,
      exportUserData,
      deleteUser,
      reload: load,
      setQuery,
      setType,
      setRole,
      setStatus,
      setPage,
    }),
    [load]
  );

  return {
    ...res,
    loading,
    error,
    filters: { query, type, role, status },
    actions,
  };
}

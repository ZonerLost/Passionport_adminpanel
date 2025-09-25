import { useEffect, useState } from "react";
import {
  fetchKycQueue,
  approveKyc,
  rejectKyc,
  requestMoreDocs,
} from "../Data/kyc.service";

export default function useKycQueue() {
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await fetchKycQueue({ status, page, pageSize });
    setRes(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [status, page, pageSize]); // ✅ removed "loading"

  return {
    ...res,
    status,
    setStatus,
    setPage,
    approveKyc,
    rejectKyc,
    requestMoreDocs,
    reload: load,
    loading,
  };
}

import { useEffect, useState } from "react";
import {
  fetchKycQueue,
  approveKyc,
  rejectKyc,
  requestMoreDocs,
} from "../data/kyc.service";

export default function useKycQueue() {
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);

  async function load() {
    setRes(await fetchKycQueue({ status, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);
    load();
  }, [status, page, pageSize]);

  return {
    ...res,
    status,
    setStatus,
    setPage,
    approveKyc,
    rejectKyc,
    requestMoreDocs,
    reload: load,
  };
}

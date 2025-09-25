import { useEffect, useMemo, useState } from "react";
import {
  fetchCampaigns,
  approveCampaign,
  rejectCampaign,
  requireChanges,
  pauseCampaign,
  terminateCampaign,
  assignModerator,
  bulkApprove,
} from "../data/campaigns.service";

export default function useCampaignQueue() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  async function load() {
    try {
      setLoading(true);
      const r = await fetchCampaigns({ query, status, page, pageSize });
      setRes(r);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [query, status, page, pageSize]);

  const actions = useMemo(
    () => ({
      approve: approveCampaign,
      reject: rejectCampaign,
      requireChanges,
      pause: pauseCampaign,
      terminate: terminateCampaign,
      assignModerator,
      bulkApprove,
      reload: load,
      setQuery,
      setStatus,
      setPage,
      selectedIds,
      setSelectedIds,
    }),
    [load, query, status, page]
  );

  return { ...res, loading, error, filters: { query, status }, actions };
}

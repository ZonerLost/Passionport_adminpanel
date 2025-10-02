import { useEffect, useMemo, useState, useCallback } from "react";
import {
  fetchBrands,
  getBrandDetail,
  approveBrand,
  rejectBrand,
  suspendBrand,
  addCampaign,
  removeCampaign,
} from "../Data/brands.service";

export default function useBrands() {
  const [filters, setFilters] = useState({ query: "", kyc: "all" });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setRes(await fetchBrands({ ...filters, page, pageSize }));
    setLoading(false);
  }, [filters, page, pageSize]);

  useEffect(() => {
    load();
  }, [filters, page, pageSize, load]);

  const actions = useMemo(
    () => ({
      setQuery: (v) => setFilters((s) => ({ ...s, query: v })),
      setKyc: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, kyc: v }));
      },
      setPage,
      open: async (id) => await getBrandDetail(id),
      approve: async (id) => {
        await approveBrand(id);
        await load();
      },
      reject: async (id, reason) => {
        await rejectBrand(id, reason);
        await load();
      },
      suspend: async (id, days) => {
        await suspendBrand(id, days);
        await load();
      },
      addCampaign: async (brandId, { title }) => {
        await addCampaign(brandId, title);
      },
      removeCampaign: async (brandId, cid) => {
        await removeCampaign(brandId, cid);
      },
      reload: load,
    }),
    []
  );

  return { ...res, loading, filters, actions };
}

import { useEffect, useMemo, useState } from "react";
import {
  fetchProducts,
  getProduct,
  updateProductStatus,
  freezeProduct,
  bulkUpdateProducts,
  exportCatalogCSV,
  brands,
} from "../Data/catalog.service";

export default function useCatalog() {
  const [filters, setFilters] = useState({
    query: "",
    brand: "all",
    status: "all",
    linked: "all",
  });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [brandList, setBrandList] = useState([]);

  async function load() {
    setLoading(true);
    setRes(await fetchProducts({ ...filters, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [filters, page, pageSize]);
  useEffect(() => {
    (async () => setBrandList(await brands()))();
  }, []);

  const actions = useMemo(
    () => ({
      setQuery: (v) => setFilters((s) => ({ ...s, query: v })),
      setBrand: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, brand: v }));
      },
      setStatus: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, status: v }));
      },
      setLinked: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, linked: v }));
      },
      setPage,
      open: async (id) => setSelected(await getProduct(id)),
      close: () => setSelected(null),
      approve: async (id) => {
        await updateProductStatus(id, "live");
        await load();
      },
      pause: async (id) => {
        await updateProductStatus(id, "paused");
        await load();
      },
      freeze: async (id, reason) => {
        await freezeProduct(id, reason);
        await load();
      },
      bulk: async (payload, ids) => {
        await bulkUpdateProducts({ ...payload, ids });
        await load();
      },
      exportCSV: async () => {
        const blob = await exportCatalogCSV();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "catalog.csv";
        a.click();
        URL.revokeObjectURL(url);
      },
      reload: load,
    }),
    []
  );

  return { ...res, loading, filters, actions, selected, brands: brandList };
}

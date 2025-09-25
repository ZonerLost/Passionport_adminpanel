import { useEffect, useMemo, useState } from "react";
import {
  fetchOrders,
  getOrder,
  updateOrderStatus,
  refundOrderItem,
  markShipped,
  reship,
  contact,
  exportOrdersCSV,
} from "../Data/catalog.service";

export default function useOrders() {
  const [filters, setFilters] = useState({ query: "", status: "all" });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    setRes(await fetchOrders({ ...filters, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [filters, page, pageSize]);

  const actions = useMemo(
    () => ({
      setQuery: (v) => setFilters((s) => ({ ...s, query: v })),
      setStatus: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, status: v }));
      },
      setPage,
      open: async (id) => setSelected(await getOrder(id)),
      close: () => setSelected(null),
      updateStatus: async (id, status) => {
        await updateOrderStatus(id, status);
        await load();
      },
      refundItem: async (orderId, itemId, payload) => {
        await refundOrderItem(orderId, itemId, payload);
        await load();
      },
      markShipped: async (orderId, payload) => {
        await markShipped(orderId, payload);
        await load();
      },
      reship: async (orderId, itemId) => {
        await reship(orderId, itemId);
        await load();
      },
      contact: async (orderId, who) => {
        await contact(orderId, who);
      },
      exportCSV: async () => {
        const blob = await exportOrdersCSV();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "orders.csv";
        a.click();
        URL.revokeObjectURL(url);
      },
      reload: load,
    }),
    []
  );

  return { ...res, loading, filters, actions, selected };
}

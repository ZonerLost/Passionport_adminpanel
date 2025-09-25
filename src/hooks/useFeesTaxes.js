import { useEffect, useMemo, useState } from "react";
import {
  fetchFees,
  saveFee,
  deleteFee,
  fetchTaxes,
  saveTax,
  deleteTax,
  fetchInvoiceSettings,
  saveInvoiceSettings,
} from "../Data/finance.service";

export default function useFeesTaxes() {
  const [fees, setFees] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [f, t, i] = await Promise.all([
      fetchFees(),
      fetchTaxes(),
      fetchInvoiceSettings(),
    ]);
    setFees(f);
    setTaxes(t);
    setInvoice(i);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  const actions = useMemo(
    () => ({
      saveFee: async (rule) => {
        await saveFee(rule);
        await load();
      },
      deleteFee: async (id) => {
        await deleteFee(id);
        await load();
      },
      saveTax: async (rule) => {
        await saveTax(rule);
        await load();
      },
      deleteTax: async (id) => {
        await deleteTax(id);
        await load();
      },
      saveInvoice: async (next) => {
        await saveInvoiceSettings(next);
        await load();
      },
    }),
    []
  );

  return { fees, taxes, invoice, loading, actions };
}

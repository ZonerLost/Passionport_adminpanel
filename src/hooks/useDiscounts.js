import { useEffect, useMemo, useState } from "react";
import {
  fetchDiscounts,
  saveDiscount,
  deleteDiscount,
  brands,
} from "../Data/catalog.service";

export default function useDiscounts() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brandList, setBrandList] = useState([]);

  async function load() {
    setLoading(true);
    setRows(await fetchDiscounts());
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    (async () => setBrandList(await brands()))();
  }, []);

  const actions = useMemo(
    () => ({
      save: async (d) => {
        await saveDiscount(d);
        await load();
      },
      remove: async (id) => {
        await deleteDiscount(id);
        await load();
      },
    }),
    []
  );

  return { rows, loading, actions, brands: brandList };
}

import { useEffect, useState } from "react";
import {
  fetchPrivacy,
  updatePrivacy,
  advanceExport,
  advanceDelete,
} from "../Data/settings.service";
export default function usePrivacy() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  async function load() {
    setData(await fetchPrivacy());
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);
  return {
    data,
    loading,
    save: async (next) => {
      await updatePrivacy(next);
      await load();
    },
    advanceExport: async (id) => {
      await advanceExport(id);
      await load();
    },
    advanceDelete: async (id) => {
      await advanceDelete(id);
      await load();
    },
  };
}

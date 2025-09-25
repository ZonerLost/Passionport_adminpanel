import { useEffect, useState } from "react";
import { fetchRules, saveRules } from "../Data/rules.service";

export default function useRules() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  async function load() {
    setData(await fetchRules());
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);
  async function save(next) {
    await saveRules(next);
    await load();
  }
  return { data, loading, save };
}

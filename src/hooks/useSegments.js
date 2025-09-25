import { useEffect, useMemo, useState } from "react";
import {
  fetchSegments,
  saveSegment,
  deleteSegment,
  estimateSegmentCount,
} from "../Data/messaging.service";

export default function useSegments() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    setRows(await fetchSegments());
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  const actions = useMemo(
    () => ({
      open: (s) => setSelected(s),
      close: () => setSelected(null),
      save: async (s) => {
        await saveSegment(s);
        await load();
      },
      remove: async (id) => {
        await deleteSegment(id);
        await load();
      },
      estimate: async (rules) => await estimateSegmentCount(rules),
      reload: load,
    }),
    []
  );

  return { rows, loading, selected, actions };
}

import { useEffect, useMemo, useState } from "react";
import {
  fetchTemplates,
  getTemplate,
  saveTemplate,
  rollbackTemplate,
  testSendTemplate,
  exportTemplatesCSV,
} from "../Data/messaging.service";

export default function useTemplates(defaultCategory = "all") {
  const [filters, setFilters] = useState({
    query: "",
    event: "all",
    channel: "all",
    category: defaultCategory,
  });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [res, setRes] = useState({ rows: [], total: 0, page: 1, pageSize });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    setRes(await fetchTemplates({ ...filters, page, pageSize }));
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, [filters, page, pageSize]);

  const actions = useMemo(
    () => ({
      setQuery: (v) => setFilters((s) => ({ ...s, query: v })),
      setEvent: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, event: v }));
      },
      setChannel: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, channel: v }));
      },
      setCategory: (v) => {
        setPage(1);
        setFilters((s) => ({ ...s, category: v }));
      },
      setPage,
      open: async (id) => setSelected(await getTemplate(id)),
      close: () => setSelected(null),
      save: async (tpl) => {
        await saveTemplate(tpl);
        await load();
      },
      rollback: async (id, version) => {
        await rollbackTemplate(id, version);
        await load();
      },
      test: async (id, channel, target) => {
        await testSendTemplate(id, channel, target);
      },
      exportCSV: async () => {
        const blob = await exportTemplatesCSV();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "templates.csv";
        a.click();
        URL.revokeObjectURL(url);
      },
      reload: load,
    }),
    []
  );

  return { ...res, loading, filters, actions, selected };
}

import { useEffect, useState } from "react";
import {
  fetchAccess,
  rotateKey,
  addWebhook,
  testWebhook,
  saveSso,
  fetchAuditLogs,
} from "../Data/settings.service";
export default function useAccessAudit() {
  const [access, setAccess] = useState(null);
  const [logs, setLogs] = useState({
    rows: [],
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  async function load() {
    setAccess(await fetchAccess());
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);
  async function pageLogs(page) {
    setLogs(await fetchAuditLogs({ page, pageSize: logs.pageSize }));
  }
  useEffect(() => {
    pageLogs(1);
  }, []);
  return {
    access,
    logs,
    loading,
    rotateKey: async (id) => {
      await rotateKey(id);
      await load();
    },
    addWebhook: async (url, events) => {
      await addWebhook(url, events);
      await load();
    },
    testWebhook: async (id) => {
      await testWebhook(id);
    },
    saveSso: async (cfg) => {
      await saveSso(cfg);
      await load();
    },
    pageLogs,
  };
}

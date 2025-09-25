import { useEffect, useState } from "react";
import { fetchSettings, saveSettings } from "../Data/settings.service";
// filepath: c:\Users\hp\Downloads\passion-port\passion-port\src\hooks\useSettings.js

export default function useSettings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  async function load() {
    setData(await fetchSettings());
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);
  async function save(next) {
    await saveSettings(next);
    await load();
  }
  return { data, loading, save };
}

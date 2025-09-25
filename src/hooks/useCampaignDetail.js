import { useEffect, useState } from "react";
import { fetchCampaignById, pinTestimonial } from "../Data/campaigns.service";

export default function useCampaignDetail(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const result = await fetchCampaignById(id);
      setData(result || null);
    } catch (error) {
      console.error("Failed to load campaign detail", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function pin(tid, pinned = true) {
    if (!id) return;
    await pinTestimonial(id, tid, pinned);
    await load();
  }

  return { data, loading, reload: load, pin };
}

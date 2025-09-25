import { useMemo, useState } from "react";

const ALL = [
  { id: "ch_eco", name: "Eco Projects Bundle", badge: "🌿" },
  { id: "ch_music", name: "Indie Music Week", badge: "🎵" },
  { id: "ch_tech", name: "Makers Sprint", badge: "🛠️" },
];

export default function useChallenges(campaign) {
  const [sel, setSel] = useState([]);
  const assigned = useMemo(() => sel, [sel]);
  async function assign(ids) {
    setSel(ids); /* Wire to API later */
  }
  return { all: ALL, assigned, assign };
}

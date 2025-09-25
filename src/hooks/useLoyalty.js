import { useEffect, useState } from "react";
import {
  fetchLoyalty,
  fetchLeaderboard,
  saveTiers,
  saveRules,
  saveStreak,
  saveChallenges,
  simulatePoints,
} from "../Data/loyalty.service.js";

export default function useLoyalty() {
  const [state, setState] = useState({
    tiers: [],
    rules: [],
    streak: null,
    challenges: [],
  });

  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const loyalty = await fetchLoyalty();
    const leaderboard = await fetchLeaderboard();

    setState(loyalty);
    setBoard(leaderboard);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const save = async ({ tiers, rules, streak, challenges }) => {
    if (tiers) await saveTiers(tiers);
    if (rules) await saveRules(rules);
    if (streak) await saveStreak(streak);
    if (challenges) await saveChallenges(challenges);
    await load();
  };

  const simulate = simulatePoints;

  return { ...state, leaderboard: board, loading, save, simulate };
}

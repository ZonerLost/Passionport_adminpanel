import {
  DEFAULT_TIERS,
  DEFAULT_RULES,
  DEFAULT_STREAK,
  DEFAULT_CHALLENGES,
  DEFAULT_LEADERBOARD,
} from "./loyalty.fixtures";
let TIERS = [...DEFAULT_TIERS];
let RULES = [...DEFAULT_RULES];
let STREAK = { ...DEFAULT_STREAK };
let CHALLENGES = [...DEFAULT_CHALLENGES];
export async function fetchLoyalty() {
  return { tiers: TIERS, rules: RULES, streak: STREAK, challenges: CHALLENGES };
}
export async function saveTiers(tiers) {
  TIERS = tiers;
  return { ok: true };
}
export async function saveRules(rules) {
  RULES = rules;
  return { ok: true };
}
export async function saveStreak(streak) {
  STREAK = streak;
  return { ok: true };
}
export async function saveChallenges(ch) {
  CHALLENGES = ch;
  return { ok: true };
}
export async function simulatePoints({ backs = 0, shares = 0, refs = 0 }) {
  const map = Object.fromEntries(RULES.map((r) => [r.id, r.points]));
  const total =
    backs * map["r_back"] + shares * map["r_share"] + refs * map["r_ref"];
  return { total };
}
export async function fetchLeaderboard() {
  return DEFAULT_LEADERBOARD;
}

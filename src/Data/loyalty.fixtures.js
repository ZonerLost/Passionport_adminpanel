export const DEFAULT_TIERS = [
  { id: "t_bronze", name: "Bronze", min: 0, color: "#CD7F32" },
  { id: "t_silver", name: "Silver", min: 500, color: "#C0C0C0" },
  { id: "t_gold", name: "Gold", min: 1500, color: "#D4AF37" },
  { id: "t_platinum", name: "Platinum", min: 4000, color: "#E5E4E2" },
];
export const DEFAULT_RULES = [
  { id: "r_back", label: "Backing a campaign", points: 100 },
  { id: "r_share", label: "Sharing a campaign", points: 20 },
  { id: "r_ref", label: "Referral signup", points: 200 },
];
export const DEFAULT_STREAK = {
  enabled: true,
  weeklyTarget: 2,
  recoverWith: "extra-share",
};
export const DEFAULT_CHALLENGES = [
  {
    id: "ch_eco",
    name: "Eco Projects Bundle",
    start: null,
    end: null,
    badge: "🌿",
  },
  {
    id: "ch_music",
    name: "Indie Music Week",
    start: null,
    end: null,
    badge: "🎵",
  },
];
export const DEFAULT_LEADERBOARD = Array.from({ length: 10 }, (_, i) => ({
  rank: i + 1,
  user: `Backer ${i + 1}`,
  points: 2000 - i * 83,
}));

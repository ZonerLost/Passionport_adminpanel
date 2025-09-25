const rnd = (min, max) => Math.round(min + Math.random() * (max - min));
const spark = (len = 14, base = 1000, vol = 200) =>
  Array.from({ length: len }, (_, i) => ({
    x: i,
    y: base + Math.round((Math.random() - 0.5) * vol),
  }));

export const mockExec = () => ({
  dau: rnd(4200, 6500),
  wau: rnd(25000, 34000),
  mau: rnd(120000, 150000),
  newFans: rnd(120, 280),
  newBrands: rnd(8, 24),
  approvalsPending: rnd(6, 18),
  activeCampaigns: rnd(40, 65),
  amountRaisedToday: rnd(18000, 42000),
  amountRaised7d: rnd(180000, 350000),
  amountRaised30d: rnd(900000, 1600000),
  orders: rnd(800, 1400),
  refunds: rnd(8, 26),
  series: {
    dau: spark(14, 5200, 700),
    amount: spark(14, 26000, 6000),
  },
});

export const mockRevenue = () => ({
  byMethod: [
    { method: "Stripe", gross: 720000, pct: 62 },
    { method: "PayPal", gross: 260000, pct: 22 },
    { method: "Apple Pay", gross: 120000, pct: 10 },
    { method: "Google Pay", gross: 60000, pct: 6 },
  ],
  pendingPayouts: rnd(60, 140),
  disputesOpen: rnd(3, 12),
});

export const mockTrustSafety = () => ({
  flagged: { posts: rnd(10, 28), stories: rnd(4, 14), reviews: rnd(2, 10) },
  blockedUsers: rnd(2, 10),
  banAppeals: rnd(0, 6),
  avgResolutionHrs: Math.round(6 + Math.random() * 10) / 1,
  topQueues: [
    {
      label: "Camp. Approvals",
      count: rnd(6, 18),
      href: "/content?tab=approvals",
    },
    { label: "Flagged Posts", count: rnd(10, 28), href: "/content?tab=flags" },
    {
      label: "Refunds",
      count: rnd(3, 12),
      href: "/support-settings?tab=refunds",
    },
  ],
});

export const mockSystem = () => ({
  apiErrorRate: Math.round(Math.random() * 0.8 * 100) / 100, // %
  p95LatencyMs: rnd(180, 520),
  jobsBacklog: rnd(0, 35),
  notifSuccessPct: Math.round(96 + Math.random() * 3 * 100) / 100,
  lastDeploy: new Date(Date.now() - 1000 * 60 * 60 * rnd(4, 48)).toISOString(),
});

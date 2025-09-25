export const mapExec = (raw) => ({
  dau: raw.dau,
  wau: raw.wau,
  mau: raw.mau,
  newFans: raw.newFans,
  newBrands: raw.newBrands,
  approvalsPending: raw.approvalsPending,
  activeCampaigns: raw.activeCampaigns,
  amountRaisedToday: raw.amountRaisedToday,
  amountRaised7d: raw.amountRaised7d,
  amountRaised30d: raw.amountRaised30d,
  orders: raw.orders,
  refunds: raw.refunds,
  series: raw.series,
});

export const mapRevenue = (raw) => ({
  byMethod: raw.byMethod,
  pendingPayouts: raw.pendingPayouts,
  disputesOpen: raw.disputesOpen,
});

export const mapTrustSafety = (raw) => ({
  flagged: raw.flagged,
  blockedUsers: raw.blockedUsers,
  banAppeals: raw.banAppeals,
  avgResolutionHrs: raw.avgResolutionHrs,
  topQueues: raw.topQueues,
});

export const mapSystem = (raw) => ({
  apiErrorRate: raw.apiErrorRate,
  p95LatencyMs: raw.p95LatencyMs,
  jobsBacklog: raw.jobsBacklog,
  notifSuccessPct: raw.notifSuccessPct,
  lastDeploy: raw.lastDeploy,
});

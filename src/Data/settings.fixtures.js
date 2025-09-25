export const DEFAULT_SETTINGS = {
  branding: { appName: "PassionPort", primary: "#6E56CF" },
  legal: { tosVersion: "1.2.0", privacyVersion: "1.1.0" },
  moderation: {
    riskFlags: ["nsfw", "spam"],
    autoBanThreshold: 5,
    linkSafety: "strict",
  },
  backup: { retentionDays: 365 },
  feedWeights: { recency: 0.4, engagement: 0.4, affinity: 0.2 },
};
export const DEFAULT_ACCESS = {
  apiKeys: [
    { id: "k_live_1", label: "Admin Console", lastRotated: "2025-07-12" },
  ],
  webhooks: [
    {
      id: "wh_1",
      url: "https://example.com/webhooks/payload",
      events: ["payment.succeeded", "campaign.approved"],
    },
  ],
  sso: { enabled: false, issuer: "", clientId: "", audience: "" },
  auditLogs: Array.from({ length: 24 }, (_, i) => ({
    id: `a_${i + 1}`,
    ts: new Date(Date.now() - i * 3600e3).toISOString(),
    actor: "admin@pp.co",

    action: "settings.update",
    target: "feedWeights",
    meta: "recency=0.4",
  })),
};
export const DEFAULT_PRIVACY = {
  dsrSlaHours: 72,
  exportQueue: [{ id: "d_1", user: "user12@mail.test", status: "pending" }],
  deleteQueue: [{ id: "e_1", user: "user44@mail.test", status: "queued" }],
  dataWindows: { exportsDays: 30, deletionsDays: 30 },
};

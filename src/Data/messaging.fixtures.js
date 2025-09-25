const rnd = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const EVENTS = [
  "follow",
  "like",
  "backer_thank_you",
  "order_update",
  "live_stream",
];
export const CHANNELS = ["push", "email", "inapp"];
export const LOCATIONS = ["home_hero", "explore_hero", "help_center", "policy"];
export const ROLES = [
  "Fan",
  "Brand",
  "Admin",
  "Support",
  "Finance",
  "Moderator",
];
export const BADGES = ["Bronze", "Silver", "Gold", "Platinum"];

function mkTemplate(i, category = "general") {
  const variants = ["A", "B"].map((n) => ({
    id: `var_${i}_${n}`,
    name: n,
    subject: `{{user_name}} ${n} – {{campaign_name}} update`,
    body: `Hello {{user_name}}, thanks for supporting {{campaign_name}}. Variant ${n}.`,
    enabled: n === "A",
  }));
  return {
    id: `tpl_${i}`,
    name: `Template ${i}`,
    event: pick(EVENTS),
    channels: {
      push: Math.random() < 0.8,
      email: Math.random() < 0.8,
      inapp: Math.random() < 0.8,
    },
    category,
    throttlePerUserPerHr: pick([1, 2, 3]),
    versions: [{ version: 1, at: new Date().toISOString(), variants }],
    currentVersion: 1,
    updatedAt: new Date(Date.now() - rnd(0, 15) * 864e5).toISOString(),
  };
}

function mkAnnouncement(i) {
  const now = Date.now();
  const start = new Date(now + rnd(-3, 3) * 864e5).toISOString();
  const end = new Date(now + rnd(2, 10) * 864e5).toISOString();
  const status =
    new Date(end) < new Date()
      ? "expired"
      : new Date(start) > new Date()
      ? "scheduled"
      : "active";
  return {
    id: `ann_${i}`,
    title: `Announcement ${i}`,
    content: `We are launching something great. (id ${i})`,
    type: pick(["banner", "maintenance"]),
    startAt: start,
    endAt: end,
    segments: ["seg_1"],
    status,
    priority: pick([1, 2, 3]),
  };
}

function mkSegment(i) {
  return {
    id: `seg_${i}`,
    name: `Segment ${i}`,
    rules: {
      role: [pick(ROLES)],
      country: [pick(["US", "UK", "DE", "PK", "AE"])],
      badges: [pick(BADGES)],
      activity: { lastNDays: pick([7, 14, 30]), minActions: pick([1, 3, 5]) },
    },
    sizeEstimate: rnd(200, 50000),
  };
}

function mkCMS(i) {
  return {
    id: `cms_${i}`,
    key: `block_${i}`,
    title: `Block ${i}`,
    location: pick(LOCATIONS),
    content: `<h3>Hero ${i}</h3><p>Rich HTML goes here.</p>`,
    status: pick(["draft", "published"]),
    updatedAt: new Date(Date.now() - rnd(0, 20) * 864e5).toISOString(),
  };
}

function mkLog(i) {
  return {
    id: `log_${i}`,
    templateId: `tpl_${rnd(1, 10)}`,
    channel: pick(["push", "email", "inapp"]),
    user: `user${rnd(1, 100)}@mail.test`,
    status: pick(["sent", "bounced", "unsubscribed", "rate_limited", "failed"]),
    ts: new Date(Date.now() - rnd(0, 7) * 864e5).toISOString(),
    meta: { segment: `seg_${pick([1, 2, 3])}` },
  };
}

export function makeFixtures() {
  return {
    templates: [
      ...Array.from({ length: 8 }, (_, i) => mkTemplate(i + 1, "general")),
      ...Array.from({ length: 4 }, (_, i) => mkTemplate(i + 9, "loyalty")),
    ],
    announcements: Array.from({ length: 6 }, (_, i) => mkAnnouncement(i + 1)),
    segments: Array.from({ length: 4 }, (_, i) => mkSegment(i + 1)),
    cms: Array.from({ length: 8 }, (_, i) => mkCMS(i + 1)),
    logs: Array.from({ length: 120 }, (_, i) => mkLog(i + 1)),
  };
}

const rnd = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const USERS = Array.from({ length: 20 }, (_, i) => ({
  id: `u_${i + 1}`,
  handle: `user${i + 1}`,
  type: pick(["Fan", "Brand"]),
}));

const sampleText = [
  "Check this out at https://example.com great deal!",
  "DM me at user@mail.test",
  "This is spam!!! $$$",
  "Legit question about shipping times",
  "Call me +1 (555) 123-4567",
  "Amazing project!",
];

function mkContent(i) {
  const type = pick(["post", "story", "comment"]);
  const author = pick(USERS);
  const text = pick(sampleText);
  const nudityScore = Math.random();
  const linkRisk = Math.random();
  const flagged =
    nudityScore > 0.85 || linkRisk > 0.8 || /spam|\$\$\$/i.test(text);
  return {
    id: `ct_${i}`,
    type,
    author: author.handle,
    brand: author.type === "Brand" ? author.handle : `Brand ${rnd(1, 10)}`,
    createdAt: new Date(Date.now() - rnd(0, 20) * 864e5).toISOString(),
    text,
    media:
      Math.random() < 0.4 ? [{ type: "image", url: "#", nudityScore }] : [],
    linkRisk,
    flagged,
    popularity: rnd(0, 5000),
  };
}

function mkReport(i) {
  const contentId = `ct_${rnd(1, 60)}`;
  const severity = pick(["low", "medium", "high"]);
  const type = pick(["post", "story", "review", "comment", "club"]);
  const reasons = pick(["spam", "harassment", "nsfw", "misinfo", "scam"]);
  return {
    id: `rp_${i}`,
    contentId,
    type,
    severity,
    reporterCount: rnd(1, 23),
    keywordHits:
      reasons === "spam" ? ["spam", "$$$"] : reasons === "nsfw" ? ["nsfw"] : [],
    createdAt: new Date(Date.now() - rnd(0, 10) * 864e5).toISOString(),
    notes: "",
  };
}

function mkReview(i) {
  return {
    id: `rv_${i}`,
    contentId: `ct_${rnd(1, 60)}`,
    campaign: `Campaign ${rnd(1, 20)}`,
    author: `user${rnd(1, 20)}`,
    stars: rnd(1, 5),
    backerOnly: true,
    text: pick(sampleText),
    suspectedBrigade: Math.random() < 0.2,
  };
}

function mkClub(i) {
  const owners = Array.from(
    { length: rnd(1, 2) },
    (_, k) => `owner${i}_${k + 1}`
  );
  const mods = Array.from({ length: rnd(1, 3) }, (_, k) => `mod${i}_${k + 1}`);
  const members = rnd(20, 2400);
  const heat = Array.from({ length: 28 }, () => rnd(0, 60)); // 4 weeks
  return {
    id: `cl_${i}`,
    name: `Club ${i}`,
    createdAt: new Date(Date.now() - rnd(5, 120) * 864e5).toISOString(),
    owners,
    mods,
    members,
    pending: Math.random() < 0.3,
    heat,
  };
}

function mkChatGroup(i) {
  return {
    id: `cg_${i}`,
    name: `Campaign ${rnd(1, 30)} Chat`,
    members: rnd(12, 1200),
    messages24h: rnd(40, 12000),
    spamIndicators: {
      duplicateRate: Math.random(),
      linkShareRate: Math.random(),
      newMemberSpike: Math.random(),
      abuseScore: Math.random(),
    },
    retentionPolicy: "metadata-only",
  };
}

export function makeFixtures() {
  return {
    contents: Array.from({ length: 60 }, (_, i) => mkContent(i + 1)),
    reports: Array.from({ length: 36 }, (_, i) => mkReport(i + 1)),
    reviews: Array.from({ length: 22 }, (_, i) => mkReview(i + 1)),
    clubs: Array.from({ length: 16 }, (_, i) => mkClub(i + 1)),
    chats: Array.from({ length: 10 }, (_, i) => mkChatGroup(i + 1)),
  };
}

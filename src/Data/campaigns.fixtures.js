const STATUSES = ["pending", "live", "paused", "rejected", "completed"];
const rnd = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const mkTier = (i) => ({
  id: `rw_${i}`,
  name: `Reward ${i}`,
  min: rnd(10, 200),
  limit: [null, rnd(20, 200)][rnd(0, 1)],
  perks: ["sticker", "tee", "hoodie", "meet & greet"][rnd(0, 3)],
});
const mkFaq = (i) => ({ q: `FAQ ${i}?`, a: `Answer ${i} lorem ipsum.` });
const mkMember = (i) => ({
  id: `tm_${i}`,
  name: `Member ${i}`,
  role: ["Lead", "Ops", "Marketing"][rnd(0, 2)],
});
const mkUpdate = (i) => ({
  id: `up_${i}`,
  kind: ["update", "story"][rnd(0, 1)],
  title: `Update ${i}`,
  scheduledAt:
    Math.random() < 0.3
      ? new Date(Date.now() + rnd(1, 7) * 864e5).toISOString()
      : null,
  pendingApproval: Math.random() < 0.5,
  version: rnd(1, 6),
  backerOnly: Math.random() < 0.4,
});
const mkTestimonial = (i) => ({
  id: `t_${i}`,
  user: `User ${i}`,
  text: `I love this! ${i}`,
  approved: Math.random() < 0.6,
  pinned: Math.random() < 0.2,
});

export function makeCampaigns(n = 40) {
  return Array.from({ length: n }, (_, i) => {
    const status = pick(STATUSES);
    const start = new Date(Date.now() - rnd(1, 50) * 864e5);
    const end = new Date(start.getTime() + rnd(10, 35) * 864e5);
    const goal = rnd(5000, 150000);
    const raised =
      status === "live"
        ? rnd(1000, goal)
        : status === "completed"
        ? rnd(goal * 0.6, goal * 1.1)
        : rnd(0, goal * 0.2);
    return {
      id: `c_${i + 1}`,
      title: `Campaign ${i + 1}`,
      brand: `Brand ${rnd(1, 20)}`,
      status,
      goal,
      raised,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      approvalsSLAHours: rnd(4, 48),
      assignedTo: Math.random() < 0.5 ? `mod_${rnd(1, 6)}` : null,
      story: `Long-form campaign story for ${i + 1}...`,
      media: [{ type: "image", url: "#" }],
      tiers: Array.from({ length: rnd(2, 5) }, (_, j) => mkTier(j + 1)),
      linkedProducts: rnd(0, 10),
      faqs: Array.from({ length: rnd(1, 4) }, (_, j) => mkFaq(j + 1)),
      team: Array.from({ length: rnd(1, 4) }, (_, j) => mkMember(j + 1)),
      updates: Array.from({ length: rnd(2, 7) }, (_, j) => mkUpdate(j + 1)),
      testimonials: Array.from({ length: rnd(1, 6) }, (_, j) =>
        mkTestimonial(j + 1)
      ),
      reports: rnd(0, 8),
    };
  });
}

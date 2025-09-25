const rnd = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
export function makeFunnel() {
  const visit = rnd(80000, 120000);
  const follow = rnd(12000, 24000);
  const back = rnd(4000, 9000);
  const purchase = rnd(2500, 7000);
  return [
    { stage: "Visit", value: visit },
    { stage: "Follow", value: follow },
    { stage: "Back", value: back },
    { stage: "Purchase", value: purchase },
  ];
}
export function makeCohorts() {
  return Array.from({ length: 6 }, (_, i) => ({
    cohort: `M-${i + 1}`,
    m1: rnd(25, 45),
    m2: rnd(18, 35),
    m3: rnd(12, 28),
    m4: rnd(8, 20),
  }));
}
export function makeCreatorPerf() {
  return Array.from({ length: 8 }, (_, i) => ({
    brand: `Brand ${i + 1}`,
    campaigns: rnd(1, 3),
    raised: rnd(15000, 120000),
    ctr: (Math.random() * 6 + 1).toFixed(1) + "%",
  }));
}
export function makeClubs() {
  return Array.from({ length: 6 }, (_, i) => ({
    club: `Club ${i + 1}`,
    members: rnd(120, 2200),
    posts: rnd(40, 360),
    act: (Math.random() * 45 + 20).toFixed(1) + "%",
  }));
}
export function makeSearch() {
  return {
    topQueries: Array.from({ length: 8 }, (_, i) => ({
      q: `query ${i + 1}`,
      count: rnd(400, 5800),
    })),
    zeroResults: Array.from({ length: 5 }, (_, i) => ({
      q: `miss ${i + 1}`,
      count: rnd(20, 240),
    })),
    trendingTags: Array.from({ length: 6 }, (_, i) => ({
      tag: `#tag${i + 1}`,
      lift: (Math.random() * 140 + 20).toFixed(0) + "%",
    })),
  };
}

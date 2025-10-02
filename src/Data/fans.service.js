// In-memory fixtures + simple filters/pagination for a basic version

const rnd = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function mkFan(i) {
  const verified = Math.random() < 0.6;
  const status = pick(["active", "active", "active", "suspended", "banned"]);
  return {
    id: `fan_${i}`,
    name: `Fan ${i}`,
    handle: `fan${i}`,
    email: `fan${i}@mail.test`,
    joinedAt: new Date(Date.now() - rnd(10, 800) * 864e5).toISOString(),
    verified,
    status,
    lastActiveAt: new Date(Date.now() - rnd(0, 20) * 864e5).toISOString(),
    country: pick(["US", "UK", "DE", "PK", "AE"]),
  };
}

function mkPost(i) {
  return {
    id: `post_${i}`,
    title: `Post ${i} title`,
    createdAt: new Date(Date.now() - rnd(0, 120) * 864e5).toISOString(),
  };
}
function mkBacked(i) {
  return {
    id: `camp_${i}`,
    title: `Campaign ${i}`,
    amount: rnd(5, 200),
    date: new Date(Date.now() - rnd(0, 120) * 864e5).toISOString(),
  };
}
function mkOrder(i) {
  return {
    id: `ord_${i}`,
    total: rnd(10, 300),
    status: pick(["paid", "processing", "shipped", "refunded"]),
    date: new Date(Date.now() - rnd(0, 120) * 864e5).toISOString(),
  };
}

let FANS = Array.from({ length: 120 }, (_, i) => mkFan(i + 1));

const filterQuery = (rows, q, fields) => {
  const n = (q || "").toLowerCase();
  if (!n) return rows;
  return rows.filter((r) =>
    fields.some((f) =>
      String(r[f] || "")
        .toLowerCase()
        .includes(n)
    )
  );
};
const paginate = (rows, page, pageSize) => {
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { total, page, pageSize, rows: rows.slice(start, end) };
};

export async function fetchFans({
  query = "",
  status = "all",
  verification = "all",
  page = 1,
  pageSize = 12,
}) {
  let rows = FANS.slice();

  // status
  if (status !== "all") {
    if (status === "active") rows = rows.filter((r) => r.status === "active");
    else rows = rows.filter((r) => r.status !== "active");
  }

  // verified
  if (verification !== "all") {
    rows = rows.filter((r) =>
      verification === "verified" ? r.verified : !r.verified
    );
  }

  // query
  rows = filterQuery(rows, query, ["name", "email", "handle"]);
  rows = rows.sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt));

  return paginate(rows, page, pageSize);
}

export async function getFanDetail(id) {
  const user = FANS.find((f) => f.id === id);
  if (!user) return null;

  const posts = Array.from({ length: rnd(0, 6) }, (_, i) => mkPost(i + 1));
  const backed = Array.from({ length: rnd(0, 5) }, (_, i) => mkBacked(i + 1));
  const orders = Array.from({ length: rnd(0, 6) }, (_, i) => mkOrder(i + 1));
  const activity = {
    sessions: Array.from({ length: rnd(1, 4) }, () => ({
      ip: `${rnd(10, 250)}.${rnd(10, 250)}.${rnd(10, 250)}.${rnd(10, 250)}`,
      device: pick(["iOS", "Android", "Web"]),
      lastSeen: new Date(Date.now() - rnd(0, 15) * 864e5).toISOString(),
    })),
    strikes:
      Math.random() < 0.3
        ? [{ reason: "abuse", date: new Date().toISOString() }]
        : [],
    reports: Math.random() < 0.3 ? [{ type: "spam", count: rnd(1, 3) }] : [],
  };

  return { user, posts, backed, orders, activity };
}

export async function suspendFan(id, days = 7) {
  FANS = FANS.map((f) =>
    f.id === id ? { ...f, status: "suspended", suspendedForDays: days } : f
  );
  return { ok: true };
}
export async function banFan(id, reason = "policy_violation") {
  FANS = FANS.map((f) =>
    f.id === id ? { ...f, status: "banned", banReason: reason } : f
  );
  return { ok: true };
}
export async function deleteFan(id) {
  FANS = FANS.filter((f) => f.id !== id);
  return { ok: true };
}
export async function reset2FA() {
  return { ok: true };
}
export async function resetPassword() {
  return { ok: true };
}
export async function exportGDPR(id) {
  const detail = await getFanDetail(id);
  return new Blob([JSON.stringify(detail, null, 2)], {
    type: "application/json",
  });
}

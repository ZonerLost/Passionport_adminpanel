import { makeFixtures, BRANDS_FIXTURE } from "./catalog.fixtures";

let DB = makeFixtures();

function filterQuery(rows, q, fields) {
  const n = (q || "").toLowerCase();
  if (!n) return rows;
  return rows.filter((r) =>
    fields.some((f) =>
      String(r[f] || "")
        .toLowerCase()
        .includes(n)
    )
  );
}

// ——— Products
export async function fetchProducts({
  query = "",
  brand = "all",
  status = "all",
  linked = "all",
  page = 1,
  pageSize = 10,
}) {
  let rows = DB.products;
  if (brand !== "all") rows = rows.filter((p) => p.brand === brand);
  if (status !== "all") rows = rows.filter((p) => p.status === status);
  if (linked !== "all")
    rows = rows.filter((p) =>
      linked === "linked" ? !!p.linkedCampaign : !p.linkedCampaign
    );
  rows = filterQuery(rows, query, [
    "name",
    "brand",
    "linkedCampaign",
    "seo.slug",
  ]);
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { total, page, pageSize, rows: rows.slice(start, end) };
}

export async function getProduct(id) {
  return DB.products.find((p) => p.id === id) || null;
}

export async function updateProductStatus(id, status) {
  DB.products = DB.products.map((p) => (p.id === id ? { ...p, status } : p));
  return { ok: true };
}

export async function freezeProduct(id, reason) {
  DB.products = DB.products.map((p) =>
    p.id === id
      ? { ...p, status: "paused", freezeReason: reason || "policy-breach" }
      : p
  );
  return { ok: true };
}

export async function bulkUpdateProducts({
  ids = [],
  priceDelta = 0,
  stockDelta = 0,
  newStatus,
}) {
  DB.products = DB.products.map((p) =>
    ids.includes(p.id)
      ? {
          ...p,
          price: Math.max(1, p.price + priceDelta),
          stock: Math.max(0, p.stock + stockDelta),
          status: newStatus || p.status,
          lastPriceChange: new Date().toISOString(),
        }
      : p
  );
  return { ok: true };
}

// CSV export helpers
function toCSV(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(headers.map((h) => JSON.stringify(r[h] ?? "")).join(","));
  }
  return lines.join("\n");
}

export async function exportCatalogCSV() {
  const rows = DB.products.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    status: p.status,
    price: p.price,
    stock: p.stock,
    linkedCampaign: p.linkedCampaign || "",
    avgRating: p.reviews.avg,
    reviews: p.reviews.count,
  }));
  return new Blob([toCSV(rows)], { type: "text/csv" });
}

export async function exportOrdersCSV() {
  const rows = DB.orders.map((o) => ({
    id: o.id,
    date: o.date,
    status: o.status,
    buyer: o.buyer,
    brand: o.brand,
    total: o.total,
    items: o.items.length,
  }));
  return new Blob([toCSV(rows)], { type: "text/csv" });
}

// ——— Orders
export async function fetchOrders({
  query = "",
  status = "all",
  page = 1,
  pageSize = 10,
}) {
  let rows = DB.orders;
  if (status !== "all") rows = rows.filter((o) => o.status === status);
  rows = filterQuery(rows, query, ["id", "buyer", "brand"]);
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { total, page, pageSize, rows: rows.slice(start, end) };
}

export async function getOrder(id) {
  return DB.orders.find((o) => o.id === id) || null;
}

export async function updateOrderStatus(id, status) {
  DB.orders = DB.orders.map((o) => (o.id === id ? { ...o, status } : o));
  return { ok: true };
}

export async function refundOrderItem(orderId, itemId, { amount, reason }) {
  DB.orders = DB.orders.map((o) => {
    if (o.id !== orderId) return o;
    const item = o.items.find((i) => i.id === itemId);
    if (!item) return o;
    const refunded = Math.min(amount, item.qty * item.price);
    return {
      ...o,
      status: "refunded",
      refund: {
        itemId,
        amount: refunded,
        reason,
        at: new Date().toISOString(),
      },
    };
  });
  return { ok: true };
}

export async function markShipped(orderId, { carrier, tracking, eta }) {
  DB.orders = DB.orders.map((o) =>
    o.id === orderId
      ? { ...o, status: "shipped", shipment: { carrier, tracking, eta } }
      : o
  );
  return { ok: true };
}

export async function reship(orderId, itemId) {
  // noop stub
  return { ok: true };
}

export async function contact(orderId, who) {
  // who: 'buyer'|'brand' — stub to open helpdesk ticket
  return { ok: true };
}

// ——— Discounts / Perks
export async function fetchDiscounts() {
  return DB.discounts;
}

export async function saveDiscount(d) {
  if (d.id) {
    DB.discounts = DB.discounts.map((x) =>
      x.id === d.id ? { ...x, ...d } : x
    );
  } else {
    const nd = { ...d, id: `d_${Date.now()}` };
    DB.discounts = [nd, ...DB.discounts];
  }
  return { ok: true };
}

export async function deleteDiscount(id) {
  DB.discounts = DB.discounts.filter((x) => x.id !== id);
  return { ok: true };
}

export async function brands() {
  return BRANDS_FIXTURE;
}

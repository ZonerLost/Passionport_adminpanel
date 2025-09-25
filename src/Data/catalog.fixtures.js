const rnd = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const BRANDS = Array.from({ length: 8 }, (_, i) => `Brand ${i + 1}`);
const STATUSES = ["draft", "live", "paused"];

function mkVariant(i, basePrice) {
  const d = rnd(-10, 20);
  return {
    id: `v_${i}_${rnd(100, 999)}`,
    name: pick(["S", "M", "L", "XL", "Default"]),
    sku: `SKU-${rnd(10000, 99999)}`,
    price: Math.max(2, basePrice + d),
    stock: rnd(0, 140),
  };
}

function mkProduct(i) {
  const brand = pick(BRANDS);
  const price = rnd(10, 199);
  const variants = Array.from({ length: pick([1, 2, 3]) }, (_, k) =>
    mkVariant(i * 10 + k + 1, price)
  );
  const stock = variants.reduce((a, b) => a + b.stock, 0);
  const status = pick(STATUSES);
  const linkedCampaign = Math.random() < 0.45 ? `Campaign ${rnd(1, 20)}` : null;
  return {
    id: `p_${i}`,
    name: `Product ${i}`,
    brand,
    status,
    price,
    stock,
    lastPriceChange: new Date(Date.now() - rnd(0, 25) * 864e5).toISOString(),
    linkedCampaign,
    variants,
    seo: { slug: `product-${i}`, meta: "Great product" },
    reviews: { avg: (Math.random() * 4 + 1).toFixed(1), count: rnd(0, 320) },
    policy: { linkRisk: Math.random(), imageNudity: Math.random() },
  };
}

function mkOrder(i) {
  const status = pick(["paid", "processing", "shipped", "refunded"]);
  const itemCount = pick([1, 2, 3]);
  const items = Array.from({ length: itemCount }, () => {
    const pid = rnd(1, 30);
    return {
      id: `oi_${i}_${pid}`,
      productId: `p_${pid}`,
      name: `Product ${pid}`,
      qty: rnd(1, 3),
      price: rnd(8, 180),
    };
  });
  const total = items.reduce((a, b) => a + b.qty * b.price, 0);
  return {
    id: `o_${i}`,
    date: new Date(Date.now() - rnd(0, 20) * 864e5).toISOString(),
    status,
    buyer: `user${rnd(1, 60)}@mail.test`,
    brand: pick(BRANDS),
    total,
    items,
    shipment:
      status === "shipped"
        ? {
            carrier: pick(["DHL", "UPS", "USPS"]),
            tracking: `TRK${rnd(100000, 999999)}`,
            eta: new Date(Date.now() + rnd(1, 7) * 864e5).toISOString(),
          }
        : null,
    messagesCount: rnd(0, 6),
  };
}

function mkDiscount(i) {
  const type = pick(["percent", "amount"]);
  const value =
    type === "percent" ? pick([5, 10, 15, 20, 25, 30]) : pick([5, 10, 15]);
  const tiers = ["Bronze", "Silver", "Gold", "Platinum"];
  return {
    id: `d_${i}`,
    code: `SAVE${rnd(100, 999)}`,
    type,
    value,
    appliesTo: pick(["all", "brand", "product"]),
    target: null, // fill if brand/product
    allowedTiers: tiers.slice(0, rnd(1, 4)),
    activeFrom: new Date(Date.now() - rnd(0, 5) * 864e5).toISOString(),
    activeTo: new Date(Date.now() + rnd(5, 20) * 864e5).toISOString(),
    active: Math.random() < 0.85,
  };
}

export function makeFixtures() {
  return {
    products: Array.from({ length: 30 }, (_, i) => mkProduct(i + 1)),
    orders: Array.from({ length: 24 }, (_, i) => mkOrder(i + 1)),
    discounts: Array.from({ length: 8 }, (_, i) => mkDiscount(i + 1)),
  };
}

export const BRANDS_FIXTURE = BRANDS;

// Simple in-memory fixtures + CRUD for a basic version
const rnd = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function mkBrand(i) {
  const kyc = pick(["approved", "pending", "rejected"]);
  return {
    id: `brand_${i}`,
    name: `Brand ${i}`,
    owner: {
      id: `owner_${i}`,
      name: `Owner ${i}`,
      email: `owner${i}@mail.test`,
    },
    campaignsCount: rnd(0, 5),
    verified: kyc === "approved",
    kycStatus: kyc,
  };
}
function mkDoc(t) {
  return {
    id: `doc_${Math.random().toString(36).slice(2, 8)}`,
    type: t,
    uploadedAt: new Date(Date.now() - rnd(0, 10) * 864e5).toISOString(),
  };
}
function mkCampaign(i) {
  return {
    id: `camp_${i}_${Math.random().toString(36).slice(2, 6)}`,
    title: `Campaign ${i}`,
    goal: rnd(1000, 20000),
    status: pick(["pending", "live", "paused", "completed"]),
  };
}
function mkProd(i) {
  return {
    id: `prod_${i}_${Math.random().toString(36).slice(2, 6)}`,
    name: `Product ${i}`,
    price: rnd(10, 200),
  };
}
function mkPost(i) {
  return {
    id: `post_${i}`,
    title: `Post ${i}`,
    createdAt: new Date(Date.now() - rnd(0, 60) * 864e5).toISOString(),
  };
}

let BRANDS = Array.from({ length: 80 }, (_, i) => mkBrand(i + 1));

const filterQuery = (rows, q, fields) => {
  const s = (q || "").toLowerCase();
  if (!s) return rows;
  return rows.filter((r) =>
    fields.some((f) =>
      String(
        f.includes(".") ? f.split(".").reduce((o, k) => o?.[k], r) : r[f] || ""
      )
        .toLowerCase()
        .includes(s)
    )
  );
};
const paginate = (rows, page, pageSize) => ({
  total: rows.length,
  page,
  pageSize,
  rows: rows.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
});

export async function fetchBrands({
  query = "",
  kyc = "all",
  page = 1,
  pageSize = 12,
}) {
  let rows = BRANDS.slice();
  if (kyc !== "all") rows = rows.filter((b) => b.kycStatus === kyc);
  rows = filterQuery(rows, query, ["name", "owner.name", "owner.email"]);
  rows = rows.sort((a, b) => a.name.localeCompare(b.name));
  return paginate(rows, page, pageSize);
}

export async function getBrandDetail(id) {
  const brand = BRANDS.find((b) => b.id === id);
  if (!brand) return null;
  const documents = [mkDoc("passport"), mkDoc("business_license")];
  const business = {
    country: pick(["US", "UK", "DE", "PK", "AE"]),
    regNo: `REG-${rnd(10000, 99999)}`,
    taxId: `TAX-${rnd(1000, 9999)}`,
  };
  const posts = Array.from({ length: rnd(0, 6) }, (_, i) => mkPost(i + 1));
  const campaigns = Array.from({ length: brand.campaignsCount }, (_, i) =>
    mkCampaign(i + 1)
  );
  const productsAdded = Array.from({ length: rnd(0, 5) }, (_, i) =>
    mkProd(i + 1)
  );
  const productsBought = Array.from({ length: rnd(0, 5) }, (_, i) =>
    mkProd(i + 1)
  );
  const audit = Array.from({ length: rnd(2, 6) }, () => ({
    action: pick([
      "kyc_upload",
      "kyc_review",
      "campaign_added",
      "campaign_removed",
      "status_update",
    ]),
    ts: new Date(Date.now() - rnd(1, 25) * 864e5).toISOString(),
  }));
  return {
    brand,
    documents,
    business,
    posts,
    campaigns,
    productsAdded,
    productsBought,
    audit,
  };
}

export async function approveBrand(id) {
  BRANDS = BRANDS.map((b) =>
    b.id === id ? { ...b, kycStatus: "approved", verified: true } : b
  );
  return { ok: true };
}
export async function rejectBrand(id, reason = "insufficient_documents") {
  BRANDS = BRANDS.map((b) =>
    b.id === id
      ? { ...b, kycStatus: "rejected", verified: false, rejectReason: reason }
      : b
  );
  return { ok: true };
}
export async function suspendBrand(id, days = 7) {
  BRANDS = BRANDS.map((b) =>
    b.id === id ? { ...b, suspendedForDays: days } : b
  );
  return { ok: true };
}
export async function addCampaign(brandId, title) {
  const b = BRANDS.find((x) => x.id === brandId);
  if (b) b.campaignsCount += 1;
  return { ok: true, title };
}
export async function removeCampaign(brandId, cid) {
  const b = BRANDS.find((x) => x.id === brandId);
  if (b && b.campaignsCount > 0) b.campaignsCount -= 1;
  return { ok: true, cid };
}

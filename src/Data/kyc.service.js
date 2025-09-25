import { makeKyc } from "./kyc.fixtures";
let KYC = makeKyc();

export async function fetchKycQueue({
  status = "all",
  page = 1,
  pageSize = 10,
}) {
  let rows = KYC;
  if (status !== "all") rows = rows.filter((k) => k.status === status);
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { total, page, pageSize, rows: rows.slice(start, end) };
}
export async function approveKyc(id, note) {
  KYC = KYC.map((k) =>
    k.id === id ? { ...k, status: "approved", notes: note || k.notes } : k
  );
  return { ok: true };
}
export async function rejectKyc(id, note) {
  KYC = KYC.map((k) =>
    k.id === id ? { ...k, status: "rejected", notes: note || k.notes } : k
  );
  return { ok: true };
}
export async function requestMoreDocs(id, note) {
  KYC = KYC.map((k) => (k.id === id ? { ...k, notes: note || k.notes } : k));
  return { ok: true };
}

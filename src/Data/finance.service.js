import { makeFixtures } from "./finance.fixtures";

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

function paginate(rows, page, pageSize) {
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { total, page, pageSize, rows: rows.slice(start, end) };
}

// ---- Ledger
export async function fetchTransactions({
  query = "",
  method = "all",
  type = "all",
  status = "all",
  page = 1,
  pageSize = 12,
}) {
  let rows = DB.txns;
  if (method !== "all") rows = rows.filter((t) => t.method === method);
  if (type !== "all") rows = rows.filter((t) => t.type === type);
  if (status !== "all") rows = rows.filter((t) => t.status === status);
  rows = filterQuery(rows, query, ["id", "brand", "user", "metadata.campaign"]);
  rows = rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return paginate(rows, page, pageSize);
}

export async function getTransaction(id) {
  return DB.txns.find((t) => t.id === id) || null;
}
export async function exportTransactionsCSV() {
  const headers = [
    "id",
    "method",
    "type",
    "status",
    "brand",
    "user",
    "amount",
    "currency",
    "createdAt",
    "campaign",
  ];
  const lines = [headers.join(",")];
  for (const t of DB.txns) {
    lines.push(
      [
        t.id,
        t.method,
        t.type,
        t.status,
        t.brand,
        t.user,
        t.amount,
        t.currency,
        t.createdAt,
        t.metadata.campaign || "",
      ]
        .map((x) => JSON.stringify(x ?? ""))
        .join(",")
    );
  }
  return new Blob([lines.join("\n")], { type: "text/csv" });
}

export async function initiateRefund(txnId, reason = "policy_violation") {
  DB.txns = [
    {
      id: `tx_${Date.now()}`,
      method: "Stripe",
      type: "refund",
      status: "succeeded",
      brand: "—",
      user: "—",
      amount: -10,
      currency: "USD",
      createdAt: new Date().toISOString(),
      metadata: {},
    },
    ...DB.txns,
  ];
  return { ok: true, reason, txnId };
}

// ---- Payouts
export async function fetchPayouts({
  query = "",
  kyc = "all",
  page = 1,
  pageSize = 10,
}) {
  let rows = DB.payouts;
  if (kyc !== "all") rows = rows.filter((p) => p.kycStatus === kyc);
  rows = filterQuery(rows, query, ["brand", "bank.name"]);
  return paginate(rows, page, pageSize);
}
export async function getPayout(id) {
  return DB.payouts.find((p) => p.id === id) || null;
}
export async function putHold(brand, amount, note) {
  DB.payouts = DB.payouts.map((p) =>
    p.brand === brand
      ? { ...p, holds: Math.max(0, p.holds + Number(amount || 0)) }
      : p
  );
  return { ok: true, note };
}
export async function releaseHold(brand, amount) {
  DB.payouts = DB.payouts.map((p) =>
    p.brand === brand
      ? { ...p, holds: Math.max(0, p.holds - Number(amount || 0)) }
      : p
  );
  return { ok: true };
}
export async function schedulePayout(id, whenISO) {
  DB.payouts = DB.payouts.map((p) =>
    p.id === id ? { ...p, nextPayoutAt: whenISO } : p
  );
  return { ok: true };
}

// ---- Disputes
export async function fetchDisputes({
  query = "",
  status = "all",
  page = 1,
  pageSize = 10,
}) {
  let rows = DB.disputes;
  if (status !== "all") rows = rows.filter((d) => d.status === status);
  rows = filterQuery(rows, query, ["id", "brand", "reason", "txnId", "method"]);
  rows = rows.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  return paginate(rows, page, pageSize);
}
export async function getDispute(id) {
  return DB.disputes.find((d) => d.id === id) || null;
}
export async function uploadEvidence(disputeId, evidence) {
  DB.disputes = DB.disputes.map((d) =>
    d.id === disputeId
      ? {
          ...d,
          evidence: [...d.evidence, { id: `ev_${Date.now()}`, ...evidence }],
        }
      : d
  );
  return { ok: true };
}
export async function closeDispute(disputeId, outcome) {
  DB.disputes = DB.disputes.map((d) =>
    d.id === disputeId ? { ...d, status: outcome } : d
  );
  return { ok: true };
}

// ---- Fees & Taxes & Invoices
export async function fetchFees() {
  return DB.fees;
}
export async function saveFee(rule) {
  if (rule.id) {
    DB.fees = DB.fees.map((f) => (f.id === rule.id ? { ...f, ...rule } : f));
  } else {
    DB.fees = [{ ...rule, id: `fr_${Date.now()}` }, ...DB.fees];
  }
  return { ok: true };
}
export async function deleteFee(id) {
  DB.fees = DB.fees.filter((f) => f.id !== id);
  return { ok: true };
}

export async function fetchTaxes() {
  return DB.taxes;
}
export async function saveTax(rule) {
  if (rule.id) {
    DB.taxes = DB.taxes.map((t) => (t.id === rule.id ? { ...t, ...rule } : t));
  } else {
    DB.taxes = [{ ...rule, id: `tr_${Date.now()}` }, ...DB.taxes];
  }
  return { ok: true };
}
export async function deleteTax(id) {
  DB.taxes = DB.taxes.filter((t) => t.id !== id);
  return { ok: true };
}

export async function fetchInvoiceSettings() {
  return DB.invoices[0];
}
export async function saveInvoiceSettings(next) {
  DB.invoices = [{ ...DB.invoices[0], ...next }];
  return { ok: true };
}

// ---- Exports
export async function exportPayoutsCSV() {
  const headers = [
    "id",
    "brand",
    "balance",
    "holds",
    "reserve",
    "kycStatus",
    "nextPayoutAt",
    "frequency",
    "bank",
  ];
  const lines = [headers.join(",")];
  for (const p of DB.payouts) {
    lines.push(
      [
        p.id,
        p.brand,
        p.balance,
        p.holds,
        p.reserve,
        p.kycStatus,
        p.nextPayoutAt,
        p.frequency,
        `****${p.bank.last4}`,
      ]
        .map((x) => JSON.stringify(x ?? ""))
        .join(",")
    );
  }
  return new Blob([lines.join("\n")], { type: "text/csv" });
}
export async function exportDisputesCSV() {
  const headers = [
    "id",
    "method",
    "txnId",
    "brand",
    "reason",
    "amount",
    "currency",
    "deadline",
    "status",
  ];
  const lines = [headers.join(",")];
  for (const d of DB.disputes) {
    lines.push(
      [
        d.id,
        d.method,
        d.txnId,
        d.brand,
        d.reason,
        d.amount,
        d.currency,
        d.deadline,
        d.status,
      ]
        .map((x) => JSON.stringify(x ?? ""))
        .join(",")
    );
  }
  return new Blob([lines.join("\n")], { type: "text/csv" });
}

const rnd = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const METHODS = ["Stripe", "PayPal", "Apple Pay", "Google Pay"];
const TYPES = ["backing", "order", "fee", "refund"];
const STATUSES = ["succeeded", "pending", "failed"];

function mkTxn(i) {
  const type = pick(TYPES);
  const amount = type === "refund" ? -rnd(5, 150) : rnd(5, 400);
  return {
    id: `tx_${i}`,
    method: pick(METHODS),
    type,
    status: pick(STATUSES),
    brand: `Brand ${rnd(1, 8)}`,
    user: `user${rnd(1, 120)}@mail.test`,
    amount,
    currency: "USD",
    createdAt: new Date(Date.now() - rnd(0, 30) * 864e5).toISOString(),
    metadata: {
      campaign: Math.random() < 0.5 ? `Campaign ${rnd(1, 20)}` : null,
    },
  };
}

function mkPayout(i) {
  const kyc = pick(["pending", "approved", "rejected"]);
  return {
    id: `po_${i}`,
    brand: `Brand ${rnd(1, 8)}`,
    balance: rnd(200, 15000),
    nextPayoutAt: new Date(Date.now() + rnd(1, 10) * 864e5).toISOString(),
    frequency: pick(["daily", "weekly", "monthly"]),
    holds: rnd(0, 2000),
    reserve: rnd(0, 1200),
    kycStatus: kyc,
    bank: {
      last4: rnd(1000, 9999),
      name: pick(["Chase", "BoA", "HSBC", "Standard"]),
    },
  };
}

function mkDispute(i) {
  const status = pick([
    "needs_response",
    "under_review",
    "won",
    "lost",
    "closed",
  ]);
  return {
    id: `dp_${i}`,
    method: pick(METHODS),
    txnId: `tx_${rnd(1, 120)}`,
    brand: `Brand ${rnd(1, 8)}`,
    reason: pick([
      "fraud",
      "product_not_received",
      "duplicate",
      "credit_not_processed",
    ]),
    amount: rnd(10, 400),
    currency: "USD",
    deadline: new Date(Date.now() + rnd(1, 14) * 864e5).toISOString(),
    status,
    evidence: [],
  };
}

function mkFeeRule(i) {
  return {
    id: `fr_${i}`,
    scope: pick(["platform", "product", "campaign"]),
    target: scopeTarget(),
    pct: pick([5, 7.5, 10, 12.5]),
    fixed: pick([0, 0, 0, 1, 2]),
  };
  function scopeTarget() {
    return Math.random() < 0.4
      ? pick(["All", "Brand 1", "Brand 2", "Category:A"])
      : "All";
  }
}

function mkTaxRule(i) {
  return {
    id: `tr_${i}`,
    region: pick(["US-CA", "US-NY", "UK", "EU-DE", "PK-SD"]),
    rate: pick([7.5, 8.25, 10, 15, 17]),
    inclusive: false,
    threshold: rnd(0, 500),
  };
}

function mkInvoice(i) {
  return {
    id: `inv_${i}`,
    prefix: "PP-",
    nextNumber: 1000 + i,
    footer: "Thank you for supporting creators.",
  };
}

export function makeFixtures() {
  return {
    txns: Array.from({ length: 120 }, (_, i) => mkTxn(i + 1)),
    payouts: Array.from({ length: 8 }, (_, i) => mkPayout(i + 1)),
    disputes: Array.from({ length: 18 }, (_, i) => mkDispute(i + 1)),
    fees: Array.from({ length: 4 }, (_, i) => mkFeeRule(i + 1)),
    taxes: Array.from({ length: 6 }, (_, i) => mkTaxRule(i + 1)),
    invoices: [mkInvoice(1)],
  };
}

export const METHODS_FIXTURE = METHODS;
export const TYPES_FIXTURE = TYPES;
export const STATUSES_FIXTURE = STATUSES;

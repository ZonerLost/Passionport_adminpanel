import { makeCampaigns } from "./campaigns.fixtures";
import { mapCampaign } from "./campaigns.mappers";

let DB = makeCampaigns(60);

export async function fetchCampaigns({
  query = "",
  status = "all",
  page = 1,
  pageSize = 10,
}) {
  const norm = (s) => String(s || "").toLowerCase();
  let rows = DB.filter((c) =>
    [c.title, c.brand, c.status].some((x) => norm(x).includes(norm(query)))
  );
  if (status !== "all") rows = rows.filter((c) => c.status === status);
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    total,
    page,
    pageSize,
    rows: rows.slice(start, end).map(mapCampaign),
  };
}

export async function fetchCampaignById(id) {
  return mapCampaign(DB.find((c) => c.id === id));
}

export async function approveCampaign(id, note) {
  DB = DB.map((c) => (c.id === id ? { ...c, status: "live" } : c));
  return { ok: true, note };
}
export async function rejectCampaign(id, note) {
  DB = DB.map((c) => (c.id === id ? { ...c, status: "rejected" } : c));
  return { ok: true, note };
}
export async function requireChanges(id, note) {
  return { ok: true, note };
}
export async function pauseCampaign(id) {
  DB = DB.map((c) => (c.id === id ? { ...c, status: "paused" } : c));
  return { ok: true };
}
export async function terminateCampaign(id) {
  DB = DB.map((c) => (c.id === id ? { ...c, status: "rejected" } : c));
  return { ok: true };
}
export async function assignModerator(id, mod) {
  DB = DB.map((c) => (c.id === id ? { ...c, assignedTo: mod } : c));
  return { ok: true };
}

export async function approveUpdate(campaignId, updateId) {
  DB = DB.map((c) =>
    c.id === campaignId
      ? {
          ...c,
          updates: c.updates.map((u) =>
            u.id === updateId ? { ...u, pendingApproval: false } : u
          ),
        }
      : c
  );
  return { ok: true };
}
export async function rollbackUpdate(campaignId, updateId) {
  return { ok: true };
}
export async function scheduleUpdate(campaignId, updateId, whenIso) {
  DB = DB.map((c) =>
    c.id === campaignId
      ? {
          ...c,
          updates: c.updates.map((u) =>
            u.id === updateId ? { ...u, scheduledAt: whenIso } : u
          ),
        }
      : c
  );
  return { ok: true };
}

export async function setBackerOnlyVisibility(
  campaignId,
  updateId,
  backerOnly
) {
  DB = DB.map((c) =>
    c.id === campaignId
      ? {
          ...c,
          updates: c.updates.map((u) =>
            u.id === updateId ? { ...u, backerOnly } : u
          ),
        }
      : c
  );
  return { ok: true };
}
export async function pinTestimonial(campaignId, testimonialId, pinned = true) {
  DB = DB.map((c) =>
    c.id === campaignId
      ? {
          ...c,
          testimonials: c.testimonials.map((t) =>
            t.id === testimonialId ? { ...t, pinned } : t
          ),
        }
      : c
  );
  return { ok: true };
}

export async function bulkApprove(ids) {
  DB = DB.map((c) => (ids.includes(c.id) ? { ...c, status: "live" } : c));
  return { ok: true, count: ids.length };
}

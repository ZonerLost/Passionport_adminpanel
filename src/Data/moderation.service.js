import { makeFixtures } from "./moderation.fixtures";
import {
  mapContent,
  mapReport,
  mapReview,
  mapClub,
  mapChat,
} from "./moderation.mappers";
import { evaluateAuto } from "./rules.service";

let DB = makeFixtures();

function filterByQuery(rows, q, fields) {
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

export async function fetchReports({
  query = "",
  type = "all",
  severity = "all",
  page = 1,
  pageSize = 10,
}) {
  let rows = DB.reports;
  if (type !== "all") rows = rows.filter((r) => r.type === type);
  if (severity !== "all") rows = rows.filter((r) => r.severity === severity);
  rows = filterByQuery(rows, query, ["contentId", "type"]);
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { total, page, pageSize, rows: rows.slice(start, end).map(mapReport) };
}

export async function fetchContent({
  query = "",
  flagged = "all",
  by = "all",
  page = 1,
  pageSize = 12,
}) {
  let rows = DB.contents;
  if (flagged !== "all")
    rows = rows.filter((c) => (flagged === "flagged" ? c.flagged : !c.flagged));
  if (by !== "all")
    rows = rows.filter((c) => c.author === by || c.brand === by);
  rows = filterByQuery(rows, query, ["text", "author", "brand", "type"]);
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    total,
    page,
    pageSize,
    rows: rows.slice(start, end).map(mapContent),
  };
}

export async function fetchReviews({
  query = "",
  suspected = "all",
  page = 1,
  pageSize = 10,
}) {
  let rows = DB.reviews;
  if (suspected !== "all")
    rows = rows.filter(
      (r) => r.suspectedBrigade === (suspected === "suspected")
    );
  rows = filterByQuery(rows, query, ["author", "campaign", "text"]);
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { total, page, pageSize, rows: rows.slice(start, end).map(mapReview) };
}

export async function fetchClubs({
  query = "",
  onlyPending = false,
  page = 1,
  pageSize = 10,
}) {
  let rows = DB.clubs;
  if (onlyPending) rows = rows.filter((c) => c.pending);
  rows = filterByQuery(rows, query, ["name"]);
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { total, page, pageSize, rows: rows.slice(start, end).map(mapClub) };
}

export async function fetchChatMeta({ query = "", page = 1, pageSize = 10 }) {
  let rows = DB.chats;
  rows = filterByQuery(rows, query, ["name"]);
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { total, page, pageSize, rows: rows.slice(start, end).map(mapChat) };
}

// Moderation actions (stubbed)
export async function moderate(action, entity, id, payload) {
  // entity: 'content' | 'review' | 'club' | 'report' | 'chat' | 'user'
  // action: 'approve'|'hide'|'remove'|'shadowBan'|'mute'|'requireEdit'|'escalate'
  return { ok: true, action, entity, id, payload };
}

export async function evidencePack(reportId) {
  const report = DB.reports.find((r) => r.id === reportId);
  const content = report
    ? DB.contents.find((c) => c.id === report.contentId)
    : null;
  const out = { report, content, auto: content ? evaluateAuto(content) : null };
  return new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
}

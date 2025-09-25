import { makeFixtures } from "./messaging.fixtures";

let DB = makeFixtures();

const q = (s) => (s || "").toLowerCase();
const filterQuery = (rows, query, fields) =>
  !query
    ? rows
    : rows.filter((r) =>
        fields.some((f) =>
          String(
            f.includes(".")
              ? f.split(".").reduce((o, k) => o?.[k], r)
              : r[f] || ""
          )
            .toLowerCase()
            .includes(q(query))
        )
      );
const paginate = (rows, page, pageSize) => ({
  total: rows.length,
  page,
  pageSize,
  rows: rows.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
});

// --- Templates
export async function fetchTemplates({
  query = "",
  event = "all",
  channel = "all",
  category = "all",
  page = 1,
  pageSize = 10,
}) {
  let rows = DB.templates;
  if (event !== "all") rows = rows.filter((t) => t.event === event);
  if (category !== "all") rows = rows.filter((t) => t.category === category);
  if (channel !== "all") rows = rows.filter((t) => t.channels[channel]);
  rows = filterQuery(rows, query, ["id", "name", "event"]);
  rows = rows.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return paginate(rows, page, pageSize);
}
export async function getTemplate(id) {
  return DB.templates.find((t) => t.id === id) || null;
}
export async function saveTemplate(tpl) {
  // new version on save (simple versioning)
  const idx = DB.templates.findIndex((t) => t.id === tpl.id);
  if (idx >= 0) {
    const ver = DB.templates[idx].currentVersion + 1;
    DB.templates[idx] = {
      ...DB.templates[idx],
      ...tpl,
      versions: [
        ...DB.templates[idx].versions,
        {
          version: ver,
          at: new Date().toISOString(),
          variants:
            tpl.versions?.at(-1)?.variants ||
            DB.templates[idx].versions.at(-1).variants,
        },
      ],
      currentVersion: ver,
      updatedAt: new Date().toISOString(),
    };
  } else {
    DB.templates = [
      {
        ...tpl,
        currentVersion: 1,
        versions: tpl.versions || [],
        updatedAt: new Date().toISOString(),
      },
      ...DB.templates,
    ];
  }
  return { ok: true };
}
export async function rollbackTemplate(id, version) {
  DB.templates = DB.templates.map((t) => {
    if (t.id !== id) return t;
    const v = t.versions.find((x) => x.version === version);
    if (!v) return t;
    return {
      ...t,
      currentVersion: version,
      versions: [
        ...t.versions,
        {
          version: version + 1,
          at: new Date().toISOString(),
          variants: v.variants,
        },
      ],
      updatedAt: new Date().toISOString(),
    };
  });
  return { ok: true };
}
export async function testSendTemplate(id, channel, target) {
  // stub – would call provider in real impl
  return { ok: true, id, channel, target };
}
export async function exportTemplatesCSV() {
  const headers = ["id", "name", "event", "category", "channels", "updatedAt"];
  const lines = [headers.join(",")];
  for (const t of DB.templates) {
    lines.push(
      [
        t.id,
        t.name,
        t.event,
        t.category,
        JSON.stringify(t.channels),
        t.updatedAt,
      ]
        .map((x) => JSON.stringify(x))
        .join(",")
    );
  }
  return new Blob([lines.join("\n")], { type: "text/csv" });
}

// --- Announcements
export async function fetchAnnouncements({
  query = "",
  status = "all",
  page = 1,
  pageSize = 10,
}) {
  let rows = DB.announcements;
  if (status !== "all") rows = rows.filter((a) => a.status === status);
  rows = filterQuery(rows, query, ["id", "title", "type"]);
  rows = rows.sort((a, b) => new Date(b.startAt) - new Date(a.startAt));
  return paginate(rows, page, pageSize);
}
export async function getAnnouncement(id) {
  return DB.announcements.find((a) => a.id === id) || null;
}
export async function saveAnnouncement(a) {
  if (a.id) {
    DB.announcements = DB.announcements.map((x) =>
      x.id === a.id ? { ...x, ...a } : x
    );
  } else {
    DB.announcements = [{ ...a, id: `ann_${Date.now()}` }, ...DB.announcements];
  }
  return { ok: true };
}
export async function scheduleAnnouncement(id, startAtISO, endAtISO, segments) {
  DB.announcements = DB.announcements.map((a) =>
    a.id === id
      ? {
          ...a,
          startAt: startAtISO,
          endAt: endAtISO,
          segments,
          status: "scheduled",
        }
      : a
  );
  return { ok: true };
}

// --- Segments
export async function fetchSegments() {
  return DB.segments;
}
export async function saveSegment(s) {
  if (s.id) {
    DB.segments = DB.segments.map((x) => (x.id === s.id ? { ...x, ...s } : x));
  } else {
    DB.segments = [{ ...s, id: `seg_${Date.now()}` }, ...DB.segments];
  }
  return { ok: true };
}
export async function deleteSegment(id) {
  DB.segments = DB.segments.filter((s) => s.id !== id);
  return { ok: true };
}
export async function estimateSegmentCount(rules) {
  // naive estimator
  return Math.max(50, Math.floor(Math.random() * 100000));
}

// --- CMS Blocks
export async function fetchCMS({
  query = "",
  location = "all",
  status = "all",
  page = 1,
  pageSize = 10,
}) {
  let rows = DB.cms;
  if (location !== "all") rows = rows.filter((b) => b.location === location);
  if (status !== "all") rows = rows.filter((b) => b.status === status);
  rows = filterQuery(rows, query, ["id", "key", "title", "location"]);
  rows = rows.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return paginate(rows, page, pageSize);
}
export async function getCMS(id) {
  return DB.cms.find((b) => b.id === id) || null;
}
export async function saveCMS(b) {
  if (b.id) {
    DB.cms = DB.cms.map((x) =>
      x.id === b.id ? { ...x, ...b, updatedAt: new Date().toISOString() } : x
    );
  } else {
    DB.cms = [
      { ...b, id: `cms_${Date.now()}`, updatedAt: new Date().toISOString() },
      ...DB.cms,
    ];
  }
  return { ok: true };
}
export async function publishCMS(id, publish) {
  DB.cms = DB.cms.map((b) =>
    b.id === id
      ? {
          ...b,
          status: publish ? "published" : "draft",
          updatedAt: new Date().toISOString(),
        }
      : b
  );
  return { ok: true };
}

// --- Delivery Logs
export async function fetchLogs({
  query = "",
  channel = "all",
  status = "all",
  page = 1,
  pageSize = 12,
}) {
  let rows = DB.logs;
  if (channel !== "all") rows = rows.filter((l) => l.channel === channel);
  if (status !== "all") rows = rows.filter((l) => l.status === status);
  rows = filterQuery(rows, query, ["id", "templateId", "user", "meta.segment"]);
  rows = rows.sort((a, b) => new Date(b.ts) - new Date(a.ts));
  return paginate(rows, page, pageSize);
}
export async function exportLogsCSV() {
  const headers = [
    "id",
    "templateId",
    "channel",
    "user",
    "status",
    "ts",
    "segment",
  ];
  const lines = [headers.join(",")];
  for (const l of DB.logs) {
    lines.push(
      [
        l.id,
        l.templateId,
        l.channel,
        l.user,
        l.status,
        l.ts,
        l.meta?.segment || "",
      ]
        .map((x) => JSON.stringify(x))
        .join(",")
    );
  }
  return new Blob([lines.join("\n")], { type: "text/csv" });
}

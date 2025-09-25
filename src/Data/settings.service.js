import {
  DEFAULT_SETTINGS,
  DEFAULT_ACCESS,
  DEFAULT_PRIVACY,
} from "./settings.fixtures";
let SETTINGS = { ...DEFAULT_SETTINGS };
let ACCESS = { ...DEFAULT_ACCESS };
let PRIV = { ...DEFAULT_PRIVACY };
export async function fetchSettings() {
  return SETTINGS;
}
export async function saveSettings(next) {
  SETTINGS = { ...SETTINGS, ...next };
  return { ok: true };
}
export async function fetchAccess() {
  return ACCESS;
}
export async function rotateKey(id) {
  ACCESS.apiKeys = ACCESS.apiKeys.map((k) =>
    k.id === id
      ? { ...k, lastRotated: new Date().toISOString().slice(0, 10) }
      : k
  );
  return { ok: true };
}
export async function addWebhook(url, events) {
  ACCESS.webhooks = [
    ...ACCESS.webhooks,
    { id: `wh_${Date.now()}`, url, events },
  ];
  return {
    ok: true,
  };
}
export async function testWebhook() {
  return { ok: true };
}
export async function saveSso(cfg) {
  ACCESS.sso = cfg;
  return { ok: true };
}
export async function fetchAuditLogs({ page = 1, pageSize = 10 }) {
  const start = (page - 1) * pageSize;
  return {
    total: ACCESS.auditLogs.length,
    page,
    pageSize,
    rows: ACCESS.auditLogs.slice(start, start + pageSize),
  };
}
export async function fetchPrivacy() {
  return PRIV;
}
export async function updatePrivacy(next) {
  PRIV = { ...PRIV, ...next };
  return { ok: true };
}

export async function advanceExport(id) {
  PRIV.exportQueue = PRIV.exportQueue.map((x) =>
    x.id === id ? { ...x, status: "processing" } : x
  );
  return { ok: true };
}

export async function advanceDelete(id) {
  PRIV.deleteQueue = PRIV.deleteQueue.map((x) =>
    x.id === id ? { ...x, status: "processing" } : x
  );
  return { ok: true };
}

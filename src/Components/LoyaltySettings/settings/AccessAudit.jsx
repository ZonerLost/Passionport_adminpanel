import React from "react";
import SectionCard from "../../ui/common/SectionCard";
import Pagination from "../../ui/common/Pagination";

export default function AccessAudit({
  access,
  logs,
  onRotate,
  onAddWebhook,
  onTestWebhook,
  onSaveSso,
  onPageLogs,
}) {
  if (!access) return null;

  return (
    <div className="space-y-4">
      {/* API Keys */}
      <SectionCard title="API Keys">
        <ul className="space-y-2">
          {access.apiKeys.map((k) => (
            <li
              key={k.id}
              className="rounded-lg border p-3 flex items-center justify-between"
              style={{
                borderColor: "rgba(110,86,207,0.25)",
                background: "#0F1118",
              }}
            >
              <div>
                <div className="text-slate-200">{k.label}</div>
                <div className="text-xs text-slate-400">
                  Last rotated: {k.lastRotated}
                </div>
              </div>
              <button
                className="h-8 px-3 rounded-lg text-gray-400 border text-xs"
                onClick={() => onRotate(k.id)}
                style={{ borderColor: "rgba(110,86,207,0.25)" }}
              >
                Rotate
              </button>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Webhooks */}
      <SectionCard title="Webhooks">
        <div className="space-y-2">
          {access.webhooks.map((w) => (
            <div
              key={w.id}
              className="rounded-lg border p-3 text-gray-400 flex items-center justify-between"
              style={{
                borderColor: "rgba(110,86,207,0.25)",
                background: "#0F1118",
              }}
            >
              <div>
                <div className="text-slate-200">{w.url}</div>
                <div className="text-xs text-slate-400">
                  Events: {w.events.join(", ")}
                </div>
              </div>
              <button
                className="h-8 px-3 rounded-lg text-gray-400 border text-xs"
                onClick={() => onTestWebhook(w.id)}
                style={{ borderColor: "rgba(110,86,207,0.25)" }}
              >
                Test Ping
              </button>
            </div>
          ))}

          {/* Add Webhook Button */}
          <button
            className="h-10 px-4 rounded-lg border text-xs text-gray-400"
            onClick={onAddWebhook}
            style={{
              borderColor: "rgba(110,86,207,0.25)",
              background: "#0F1118",
            }}
          >
            Add Webhook
          </button>
        </div>
      </SectionCard>

      {/* SSO */}
      <SectionCard title="SSO for Staff">
        <SsoForm initial={access.sso} onSave={onSaveSso} />
      </SectionCard>

      {/* Audit Trail */}
      <SectionCard title="Audit Trail">
        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full text-sm">
            <thead>
              <tr
                className="text-left text-xs uppercase"
                style={{ color: "#A3A7B7" }}
              >
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Actor</th>
                <th className="px-3 py-2">Action</th>
                <th className="px-3 py-2">Target</th>
                <th className="px-3 py-2">Meta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
              {logs.rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-3 py-2 text-slate-300">
                    {new Date(r.ts).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-slate-300">{r.actor}</td>
                  <td className="px-3 py-2 text-slate-300">{r.action}</td>
                  <td className="px-3 py-2 text-slate-300">{r.target}</td>
                  <td className="px-3 py-2 text-slate-300">{r.meta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <Pagination
            page={logs.page}
            total={logs.total}
            pageSize={logs.pageSize}
            onPage={onPageLogs}
          />
        </div>
      </SectionCard>
    </div>
  );
}

/* Add Webhook */
function WebhookAdd({ onAdd }) {
  const add = () => {
    const url = prompt("Webhook URL:");
    if (!url) return;
    const events = prompt(
      "Comma events (e.g., payment.succeeded,campaign.approved)"
    );
    onAdd(
      url,
      (events || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
    );
  };

  return (
    <button
      className="h-8 px-3 rounded-lg border text-xs"
      onClick={add}
      style={{ borderColor: "rgba(110,86,207,0.25)" }}
    >
      Add Webhook
    </button>
  );
}

/* SSO Form */
function SsoForm({ initial, onSave }) {
  const [v, setV] = React.useState(initial);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <label className="text-xs text-slate-400">
        Enabled
        <input
          type="checkbox"
          className="ml-2"
          defaultChecked={v.enabled}
          onChange={(e) => setV((s) => ({ ...s, enabled: e.target.checked }))}
        />
      </label>

      <label className="text-xs text-slate-400">
        Issuer
        <input
          className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
          defaultValue={v.issuer}
          onChange={(e) => setV((s) => ({ ...s, issuer: e.target.value }))}
          style={{ borderColor: "rgba(110,86,207,0.25)" }}
        />
      </label>

      <label className="text-xs text-slate-400">
        Client ID
        <input
          className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
          defaultValue={v.clientId}
          onChange={(e) => setV((s) => ({ ...s, clientId: e.target.value }))}
          style={{ borderColor: "rgba(110,86,207,0.25)" }}
        />
      </label>

      <label className="text-xs text-slate-400 md:col-span-3">
        Audience
        <input
          className="mt-1 h-8 w-full rounded border bg-transparent px-2 text-sm"
          defaultValue={v.audience}
          onChange={(e) => setV((s) => ({ ...s, audience: e.target.value }))}
          style={{ borderColor: "rgba(110,86,207,0.25)" }}
        />
      </label>

      <div className="md:col-span-3">
        <button
          className="h-8 px-3 rounded-lg text-gray-400 border text-xs"
          onClick={() => onSave(v)}
          style={{ borderColor: "rgba(110,86,207,0.25)" }}
        >
          Save SSO
        </button>
      </div>
    </div>
  );
}

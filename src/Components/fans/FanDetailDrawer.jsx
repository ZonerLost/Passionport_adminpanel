import React from "react";

const CARD = "#161821";
const RING = "rgba(255,122,0,0.25)";

export default function FanDetailDrawer({
  open,
  data,
  onClose,
  onSuspend,
  onBan,
  onDelete,
  onReset2FA,
  onResetPassword,
  onExportGDPR,
}) {
  if (!open || !data) return null;

  const { user, posts, backed, orders, activity } = data;

  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-3xl overflow-y-auto border-l shadow-md shadow-[#ff7a00]"
        style={{ backgroundColor: CARD, borderColor: RING }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b" style={{ borderColor: RING }}>
          <div className="text-white text-lg font-semibold">{user.name}</div>
          <div className="text-sm text-slate-300">
            {user.email} • @{user.handle} • Joined{" "}
            {new Date(user.joinedAt).toLocaleDateString()}
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Profile */}
          <Card title="Profile">
            <GridRow k="Status" v={user.status} />
            <GridRow
              k="Verification"
              v={user.verified ? "Verified" : "Unverified"}
            />
            <GridRow k="Country" v={user.country || "—"} />
            <GridRow
              k="Last Active"
              v={new Date(user.lastActiveAt).toLocaleString()}
            />
          </Card>

          {/* Posts */}
          <Card title={`Posts (${posts.length})`}>
            <List items={posts} empty="No posts">
              {(p) => (
                <li key={p.id} className="flex items-center justify-between">
                  <div className="text-slate-200">{p.title}</div>
                  <div className="text-slate-400 text-xs">
                    {new Date(p.createdAt).toLocaleString()}
                  </div>
                </li>
              )}
            </List>
          </Card>

          {/* Backed campaigns */}
          <Card title={`Backed Campaigns (${backed.length})`}>
            <List items={backed} empty="No backed campaigns">
              {(b) => (
                <li key={b.id} className="flex items-center justify-between">
                  <div className="text-slate-200">{b.title}</div>
                  <div className="text-slate-400 text-xs">
                    ${b.amount.toFixed(2)} •{" "}
                    {new Date(b.date).toLocaleDateString()}
                  </div>
                </li>
              )}
            </List>
          </Card>

          {/* Orders */}
          <Card title={`Orders (${orders.length})`}>
            <List items={orders} empty="No orders">
              {(o) => (
                <li key={o.id} className="flex items-center justify-between">
                  <div className="text-slate-200">Order {o.id}</div>
                  <div className="text-slate-400 text-xs">
                    ${o.total.toFixed(2)} • {o.status} •{" "}
                    {new Date(o.date).toLocaleDateString()}
                  </div>
                </li>
              )}
            </List>
          </Card>

          {/* Activity */}
          <Card title="Activity Logs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <SubCard label="Sessions">
                <ul className="space-y-1 text-xs text-slate-300">
                  {activity.sessions.map((s, i) => (
                    <li key={i}>
                      {s.device} • {s.ip} •{" "}
                      {new Date(s.lastSeen).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </SubCard>
              <SubCard label="Strikes">
                <ul className="space-y-1 text-xs text-slate-300">
                  {activity.strikes.length ? (
                    activity.strikes.map((s, i) => (
                      <li key={i}>
                        {s.reason} • {new Date(s.date).toLocaleDateString()}
                      </li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
              </SubCard>
              <SubCard label="Reports">
                <ul className="space-y-1 text-xs text-slate-300">
                  {activity.reports.length ? (
                    activity.reports.map((r, i) => (
                      <li key={i}>
                        {r.type} • {r.count}x
                      </li>
                    ))
                  ) : (
                    <li>None</li>
                  )}
                </ul>
              </SubCard>
            </div>
          </Card>

          {/* Actions */}
          <Card title="Actions">
            <div className="flex flex-wrap items-center gap-2">
              <button
                className="h-8 px-3 rounded-lg border text-sm text-white"
                style={{ borderColor: RING }}
                onClick={() => {
                  const days = Number(
                    prompt("Suspend for how many days?", "7")
                  );
                  if (!Number.isNaN(days)) onSuspend?.(days);
                }}
              >
                Suspend…
              </button>

              <button
                className="h-8 px-3 rounded-lg border text-sm text-white"
                style={{ borderColor: RING }}
                onClick={() => {
                  const reason = prompt("Ban reason?", "policy_violation");
                  if (reason) onBan?.(reason);
                }}
              >
                Ban…
              </button>

              <button
                className="h-8 px-3 rounded-lg border text-sm text-white"
                style={{ borderColor: RING }}
                onClick={() => {
                  if (confirm("Delete this user permanently?")) onDelete?.();
                }}
              >
                Delete…
              </button>

              <span className="mx-2 opacity-30">|</span>

              <button
                className="h-8 px-3 rounded-lg border text-sm text-white"
                style={{ borderColor: RING }}
                onClick={onReset2FA}
              >
                Reset 2FA
              </button>

              <button
                className="h-8 px-3 rounded-lg border text-sm text-white"
                style={{ borderColor: RING }}
                onClick={onResetPassword}
              >
                Force Password Reset
              </button>

              <span className="mx-2 opacity-30">|</span>

              <button
                className="h-8 px-3 rounded-lg border text-sm text-white"
                style={{ borderColor: RING }}
                onClick={onExportGDPR}
              >
                Export GDPR Data
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <section>
      <div className="text-slate-200 font-medium mb-2">{title}</div>
      <div
        className="rounded-xl border p-3 space-y-2"
        style={{ borderColor: RING, background: "#0F1118" }}
      >
        {children}
      </div>
    </section>
  );
}

function SubCard({ label, children }) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{ borderColor: RING, background: "#0F1118" }}
    >
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      {children}
    </div>
  );
}

function GridRow({ k, v }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-slate-400">{k}</div>
      <div className="text-slate-200">{v}</div>
    </div>
  );
}

function List({ items, empty, children }) {
  if (!items?.length)
    return <div className="text-slate-400 text-sm">{empty}</div>;
  return <ul className="space-y-2">{items.map(children)}</ul>;
}

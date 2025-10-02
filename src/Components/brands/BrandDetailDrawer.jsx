import React from "react";
const CARD = "#161821";
const RING = "rgba(255,122,0,0.25)";

export default function BrandDetailDrawer({
  open,
  data,
  onClose,
  onApprove,
  onReject,
  onSuspend,
  onAddCampaign,
  onRemoveCampaign,
}) {
  if (!open || !data) return null;
  const {
    brand,
    documents,
    business,
    posts,
    campaigns,
    productsAdded,
    productsBought,
    audit,
  } = data;

  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-4xl overflow-y-auto border-l shadow-md shadow-[#ff7a00]"
        style={{ backgroundColor: CARD, borderColor: RING }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-5 border-b" style={{ borderColor: RING }}>
          <div className="text-white text-lg font-semibold">{brand.name}</div>
          <div className="text-sm text-white">
            Owner: {brand.owner.name} • {brand.owner.email} • KYC:{" "}
            {brand.kycStatus}
          </div>
        </header>

        <div className="p-5 space-y-4">
          <Card title="Profile + Business">
            <GridRow k="Verified" v={brand.verified ? "Yes" : "No"} />
            <GridRow k="Country" v={business.country || "—"} />
            <GridRow k="Reg. Number" v={business.regNo || "—"} />
            <GridRow k="Tax ID" v={business.taxId || "—"} />
          </Card>

          <Card title="KYC Documents">
            <List items={documents} empty="No documents.">
              {(d) => (
                <li key={d.id} className="flex items-center justify-between">
                  <div className="text-white">{d.type}</div>
                  <div className="text-white text-xs">
                    {new Date(d.uploadedAt).toLocaleString()}
                  </div>
                </li>
              )}
            </List>
            <div className="flex items-center gap-2 mt-2">
              <button
                className="h-8 px-3 rounded-lg border text-sm text-white"
                style={{ borderColor: RING }}
                onClick={onApprove}
              >
                Approve
              </button>
              <button
                className="h-8 px-3 rounded-lg border text-sm text-white"
                style={{ borderColor: RING, color: "#ffffff" }}
                onClick={onReject}
              >
                Reject…
              </button>
              <button
                className="h-8 px-3 rounded-lg border text-sm text-white"
                style={{ borderColor: RING, color: "#ffffff" }}
                onClick={onSuspend}
              >
                Suspend…
              </button>
            </div>
          </Card>

          <Card title={`Campaigns (${campaigns.length})`}>
            <List items={campaigns} empty="No campaigns">
              {(c) => (
                <li key={c.id} className="flex items-center justify-between">
                  <div className="text-white">{c.title}</div>
                  <div className="text-white text-xs">
                    {c.status} • goal ${c.goal}
                  </div>
                  <div className="text-xs">
                    <button
                      className="underline text-white"
                      onClick={() => onRemoveCampaign?.(c.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )}
            </List>
            <button
              className="mt-2 h-8 px-3 rounded-lg border text-sm text-white"
              style={{ borderColor: RING }}
              onClick={onAddCampaign}
            >
              Add Campaign…
            </button>
          </Card>

          <Card title={`Posts (${posts.length})`}>
            <List items={posts} empty="No posts">
              {(p) => (
                <li key={p.id} className="flex items-center justify-between">
                  <div className="text-white">{p.title}</div>
                  <div className="text-white text-xs">
                    {new Date(p.createdAt).toLocaleString()}
                  </div>
                </li>
              )}
            </List>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SubCard label={`Products Added (${productsAdded.length})`}>
              <ul className="space-y-1 text-xs text-white">
                {productsAdded.map((p) => (
                  <li key={p.id}>
                    {p.name} • ${p.price}
                  </li>
                ))}
              </ul>
            </SubCard>
            <SubCard label={`Products Bought (${productsBought.length})`}>
              <ul className="space-y-1 text-xs text-white">
                {productsBought.map((p) => (
                  <li key={p.id}>
                    {p.name} • ${p.price}
                  </li>
                ))}
              </ul>
            </SubCard>
          </div>

          <Card title="Audit Logs">
            <ul className="space-y-1 text-xs text-white">
              {audit.map((a, i) => (
                <li key={i}>
                  {a.action} • {new Date(a.ts).toLocaleString()}
                </li>
              ))}
            </ul>
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
function List({ items, empty, children }) {
  if (!items?.length)
    return <div className="text-slate-400 text-sm">{empty}</div>;
  return <ul className="space-y-2">{items.map(children)}</ul>;
}
function GridRow({ k, v }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-slate-400">{k}</div>
      <div className="text-slate-200">{v}</div>
    </div>
  );
}

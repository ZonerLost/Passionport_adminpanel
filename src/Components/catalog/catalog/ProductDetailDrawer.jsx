import React from "react";
import { COLORS } from "../../ui/shared/theme";

export default function ProductDetailDrawer({ open, product, onClose }) {
  if (!open || !product) return null;
  const p = product;
  return (
    <div
      className="fixed inset-0 z-40"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l shadow-md shadow-[#ff7a00]"
        style={{ backgroundColor: COLORS.card, borderColor: COLORS.ring }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b" style={{ borderColor: COLORS.ring }}>
          <div className="text-white text-lg font-semibold">{p.name}</div>
          <div className="text-sm text-slate-300">
            {p.brand} • {p.status.toUpperCase()}
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Variants */}
          <section>
            <h3 className="text-slate-200 font-medium mb-2">Variants</h3>
            <div className="overflow-x-auto">
              <table className="min-w-[640px] w-full text-sm">
                <thead>
                  <tr
                    className="text-left text-xs uppercase"
                    style={{ color: "#A3A7B7" }}
                  >
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">SKU</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,122,0,0.15)]">
                  {p.variants.map((v) => (
                    <tr key={v.id}>
                      <td className="px-3 py-2 text-slate-200">{v.name}</td>
                      <td className="px-3 py-2 text-slate-300">{v.sku}</td>
                      <td className="px-3 py-2 text-slate-300">${v.price}</td>
                      <td className="px-3 py-2 text-slate-300">{v.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SEO */}
          <section>
            <h3 className="text-slate-200 font-medium mb-2">SEO</h3>
            <div
              className="rounded-lg border p-3"
              style={{
                borderColor: "rgba(255,122,0,0.25)",
                background: "#0F1118",
              }}
            >
              <div className="text-sm text-slate-300">
                Slug: <span className="text-slate-200">/{p.seo.slug}</span>
              </div>
              <div className="text-sm text-slate-300">
                Meta: <span className="text-slate-200">{p.seo.meta}</span>
              </div>
            </div>
          </section>

          {/* Reviews summary */}
          <section>
            <h3 className="text-slate-200 font-medium mb-2">Reviews Summary</h3>
            <div
              className="rounded-lg border p-3"
              style={{
                borderColor: "rgba(255,122,0,0.25)",
                background: "#0F1118",
              }}
            >
              <div className="text-sm text-slate-300">
                Average rating:{" "}
                <span className="text-slate-200">{p.reviews.avg}</span> from{" "}
                <span className="text-slate-200">{p.reviews.count}</span>{" "}
                reviews
              </div>
            </div>
          </section>

          {/* Policy checks */}
          <section>
            <h3 className="text-slate-200 font-medium mb-2">Policy Checks</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Check label="Link risk" v={p.policy.linkRisk} />
              <Check label="Image nudity" v={p.policy.imageNudity} />
              <Check label="Backer-only policy" v={0.0} />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Values over 0.8 warrant manual review.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

function Check({ label, v }) {
  const color = v > 0.8 ? "#f87171" : v > 0.6 ? "#fb923c" : "#34d399";
  return (
    <div
      className="rounded-lg border p-3"
      style={{ borderColor: color, background: "#1a1c23" }}
    >
      <div className="text-sm text-slate-300">
        {label}: <span style={{ color }}>{v.toFixed(2)}</span>
      </div>
    </div>
  );
}

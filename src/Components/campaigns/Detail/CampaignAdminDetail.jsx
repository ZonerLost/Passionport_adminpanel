import React from "react";
import SectionCard from "../../ui/common/SectionCard";

export default function CampaignAdminDetail({ data, onPinTestimonial }) {
  if (!data) return null;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        <SectionCard title="Overview">
          <div className="space-y-2 text-slate-200">
            <div className="text-white text-lg font-semibold">{data.title}</div>
            <div className="text-sm">
              Brand: <b>{data.brand}</b>
            </div>
            <div className="text-sm">
              Status: <b>{data.status}</b>
            </div>
            <div className="text-sm">
              Goal: <b>${data.goal.toLocaleString()}</b> - Raised:{" "}
              <b>${data.raised.toLocaleString()}</b>
            </div>
            <p className="text-slate-300 mt-2">{data.story}</p>
          </div>
        </SectionCard>

        <SectionCard title="Rewards / Tiers">
          <div className="overflow-x-auto">
            <table className="min-w-[560px] w-full text-sm">
              <thead>
                <tr
                  className="text-left text-xs uppercase"
                  style={{ color: "#A3A7B7" }}
                >
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Min</th>
                  <th className="px-3 py-2">Limit</th>
                  <th className="px-3 py-2">Perks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,122,0,0.15)]">
                {data.tiers.map((t) => (
                  <tr key={t.id}>
                    <td className="px-3 py-2 text-slate-200">{t.name}</td>
                    <td className="px-3 py-2 text-slate-300">${t.min}</td>
                    <td className="px-3 py-2 text-slate-300">
                      {t.limit ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-slate-300">{t.perks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="FAQs & Team">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-slate-300 text-xs uppercase mb-1">FAQs</div>
              <ul className="space-y-2">
                {data.faqs.map((f, i) => (
                  <li
                    key={i}
                    className="rounded-lg border p-3"
                    style={{
                      borderColor: "rgba(255,122,0,0.25)",
                      background: "#0F1118",
                    }}
                  >
                    <div className="text-slate-200 font-medium">{f.q}</div>
                    <div className="text-slate-400 text-sm">{f.a}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-slate-300 text-xs uppercase mb-1">Team</div>
              <ul className="space-y-2">
                {data.team.map((m) => (
                  <li
                    key={m.id}
                    className="rounded-lg border p-3"
                    style={{
                      borderColor: "rgba(255,122,0,0.25)",
                      background: "#0F1118",
                    }}
                  >
                    <div className="text-slate-200 font-medium">{m.name}</div>
                    <div className="text-slate-400 text-sm">{m.role}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="space-y-4">
        <SectionCard title={`Linked Products (${data.linkedProducts})`}>
          <div className="text-sm text-slate-300">
            (Wire to product listing later)
          </div>
        </SectionCard>

        <SectionCard title="Testimonials">
          <ul className="space-y-2">
            {data.testimonials.map((t) => (
              <li
                key={t.id}
                className="rounded-lg border p-3"
                style={{
                  borderColor: "rgba(255,122,0,0.25)",
                  background: "#0F1118",
                }}
              >
                <div className="text-slate-200 text-sm">
                  <b>{t.user}</b>: {t.text}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-400">
                    {t.approved ? "approved" : "pending"}
                  </span>
                  <button
                    className="text-xs underline"
                    onClick={() => onPinTestimonial(t.id, !t.pinned)}
                  >
                    {t.pinned ? "Unpin" : "Pin"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Reports History">
          <div className="text-sm text-slate-300">
            Total reports: <b>{data.reports}</b>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

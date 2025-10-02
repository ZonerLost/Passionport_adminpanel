import React from "react";
import SectionCard from "../ui/common/SectionCard";
import Pagination from "../ui/common/Pagination";

export default function KycQueue({
  data,
  status,
  setStatus,
  onApprove,
  onReject,
  onRequestDocs,
  onPage,
}) {
  return (
    <SectionCard
      title="Verification / KYC Queue"
      action={
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-9 rounded-lg px-2 text-sm border"
          style={{
            background: "#0F1118",
            color: "#E6E8F0",
            borderColor: "rgba(255,122,0,0.25)",
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      }
    >
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Submitted</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Docs</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-400 divide-[rgba(255,122,0,0.15)]">
            {data.rows.map((row) => (
              <tr key={row.id}>
                <td className="px-3 py-2 text-slate-200">{row.brandName}</td>
                <td className="px-3 py-2 text-slate-300">{row.contact}</td>
                <td className="px-3 py-2 text-slate-300">
                  {new Date(row.submittedAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 text-slate-300">{row.status}</td>
                <td className="px-3 py-2 text-slate-300">
                  <div className="flex flex-wrap gap-1">
                    {row.docs.map((d) => (
                      <a key={d.name} href={d.url} className="underline">
                        {d.name}
                      </a>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      className="text-xs underline"
                      onClick={() => onApprove(row.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onReject(row.id)}
                    >
                      Reject
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onRequestDocs(row.id)}
                    >
                      Request docs
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <Pagination
          page={data.page}
          total={data.total}
          pageSize={data.pageSize}
          onPage={onPage}
        />
      </div>
    </SectionCard>
  );
}

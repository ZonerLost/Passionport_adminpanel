import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function ClubsApproval({
  data,
  onPage,
  onApprove,
  onRemove,
  onMute,
}) {
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="min-w-[880px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">Club</th>
              <th className="px-3 py-2">Owners</th>
              <th className="px-3 py-2">Mods</th>
              <th className="px-3 py-2">Members</th>
              <th className="px-3 py-2">Pending?</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {data.rows.map((c) => (
              <tr key={c.id}>
                <td className="px-3 py-2 text-slate-200">{c.name}</td>
                <td className="px-3 py-2 text-slate-300">
                  {c.owners.join(", ")}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {c.mods.join(", ")}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {c.members.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {c.pending ? "Yes" : "No"}
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="inline-flex text-gray-400 items-center gap-2">
                    <button
                      className="text-xs underline"
                      onClick={() => onApprove(c.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onRemove(c.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onMute(c.id, 24)}
                    >
                      Mute 24h
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
    </div>
  );
}

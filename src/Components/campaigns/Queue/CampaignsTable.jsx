import React from "react";
import Pagination from "../../ui/common/Pagination";

export default function CampaignsTable({
  data,
  selectedIds,
  setSelectedIds,
  onApprove,
  onReject,
  onRequire,
  onPause,
  onTerminate,
  onAssign,
  onPage,
  onSelectRow,
}) {
  const allChecked =
    data.rows.length > 0 && selectedIds.length === data.rows.length;
  const toggleAll = () =>
    setSelectedIds(allChecked ? [] : data.rows.map((r) => r.id));
  const toggle = (id) =>
    setSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter((x) => x !== id)
        : [...selectedIds, id]
    );

  return (
    <div className="space-y-3">
      {/* Bulk bar */}
      <div className="flex text-gray-300 items-center gap-2">
        <button
          className="h-8 px-3 rounded-lg border text-xs"
          onClick={() => onApprove(selectedIds)}
          disabled={!selectedIds.length}
          style={{ borderColor: "rgba(110,86,207,0.25)" }}
        >
          Bulk Approve
        </button>
        <button
          className="h-8 px-3 rounded-lg border text-xs"
          onClick={() => onReject(selectedIds)}
          disabled={!selectedIds.length}
          style={{ borderColor: "rgba(110,86,207,0.25)" }}
        >
          Bulk Reject
        </button>
        <div className="flex-1" />
        <span className="text-xs text-slate-400">
          {selectedIds.length} selected
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm">
          <thead>
            <tr
              className="text-left text-xs uppercase"
              style={{ color: "#A3A7B7" }}
            >
              <th className="px-3 py-2">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-3 py-2">Campaign</th>
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Goal</th>
              <th className="px-3 py-2">Raised</th>
              <th className="px-3 py-2">SLA</th>
              <th className="px-3 py-2">Assigned</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(110,86,207,0.15)]">
            {data.rows.map((row) => (
              <tr key={row.id} className="hover:bg-white/5">
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(row.id)}
                    onChange={() => toggle(row.id)}
                  />
                </td>
                <td className="px-3 py-2">
                  <button
                    className="text-white font-medium underline"
                    onClick={() => onSelectRow(row)}
                  >
                    {row.title}
                  </button>
                </td>
                <td className="px-3 py-2 text-slate-300">{row.brand}</td>
                <td className="px-3 py-2 text-slate-300">{row.status}</td>
                <td className="px-3 py-2 text-slate-300">
                  ${row.goal.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  ${row.raised.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-slate-300">
                  {row.approvalsSLAHours}h
                </td>
                <td className="px-3 py-2 text-slate-300">
                  <select
                    defaultValue={row.assignedTo || ""}
                    onChange={(e) => onAssign(row.id, e.target.value)}
                    className="h-8 rounded px-2 text-xs border"
                    style={{
                      background: "#0F1118",
                      color: "#E6E8F0",
                      borderColor: "rgba(110,86,207,0.25)",
                    }}
                  >
                    <option value="">Unassigned</option>
                    {["mod_1", "mod_2", "mod_3", "mod_4", "mod_5", "mod_6"].map(
                      (m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      )
                    )}
                  </select>
                </td>
                <td className="px-3 py-2 text-gray-400 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      className="text-xs underline"
                      onClick={() => onApprove([row.id])}
                    >
                      Approve
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onReject([row.id])}
                    >
                      Reject
                    </button>
                    <button
                      className="text-xs underline"
                      onClick={() => onRequire(row.id)}
                    >
                      Require changes
                    </button>
                    {row.status === "live" ? (
                      <button
                        className="text-xs underline"
                        onClick={() => onPause(row.id)}
                      >
                        Pause
                      </button>
                    ) : null}
                    <button
                      className="text-xs underline"
                      onClick={() => onTerminate(row.id)}
                    >
                      Terminate
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

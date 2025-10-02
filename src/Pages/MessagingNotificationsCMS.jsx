// ...existing code...
import React, { useState } from "react";
import SectionCard from "../Components/ui/common/SectionCard";

// Templates
import TemplateFiltersBar from "../Components/messaging/templates/TemplateFiltersBar";
import TemplatesTable from "../Components/messaging/templates/TemplatesTable";
import TemplateEditorDrawer from "../Components/messaging/templates/TemplateEditorDrawer";

// Announcements
import AnnouncementsTable from "../Components/messaging/announcements/AnnouncementsTable";
import AnnouncementEditorDrawer from "../Components/messaging/announcements/AnnouncementEditorDrawer";

// CMS
import CMSFiltersBar from "../Components/messaging/cms/CMSFiltersBar";
import CMSBlocksTable from "../Components/messaging/cms/CMSBlocksTable";
import CMSBlockEditorDrawer from "../Components/messaging/cms/CMSBlockEditorDrawer";

// Segments
import SegmentsTable from "../Components/messaging/segments/SegmentsTable";
import SegmentBuilder from "../Components/messaging/segments/SegmentBuilder";

// Logs filters - local fallback (keeps build stable if shared component is missing)
function LogsFiltersBar({
  filters = {},
  onSearch,
  onChannel,
  onStatus,
  onExport,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="sr-only" htmlFor="logs-search">
        Search logs
      </label>
      <input
        id="logs-search"
        type="search"
        placeholder="Search logs..."
        defaultValue={filters.query || ""}
        onChange={(e) => onSearch?.(e.target.value)}
        className="h-9 rounded-md px-3 bg-[#0F1014] text-sm text-white border"
        style={{ borderColor: "rgba(255,122,0,0.12)" }}
        aria-label="Search delivery logs"
      />

      <select
        defaultValue={filters.channel || ""}
        onChange={(e) => onChannel?.(e.target.value)}
        className="h-9 rounded-md px-2 bg-[#0F1014] text-sm text-white border"
        style={{ borderColor: "rgba(255,122,0,0.12)" }}
        aria-label="Filter by channel"
      >
        <option value="">All channels</option>
        <option value="email">Email</option>
        <option value="push">Push</option>
        <option value="sms">SMS</option>
      </select>

      <select
        defaultValue={filters.status || ""}
        onChange={(e) => onStatus?.(e.target.value)}
        className="h-9 rounded-md px-2 bg-[#0F1014] text-sm text-white border"
        style={{ borderColor: "rgba(255,122,0,0.12)" }}
        aria-label="Filter by status"
      >
        <option value="">All statuses</option>
        <option value="delivered">Delivered</option>
        <option value="failed">Failed</option>
        <option value="queued">Queued</option>
      </select>

      <button
        type="button"
        onClick={() => onExport?.()}
        className="h-9 px-3 rounded-md bg-gradient-to-r from-[#ff7a00] to-[#ffb37a] text-white text-sm"
        aria-label="Export logs"
      >
        Export
      </button>
    </div>
  );
}

// DeliveryLogsTable fallback (used if the real component is not present on disk)
// Accepts `data` shaped like { rows: [], page, total, pageSize, actions: { setPage } }
function DeliveryLogsTable({ data = {}, onPage }) {
  const rows = data.rows || [];
  if (!rows.length) {
    return (
      <div className="text-sm text-[#A3A7B7] p-6">
        No delivery logs available.
      </div>
    );
  }

  return (
    <div
      className="overflow-x-auto rounded-lg border"
      style={{ borderColor: "rgba(255,122,0,0.08)" }}
    >
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-[#9DA1B5] uppercase">
          <tr>
            <th className="px-3 py-2">Time</th>
            <th className="px-3 py-2">Channel</th>
            <th className="px-3 py-2">Recipient</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Message</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {rows.map((r, i) => (
            <tr
              key={r.id || i}
              className={i % 2 === 0 ? "bg-[#0F1014]" : "bg-[#0B0B0F]"}
            >
              <td className="px-3 py-2 align-top">
                {r.time || r.createdAt || "-"}
              </td>
              <td className="px-3 py-2 align-top">{r.channel || "-"}</td>
              <td className="px-3 py-2 align-top">
                {r.to || r.recipient || "-"}
              </td>
              <td className="px-3 py-2 align-top">
                <span
                  className={`px-2 py-0.5 rounded text-xs ${
                    r.status === "delivered"
                      ? "bg-green-800"
                      : r.status === "failed"
                      ? "bg-red-800"
                      : "bg-gray-700"
                  }`}
                >
                  {r.status || "-"}
                </span>
              </td>
              <td className="px-3 py-2 align-top text-[#A3A7B7]">
                {r.message?.slice?.(0, 120) || r.summary || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* simple pager if actions provided */}
      {data.total > data.pageSize && (
        <div className="flex items-center justify-end gap-2 p-3 text-sm text-[#9DA1B5]">
          <button
            onClick={() => onPage?.(Math.max(1, (data.page || 1) - 1))}
            className="px-2 py-1 rounded border"
            style={{ borderColor: "rgba(255,122,0,0.08)" }}
          >
            Prev
          </button>
          <span>
            Page {data.page || 1} /{" "}
            {Math.ceil((data.total || 0) / (data.pageSize || 25))}
          </span>
          <button
            onClick={() => onPage?.((data.page || 1) + 1)}
            className="px-2 py-1 rounded border"
            style={{ borderColor: "rgba(255,122,0,0.08)" }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// Hooks
import useTemplates from "../hooks/useTemplates";
import useAnnouncements from "../hooks/useAnnouncements";
import useCMS from "../hooks/useCMS";
import useSegments from "../hooks/useSegments";
import useLogs from "../hooks/useLogs";

export default function MessagingNotificationsCMS() {
  const [tab, setTab] = useState("templates");

  // defensive hook usage so build/runtime don't crash if hooks return undefined
  const templates = useTemplates?.("all") ?? {};
  const loyalty = useTemplates?.("loyalty") ?? {};
  const ann = useAnnouncements?.() ?? {};
  const cms = useCMS?.() ?? {};
  const seg = useSegments?.() ?? {};
  const logs = useLogs?.() ?? {};

  return (
    <div className="p-4 md:p-6 space-y-4">
      <nav className="flex flex-wrap items-center gap-2 text-sm">
        {[
          ["templates", "Notification Templates"],
          ["announcements", "Announcements"],
          ["loyalty", "Loyalty & Streaks Comms"],
          ["cms", "CMS Blocks"],
          ["segments", "Segments"],
          ["logs", "Delivery Logs"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`h-9 px-3 rounded-lg border ${
              tab === key ? "text-white" : "text-slate-300"
            }`}
            style={{
              borderColor: "rgba(255,122,0,0.25)",
              background: tab === key ? "#0F1118" : "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Templates */}
      {tab === "templates" && (
        <SectionCard
          title="Notification Templates"
          action={
            <TemplateFiltersBar
              filters={templates.filters}
              onSearch={templates.actions?.setQuery}
              onEvent={templates.actions?.setEvent}
              onChannel={templates.actions?.setChannel}
              onCategory={templates.actions?.setCategory}
              onExport={templates.actions?.exportCSV}
            />
          }
        >
          {templates.loading ? (
            <Skeleton h={200} />
          ) : (
            <TemplatesTable
              data={templates}
              onPage={templates.actions?.setPage}
              onOpen={templates.actions?.open}
            />
          )}
          <TemplateEditorDrawer
            open={!!templates.selected}
            template={templates.selected}
            onClose={templates.actions?.close}
            onSave={templates.actions?.save}
            onRollback={templates.actions?.rollback}
            onTest={templates.actions?.test}
          />
        </SectionCard>
      )}

      {/* Announcements */}
      {tab === "announcements" && (
        <SectionCard title="Campaign & System Announcements">
          {ann.loading ? (
            <Skeleton h={200} />
          ) : (
            <AnnouncementsTable
              data={ann}
              onPage={ann.actions?.setPage}
              onOpen={ann.actions?.open}
            />
          )}
          <AnnouncementEditorDrawer
            open={!!ann.selected}
            announcement={ann.selected}
            segments={seg.rows}
            onClose={ann.actions?.close}
            onSave={ann.actions?.save}
            onSchedule={ann.actions?.schedule}
          />
        </SectionCard>
      )}

      {/* Loyalty */}
      {tab === "loyalty" && (
        <SectionCard
          title="Loyalty & Streaks Communications"
          action={
            <TemplateFiltersBar
              filters={loyalty.filters}
              onSearch={loyalty.actions?.setQuery}
              onEvent={loyalty.actions?.setEvent}
              onChannel={loyalty.actions?.setChannel}
              onCategory={loyalty.actions?.setCategory}
              onExport={loyalty.actions?.exportCSV}
            />
          }
        >
          {loyalty.loading ? (
            <Skeleton h={200} />
          ) : (
            <TemplatesTable
              data={loyalty}
              onPage={loyalty.actions?.setPage}
              onOpen={loyalty.actions?.open}
            />
          )}
          <TemplateEditorDrawer
            open={!!loyalty.selected}
            template={loyalty.selected}
            onClose={loyalty.actions?.close}
            onSave={loyalty.actions?.save}
            onRollback={loyalty.actions?.rollback}
            onTest={loyalty.actions?.test}
          />
        </SectionCard>
      )}

      {/* CMS Blocks */}
      {tab === "cms" && (
        <SectionCard
          title="CMS Blocks"
          action={
            <CMSFiltersBar
              filters={cms.filters}
              onSearch={cms.actions?.setQuery}
              onLocation={cms.actions?.setLocation}
              onStatus={cms.actions?.setStatus}
            />
          }
        >
          {cms.loading ? (
            <Skeleton h={200} />
          ) : (
            <CMSBlocksTable
              data={cms}
              onPage={cms.actions?.setPage}
              onOpen={cms.actions?.open}
              onTogglePublish={cms.actions?.publish}
            />
          )}
          <CMSBlockEditorDrawer
            open={!!cms.selected}
            block={cms.selected}
            onClose={cms.actions?.close}
            onSave={cms.actions?.save}
          />
        </SectionCard>
      )}

      {/* Segments */}
      {tab === "segments" && (
        <>
          <SectionCard title="Segments">
            {seg.loading ? (
              <Skeleton h={160} />
            ) : (
              <SegmentsTable
                rows={seg.rows}
                onOpen={seg.actions?.open}
                onRemove={seg.actions?.remove}
              />
            )}
          </SectionCard>
          <SegmentBuilder
            open={!!seg.selected}
            segment={seg.selected}
            onClose={seg.actions?.close}
            onSave={seg.actions?.save}
            onEstimate={seg.actions?.estimate}
          />
        </>
      )}

      {/* Logs */}
      {tab === "logs" && (
        <SectionCard
          title="Delivery Logs"
          action={
            <LogsFiltersBar
              filters={logs.filters}
              onSearch={logs.actions?.setQuery}
              onChannel={logs.actions?.setChannel}
              onStatus={logs.actions?.setStatus}
              onExport={logs.actions?.exportCSV}
            />
          }
        >
          {logs.loading ? (
            <Skeleton h={200} />
          ) : (
            // use the fallback DeliveryLogsTable above
            <DeliveryLogsTable data={logs} onPage={logs.actions?.setPage} />
          )}
        </SectionCard>
      )}
    </div>
  );
}

function Skeleton({ h = 140 }) {
  return (
    <div
      className="rounded-2xl animate-pulse"
      style={{
        height: h,
        background: "linear-gradient(90deg,#0e1016,#11131a,#0e1016)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}
// ...existing code...

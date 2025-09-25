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

// Logs
import LogsFiltersBar from "../Components/messaging/logs/LogsFiltersBar";
import DeliveryLogsTable from "../Components/messaging/logs/DeliveryLogsTable";

// Hooks
import useTemplates from "../hooks/useTemplates";
import useAnnouncements from "../hooks/useAnnouncements";
import useCMS from "../hooks/useCMS";
import useSegments from "../hooks/useSegments";
import useLogs from "../hooks/useLogs";

export default function MessagingNotificationsCMS() {
  const [tab, setTab] = useState("templates");

  // hooks
  const templates = useTemplates("all");
  const loyalty = useTemplates("loyalty"); // re-use, category pre-filtered
  const ann = useAnnouncements();
  const cms = useCMS();
  const seg = useSegments();
  const logs = useLogs();

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
              borderColor: "rgba(110,86,207,0.25)",
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
              onSearch={templates.actions.setQuery}
              onEvent={templates.actions.setEvent}
              onChannel={templates.actions.setChannel}
              onCategory={templates.actions.setCategory}
              onExport={templates.actions.exportCSV}
            />
          }
        >
          {templates.loading ? (
            <Skeleton h={200} />
          ) : (
            <TemplatesTable
              data={templates}
              onPage={templates.actions.setPage}
              onOpen={templates.actions.open}
            />
          )}
          <TemplateEditorDrawer
            open={!!templates.selected}
            template={templates.selected}
            onClose={templates.actions.close}
            onSave={templates.actions.save}
            onRollback={templates.actions.rollback}
            onTest={templates.actions.test}
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
              onPage={ann.actions.setPage}
              onOpen={ann.actions.open}
            />
          )}
          <AnnouncementEditorDrawer
            open={!!ann.selected}
            announcement={ann.selected}
            segments={seg.rows}
            onClose={ann.actions.close}
            onSave={ann.actions.save}
            onSchedule={ann.actions.schedule}
          />
        </SectionCard>
      )}

      {/* Loyalty (reuses Templates with category=loyalty) */}
      {tab === "loyalty" && (
        <SectionCard
          title="Loyalty & Streaks Communications"
          action={
            <TemplateFiltersBar
              filters={loyalty.filters}
              onSearch={loyalty.actions.setQuery}
              onEvent={loyalty.actions.setEvent}
              onChannel={loyalty.actions.setChannel}
              onCategory={loyalty.actions.setCategory}
              onExport={loyalty.actions.exportCSV}
            />
          }
        >
          {loyalty.loading ? (
            <Skeleton h={200} />
          ) : (
            <TemplatesTable
              data={loyalty}
              onPage={loyalty.actions.setPage}
              onOpen={loyalty.actions.open}
            />
          )}
          <TemplateEditorDrawer
            open={!!loyalty.selected}
            template={loyalty.selected}
            onClose={loyalty.actions.close}
            onSave={loyalty.actions.save}
            onRollback={loyalty.actions.rollback}
            onTest={loyalty.actions.test}
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
              onSearch={cms.actions.setQuery}
              onLocation={cms.actions.setLocation}
              onStatus={cms.actions.setStatus}
            />
          }
        >
          {cms.loading ? (
            <Skeleton h={200} />
          ) : (
            <CMSBlocksTable
              data={cms}
              onPage={cms.actions.setPage}
              onOpen={cms.actions.open}
              onTogglePublish={cms.actions.publish}
            />
          )}
          <CMSBlockEditorDrawer
            open={!!cms.selected}
            block={cms.selected}
            onClose={cms.actions.close}
            onSave={cms.actions.save}
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
                onOpen={seg.actions.open}
                onRemove={seg.actions.remove}
              />
            )}
          </SectionCard>
          <SegmentBuilder
            open={!!seg.selected}
            segment={seg.selected}
            onClose={seg.actions.close}
            onSave={seg.actions.save}
            onEstimate={seg.actions.estimate}
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
              onSearch={logs.actions.setQuery}
              onChannel={logs.actions.setChannel}
              onStatus={logs.actions.setStatus}
              onExport={logs.actions.exportCSV}
            />
          }
        >
          {logs.loading ? (
            <Skeleton h={200} />
          ) : (
            <DeliveryLogsTable data={logs} onPage={logs.actions.setPage} />
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

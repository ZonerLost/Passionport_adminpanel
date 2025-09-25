import React, { useState } from "react";

// Shared + module components
import SectionCard from "../Components/ui/common/SectionCard";
import FiltersBar from "../Components/moderation/reports/FiltersBar";
import ReportsTable from "../Components/moderation/reports/ReportsTable";
import PreviewDrawer from "../Components/moderation/reports/PreviewDrawer";

import ContentFiltersBar from "../Components/moderation/browser/ContentFiltersBar";
import ContentGrid from "../Components/moderation/browser/ContentGrid";

import ReviewsTable from "../Components/moderation/reviews/ReviewsTable";

import ClubsApproval from "../Components/moderation/clubs/ClubsApproval";
import ClubsRoster from "../Components/moderation/clubs/ClubsRoster";
import ActivityHeatmap from "../Components/moderation/clubs/ActivityHeatmap";

import ChatMetaTable from "../Components/moderation/chat/ChatMetaTable";
import ChatGroupDetail from "../Components/moderation/chat/ChatGroupDetail";

import RulesEditor from "../Components/moderation/rules/RulesEditor";

// Hooks
import useReports from "../hooks/useReports";
import useContentBrowser from "../hooks/useContentBrowser";
import useReviews from "../hooks/useReviews";
import useClubs from "../hooks/useClubs";
import useChatMeta from "../hooks/useChatMeta";
import useRules from "../hooks/useRules";

// Data
import { fetchContent } from "../Data/moderation.service";

export default function ContentCommunityModeration() {
  const [tab, setTab] = useState("reports");

  const reports = useReports();
  const browser = useContentBrowser();
  const reviews = useReviews();
  const clubs = useClubs();
  const chats = useChatMeta();
  const rules = useRules();

  // For preview drawer, fetch content by id lazily
  const [previewContent, setPreviewContent] = useState(null);
  async function openReport(r) {
    reports.actions.setSelected(r);
    const list = await fetchContent({ query: r.contentId, pageSize: 1 });
    setPreviewContent(list.rows[0]);
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      <nav className="flex flex-wrap items-center gap-2 text-sm">
        {[
          ["reports", "Reports Inbox"],
          ["browser", "Content Browser"],
          ["reviews", "Reviews & Ratings"],
          ["clubs", "Clubs & Circles"],
          ["chat", "Chat Oversight"],
          ["rules", "Auto-Moderation Rules"],
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

      {/* Reports Inbox */}
      {tab === "reports" && (
        <SectionCard
          title="Reports Inbox"
          action={
            <FiltersBar
              filters={reports.filters}
              onSearch={reports.actions.setQuery}
              onType={reports.actions.setType}
              onSeverity={reports.actions.setSeverity}
            />
          }
        >
          {reports.loading ? (
            <Skeleton h={180} />
          ) : (
            <ReportsTable
              data={reports}
              onPage={reports.actions.setPage}
              onOpen={openReport}
              onApprove={async (id) => {
                await reports.actions.approve(id);
                reports.actions.reload();
              }}
              onHide={async (id) => {
                await reports.actions.hide(id);
                reports.actions.reload();
              }}
              onRemove={async (id) => {
                await reports.actions.remove(id);
                reports.actions.reload();
              }}
              onEscalate={async (id) => {
                await reports.actions.escalate(id);
                reports.actions.reload();
              }}
              onEvidence={async (id) => {
                const blob = await reports.actions.evidence(id);
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `evidence_${id}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            />
          )}
          <PreviewDrawer
            open={!!reports.selected}
            report={reports.selected}
            content={previewContent}
            onClose={() => {
              reports.actions.setSelected(null);
              setPreviewContent(null);
            }}
          />
        </SectionCard>
      )}

      {/* Content Browser */}
      {tab === "browser" && (
        <SectionCard
          title="Content Browser"
          action={
            <ContentFiltersBar
              filters={browser.filters}
              onSearch={browser.actions.setQuery}
              onFlagged={browser.actions.setFlagged}
              onBy={browser.actions.setBy}
            />
          }
        >
          {browser.loading ? (
            <Skeleton h={220} />
          ) : (
            <ContentGrid
              data={browser}
              onPage={browser.actions.setPage}
              onApprove={async (id) => {
                await browser.actions.approve(id);
                browser.actions.reload();
              }}
              onHide={async (id) => {
                await browser.actions.hide(id);
                browser.actions.reload();
              }}
              onRemove={async (id) => {
                await browser.actions.remove(id);
                browser.actions.reload();
              }}
            />
          )}
        </SectionCard>
      )}

      {/* Reviews & Ratings */}
      {tab === "reviews" && (
        <SectionCard title="Reviews & Ratings">
          {reviews.loading ? (
            <Skeleton h={180} />
          ) : (
            <ReviewsTable
              data={reviews}
              onPage={reviews.actions.setPage}
              onApprove={async (id) => {
                await reviews.actions.approve(id);
                reviews.actions.reload();
              }}
              onHide={async (id) => {
                await reviews.actions.hide(id);
                reviews.actions.reload();
              }}
              onRemove={async (id) => {
                await reviews.actions.remove(id);
                reviews.actions.reload();
              }}
              onEscalate={async (id) => {
                await reviews.actions.escalate(id);
                reviews.actions.reload();
              }}
            />
          )}
        </SectionCard>
      )}

      {/* Clubs & Circles */}
      {tab === "clubs" && (
        <>
          <SectionCard
            title="Creation Approvals"
            action={
              <label className="text-sm text-slate-300">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={clubs.filters.onlyPending}
                  onChange={(e) =>
                    clubs.actions.setOnlyPending(e.target.checked)
                  }
                />
                Pending only
              </label>
            }
          >
            {clubs.loading ? (
              <Skeleton h={160} />
            ) : (
              <ClubsApproval
                data={clubs}
                onPage={clubs.actions.setPage}
                onApprove={async (id) => {
                  await clubs.actions.approve(id);
                  clubs.actions.reload();
                }}
                onRemove={async (id) => {
                  await clubs.actions.remove(id);
                  clubs.actions.reload();
                }}
                onMute={async (id, h) => {
                  await clubs.actions.mute(id, h);
                  clubs.actions.reload();
                }}
              />
            )}
          </SectionCard>

          {!clubs.loading && (
            <>
              <ClubsRoster clubs={clubs.rows.slice(0, 6)} />
              <ActivityHeatmap clubs={clubs.rows.slice(0, 6)} />
            </>
          )}
        </>
      )}

      {/* Chat Oversight */}
      {tab === "chat" && (
        <SectionCard
          title="Chat Oversight"
          action={
            <input
              placeholder="Search chat groups"
              onChange={(e) => chats.actions.setQuery(e.target.value)}
              className="h-9 rounded-lg px-2 text-sm border"
              style={{
                background: "#0F1118",
                color: "#E6E8F0",
                borderColor: "rgba(110,86,207,0.25)",
              }}
            />
          }
        >
          {chats.loading ? (
            <Skeleton h={160} />
          ) : (
            <>
              <ChatMetaTable
                data={chats}
                onPage={chats.actions.setPage}
                onOpen={(g) => chats.actions.setSelected(g)}
                onMute={async (id, h) => {
                  await chats.actions.mute(id, h);
                  chats.actions.reload();
                }}
                onEscalate={async (id) => {
                  await chats.actions.escalate(id);
                  chats.actions.reload();
                }}
              />
              <ChatGroupDetail
                open={!!chats.selected}
                group={chats.selected}
                onClose={() => chats.actions.setSelected(null)}
              />
            </>
          )}
        </SectionCard>
      )}

      {/* Auto-Moderation Rules */}
      {tab === "rules" && (
        <SectionCard title="Auto-Moderation Rules">
          {rules.loading ? (
            <Skeleton h={140} />
          ) : (
            <RulesEditor data={rules.data} onSave={rules.save} />
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

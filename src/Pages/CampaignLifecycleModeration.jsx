import React, { useState } from "react";
import SectionCard from "../Components/ui/common/SectionCard";
import FiltersBar from "../Components/campaigns/Queue/FiltersBar";
import CampaignsTable from "../Components/campaigns/Queue/CampaignsTable";
import CampaignAdminDetail from "../Components/campaigns/Detail/CampaignAdminDetail";
import UpdateReviewPane from "../Components/campaigns/Updates/UpdateReviewPane";
import ChallengeAssignment from "../Components/campaigns/Challenges/ChallengeAssignment";
import useCampaignQueue from "../hooks/useCampaignQueue";
import useCampaignDetail from "../hooks/useCampaignDetail";
import useUpdateReview from "../hooks/useUpdateReview";
import useChallenges from "../hooks/useChallenges";

export default function CampaignLifecycleModeration() {
  const [tab, setTab] = useState("queue");
  const queue = useCampaignQueue();
  const [selected, setSelected] = useState(null);
  const detail = useCampaignDetail(selected?.id);
  const review = useUpdateReview(detail.data, detail.reload);
  const challenges = useChallenges(detail.data);

  const tabs = [
    { key: "queue", label: "Campaign Queue" },
    { key: "detail", label: "Campaign Detail", requiresSelection: true },
    { key: "updates", label: "Updates Review", requiresSelection: true },
    { key: "challenges", label: "Challenges", requiresSelection: true },
  ];
  const hasSelection = Boolean(selected?.id);
  const pendingUpdates = review.list || [];

  async function bulkApprove(ids) {
    if (!ids?.length) return;
    await queue.actions.bulkApprove(ids);
    await queue.actions.reload();
  }

  async function bulkReject(ids) {
    if (!ids?.length) return;
    await Promise.all(ids.map((id) => queue.actions.reject(id, "Not a fit")));
    await queue.actions.reload();
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Tabs */}
      <nav className="flex items-center text-gray-400 gap-2 text-sm">
        {tabs.map(({ key, label, requiresSelection }) => {
          const inactive = requiresSelection && !hasSelection;
          return (
            <button
              type="button"
              key={key}
              onClick={() => setTab(key)}
              className={`h-9 px-3 rounded-lg border transition ${
                tab === key ? "text-white" : "text-slate-300"
              } ${inactive ? "opacity-60" : ""}`}
              style={{
                borderColor: "rgba(255,122,0,0.25)",
                background: tab === key ? "#0F1118" : "transparent",
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {/* Queue */}
      {tab === "queue" && (
        <SectionCard
          title="Campaign Queue"
          action={
            <FiltersBar
              filters={queue.filters}
              onSearch={queue.actions.setQuery}
              onStatus={queue.actions.setStatus}
            />
          }
        >
          {queue.loading ? (
            <div
              className="h-40 rounded-xl animate-pulse"
              style={{
                background: "linear-gradient(90deg,#0e1016,#11131a,#0e1016)",
                backgroundSize: "200% 100%",
              }}
            />
          ) : (
            <CampaignsTable
              data={queue}
              selectedIds={queue.actions.selectedIds}
              setSelectedIds={queue.actions.setSelectedIds}
              onApprove={bulkApprove}
              onReject={bulkReject}
              onRequire={async (id) => {
                await queue.actions.requireChanges(
                  id,
                  "Please adjust rewards copy"
                );
                queue.actions.reload();
              }}
              onPause={async (id) => {
                await queue.actions.pause(id);
                queue.actions.reload();
              }}
              onTerminate={async (id) => {
                await queue.actions.terminate(id);
                queue.actions.reload();
              }}
              onAssign={async (id, mod) => {
                await queue.actions.assignModerator(id, mod);
                queue.actions.reload();
              }}
              onPage={queue.actions.setPage}
              onSelectRow={(row) => {
                setSelected(row);
                setTab("detail");
              }}
            />
          )}
        </SectionCard>
      )}

      {/* Detail */}
      {tab === "detail" &&
        (detail.loading ? (
          <SectionCard title="Campaign Detail">
            <div className="text-sm text-slate-300">
              Loading selected campaign...
            </div>
          </SectionCard>
        ) : detail.data ? (
          <CampaignAdminDetail
            data={detail.data}
            onPinTestimonial={(tid, pinned) => detail.pin(tid, pinned)}
          />
        ) : (
          <SectionCard title="Campaign Detail">
            <div className="text-sm text-slate-400">
              Select a campaign from the queue to view its detail.
            </div>
          </SectionCard>
        ))}

      {/* Updates Review */}
      {tab === "updates" &&
        (detail.loading ? (
          <SectionCard title="Updates Review">
            <div className="text-sm text-slate-300">
              Loading updates for the selected campaign...
            </div>
          </SectionCard>
        ) : detail.data ? (
          pendingUpdates.length ? (
            <UpdateReviewPane
              updates={pendingUpdates}
              onApprove={review.approve}
              onRollback={review.rollback}
              onSchedule={review.schedule}
              onBackerOnly={review.setBackerOnly}
            />
          ) : (
            <SectionCard title="Updates Review">
              <div className="text-sm text-slate-400">
                No pending updates for {detail.data.title}.
              </div>
            </SectionCard>
          )
        ) : (
          <SectionCard title="Updates Review">
            <div className="text-sm text-slate-400">
              Select a campaign from the queue to review updates.
            </div>
          </SectionCard>
        ))}

      {/* Challenges */}
      {tab === "challenges" &&
        (detail.loading ? (
          <SectionCard title="Challenges">
            <div className="text-sm text-slate-300">
              Loading challenges for the selected campaign...
            </div>
          </SectionCard>
        ) : detail.data ? (
          <ChallengeAssignment
            all={challenges.all}
            assigned={challenges.assigned}
            onAssign={challenges.assign}
          />
        ) : (
          <SectionCard title="Challenges">
            <div className="text-sm text-slate-400">
              Select a campaign from the queue to manage challenges.
            </div>
          </SectionCard>
        ))}
    </div>
  );
}

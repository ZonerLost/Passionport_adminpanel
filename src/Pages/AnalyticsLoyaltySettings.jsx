import React, { useState } from "react";

import useEngagementAnalytics from "../hooks/useEngagementAnalytics";
import useSearchDiscovery from "../hooks/useSearchDiscovery";
import useLoyalty from "../hooks/useLoyalty";
import useSettings from "../hooks/useSettings";
import useAccessAudit from "../hooks/useAccessAudit";
import usePrivacy from "../hooks/usePrivacy";

import EngagementAnalytics from "../Components/LoyaltySettings/analytics/EngagementAnalytics";
import SearchDiscovery from "../Components/LoyaltySettings/analytics/SearchDiscovery";
import LoyaltyEditor from "../Components/LoyaltySettings/loyalty/LoyaltyEditor";
import Leaderboard from "../Components/LoyaltySettings/loyalty/Leaderboard";
import PlatformSettings from "../Components/LoyaltySettings/settings/PlatformSettings";
import AccessAudit from "../Components/LoyaltySettings/settings/AccessAudit";
import PrivacyLegal from "../Components/LoyaltySettings/settings/PrivacyLegal";

export default function AnalyticsLoyaltySettings() {
  const [tab, setTab] = useState("analytics");

  const engage = useEngagementAnalytics();
  const search = useSearchDiscovery();
  const loyalty = useLoyalty();
  const settings = useSettings();
  const access = useAccessAudit();
  const privacy = usePrivacy();

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Tabs */}
      <nav className="flex flex-wrap items-center gap-2 text-sm">
        {[
          ["analytics", "Engagement Analytics"],
          ["loyalty", "Loyalty & Badges"],
          ["search", "Search & Discovery"],
          ["settings", "Platform Settings"],
          ["access", "Access & Audit"],
          ["privacy", "Privacy & Legal"],
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

      {/* Analytics */}
      {tab === "analytics" &&
        (engage.loading ? (
          <Skeleton h={300} />
        ) : (
          <EngagementAnalytics data={engage.data} />
        ))}

      {/* Loyalty */}
      {tab === "loyalty" &&
        (loyalty.loading ? (
          <Skeleton h={240} />
        ) : (
          <>
            <LoyaltyEditor
              tiers={loyalty.tiers}
              rules={loyalty.rules}
              streak={loyalty.streak}
              challenges={loyalty.challenges}
              onSave={loyalty.save}
              onSimulate={loyalty.simulate}
            />
            <Leaderboard rows={loyalty.leaderboard} />
          </>
        ))}

      {/* Search */}
      {tab === "search" &&
        (search.loading ? (
          <Skeleton h={180} />
        ) : (
          <SearchDiscovery data={search.data} />
        ))}

      {/* Platform Settings */}
      {tab === "settings" &&
        (settings.loading ? (
          <Skeleton h={180} />
        ) : (
          <PlatformSettings data={settings.data} onSave={settings.save} />
        ))}

      {/* Access & Audit */}
      {tab === "access" &&
        (access.loading ? (
          <Skeleton h={220} />
        ) : (
          <AccessAudit
            access={access.access}
            logs={access.logs}
            onRotate={access.rotateKey}
            onAddWebhook={access.addWebhook}
            onTestWebhook={access.testWebhook}
            onSaveSso={access.saveSso}
            onPageLogs={access.pageLogs}
          />
        ))}

      {/* Privacy & Legal */}
      {tab === "privacy" &&
        (privacy.loading ? (
          <Skeleton h={180} />
        ) : (
          <PrivacyLegal
            data={privacy.data}
            onSave={privacy.save}
            onAdvanceExport={privacy.advanceExport}
            onAdvanceDelete={privacy.advanceDelete}
          />
        ))}
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

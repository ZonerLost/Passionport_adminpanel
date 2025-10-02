import React, { useState } from "react";
import SectionCard from "../Components/ui/common/SectionCard";
import Pagination from "../Components/ui/common/Pagination";

import FansFiltersBar from "../Components/fans/FansFiltersBar";
import FansTable from "../Components/fans/FansTable";
import FanDetailDrawer from "../Components/fans/FanDetailDrawer";

import useFans from "../hooks/useFans";

export default function Fans() {
  const fans = useFans();
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <SectionCard
        title="Fans"
        action={
          <FansFiltersBar
            filters={fans.filters}
            onSearch={fans.actions.setQuery}
            onStatus={fans.actions.setStatus}
            onVerification={fans.actions.setVerification}
          />
        }
      >
        {fans.loading ? (
          <Skeleton h={220} />
        ) : (
          <>
            <FansTable
              rows={fans.rows}
              onOpen={(id) => fans.actions.open(id).then(setSelected)}
            />
            <div className="mt-3">
              <Pagination
                page={fans.page}
                total={fans.total}
                pageSize={fans.pageSize}
                onPage={fans.actions.setPage}
              />
            </div>
          </>
        )}

        <FanDetailDrawer
          open={!!selected}
          data={selected}
          onClose={() => setSelected(null)}
          onSuspend={(days) => fans.actions.suspend(selected.user.id, days)}
          onBan={(reason) => fans.actions.ban(selected.user.id, reason)}
          onDelete={() => fans.actions.remove(selected.user.id)}
          onReset2FA={() => fans.actions.reset2FA(selected.user.id)}
          onResetPassword={() => fans.actions.resetPassword(selected.user.id)}
          onExportGDPR={async () => {
            const blob = await fans.actions.exportGDPR(selected.user.id);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${selected.user.handle}_gdpr.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        />
      </SectionCard>
    </div>
  );
}

function Skeleton({ h = 160 }) {
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

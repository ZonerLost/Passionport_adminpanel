// ...existing code...
import React, { useState } from "react";
import SectionCard from "../Components/ui/common/SectionCard";
import Pagination from "../Components/ui/common/Pagination";
import FiltersBar from "../Components/UsersPage/FiltersBar";
// fixed import casing to match filesystem (Components with capital C)
import DirectoryTable from "../Components/UsersPage/DirectoryTable";
import UserProfileDrawer from "../Components/UsersPage/UserProfileDrawer";
import RolePermissionManager from "../Components/UsersPage/RolePermissionManager";
import KycQueue from "../Components/UsersPage/KycQueue";
import useUsersDirectory from "../hooks/useUsersDirectory";
import useRoles from "../hooks/useRoles";
import useKycQueue from "../hooks/useKycQueue";

export default function UsersRolesVerification() {
  const [tab, setTab] = useState("directory");

  // Directory state/actions
  const dir = useUsersDirectory();
  const [selected, setSelected] = useState(null);

  async function handleAction(fnName, user, args) {
    const map = dir.actions;
    if (!map || !map[fnName]) return;
    const res = await map[fnName](
      user.id,
      args?.role || args?.days || args?.reason
    );
    // If export, prompt download
    if (fnName === "exportUserData" && res instanceof Blob) {
      const url = URL.createObjectURL(res);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${user.handle}_data.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    if (dir.actions.reload) await dir.actions.reload();
  }

  // Roles state/actions
  const roles = useRoles();

  // KYC state/actions
  const kyc = useKycQueue();

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Tabs */}
      <nav className="flex items-center gap-2 text-sm">
        {[
          ["directory", "Directory"],
          ["roles", "Roles & Permissions"],
          ["kyc", "Verification / KYC"],
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

      {/* Directory */}
      {tab === "directory" && (
        <SectionCard
          title="Users Directory"
          action={
            <FiltersBar
              filters={dir.filters}
              onSearch={dir.actions?.setQuery}
              onType={dir.actions?.setType}
              onRole={dir.actions?.setRole}
              onStatus={dir.actions?.setStatus}
            />
          }
        >
          {dir.loading ? (
            <div
              className="h-40 rounded-xl animate-pulse"
              style={{
                background: "linear-gradient(90deg,#0e1016,#11131a,#0e1016)",
                backgroundSize: "200% 100%",
              }}
            />
          ) : (
            <>
              <DirectoryTable
                rows={dir.rows}
                onSelect={setSelected}
                onAction={handleAction}
              />
              <div className="mt-3">
                <Pagination
                  page={dir.page}
                  total={dir.total}
                  pageSize={dir.pageSize}
                  onPage={dir.actions?.setPage}
                />
              </div>
            </>
          )}
          <UserProfileDrawer
            open={!!selected}
            user={selected}
            onClose={() => setSelected(null)}
          />
        </SectionCard>
      )}

      {/* Roles & Permissions */}
      {tab === "roles" && (
        <RolePermissionManager roles={roles.roles} onUpdate={roles.update} />
      )}

      {/* KYC Queue */}
      {tab === "kyc" && (
        <KycQueue
          data={kyc}
          status={kyc.status}
          setStatus={kyc.setStatus}
          onApprove={async (id) => {
            await kyc.approveKyc(id);
            kyc.reload();
          }}
          onReject={async (id) => {
            await kyc.rejectKyc(id);
            kyc.reload();
          }}
          onRequestDocs={async (id) => {
            await kyc.requestMoreDocs(id, "Please upload bank statement");
            kyc.reload();
          }}
          onPage={kyc.setPage}
        />
      )}
    </div>
  );
}
// ...existing code...

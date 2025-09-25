import React, { useState } from "react";
import Dialog from "../ui/common/Dialog";

export default function UserRowActions({ user, onAction }) {
  const [modal, setModal] = useState(null);

  const open = (type) => setModal({ type });
  const close = () => setModal(null);

  const run = async (fn, args = {}) => {
    await onAction?.(fn, user, args);
    close();
  };

  return (
    <div className="flex items-center gap-2">
      <button className="text-xs underline" onClick={() => open("promote")}>
        Promote/Demote
      </button>
      <button className="text-xs underline" onClick={() => open("suspend")}>
        Suspend
      </button>
      <button className="text-xs underline" onClick={() => open("ban")}>
        Ban
      </button>
      <button className="text-xs underline" onClick={() => run("reset2FA")}>
        Reset 2FA
      </button>
      <button
        className="text-xs underline"
        onClick={() => run("forcePasswordReset")}
      >
        Force PW Reset
      </button>
      <button
        className="text-xs underline"
        onClick={() => run("signOutAllDevices")}
      >
        Sign-out all
      </button>
      <button
        className="text-xs underline"
        onClick={() => run("exportUserData")}
      >
        GDPR Export
      </button>
      <button className="text-xs underline" onClick={() => open("delete")}>
        GDPR Delete
      </button>

      {/* Promote modal */}
      <Dialog
        open={modal?.type === "promote"}
        title={`Change role for ${user.name}`}
        onClose={close}
        onConfirm={() =>
          run("promote", {
            role: document.getElementById("roleSel_" + user.id).value,
          })
        }
      >
        <select
          id={`roleSel_${user.id}`}
          className="h-9 w-full rounded-lg px-2 text-sm border"
          style={{
            background: "#0F1118",
            color: "#E6E8F0",
            borderColor: "rgba(110,86,207,0.25)",
          }}
          defaultValue={user.role}
        >
          {[
            "Admin",
            "Support",
            "Finance",
            "Moderator",
            "BrandOwner",
            "Fan",
          ].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </Dialog>

      {/* Suspend */}
      <Dialog
        open={modal?.type === "suspend"}
        title={`Suspend ${user.name}?`}
        onClose={close}
        onConfirm={() => run("suspend", { days: 7 })}
      >
        <p className="text-sm text-slate-300">
          This user will be suspended for 7 days.
        </p>
      </Dialog>

      {/* Ban */}
      <Dialog
        open={modal?.type === "ban"}
        title={`Ban ${user.name}?`}
        onClose={close}
        onConfirm={() => run("ban", { reason: "Policy violation" })}
      >
        <p className="text-sm text-slate-300">
          Hard ban with reason "Policy violation".
        </p>
      </Dialog>

      {/* Delete */}
      <Dialog
        open={modal?.type === "delete"}
        title={`Delete ${user.name}'s data?`}
        onClose={close}
        onConfirm={() => run("deleteUser")}
      >
        <p className="text-sm text-slate-300">GDPR erasure cannot be undone.</p>
      </Dialog>
    </div>
  );
}

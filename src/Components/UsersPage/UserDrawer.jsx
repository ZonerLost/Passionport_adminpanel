import React from "react";
import Drawer from "../ui/common/Drawer";

const ROLES = ["admin", "Fan", "BrandOwner"];
const TYPES = ["brand", "fan", "creator"];

export default function UserDrawer({ open, onClose, initial, onSubmit }) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    role: "staff",
    type: "fan",
    handle: "",
  });

  React.useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name ?? "",
        email: initial.email ?? "",
        role: initial.role ?? "staff",
        type: initial.type ?? "fan",
        handle: initial.handle ?? "",
      });
    } else {
      setForm({ name: "", email: "", role: "staff", type: "fan", handle: "" });
    }
  }, [initial, open]);

  function update(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={initial ? "Edit User" : "Add New User"}
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit?.(form)}
            className="px-4 py-2 rounded-lg bg-[#6E56CF] text-white hover:bg-[#5b47b5]"
          >
            {initial ? "Save Changes" : "Create User"}
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Full Name</label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-lg bg-[#161821] border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-[rgba(110,86,207,0.35)]"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-lg bg-[#161821] border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-[rgba(110,86,207,0.35)]"
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Handle</label>
          <input
            value={form.handle}
            onChange={(e) => update("handle", e.target.value)}
            className="w-full rounded-lg bg-[#161821] border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-[rgba(110,86,207,0.35)]"
            placeholder="@jane"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              className="w-full rounded-lg bg-[#161821] border border-white/10 px-3 py-2 text-white"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
              className="w-full rounded-lg bg-[#161821] border border-white/10 px-3 py-2 text-white"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

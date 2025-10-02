import React from "react";
import DirectoryTable from "../Components/UsersPage/DirectoryTable";
import UserDrawer from "../Components/UsersPage/UserDrawer";
import useUsersDirectory from "../hooks/useUsersDirectory";

export default function UsersRolesVerification() {
  const dir = useUsersDirectory();

  // Drawer state
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);

  // Search + filters
  const [q, setQ] = React.useState("");
  const [role, setRole] = React.useState("all");
  const [type, setType] = React.useState("all");

  // Derived rows with client-side filtering (safe even if API has no filters)
  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    return (dir.rows || []).filter((u) => {
      const matchesQ =
        !needle ||
        [u.name, u.email, u.handle].some((v) =>
          String(v || "")
            .toLowerCase()
            .includes(needle)
        );

      const matchesRole =
        role === "all" || String(u.role || "").toLowerCase() === role;
      const matchesType =
        type === "all" || String(u.type || "").toLowerCase() === type;

      return matchesQ && matchesRole && matchesType;
    });
  }, [dir.rows, q, role, type]);

  // Row actions coming from the table (kebab menu)
  function onAction(action, user) {
    if (action === "edit") {
      setEditing(user);
      setDrawerOpen(true);
    }
    if (action === "delete") {
      handleDelete(user);
    }
  }

  // Toolbar handlers
  function handleAdd() {
    setEditing(null);
    setDrawerOpen(true);
  }

  // Create/Update/Delete using your dir.actions mapping if available
  async function handleCreate(payload) {
    if (dir.actions?.createUser) {
      await dir.actions.createUser(payload);
    }
    setDrawerOpen(false);
    setEditing(null);
    if (dir.actions?.reload) await dir.actions.reload();
  }

  async function handleUpdate(payload) {
    if (editing?.id && dir.actions?.updateUser) {
      await dir.actions.updateUser(editing.id, payload);
    }
    setDrawerOpen(false);
    setEditing(null);
    if (dir.actions?.reload) await dir.actions.reload();
  }

  async function handleDelete(user) {
    if (dir.actions?.deleteUser) {
      await dir.actions.deleteUser(user.id);
    }
    if (dir.actions?.reload) await dir.actions.reload();
  }

  // Collect distinct role/type options from data for filter dropdowns
  const roleOptions = React.useMemo(() => {
    const set = new Set();
    (dir.rows || []).forEach(
      (u) => u?.role && set.add(String(u.role).toLowerCase())
    );
    return ["all", ...Array.from(set).sort()];
  }, [dir.rows]);

  const typeOptions = React.useMemo(() => {
    const set = new Set();
    (dir.rows || []).forEach(
      (u) => u?.type && set.add(String(u.type).toLowerCase())
    );
    return ["all", ...Array.from(set).sort()];
  }, [dir.rows]);

  if (dir.loading) {
    return (
      <div
        className="h-40 rounded-xl animate-pulse"
        style={{
          background: "linear-gradient(90deg,#0e1016,#11131a,#0e1016)",
          backgroundSize: "200% 100%",
        }}
      />
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Toolbar: Title, Add, Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-white text-lg font-semibold">Users</h2>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, handle, email…"
              className="w-[220px] rounded-lg bg-[#161821] border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-[rgba(255,122,0,0.35)]"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-lg bg-[#161821] border border-white/10 px-3 py-2 text-white"
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>
                  Role: {r}
                </option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg bg-[#161821] border border-white/10 px-3 py-2 text-white"
            >
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  Type: {t}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg bg-[#ff7a00] text-white hover:bg-[#e26900]"
          >
            Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <DirectoryTable rows={filtered} onSelect={() => {}} onAction={onAction} />

      {/* Drawer for Add/Edit */}
      <UserDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditing(null);
        }}
        initial={editing}
        onSubmit={(data) => (editing ? handleUpdate(data) : handleCreate(data))}
      />
    </div>
  );
}

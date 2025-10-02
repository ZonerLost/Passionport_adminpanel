import React from "react";
import Avatar from "../ui/common/Avatar";
import { RoleBadge } from "../ui/common/Badge";
import { LuEllipsisVertical } from "react-icons/lu";

function KebabMenu({ onEdit, onDelete }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function onDocClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-md hover:bg-white/10"
        aria-label="Open actions"
      >
        <LuEllipsisVertical className="text-slate-300" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-36 rounded-lg border border-white/10 bg-[#161821] shadow-lg ring-1 ring-black/5">
          <button
            className="w-full px-3 py-2 text-left text-slate-200 hover:bg-white/5"
            onClick={() => {
              setOpen(false);
              onEdit?.();
            }}
          >
            Edit
          </button>
          <button
            className="w-full px-3 py-2 text-left text-red-300 hover:bg-white/5"
            onClick={() => {
              setOpen(false);
              onDelete?.();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default function DirectoryTable({ rows, onSelect, onAction }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[900px] w-full text-sm">
        <thead>
          <tr
            className="text-left text-xs uppercase"
            style={{ color: "#A3A7B7" }}
          >
            <th className="px-3 py-2">User</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Role</th>
            {/* Status column removed */}
            <th className="px-3 py-2">Created</th>
            <th className="px-3 py-2 text-right w-0">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y text-gray-400 divide-[rgba(255,122,0,0.15)]">
          {rows.map((u) => (
            <tr key={u.id} className="hover:bg-white/5">
              <td className="px-3 py-2">
                <button
                  className="inline-flex items-center gap-2"
                  onClick={() => onSelect?.(u)}
                >
                  <Avatar name={u.name} />
                  <div className="text-left">
                    <div className="text-white font-medium">{u.name}</div>
                    <div className="text-slate-400 text-xs">@{u.handle}</div>
                  </div>
                </button>
              </td>

              <td className="px-3 py-2 text-slate-300">{u.email}</td>

              <td className="px-3 py-2">
                <RoleBadge role={u.type} />
              </td>

              <td className="px-3 py-2">
                <RoleBadge role={u.role} />
              </td>

              {/* Status cell removed */}

              <td className="px-3 py-2 text-slate-300">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>

              <td className="px-3 py-2 text-right">
                <KebabMenu
                  onEdit={() => onAction?.("edit", u)}
                  onDelete={() => onAction?.("delete", u)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

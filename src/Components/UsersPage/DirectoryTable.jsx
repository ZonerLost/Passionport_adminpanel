import React from "react";
import Avatar from "../ui/common/Avatar";
import { RoleBadge, StatusBadge } from "../ui/common/Badge";
import UserRowActions from "./UserRowActions";

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
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Created</th>
            <th className="px-3 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y text-gray-400 divide-[rgba(110,86,207,0.15)]">
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
              <td className="px-3 py-2">
                <StatusBadge status={u.status} />
              </td>
              <td className="px-3 py-2 text-slate-300">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
              <td className="px-3 py-2 text-right">
                <UserRowActions user={u} onAction={onAction} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

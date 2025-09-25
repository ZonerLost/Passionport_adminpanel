import { makeRoles } from "./roles.fixtures";
let ROLES = makeRoles();

export async function fetchRoles() {
  return ROLES;
}
export async function updateRolePermissions(roleId, permissions) {
  ROLES = ROLES.map((r) =>
    r.id === roleId ? { ...r, permissions: [...new Set(permissions)] } : r
  );
  return { ok: true };
}

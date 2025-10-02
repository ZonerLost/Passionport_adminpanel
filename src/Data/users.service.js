import { makeUsers } from "./users.fixtures";
import { mapUser } from "./users.mappers";

let DB = makeUsers(80);

export async function fetchUsers({
  query = "",
  type = "all",
  role = "all",
  status = "all",
  page = 1,
  pageSize = 10,
}) {
  const norm = (s) => String(s || "").toLowerCase();
  let rows = DB.filter((u) =>
    [u.name, u.email, u.handle, u.phone].some((x) =>
      norm(x).includes(norm(query))
    )
  );
  if (type !== "all") rows = rows.filter((u) => u.type === type);
  if (role !== "all") rows = rows.filter((u) => u.role === role);
  if (status !== "all") rows = rows.filter((u) => u.status === status);
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { total, page, pageSize, rows: rows.slice(start, end).map(mapUser) };
}

export async function fetchUserById(id) {
  return mapUser(DB.find((u) => u.id === id));
}

export async function createUser(payload) {
  const id = String(Date.now()) + Math.floor(Math.random() * 1000);
  const now = new Date().toISOString();
  const newUser = {
    id,
    name: payload.name || "New User",
    handle: payload.handle || "new_user",
    email: payload.email || "",
    phone: payload.phone || "",
    type: payload.type || "fan",
    role: payload.role || "Fan",
    status: payload.status || "active",
    createdAt: now,
    orders: 0,
    backings: 0,
    clubs: 0,
    strikes: 0,
    devices: [],
    sessions: 0,
  };
  DB = [newUser, ...DB];
  return mapUser(newUser);
}

export async function updateUser(id, payload) {
  DB = DB.map((u) => (u.id === id ? { ...u, ...payload } : u));
  return mapUser(DB.find((u) => u.id === id));
}

export async function promoteUserRole(id, role) {
  DB = DB.map((u) => (u.id === id ? { ...u, role } : u));
  return { ok: true };
}
export async function suspendUser(id, days = 7) {
  DB = DB.map((u) => (u.id === id ? { ...u, status: "suspended" } : u));
  return { ok: true, until: new Date(Date.now() + days * 864e5).toISOString() };
}
export async function banUser(id, reason) {
  DB = DB.map((u) => (u.id === id ? { ...u, status: "banned" } : u));
  return { ok: true, reason };
}
export async function reset2FA() {
  return { ok: true };
}
export async function forcePasswordReset() {
  return { ok: true };
}
export async function signOutAllDevices(id) {
  DB = DB.map((u) => (u.id === id ? { ...u, sessions: 0 } : u));
  return { ok: true };
}
export async function exportUserData(id) {
  const u = DB.find((x) => x.id === id);
  return new Blob([JSON.stringify(u, null, 2)], { type: "application/json" });
}
export async function deleteUser(id) {
  DB = DB.filter((u) => u.id !== id);
  return { ok: true };
}

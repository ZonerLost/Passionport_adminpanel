export const DEFAULT_PERMS = {
  Fan: ["read"],
  BrandOwner: ["read", "create", "update"],
  Admin: ["read", "create", "update", "delete"],
};

const ROLES = ["Admin", "Fan", "BrandOwner"];
const TYPES = ["Fan", "Brand", "Admin"];
const STATUSES = ["active", "suspended", "banned", "pending"];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function makeUsers(n = 42) {
  return Array.from({ length: n }, (_, i) => {
    const type = pick(TYPES);
    const role =
      type === "Admin" ? pick(ROLES) : type === "Brand" ? "BrandOwner" : "Fan";
    const status = pick(STATUSES);
    const createdAt = new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 120
    ).toISOString();
    return {
      id: `u_${i + 1}`,
      handle: `user${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@mail.test`,
      phone: `+1-555-01${(i + 1).toString().padStart(2, "0")}`,
      type,
      role,
      status,
      createdAt,
      sessions: Math.floor(Math.random() * 5),
      devices: ["iOS", "Android", "Web"].slice(
        0,
        1 + Math.floor(Math.random() * 3)
      ),
      orders: Math.floor(Math.random() * 30),
      backings: Math.floor(Math.random() * 20),
      clubs: Math.floor(Math.random() * 5),
      strikes: Math.floor(Math.random() * 3),
    };
  });
}

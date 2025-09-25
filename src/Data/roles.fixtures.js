export const DEFAULT_PERMS = [
  "users.read",
  "users.write",
  "campaigns.read",
  "campaigns.moderate",
  "orders.read",
  "orders.refund",
  "payments.read",
  "payouts.manage",
  "content.flag",
  "content.remove",
  "audit.read",
];

export function makeRoles() {
  return [
    {
      id: "r_admin",
      name: "Admin",
      permissions: [...DEFAULT_PERMS, "settings.write"],
    },
    {
      id: "r_support",
      name: "Support",
      permissions: [
        "users.read",
        "campaigns.read",
        "content.flag",
        "content.remove",
        "audit.read",
      ],
    },
    {
      id: "r_finance",
      name: "Finance",
      permissions: [
        "payments.read",
        "payouts.manage",
        "orders.refund",
        "audit.read",
      ],
    },
    {
      id: "r_moderator",
      name: "Moderator",
      permissions: [
        "campaigns.read",
        "content.flag",
        "content.remove",
        "audit.read",
      ],
    },
    {
      id: "r_brand",
      name: "BrandOwner",
      permissions: ["campaigns.read", "users.read"],
    },
  ];
}

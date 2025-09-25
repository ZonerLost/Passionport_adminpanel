import { useEffect, useState } from "react";
import { fetchRoles, updateRolePermissions } from "../Data/roles.service";

export default function useRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setRoles(await fetchRoles());
      setLoading(false);
    })();
  }, []);

  async function update(roleId, permissions) {
    await updateRolePermissions(roleId, permissions);
    setRoles(await fetchRoles());
  }

  return { roles, loading, update };
}

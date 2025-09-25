import { useCallback, useMemo } from "react";
import {
  approveUpdate,
  rollbackUpdate,
  scheduleUpdate,
  setBackerOnlyVisibility,
} from "../Data/campaigns.service";

export default function useUpdateReview(campaign, refresh) {
  const list = useMemo(
    () =>
      (campaign?.updates || []).filter(
        (u) => u.pendingApproval || u.scheduledAt
      ),
    [campaign]
  );

  const approve = useCallback(
    async (id) => {
      await approveUpdate(campaign.id, id);
      await refresh();
    },
    [campaign, refresh]
  );
  const rollback = useCallback(
    async (id) => {
      await rollbackUpdate(campaign.id, id);
      await refresh();
    },
    [campaign, refresh]
  );
  const schedule = useCallback(
    async (id, whenIso) => {
      await scheduleUpdate(campaign.id, id, whenIso);
      await refresh();
    },
    [campaign, refresh]
  );
  const setBackerOnly = useCallback(
    async (id, v) => {
      await setBackerOnlyVisibility(campaign.id, id, v);
      await refresh();
    },
    [campaign, refresh]
  );

  return { list, approve, rollback, schedule, setBackerOnly };
}

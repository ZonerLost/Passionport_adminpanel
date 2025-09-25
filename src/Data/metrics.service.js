import {
  mockExec,
  mockRevenue,
  mockTrustSafety,
  mockSystem,
} from "./metrics.fixtures";
import {
  mapExec,
  mapRevenue,
  mapTrustSafety,
  mapSystem,
} from "./metrics.mappers";

export async function getExecutiveOverview() {
  // TODO: replace with fetch('/api/overview/exec')
  return mapExec(mockExec());
}

export async function getRevenueSnapshot() {
  // TODO: replace with fetch('/api/overview/revenue')
  return mapRevenue(mockRevenue());
}

export async function getTrustSafetyPulse() {
  // TODO: replace with fetch('/api/overview/trust-safety')
  return mapTrustSafety(mockTrustSafety());
}

export async function getSystemHealth() {
  // TODO: replace with fetch('/api/overview/system')
  return mapSystem(mockSystem());
}

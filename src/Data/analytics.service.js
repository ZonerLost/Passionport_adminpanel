import {
  makeFunnel,
  makeCohorts,
  makeCreatorPerf,
  makeClubs,
  makeSearch,
} from "./analytics.fixtures";
export async function fetchEngagement() {
  return {
    funnel: makeFunnel(),
    cohorts: makeCohorts(),
    creators: makeCreatorPerf(),
    clubs: makeClubs(),
  };
}
export async function fetchSearchDiscovery() {
  return makeSearch();
}

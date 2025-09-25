import { DEFAULT_RULES } from "./rules.fixtures";
let RULES = { ...DEFAULT_RULES };

export async function fetchRules() {
  return RULES;
}
export async function saveRules(next) {
  RULES = { ...RULES, ...next };
  return { ok: true };
}

export function evaluateAuto(content) {
  const res = { matched: [], action: null };
  const text = (content.text || "").toLowerCase();
  const hit = RULES.keywords.find((k) => text.includes(k));
  if (hit) res.matched.push({ type: "keyword", value: hit });
  if (
    content.media?.some(
      (m) => (m.nudityScore || 0) >= RULES.image.nudityThreshold
    )
  )
    res.matched.push({ type: "image", value: "nudity" });
  if ((content.linkRisk || 0) >= RULES.links.riskThreshold)
    res.matched.push({ type: "link", value: content.linkRisk });
  if (res.matched.length) {
    res.action = "flag";
  }
  return res;
}

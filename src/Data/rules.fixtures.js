export const DEFAULT_RULES = {
  keywords: ["scam", "spam", "nsfw", "hate"],
  image: { nudityThreshold: 0.85 },
  links: { riskThreshold: 0.8 },
  actions: {
    keyword: "flag",
    image: "flag",
    link: "review",
  },
};

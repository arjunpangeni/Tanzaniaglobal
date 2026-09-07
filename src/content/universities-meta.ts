export const rankingTiers = [
  { value: "all", label: "Any ranking" },
  { value: "1-300", label: "Top 300" },
  { value: "501-800", label: "501–800" },
  { value: "801-1000", label: "801–1000" },
  { value: "college", label: "College / pathway" },
] as const;

export const fieldsOfStudy = [
  "Business",
  "IT",
  "Engineering",
  "Health",
  "Hospitality",
] as const;

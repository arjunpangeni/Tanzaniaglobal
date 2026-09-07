import catalog from "./universities.json";

export type UniversityCatalogItem = (typeof catalog)[number];

export const seedUniversities = catalog;

export { rankingTiers, fieldsOfStudy } from "./universities-meta";

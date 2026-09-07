import { cache } from "react";
import { unstable_cache } from "next/cache";
import { dbConnect } from "./db";
import { seedUniversities } from "@/content/universities";
import { seedPosts } from "@/content/posts";
import { destinations } from "@/content/destinations";

export type UniversityRecord = {
  _id?: string;
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  city: string;
  ranking: number;
  rankingTier: string;
  logoUrl?: string;
  logoLicense?: string;
  website?: string;
  wikidataId?: string;
  coverUrl?: string;
  overview: string;
  tuitionMin: number;
  tuitionMax: number;
  programs: string[];
  fields: string[];
  requirements: string;
  scholarships: string[];
  published: boolean;
};

export type PostRecord = {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverUrl: string;
  locale: string;
  publishedAt: string;
  published?: boolean;
};

export type UniversityQuery = {
  q?: string;
  country?: string;
  ranking?: string;
  field?: string;
  limit?: number;
  skip?: number;
};

const LIST_SELECT =
  "slug name country countrySlug city ranking rankingTier logoUrl website coverUrl tuitionMin tuitionMax programs fields published";

const DETAIL_SELECT = `${LIST_SELECT} wikidataId overview requirements scholarships`;

let seedCache: UniversityRecord[] | null = null;

function seedList() {
  if (!seedCache) seedCache = seedUniversities.map(toUniversity);
  return seedCache;
}

function toUniversity(u: (typeof seedUniversities)[number] | UniversityRecord): UniversityRecord {
  return {
    slug: u.slug,
    name: u.name,
    country: u.country,
    countrySlug: u.countrySlug,
    city: u.city,
    ranking: u.ranking,
    rankingTier: u.rankingTier,
    logoUrl: u.logoUrl,
    logoLicense: "logoLicense" in u ? u.logoLicense : undefined,
    website: "website" in u ? u.website : undefined,
    wikidataId: "wikidataId" in u ? u.wikidataId : undefined,
    coverUrl: u.coverUrl,
    overview: u.overview,
    tuitionMin: u.tuitionMin,
    tuitionMax: u.tuitionMax,
    programs: [...u.programs],
    fields: [...u.fields],
    requirements: u.requirements,
    scholarships: [...u.scholarships],
    published: u.published,
  };
}

function mapUniversityDoc(d: Record<string, unknown>): UniversityRecord {
  return {
    _id: String(d._id),
    slug: String(d.slug),
    name: String(d.name),
    country: String(d.country),
    countrySlug: String(d.countrySlug),
    city: String(d.city),
    ranking: Number(d.ranking ?? 0),
    rankingTier: String(d.rankingTier ?? "college"),
    logoUrl: d.logoUrl ? String(d.logoUrl) : undefined,
    website: d.website ? String(d.website) : undefined,
    wikidataId: d.wikidataId ? String(d.wikidataId) : undefined,
    coverUrl: d.coverUrl ? String(d.coverUrl) : undefined,
    overview: String(d.overview ?? ""),
    tuitionMin: Number(d.tuitionMin ?? 0),
    tuitionMax: Number(d.tuitionMax ?? 0),
    programs: Array.isArray(d.programs) ? (d.programs as string[]) : [],
    fields: Array.isArray(d.fields) ? (d.fields as string[]) : [],
    requirements: String(d.requirements ?? ""),
    scholarships: Array.isArray(d.scholarships) ? (d.scholarships as string[]) : [],
    published: Boolean(d.published),
  };
}

export function filterUniversities(
  list: UniversityRecord[],
  query: { q?: string; country?: string; ranking?: string; field?: string }
) {
  return list.filter((u) => {
    if (query.q && !u.name.toLowerCase().includes(query.q.toLowerCase())) return false;
    if (query.country && query.country !== "all" && u.countrySlug !== query.country) return false;
    if (query.ranking && query.ranking !== "all" && u.rankingTier !== query.ranking) return false;
    if (query.field && query.field !== "all" && !u.fields.includes(query.field)) return false;
    return u.published !== false;
  });
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildUniversityFilter(query: UniversityQuery) {
  const filter: Record<string, unknown> = { published: true };
  const q = query.q?.trim();
  if (q) filter.name = { $regex: escapeRegex(q), $options: "i" };
  if (query.country && query.country !== "all") filter.countrySlug = query.country;
  if (query.ranking && query.ranking !== "all") filter.rankingTier = query.ranking;
  if (query.field && query.field !== "all") filter.fields = query.field;
  return filter;
}

export function sortUniversities(list: UniversityRecord[]) {
  return [...list].sort((a, b) => {
    const logo = Number(Boolean(b.logoUrl)) - Number(Boolean(a.logoUrl));
    if (logo) return logo;
    if (a.ranking > 0 && b.ranking > 0) return a.ranking - b.ranking;
    if (a.ranking > 0) return -1;
    if (b.ranking > 0) return 1;
    return a.name.localeCompare(b.name);
  });
}

function normalizeQueryKey(query: UniversityQuery) {
  return JSON.stringify({
    q: query.q?.trim() ?? "",
    country: query.country ?? "",
    ranking: query.ranking ?? "",
    field: query.field ?? "",
    skip: query.skip ?? null,
    limit: query.limit ?? null,
  });
}

async function queryUniversities(query: UniversityQuery = {}): Promise<UniversityRecord[]> {
  const conn = await dbConnect();
  if (!conn) {
    let list = sortUniversities(filterUniversities(seedList(), query));
    if (typeof query.skip === "number") list = list.slice(query.skip);
    if (typeof query.limit === "number") list = list.slice(0, query.limit);
    return list;
  }

  try {
    const { University } = await import("@/models/university");
    const filter = buildUniversityFilter(query);
    let q = University.find(filter).select(LIST_SELECT).sort({ ranking: 1, name: 1 }).lean();
    if (typeof query.skip === "number") q = q.skip(query.skip);
    if (typeof query.limit === "number") q = q.limit(query.limit);
    const docs = await q;
    if (
      !docs.length &&
      !query.q &&
      !query.country &&
      !query.ranking &&
      !query.field
    ) {
      let list = sortUniversities(filterUniversities(seedList(), query));
      if (typeof query.skip === "number") list = list.slice(query.skip);
      if (typeof query.limit === "number") list = list.slice(0, query.limit);
      return list;
    }
    return docs.map((d) => mapUniversityDoc(d as Record<string, unknown>));
  } catch {
    let list = sortUniversities(filterUniversities(seedList(), query));
    if (typeof query.skip === "number") list = list.slice(query.skip);
    if (typeof query.limit === "number") list = list.slice(0, query.limit);
    return list;
  }
}

async function countUniversities(query: UniversityQuery = {}): Promise<number> {
  const conn = await dbConnect();
  if (!conn) return filterUniversities(seedList(), query).length;

  try {
    const { University } = await import("@/models/university");
    const filter = buildUniversityFilter(query);
    const total = await University.countDocuments(filter);
    if (total === 0 && !query.q && !query.country && !query.ranking && !query.field) {
      return filterUniversities(seedList(), query).length;
    }
    return total;
  } catch {
    return filterUniversities(seedList(), query).length;
  }
}

const cachedUniversities = unstable_cache(
  async (key: string) => queryUniversities(JSON.parse(key) as UniversityQuery),
  ["universities"],
  { revalidate: 600, tags: ["universities"] }
);

const cachedUniversityCount = unstable_cache(
  async (key: string) => countUniversities(JSON.parse(key) as UniversityQuery),
  ["universities-count"],
  { revalidate: 600, tags: ["universities"] }
);

const cachedUniversity = unstable_cache(
  async (slug: string) => {
    const conn = await dbConnect();
    if (!conn) return seedList().find((u) => u.slug === slug) ?? null;
    try {
      const { University } = await import("@/models/university");
      const doc = await University.findOne({ slug, published: true }).select(DETAIL_SELECT).lean();
      if (doc) return mapUniversityDoc(doc as Record<string, unknown>);
      return seedList().find((u) => u.slug === slug) ?? null;
    } catch {
      return seedList().find((u) => u.slug === slug) ?? null;
    }
  },
  ["university"],
  { revalidate: 3600, tags: ["universities"] }
);

const cachedPosts = unstable_cache(
  async () => {
    const seed: PostRecord[] = seedPosts.map((p) => ({ ...p, tags: [...p.tags] }));
    const conn = await dbConnect();
    if (!conn) return seed;
    try {
      const { Post } = await import("@/models/post");
      const docs = await Post.find({ published: true }).sort({ publishedAt: -1 }).lean();
      if (!docs.length) return seed;
      return docs.map((d) => ({
        _id: String(d._id),
        slug: d.slug,
        title: d.title,
        excerpt: d.excerpt ?? "",
        content: d.content ?? "",
        category: d.category ?? "",
        tags: d.tags ?? [],
        coverUrl: d.coverUrl ?? "",
        locale: d.locale ?? "en",
        publishedAt: d.publishedAt
          ? new Date(d.publishedAt).toISOString().slice(0, 10)
          : "",
      }));
    } catch {
      return seed;
    }
  },
  ["posts"],
  { revalidate: 600, tags: ["posts"] }
);

const cachedPost = unstable_cache(
  async (slug: string) => {
    const conn = await dbConnect();
    if (!conn) {
      const seed = seedPosts.find((p) => p.slug === slug);
      return seed ? { ...seed, tags: [...seed.tags] } : null;
    }
    try {
      const { Post } = await import("@/models/post");
      const d = await Post.findOne({ slug, published: true }).lean();
      if (!d) {
        const seed = seedPosts.find((p) => p.slug === slug);
        return seed ? { ...seed, tags: [...seed.tags] } : null;
      }
      return {
        _id: String(d._id),
        slug: d.slug,
        title: d.title,
        excerpt: d.excerpt ?? "",
        content: d.content ?? "",
        category: d.category ?? "",
        tags: d.tags ?? [],
        coverUrl: d.coverUrl ?? "",
        locale: d.locale ?? "en",
        publishedAt: d.publishedAt
          ? new Date(d.publishedAt).toISOString().slice(0, 10)
          : "",
      } satisfies PostRecord;
    } catch {
      const seed = seedPosts.find((p) => p.slug === slug);
      return seed ? { ...seed, tags: [...seed.tags] } : null;
    }
  },
  ["post"],
  { revalidate: 3600, tags: ["posts"] }
);

export async function getUniversities(query: UniversityQuery = {}) {
  return cachedUniversities(normalizeQueryKey(query));
}

export async function getUniversitiesPaged(
  query: UniversityQuery & { page?: number; pageSize?: number } = {}
) {
  const pageSize = Math.max(1, query.pageSize ?? 12);
  const page = Math.max(1, query.page ?? 1);
  const skip = (page - 1) * pageSize;
  const base: UniversityQuery = {
    q: query.q,
    country: query.country,
    ranking: query.ranking,
    field: query.field,
  };
  const [total, items] = await Promise.all([
    cachedUniversityCount(normalizeQueryKey(base)),
    cachedUniversities(normalizeQueryKey({ ...base, skip, limit: pageSize })),
  ]);
  return { items, total, page, pageSize };
}

export const getUniversity = cache(async (slug: string) => cachedUniversity(slug));

export function getPartnerUniversities(limit = 24) {
  return seedUniversities.slice(0, limit).map((u) => ({
    slug: u.slug,
    name: u.name,
    logoUrl: u.logoUrl as string | undefined,
  }));
}

export async function getPosts() {
  return cachedPosts();
}

export const getPost = cache(async (slug: string) => cachedPost(slug));

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug) ?? null;
}

export function usdToTzs(usd: number) {
  return Math.round(usd * 2650);
}

export function formatTuition(min: number, max: number) {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  return `${fmt(min)}–${fmt(max)} · TZS ${(usdToTzs(min) / 1_000_000).toFixed(0)}–${(usdToTzs(max) / 1_000_000).toFixed(0)}m`;
}

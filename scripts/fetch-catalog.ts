import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const JSON_PATH = path.join(ROOT, "src/content/universities.json");
const LOGO_DIR = path.join(ROOT, "public/universities/logos");
const SPARQL = "https://query.wikidata.org/sparql";
const USER_AGENT =
  "TanzaniaGlobalLtd/1.0 (study-abroad catalog; logo cache; http://localhost:3000)";

type UniversityRow = {
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  city: string;
  ranking: number;
  rankingTier: string;
  wikidataId: string;
  website: string;
  logoUrl: string;
  logoLicense: string;
  coverUrl: string;
  overview: string;
  tuitionMin: number;
  tuitionMax: number;
  programs: string[];
  fields: string[];
  requirements: string;
  scholarships: string[];
  published: boolean;
};

const CURATED: { qid: string; country: string; countrySlug: string }[] = [
  { qid: "Q34433", country: "United Kingdom", countrySlug: "united-kingdom" },
  { qid: "Q35794", country: "United Kingdom", countrySlug: "united-kingdom" },
  { qid: "Q189022", country: "United Kingdom", countrySlug: "united-kingdom" },
  { qid: "Q193196", country: "United Kingdom", countrySlug: "united-kingdom" },
  { qid: "Q160302", country: "United Kingdom", countrySlug: "united-kingdom" },
  { qid: "Q230899", country: "United Kingdom", countrySlug: "united-kingdom" },
  { qid: "Q245247", country: "United Kingdom", countrySlug: "united-kingdom" },
  { qid: "Q174570", country: "United Kingdom", countrySlug: "united-kingdom" },
  { qid: "Q459506", country: "United Kingdom", countrySlug: "united-kingdom" },
  { qid: "Q865528", country: "United Kingdom", countrySlug: "united-kingdom" },
  { qid: "Q13371", country: "United States", countrySlug: "united-states" },
  { qid: "Q49108", country: "United States", countrySlug: "united-states" },
  { qid: "Q41506", country: "United States", countrySlug: "united-states" },
  { qid: "Q168756", country: "United States", countrySlug: "united-states" },
  { qid: "Q174710", country: "United States", countrySlug: "united-states" },
  { qid: "Q49210", country: "United States", countrySlug: "united-states" },
  { qid: "Q49088", country: "United States", countrySlug: "united-states" },
  { qid: "Q230492", country: "United States", countrySlug: "united-states" },
  { qid: "Q414971", country: "France", countrySlug: "france" },
  { qid: "Q859363", country: "France", countrySlug: "france" },
  { qid: "Q1665104", country: "France", countrySlug: "france" },
  { qid: "Q273626", country: "France", countrySlug: "france" },
  { qid: "Q127990", country: "Australia", countrySlug: "australia" },
  { qid: "Q487556", country: "Australia", countrySlug: "australia" },
];

const COUNTRIES = [
  { qid: "Q145", country: "United Kingdom", countrySlug: "united-kingdom" },
  { qid: "Q30", country: "United States", countrySlug: "united-states" },
  { qid: "Q16", country: "Canada", countrySlug: "canada" },
  { qid: "Q408", country: "Australia", countrySlug: "australia" },
  { qid: "Q668", country: "India", countrySlug: "india" },
  { qid: "Q148", country: "China", countrySlug: "china" },
  { qid: "Q833", country: "Malaysia", countrySlug: "malaysia" },
  { qid: "Q183", country: "Germany", countrySlug: "germany" },
  { qid: "Q664", country: "New Zealand", countrySlug: "new-zealand" },
  { qid: "Q27", country: "Ireland", countrySlug: "ireland" },
  { qid: "Q55", country: "Netherlands", countrySlug: "netherlands" },
  { qid: "Q142", country: "France", countrySlug: "france" },
  { qid: "Q17", country: "Japan", countrySlug: "japan" },
] as const;

const ADD_PER_COUNTRY = 20;

const TUITION: Record<string, [number, number]> = {
  "united-kingdom": [16000, 28000],
  "united-states": [28000, 48000],
  canada: [16000, 28000],
  australia: [20000, 36000],
  india: [3500, 8000],
  china: [4000, 12000],
  malaysia: [4500, 12000],
  germany: [400, 8000],
  "new-zealand": [18000, 32000],
  ireland: [14000, 26000],
  netherlands: [10000, 22000],
  france: [400, 12000],
  japan: [5000, 14000],
};

const COVER: Record<string, string> = {
  "united-kingdom":
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
  "united-states":
    "https://images.unsplash.com/photo-1485738422979-f5c2755b1d76?auto=format&fit=crop&w=1600&q=80",
  canada:
    "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1600&q=80",
  australia:
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80",
  india:
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80",
  china:
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1600&q=80",
  malaysia:
    "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=80",
  germany:
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
  "new-zealand":
    "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1600&q=80",
  ireland:
    "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=1600&q=80",
  netherlands:
    "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=80",
  france:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
  japan:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80",
};

const REQUIREMENTS: Record<string, string> = {
  "united-kingdom": "Degree or Form Six equivalent; IELTS 6.0–6.5 typical; certified transcripts.",
  "united-states": "English test; funds evidence for the first year; I-20 after admission.",
  canada: "English test; provincial attestation as required that cycle.",
  australia: "English test as specified per course; genuine-student documentation.",
  india: "Form Six or diploma; passport; medicals as required.",
  china: "JW202 / X1 visa file; English or Chinese as specified.",
  malaysia: "IELTS 5.5–6.0 typical; foundation available if Form Six is short.",
  germany: "Blocked-account planning; English or German as specified.",
  "new-zealand": "English test; funds evidence; visa medicals as required.",
  ireland: "IELTS 6.0 typical; transcripts and passport.",
  netherlands: "Numerus-fixus / housing timelines; English test as specified.",
  france: "Campus France steps; English or French as specified; transcripts and passport.",
  japan: "Start a year ahead; English or Japanese as specified.",
};

type Hit = {
  qid: string;
  name: string;
  city: string;
  website: string;
  logo: string;
};

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function sparql(query: string) {
  const url = `${SPARQL}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/sparql-results+json" },
  });
  if (!res.ok) throw new Error(`SPARQL ${res.status}`);
  return res.json() as Promise<{
    results: { bindings: Record<string, { value: string }>[] };
  }>;
}

async function fetchCountry(
  target: (typeof COUNTRIES)[number],
  take: number,
  skip: Set<string>
): Promise<Hit[]> {
  const query = `
    SELECT DISTINCT ?uni ?uniLabel ?cityLabel ?website ?logo WHERE {
      ?uni wdt:P17 wd:${target.qid} ;
           wdt:P31 ?type ;
           wdt:P856 ?website .
      VALUES ?type { wd:Q3918 wd:Q875538 wd:Q62078547 wd:Q23002039 wd:Q23002054 wd:Q38723 wd:Q189004 }
      OPTIONAL { ?uni wdt:P131 ?city. }
      OPTIONAL { ?uni wdt:P154 ?logo. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    LIMIT ${Math.min(take + skip.size + 80, 220)}
  `;
  const json = await sparql(query);
  const seen = new Set<string>();
  const hits: Hit[] = [];
  for (const row of json.results.bindings) {
    const uri = row.uni?.value ?? "";
    const qid = uri.split("/").pop() ?? "";
    const name = row.uniLabel?.value ?? "";
    if (!qid || !name || name.startsWith("Q")) continue;
    if (/faculty|campus of|1970|defunct|closed/i.test(name)) continue;
    if (skip.has(qid) || seen.has(qid)) continue;
    seen.add(qid);
    hits.push({
      qid,
      name,
      city: row.cityLabel?.value && !row.cityLabel.value.startsWith("Q") ? row.cityLabel.value : target.country,
      website: row.website?.value ?? "",
      logo: row.logo?.value ?? "",
    });
    if (hits.length >= take) break;
  }
  return hits;
}

function extensionFromBuffer(buffer: Buffer, contentType = "") {
  if (buffer[0] === 0x89 && buffer[1] === 0x50) return ".png";
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return ".jpg";
  if (buffer.toString("ascii", 0, 4) === "GIF8") return ".gif";
  const head = buffer.subarray(0, 2500).toString("utf8").toLowerCase();
  const trim = head.trimStart();
  if (trim.startsWith("<svg") || (trim.startsWith("<?xml") && head.includes("<svg"))) {
    return ".svg";
  }
  const type = contentType.toLowerCase();
  if (type.includes("svg")) return ".svg";
  if (type.includes("png")) return ".png";
  if (type.includes("jpeg") || type.includes("jpg")) return ".jpg";
  if (type.includes("webp")) return ".webp";
  return ".png";
}

async function fileExists(file: string) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function cacheLogo(hit: Hit, slug: string) {
  if (hit.logo) {
    const title = decodeURIComponent(hit.logo.split("/").pop() || "logo").replace(/^File:/i, "");
    const downloadUrl = hit.logo.includes("Special:FilePath")
      ? `${hit.logo.split("?")[0]}?width=512`
      : `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(title)}?width=512`;
    const res = await fetch(downloadUrl, { headers: { "User-Agent": USER_AGENT }, redirect: "follow" });
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      const ext = extensionFromBuffer(buffer, res.headers.get("content-type") || "");
      const dest = path.join(LOGO_DIR, `${slug}${ext}`);
      await writeFile(dest, buffer);
      return { logoUrl: `/universities/logos/${slug}${ext}`, logoLicense: "Wikimedia Commons" };
    }
  }
  if (hit.website) {
    const host = new URL(hit.website).hostname;
    const res = await fetch(`https://www.google.com/s2/favicons?domain=${host}&sz=128`, {
      headers: { "User-Agent": USER_AGENT },
    });
    if (res.ok) {
      const dest = path.join(LOGO_DIR, `${slug}.png`);
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      return { logoUrl: `/universities/logos/${slug}.png`, logoLicense: `Site icon from ${host}` };
    }
  }
  return { logoUrl: "", logoLicense: "" };
}

function toRow(hit: Hit, slug: string, country: string, countrySlug: string): UniversityRow {
  const [tuitionMin, tuitionMax] = TUITION[countrySlug] ?? [8000, 20000];
  return {
    slug,
    name: hit.name,
    country,
    countrySlug,
    city: hit.city,
    ranking: 0,
    rankingTier: "college",
    wikidataId: hit.qid,
    website: hit.website,
    logoUrl: "",
    logoLicense: "",
    coverUrl: COVER[countrySlug] ?? COVER["united-kingdom"],
    overview: `${hit.name} is a campus in ${hit.city}, ${country}. Tuition bands below are indicative for international students — confirm the current intake with a counsellor.`,
    tuitionMin,
    tuitionMax,
    programs: ["Undergraduate", "Postgraduate"],
    fields: ["Business", "IT"],
    requirements: REQUIREMENTS[countrySlug] ?? "English test as specified; transcripts and passport.",
    scholarships: ["Ask about current international awards"],
    published: true,
  };
}

async function main() {
  await mkdir(LOGO_DIR, { recursive: true });
  const existing = JSON.parse(await readFile(JSON_PATH, "utf8")) as UniversityRow[];
  const byQid = new Set(existing.map((row) => row.wikidataId).filter(Boolean));
  const slugs = new Set(existing.map((row) => row.slug));
  const added: UniversityRow[] = [];
  const commonsBySlug = new Map<string, string>();

  for (const target of COUNTRIES) {
    const have = existing.filter((row) => row.countrySlug === target.countrySlug).length;
    const take = have === 0 ? ADD_PER_COUNTRY : ADD_PER_COUNTRY;
    console.log(`Fetching ${target.country} (have ${have}, add ${take})…`);
    const hits = await fetchCountry(target, take, byQid);
    console.log(`  ${hits.length} new from Wikidata`);
    for (const hit of hits) {
      if (byQid.has(hit.qid)) continue;
      let slug = slugify(hit.name);
      if (!slug) continue;
      if (slugs.has(slug)) slug = `${slug}-${target.countrySlug}`;
      if (slugs.has(slug)) continue;
      slugs.add(slug);
      byQid.add(hit.qid);
      added.push(toRow(hit, slug, target.country, target.countrySlug));
      if (hit.logo) commonsBySlug.set(slug, hit.logo);
    }
    await sleep(800);
  }

  console.log("Fetching curated well-known campuses…");
  const curatedIds = CURATED.map((c) => `wd:${c.qid}`).join(" ");
  const curatedJson = await sparql(`
    SELECT ?uni ?uniLabel ?cityLabel ?website ?logo WHERE {
      VALUES ?uni { ${curatedIds} }
      OPTIONAL { ?uni wdt:P131 ?city. }
      OPTIONAL { ?uni wdt:P856 ?website. }
      OPTIONAL { ?uni wdt:P154 ?logo. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
  `);
  for (const row of curatedJson.results.bindings) {
    const qid = (row.uni?.value ?? "").split("/").pop() ?? "";
    const meta = CURATED.find((c) => c.qid === qid);
    if (!meta || byQid.has(qid)) continue;
    const name = row.uniLabel?.value ?? "";
    if (!name || name.startsWith("Q")) continue;
    let slug = slugify(name);
    if (slugs.has(slug)) slug = `${slug}-${meta.countrySlug}`;
    if (slugs.has(slug)) continue;
    slugs.add(slug);
    byQid.add(qid);
    const hit: Hit = {
      qid,
      name,
      city: row.cityLabel?.value && !row.cityLabel.value.startsWith("Q") ? row.cityLabel.value : meta.country,
      website: row.website?.value ?? "",
      logo: row.logo?.value ?? "",
    };
    added.push(toRow(hit, slug, meta.country, meta.countrySlug));
    if (hit.logo) commonsBySlug.set(slug, hit.logo);
  }

  const catalog = [...existing, ...added];
  console.log(`Downloading logos for ${added.length} new campuses…`);

  for (const row of catalog) {
    if (row.logoUrl && (await fileExists(path.join(ROOT, "public", row.logoUrl.replace(/^\//, ""))))) {
      continue;
    }
    const hit: Hit = {
      qid: row.wikidataId,
      name: row.name,
      city: row.city,
      website: row.website,
      logo: commonsBySlug.get(row.slug) ?? "",
    };
    try {
      const logo = await cacheLogo(hit, row.slug);
      if (logo.logoUrl) {
        row.logoUrl = logo.logoUrl;
        row.logoLicense = logo.logoLicense;
        console.log(`logo ${row.slug}`);
      }
    } catch (error) {
      console.error(`fail ${row.slug}:`, error instanceof Error ? error.message : error);
    }
    await sleep(250);
  }

  await writeFile(JSON_PATH, `${JSON.stringify(catalog, null, 2)}\n`);
  const counts = COUNTRIES.map((t) => {
    const n = catalog.filter((r) => r.countrySlug === t.countrySlug).length;
    return `${t.countrySlug}: ${n}`;
  });
  console.log(`Saved ${catalog.length} universities (${counts.join(", ")}). Added ${added.length}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

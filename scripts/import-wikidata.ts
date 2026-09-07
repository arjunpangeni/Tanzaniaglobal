import { mkdir, readFile, writeFile } from "node:fs/promises";
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
  wikidataId?: string;
  website?: string;
  logoUrl?: string;
  logoLicense?: string;
  [key: string]: unknown;
};

type SparqlBinding = {
  logo?: { value: string };
  wordmark?: { value: string };
  seal?: { value: string };
  website?: { value: string };
};

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url: string) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/sparql-results+json" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

async function queryWikidata(qid: string): Promise<SparqlBinding> {
  const sparql = `
    SELECT ?logo ?wordmark ?seal ?website WHERE {
      BIND(wd:${qid} AS ?uni)
      OPTIONAL { ?uni wdt:P154 ?logo. }
      OPTIONAL { ?uni wdt:P8972 ?wordmark. }
      OPTIONAL { ?uni wdt:P158 ?seal. }
      OPTIONAL { ?uni wdt:P856 ?website. }
    }
    LIMIT 1
  `;
  const url = `${SPARQL}?query=${encodeURIComponent(sparql)}`;
  const res = await fetchText(url);
  const json = (await res.json()) as {
    results: { bindings: SparqlBinding[] };
  };
  return json.results.bindings[0] ?? {};
}

function fileNameFromCommonsUrl(url: string) {
  const raw = decodeURIComponent(url.split("/").pop() || "logo");
  return raw.replace(/^File:/i, "");
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

async function downloadLogo(commonsUrl: string, slug: string) {
  const fileTitle = fileNameFromCommonsUrl(commonsUrl);
  const downloadUrl = commonsUrl.includes("Special:FilePath")
    ? `${commonsUrl.split("?")[0]}?width=512`
    : `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileTitle)}?width=512`;

  const res = await fetch(downloadUrl, {
    headers: { "User-Agent": USER_AGENT },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`logo ${res.status} for ${slug}`);

  const buffer = Buffer.from(await res.arrayBuffer());
  const ext = extensionFromBuffer(buffer, res.headers.get("content-type") || "");
  const dest = path.join(LOGO_DIR, `${slug}${ext}`);
  await writeFile(dest, buffer);
  return { localPath: `/universities/logos/${slug}${ext}`, fileTitle };
}

async function logoLicense(fileTitle: string) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("titles", `File:${fileTitle}`);
  api.searchParams.set("prop", "imageinfo");
  api.searchParams.set("iiprop", "extmetadata");
  api.searchParams.set("format", "json");
  const res = await fetch(api, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) return "Wikimedia Commons";
  const json = (await res.json()) as {
    query?: { pages?: Record<string, { imageinfo?: { extmetadata?: { LicenseShortName?: { value?: string } } }[] }> };
  };
  const page = Object.values(json.query?.pages ?? {})[0];
  return page?.imageinfo?.[0]?.extmetadata?.LicenseShortName?.value || "Wikimedia Commons";
}

async function main() {
  await mkdir(LOGO_DIR, { recursive: true });
  const rows = JSON.parse(await readFile(JSON_PATH, "utf8")) as UniversityRow[];

  for (const row of rows) {
    if (!row.wikidataId) {
      console.log(`skip ${row.slug}: no wikidataId`);
      continue;
    }
    try {
      const data = await queryWikidata(row.wikidataId);
      if (data.website?.value) row.website = data.website.value;

      const image = data.logo?.value || data.wordmark?.value || data.seal?.value;
      if (image) {
        const { localPath, fileTitle } = await downloadLogo(image, row.slug);
        row.logoUrl = localPath;
        await sleep(400);
        row.logoLicense = await logoLicense(fileTitle);
        console.log(`ok   ${row.slug} → ${localPath}`);
      } else if (row.website) {
        const host = new URL(String(row.website)).hostname;
        const favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=128`;
        const res = await fetch(favicon, { headers: { "User-Agent": USER_AGENT } });
        if (res.ok) {
          const dest = path.join(LOGO_DIR, `${row.slug}.png`);
          await writeFile(dest, Buffer.from(await res.arrayBuffer()));
          row.logoUrl = `/universities/logos/${row.slug}.png`;
          row.logoLicense = `Site icon from ${host}`;
          console.log(`icon ${row.slug} → ${row.logoUrl}`);
        } else {
          console.log(`none ${row.slug}: no image`);
        }
      } else {
        console.log(`none ${row.slug}: no image or website`);
      }
    } catch (error) {
      console.error(`fail ${row.slug}:`, error instanceof Error ? error.message : error);
    }
    await sleep(700);
  }

  await writeFile(JSON_PATH, `${JSON.stringify(rows, null, 2)}\n`);
  console.log(`Wrote ${JSON_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

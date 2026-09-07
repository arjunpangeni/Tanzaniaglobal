import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { destinationGuides } from "../src/content/destination-guides";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/destinations");
const UA = "TanzaniaGlobalLtd/1.0 (destination photo cache; http://localhost:3000)";

function extFrom(buffer: Buffer, type: string, url: string) {
  if (buffer[0] === 0x89 && buffer[1] === 0x50) return "png";
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return "jpg";
  if (buffer.toString("ascii", 0, 4) === "GIF8") return "gif";
  const head = buffer.subarray(0, 2000).toString("utf8").toLowerCase();
  if (head.includes("<svg")) return "svg";
  if (type.includes("png")) return "png";
  if (type.includes("jpeg") || type.includes("jpg")) return "jpg";
  if (type.includes("webp")) return "webp";
  if (url.includes(".png")) return "png";
  return "jpg";
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const map: Record<string, string[]> = {};

  for (const [slug, guide] of Object.entries(destinationGuides)) {
    map[slug] = [];
    for (let i = 0; i < guide.photos.length; i++) {
      const url = guide.photos[i].src;
      const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
      if (!res.ok) {
        console.error(`fail ${slug} ${i + 1} ${res.status} ${url}`);
        map[slug].push("");
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      const ext = extFrom(buffer, res.headers.get("content-type") || "", url);
      const name = `${slug}-${i + 1}.${ext}`;
      await writeFile(path.join(OUT, name), buffer);
      map[slug].push(`/destinations/${name}`);
      console.log(`ok   ${name} (${buffer.length} bytes)`);
    }
  }

  await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(map, null, 2));
  console.log("done");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

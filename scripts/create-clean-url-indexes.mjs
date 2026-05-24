import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("docs/.vitepress/dist");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return fullPath;
  });
}

const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));
let created = 0;

for (const file of htmlFiles) {
  if (path.basename(file) === "index.html") continue;

  const cleanDir = path.join(path.dirname(file), path.basename(file, ".html"));
  const cleanIndex = path.join(cleanDir, "index.html");

  fs.mkdirSync(cleanDir, { recursive: true });
  fs.copyFileSync(file, cleanIndex);
  created += 1;
}

console.log(JSON.stringify({ cleanUrlIndexes: created }, null, 2));

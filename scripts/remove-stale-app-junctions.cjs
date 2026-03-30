/**
 * Removes empty/broken junction folders under src/app that duplicate (marketing) routes.
 * Those reparse points break Next.js App Router (e.g. GET / → 404 in dev).
 */
const fs = require("fs");
const path = require("path");

const appDir = path.join(__dirname, "..", "src", "app");
const staleNames = [
  "about",
  "blog",
  "contact",
  "demo",
  "pricing",
  "pricing-v2",
  "trust",
];

function main() {
  if (!fs.existsSync(appDir)) {
    console.error("[fix-app-routes] Missing:", appDir);
    process.exit(1);
  }

  for (const name of staleNames) {
    const target = path.join(appDir, name);
    if (!fs.existsSync(target)) continue;

    let st;
    try {
      st = fs.lstatSync(target);
    } catch (e) {
      console.warn("[fix-app-routes] Skip (stat failed):", target, e.message);
      continue;
    }

    if (!st.isDirectory()) continue;

    // Real route folder should contain page.tsx; stale junctions are empty
    const pageTsx = path.join(target, "page.tsx");
    if (fs.existsSync(pageTsx)) {
      console.log("[fix-app-routes] Keep (has page.tsx):", name);
      continue;
    }

    try {
      fs.rmSync(target, { recursive: true, maxRetries: 3, retryDelay: 100 });
      console.log("[fix-app-routes] Removed:", target);
    } catch (e) {
      console.warn("[fix-app-routes] Could not remove (close apps / OneDrive):", target);
      console.warn("  ", e.message);
    }
  }
}

main();

/**
 * Remove project .next AND the OneDrive off-sync target (see ensure-next-junction.cjs).
 * Clearing only the junction leaves stale chunks in LOCALAPPDATA → 404/500, broken webpack, missing CSS.
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const os = require("os");

function normalizeRoot(root) {
  return root.replace(/\\/g, "/").toLowerCase();
}

function isOneDriveProjectPath(normalized) {
  return normalized.includes("/onedrive/");
}

function getOffSyncTarget(root) {
  const slug = crypto.createHash("sha256").update(path.resolve(root)).digest("hex").slice(0, 12);
  if (process.platform === "win32") {
    const base = process.env.LOCALAPPDATA || os.tmpdir();
    return path.join(base, "StratavorWebsite-next", slug, ".next");
  }
  return path.join(os.homedir(), ".cache", "stratavor-website-next", slug, ".next");
}

const root = process.cwd();
const linkPath = path.join(root, ".next");

try {
  fs.rmSync(linkPath, { recursive: true, force: true });
} catch (err) {
  console.error("[stratavor] WARN: Could not remove project .next:", err.message);
}

const normalized = normalizeRoot(root);
if (isOneDriveProjectPath(normalized) && (process.platform === "win32" || process.platform === "linux")) {
  const target = getOffSyncTarget(root);
  try {
    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true });
      console.log("[stratavor] Removed off-sync .next target:", target);
    }
  } catch (err) {
    console.error("[stratavor] WARN: Could not remove off-sync .next target:", err.message);
    console.error("[stratavor] Close dev servers, then delete manually:", target);
  }
}

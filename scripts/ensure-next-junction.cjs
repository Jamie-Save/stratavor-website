/**
 * OneDrive breaks Next.js `.next` (CSS/static often 404 or empty).
 *
 * - Windows: junction from project `.next` -> %LOCALAPPDATA%\StratavorWebsite-next\<slug>\.next
 * - Linux (incl. WSL on /mnt/.../OneDrive/...): dir symlink -> ~/.cache/stratavor-website-next/<slug>/.next
 *
 * <slug> is a short hash of the project root path so concurrent clones or tools do not share one `.next`
 * (which causes "unstyled" pages: HTML references CSS hashes that another build removed).
 *
 * Requires NODE_OPTIONS=--preserve-symlinks in dev/build/start (see package.json).
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

function projectDirSlug(root) {
  const resolved = path.resolve(root);
  return crypto.createHash("sha256").update(resolved).digest("hex").slice(0, 12);
}

function getOffSyncTarget(root) {
  const slug = projectDirSlug(root);
  if (process.platform === "win32") {
    const base = process.env.LOCALAPPDATA || os.tmpdir();
    return path.join(base, "StratavorWebsite-next", slug, ".next");
  }
  return path.join(os.homedir(), ".cache", "stratavor-website-next", slug, ".next");
}

function pathsPointToSame(a, b) {
  try {
    return path.resolve(a) === path.resolve(b);
  } catch {
    return false;
  }
}

function main() {
  const root = process.cwd();
  const normalized = normalizeRoot(root);

  // Dev can return 200 for the first compiled app route then 404 for siblings after `/_not-found`
  // compiles (Next 15 + webpack + junction .next -> LOCALAPPDATA). In-project `.next` avoids it.
  if (
    process.env.STRATAVOR_NEXT_NO_JUNCTION === "1" &&
    isOneDriveProjectPath(normalized)
  ) {
    const linkPath = path.join(root, ".next");
    if (fs.existsSync(linkPath)) {
      try {
        fs.readlinkSync(linkPath);
        fs.rmSync(linkPath, { recursive: true, force: true });
        console.log(
          "[stratavor] STRATAVOR_NEXT_NO_JUNCTION=1: removed .next junction; Next will use in-project .next.",
        );
      } catch (err) {
        if (err && (err.code === "EINVAL" || err.code === "UNKNOWN")) {
          /* normal directory, not a link */
        } else {
          console.error("[stratavor] WARN: Could not adjust .next for NO_JUNCTION:", err.message);
        }
      }
    }
    return;
  }

  // Repo copied/moved off OneDrive often still has `.next` as a junction to %LOCALAPPDATA%\…\<other-path-hash>\.next.
  // That cache does not match the current `src/app` tree → header/layout render but every page returns 404 in dev.
  if (!isOneDriveProjectPath(normalized)) {
    const linkPath = path.join(root, ".next");
    if (fs.existsSync(linkPath)) {
      try {
        fs.readlinkSync(linkPath);
        fs.rmSync(linkPath, { recursive: true, force: true });
        console.log(
          "[stratavor] Non-OneDrive project: removed .next junction/symlink so Next uses a fresh local .next.",
        );
      } catch (err) {
        if (err && err.code !== "EINVAL" && err.code !== "UNKNOWN") {
          console.error("[stratavor] WARN: Could not remove stale .next redirect:", err.message);
        }
      }
    }
    return;
  }

  if (process.platform !== "win32" && process.platform !== "linux") {
    return;
  }

  const target = getOffSyncTarget(root);
  const linkPath = path.join(root, ".next");

  try {
    fs.mkdirSync(target, { recursive: true });
  } catch (err) {
    console.error("[stratavor] WARN: Could not create off-sync build directory:", err.message);
    console.error(
      "[stratavor] Fix: move the repo outside OneDrive, or check disk permissions.",
    );
    return;
  }

  if (fs.existsSync(linkPath)) {
    let st;
    try {
      st = fs.lstatSync(linkPath);
    } catch (err) {
      console.error("[stratavor] WARN: Could not stat .next:", err.message);
      return;
    }
    if (st.isSymbolicLink()) {
      try {
        const dest = fs.readlinkSync(linkPath);
        const resolved = path.resolve(path.dirname(linkPath), dest);
        if (pathsPointToSame(target, resolved)) return;
      } catch {
        /* fall through to replace */
      }
    }
    try {
      fs.rmSync(linkPath, { recursive: true, force: true });
    } catch (err) {
      console.error("[stratavor] WARN: Could not remove existing .next:", err.message);
      console.error(
        "[stratavor] Fix: close apps using .next, move the repo off OneDrive, or delete .next manually.",
      );
      return;
    }
  }

  try {
    if (process.platform === "win32") {
      fs.symlinkSync(target, linkPath, "junction");
      console.log(
        `[stratavor] OneDrive project: .next -> junction to local AppData (${projectDirSlug(root)})`,
      );
    } else {
      fs.symlinkSync(target, linkPath, "dir");
      console.log(
        "[stratavor] OneDrive path: .next -> symlink to ~/.cache (reliable CSS/static). Use npm scripts with preserve-symlinks.",
      );
    }
  } catch (err) {
    console.error("[stratavor] WARN: Could not redirect .next off OneDrive:", err.message);
    console.error(
      "[stratavor] Fix: move the repo outside OneDrive (e.g. C:\\dev\\Website), enable Windows Developer Mode for symlinks, or run with permissions that allow junctions/symlinks.",
    );
    try {
      if (!fs.existsSync(linkPath)) {
        fs.mkdirSync(linkPath, { recursive: true });
      }
    } catch (e2) {
      console.error("[stratavor] WARN: Could not create fallback .next folder:", e2.message);
    }
  }
}

main();

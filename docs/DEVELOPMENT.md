# Development notes

## Windows + OneDrive (and WSL on OneDrive)

### What goes wrong

Next.js writes build output under `.next`, including static assets at `/_next/static/css/...`. If the project lives under **OneDrive**, those files are often **placeholders, partially synced, or affected by Windows `readlink` errors**. The page **HTML** can load while **CSS/JS requests fail or return empty bodies**, so the site looks unstyled.

### What this repo does

1. **`predev` / `prebuild` / `prestart`** run [`scripts/ensure-next-junction.cjs`](../scripts/ensure-next-junction.cjs):
   - **Windows:** turns project `.next` into a **junction** pointing at  
     `%LOCALAPPDATA%\StratavorWebsite-next\.next` (normal local disk).
   - **Linux (e.g. WSL)** when `cwd` contains `/onedrive/` (typical: `/mnt/c/Users/.../OneDrive/...`): creates a **directory symlink** to  
     `~/.cache/stratavor-website-next/.next`.

2. **`dev` / `build` / `start`** use **`NODE_OPTIONS=--preserve-symlinks`** (via `cross-env`) so Node resolves `node_modules` from your **project** folder when `.next` is a link. **Do not omit this** while the redirect is active.

### Supported commands

Use these (they run the hooks and flags above):

| Goal | Command |
|------|---------|
| Dev server | `npm run dev` or [`start-dev.ps1`](../start-dev.ps1) |
| Production build | `npm run build` or [`start-build.ps1`](../start-build.ps1) |
| Production server | `npm run start` |
| Build + start | `npm run preview` or [`start-preview.ps1`](../start-preview.ps1) |

Avoid bare `npx next build` / `npx next start` without **`NODE_OPTIONS=--preserve-symlinks`** when `.next` is a junction/symlink. [`start-preview.ps1`](../start-preview.ps1) sets that before `npx next start`.

### LAN URL for `next dev` (optional)

If you open the site as `http://<your-LAN-IP>:3000`, set in **`.env.local`** (see [`.env.example`](../.env.example)):

`NEXT_ALLOWED_DEV_ORIGINS=10.0.0.131` (use your IP; comma-separate multiple). This configures Next’s `allowedDevOrigins` and avoids cross-origin blocking for `/_next/*` in development.

### Clean rebuild when stuck

```powershell
.\start-preview.ps1 -Clean
```

That removes the previous build output and junction/symlink setup, then rebuilds. You can also delete `%LOCALAPPDATA%\StratavorWebsite-next\.next` (Windows) or `~/.cache/stratavor-website-next/.next` (Linux/WSL) if you prefer.

### `GET /` returns 404 in `next dev` (but `npm run build` works)

**Cause:** On OneDrive, a **route-group folder** such as `src/app/(marketing)` can be a **cloud reparse point**. Next.js may then fail to match any child routes and serve `/_not-found` for every URL. This repo keeps marketing pages **directly under** `src/app/` (e.g. `src/app/pricing/page.tsx`) so the App Router only scans normal folders. Separately, **empty** junctions named `about`, `blog`, `trust`, etc. next to real routes can still confuse resolution—remove those.

**Fix:** From the repo root run:

```bash
npm run fix:app-routes
```

That runs [`scripts/remove-stale-app-junctions.cjs`](../scripts/remove-stale-app-junctions.cjs), which removes known empty junction names under `src/app` (it skips any folder that already has `page.tsx`). If removal still fails, close dev servers, pause OneDrive briefly, and run the script again—or remove the junction manually with `cmd /c rmdir "src\app\<name>"`.

### Troubleshooting checklist

1. **DevTools → Network:** open `/` and confirm `/_next/static/css/*.css` returns **200** and a **non-zero** response size. If it’s 404 or tiny/empty, the build output or server is still wrong.
2. **One process per port:** stale `node` processes can serve an old build; stop extras or pick another port. If `next dev` prints **“Port 3000 is in use … using 3001”**, your browser may still be on **3000** (a zombie server from another folder or a broken `.next`) → **404 with header**. Stop the process on 3000 (Task Manager or `Get-NetTCPConnection -LocalPort 3000`) or open the URL Next actually prints (e.g. **http://localhost:3001**).
3. **After moving the repo:** delete the project’s **`.next`** folder, then run **`npm run dev`** again. `predev` also removes a stray **`.next` junction** left from OneDrive so the app does not read another path’s cache.
4. **Browser:** test in **Chrome or Edge**. Some in-editor or “simple” browser previews mishandle localhost assets.
5. **After `git pull`:** run `npm install` so `cross-env` and scripts stay in sync with `package.json`.

### Best long-term fix (you)

**Move the repo outside OneDrive** (e.g. `C:\dev\Website`) or stop syncing the project folder / keep `.next` fully local. OneDrive will keep competing with any build cache under sync.

---

## `next lint`

`next lint` does **not** require the OneDrive `.next` redirect. No special flags needed.

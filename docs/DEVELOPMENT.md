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

**Cause:** Extra folders under `src/app/` that are **Windows reparse points** (junctions/symlinks) to empty or stale targets—often created by OneDrive or manual links—can confuse the App Router. Real routes live under `src/app/(marketing)/…`; you should **not** have parallel `src/app/about`, `src/app/blog`, `src/app/trust`, etc.

**Fix:** From the repo root run:

```bash
npm run fix:app-routes
```

That runs [`scripts/remove-stale-app-junctions.cjs`](../scripts/remove-stale-app-junctions.cjs), which removes known empty junction names under `src/app` (it skips any folder that already has `page.tsx`). If removal still fails, close dev servers, pause OneDrive briefly, and run the script again—or remove the junction manually with `cmd /c rmdir "src\app\<name>"`.

### Troubleshooting checklist

1. **DevTools → Network:** open `/` and confirm `/_next/static/css/*.css` returns **200** and a **non-zero** response size. If it’s 404 or tiny/empty, the build output or server is still wrong.
2. **One process per port:** stale `node` processes can serve an old build; stop extras or pick another port.
3. **Browser:** test in **Chrome or Edge**. Some in-editor or “simple” browser previews mishandle localhost assets.
4. **After `git pull`:** run `npm install` so `cross-env` and scripts stay in sync with `package.json`.

### Best long-term fix (you)

**Move the repo outside OneDrive** (e.g. `C:\dev\Website`) or stop syncing the project folder / keep `.next` fully local. OneDrive will keep competing with any build cache under sync.

---

## `next lint`

`next lint` does **not** require the OneDrive `.next` redirect. No special flags needed.

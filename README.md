# Stratavor Website

Marketing site for Stratavor — strategic intelligence & FP&A platform.

## Prerequisites

- **Node.js** (LTS) — [Download from nodejs.org](https://nodejs.org/) if not installed.

## Local development

```bash
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser.

**Project under OneDrive (or WSL path to OneDrive)?** See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) — the repo redirects `.next` off sync and uses `preserve-symlinks` so CSS/static assets stay reliable.

**`GET /` 404 in dev?** Run `npm run fix:app-routes` (removes stale empty junctions under `src/app`). Copy [`.env.example`](.env.example) to `.env.local` and set `NEXT_ALLOWED_DEV_ORIGINS` if you use a LAN IP.

**If `npm` is not recognized:** Node.js may not be in your PATH. Run the helper script instead:

```powershell
.\start-dev.ps1
```

The script looks for Node in common install locations and starts the dev server. If it still fails, install Node.js from the link above and restart Cursor.

## Build

```bash
npm run build
npm start
```

## Deploy

Pushes to `main` deploy via Vercel. Live preview: your Vercel project URL.

## Legacy static prototype

The old standalone homepage lives under [`archive/legacy-static-prototype/`](archive/legacy-static-prototype/) — it is **not** the Next.js app. Use `npm run dev` or [`start-preview.ps1`](start-preview.ps1) for local preview.

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

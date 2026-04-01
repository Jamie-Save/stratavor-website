# Stratavor - Start dev server (next dev)
$here = $PSScriptRoot
. (Join-Path $here "scripts\ensure-node.ps1")
. (Join-Path $here "scripts\ensure-next-junction.ps1")

if (-not (Import-StratavorNodePath)) {
    Write-Host ""
    Write-Host "Node.js was not found. Please install it first:" -ForegroundColor Yellow
    Write-Host "  1. Go to https://nodejs.org/"
    Write-Host "  2. Download the LTS version and run the installer"
    Write-Host "  3. Restart Cursor, then run this script again or use: npm run dev"
    Write-Host ""
    exit 1
}

Set-Location $here
Ensure-StratavorNextJunction -ProjectRoot $here
Write-Host ""
Write-Host "Tip: 404 routes, missing CSS, or __webpack_modules__ errors → stop dev, then: npm run dev:clean:local-next (or npm run dev:clean)" -ForegroundColor DarkGray
Write-Host ""
npm run dev

# Stratavor - Production build (next build)
$here = $PSScriptRoot
. (Join-Path $here "scripts\ensure-node.ps1")
. (Join-Path $here "scripts\ensure-next-junction.ps1")

if (-not (Import-StratavorNodePath)) {
    Write-Host ""
    Write-Host "Node.js was not found. Install from https://nodejs.org/ or add it to your PATH." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Set-Location $here
Ensure-StratavorNextJunction -ProjectRoot $here
npm run build

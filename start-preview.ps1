<#
.SYNOPSIS
  Production preview: runs next build (unless skipped), then next start.

.DESCRIPTION
  On OneDrive, redirects `.next` to %LOCALAPPDATA%\StratavorWebsite-next via a junction so
  CSS/static files are not broken (HTML loads but styles missing). Use -Clean if a build
  still looks wrong.
  Default port: first available from 4004 upward (-Port 0). Use -Port 3000 (etc.) to pin a port.

.EXAMPLE
  .\start-preview.ps1
  .\start-preview.ps1 -Port 3000
  .\start-preview.ps1 -Clean
  .\start-preview.ps1 -SkipBuild
#>
param(
    [int]$Port = 0,
    [switch]$Clean,
    [switch]$SkipBuild
)

$here = $PSScriptRoot
. (Join-Path $here "scripts\ensure-node.ps1")
. (Join-Path $here "scripts\ensure-next-junction.ps1")

if (-not (Import-StratavorNodePath)) {
    Write-Host "Node.js was not found. Install from https://nodejs.org/ or add to PATH." -ForegroundColor Yellow
    exit 1
}

Set-Location $here

function Get-StratavorAvailableTcpPort {
    param(
        [int]$Start = 4004,
        [int]$MaxAttempts = 100
    )
    for ($p = $Start; $p -lt $Start + $MaxAttempts; $p++) {
        $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $p)
        try {
            $listener.Start()
            $listener.Stop()
            return $p
        } catch {
            try { $listener.Stop() } catch { }
        }
    }
    throw "No available TCP port found between $Start and $($Start + $MaxAttempts - 1)."
}

if ($Port -le 0) {
    $Port = Get-StratavorAvailableTcpPort -Start 4004
    Write-Host "Using available port: $Port" -ForegroundColor DarkGray
}

if ($Clean) {
    Write-Host "Clean: removing previous build..." -ForegroundColor Cyan
    Remove-StratavorNextJunction -ProjectRoot $here
}

Ensure-StratavorNextJunction -ProjectRoot $here

$nextMarker = Join-Path $here ".next"

if (-not $SkipBuild) {
    Write-Host "Building production bundle..." -ForegroundColor Cyan
    npm run build
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
elseif (-not (Test-Path $nextMarker)) {
    Write-Host "-SkipBuild was set but .next is missing; building..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Host ""
Write-Host "Preview: http://localhost:$Port/  (Ctrl+C to stop)" -ForegroundColor Green
Write-Host "Tip: open in Chrome/Edge (not a restricted preview pane) if styles still look off." -ForegroundColor DarkGray
Write-Host ""

# Required when .next is a junction (OneDrive fix): Node must resolve modules from project path
if ($env:NODE_OPTIONS -notmatch "preserve-symlinks") {
    $env:NODE_OPTIONS = ("$env:NODE_OPTIONS --preserve-symlinks").Trim()
}

npx next start -p $Port

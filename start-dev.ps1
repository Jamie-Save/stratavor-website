# Stratavor - Start dev server (tries to find Node if not in PATH)
$nodePaths = @(
    "C:\Program Files\nodejs",
    "${env:ProgramFiles}\nodejs",
    "${env:ProgramFiles(x86)}\nodejs",
    "$env:LOCALAPPDATA\Programs\node"
)

$found = $false
foreach ($path in $nodePaths) {
    if (Test-Path "$path\node.exe") {
        $env:Path = "$path;$env:Path"
        $found = $true
        Write-Host "Using Node at: $path"
        break
    }
}

if (-not $found) {
    Write-Host ""
    Write-Host "Node.js was not found. Please install it first:" -ForegroundColor Yellow
    Write-Host "  1. Go to https://nodejs.org/"
    Write-Host "  2. Download the LTS version and run the installer"
    Write-Host "  3. Restart Cursor, then run this script again or use: npm run dev"
    Write-Host ""
    exit 1
}

Set-Location $PSScriptRoot
npm run dev

# OneDrive breaks Next.js `.next` (readlink errors, empty static/CSS). Redirect `.next` to
# local disk via a directory junction so `next build` / `next start` / `next dev` stay correct.
#
# Target path MUST match `scripts/ensure-next-junction.cjs` (hash of resolved project root),
# or webpack can load chunks from the wrong folder → "__webpack_modules__[moduleId] is not a function".

function Test-StratavorOneDriveProject {
    param([string]$ProjectRoot)
    return (($ProjectRoot -replace '\\', '/') -match '(?i)/OneDrive/')
}

function Get-StratavorNextProjectSlug {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ProjectRoot
    )
    try {
        $resolved = (Resolve-Path -LiteralPath $ProjectRoot -ErrorAction Stop).Path
    }
    catch {
        $resolved = [System.IO.Path]::GetFullPath($ProjectRoot)
    }
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($resolved)
    $hash = [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
    return (-join ($hash | ForEach-Object { $_.ToString("x2") })).Substring(0, 12)
}

function Get-StratavorNextTargetDir {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ProjectRoot
    )
    $base = $env:LOCALAPPDATA
    if (-not $base) { $base = $env:TEMP }
    $slug = Get-StratavorNextProjectSlug -ProjectRoot $ProjectRoot
    return (Join-Path $base (Join-Path "StratavorWebsite-next" (Join-Path $slug ".next")))
}

function Test-StratavorSamePath {
    param([string]$A, [string]$B)
    if (-not $A -or -not $B) { return $false }
    try {
        $fa = [System.IO.Path]::GetFullPath($A.TrimEnd('\', '/'))
        $fb = [System.IO.Path]::GetFullPath($B.TrimEnd('\', '/'))
        return [string]::Equals($fa, $fb, [System.StringComparison]::OrdinalIgnoreCase)
    }
    catch {
        return $false
    }
}

function Get-StratavorJunctionTarget {
    param([string]$LinkPath)
    try {
        $item = Get-Item -LiteralPath $LinkPath -Force -ErrorAction Stop
        $raw = $item.Target
        if ($null -ne $raw -and $raw -ne '') {
            if ($raw -is [System.Array]) {
                return [string]($raw -join '')
            }
            return [string]$raw
        }
    }
    catch { }
    # Windows PowerShell 5.1: junction target via fsutil
    $lines = cmd.exe /c "fsutil reparsepoint query `"$LinkPath`"" 2>$null
    if (-not $lines) { return $null }
    foreach ($line in $lines) {
        if ($line -match 'Print Name:\s*(.+)') {
            return $matches[1].Trim()
        }
    }
    return $null
}

function Ensure-StratavorNextJunction {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ProjectRoot
    )

    if (-not (Test-StratavorOneDriveProject -ProjectRoot $ProjectRoot)) {
        return
    }

    if ($env:STRATAVOR_NEXT_NO_JUNCTION -eq '1') {
        $link = Join-Path $ProjectRoot ".next"
        if (Test-Path $link) {
            $item = Get-Item -LiteralPath $link -Force -ErrorAction SilentlyContinue
            $isReparse = $item -and ($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint)
            if ($isReparse) {
                cmd.exe /c rmdir "$link" 2>$null
                Write-Host "[stratavor] STRATAVOR_NEXT_NO_JUNCTION=1: removed .next junction (in-project .next for dev)." -ForegroundColor DarkGray
            }
        }
        return
    }

    if ($PSVersionTable.PSVersion.Major -lt 5) {
        Write-Host "PowerShell 5+ recommended for OneDrive + Next.js." -ForegroundColor Yellow
        return
    }

    $target = Get-StratavorNextTargetDir -ProjectRoot $ProjectRoot
    $link = Join-Path $ProjectRoot ".next"

    New-Item -ItemType Directory -Force -Path (Split-Path $target -Parent) | Out-Null
    if (-not (Test-Path $target)) {
        New-Item -ItemType Directory -Force -Path $target | Out-Null
    }

    if (Test-Path $link) {
        $item = Get-Item -LiteralPath $link -Force -ErrorAction SilentlyContinue
        $isReparse = $item -and ($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint)
        if ($isReparse) {
            $dest = Get-StratavorJunctionTarget -LinkPath $link
            if ($dest -and (Test-StratavorSamePath $dest $target)) {
                return
            }
            Write-Host "Replacing .next junction (target must match Node ensure-next-junction.cjs) -> $target" -ForegroundColor Cyan
            cmd.exe /c rmdir "$link" 2>$null
        }
        else {
            Write-Host "Replacing project .next with junction -> $target" -ForegroundColor Cyan
            Remove-Item -LiteralPath $link -Recurse -Force
        }
    }

    try {
        New-Item -ItemType Junction -Path $link -Target $target -Force | Out-Null
        Write-Host "Using build directory (junction): $target" -ForegroundColor DarkGray
    }
    catch {
        Write-Host "Could not create .next junction: $_" -ForegroundColor Yellow
        Write-Host "Try: move the repo out of OneDrive, or run Terminal as Administrator." -ForegroundColor Yellow
    }
}

function Remove-StratavorNextJunction {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ProjectRoot
    )

    if (-not (Test-StratavorOneDriveProject -ProjectRoot $ProjectRoot)) {
        if (Test-Path (Join-Path $ProjectRoot ".next")) {
            Remove-Item -Recurse -Force (Join-Path $ProjectRoot ".next")
        }
        return
    }

    $link = Join-Path $ProjectRoot ".next"
    $target = Get-StratavorNextTargetDir -ProjectRoot $ProjectRoot

    if (Test-Path $link) {
        $item = Get-Item -LiteralPath $link -Force -ErrorAction SilentlyContinue
        $isReparse = $item -and ($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint)
        if ($isReparse) {
            cmd.exe /c rmdir "$link" 2>$null
        }
        else {
            Remove-Item -LiteralPath $link -Recurse -Force
        }
    }

    if (Test-Path $target) {
        Remove-Item -LiteralPath $target -Recurse -Force
    }
}

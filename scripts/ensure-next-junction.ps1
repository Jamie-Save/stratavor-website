# OneDrive breaks Next.js `.next` (readlink errors, empty static/CSS). Redirect `.next` to
# local disk via a directory junction so `next build` / `next start` / `next dev` stay correct.
function Test-StratavorOneDriveProject {
    param([string]$ProjectRoot)
    return (($ProjectRoot -replace '\\', '/') -match '(?i)/OneDrive/')
}

function Get-StratavorNextTargetDir {
    $base = $env:LOCALAPPDATA
    if (-not $base) { $base = $env:TEMP }
    return (Join-Path $base "StratavorWebsite-next\.next")
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

    $target = Get-StratavorNextTargetDir
    $link = Join-Path $ProjectRoot ".next"

    New-Item -ItemType Directory -Force -Path (Split-Path $target -Parent) | Out-Null
    if (-not (Test-Path $target)) {
        New-Item -ItemType Directory -Force -Path $target | Out-Null
    }

    if (Test-Path $link) {
        $item = Get-Item -LiteralPath $link -Force -ErrorAction SilentlyContinue
        $isReparse = $item -and ($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint)
        if ($isReparse) {
            return
        }
        Write-Host "Replacing project .next with junction -> $target (avoids OneDrive build issues)" -ForegroundColor Cyan
        Remove-Item -LiteralPath $link -Recurse -Force
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
    $target = Get-StratavorNextTargetDir

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

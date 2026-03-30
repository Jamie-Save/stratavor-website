# Shared helper: ensure node.exe is on PATH (Windows installs outside PATH)
function Import-StratavorNodePath {
    if (Get-Command node -ErrorAction SilentlyContinue) {
        return $true
    }
    $candidates = @(
        "C:\Program Files\nodejs",
        "${env:ProgramFiles}\nodejs",
        "${env:ProgramFiles(x86)}\nodejs",
        "$env:LOCALAPPDATA\Programs\node"
    )
    foreach ($dir in $candidates) {
        $exe = Join-Path $dir "node.exe"
        if (Test-Path $exe) {
            $env:Path = "$dir;$env:Path"
            Write-Host "Using Node at: $dir"
            return $true
        }
    }
    return $false
}

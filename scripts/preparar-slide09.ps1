$ErrorActionPreference = 'Stop'
$dest = Join-Path $PSScriptRoot '..\public\clase6\slide09'
New-Item -ItemType Directory -Path $dest -Force | Out-Null
$assets = @{
    'rapr.png' = 'https://github.com/user-attachments/assets/2d7df896-494d-4bcd-b064-5f05696cd0d3'
    'double-driver.png' = 'https://cdn.lo4d.com/t/screenshot/800/double-driver.png'
    'ddu.png' = 'https://cdn.lo4d.com/t/screenshot/800/display-driver-uninstaller.png'
    'restore.png' = 'https://support.microsoft.com/es-es/windows/media/system-restore-1.png'
}
foreach ($name in $assets.Keys) {
    $path = Join-Path $dest $name
    if (Test-Path $path) { continue }
    try { Invoke-WebRequest -Uri $assets[$name] -OutFile $path -UseBasicParsing; Write-Host "OK: $name" } catch { Write-Warning "No se pudo obtener $name : $_" }
}

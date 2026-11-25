$ErrorActionPreference = 'Stop'
$dest = Join-Path $PSScriptRoot '..\public\clase6\slide12'
New-Item -ItemType Directory -Path $dest -Force | Out-Null
$assets = @{
    'crystaldiskinfo.png' = 'https://crystalmark.info/wp-content/uploads/sites/3/CrystalDiskInfo8Shizuku-en-300x250-1.png'
}
foreach ($name in $assets.Keys) {
    $path = Join-Path $dest $name
    if (Test-Path -LiteralPath $path) { Write-Host "Existe: $name"; continue }
    try { Invoke-WebRequest -UseBasicParsing -Uri $assets[$name] -OutFile $path -TimeoutSec 30; Write-Host "OK: $name" }
    catch { Write-Warning ("Pendiente: " + $name + ": " + $_.Exception.Message) }
}
Write-Host 'Video local opcional: public\clase6\slide12\furmark-demo.mp4'
Write-Host 'Las demas capturas se incorporaran desde fuentes verificadas.'

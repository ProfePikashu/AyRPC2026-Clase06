$ErrorActionPreference = 'Stop'
$downloads = (Get-ItemProperty -LiteralPath 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders' -Name '{374DE290-123F-4565-9164-39C4925E467B}').'{374DE290-123F-4565-9164-39C4925E467B}'
$downloads = [Environment]::ExpandEnvironmentVariables($downloads)
$root = Join-Path $downloads 'AyRPC2026-Clase06'
foreach ($n in 1..15) {
 $folder = Join-Path $root ('Slide-{0:D2}' -f $n)
 New-Item -ItemType Directory -Path $folder -Force | Out-Null
}
Write-Host "Recursos: $root"

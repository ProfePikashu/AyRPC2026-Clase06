$ErrorActionPreference = 'Stop'
$downloads = (Get-ItemProperty -LiteralPath 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders' -Name '{374DE290-123F-4565-9164-39C4925E467B}').'{374DE290-123F-4565-9164-39C4925E467B}'
$downloads = [Environment]::ExpandEnvironmentVariables($downloads)
$folder = Join-Path $downloads 'AyRPC2026-Clase06\Slide-04'
New-Item -ItemType Directory -Path $folder -Force | Out-Null
$target = Join-Path $folder 'device-manager.png'
if (!(Test-Path -LiteralPath $target)) {
 Invoke-WebRequest -UseBasicParsing -Uri 'https://km-ap.asus.com/uploads/PhotoLibrarys/8a53fc79-6a00-4a96-8408-a7e886967aef/20231101142421351_EN_1.png' -OutFile $target
}
$public = Join-Path $PSScriptRoot '..\public\clase6\slide04'
New-Item -ItemType Directory -Path $public -Force | Out-Null
$dest = Join-Path $public 'device-manager.png'
if (!(Test-Path -LiteralPath $dest)) { Copy-Item -LiteralPath $target -Destination $dest }
Write-Host "Captura preparada: $dest"

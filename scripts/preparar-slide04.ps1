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

$assets = @(
 @{ Name = 'linux-hardinfo.jpg'; Url = 'https://www.xmodulo.com/img/140.jpg' },
 @{ Name = 'linux-additional-drivers.png'; Url = 'https://www.dell.com/community/assets/community/687062f5-603c-4f5f-ab9d-31aa7cacb376/additional_drivers-0c75a9ee-73af-4705-86b1-5e6d2318f4eb-1480671506.png' }
)
foreach ($asset in $assets) {
 $target = Join-Path $folder $asset.Name
 $dest = Join-Path $public $asset.Name
 if (!(Test-Path -LiteralPath $target)) {
  try { Invoke-WebRequest -UseBasicParsing -Uri $asset.Url -OutFile $target } catch { Write-Warning ('No se pudo descargar ' + $asset.Name); continue }
 }
 if (!(Test-Path -LiteralPath $dest)) { Copy-Item -LiteralPath $target -Destination $dest }
}

$ErrorActionPreference = 'Stop'
$downloads = (Get-ItemProperty -LiteralPath 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders' -Name '{374DE290-123F-4565-9164-39C4925E467B}').'{374DE290-123F-4565-9164-39C4925E467B}'
$downloads = [Environment]::ExpandEnvironmentVariables($downloads)
$folder = Join-Path $downloads 'AyRPC2026-Clase06\Slide-06'
$public = Join-Path $PSScriptRoot '..\public\clase6\slide06'
New-Item -ItemType Directory -Path $folder,$public -Force | Out-Null
$assets = @(
 @{ Name = 'driver-booster-scan.jpg'; Url = 'https://www.iobit.com/product-manuals/db-help/images/scan-result.jpg' },
 @{ Name = 'sdio.jpg'; Url = 'https://www.free-codecs.com/pictures/screenshots/sdio.jpg' },
 @{ Name = 'driveridentifier.jpg'; Url = 'https://cdn.soft112.com/driver-identifier/00/00/00/AZ/000000AZTK/driver-identifier-01.jpg' }
)
foreach ($asset in $assets) {
 $target = Join-Path $folder $asset.Name
 $dest = Join-Path $public $asset.Name
 if (!(Test-Path -LiteralPath $target)) {
  try { $response = Invoke-WebRequest -UseBasicParsing -Uri $asset.Url; if ($response.Headers['Content-Type'] -notmatch '^image/') { throw 'No es una imagen' }; [IO.File]::WriteAllBytes($target,$response.RawContentStream.ToArray()) } catch { Write-Warning ('No se pudo descargar ' + $asset.Name) }
 }
 if ((Test-Path -LiteralPath $target) -and !(Test-Path -LiteralPath $dest)) { Copy-Item -LiteralPath $target -Destination $dest }
}

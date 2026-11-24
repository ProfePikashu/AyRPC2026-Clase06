$ErrorActionPreference = 'Stop'
$downloads = (Get-ItemProperty -LiteralPath 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders' -Name '{374DE290-123F-4565-9164-39C4925E467B}').'{374DE290-123F-4565-9164-39C4925E467B}'
$downloads = [Environment]::ExpandEnvironmentVariables($downloads)
$folder = Join-Path $downloads 'AyRPC2026-Clase06\Slide-05'
$public = Join-Path $PSScriptRoot '..\public\clase6\slide05'
New-Item -ItemType Directory -Path $folder,$public -Force | Out-Null
$assets = @(
 @{ Name = 'windows-update-drivers.webp'; Url = 'https://ugetfix.com/pic/w1080q75/uploads/how-to/update-reinstall-driver-windows-11-04-windows-update-optional-updates.png.webp' },
 @{ Name = 'amd-x870e-soporte.png'; Url = 'https://www.amd.com/content/dam/amd/en/images/kb/chipset-install/chipset-install-2.png' },
 @{ Name = 'driver-booster-scan.jpg'; Url = 'https://www.iobit.com/product-manuals/db-help/images/scan-result.jpg' },
 @{ Name = 'device-manager-hardware-id.jpeg'; Url = 'https://supportkb.dell.com/img/ka0Do000000Zx0OIAS/ka0Do000000Zx0OIAS_en_US_4.jpeg' },
 @{ Name = 'linux-updates-kernel-firmware.png'; Url = 'https://ubuntu.com/desktop/docs/en/latest/_images/software-updater.png' },
 @{ Name = 'linux-fabricante-docs.png'; Url = '' },
 @{ Name = 'ubuntu-additional-drivers.png'; Url = 'https://bugs.launchpad.net/bugs/1976302/+attachment/5593898/+files/AdditionalDriversTab.png' },
 @{ Name = 'linux-lspci-lsusb-ids.png'; Url = '' }
)
foreach ($asset in $assets) {
 $target = Join-Path $folder $asset.Name
 $dest = Join-Path $public $asset.Name
 if (!(Test-Path -LiteralPath $target) -and $asset.Url) {
  try { $response = Invoke-WebRequest -UseBasicParsing -Uri $asset.Url; if ($response.Headers['Content-Type'] -notmatch '^image/') { throw 'No es una imagen' }; [IO.File]::WriteAllBytes($target,$response.RawContentStream.ToArray()) } catch { Write-Warning ('No se pudo descargar ' + $asset.Name) }
 }
 if ((Test-Path -LiteralPath $target) -and !(Test-Path -LiteralPath $dest)) { Copy-Item -LiteralPath $target -Destination $dest }
 if (!(Test-Path -LiteralPath $dest)) { Write-Warning ('Pendiente: ' + $asset.Name) }
}

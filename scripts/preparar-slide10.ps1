$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$dest = Join-Path $PSScriptRoot '..\public\clase6\slide10'
New-Item -ItemType Directory -Path $dest -Force | Out-Null
$assets = @{
    'taskmgr.png' = 'https://support.microsoft.com/en-us/windows/media/task-manager-performance.png'
    'dxdiag.png' = 'https://www.intel.com/content/dam/support/us/en/images/graphics/sb/img/22556_image1.jpg'
    'perfmon.png' = 'https://learn.microsoft.com/en-us/troubleshoot/windows-server/performance/media/troubleshoot-performance-problems-in-windows/performance-monitor-and-data-collector-sets.png'
    'resmon.png' = 'https://techcommunity.microsoft.com/t5/s/gxcuf89792/images/bS0zNzUwMDgtOTI5MDhpNTBGMTdCREU2N0JDNDcxOQ?image-dimensions=564x398&revision=2'
    'services.png' = 'https://www.elevenforum.com/attachments/services-1-png.14766/'
    'diskmgmt.png' = 'https://www.elevenforum.com/attachments/disk_management_customize_view-1-png.115932/'
    'devmgmt.png' = 'https://km-ap.asus.com/uploads/PhotoLibrarys/8a53fc79-6a00-4a96-8408-a7e886967aef/20231101142421351_EN_1.png'
}
foreach ($name in $assets.Keys) {
    $path = Join-Path $dest $name
    if (Test-Path -LiteralPath $path) { Write-Host "Existe: $name"; continue }
    $tmp = Join-Path $dest ($name + '.download')
    try {
        Invoke-WebRequest -UseBasicParsing -Uri $assets[$name] -OutFile $tmp -TimeoutSec 30
        $img = [System.Drawing.Image]::FromFile($tmp)
        try { $img.Save($path, [System.Drawing.Imaging.ImageFormat]::Png) } finally { $img.Dispose() }
        Write-Host "OK: $name"
    } catch { Write-Warning ("No se pudo preparar " + $name + ": " + $_.Exception.Message) }
    finally { if (Test-Path -LiteralPath $tmp) { Remove-Item -LiteralPath $tmp } }
}

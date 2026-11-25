$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$dest = Join-Path $PSScriptRoot '..\public\clase6\slide10'
New-Item -ItemType Directory -Path $dest -Force | Out-Null
$assets = @{
    'regedit.png' = 'https://learn-attachment.microsoft.com/api/attachments/f65636b3-405b-42c7-a4e8-9f4d9e81fa54?platform=QnA'
    'taskmgr.png' = 'https://support.microsoft.com/en-us/windows/media/task-manager-performance.png'
    'dxdiag.png' = 'https://extras.foroswindows.com/img/post/69/version-directx-directx-12-ss.jpg'
    'perfmon.png' = 'https://learn.microsoft.com/en-us/troubleshoot/windows-server/performance/media/troubleshoot-performance-problems-in-windows/performance-monitor-and-data-collector-sets.png'
    'resmon.png' = 'https://techcommunity.microsoft.com/t5/s/gxcuf89792/images/bS0zNzUwMDgtOTI5MDhpNTBGMTdCREU2N0JDNDcxOQ?image-dimensions=564x398&revision=2'
    'services.png' = 'https://support.auvik.com/hc/article_attachments/38403367742612'
    'diskmgmt.png' = 'https://learn.microsoft.com/en-us/troubleshoot/windows-server/backup-and-storage/media/troubleshoot-disk-management/healthy-volume.png'
    'devmgmt.png' = 'https://km-ap.asus.com/uploads/PhotoLibrarys/8a53fc79-6a00-4a96-8408-a7e886967aef/20231101142421351_EN_1.png'
    'msinfo32.webp' = 'https://bcdn.askleo.com/wp-content/uploads/2022/07/msinfo32-1200x630.jpg.webp'
    'eventvwr.png' = 'https://learn.microsoft.com/en-us/troubleshoot/windows-server/performance/media/troubleshoot-unexpected-reboots-system-event-logs/system-event-log-41-1001-6008.png'
    'msconfig.png' = 'https://www.guidingtech.com/wp-content/uploads/The-General-Tab.png'
    'reliability.webp' = 'https://rebootdoctor.com/images/blog/reliability-monitor-windows-11/step2-stability-chart-critical-event.webp'
    'sysdm.png' = 'https://storage.ghost.io/c/b9/32/b9320fa4-9d41-450c-82d4-f517eadd2af7/content/images/2024/08/Screenshot-2024-08-19-094547-2-1.png'
    'msconfig-boot.png' = 'https://www.guidingtech.com/wp-content/uploads/The-Boot-Tab.png'
    'msconfig-services.png' = 'https://www.guidingtech.com/wp-content/uploads/The-Services-Tab.png'
    'msconfig-startup.png' = 'https://www.guidingtech.com/wp-content/uploads/The-Startup-Tab.png'
    'msconfig-tools.png' = 'https://www.guidingtech.com/wp-content/uploads/The-Tools-Tab-1.png'
}
foreach ($name in $assets.Keys) {
    $path = Join-Path $dest $name
    if (Test-Path -LiteralPath $path) { Write-Host "Existe: $name"; continue }
    $tmp = Join-Path $dest ($name + '.download')
    try {
        Invoke-WebRequest -UseBasicParsing -Uri $assets[$name] -OutFile $tmp -TimeoutSec 30
        if ($name.EndsWith('.webp')) {
            $bytes = [System.IO.File]::ReadAllBytes($tmp)
            if ($bytes.Length -lt 12 -or [Text.Encoding]::ASCII.GetString($bytes,0,4) -ne 'RIFF' -or [Text.Encoding]::ASCII.GetString($bytes,8,4) -ne 'WEBP') { throw 'Not a WebP image' }
            Copy-Item -LiteralPath $tmp -Destination $path
        } else {
            $img = [System.Drawing.Image]::FromFile($tmp)
            try { $img.Save($path, [System.Drawing.Imaging.ImageFormat]::Png) } finally { $img.Dispose() }
        }
        Write-Host "OK: $name"
    } catch { Write-Warning ("No se pudo preparar " + $name + ": " + $_.Exception.Message) }
    finally { if (Test-Path -LiteralPath $tmp) { Remove-Item -LiteralPath $tmp } }
}

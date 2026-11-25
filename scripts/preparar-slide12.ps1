$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$dest = Join-Path $PSScriptRoot '..\public\clase6\slide12'
New-Item -ItemType Directory -Path $dest -Force | Out-Null
$assets = [ordered]@{
    'furmark.png' = 'https://dl.flathub.org/media/com/geeks3d/furmark/0fc4b4cd52cd5daa359ee64764c02d81/screenshots/image-2_orig.png'
    'crystaldiskinfo-shizuku.png' = 'https://i.imgur.com/lXa3hGFl.jpg'
    'crystaldiskmark.png' = 'https://crystalmark.info/en/wp-content/uploads/sites/3/CDM9Shizuku-en-1024x558.png'
    'hwinfo.png' = 'https://au.aorus.com/upload/Admin/images/HWiNFO_AORUS_Theme_Black.png'
    'cinebench.png' = 'https://substack-post-media.s3.amazonaws.com/public/images/5fdbbe3f-8724-44a8-a243-c6edf723cd47_1699x978.jpeg'
    'occt.png' = 'https://hardzone.es/app/uploads-hardzone.es/2024/05/Prueba-OCCT-en-marcha.jpg'
    'memtest86plus.png' = 'https://i.blogs.es/b84b99/memtest/650_1200.jpg'
    'bluescreenview.png' = 'https://www.nirsoft.net/utils/bluescreenview.gif'
    'cpuz.png' = 'https://tweakers.net/ext/i/2007328404.png'
    'gpuz.png' = 'https://static.tweaktown.com/news/8/1/81033_07_gpu-2-41-0-receives-support-for-amds-new-radeon-rx-6600-xt_full.png'
    'aida64.png' = 'https://ms.codes/cdn/shop/articles/08_tools_11_br7ryznueg.png?v=1707880494'
}
$ok = 0
$missing = @()
foreach ($name in $assets.Keys) {
 $path = Join-Path $dest $name
 if (Test-Path -LiteralPath $path) { Write-Host "Existe: $name"; $ok++; continue }
 $tmp = Join-Path $dest ($name + '.download')
 try {
  Invoke-WebRequest -UseBasicParsing -Uri $assets[$name] -OutFile $tmp -TimeoutSec 30 -UserAgent 'Mozilla/5.0'
  $img = [System.Drawing.Image]::FromFile($tmp)
  try { $img.Save($path, [System.Drawing.Imaging.ImageFormat]::Png) } finally { $img.Dispose() }
  Write-Host "OK: $name"; $ok++
 } catch { Write-Warning ("Pendiente: " + $name + ": " + $_.Exception.Message); $missing += $name }
 finally { if (Test-Path -LiteralPath $tmp) { Remove-Item -LiteralPath $tmp } }
}
Write-Host ("Capturas: {0}/{1}" -f $ok,$assets.Count)
if ($missing.Count -gt 0) { Write-Warning ($missing -join ', ') }

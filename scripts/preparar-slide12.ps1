$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$dest = Join-Path $PSScriptRoot '..\public\clase6\slide12'
New-Item -ItemType Directory -Path $dest -Force | Out-Null
$assets = [ordered]@{
    'furmark.png' = @('https://dl.flathub.org/media/com/geeks3d/furmark/0fc4b4cd52cd5daa359ee64764c02d81/screenshots/image-2_orig.png')
    'crystaldiskinfo-shizuku.png' = @('https://i.imgur.com/lXa3hGFl.jpg')
    'crystaldiskmark.png' = @('https://crystalmark.info/en/wp-content/uploads/sites/3/CDM9Shizuku-en-1024x558.png')
    'hwinfo.png' = @('https://img.utdstc.com/screen/1c9/8c8/1c98c84617ea165ce807b021cf56d8cc02e167cbf095de9b075f946f241127e2%3A600')
    'cinebench.png' = @('https://substack-post-media.s3.amazonaws.com/public/images/5fdbbe3f-8724-44a8-a243-c6edf723cd47_1699x978.jpeg')
    'occt.png' = @('https://hardzone.es/app/uploads-hardzone.es/2024/05/Prueba-OCCT-en-marcha.jpg')
    'memtest86plus.png' = @('https://i.blogs.es/b84b99/memtest/650_1200.jpg')
    'bluescreenview.png' = @('https://www.nirsoft.net/utils/bluescreenview.gif')
    'cpuz.png' = @('https://www.notebookcheck.net/fileadmin/Notebooks/Lenovo/ThinkStation_P3_Tiny-30H0006AGE/cpuz_1.jpg')
    'gpuz.png' = @('https://static.tweaktown.com/news/8/1/81033_07_gpu-2-41-0-receives-support-for-amds-new-radeon-rx-6600-xt_full.png')
    'aida64.png' = @('https://ms.codes/cdn/shop/articles/08_tools_11_br7ryznueg.png?v=1707880494')
    'memtest86.png' = @('https://www.windowsnoticias.com/wp-content/uploads/2025/04/test_screen.png', 'https://livedoor.blogimg.jp/ocworks/imgs/5/b/5b979f81.png')
    'windbg.png' = @('https://nvidia.custhelp.com/rnt/rnw/img/enduser/aid_5629_03.png', 'https://cdn.mos.cms.futurecdn.net/BsLGnD6NxsjRtKXsavQ2UR.jpg')
    'prime95.png' = @('https://cdn.lo4d.com/t/screenshot/800/prime95-4.png')
    'lhm.png' = @('https://i.sstatic.net/gBsUP.png')
    'gsmartcontrol.png' = @('https://cdn.lo4d.com/t/screenshot/800/gsmartcontrol-4.png')
    'smartctl.png' = @('https://a.fsdn.com/con/app/proj/smartmontools/screenshots/show-attribute-table.png')
    'hdsentinel.png' = @('https://www.hdsentinel.com/help/en/img_01_mainwindow.jpg')
    'hddscan.png' = @('https://hddscan.com/img/doc/07.jpg')
    'heaven.png' = @('https://www.alktech.co/hs-fs/hubfs/ASUS%20DUAL%20Radeon%20RX%206650%20XT%20OC%208GB%20GDDR6/Ungine%20Test%20without%20OBS.jpg?height=1080&name=Ungine+Test+without+OBS.jpg&width=1920')
    '3dmark.png' = @('https://benchmarks.ul.com/images/contentboxes/3dmark-stress-test-time-spy-cb.jpg')
    'testmem5.png' = @('https://raw.githubusercontent.com/CoolCmd/TestMem5/main/Screenshot.png')
    'ycruncher.png' = @('https://www.computerbase.de/forum/attachments/1668035358805-png.1281746/')
    'xtu.png' = @('https://www.comptoir-hardware.com/images/stories/articles/cpu/alder_lake/12900k_xtu_t.png')
    'ryzenmaster.png' = @('https://pcforum.amd.com/sfc/servlet.shepherd/version/renditionDownload?contentId=05TPd00000opFVY&operationContext=CHATTER&page=0&rendition=THUMB720BY480&versionId=068Pd00000f9UPF')
    'whocrashed.png' = @('https://www.downloadsource.net/image/uploaded/news/WhoCrashed/whocrashed1.png?fit=max&s=0a97cd88d352548a21be52af8a66c12d', 'https://www.resplendence.com/images/whocrashed_screen.jpg')
}
$ok = 0
$missing = @()
foreach ($name in $assets.Keys) {
 $path = Join-Path $dest $name
 if (Test-Path -LiteralPath $path) { Write-Host "Existe: $name"; $ok++; continue }
 $tmp = Join-Path $dest ($name + '.download')
 $saved = $false
 foreach ($uri in $assets[$name]) {
  try {
   Invoke-WebRequest -UseBasicParsing -Uri $uri -OutFile $tmp -TimeoutSec 30 -UserAgent 'Mozilla/5.0'
   $img = [System.Drawing.Image]::FromFile($tmp)
   try { $img.Save($path, [System.Drawing.Imaging.ImageFormat]::Png) } finally { $img.Dispose() }
   Write-Host "OK: $name"; $ok++; $saved = $true
   break
  } catch { Write-Warning ("Error: " + $name + ": " + $_.Exception.Message) }
  finally { if (Test-Path -LiteralPath $tmp) { Remove-Item -LiteralPath $tmp } }
 }
 if (!$saved) { $missing += $name }
}
Write-Host ("Capturas: {0}/{1}" -f $ok,$assets.Count)
if ($missing.Count -gt 0) { Write-Warning ($missing -join ', ') }

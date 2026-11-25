$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$dest = Join-Path $PSScriptRoot '..\public\clase6\slide11'
New-Item -ItemType Directory -Path $dest -Force | Out-Null
$assets = @{
    'bleachbit.png' = 'https://github.com/user-attachments/assets/d358d998-0f43-44ea-9fb9-faebde4c4ee6'
    'iobit.png' = 'https://www.chip.de/ii/8/6/5/9/9/1/3/9e8094808ea8f7d3.jpg'
    'minitool.png' = 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/169370/Originals/Cach-tai-minitool-partition-wizard-9.jpg'
    'adwcleaner.png' = 'https://img.utdstc.com/screen/410/5be/4105bea3c370ddcb30b88d33eab5af9b1062eff86d3b103a5461ee90b9f11b8a%3A600'
    'recuva.png' = 'https://www.fonepaw.com/static/uploads/69/d/recuva-interface.jpg'
    'diskgenius.png' = 'https://www.diskgenius.com/how-to/img/the-boot-selection-failed-because-a-required-device-is-inaccessible-04.png'
    'gparted.png' = 'https://news-cdn.softpedia.com/images/news2/gparted-open-source-partition-editor-reaches-1-0-milestone-after-almost-15-years-526221-2.jpg'
    'bcu.png' = 'https://www.bug.hr/img/bulk-crap-uninstaller-bcuninstaller-583-deinstalacija-programa_5Ajwxi.png'
    'windirstat.png' = 'https://poakpong.com/sites/default/files/2025/02/windirstat-001.png'
    'photorec.png' = 'https://www.cisdem.com/media/upload/2026/03/30/qphotorec01.png'
    'autoruns.png' = 'https://www.coretechnologies.com/blog/images/autoruns-main-window.png'
    'aomei.png' = 'https://windows-cdn.softpedia.com/screenshots/Partition-Assistant-Home-Edition_15.png'
    'ddrescue.png' = 'https://www.computerbase.de/forum/attachments/1-png.1600877/'
    'malwarebytes.png' = 'https://media.cybernews.com/2025/10/malwarebytes-full-scan.png'
    'czkawka.png' = 'https://1.bp.blogspot.com/-HSh2FfjBpE8/YEtsMDv3YwI/AAAAAAAAFWw/0trwy5dvZQ01jLilV2ZLLoFhgxdvqbmSACLcBGAsYHQ/s1278/Czkawka-duplicate-finder-gui-in-linux.png'
    'revo.png' = 'https://www.ghacks.net/wp-content/uploads/2015/04/revo-uninstaller.jpg'
}
foreach ($name in $assets.Keys) {
 $path = Join-Path $dest $name
 if (Test-Path -LiteralPath $path) { Write-Host "Existe: $name"; continue }
 $tmp = Join-Path $dest ($name + '.download')
 try {
  Invoke-WebRequest -UseBasicParsing -Uri $assets[$name] -OutFile $tmp -TimeoutSec 25
  $img = [System.Drawing.Image]::FromFile($tmp)
  try { $img.Save($path, [System.Drawing.Imaging.ImageFormat]::Png) } finally { $img.Dispose() }
  Write-Host "OK: $name"
 } catch { Write-Warning ("No se pudo preparar " + $name + ": " + $_.Exception.Message) }
 finally { if (Test-Path -LiteralPath $tmp) { Remove-Item -LiteralPath $tmp } }
}

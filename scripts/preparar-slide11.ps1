$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$dest = Join-Path $PSScriptRoot '..\public\clase6\slide11'
New-Item -ItemType Directory -Path $dest -Force | Out-Null
$assets = [ordered]@{
    'bleachbit.png' = @('https://github.com/user-attachments/assets/d358d998-0f43-44ea-9fb9-faebde4c4ee6')
    'iobit.png' = @('https://assets.hongkiat.com/uploads/batch-install-uninstall-windows/IObit-Uninstaller-13.jpg')
    'minitool.png' = @('https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/169370/Originals/Cach-tai-minitool-partition-wizard-9.jpg')
    'adwcleaner.png' = @('https://img.utdstc.com/screen/410/5be/4105bea3c370ddcb30b88d33eab5af9b1062eff86d3b103a5461ee90b9f11b8a%3A600')
    'recuva.png' = @('https://www.fonepaw.com/static/uploads/69/d/recuva-interface.jpg')
    'diskgenius-main.png' = @('https://images.filepuma.com/screenshots/utilities/diskgenius/wa_FP-diskgenius_f1c6800e67aa05f804485892066.png')
    'gparted.png' = @('https://news-cdn.softpedia.com/images/news2/gparted-open-source-partition-editor-reaches-1-0-milestone-after-almost-15-years-526221-2.jpg')
    'bcu.png' = @('https://www.bug.hr/img/bulk-crap-uninstaller-bcuninstaller-583-deinstalacija-programa_5Ajwxi.png')
    'windirstat.png' = @('https://poakpong.com/sites/default/files/2025/02/windirstat-001.png')
    'photorec.png' = @('https://www.cisdem.com/media/upload/2026/03/30/qphotorec01.png')
    'autoruns.png' = @('https://www.coretechnologies.com/blog/images/autoruns-main-window.png')
    'aomei.png' = @('https://windows-cdn.softpedia.com/screenshots/Partition-Assistant-Home-Edition_15.png')
    'ddrescue.png' = @('https://www.computerbase.de/forum/attachments/1-png.1600877/')
    'malwarebytes.png' = @('https://media.cybernews.com/2025/10/malwarebytes-full-scan.png')
    'czkawka.png' = @('https://1.bp.blogspot.com/-HSh2FfjBpE8/YEtsMDv3YwI/AAAAAAAAFWw/0trwy5dvZQ01jLilV2ZLLoFhgxdvqbmSACLcBGAsYHQ/s1278/Czkawka-duplicate-finder-gui-in-linux.png')
    'revo.png' = @('https://www.ghacks.net/wp-content/uploads/2015/04/revo-uninstaller.jpg')
    'storage-sense.png' = @('https://www.ninjaone.com/wp-content/uploads/2025/01/image3-1.png')
    'everything.png' = @('https://www.voidtools.com/everything.1.5.light.mode2.png')
    'testdisk.webp' = @('https://rtech.support/_astro/testdisk10.D6qSHZu6_Z1NJeFE.webp')
    'rescuezilla.png' = @('https://raw.githubusercontent.com/rescuezilla/rescuezilla.github.io/master/media/screenshots/2.png', 'https://www.chip.de/ii/1/2/6/9/1/8/3/2/3/7e4a24658973baf5.jpg')
    'clonezilla.png' = @('https://1.bp.blogspot.com/-Ok4BvrgAuqY/UDJoYcJJ2RI/AAAAAAAABX4/mmE49Nbufog/s1600/Figura5.jpg')
    'optimize.png' = @('https://assets.hongkiat.com/uploads/speed-up-windows-11/07-optimize.jpg')
    'fstrim.png' = @('https://i.sstatic.net/7zv6Y.png')
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
            if ($name.EndsWith('.webp')) {
                $bytes = [System.IO.File]::ReadAllBytes($tmp)
                if ($bytes.Length -lt 12 -or [Text.Encoding]::ASCII.GetString($bytes,0,4) -ne 'RIFF' -or [Text.Encoding]::ASCII.GetString($bytes,8,4) -ne 'WEBP') { throw 'Not a WebP image' }
                Copy-Item -LiteralPath $tmp -Destination $path
            } else {
                $img = [System.Drawing.Image]::FromFile($tmp)
                try { $img.Save($path, [System.Drawing.Imaging.ImageFormat]::Png) } finally { $img.Dispose() }
            }
            Write-Host "OK: $name"
            $saved = $true
            $ok++
            break
        } catch { Write-Warning ("No se pudo preparar " + $name + ": " + $_.Exception.Message) }
        finally { if (Test-Path -LiteralPath $tmp) { Remove-Item -LiteralPath $tmp } }
    }
    if (!$saved) { $missing += $name }
}
Write-Host ("Capturas disponibles: {0}/{1}" -f $ok,$assets.Count)
if ($missing.Count -gt 0) { Write-Warning ("Pendientes: " + ($missing -join ', ')) }

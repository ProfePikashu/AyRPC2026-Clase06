$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$classes = Split-Path -Parent $root
$source = Join-Path $classes '05 - BIOS y UEFI'
$files = [ordered]@{
 'public/branding/logo/parts/outer-frame.png' = '2ad3681e85627a485f4edda49283d9e7f46c8a5a'
 'public/branding/logo/parts/inner-a.png' = 'd1dbbded8b7c0620584a74b57a7929cd991ee539'
 'public/branding/logo/parts/bottom-chevron.png' = 'cb9b22858acb5feaf559568af2ad2c30caff4a50'
 'public/media/ayrpc2026-intro.mp4' = 'd6929dd81a517e3158cab36cc496e80b0f116b54'
}
foreach ($rel in $files.Keys) {
 $dest = Join-Path $root $rel
 $src = Join-Path $source $rel
 if (Test-Path -LiteralPath $dest) {
  $hash = & git hash-object --no-filters -- $dest
  if ($LASTEXITCODE -ne 0 -or $hash -ne $files[$rel]) { throw "Recurso existente distinto del original: $dest. No se sobrescribe." }
  Write-Host "Existe y coincide: $rel"
  continue
 }
 if (!(Test-Path -LiteralPath $src)) { throw "No se encuentra el original: $src" }
 $hash = & git hash-object --no-filters -- $src
 if ($LASTEXITCODE -ne 0 -or $hash -ne $files[$rel]) { throw "El original no coincide con la referencia Git: $src" }
 New-Item -ItemType Directory -Path (Split-Path -Parent $dest) -Force | Out-Null
 Copy-Item -LiteralPath $src -Destination $dest -ErrorAction Stop
 $copied = & git hash-object --no-filters -- $dest
 if ($LASTEXITCODE -ne 0 -or $copied -ne $files[$rel]) { throw "La copia no coincide: $dest" }
 Write-Host "OK original: $rel"
}

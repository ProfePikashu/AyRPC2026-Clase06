# Clase 06: genera dos HTML autonomos sin pisar versiones anteriores.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $root
$branch = (& git branch --show-current)
if ($LASTEXITCODE -ne 0 -or $branch -ne 'main') {
    throw "Rama incorrecta: '$branch'. Se requiere main."
}
$node = Get-Command node.exe -ErrorAction SilentlyContinue
if (-not $node) { $node = Get-Command node -ErrorAction SilentlyContinue }
if (-not $node) { throw 'Node.js no se encuentra en PATH.' }
& $node.Source --test (Join-Path $PSScriptRoot 'pack-standalone-clase06.test.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Fallo el test de regresion del empaquetador.' }
& $node.Source (Join-Path $PSScriptRoot 'build-release-clase06.mjs')
if ($LASTEXITCODE -ne 0) { throw "Fallo el release de Clase 06 (codigo $LASTEXITCODE). No se publicaron HTML nuevos." }
Write-Host 'Abri los dos HTML de la carpeta indicada, por doble clic.' -ForegroundColor Green

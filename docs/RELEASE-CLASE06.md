# Release Clase 06

Adaptado de Clase 05 (rama preview/clase05-bios-uefi, commit 1a5602e0a5d816bfdf5aaccd567cec0a8742ab4b) y sus documentos ESTANDAR-PRESENTACIONES e INCIDENTE-RELEASE-STANDALONE-2026-11-22. No se modifica la rama anterior.

1. git pull --ff-only
2. powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\scripts\copiar-branding-original.ps1"
3. Revisar logo y opening en localhost sin hash. El script copia desde la carpeta hermana de Clase 05, valida Git SHA de cada original y no sobrescribe archivos diferentes.
4. npm.cmd run check
5. powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\scripts\release-clase06.ps1"

Dos HTML en release-single/Clase06-<timestamp>/, solo después de smoke real file://. PC incluye opening y FurMark; Mobile excluye únicamente opening y conserva FurMark. El packer no sustituye basenames sueltos. No se borran entregas previas. Los recursos locales aprobados deben permanecer en public/. El primer release local se ejecutó y su smoke falló; luego se aplicaron correcciones. El docente confirmó éxito al repetir el procedimiento tras incorporar el glosario.

## Primer intento local (25/11/2026)
Logo y opening originales copiados con hash correcto; test packer, TypeScript y Vite PC/Mobile OK. PC 62.44 MiB (88 recursos, 2 videos), Mobile 42.04 MiB (87 recursos, 1 video). Smoke PC detenido por recurso opcional slide07/pci-intel-wifi-m2.png ausente. Los avisos 0/N provenían de una expresión regular con barra duplicada en el inventario, no prueban ausencia de capturas. Se corrige conteo y se utiliza directamente el SVG ya aprobado si la foto opcional no está embebida, sin request file:// inválido. Se mantiene bloqueo de publicación ante errores reales. El siguiente release, posterior al glosario, fue confirmado exitoso por el docente.

## Cierre (25/11/2026)
Tras el commit `f99ede0`, el docente ejecutó el procedimiento de release y respondió «un exito». Se registra aprobación del usuario, no una inspección independiente de los HTML ni del log final. Los tamaños y conteos del primer intento no se atribuyen al release definitivo. No consta la carpeta timestamp final ni publicación en Drive/Classroom. Los artefactos esperados son AyRPC2026-Clase06-PC.html y AyRPC2026-Clase06-Mobile.html.

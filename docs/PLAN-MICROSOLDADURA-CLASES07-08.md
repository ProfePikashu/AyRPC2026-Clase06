# AyRPC 2026 — Microsoldadura I y II
Fecha: 25/11/2026. Plan aprobado conceptualmente por el docente para documentar y desarrollar posteriormente; no implica aprobación final de cada slide por Martín Little. Fuente: Presentación Clase I Curso reparacion 2026 [Autoguardado].pptx, 11 páginas. La numeración 6/7 del borrador pasa a 7/8. No modificar contenido ni releases de Clase 06.

## Continuidad técnica
Base: README, ROADMAP, CIERRE-CLASE06-2026-11-25 y RELEASE-CLASE06 del repositorio Clase06. React 19, Vite 7, TypeScript; repositorios y carpetas separados por clase. Recuperar PNG y MP4 originales con comprobación SHA Git, sin recrear ni sobrescribir discrepancias. Opening solo PC. Visor numérico, teclado, fullscreen, pinch/pan/swipe mobile, fotos ampliables fuera del canvas con fondo desenfocado y lupa en placas. Sin textos de ayuda redundantes. Portada AndyAzhTEC y participación LittleNet, validar branding del colaborador. Glosario modal buscable, categorizado y deduplicado desde el inicio, incluyendo siglas básicas, unidades, símbolos y términos. Recursos locales con inventario de fuentes, licencias y datasheets; distinguir imágenes reales de ilustraciones. No depender de internet en release.

## Clase 07 — Microsoldadura I: fundamentos eléctricos y componentes
Objetivo: comprender, identificar y medir. Propuesta de 16 slides, opening aparte:
1. Portada.
2. Temario (sin listar portada ni temario).
3. Introducción: alcance, aplicaciones, diferencias con soldadura convencional; seguridad básica, ESD, desconectar alimentación/batería y verificar descarga antes de medir resistencia.
4. Montajes THT, SMT/SMD, BGA; soldadura por puntos (celdas 18650/terminales CMOS, solo contexto y seguridad), wire bonding industrial. Fotos macro, cortes transversales, comparación de tamaños. BGA es encapsulado, SMD es dispositivo, SMT tecnología.
5. PCB: una/doble cara y multicapa; cobre, FR4, máscara, serigrafía, pads, pistas, vías pasantes/ciegas/enterradas, planos GND/alimentación. Laboratorio de capas separables, daño de pad/pista y continuidad.
6. Fundamentos: tensión entre dos puntos, corriente, resistencia, GND como referencia no universal, CC/CA; unidades y prefijos.
7. Ley de Ohm: V=IR, I=V/R, R=V/I. Analogía hidráulica propuesta por Martín, animada; circuito con sliders, flujo convencional y potencia, advertencia por superar potencia nominal. Modelo ideal explícito.
8. Resistencias: THT/SMD, colores/códigos, tolerancia, potencia nominal; lector interactivo de códigos, símbolos, fotos y ubicación real.
9. Capacitores: cerámicos, electrolíticos, polímero, tantalio, película; polaridad según tipo, unidades F/µF/nF/pF, carga/descarga animada, límites de medición en circuito.
10. Bobinas y fusibles: H/µH, campo magnético, VRM; fusible corriente nominal, continuidad, no puentear protección.
11. Semiconductores: diodos, BJT/TBJ, MOSFET, integrados; terminales, símbolos, encapsulados DIP/SOP/QFN/BGA, pinout, datasheets; animación básica de conmutación.
12. Potencia y efecto Joule: P=VI, P=I²R para resistencia, energía térmica Q=I²Rt en modelo constante; calentamiento, cautín y disipación; simulación térmica conceptual sin prometer temperaturas reales.
13. Etiquetas de cargadores/fuentes: entrada/salida, tensión, corriente máxima, potencia, polaridad y compatibilidad; ejemplos reales.
14. Laboratorio multímetro virtual: selector, bornes COM/VΩ/A, puntas y PCB. Tensión en paralelo, corriente en serie, resistencia/continuidad/diodo sin energía; fusible abierto, posible corto, advertencias ante errores. Baja resistencia o pitido no prueban por sí solos un corto. No practicar con red eléctrica.
15. Glosario modal integral.
16. Consultas con cierre animado.
Cada componente: foto real, símbolo, función, unidad o parámetro relevante, identificación en PCB y errores comunes. Priorizar placas PC/notebook y ejemplos familiares. No sobrecargar de teoría universitaria.

## Clase 08 — Microsoldadura II: técnicas y aplicaciones prácticas
Martín propone mitad teoría y mitad práctica. Temario preliminar (no numeración final): seguridad e higiene (ESD, extracción localizada de humos, protección ocular y térmica); consumibles (aleaciones de estaño, flux, pasta, malla); herramientas (cautín, aire caliente, microscopio, precalentador); transferencia térmica y perfiles según placa/aleación; diagnóstico de pistas cortadas, capacitores hinchados o en corto, MOSFET y fusibles; esquemáticos y boardview; fuente de laboratorio con limitación de corriente; soldadura/desoldadura THT y SMD; reconstrucción de pads y pistas/jumpers con verificación; BGA, reflow vs reballing, límites y riesgos (no presentar reflow como arreglo universal); demostraciones reales a cargo de Martín, placa de descarte y baja tensión. Ideas visuales: comparador de uniones buenas/defectuosas, banco virtual de herramientas, árbol de diagnóstico, simulación térmica cualitativa, seguimiento de pistas. Validar alcance con Martín antes de cerrar.

## QA y entrega
Adaptar scripts Clase06, nombres, inventario, número de slides y selectores propios. npm.cmd run check, pruebas packer, build PC/mobile, smoke real file:// de ambos, verificar fotos, glosario, interacciones, medios y navegación. Evitar sustitución de basenames sueltos y solicitudes inválidas a recursos opcionales; no silenciar errores. HTML autónomos con recursos embebidos, opening únicamente PC, conservar demás medios en ambas versiones. Release timestamp, no borrar entregas previas. Registrar logs, ruta, tamaños y aprobación real; no inventar confirmación Drive/Classroom.
## Estado
Plan documental solamente. Repositorios 07/08 aún no creados; contenido y código pendientes. Confirmar logo LittleNet, material real y alcance práctico con especialista. Clase05 directa no accesible por ref durante esta revisión; estándar recuperado del cierre y release de Clase06, que documentan su herencia.

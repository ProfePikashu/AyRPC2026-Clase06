# Laboratorio final

Estado compartido durante la visita a la slide. Ocho etapas: RST/VMD, OOBE localonly (según compilación), escritorio, USB tethering y drivers, WinUtil, runtimes, restauración y entrega. Activación: reconocimiento ilustrativo de licencia digital válida; MAS se menciona sin ejecución. WinUtil se recrea visualmente y no ejecuta el comando. Todas las escenas se construyen con React/CSS/SVG, sin assets remotos. Los estados son didácticos, no operan sobre el equipo real. QA de compilación y visual pendiente. Fuente WinUtil: https://winutil.christitus.com/ .

RST: diálogo de carga estilo Windows Setup, explorador de carpetas expandible con unidades D:, E: y X:, ruta de carpeta seleccionada, lista de controladores compatible/no compatible y carga del controlador VMD antes de detectar el SSD. Se eliminan subtítulos y avisos redundantes. Prueba visual local pendiente.

Inicio del laboratorio: botón de encendido, POST estilo ASUS con F2/F8, menú UEFI, carga de Windows, idioma/teclado, instalación, clave opcional, edición, términos, selección de disco y carga RST existente. Progreso de instalación y reinicio antes del OOBE. Arte vectorial y pantallas recreadas, sin firmware ni instalador real. Verificación visual local pendiente.

Corrección del arranque: el reloj del laboratorio renderiza el padre cada segundo y recreaba onInstalled, reiniciando el timeout de POST/carga/reinicio. El efecto ahora depende únicamente de la fase y usa una referencia al callback más reciente. Carga desde USB de 3 segundos. Verificación visual local pendiente.

OOBE: pantalla de conexión a red recreada con ilustración vectorial propia, panel Ethernet y botón Siguiente desactivado. Shift+F10 real y acceso visual a CMD ampliado; comando localonly abre formulario de cuenta local con contraseña opcional y confirmación. La VM gana espacio al reducir panel lateral a 170 px. No se usan capturas originales; QA visual pendiente.

Cuenta local: el botón Siguiente solo exige nombre no vacío y contraseñas coincidentes si se completan. Se permite entrar directamente a la etapa OOBE para demostración sin repetir el instalador; al completar la cuenta se registra la instalación previa y la detección del SSD como prerrequisitos de ese escenario. Prueba local pendiente.

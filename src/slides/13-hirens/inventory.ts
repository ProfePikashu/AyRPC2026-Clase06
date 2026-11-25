export type Tool = [string,string,string,string];
export type Group = [string,string,string,Tool[]];
export const groups:Group[]=[
  [
    "BCD-MBR Tools",
    "Arranque",
    "▣",
    [
      [
        "BootIce",
        "1.3.3",
        "Administra registros de arranque y almacenes BCD.",
        "Examinar el BCD de un Windows que no inicia antes de modificarlo."
      ],
      [
        "EasyBCD",
        "2.3",
        "Gestiona entradas del menú de arranque de Windows.",
        "Revisar una entrada duplicada en una instalación multiboot."
      ]
    ]
  ],
  [
    "Hard Disk Tools - Data Recovery",
    "Recuperación de datos",
    "↶",
    [
      [
        "CheckDisk GUI",
        "0.3.1",
        "Interfaz gráfica para comprobar sistemas de archivos.",
        "Revisar una unidad con errores lógicos después de respaldarla."
      ],
      [
        "Lazesoft Data Recovery",
        "4.7",
        "Busca y recupera archivos perdidos.",
        "Rescatar documentos borrados hacia otro disco."
      ],
      [
        "Puran Data Recovery",
        "1.2.1",
        "Recupera datos de medios con dificultades de lectura.",
        "Copiar archivos accesibles de un medio dañado."
      ],
      [
        "Puran File Recovery",
        "1.2.1",
        "Busca archivos eliminados.",
        "Recuperar un archivo borrado de una memoria USB."
      ],
      [
        "Recuva",
        "1.53.2096",
        "Recupera archivos eliminados cuando aún es posible.",
        "Buscar fotos borradas y guardarlas en otro medio."
      ],
      [
        "DMDE",
        "4.0.6",
        "Analiza estructuras de disco y recupera datos.",
        "Localizar archivos de una partición que dejó de montarse."
      ],
      [
        "ReclaiMe",
        "build 4571",
        "Recupera archivos y reconstruye estructuras compatibles.",
        "Examinar un volumen perdido desde una imagen."
      ],
      [
        "PhotoRec",
        "7.2",
        "Recupera archivos por firmas sin depender del sistema de archivos.",
        "Extraer imágenes de una tarjeta cuyo directorio está dañado."
      ],
      [
        "Unstoppable Copier",
        "5.2",
        "Intenta copiar archivos incluso con errores de lectura.",
        "Rescatar partes legibles de archivos en un medio defectuoso."
      ],
      [
        "Victoria",
        "5.37",
        "Analiza discos, SMART y superficie según compatibilidad.",
        "Investigar zonas de lectura lenta en un disco ya respaldado."
      ],
      [
        "DiskInternals Linux Reader",
        "4.19.2",
        "Permite leer sistemas de archivos Linux compatibles.",
        "Copiar datos de una partición ext4 desde PE."
      ],
      [
        "Paragon AppleFS for Windows",
        "2.1.12",
        "Facilita el acceso a sistemas de archivos Apple compatibles.",
        "Consultar archivos de una unidad de Mac."
      ]
    ]
  ],
  [
    "Hard Disk Tools - Defrag",
    "Desfragmentación",
    "▥",
    [
      [
        "Defraggler",
        "2.22.33.995",
        "Analiza y desfragmenta archivos en HDD.",
        "Optimizar un HDD sano; no desfragmentar SSD de rutina."
      ]
    ]
  ],
  [
    "Hard Disk Tools - Diagnostic",
    "Diagnóstico de discos",
    "◉",
    [
      [
        "GSmartControl",
        "1.1.4",
        "Consulta SMART y autopruebas compatibles.",
        "Examinar sectores pendientes en un HDD."
      ],
      [
        "HDDScan",
        "4.1",
        "Realiza diagnóstico y pruebas de lectura de discos.",
        "Investigar demoras de lectura después de respaldar datos."
      ],
      [
        "HDTune",
        "2.55",
        "Consulta información y rendimiento de almacenamiento.",
        "Comparar la lectura secuencial de un HDD sano."
      ],
      [
        "WD Data Lifeguard Diagnostics",
        "1.37",
        "Diagnóstico de discos compatibles con esta utilidad histórica.",
        "Comprobar un WD antiguo; validar compatibilidad antes de usar."
      ],
      [
        "Crystal Disk Info",
        "9.2.2",
        "Muestra atributos SMART y temperatura.",
        "Identificar una alerta de salud antes de clonar."
      ],
      [
        "Test Disk",
        "7.2",
        "Analiza particiones y estructuras de arranque.",
        "Localizar una partición perdida sin escribir cambios de inmediato."
      ]
    ]
  ],
  [
    "Hard Disk Tools - Imaging",
    "Imágenes y clonación",
    "▤",
    [
      [
        "Acronis Cyber Protect",
        "b40901",
        "Crea y restaura imágenes y copias compatibles.",
        "Respaldar el sistema antes de una reparación."
      ],
      [
        "AOMEI Backupper",
        "7.3.3",
        "Crea copias de seguridad e imágenes.",
        "Migrar una instalación hacia un SSD con espacio suficiente."
      ],
      [
        "Lazesoft Disk Image & Clone",
        "4.7",
        "Copia discos y crea imágenes.",
        "Preparar una copia de trabajo de una unidad sana."
      ],
      [
        "Macrium Reflect PE",
        "7.3.5925",
        "Crea, clona y restaura imágenes de disco.",
        "Restaurar una imagen verificada de Windows."
      ],
      [
        "Runtime DriveImage XML",
        "2.60",
        "Crea y restaura imágenes de volúmenes compatibles.",
        "Conservar una copia de una partición antes de intervenirla."
      ],
      [
        "Drive Snapshot",
        "1.50",
        "Genera imágenes de volúmenes.",
        "Guardar una imagen de la instalación para recuperación."
      ]
    ]
  ],
  [
    "Hard Disk Tools - Partition Tools",
    "Particiones",
    "▥",
    [
      [
        "AOMEI Partition Assistant",
        "10.2.2",
        "Administra particiones y discos.",
        "Ampliar una partición tras verificar la copia de seguridad."
      ],
      [
        "Macrorit Partition Extender",
        "2.3.1",
        "Amplía particiones compatibles.",
        "Asignar espacio libre a un volumen con poco espacio."
      ],
      [
        "Macrorit Partition Expert",
        "8.1.3",
        "Gestiona particiones y sus tamaños.",
        "Examinar la distribución de particiones de un SSD."
      ],
      [
        "DiskGenius",
        "5.5.1.1508",
        "Gestiona discos, particiones y recuperación.",
        "Analizar una tabla de particiones antes de cambiarla."
      ],
      [
        "EaseUS Partition Master",
        "14.5",
        "Administra y redimensiona particiones.",
        "Preparar la distribución de un disco de reemplazo."
      ]
    ]
  ],
  [
    "Hard Disk Tools - Security",
    "Seguridad de discos",
    "◆",
    [
      [
        "HDD Low Level Format Tool",
        "4.40",
        "Sobrescribe datos accesibles; no es formato físico de fábrica.",
        "Sanear un disco propio descartado, tras verificar destino y respaldo."
      ],
      [
        "Eraser",
        "6.2.0.2993",
        "Sobrescribe archivos o espacio libre compatible.",
        "Eliminar de forma deliberada archivos propios sensibles en un HDD."
      ],
      [
        "VeraCrypt",
        "1.26.7",
        "Monta y administra volúmenes cifrados compatibles.",
        "Abrir un volumen propio usando su contraseña o clave válida."
      ]
    ]
  ],
  [
    "Windows Recovery",
    "Recuperación de Windows",
    "⊞",
    [
      [
        "Lazesoft Windows Recovery",
        "4.7",
        "Reúne herramientas de reparación del arranque y Windows.",
        "Examinar un sistema que no arranca tras una actualización."
      ]
    ]
  ],
  [
    "Other Tools",
    "Otras herramientas",
    "▧",
    [
      [
        "FSViewer",
        "7.8",
        "Visualiza y organiza imágenes.",
        "Comprobar que las fotos rescatadas se abren correctamente."
      ],
      [
        "Free Office",
        "rev 703",
        "Suite para abrir y editar documentos compatibles.",
        "Consultar un documento rescatado sin iniciar Windows."
      ],
      [
        "Sumatra PDF",
        "3.5.2",
        "Lee documentos PDF y otros formatos compatibles.",
        "Abrir el manual de una placa madre desde PE."
      ],
      [
        "7-Zip",
        "23.01",
        "Comprime y extrae archivos.",
        "Extraer un paquete de controladores descargado."
      ],
      [
        "ExamDiff Pro",
        "1.9.3",
        "Compara archivos y directorios.",
        "Comparar dos copias de un archivo de configuración."
      ],
      [
        "HxD",
        "2.5.0",
        "Editor hexadecimal para archivos y medios.",
        "Inspeccionar la firma de una imagen de disco en solo lectura."
      ],
      [
        "Notepad++",
        "8.6.2",
        "Editor de texto y código.",
        "Leer registros y archivos INF durante el diagnóstico."
      ],
      [
        "WinMerge",
        "2.16.36",
        "Compara archivos y carpetas.",
        "Verificar diferencias entre respaldo y carpeta original."
      ],
      [
        "VLC Media Player",
        "3.0.20",
        "Reproduce audio y video compatibles.",
        "Verificar un video rescatado."
      ],
      [
        "TreeSize",
        "4.7.1.525",
        "Visualiza el espacio ocupado por carpetas.",
        "Identificar qué ocupa un volumen casi lleno."
      ],
      [
        "IrfanView",
        "4.62",
        "Visualiza y convierte imágenes.",
        "Comprobar una captura recuperada."
      ],
      [
        "NVDA",
        "2023.3.3",
        "Lector de pantalla para accesibilidad.",
        "Navegar con asistencia de voz (Ctrl + Alt + N)."
      ]
    ]
  ],
  [
    "Removable Drive Tools",
    "Medios extraíbles",
    "▰",
    [
      [
        "CDBurnerXP",
        "4.5.8.7128",
        "Graba discos ópticos e imágenes compatibles.",
        "Crear un medio óptico de rescate si hay grabadora."
      ],
      [
        "Rufus",
        "4.4",
        "Crea USB arrancables a partir de imágenes.",
        "Preparar un USB de instalación en otra unidad autorizada."
      ],
      [
        "ImageUSB",
        "1.5.1006",
        "Crea y restaura imágenes de dispositivos USB.",
        "Duplicar un pendrive técnico propio."
      ]
    ]
  ],
  [
    "Security - AntiVirus",
    "Antivirus",
    "⛨",
    [
      [
        "ESET Online Scanner",
        "3.5.6",
        "Analiza archivos en busca de amenazas con componentes compatibles.",
        "Examinar archivos de un Windows offline; actualizar firmas cuando sea posible."
      ],
      [
        "McAfee Stinger",
        "13.0.0.19",
        "Detecta amenazas específicas con su motor incluido.",
        "Realizar una comprobación adicional; no sustituye una revisión completa."
      ]
    ]
  ],
  [
    "Security - KeyFinders",
    "Claves de producto",
    "⚿",
    [
      [
        "ShowKeyPlus",
        "1.0.7060",
        "Consulta información de licencias Windows disponible.",
        "Documentar una licencia propia antes de reinstalar."
      ]
    ]
  ],
  [
    "Security - Passwords",
    "Contraseñas",
    "▣",
    [
      [
        "Lazesoft Password Recovery",
        "4.7",
        "Utilidad de recuperación de acceso a cuentas locales.",
        "Gestionar recuperación autorizada de una cuenta local propia."
      ],
      [
        "NT Password Edit",
        "0.7",
        "Herramienta de administración offline de contraseñas locales.",
        "Evaluar recuperación autorizada de acceso; proteger datos cifrados."
      ],
      [
        "Windows Login Unlocker",
        "2.1",
        "Utilidad de recuperación de acceso local.",
        "Atender un equipo con autorización del titular; preferir métodos oficiales."
      ]
    ]
  ],
  [
    "System Tools",
    "Sistema",
    "⚙",
    [
      [
        "CPU-Z",
        "2.09",
        "Identifica CPU, placa y memoria.",
        "Comprobar qué procesador y RAM reconoce el equipo."
      ],
      [
        "GPU-Z",
        "2.57",
        "Identifica GPU y memoria de video.",
        "Consultar el modelo de gráfica si el sistema instalado no arranca."
      ],
      [
        "HWInfo",
        "7.68-5300",
        "Consulta hardware y sensores disponibles.",
        "Revisar temperaturas y dispositivos reconocidos."
      ],
      [
        "Speccy",
        "1.32.803",
        "Resume características del hardware.",
        "Levantar un inventario antes de presupuestar."
      ],
      [
        "WinNTSetup",
        "5.3.3",
        "Despliega imágenes de instalación de Windows.",
        "Preparar una instalación en un SSD de reemplazo."
      ],
      [
        "Attribute Changer",
        "11.0",
        "Modifica atributos y fechas de archivos.",
        "Administrar atributos de una copia de archivos propios."
      ],
      [
        "Change Keyboard Layout",
        "1.0.0",
        "Cambia la distribución del teclado.",
        "Usar el teclado español durante una reparación."
      ],
      [
        "Dependency Walker",
        "2.2.6",
        "Inspecciona dependencias de ejecutables y DLL.",
        "Investigar bibliotecas faltantes en una aplicación antigua."
      ],
      [
        "Registry Backup",
        "4.0.0",
        "Respalda archivos del registro compatibles.",
        "Conservar una copia antes de una reparación del registro."
      ],
      [
        "Regshot",
        "2.0.1.70",
        "Compara instantáneas del registro.",
        "Observar cambios producidos por una configuración de prueba."
      ],
      [
        "SysInternals Suite",
        "",
        "Conjunto de utilidades de diagnóstico de Microsoft.",
        "Consultar procesos, archivos o autoruns cuando el entorno lo permita."
      ],
      [
        "PowerShell Core",
        "7.4.1",
        "Shell y lenguaje de automatización.",
        "Inventariar archivos y discos mediante comandos compatibles."
      ],
      [
        "Aqua Key Test",
        "",
        "Comprueba pulsaciones del teclado.",
        "Identificar teclas físicas que no responden."
      ],
      [
        "ImDisk Virtual Disk Driver",
        "2.0.9",
        "Monta discos virtuales e imágenes compatibles.",
        "Acceder a una imagen sin usar otro disco físico."
      ],
      [
        "Total Commander",
        "11.02",
        "Administrador de archivos de doble panel.",
        "Copiar datos entre un disco interno y uno de respaldo."
      ]
    ]
  ],
  [
    "Network",
    "Redes",
    "◎",
    [
      [
        "Aero Admin",
        "4.7",
        "Acceso remoto con consentimiento y conectividad.",
        "Solicitar asistencia autorizada para revisar un entorno PE."
      ],
      [
        "Google Chrome",
        "121.0.6167.185",
        "Navegador web incluido.",
        "Consultar documentación técnica; evitar datos sensibles en versiones antiguas."
      ],
      [
        "Mozilla Firefox Quantum ESR",
        "115.3.1esr",
        "Navegador web de soporte extendido incluido.",
        "Buscar el controlador correcto desde un sitio oficial."
      ],
      [
        "PENetwork",
        "0.59.0.B12",
        "Configura interfaces y conectividad en PE.",
        "Conectar el equipo a una red para acceder a un recurso compartido."
      ],
      [
        "Anydesk",
        "7.1.13",
        "Asistencia remota autorizada.",
        "Compartir una sesión de diagnóstico con un técnico de confianza."
      ],
      [
        "WinSCP",
        "6.1.2",
        "Cliente de transferencia SFTP y otros protocolos compatibles.",
        "Enviar un respaldo a un servidor propio mediante SFTP."
      ],
      [
        "Putty",
        "0.80",
        "Cliente SSH y terminal remoto.",
        "Consultar un servidor propio desde el entorno de rescate."
      ]
    ]
  ]
];
export const native:Tool[]=[
  [
    "Explorador de archivos",
    "",
    "Accede a los volúmenes que PE logra montar.",
    "Copiar documentos de un Windows que no inicia a un disco externo."
  ],
  [
    "Unidad X:",
    "",
    "En un WinPE típico corresponde al entorno cargado en RAM; cambios allí suelen perderse al reiniciar.",
    "Distinguir el sistema temporal de los discos físicos antes de guardar un archivo."
  ],
  [
    "CMD",
    "",
    "Ejecuta comandos del entorno de rescate.",
    "Usar dir y verificar letras de unidades antes de intervenir."
  ],
  [
    "DiskPart",
    "",
    "Administra discos, volúmenes y particiones.",
    "Usar list disk y list volume para identificar discos sin modificarlos."
  ],
  [
    "DISM",
    "",
    "Consulta y mantiene imágenes Windows online u offline.",
    "Examinar la edición de una instalación offline; usar rutas correctas."
  ],
  [
    "BCDBoot",
    "",
    "Genera archivos de arranque desde una instalación válida.",
    "Reparar el arranque de un Windows autorizado tras identificar su partición EFI."
  ],
  [
    "DrvLoad",
    "",
    "Carga un controlador INF compatible en la sesión PE.",
    "Hacer visible un SSD conectado a un controlador de almacenamiento no reconocido."
  ],
  [
    "PowerShell",
    "",
    "Permite automatizar tareas con módulos disponibles.",
    "Enumerar carpetas y generar un inventario del equipo."
  ],
  [
    "Aplicaciones portables",
    "",
    "Ejecuta programas compatibles con PE y su arquitectura.",
    "Abrir un editor o una utilidad propia desde otro USB."
  ],
  [
    "Recursos de red",
    "",
    "Permite conectarse a recursos compartidos con credenciales válidas.",
    "Copiar una copia de seguridad a un servidor autorizado."
  ],
  [
    "Instalación offline",
    "",
    "Permite acceder a archivos de otra instalación Windows sin arrancarla.",
    "Consultar logs y archivos de configuración; respetar cifrado y permisos."
  ],
  [
    "Montaje de imágenes",
    "",
    "Accede a imágenes compatibles mediante herramientas disponibles.",
    "Consultar archivos de una imagen de respaldo sin restaurarla."
  ]
];
export const officialCount=groups.reduce((n,g)=>n+g[3].length,0);

export type Command={cat:string;cmd:string;title:string;desc:string;kind:string;risk?:string};
export const windows:Command[]=[
  {
    "cat": "Sistema",
    "cmd": "msinfo32",
    "title": "Información del sistema",
    "desc": "Inventario de hardware, firmware y Windows",
    "kind": "Ejecutar"
  },
  {
    "cat": "Sistema",
    "cmd": "winver",
    "title": "Versión de Windows",
    "desc": "Edición y compilación instalada",
    "kind": "Ejecutar"
  },
  {
    "cat": "Sistema",
    "cmd": "dxdiag",
    "title": "Diagnóstico DirectX",
    "desc": "GPU, audio, versión de DirectX y controladores",
    "kind": "Ejecutar"
  },
  {
    "cat": "Sistema",
    "cmd": "sysdm.cpl",
    "title": "Propiedades del sistema",
    "desc": "Nombre del equipo, protección y opciones avanzadas",
    "kind": "Ejecutar"
  },
  {
    "cat": "Sistema",
    "cmd": "systeminfo",
    "title": "Inventario del sistema",
    "desc": "Datos de Windows, hardware y actualizaciones",
    "kind": "CMD"
  },
  {
    "cat": "Sistema",
    "cmd": "tpm.msc",
    "title": "Módulo TPM",
    "desc": "Estado y versión del TPM",
    "kind": "Ejecutar"
  },
  {
    "cat": "Sistema",
    "cmd": "control",
    "title": "Panel de control",
    "desc": "Configuración clásica",
    "kind": "Ejecutar"
  },
  {
    "cat": "Sistema",
    "cmd": "control admintools",
    "title": "Herramientas administrativas",
    "desc": "Accesos a consolas de administración",
    "kind": "Ejecutar"
  },
  {
    "cat": "Sistema",
    "cmd": "ms-settings:about",
    "title": "Acerca de",
    "desc": "Información del dispositivo",
    "kind": "Ejecutar"
  },
  {
    "cat": "Sistema",
    "cmd": "ms-settings:windowsupdate",
    "title": "Windows Update",
    "desc": "Estado de actualizaciones",
    "kind": "Ejecutar"
  },
  {
    "cat": "Sistema",
    "cmd": "ms-settings:activation",
    "title": "Activación",
    "desc": "Estado de licencia",
    "kind": "Ejecutar"
  },
  {
    "cat": "Sistema",
    "cmd": "slui",
    "title": "Activación clásica",
    "desc": "Interfaz dependiente de versión",
    "kind": "Ejecutar"
  },
  {
    "cat": "Diagnóstico",
    "cmd": "eventvwr.msc",
    "title": "Visor de eventos",
    "desc": "Registros de aplicaciones y sistema",
    "kind": "Ejecutar"
  },
  {
    "cat": "Diagnóstico",
    "cmd": "perfmon /rel",
    "title": "Monitor de confiabilidad",
    "desc": "Historial de estabilidad y fallos",
    "kind": "Ejecutar"
  },
  {
    "cat": "Diagnóstico",
    "cmd": "devmgmt.msc",
    "title": "Administrador de dispositivos",
    "desc": "Hardware y controladores",
    "kind": "Ejecutar"
  },
  {
    "cat": "Diagnóstico",
    "cmd": "mdsched",
    "title": "Diagnóstico de memoria",
    "desc": "Programa una prueba de RAM al reiniciar",
    "kind": "Ejecutar",
    "risk": "Requiere reinicio"
  },
  {
    "cat": "Diagnóstico",
    "cmd": "sigverif",
    "title": "Verificación de firmas",
    "desc": "Comprueba firmas de archivos",
    "kind": "Ejecutar"
  },
  {
    "cat": "Diagnóstico",
    "cmd": "verifier",
    "title": "Driver Verifier",
    "desc": "Pruebas avanzadas de controladores",
    "kind": "Ejecutar",
    "risk": "Puede provocar BSOD o impedir el arranque; usar únicamente con recuperación preparada"
  },
  {
    "cat": "Diagnóstico",
    "cmd": "Get-WinEvent -LogName System -MaxEvents 20",
    "title": "Eventos recientes",
    "desc": "Consulta los últimos eventos del sistema",
    "kind": "PowerShell"
  },
  {
    "cat": "Diagnóstico",
    "cmd": "Get-PnpDevice -PresentOnly",
    "title": "Dispositivos presentes",
    "desc": "Inventario PnP",
    "kind": "PowerShell"
  },
  {
    "cat": "Diagnóstico",
    "cmd": "pnputil /enum-drivers",
    "title": "Driver Store",
    "desc": "Lista paquetes de terceros",
    "kind": "CMD"
  },
  {
    "cat": "Rendimiento",
    "cmd": "taskmgr",
    "title": "Administrador de tareas",
    "desc": "Procesos y consumo de recursos",
    "kind": "Ejecutar"
  },
  {
    "cat": "Rendimiento",
    "cmd": "resmon",
    "title": "Monitor de recursos",
    "desc": "CPU, memoria, disco y red por proceso",
    "kind": "Ejecutar"
  },
  {
    "cat": "Rendimiento",
    "cmd": "perfmon",
    "title": "Monitor de rendimiento",
    "desc": "Contadores y métricas",
    "kind": "Ejecutar"
  },
  {
    "cat": "Rendimiento",
    "cmd": "tasklist",
    "title": "Procesos",
    "desc": "Lista procesos en ejecución",
    "kind": "CMD"
  },
  {
    "cat": "Rendimiento",
    "cmd": "Get-Process",
    "title": "Procesos de PowerShell",
    "desc": "Consulta PID, CPU y memoria",
    "kind": "PowerShell"
  },
  {
    "cat": "Rendimiento",
    "cmd": "powercfg /batteryreport",
    "title": "Informe de batería",
    "desc": "Genera informe HTML",
    "kind": "CMD"
  },
  {
    "cat": "Rendimiento",
    "cmd": "powercfg /energy",
    "title": "Diagnóstico energético",
    "desc": "Genera informe de eficiencia",
    "kind": "CMD"
  },
  {
    "cat": "Administración",
    "cmd": "compmgmt.msc",
    "title": "Administración de equipos",
    "desc": "Consolas administrativas integradas",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "services.msc",
    "title": "Servicios",
    "desc": "Estado y tipo de inicio de servicios",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "msconfig",
    "title": "Configuración del sistema",
    "desc": "Arranque y diagnóstico",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "taskschd.msc",
    "title": "Programador de tareas",
    "desc": "Tareas programadas",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "control schedtasks",
    "title": "Tareas programadas",
    "desc": "Acceso clásico",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "regedit",
    "title": "Editor del Registro",
    "desc": "Consulta y edición del Registro",
    "kind": "Ejecutar",
    "risk": "Exportar claves antes de modificar"
  },
  {
    "cat": "Administración",
    "cmd": "gpedit.msc",
    "title": "Directivas de grupo",
    "desc": "Editor local, según edición de Windows",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "secpol.msc",
    "title": "Directiva de seguridad",
    "desc": "Configuración local, según edición",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "lusrmgr.msc",
    "title": "Usuarios y grupos locales",
    "desc": "Según edición de Windows",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "netplwiz",
    "title": "Cuentas de usuario",
    "desc": "Administración avanzada",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "control userpasswords",
    "title": "Cuentas",
    "desc": "Configuración clásica de usuarios",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "fsmgmt.msc",
    "title": "Carpetas compartidas",
    "desc": "Recursos compartidos y sesiones",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "certmgr.msc",
    "title": "Certificados de usuario",
    "desc": "Almacenes de certificados",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "certlm.msc",
    "title": "Certificados del equipo",
    "desc": "Certificados del sistema local",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "rsop.msc",
    "title": "Directivas resultantes",
    "desc": "Consulta directivas aplicadas",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "wmimgmt.msc",
    "title": "Control WMI",
    "desc": "Administración WMI",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "mmc",
    "title": "Consola MMC",
    "desc": "Contenedor de complementos administrativos",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "odbcad32",
    "title": "Orígenes ODBC",
    "desc": "Configuración de conexiones de datos",
    "kind": "Ejecutar"
  },
  {
    "cat": "Administración",
    "cmd": "Get-Service",
    "title": "Servicios",
    "desc": "Lista servicios y estados",
    "kind": "PowerShell"
  },
  {
    "cat": "Administración",
    "cmd": "sc query",
    "title": "Servicios CMD",
    "desc": "Consulta servicios",
    "kind": "CMD"
  },
  {
    "cat": "Administración",
    "cmd": "whoami /all",
    "title": "Identidad y permisos",
    "desc": "Usuario, grupos y privilegios",
    "kind": "CMD"
  },
  {
    "cat": "Administración",
    "cmd": "gpresult /r",
    "title": "Directivas aplicadas",
    "desc": "Resumen de políticas",
    "kind": "CMD"
  },
  {
    "cat": "Reparación",
    "cmd": "sfc /verifyonly",
    "title": "Comprobar archivos",
    "desc": "Verifica sin reparar",
    "kind": "CMD"
  },
  {
    "cat": "Reparación",
    "cmd": "sfc /scannow",
    "title": "Comprobador de archivos",
    "desc": "Verifica y repara archivos protegidos",
    "kind": "CMD (admin)",
    "risk": "Modifica archivos del sistema"
  },
  {
    "cat": "Reparación",
    "cmd": "DISM /Online /Cleanup-Image /CheckHealth",
    "title": "Estado de componentes",
    "desc": "Consulta corrupción registrada",
    "kind": "CMD (admin)"
  },
  {
    "cat": "Reparación",
    "cmd": "DISM /Online /Cleanup-Image /ScanHealth",
    "title": "Analizar componentes",
    "desc": "Busca corrupción del almacén",
    "kind": "CMD (admin)"
  },
  {
    "cat": "Reparación",
    "cmd": "DISM /Online /Cleanup-Image /RestoreHealth",
    "title": "Reparar componentes",
    "desc": "Repara el almacén de componentes",
    "kind": "CMD (admin)",
    "risk": "Modifica componentes del sistema"
  },
  {
    "cat": "Reparación",
    "cmd": "rstrui",
    "title": "Restaurar sistema",
    "desc": "Recupera un punto anterior",
    "kind": "Ejecutar",
    "risk": "Revierte cambios del sistema"
  },
  {
    "cat": "Reparación",
    "cmd": "SystemPropertiesProtection.exe",
    "title": "Protección del sistema",
    "desc": "Configura y crea puntos de restauración",
    "kind": "Ejecutar"
  },
  {
    "cat": "Reparación",
    "cmd": "reagentc /info",
    "title": "Windows RE",
    "desc": "Consulta estado del entorno de recuperación",
    "kind": "CMD (admin)"
  },
  {
    "cat": "Reparación",
    "cmd": "bcdedit /enum",
    "title": "Configuración de arranque",
    "desc": "Consulta entradas BCD",
    "kind": "CMD (admin)"
  },
  {
    "cat": "Reparación",
    "cmd": "mrt",
    "title": "Eliminación de malware",
    "desc": "Herramienta de Microsoft para amenazas específicas",
    "kind": "Ejecutar"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "diskmgmt.msc",
    "title": "Administración de discos",
    "desc": "Discos, volúmenes y particiones",
    "kind": "Ejecutar"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "diskpart",
    "title": "DiskPart",
    "desc": "Consola de administración de discos",
    "kind": "CMD (admin)",
    "risk": "Puede destruir particiones y datos"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "chkdsk C:",
    "title": "Comprobar volumen",
    "desc": "Consulta errores del sistema de archivos",
    "kind": "CMD"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "chkdsk C: /scan",
    "title": "Escaneo NTFS",
    "desc": "Examina el volumen en línea",
    "kind": "CMD (admin)"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "chkdsk C: /f",
    "title": "Reparar volumen",
    "desc": "Corrige errores del sistema de archivos",
    "kind": "CMD (admin)",
    "risk": "Puede requerir reinicio; respaldar antes"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "dfrgui",
    "title": "Optimizar unidades",
    "desc": "Interfaz gráfica de optimización",
    "kind": "Ejecutar"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "defrag C: /A",
    "title": "Analizar unidad",
    "desc": "Consulta estado de optimización",
    "kind": "CMD (admin)"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "cleanmgr",
    "title": "Liberador de espacio",
    "desc": "Selecciona archivos prescindibles",
    "kind": "Ejecutar"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "Get-Disk",
    "title": "Discos físicos",
    "desc": "Inventario de discos",
    "kind": "PowerShell"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "Get-PhysicalDisk",
    "title": "Discos físicos",
    "desc": "Estado y tipo de medio",
    "kind": "PowerShell"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "Get-Partition",
    "title": "Particiones",
    "desc": "Consulta particiones",
    "kind": "PowerShell"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "Get-Volume",
    "title": "Volúmenes",
    "desc": "Capacidad, formato y letras",
    "kind": "PowerShell"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "fsutil fsinfo drives",
    "title": "Unidades",
    "desc": "Lista letras de unidad",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "ncpa.cpl",
    "title": "Conexiones de red",
    "desc": "Adaptadores y propiedades",
    "kind": "Ejecutar"
  },
  {
    "cat": "Red",
    "cmd": "inetcpl.cpl",
    "title": "Propiedades de Internet",
    "desc": "Configuración clásica de Internet",
    "kind": "Ejecutar"
  },
  {
    "cat": "Red",
    "cmd": "firewall.cpl",
    "title": "Firewall",
    "desc": "Configuración del firewall",
    "kind": "Ejecutar"
  },
  {
    "cat": "Red",
    "cmd": "wf.msc",
    "title": "Firewall avanzado",
    "desc": "Reglas de seguridad",
    "kind": "Ejecutar"
  },
  {
    "cat": "Red",
    "cmd": "ipconfig /all",
    "title": "Configuración IP",
    "desc": "Adaptadores, DNS, DHCP y MAC",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "ipconfig /displaydns",
    "title": "Caché DNS",
    "desc": "Consulta resoluciones almacenadas",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "ipconfig /flushdns",
    "title": "Vaciar caché DNS",
    "desc": "Elimina registros DNS locales",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "ping 1.1.1.1",
    "title": "Conectividad",
    "desc": "Comprueba alcance ICMP",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "tracert example.com",
    "title": "Ruta",
    "desc": "Identifica saltos hacia un destino",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "pathping example.com",
    "title": "Ruta y pérdida",
    "desc": "Estadísticas de conectividad",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "nslookup example.com",
    "title": "Resolución DNS",
    "desc": "Consulta un nombre",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "netstat -ano",
    "title": "Conexiones",
    "desc": "Puertos, conexiones y PID",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "arp -a",
    "title": "Tabla ARP",
    "desc": "Vecinos IPv4",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "route print",
    "title": "Tabla de rutas",
    "desc": "Rutas IPv4 e IPv6",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "getmac /v",
    "title": "Direcciones MAC",
    "desc": "Identifica adaptadores",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "netsh wlan show interfaces",
    "title": "Wi-Fi",
    "desc": "Estado y señal inalámbrica",
    "kind": "CMD"
  },
  {
    "cat": "Red",
    "cmd": "Get-NetAdapter",
    "title": "Adaptadores",
    "desc": "Estado y velocidad",
    "kind": "PowerShell"
  },
  {
    "cat": "Red",
    "cmd": "Get-NetIPConfiguration",
    "title": "Configuración IP",
    "desc": "Direcciones y puertas de enlace",
    "kind": "PowerShell"
  },
  {
    "cat": "Red",
    "cmd": "Test-NetConnection example.com -Port 443",
    "title": "Prueba TCP",
    "desc": "Comprueba conectividad a un puerto",
    "kind": "PowerShell"
  },
  {
    "cat": "Configuración",
    "cmd": "appwiz.cpl",
    "title": "Programas y características",
    "desc": "Desinstalación y componentes",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "optionalfeatures",
    "title": "Características de Windows",
    "desc": "Componentes opcionales",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "powercfg.cpl",
    "title": "Energía",
    "desc": "Planes de energía",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "mmsys.cpl",
    "title": "Sonido",
    "desc": "Dispositivos de audio",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "joy.cpl",
    "title": "Mandos",
    "desc": "Controladores de juego",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "timedate.cpl",
    "title": "Fecha y hora",
    "desc": "Reloj y zona horaria",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "intl.cpl",
    "title": "Región",
    "desc": "Formatos regionales",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "desk.cpl",
    "title": "Pantalla",
    "desc": "Configuración de pantalla",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "control mouse",
    "title": "Mouse",
    "desc": "Propiedades del mouse",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "control keyboard",
    "title": "Teclado",
    "desc": "Propiedades del teclado",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "control fonts",
    "title": "Fuentes",
    "desc": "Fuentes instaladas",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "control printers",
    "title": "Impresoras",
    "desc": "Dispositivos e impresoras",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "control folders",
    "title": "Explorador",
    "desc": "Opciones de carpetas",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "control color",
    "title": "Color",
    "desc": "Personalización clásica, según versión",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "computerdefaults",
    "title": "Aplicaciones predeterminadas",
    "desc": "Acceso según versión",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "wscui.cpl",
    "title": "Seguridad y mantenimiento",
    "desc": "Estado del sistema",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "telephon.cpl",
    "title": "Teléfono y módem",
    "desc": "Configuración de marcado clásica",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "hdwwiz.cpl",
    "title": "Hardware",
    "desc": "Acceso clásico dependiente de versión",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "cliconfg",
    "title": "Cliente SQL Server",
    "desc": "Configuración de red del cliente SQL",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "mobsync",
    "title": "Centro de sincronización",
    "desc": "Sincronización de archivos sin conexión",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "rekeywiz",
    "title": "Cifrado EFS",
    "desc": "Administración de certificados de cifrado",
    "kind": "Ejecutar"
  },
  {
    "cat": "Configuración",
    "cmd": "credwiz",
    "title": "Credenciales",
    "desc": "Asistente de respaldo y restauración de credenciales",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "cmd",
    "title": "Símbolo del sistema",
    "desc": "Consola de comandos",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "powershell",
    "title": "Windows PowerShell",
    "desc": "Consola y scripting",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "wt",
    "title": "Windows Terminal",
    "desc": "Terminal si está instalada",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "explorer",
    "title": "Explorador",
    "desc": "Archivos y carpetas",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "notepad",
    "title": "Bloc de notas",
    "desc": "Editor de texto",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "calc",
    "title": "Calculadora",
    "desc": "Operaciones y conversiones",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "mspaint",
    "title": "Paint",
    "desc": "Editor de imágenes",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "snippingtool",
    "title": "Recortes",
    "desc": "Capturas de pantalla",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "magnify",
    "title": "Lupa",
    "desc": "Ampliación de pantalla",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "osk",
    "title": "Teclado en pantalla",
    "desc": "Accesibilidad",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "utilman",
    "title": "Accesibilidad",
    "desc": "Herramientas de accesibilidad",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "charmap",
    "title": "Mapa de caracteres",
    "desc": "Caracteres especiales",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "sndvol",
    "title": "Mezclador de volumen",
    "desc": "Volumen por aplicación",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "mstsc",
    "title": "Escritorio remoto",
    "desc": "Cliente RDP",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "msra",
    "title": "Asistencia remota",
    "desc": "Asistencia clásica",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "fsquirt",
    "title": "Bluetooth",
    "desc": "Transferencia de archivos",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "iexpress",
    "title": "IExpress",
    "desc": "Creación de paquetes autoextraíbles",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "mblctr",
    "title": "Centro de movilidad",
    "desc": "Opciones de equipos portátiles",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "eudcedit",
    "title": "Editor de caracteres privados",
    "desc": "Creación de caracteres",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "tabtip",
    "title": "Teclado táctil",
    "desc": "Dependiente del dispositivo y versión",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "winword",
    "title": "Microsoft Word",
    "desc": "Requiere Office instalado",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "excel",
    "title": "Microsoft Excel",
    "desc": "Requiere Office instalado",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "%temp%",
    "title": "Temporales de usuario",
    "desc": "Abre carpeta temporal",
    "kind": "Ejecutar"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "shutdown /?",
    "title": "Apagado",
    "desc": "Consulta opciones de apagado",
    "kind": "CMD"
  },
  {
    "cat": "Aplicaciones",
    "cmd": "logoff /?",
    "title": "Cerrar sesión",
    "desc": "Consulta opciones de cierre de sesión",
    "kind": "CMD"
  },
  {
    "cat": "Históricos",
    "cmd": "write",
    "title": "WordPad",
    "desc": "Retirado en Windows 11 24H2",
    "kind": "Ejecutar"
  },
  {
    "cat": "Históricos",
    "cmd": "iexplore",
    "title": "Internet Explorer",
    "desc": "Retirado en sistemas actuales",
    "kind": "Ejecutar"
  },
  {
    "cat": "Históricos",
    "cmd": "stikynot",
    "title": "Notas rápidas clásicas",
    "desc": "Reemplazadas por aplicaciones modernas",
    "kind": "Ejecutar"
  },
  {
    "cat": "Históricos",
    "cmd": "wmplayer",
    "title": "Windows Media Player clásico",
    "desc": "Componente opcional según versión",
    "kind": "Ejecutar"
  },
  {
    "cat": "Históricos",
    "cmd": "dvdplay",
    "title": "Reproducción DVD clásica",
    "desc": "Disponibilidad dependiente de versión",
    "kind": "Ejecutar"
  },
  {
    "cat": "Históricos",
    "cmd": "moviemk",
    "title": "Movie Maker",
    "desc": "Producto descontinuado",
    "kind": "Ejecutar"
  },
  {
    "cat": "Históricos",
    "cmd": "msdt",
    "title": "Diagnóstico de soporte clásico",
    "desc": "Retirado progresivamente",
    "kind": "Ejecutar"
  },
  {
    "cat": "Históricos",
    "cmd": "wab",
    "title": "Contactos clásicos",
    "desc": "Disponibilidad variable",
    "kind": "Ejecutar"
  },
  {
    "cat": "Históricos",
    "cmd": "dialer",
    "title": "Marcador telefónico",
    "desc": "Disponibilidad variable",
    "kind": "Ejecutar"
  },
  {
    "cat": "Históricos",
    "cmd": "irprops.cpl",
    "title": "Infrarrojos",
    "desc": "Hardware y versiones antiguas",
    "kind": "Ejecutar"
  }
];
export const linux:Command[]=[
  {
    "cat": "Sistema",
    "cmd": "uname -a",
    "title": "Kernel y arquitectura",
    "desc": "Identifica versión del kernel y arquitectura",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "cat /etc/os-release",
    "title": "Distribución",
    "desc": "Nombre y versión de Linux",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "hostnamectl",
    "title": "Identidad del sistema",
    "desc": "Nombre, sistema y virtualización (systemd)",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "uptime",
    "title": "Tiempo activo",
    "desc": "Carga media y tiempo encendido",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "lsb_release -a",
    "title": "Distribución",
    "desc": "Identificación si lsb-release está instalado",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "date",
    "title": "Fecha y hora",
    "desc": "Hora actual",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "timedatectl",
    "title": "Reloj del sistema",
    "desc": "Estado de sincronización (systemd)",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "whoami",
    "title": "Usuario",
    "desc": "Usuario efectivo",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "id",
    "title": "Identidad",
    "desc": "UID, GID y grupos",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "who",
    "title": "Sesiones",
    "desc": "Usuarios conectados",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "last -x",
    "title": "Historial de sesiones",
    "desc": "Reinicios y apagados registrados",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "env",
    "title": "Entorno",
    "desc": "Variables de entorno",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "which bash",
    "title": "Ruta de ejecutable",
    "desc": "Localiza un programa",
    "kind": "Terminal"
  },
  {
    "cat": "Sistema",
    "cmd": "man ls",
    "title": "Manual",
    "desc": "Documentación del comando",
    "kind": "Terminal"
  },
  {
    "cat": "Hardware",
    "cmd": "lscpu",
    "title": "Procesador",
    "desc": "Arquitectura, núcleos y subprocesos",
    "kind": "Terminal"
  },
  {
    "cat": "Hardware",
    "cmd": "lspci -nnk",
    "title": "Dispositivos PCI",
    "desc": "IDs y controlador en uso (pciutils)",
    "kind": "Terminal"
  },
  {
    "cat": "Hardware",
    "cmd": "lsusb",
    "title": "Dispositivos USB",
    "desc": "IDs de dispositivos (usbutils)",
    "kind": "Terminal"
  },
  {
    "cat": "Hardware",
    "cmd": "lsusb -t",
    "title": "Árbol USB",
    "desc": "Topología y velocidad",
    "kind": "Terminal"
  },
  {
    "cat": "Hardware",
    "cmd": "sudo lshw -short",
    "title": "Inventario de hardware",
    "desc": "Requiere lshw",
    "kind": "sudo"
  },
  {
    "cat": "Hardware",
    "cmd": "sudo dmidecode -t bios",
    "title": "Firmware",
    "desc": "Datos SMBIOS (dmidecode)",
    "kind": "sudo"
  },
  {
    "cat": "Hardware",
    "cmd": "sudo dmidecode -t memory",
    "title": "Módulos RAM",
    "desc": "Información SMBIOS (dmidecode)",
    "kind": "sudo"
  },
  {
    "cat": "Hardware",
    "cmd": "sensors",
    "title": "Temperaturas",
    "desc": "Sensores disponibles (lm-sensors)",
    "kind": "Terminal"
  },
  {
    "cat": "Hardware",
    "cmd": "inxi -Fxxx",
    "title": "Inventario extendido",
    "desc": "Requiere inxi",
    "kind": "Terminal"
  },
  {
    "cat": "Hardware",
    "cmd": "glxinfo -B",
    "title": "Gráficos OpenGL",
    "desc": "Renderizador y GPU (mesa-utils)",
    "kind": "Terminal"
  },
  {
    "cat": "Hardware",
    "cmd": "vulkaninfo --summary",
    "title": "Gráficos Vulkan",
    "desc": "Dispositivos y API (vulkan-tools)",
    "kind": "Terminal"
  },
  {
    "cat": "Drivers",
    "cmd": "lsmod",
    "title": "Módulos cargados",
    "desc": "Lista módulos del kernel",
    "kind": "Terminal"
  },
  {
    "cat": "Drivers",
    "cmd": "modinfo amdgpu",
    "title": "Información de módulo",
    "desc": "Versión, dependencias y parámetros",
    "kind": "Terminal"
  },
  {
    "cat": "Drivers",
    "cmd": "sudo modprobe -n -v amdgpu",
    "title": "Probar carga",
    "desc": "Muestra operación sin cargar módulo",
    "kind": "sudo"
  },
  {
    "cat": "Drivers",
    "cmd": "sudo modprobe amdgpu",
    "title": "Cargar módulo",
    "desc": "Solicita carga de módulo",
    "kind": "sudo",
    "risk": "Modifica el estado del kernel"
  },
  {
    "cat": "Drivers",
    "cmd": "sudo modprobe -r nombre_modulo",
    "title": "Descargar módulo",
    "desc": "Solicita descarga si no está en uso",
    "kind": "sudo",
    "risk": "Puede interrumpir el dispositivo"
  },
  {
    "cat": "Drivers",
    "cmd": "sudo dmesg -T",
    "title": "Mensajes del kernel",
    "desc": "Hardware, firmware y fallos",
    "kind": "sudo"
  },
  {
    "cat": "Drivers",
    "cmd": "journalctl -k -b",
    "title": "Kernel actual",
    "desc": "Mensajes del arranque actual (systemd)",
    "kind": "Terminal"
  },
  {
    "cat": "Drivers",
    "cmd": "udevadm info --query=all --name=/dev/sda",
    "title": "Propiedades udev",
    "desc": "Identificación de dispositivo de ejemplo",
    "kind": "Terminal"
  },
  {
    "cat": "Drivers",
    "cmd": "ubuntu-drivers devices",
    "title": "Controladores disponibles",
    "desc": "Ubuntu, requiere ubuntu-drivers-common",
    "kind": "Terminal"
  },
  {
    "cat": "Drivers",
    "cmd": "dkms status",
    "title": "Módulos externos",
    "desc": "Estado de compilación DKMS",
    "kind": "Terminal"
  },
  {
    "cat": "Memoria",
    "cmd": "free -h",
    "title": "Memoria RAM",
    "desc": "Memoria usada, disponible y swap",
    "kind": "Terminal"
  },
  {
    "cat": "Memoria",
    "cmd": "vmstat 1 5",
    "title": "Actividad del sistema",
    "desc": "Memoria, CPU y E/S",
    "kind": "Terminal"
  },
  {
    "cat": "Memoria",
    "cmd": "cat /proc/meminfo",
    "title": "Detalle de memoria",
    "desc": "Contadores del kernel",
    "kind": "Terminal"
  },
  {
    "cat": "Memoria",
    "cmd": "swapon --show",
    "title": "Swap",
    "desc": "Áreas de intercambio activas",
    "kind": "Terminal"
  },
  {
    "cat": "Procesos",
    "cmd": "ps aux",
    "title": "Procesos",
    "desc": "Lista procesos y consumo",
    "kind": "Terminal"
  },
  {
    "cat": "Procesos",
    "cmd": "top",
    "title": "Monitor de procesos",
    "desc": "CPU y memoria en tiempo real",
    "kind": "Terminal"
  },
  {
    "cat": "Procesos",
    "cmd": "htop",
    "title": "Monitor interactivo",
    "desc": "Requiere htop",
    "kind": "Terminal"
  },
  {
    "cat": "Procesos",
    "cmd": "pgrep -a firefox",
    "title": "Buscar proceso",
    "desc": "PID y comando",
    "kind": "Terminal"
  },
  {
    "cat": "Procesos",
    "cmd": "pstree -p",
    "title": "Árbol de procesos",
    "desc": "Jerarquía (psmisc)",
    "kind": "Terminal"
  },
  {
    "cat": "Procesos",
    "cmd": "kill -l",
    "title": "Señales",
    "desc": "Consulta señales disponibles",
    "kind": "Terminal"
  },
  {
    "cat": "Procesos",
    "cmd": "kill -TERM 1234",
    "title": "Terminar proceso",
    "desc": "Solicita cierre del PID de ejemplo",
    "kind": "Terminal",
    "risk": "Puede interrumpir programas"
  },
  {
    "cat": "Procesos",
    "cmd": "nice -n 10 comando",
    "title": "Prioridad",
    "desc": "Inicia un comando con prioridad ajustada",
    "kind": "Terminal"
  },
  {
    "cat": "Procesos",
    "cmd": "iostat -xz 1",
    "title": "Rendimiento de discos",
    "desc": "Requiere sysstat",
    "kind": "Terminal"
  },
  {
    "cat": "Procesos",
    "cmd": "pidstat 1",
    "title": "Estadísticas por proceso",
    "desc": "Requiere sysstat",
    "kind": "Terminal"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINTS",
    "title": "Discos y particiones",
    "desc": "Identifica estructura y montaje",
    "kind": "Terminal"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "sudo fdisk -l",
    "title": "Tabla de particiones",
    "desc": "Lista sin modificar discos",
    "kind": "sudo"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "sudo blkid",
    "title": "Identificadores",
    "desc": "UUID y formatos",
    "kind": "sudo"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "df -h",
    "title": "Espacio libre",
    "desc": "Uso de sistemas montados",
    "kind": "Terminal"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "du -sh ~/Downloads",
    "title": "Tamaño de carpeta",
    "desc": "Espacio ocupado por archivos",
    "kind": "Terminal"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "findmnt",
    "title": "Montajes",
    "desc": "Árbol de sistemas de archivos",
    "kind": "Terminal"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "mount",
    "title": "Montajes",
    "desc": "Lista montajes actuales",
    "kind": "Terminal"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "sudo smartctl -a /dev/sda",
    "title": "Estado SMART",
    "desc": "Requiere smartmontools; dispositivo de ejemplo",
    "kind": "sudo"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "sudo nvme smart-log /dev/nvme0",
    "title": "Estado NVMe",
    "desc": "Requiere nvme-cli",
    "kind": "sudo"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "sudo fsck -N /dev/sdb1",
    "title": "Comprobación prevista",
    "desc": "Muestra qué verificador se ejecutaría",
    "kind": "sudo"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "sudo fsck /dev/sdb1",
    "title": "Reparación de volumen",
    "desc": "Usar sistema desmontado y verificador adecuado",
    "kind": "sudo",
    "risk": "Puede modificar datos; comprobar respaldo y dispositivo"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "sudo parted -l",
    "title": "Particiones",
    "desc": "Consulta tablas de particiones (parted)",
    "kind": "sudo"
  },
  {
    "cat": "Almacenamiento",
    "cmd": "ls -l /dev/disk/by-id",
    "title": "IDs de discos",
    "desc": "Identifica discos mediante enlaces persistentes",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "ip addr",
    "title": "Direcciones IP",
    "desc": "Interfaces y direcciones",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "ip link",
    "title": "Interfaces",
    "desc": "Estado de enlace y MAC",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "ip route",
    "title": "Rutas",
    "desc": "Puerta de enlace y rutas",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "ip neigh",
    "title": "Vecinos",
    "desc": "Tabla ARP/NDP",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "ping -c 4 1.1.1.1",
    "title": "Conectividad",
    "desc": "Cuatro pruebas ICMP",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "ss -tuln",
    "title": "Puertos",
    "desc": "Sockets TCP/UDP en escucha",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "sudo ss -tulpn",
    "title": "Puertos y procesos",
    "desc": "Identifica aplicaciones en escucha",
    "kind": "sudo"
  },
  {
    "cat": "Red",
    "cmd": "nmcli device status",
    "title": "NetworkManager",
    "desc": "Estado de dispositivos si está disponible",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "nmcli connection show",
    "title": "Conexiones",
    "desc": "Perfiles de NetworkManager",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "iw dev",
    "title": "Wi-Fi",
    "desc": "Interfaces inalámbricas (iw)",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "sudo ethtool enp3s0",
    "title": "Ethernet",
    "desc": "Velocidad y enlace (ethtool)",
    "kind": "sudo"
  },
  {
    "cat": "Red",
    "cmd": "dig example.com",
    "title": "DNS",
    "desc": "Consulta DNS (dnsutils/bind-utils)",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "getent hosts example.com",
    "title": "Resolución",
    "desc": "Consulta resolución del sistema",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "resolvectl status",
    "title": "DNS del sistema",
    "desc": "Estado de systemd-resolved",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "traceroute example.com",
    "title": "Ruta",
    "desc": "Requiere traceroute",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "curl -I https://example.com",
    "title": "HTTP",
    "desc": "Consulta cabeceras (curl)",
    "kind": "Terminal"
  },
  {
    "cat": "Red",
    "cmd": "ip -s link",
    "title": "Estadísticas de red",
    "desc": "Errores y paquetes por interfaz",
    "kind": "Terminal"
  },
  {
    "cat": "Servicios",
    "cmd": "systemctl status",
    "title": "Estado de servicios",
    "desc": "Consulta estado general (systemd)",
    "kind": "Terminal"
  },
  {
    "cat": "Servicios",
    "cmd": "systemctl --failed",
    "title": "Servicios fallidos",
    "desc": "Lista unidades fallidas",
    "kind": "Terminal"
  },
  {
    "cat": "Servicios",
    "cmd": "systemctl list-units --type=service",
    "title": "Servicios activos",
    "desc": "Lista unidades de servicio",
    "kind": "Terminal"
  },
  {
    "cat": "Servicios",
    "cmd": "systemctl status NetworkManager",
    "title": "Servicio de red",
    "desc": "Consulta estado del servicio",
    "kind": "Terminal"
  },
  {
    "cat": "Servicios",
    "cmd": "sudo systemctl restart NetworkManager",
    "title": "Reiniciar servicio",
    "desc": "Reinicia NetworkManager",
    "kind": "sudo",
    "risk": "Puede interrumpir conexiones"
  },
  {
    "cat": "Servicios",
    "cmd": "service --status-all",
    "title": "Servicios clásicos",
    "desc": "Sistemas con compatibilidad SysV",
    "kind": "Terminal"
  },
  {
    "cat": "Logs",
    "cmd": "journalctl -b",
    "title": "Arranque actual",
    "desc": "Registros del arranque (systemd)",
    "kind": "Terminal"
  },
  {
    "cat": "Logs",
    "cmd": "journalctl -b -1",
    "title": "Arranque anterior",
    "desc": "Requiere registros persistentes",
    "kind": "Terminal"
  },
  {
    "cat": "Logs",
    "cmd": "journalctl -p err -b",
    "title": "Errores del arranque",
    "desc": "Prioridad error y superiores",
    "kind": "Terminal"
  },
  {
    "cat": "Logs",
    "cmd": "journalctl -xe",
    "title": "Eventos recientes",
    "desc": "Explicaciones y final del journal",
    "kind": "Terminal"
  },
  {
    "cat": "Logs",
    "cmd": "journalctl -u NetworkManager -b",
    "title": "Registro de servicio",
    "desc": "Eventos del servicio de red",
    "kind": "Terminal"
  },
  {
    "cat": "Logs",
    "cmd": "journalctl --since today",
    "title": "Eventos de hoy",
    "desc": "Filtra por fecha",
    "kind": "Terminal"
  },
  {
    "cat": "Logs",
    "cmd": "tail -n 50 /var/log/syslog",
    "title": "Registro clásico",
    "desc": "Disponible en algunas distribuciones",
    "kind": "Terminal"
  },
  {
    "cat": "Logs",
    "cmd": "sudo dmesg -l err,warn",
    "title": "Avisos del kernel",
    "desc": "Filtra errores y advertencias",
    "kind": "sudo"
  },
  {
    "cat": "Paquetes",
    "cmd": "apt list --installed",
    "title": "Paquetes instalados",
    "desc": "Debian y Ubuntu",
    "kind": "Terminal"
  },
  {
    "cat": "Paquetes",
    "cmd": "apt search firmware",
    "title": "Buscar paquete",
    "desc": "Consulta catálogo APT",
    "kind": "Terminal"
  },
  {
    "cat": "Paquetes",
    "cmd": "sudo apt update",
    "title": "Actualizar índices",
    "desc": "Debian y Ubuntu",
    "kind": "sudo"
  },
  {
    "cat": "Paquetes",
    "cmd": "sudo apt install nombre-paquete",
    "title": "Instalar paquete",
    "desc": "Debian y Ubuntu",
    "kind": "sudo",
    "risk": "Modifica paquetes instalados"
  },
  {
    "cat": "Paquetes",
    "cmd": "dpkg -l",
    "title": "Inventario DEB",
    "desc": "Paquetes registrados",
    "kind": "Terminal"
  },
  {
    "cat": "Paquetes",
    "cmd": "dpkg -S /usr/bin/ls",
    "title": "Propietario de archivo",
    "desc": "Busca paquete DEB",
    "kind": "Terminal"
  },
  {
    "cat": "Paquetes",
    "cmd": "dnf list --installed",
    "title": "Inventario RPM",
    "desc": "Fedora y derivados",
    "kind": "Terminal"
  },
  {
    "cat": "Paquetes",
    "cmd": "dnf search firmware",
    "title": "Buscar paquete",
    "desc": "Fedora y derivados",
    "kind": "Terminal"
  },
  {
    "cat": "Paquetes",
    "cmd": "rpm -qa",
    "title": "Inventario RPM",
    "desc": "Paquetes instalados",
    "kind": "Terminal"
  },
  {
    "cat": "Paquetes",
    "cmd": "pacman -Q",
    "title": "Inventario Arch",
    "desc": "Paquetes instalados",
    "kind": "Terminal"
  },
  {
    "cat": "Paquetes",
    "cmd": "pacman -Ss firmware",
    "title": "Buscar paquete",
    "desc": "Arch y derivados",
    "kind": "Terminal"
  },
  {
    "cat": "Paquetes",
    "cmd": "zypper search firmware",
    "title": "Buscar paquete",
    "desc": "openSUSE",
    "kind": "Terminal"
  },
  {
    "cat": "Paquetes",
    "cmd": "flatpak list",
    "title": "Aplicaciones Flatpak",
    "desc": "Si Flatpak está disponible",
    "kind": "Terminal"
  },
  {
    "cat": "Paquetes",
    "cmd": "snap list",
    "title": "Aplicaciones Snap",
    "desc": "Si snapd está disponible",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "pwd",
    "title": "Directorio actual",
    "desc": "Muestra ruta",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "ls -lah",
    "title": "Archivos",
    "desc": "Lista detallada y ocultos",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "cd /var/log",
    "title": "Cambiar directorio",
    "desc": "Accede a registros",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "cat /etc/fstab",
    "title": "Configuración de montaje",
    "desc": "Lee configuración",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "less /var/log/syslog",
    "title": "Leer registro",
    "desc": "Navega texto si existe archivo",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "head -n 20 archivo.txt",
    "title": "Primeras líneas",
    "desc": "Lee inicio del archivo",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "tail -f archivo.log",
    "title": "Seguimiento",
    "desc": "Lee nuevas líneas",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "grep -in error archivo.log",
    "title": "Buscar texto",
    "desc": "Coincidencias con número de línea",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "find /etc -name '*.conf'",
    "title": "Buscar archivos",
    "desc": "Localiza configuraciones",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "file archivo",
    "title": "Tipo de archivo",
    "desc": "Identifica formato",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "stat archivo",
    "title": "Metadatos",
    "desc": "Permisos, tamaño y fechas",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "sha256sum archivo.iso",
    "title": "Hash SHA-256",
    "desc": "Verifica integridad con hash esperado",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "tar -tf backup.tar",
    "title": "Contenido de respaldo",
    "desc": "Lista sin extraer",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "cp -a origen destino",
    "title": "Copiar",
    "desc": "Conserva atributos según permisos",
    "kind": "Terminal",
    "risk": "Puede sobrescribir destino"
  },
  {
    "cat": "Archivos",
    "cmd": "mv origen destino",
    "title": "Mover",
    "desc": "Renombra o mueve archivos",
    "kind": "Terminal",
    "risk": "Puede sobrescribir destino"
  },
  {
    "cat": "Archivos",
    "cmd": "chmod u+x script.sh",
    "title": "Permisos",
    "desc": "Otorga ejecución al propietario",
    "kind": "Terminal",
    "risk": "Modifica permisos"
  },
  {
    "cat": "Archivos",
    "cmd": "sudo chown usuario:grupo archivo",
    "title": "Propietario",
    "desc": "Cambia dueño y grupo",
    "kind": "sudo",
    "risk": "Modifica permisos efectivos"
  },
  {
    "cat": "Archivos",
    "cmd": "rsync -avn origen/ destino/",
    "title": "Previsualizar copia",
    "desc": "Ensayo sin cambios (rsync)",
    "kind": "Terminal"
  },
  {
    "cat": "Archivos",
    "cmd": "rm --help",
    "title": "Eliminar archivos",
    "desc": "Consulta sintaxis sin borrar",
    "kind": "Terminal"
  },
  {
    "cat": "Seguridad",
    "cmd": "sudo ufw status verbose",
    "title": "Firewall",
    "desc": "Estado si UFW está instalado",
    "kind": "sudo"
  },
  {
    "cat": "Seguridad",
    "cmd": "sudo nft list ruleset",
    "title": "Firewall nftables",
    "desc": "Consulta reglas",
    "kind": "sudo"
  },
  {
    "cat": "Seguridad",
    "cmd": "getenforce",
    "title": "SELinux",
    "desc": "Estado si SELinux está disponible",
    "kind": "Terminal"
  },
  {
    "cat": "Seguridad",
    "cmd": "sudo aa-status",
    "title": "AppArmor",
    "desc": "Estado si AppArmor está disponible",
    "kind": "sudo"
  },
  {
    "cat": "Seguridad",
    "cmd": "sudo -l",
    "title": "Privilegios sudo",
    "desc": "Consulta permisos concedidos",
    "kind": "Terminal"
  }
];

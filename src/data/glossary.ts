type Entry={term:string;category:string;definition:string;detail:string;example:string;full?:string;warning?:string;source?:string;sourceLabel?:string};
export const glossary:Entry[]=[
  {
    "term": "Driver",
    "category": "Controladores",
    "definition": "Software que permite al sistema operativo controlar un dispositivo.",
    "detail": "Traduce operaciones del sistema a las interfaces del hardware.",
    "example": "Controlador de una tarjeta de red."
  },
  {
    "term": "PnP",
    "category": "Controladores",
    "definition": "Detección y configuración automática de dispositivos.",
    "detail": "El sistema identifica el dispositivo y selecciona un controlador compatible.",
    "example": "Conectar un mouse USB."
  },
  {
    "term": "Hardware ID",
    "category": "Identificación",
    "definition": "Identificador que describe un dispositivo.",
    "detail": "Se usa para localizar paquetes compatibles.",
    "example": "PCI\\\\VEN_8086&DEV_15F3"
  },
  {
    "term": "INF",
    "category": "Instalación",
    "definition": "Archivo de información de instalación de un paquete de controladores.",
    "detail": "Declara dispositivos compatibles y cómo instalar sus archivos.",
    "example": "Seleccionar una carpeta con un INF desde el administrador."
  },
  {
    "term": "SMART",
    "category": "Diagnóstico",
    "definition": "Sistema de información y monitoreo del almacenamiento.",
    "detail": "Sus atributos ayudan a evaluar el estado del disco, sin garantizar que no falle.",
    "example": "Revisar sectores pendientes."
  }
];

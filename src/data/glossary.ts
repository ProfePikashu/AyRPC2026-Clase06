import {expandedGlossary} from './glossary-expanded';
import {windows,linux} from '../slides/10-herramientas-nativas/commands';
import {groups,native} from '../slides/13-hirens/inventory';
import {apps,runtimes,tweaks} from '../slides/14-laboratorio/data';
type Entry={term:string;category:string;definition:string;detail:string;example:string;full?:string;warning?:string;source?:string;sourceLabel?:string};
const original:Entry[]=[
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
, {"term":"Kernel","category":"Sistema operativo","definition":"Núcleo del sistema operativo.","detail":"Administra recursos y proporciona servicios fundamentales a otros componentes del sistema.","example":"Un controlador en modo kernel puede gestionar operaciones de entrada y salida."}
];

const normalize=(v:string)=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const entries=new Map<string,Entry>();
const put=(v:Entry)=>{const key=normalize(v.term);if(!entries.has(key))entries.set(key,v)};
expandedGlossary.forEach(put);original.forEach(put);
for(const [list,platform] of [[windows,'Windows'],[linux,'Linux']] as const){
 for(const c of list)put({term:c.cmd,category:'Comandos '+platform,definition:c.title,detail:c.desc,example:c.cmd,...(c.risk?{warning:c.risk}:{})});
}
for(const g of groups)for(const [name,,desc,example] of g[3])put({term:name,category:'Herramientas Hiren PE',definition:desc,detail:desc,example});
for(const [name,,desc,example] of native)put({term:name,category:'Herramientas Hiren PE',definition:desc,detail:desc,example});
const appDescriptions:Record<string,string>={'Brave':'Navegador web basado en Chromium.','Chrome':'Navegador web de Google.','Chromium':'Proyecto de navegador de código abierto.','Edge':'Navegador web de Microsoft.','Firefox':'Navegador web de Mozilla.','Floorp':'Navegador derivado de Firefox.','Helium':'Navegador basado en Chromium.','LibreWolf':'Navegador derivado de Firefox orientado a privacidad.','Mullvad Browser':'Navegador orientado a privacidad desarrollado con el proyecto Tor.','Tor Browser':'Navegador que utiliza la red Tor.','Ungoogled Chromium':'Variante de Chromium que reduce dependencias de servicios Google.','Vivaldi':'Navegador web personalizable.','Waterfox':'Navegador derivado de Firefox.','Zen Browser':'Navegador derivado de Firefox.','Betterbird':'Cliente de correo derivado de Thunderbird.','Chatterino':'Cliente de chat de Twitch.','Discord':'Plataforma de comunicación de voz, video y texto.','Dorion':'Cliente alternativo de Discord.','Element':'Cliente de comunicación basado en Matrix.','Proton Mail':'Cliente de correo electrónico.','QTox':'Cliente de comunicación Tox.','Signal':'Aplicación de mensajería.','Slack':'Plataforma de comunicación de equipos.','Teams':'Plataforma de colaboración Microsoft.','TeamSpeak 3':'Cliente de comunicación por voz.','TeamSpeak 6':'Cliente de comunicación por voz.','Telegram':'Aplicación de mensajería.','Thunderbird':'Cliente de correo electrónico.','Vesktop':'Cliente alternativo de Discord.','Viber':'Aplicación de mensajería y llamadas.','WhatsApp Desktop':'Cliente de mensajería WhatsApp.','Zoom':'Aplicación de videoconferencias.','Bruno':'Cliente para pruebas de APIs.','ChatGPT Desktop':'Cliente de escritorio de ChatGPT.','Claude Desktop':'Cliente de escritorio de Claude.','Claude Code':'Herramienta de asistencia a programación.','Git':'Sistema de control de versiones distribuido.','Visual Studio Code':'Editor de código fuente.','Python':'Lenguaje e intérprete de programación.','Node.js':'Entorno de ejecución JavaScript.','Notepad++':'Editor de texto y código.','LibreOffice':'Suite de productividad de código abierto.','SumatraPDF':'Lector de documentos PDF y otros formatos.','PDF24':'Herramientas para trabajar con archivos PDF.','Steam':'Plataforma de distribución de videojuegos.','Epic Games Launcher':'Cliente de distribución de videojuegos.','GOG Galaxy':'Cliente de distribución de videojuegos.','PowerToys':'Utilidades adicionales de Windows de Microsoft.','Windows Terminal':'Aplicación anfitriona de terminales.','Audacity':'Editor y grabador de audio.','OBS Studio':'Grabación y transmisión de video.','HandBrake':'Transcodificador de video.','Docker Desktop':'Entorno de gestión de contenedores.','Tailscale':'Red privada virtual basada en WireGuard.'};
for(const name of apps)put({term:name,category:'Aplicaciones WinUtil',definition:appDescriptions[name]??'Aplicación incluida en el catálogo de WinUtil de esta clase.',detail:appDescriptions[name]??'Se puede seleccionar en Install; verificar función y compatibilidad antes de instalar.',example:'Buscar '+name+' en Install.'});
for(const name of runtimes)put({term:name,category:'Dependencias',definition:name.includes('x86')?'Bibliotecas de ejecución para aplicaciones de 32 bits.':name.includes('x64')?'Componentes de ejecución de 64 bits para aplicaciones compatibles.':'Componente de ejecución requerido por aplicaciones compatibles.',detail:'Instalar la versión y arquitectura que solicita el programa; no sustituir bibliotecas por DLL descargadas de sitios desconocidos.',example:'Laboratorio de compatibilidad de aplicaciones.'});
for(const name of tweaks)put({term:name,category:'Ajustes WinUtil',definition:'Opción de configuración disponible en la pestaña Tweaks.',detail:'Revisar su efecto antes de aplicarla, conservar un punto de restauración y comprobar si es adecuada para el equipo.',example:'Seleccionar '+name+' en Tweaks.'});
export const glossary=[...entries.values()].sort((a,b)=>a.term.localeCompare(b.term,'es',{numeric:true,sensitivity:'base'}));

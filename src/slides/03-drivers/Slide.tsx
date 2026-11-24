import {useEffect,useState} from 'react';
import type {CSSProperties} from 'react';
import {GlossaryTerm} from '../../components/Glossary';
import './slide.css';
type Mode='specific'|'generic'|'bad'|'missing';
type IconName='app'|'kernel'|'driver'|'hardware';
const devices=[
 {name:'Mouse USB',app:'Aplicación de diseño',hardware:'Mouse USB',ask:'Quiero cambiar el DPI del mouse.',genericAsk:'Quiero mover el cursor.',technical:'Solicitud de configuración HID específica del fabricante',base:'Reporte HID estándar',command:'SET_REPORT (específico del dispositivo)',reply:'Configuración aceptada',result:'DPI configurado',limited:'El cursor se mueve; el ajuste especial no está disponible.',error:'El dispositivo rechaza el comando no compatible.',pnp:'USB HID'},
 {name:'Audio',app:'Reproductor',hardware:'Códec / interfaz de audio',ask:'Quiero usar la salida multicanal.',genericAsk:'Quiero reproducir sonido.',technical:'Configuración de canales y flujo de audio',base:'Flujo de audio estándar',command:'Configurar formato y canales admitidos',reply:'Flujo disponible',result:'Audio multicanal disponible',limited:'Audio básico disponible; funciones adicionales no expuestas.',error:'El formato solicitado no se puede configurar.',pnp:'Dispositivo de audio'},
 {name:'Video',app:'Aplicación 3D',hardware:'GPU',ask:'Quiero renderizar esta escena en la GPU.',genericAsk:'Quiero mostrar el escritorio.',technical:'Solicitud de aceleración gráfica mediante API',base:'Presentación básica de imagen',command:'Preparar y enviar trabajo a la GPU',reply:'Trabajo completado',result:'Aceleración gráfica disponible',limited:'Imagen básica; aceleración del fabricante no disponible.',error:'La inicialización de la ruta gráfica falla.',pnp:'Adaptador de pantalla'}];
const modes:{id:Mode;label:string}[]=[{id:'specific',label:'Específico'},{id:'generic',label:'Genérico / base'},{id:'bad',label:'Incompatible'},{id:'missing',label:'Sin driver'}];
function Glyph({kind}:{kind:IconName}){
 return <svg viewBox="0 0 100 80" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
 {kind==='app'?<><rect x="10" y="9" width="80" height="52" rx="6"/><path d="M10 22h80M38 70h24M50 61v9"/><circle cx="18" cy="16" r="1"/><circle cx="25" cy="16" r="1"/><path d="m36 32-10 9 10 9m28-18 10 9-10 9M54 30l-8 22"/></>:kind==='kernel'?<><rect x="20" y="10" width="60" height="60" rx="9"/><rect x="32" y="22" width="36" height="36" rx="5"/><path d="M34 3v7M50 3v7M66 3v7M34 70v7M50 70v7M66 70v7M13 24h7M13 40h7M13 56h7M80 24h7M80 40h7M80 56h7"/><path d="m43 32 14 16m0-16-14 16"/></>:kind==='driver'?<><path d="M12 14h55a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H36L22 62V50H12a7 7 0 0 1-7-7V22a8 8 0 0 1 7-8Z"/><path d="M79 31h10a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6h-9v9L66 65H45a6 6 0 0 1-6-6"/><path d="M19 26h28M33 26v12m-9 3h19m9-5 8 8 8-8"/></>:<><rect x="10" y="8" width="80" height="64" rx="5"/><rect x="36" y="25" width="29" height="29" rx="3"/><path d="M18 18h16v14M82 18H65v7M18 63h16V48M82 63H65V48M10 40h26M65 40h25"/><circle cx="20" cy="18" r="3"/><circle cx="80" cy="63" r="3"/></>}
 </svg>
}
export default function Slide(){
 const [device,setDevice]=useState(0),[mode,setMode]=useState<Mode>('specific'),[view,setView]=useState<'talk'|'pnp'>('talk');
 const [step,setStep]=useState(-1),[playing,setPlaying]=useState(false);
 const d=devices[device],generic=mode==='generic',bad=mode==='bad',missing=mode==='missing';
 const talk=[
 {actor:0,plain:generic?d.genericAsk:d.ask,tech:generic?'Solicitud de funcionalidad estándar':d.technical},
 {actor:1,plain:'Voy a dirigir tu pedido al dispositivo correcto.',tech:'Servicios del SO y subsistema de E/S encaminan la solicitud.'},
 {actor:2,plain:missing?'No hay un intérprete compatible.':bad?'No puedo interpretar correctamente este pedido.':generic?'Entiendo el idioma estándar.': 'Traduzco tu pedido al protocolo del dispositivo.',tech:missing?'No existe una pila funcional para esta operación.':bad?'El controlador falla al procesar o preparar la operación.':generic?d.base:d.command},
 {actor:3,plain:bad?'No puedo ejecutar ese pedido.':'Recibido. Ejecuto la operación.',tech:bad?d.error:d.reply},
 {actor:2,plain:bad?'Tengo que informar el error.':'Recibí la respuesta; se la paso al sistema.',tech:bad?'Estado de error devuelto a la pila.':'Datos o estado de finalización.'},
 {actor:1,plain:'Le devuelvo el resultado a la aplicación.',tech:'El subsistema del SO completa la solicitud.'},
 {actor:0,plain:bad?'No salió bien.':generic?'Funciona, pero con limitaciones.':'¡Funcionó!',tech:bad?d.error:generic?d.limited:d.result}];
 const pnp=[
 {actor:3,plain:'¡Me acaban de conectar!',tech:'El bus detecta un dispositivo y lo enumera.'},
 {actor:1,plain:'¿Quién sos? Necesito identificarte.',tech:'PnP recibe los identificadores y características del dispositivo.'},
 {actor:3,plain:'Estos son mis identificadores.',tech:'Clase / dispositivo: '+d.pnp},
 {actor:1,plain:'Busco un controlador compatible.',tech:'El sistema selecciona un paquete compatible disponible.'},
 {actor:2,plain:missing?'No encontraron un controlador compatible.':bad?'La inicialización del controlador falló.':generic?'Puedo manejar las funciones estándar.':'Puedo manejar las funciones admitidas por este dispositivo.',tech:missing?'Sin controlador funcional.':bad?'El paquete seleccionado no logra iniciar el dispositivo.':'Se carga la pila seleccionada y se inicia el dispositivo.'},
 {actor:0,plain:missing||bad?'Todavía no puedo usarlo correctamente.':'¡Ya puedo usar el dispositivo!',tech:missing||bad?'Dispositivo sin funcionalidad esperada.':generic?'Funciones estándar disponibles.':'Funciones compatibles disponibles.'}];
 const frames=view==='pnp'?pnp:missing?talk.slice(0,3):talk;
 const last=frames.length-1;
 useEffect(()=>{if(!playing)return;const id=window.setTimeout(()=>{if(step>=last){setPlaying(false);return}setStep(step+1)},1700);return()=>window.clearTimeout(id)},[playing,step,last]);
 const reset=()=>{setPlaying(false);setStep(-1)};
 const frame=frames[step];
 const actor=frame?.actor??-1;
 const previous=frames[step-1]?.actor??actor;
 const labels=['Software','Sistema operativo','Driver','Hardware'];
 const details=[d.app,'Kernel y servicios',missing?'Sin controlador':generic?'Controlador genérico':bad?'Controlador con fallo':'Controlador específico',d.hardware];
 const kinds:IconName[]=['app','kernel','driver','hardware'];
 const status=step<last?'En espera del resultado':missing?'Operación no disponible':bad?'Error de comunicación':generic?'Funciones estándar':'Operación correcta';
 return <article className="slide drv03 drv03-v2">
 <header><h1>¿Qué es un driver?</h1><p>Un <strong>controlador de dispositivo</strong> es un componente de software que permite o interviene en la comunicación entre el sistema operativo y un dispositivo, gestionando operaciones de entrada, salida, configuración y control mediante las interfaces correspondientes.</p><div className="drv03-criollo"><strong>En criollo:</strong> es el intérprete entre lo que el software necesita y lo que el hardware entiende.</div></header>
 <section className="drv03-lab" aria-label="Simulación de comunicación">
 <div className="drv03-toolbar"><div className="drv03-choice">{([{id:'talk',label:'El intérprete'},{id:'pnp',label:'Plug and Play'}] as const).map(v=><button key={v.id} aria-pressed={view===v.id} onClick={()=>{reset();setView(v.id)}}>{v.label}</button>)}</div><div className="drv03-choice">{devices.map((v,i)=><button key={v.name} aria-pressed={device===i} onClick={()=>{reset();setDevice(i)}}>{v.name}</button>)}</div></div>
 <div className="drv03-mode"><span>Controlador:</span>{modes.map(v=><button key={v.id} data-mode={v.id} aria-pressed={mode===v.id} onClick={()=>{reset();setMode(v.id)}}>{v.label}</button>)}</div>
 <div className="drv03-theatre" data-mode={mode}>
 {labels.map((label,i)=><div className={'drv03-character '+(actor===i?'active':'')} key={label}><div className="drv03-bubble">{actor===i?frame.plain:<span>···</span>}</div><div className="drv03-glyph"><Glyph kind={kinds[i]}/></div><b>{label}</b><small>{details[i]}</small></div>)}
 {step>=0&&actor!==previous&&<div key={view+device+mode+step} className="drv03-packet" style={{'--from':(12.5+previous*25)+'%','--to':(12.5+actor*25)+'%'} as CSSProperties}/>}
 </div>
 <div className="drv03-readout" aria-live="polite"><span className="drv03-tech-tag">LECTURA TÉCNICA</span><strong>{frame?.tech??(view==='pnp'?'Conectá virtualmente un dispositivo para observar su detección y configuración.':'Elegí un controlador y observá cómo se procesa una solicitud.')}</strong><span className={'drv03-status '+(step===last?(bad||missing?'fail':generic?'limited':'ok'):'')}>{status}</span></div>
 <div className="drv03-play"><button onClick={()=>{if(playing){setPlaying(false);return}if(step===last||step<0)setStep(0);setPlaying(true)}}>{playing?'Pausar':step===last?'Repetir':step<0?view==='pnp'?'Conectar dispositivo':'Iniciar diálogo':'Continuar'}</button><button onClick={()=>{setPlaying(false);setStep(s=>s===last?0:s+1)}}>Paso a paso</button><button onClick={reset}>Reiniciar</button><div className="drv03-progress">{frames.map((_,i)=><span key={i} className={i<=step?'done':''}/>)}</div></div>
 </section>
 <div className="drv03-concepts"><div><b><GlossaryTerm term="Kernel">Kernel</GlossaryTerm></b><p>Núcleo del SO: administra recursos y servicios fundamentales.</p></div><div><b><GlossaryTerm term="PnP">Plug and Play</GlossaryTerm></b><p>Detecta, identifica y configura dispositivos; selecciona controladores compatibles.</p></div><div><b>Base / genérico</b><p>Implementa funciones comunes de una clase de dispositivos.</p></div><div><b>Específico</b><p>Puede exponer funciones adicionales propias del hardware.</p></div></div>
 <footer className="drv03-source">Modelo didáctico: los drivers pueden actuar en capas, en modo usuario o kernel; no todos acceden directamente al hardware. Un fallo puede causar errores o inestabilidad. <a href="https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/what-is-a-driver-" target="_blank" rel="noreferrer">Microsoft Learn ↗</a></footer>
 </article>
}

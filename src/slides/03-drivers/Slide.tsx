import {useEffect,useState} from 'react';
import {GlossaryTerm} from '../../components/Glossary';
import './slide.css';
type Mode='ok'|'base'|'absent'|'critical';
type Frame={at:number;to:number;token:string;caption:string;technical:string;action:string};
const common:Frame[]=[
 {at:0,to:0,token:'PEDIDO',caption:'Necesito hacer algo.',technical:'La aplicación solicita una operación al sistema operativo.',action:'prepare'},
 {at:0,to:1,token:'PEDIDO',caption:'El software entrega su pedido.',technical:'La solicitud llega a los servicios del sistema operativo.',action:'pass'},
 {at:1,to:1,token:'PEDIDO',caption:'¿A qué dispositivo va esto?',technical:'El SO identifica la ruta de entrada/salida correspondiente.',action:'inspect'},
 {at:1,to:2,token:'PEDIDO',caption:'El sistema se lo pasa al intérprete.',technical:'La solicitud se dirige a la pila de controladores.',action:'pass'},
];
const routes:Record<Mode,Frame[]>={ok:[...common,
 {at:2,to:2,token:'COMANDO',caption:'¡Ahora está en el idioma del hardware!',technical:'El controlador prepara la operación mediante la interfaz del dispositivo.',action:'inspect'},
 {at:2,to:3,token:'COMANDO',caption:'El intérprete entrega la orden.',technical:'La pila transmite los comandos correspondientes.',action:'pass'},
 {at:3,to:3,token:'DATOS',caption:'El hardware realiza el trabajo.',technical:'El dispositivo ejecuta la operación y produce datos o un estado.',action:'inspect'},
 {at:3,to:2,token:'DATOS',caption:'El hardware devuelve su respuesta.',technical:'La respuesta llega al controlador.',action:'pass'},
 {at:2,to:2,token:'RESULTADO',caption:'El intérprete adapta la respuesta.',technical:'El controlador comunica el resultado de la operación al SO.',action:'inspect'},
 {at:2,to:1,token:'RESULTADO',caption:'La respuesta vuelve al sistema.',technical:'El subsistema del SO recibe el resultado.',action:'pass'},
 {at:1,to:0,token:'RESULTADO',caption:'¡El software recibió lo que necesitaba!',technical:'La aplicación recibe la finalización de la operación.',action:'pass'},
 {at:0,to:0,token:'✓',caption:'¡Todos se entendieron!',technical:'Operación completada correctamente.',action:'celebrate'}],
 base:[...common,
 {at:2,to:2,token:'BÁSICO',caption:'Entiendo el idioma común, pero no todas las funciones especiales.',technical:'Un controlador genérico puede cubrir las funciones normalizadas del dispositivo.',action:'inspect'},
 {at:2,to:3,token:'BÁSICO',caption:'Le paso una orden estándar.',technical:'Se utiliza una operación compatible con el estándar.',action:'pass'},
 {at:3,to:3,token:'DATOS',caption:'¡Puedo hacer eso!',technical:'El hardware ejecuta la operación estándar.',action:'inspect'},
 {at:3,to:2,token:'DATOS',caption:'La respuesta vuelve al intérprete.',technical:'El controlador recibe el estado o los datos.',action:'pass'},
 {at:2,to:1,token:'RESULTADO',caption:'Le devuelvo el resultado al sistema.',technical:'La pila comunica el resultado.',action:'pass'},
 {at:1,to:0,token:'RESULTADO',caption:'El software recibe una respuesta.',technical:'Se completa la función estándar.',action:'pass'},
 {at:0,to:0,token:'✓',caption:'¡Funciona! Algunas funciones especiales podrían faltar.',technical:'Un driver genérico también puede cubrir todas las funciones si el estándar es suficiente.',action:'celebrate'}],
 absent:[...common.slice(0,3),
 {at:1,to:1,token:'!',caption:'¿Y el intérprete? No está disponible.',technical:'No hay un controlador compatible cargado; el SO no dispone de una ruta funcional para esta operación.',action:'inspect'},
 {at:1,to:1,token:'ERROR',caption:'No puedo enviarle el pedido al hardware.',technical:'El sistema puede informar que el dispositivo no está disponible sin sufrir un fallo crítico.',action:'inspect'},
 {at:1,to:0,token:'ERROR',caption:'El software no consigue el resultado.',technical:'El hardware no recibió una orden funcional en este ejemplo.',action:'pass'},
 {at:0,to:0,token:'!',caption:'El hardware sigue ahí, pero no podemos utilizarlo correctamente.',technical:'Un controlador defectuoso puede provocar fallos e inestabilidad.',action:'error'}],
 critical:[...common,
 {at:2,to:2,token:'!',caption:'¡El intérprete se rompió!',technical:'Un controlador en modo kernel incurre en un fallo grave durante la operación.',action:'sleep'},
 {at:2,to:1,token:'ERROR',caption:'¡Error crítico en el sistema operativo!',technical:'Ejemplo de un fallo fatal en kernel: Windows detiene el sistema mediante un bug check (BSOD). No todo error de driver produce esto.',action:'pass'},
 {at:1,to:1,token:'BSOD',caption:'¡Se cayó todo! El software también dejó de funcionar.',technical:'Al detenerse el sistema operativo, las aplicaciones dejan de ejecutarse; no reciben una respuesta normal.',action:'error'},
 {at:1,to:1,token:'BSOD',caption:'El hardware sigue ahí, pero el sistema está detenido.',technical:'La animación reinicia solo para repetir la demostración; no representa una recuperación automática del sistema.',action:'error'}]};
const names=['Software','Sistema operativo','Controlador','Hardware'];
import {Mascot,colors} from './Mascot';
export default function Slide(){
 const [mode,setMode]=useState<Mode>('ok'),[index,setIndex]=useState(0),[paused,setPaused]=useState(false);
 const frames=routes[mode],frame=frames[index];
 useEffect(()=>{if(paused)return;const timer=window.setTimeout(()=>setIndex(i=>(i+1)%frames.length),frame.action==='pass'?1250:frame.action==='inspect'?1900:2400);return()=>window.clearTimeout(timer)},[paused,index,frames,frame.action]);
 const change=(m:Mode)=>{setMode(m);setIndex(0);setPaused(false)};
 const color=frame.token==='ERROR'||frame.token==='!'||frame.token==='BSOD'?'error':frame.token==='COMANDO'||frame.token==='BÁSICO'?'command':frame.token==='DATOS'||frame.token==='RESULTADO'||frame.token==='✓'?'result':'request';
 return <article className="slide d3">
 <header><h1>¿Qué es un driver?</h1><p>Un <strong>controlador de dispositivo</strong> es un componente de software que permite o interviene en la comunicación entre el sistema operativo y un dispositivo, gestionando operaciones de entrada, salida, configuración y control mediante las interfaces correspondientes.</p><p className="d3-criollo"><b>En criollo:</b> es el intérprete entre lo que el software necesita y lo que el hardware entiende.</p></header>
 <div className="d3-layout"><section className="d3-stage" aria-label="Animación de comunicación entre software y hardware">
 <div className="d3-bar"><div className="d3-modes">{([{id:'ok',label:'Correcto'},{id:'base',label:'Genérico'},{id:'absent',label:'Ausente'},{id:'critical',label:'Fallo crítico'}] as const).map(m=><button key={m.id} data-mode={m.id} aria-pressed={mode===m.id} onClick={()=>change(m.id)}>{m.label}</button>)}</div><div className="d3-controls"><button onClick={()=>setPaused(v=>!v)} aria-label={paused?'Reproducir':'Pausar'}>{paused?'▶':'Ⅱ'}</button><button onClick={()=>setIndex(0)} aria-label="Reiniciar animación">↻</button></div></div>
 <div className={'d3-scene '+(paused?'paused':'')} data-mode={mode}>
 <div className="d3-message" key={mode+index}>{frame.caption}</div>

 <div className="d3-cast"><div className="d3-handtrack"><div key={mode+index+'packet'} className={'d3-packet '+color+' '+frame.action+(mode==='base'&&(frame.token==='RESULTADO'||frame.token==='✓')?' bitten':'')} style={{left:(12.5+frame.to*25+(frame.at===frame.to?(frame.to===0?8:-8):frame.at<frame.to?-8:8))+'%','--start':(12.5+frame.at*25+(frame.to>frame.at?8:-8))+'%','--end':(12.5+frame.to*25+(frame.to>frame.at?-8:8))+'%'} as import('react').CSSProperties}>{frame.token}</div></div>{names.map((n,i)=><div key={n} className="d3-person" style={{color:colors[i]}}><Mascot i={i} active={frame.to===i||frame.at===i} sleeping={i===2&&(mode==='absent'||(mode==='critical'&&index>=4))} action={frame.action} hand={frame.at===frame.to?(frame.to===0?'right':'left'):frame.at===i?(frame.to>i?'right':'left'):frame.to===i?(frame.at<i?'left':'right'):'none'} reaction={mode==='absent'||mode==='critical'?(i===3&&index=== (mode==='absent'?3:4)?'surprise':i===3&&index>(mode==='absent'?3:4)?'scratch':mode==='critical'&&i===1&&index>=5?'bsod':mode==='critical'&&i===0&&index>=5?'glitch':'none'):'none'}/><b>{n}</b>{i===2&&<small>El intérprete</small>}</div>)}</div>
 </div>
 <div className="d3-technical"><span>QUÉ OCURRE REALMENTE</span><p aria-live="polite">{frame.technical}</p></div>
 <div className="d3-legend"><span><i className="request"/> Solicitud</span><span><i className="command"/> Comando</span><span><i className="result"/> Respuesta</span><span><i className="error"/> Error</span></div>
 </section><aside className="d3-side"><div><b><GlossaryTerm term="Kernel">Kernel</GlossaryTerm></b><p>Núcleo del sistema operativo. Administra recursos y servicios fundamentales.</p></div><div><b><GlossaryTerm term="PnP">Plug and Play</GlossaryTerm></b><p>Detecta, identifica y configura dispositivos; selecciona un controlador compatible cuando está disponible.</p></div><div><b>Base / genérico</b><p>Implementa funciones comunes o normalizadas de una clase de dispositivos.</p></div><div><b>Específico</b><p>Adaptado a un hardware; puede habilitar funciones adicionales.</p></div></aside></div>
 <footer>Analogía simplificada: los controladores pueden trabajar en capas, en modo usuario o kernel. PnP interviene en la detección y configuración, no en cada operación. <a href="https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/what-is-a-driver-" target="_blank" rel="noreferrer">Microsoft Learn ↗</a></footer>
 </article>
}

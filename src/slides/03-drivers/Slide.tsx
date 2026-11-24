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
const colors=['#56b8ed','#8dd89a','#f7c85e','#f58b72'];
function Glove(){return <g stroke="#12212b" strokeWidth="3" strokeLinejoin="round"><path d="M-10 10Q-17 5-15-2L-18-10Q-20-17-14-18Q-10-18-7-9L-7-22Q-7-28-1-27Q4-27 4-21V-12L8-24Q11-29 16-25Q19-23 16-17L13-9Q22-17 25-11Q29-6 20 2L14 12Q9 18-2 15Z" fill="#f8faf5"/><path d="M-5-4l4 5m4-8 4 5M-11 12l22 3" fill="none"/></g>}
function Mascot({i,active,sleeping,action,reaction,hand}:{i:number;active:boolean;sleeping:boolean;action:string;reaction:'none'|'surprise'|'scratch'|'bsod'|'glitch';hand:'left'|'right'|'none'}){
 const c=colors[i];
 return <svg viewBox="0 0 180 168" className={'d3-mascot '+(active?'is-active ':'')+(sleeping?'is-asleep':'')+' reaction-'+reaction} data-action={active?action:''} data-hand={hand} aria-hidden="true">
 <ellipse cx="90" cy="150" rx="58" ry="8" fill="#000" opacity=".25"/>
 <g className="d3-body" stroke="#12212b" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M62 124v15M118 124v15" fill="none"/>
 <path d="M62 137q-19-2-20 10h35v-9zM118 137q19-2 20 10h-35v-9z" fill={c}/>
 <g className="d3-arm-left"><path d="M36 77Q15 83 20 103" fill="none"/><g transform="translate(20 104) scale(-1 1)"><Glove/></g></g>
 <g className="d3-arm-right"><path d="M144 77q21 6 16 26" fill="none"/><g transform="translate(160 104)"><Glove/></g></g>
 {i===0?<><rect x="31" y="28" width="118" height="100" rx="19" fill={c}/><path d="M32 49h116" stroke="#267aa9"/><circle cx="43" cy="39" r="2" fill="#fff" stroke="none"/><circle cx="52" cy="39" r="2" fill="#fff" stroke="none"/><path d="m77 108-9 6 9 6m26-12 9 6-9 6m-8-15-7 18" stroke="#246c94" strokeWidth="3"/></>:i===1?<><path d="M75 27V16h30v11l11-4 10 10-4 12H58l-4-12 10-10z" fill="#5fae70"/><rect x="32" y="32" width="116" height="94" rx="21" fill={c}/><rect x="42" y="42" width="96" height="74" rx="15" fill="#a3e5ad" stroke="#4b9460" strokeWidth="2"/></>:i===2?<><rect x="29" y="30" width="122" height="97" rx="32" fill={c}/><path d="M46 52q44-35 88 0" fill="none" stroke="#fff1bb" strokeWidth="5"/><path d="M79 112h22m-17-5-5 5 5 5m12-10 5 5-5 5" stroke="#9e6a22" strokeWidth="3"/><rect x="23" y="63" width="12" height="30" rx="5" fill="#d7a442"/><rect x="145" y="63" width="12" height="30" rx="5" fill="#d7a442"/></>:<><rect x="31" y="30" width="118" height="97" rx="17" fill={c}/><path d="M42 42h12v13m84-13h-12v13M42 114h12v-12m84 12h-12v-12" stroke="#b85d4c" strokeWidth="3" fill="none"/><rect x="69" y="106" width="42" height="12" rx="3" fill="#5d726f"/><path d="M76 102v4m9-4v4m10-4v4m9-4v4" strokeWidth="2"/></>}
 {reaction==='scratch'&&<g className="d3-scratch" stroke="#12212b"><path d="M142 79 Q169 61 151 38" fill="none"/><g transform="translate(150 36) rotate(-35)"><Glove/></g><path d="m146 33 5 5m0-8 5 5" strokeWidth="2"/></g>}
 {reaction==='surprise'&&<g fill="#f7c85e" stroke="none"><path d="M139 12l9-8 3 4-9 8zM158 22l12-2 1 5-12 2z"/><text x="19" y="23" fontSize="23" fontWeight="bold">!</text></g>}
 {reaction==='scratch'&&<text x="18" y="24" fill="#f7c85e" stroke="none" fontSize="23" fontWeight="bold">?</text>}
 <g className="d3-eyes">{reaction==='glitch'?<>{[67,113].map(x=><g key={x}><path d={`M${x-12} 65l24 26m0-26l-24 26`} stroke="#12212b" strokeWidth="7" fill="none"/></g>)}</>:reaction==='bsod'?<>{[67,113].map(x=><g key={x}><rect x={x-19} y="54" width="38" height="46" rx="8" fill="#0878d1" stroke="#10365d" strokeWidth="3"/><text x={x} y="74" textAnchor="middle" fill="white" stroke="none" fontSize="17" fontWeight="bold">:(</text><path d={`M${x-11} 82h22m-22 5h15m-15 5h19`} stroke="#e2f4ff" strokeWidth="1.5"/></g>)}</>:sleeping?<><path d="M54 76q13 10 26 0m20 0q13 10 26 0" fill="none" strokeWidth="5"/><text x="132" y="24" fill="#a4b8c5" stroke="none" fontSize="18" fontWeight="bold">zZ</text></>:<>{[67,113].map(x=><g key={x}><ellipse cx={x} cy="77" rx={reaction==='surprise'?21:19} ry={reaction==='surprise'?28:24} fill="#fff" strokeWidth="3.5"/><ellipse className="d3-pupil" cx={x+(reaction==='scratch'?-6:active?(hand==='left'?-7:7):3)} cy={reaction==='scratch'?73:active?87:79} rx={reaction==='surprise'?6:10} ry={reaction==='surprise'?9:14} fill="#16242b" stroke="none"/><circle cx={x+6} cy="73" r="3.5" fill="white" stroke="none"/></g>)}</>}</g>
 </g></svg>
}
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

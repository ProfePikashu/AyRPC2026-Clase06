import {useState} from 'react';
import {GlossaryTerm} from '../../components/Glossary';
import './slide.css';
const cases=[
 {name:'Almacenamiento',app:'Explorador de archivos',request:'Leer un archivo',os:'Sistema de archivos y gestor de E/S',driver:'Pila de almacenamiento',hw:'SSD / controlador NVMe',command:'Solicitud de lectura de bloques',result:'Bloques de datos y estado',finish:'El archivo se entrega a la aplicación'},
 {name:'Audio',app:'Reproductor multimedia',request:'Reproducir sonido',os:'Motor de audio y subsistema de E/S',driver:'Pila de controladores de audio',hw:'Controlador de audio / códec',command:'Transferencia de muestras de audio',result:'Estado de reproducción',finish:'La aplicación recibe el estado'},
 {name:'Red',app:'Navegador web',request:'Enviar datos a la red',os:'Pila TCP/IP y subsistema de red',driver:'Controlador del adaptador de red',hw:'Adaptador Ethernet / Wi-Fi',command:'Preparación y transmisión de tramas',result:'Estado de transmisión / datos recibidos',finish:'La pila de red entrega los datos pertinentes'}];
export default function Slide(){
 const [selected,setSelected]=useState(0);
 const [step,setStep]=useState(-1);
 const c=cases[selected];
 const nodes=[{title:'Aplicación',detail:c.app,tag:'MODO USUARIO'},{title:'Sistema operativo',detail:c.os,tag:'SERVICIOS DEL SO / KERNEL'},{title:'Pila de controladores',detail:c.driver,tag:'DRIVERS'},{title:'Hardware',detail:c.hw,tag:'DISPOSITIVO FÍSICO'}];
 const messages=[c.request,'El SO dirige la solicitud a la pila de controladores',c.command,c.result,'El SO procesa la respuesta',c.finish];
 const active=[0,1,2,3,2,0][step]??-1;
 return <article className="slide drv03">
 <header><h1>¿Qué es un driver?</h1><p>Un <strong>controlador de dispositivo</strong> es un componente de software que permite o interviene en la comunicación entre el sistema operativo y un dispositivo, gestionando operaciones de entrada, salida, configuración y control mediante las interfaces correspondientes.</p></header>
 <div className="drv03-body">
 <section className="drv03-diagram" aria-label="Modelo simplificado de comunicación">
 <div className="drv03-tabs">{cases.map((v,i)=><button key={v.name} type="button" aria-pressed={selected===i} onClick={()=>{setSelected(i);setStep(-1)}}>{v.name}</button>)}</div>
 <div className="drv03-chain">{nodes.map((n,i)=><div className="drv03-unit" key={n.title}><div className={'drv03-node '+(active===i?'lit':'')} data-layer={i}><small>{n.tag}</small><strong>{n.title}</strong><span>{n.detail}</span></div>{i<3&&<div className="drv03-wire" aria-hidden="true"><span className={step>=0&&step<=2&&i===step?'pulse':''}>↓</span><span className={step>=3&&i===5-step?'pulse':''}>↑</span></div>}</div>)}</div>
 <div className="drv03-controls"><button type="button" onClick={()=>setStep(s=>(s+1)%6)}>{step===-1?'Simular operación':step===5?'Repetir operación':'Siguiente paso'}</button><button type="button" onClick={()=>setStep(-1)}>Reiniciar</button><span aria-live="polite">{step===-1?'Elegí un dispositivo y recorré la comunicación.':(step+1)+'/6 · '+messages[step]}</span></div>
 </section>
 <aside className="drv03-notes">
 <h2>¿Qué hace el controlador?</h2>
 <div><b>Configuración</b><p>Inicializa el dispositivo y habilita las funciones compatibles.</p></div>
 <div><b>Comunicación</b><p>Procesa solicitudes, administra transferencias y comunica datos o estados al sistema.</p></div>
 <div><b>Compatibilidad</b><p>Un driver genérico puede ofrecer funciones básicas; uno específico puede habilitar capacidades adicionales.</p></div>
 <div><b>Arquitectura</b><p>Los drivers pueden actuar en capas y ejecutarse en modo usuario o <GlossaryTerm term="Kernel">kernel</GlossaryTerm>. No todos acceden directamente al hardware; también existen drivers de software.</p></div>
 <footer>Esquema didáctico simplificado; las rutas reales dependen del dispositivo y del sistema operativo. <a href="https://learn.microsoft.com/windows-hardware/drivers/gettingstarted/what-is-a-driver-" target="_blank" rel="noreferrer">Microsoft Learn ↗</a> · <a href="https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/driver-stacks" target="_blank" rel="noreferrer">Driver stacks ↗</a></footer>
 </aside></div></article>
}

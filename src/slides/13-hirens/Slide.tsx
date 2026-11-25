import {useState} from 'react';
import {groups,native,officialCount,type Tool} from './inventory';
import './slide.css';

const shortcuts=[['Este equipo','▣','computer'],['Programas HBCD','▰','folders'],['Red','◎','network'],['Consola','>_','terminal'],['Windows PE','⊞','native']] as const;
type View='desktop'|'folders'|'computer'|'network'|'terminal'|'native'|'search';
const iconFor=(i:number)=>groups[i]?.[2]??'⚙';
export default function Slide(){
 const [view,setView]=useState<View>('folders'),[folder,setFolder]=useState<number|null>(null),[selected,setSelected]=useState<Tool|null>(null),[menu,setMenu]=useState(false),[query,setQuery]=useState(''),[back,setBack]=useState<View>('folders');
 const all=groups.flatMap((g,i)=>g[3].map(t=>({t,i})));
 const found=all.filter(({t,i})=>[...t,groups[i][0],groups[i][1]].join(' ').toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
 function navigate(v:View){setBack(view);setView(v);setFolder(null);setSelected(null);setMenu(false)}
 function openGroup(i:number){navigate('folders');setFolder(i)}
 function choose(t:Tool){setSelected(t);setMenu(false)}
 const title=view==='folders'?(folder===null?'HBCD Programs':groups[folder][0]):view==='computer'?'Este equipo':view==='network'?'Red':view==='terminal'?'Consola y mantenimiento':view==='native'?'Windows PE · funciones':view==='search'?'Resultados de búsqueda':'Escritorio';
 const tile=(t:Tool,i:number,key:string)=> <button key={key} className={'h13-file'+(selected?.[0]===t[0]?' selected':'')} onClick={()=>choose(t)}><span className="h13-tool-icon">{iconFor(i)}</span><span><b>{t[0]}</b><small>{t[1]||'Utilidad'}</small></span></button>;
 return <article className="slide h13">
 <header><div><h1>Hiren’s BootCD PE</h1><p>Un entorno Windows independiente para intervenir equipos.</p></div><a href="https://www.hirensbootcd.org/download/" target="_blank" rel="noreferrer">v1.0.8 · x64 · inventario oficial ↗</a></header>
 <div className="h13-vm">
 <div className="h13-vm-title"><span>▣ HBCD PE x64 · Windows 11 PE</span><button onClick={()=>navigate('desktop')} title="Mostrar escritorio">—</button><button onClick={()=>navigate('folders')} title="Explorador">□</button></div>
 <div className="h13-desktop">
 <div className="h13-wall"><svg viewBox="0 0 600 470" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="h13-wall" x1="0" x2="1" y2="1"><stop stopColor="#102c52"/><stop offset="1" stopColor="#071322"/></linearGradient><linearGradient id="h13-ribbon"><stop stopColor="#236bd9"/><stop offset=".52" stopColor="#62b7ff"/><stop offset="1" stopColor="#113f95"/></linearGradient></defs><rect width="600" height="470" fill="url(#h13-wall)"/>{[0,1,2,3,4,5].map(i=><path key={i} d={'M 180 '+(130+i*30)+' C 450 -90 670 140 395 300 S 170 460 540 470'} fill="none" stroke="url(#h13-ribbon)" strokeWidth={44-i*3} opacity={.65-i*.05}/>)}</svg></div>
 <div className="h13-desktop-icons">{shortcuts.map(([name,icon,v])=><button key={name} onClick={()=>navigate(v)}><span>{icon}</span><small>{name}</small></button>)}</div>
 {view!=='desktop'&&<section className="h13-explorer">
 <div className="h13-window-bar"><b>▰ {title}</b><button onClick={()=>navigate('desktop')} aria-label="Minimizar explorador">–</button><button onClick={()=>navigate('desktop')} aria-label="Cerrar explorador">×</button></div>
 <div className="h13-address"><button onClick={()=>{if(folder!==null){setFolder(null);setSelected(null)}else navigate(back==='desktop'?'folders':back)}} aria-label="Volver">←</button><button onClick={()=>navigate('folders')} aria-label="Carpetas">↑</button><span>{view==='folders'?'HBCD Programs'+(folder===null?'':' / '+groups[folder][1]):title}</span><input placeholder="Buscar herramienta" value={query} onChange={e=>{setQuery(e.target.value);setSelected(null);setView(e.target.value?'search':'folders');setFolder(null)}}/></div>
 <div className="h13-explorer-body"><nav><button className={view==='computer'?'active':''} onClick={()=>navigate('computer')}>▣ Este equipo</button><button className={view==='native'?'active':''} onClick={()=>navigate('native')}>⊞ Windows PE</button><button className={view==='folders'&&folder===null?'active':''} onClick={()=>navigate('folders')}>▰ HBCD Programs</button>{groups.map((g,i)=><button key={g[0]} className={view==='folders'&&folder===i?'active':''} onClick={()=>openGroup(i)}><span>{g[2]}</span>{g[1]} <small>{g[3].length}</small></button>)}</nav>
 <div className="h13-files">
 {view==='folders'&&folder===null&&<><div className="h13-section-title">Carpetas de programas <span>{officialCount} entradas</span></div><div className="h13-file-grid">{groups.map((g,i)=><button className="h13-file" key={g[0]} onClick={()=>openGroup(i)}><span className="h13-folder-icon"/><span><b>{g[1]}</b><small>{g[3].length} herramientas</small></span></button>)}</div></>}
 {view==='folders'&&folder!==null&&<><div className="h13-section-title">{groups[folder][1]} <span>{groups[folder][3].length} entradas</span></div><div className="h13-file-grid">{groups[folder][3].map(t=>tile(t,folder,t[0]))}</div></>}
 {view==='search'&&<><div className="h13-section-title">Resultados <span>{found.length} herramientas</span></div><div className="h13-file-grid">{found.map(({t,i})=>tile(t,i,t[0]))}</div>{found.length===0&&<p className="h13-empty">Sin coincidencias.</p>}</>}
 {view==='native'&&<><div className="h13-section-title">Funciones del entorno <span>{native.length} accesos</span></div><div className="h13-file-grid">{native.map(t=>tile(t,13,t[0]))}</div></>}
 {view==='computer'&&<><div className="h13-section-title">Dispositivos y unidades · ejemplo</div><div className="h13-drive-grid">{[['X:','Windows PE','Entorno temporal en RAM',34],['C:','Windows','Disco interno de ejemplo',68],['D:','Respaldo','Unidad externa de ejemplo',25],['E:','HBCD PE','Medio de arranque de ejemplo',42]].map(([letter,name,desc,percent])=><button key={letter} onClick={()=>choose([String(letter)+' '+name,'',String(desc),letter==='X:'?'Guardar archivos persistentes en una unidad física adecuada.':'Verificar la letra, el contenido y el destino real antes de copiar o escribir.'])}><span className="h13-drive-icon">▰</span><b>{letter} {name}</b><small>{desc}</small><i><em style={{width:percent+'%'}}/></i></button>)}</div></>}
 {view==='network'&&<><div className="h13-section-title">Conectividad y asistencia</div><div className="h13-file-grid">{groups[14][3].map(t=>tile(t,14,t[0]))}{tile(native[9],14,'share')}</div></>}
 {view==='terminal'&&<><div className="h13-section-title">Comandos y funciones PE</div><div className="h13-file-grid">{native.slice(2,8).map(t=>tile(t,13,t[0]))}</div><pre className="h13-console">X:\Windows\System32&gt; diskpart{'\\n'}DISKPART&gt; list disk{'\\n'}DISKPART&gt; list volume</pre></>}
 </div></div>
 <div className="h13-status">{view==='folders'&&folder!==null?groups[folder][3].length+' elementos':view==='search'?found.length+' resultados':'HBCD PE'}</div>
 </section>}
 {menu&&<div className="h13-start-menu"><b>Hiren’s BootCD PE</b>{shortcuts.map(([name,icon,v])=><button key={name} onClick={()=>navigate(v)}><span>{icon}</span>{name}</button>)}<button onClick={()=>{setMenu(false);setSelected(['Reiniciar / apagar','','Finaliza la sesión de rescate.','Guardar los resultados en una unidad persistente antes de reiniciar.'])}}>⏻ Reiniciar / apagar</button></div>}
 <div className="h13-taskbar"><button onClick={()=>setMenu(v=>!v)} aria-pressed={menu} title="Inicio">⊞</button><button onClick={()=>navigate('folders')} title="Explorador">▰</button><button onClick={()=>navigate('terminal')} title="Consola">&gt;_</button><button onClick={()=>navigate('network')} title="Red">◎</button><span>HBCD PE</span><small>◎ ▰ &nbsp; 19:30</small></div>
 </div>
 </div>
 <aside className="h13-inspector"><div className="h13-inspector-head"><b>{selected?'Propiedades de la herramienta':'Windows PE'}</b>{selected&&<button onClick={()=>setSelected(null)} aria-label="Cerrar ficha">×</button>}</div>{selected?<div className="h13-bubble"><span className="h13-bubble-icon">⚙</span><h2>{selected[0]}</h2>{selected[1]&&<span className="h13-version">{selected[1]}</span>}<h3>¿Qué hace?</h3><p>{selected[2]}</p><h3>Ejemplo práctico</h3><p>{selected[3]}</p></div>:<div className="h13-bubble"><span className="h13-bubble-icon">⊞</span><h2>Windows sin arrancar Windows</h2><p>PE se ejecuta desde un medio independiente. Permite diagnosticar el equipo, acceder a unidades compatibles y trabajar sobre la instalación offline.</p><div className="h13-stats"><b>{officialCount}</b><span>herramientas y suites</span><b>{groups.length}</b><span>categorías oficiales</span></div><button className="h13-native-button" onClick={()=>navigate('native')}>Explorar funciones de Windows PE</button><p className="h13-note">X: suele ser temporal. Los cambios sobre discos físicos pueden ser permanentes.</p></div>}</aside>
 </article>
}

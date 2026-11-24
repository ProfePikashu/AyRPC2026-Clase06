import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { glossary } from '../data/glossary';

type Controller={open:(term?:string)=>void;close:()=>void};
const Context=createContext<Controller|null>(null);
const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const categories=['Todos',...Array.from(new Set(glossary.map(x=>x.category)))];
export function GlossaryProvider({children}:{children:ReactNode}){
 const [visible,setVisible]=useState(false);
 const [selected,setSelected]=useState('Driver');
 const [category,setCategory]=useState('Todos');
 const [query,setQuery]=useState('');
 const [tableMode,setTableMode]=useState(false);
 const search=useRef<HTMLInputElement>(null);
 const open=useCallback((term='Driver')=>{
  const entry=glossary.find(x=>normalize(x.term)===normalize(term));
  setSelected(entry?.term??'Driver');setQuery('');setCategory('Todos');setTableMode(false);setVisible(true);
 },[]);
 const close=useCallback(()=>setVisible(false),[]);
 useEffect(()=>{
  if(!visible)return;
  const fn=(event:KeyboardEvent)=>{if(event.key==='Escape'){event.stopPropagation();close()}};
  const original=document.activeElement;
  document.addEventListener('keydown',fn);
  const frame=window.requestAnimationFrame(()=>search.current?.focus({preventScroll:true}));
  return()=>{window.cancelAnimationFrame(frame);document.removeEventListener('keydown',fn);if(original instanceof HTMLElement)original.focus({preventScroll:true})};
 },[visible,close]);
 const filtered=useMemo(()=>glossary.filter(x=>(category==='Todos'||x.category===category)&&
  (!query||normalize([x.term,x.definition,x.detail,x.example,x.full??''].join(' ')).includes(normalize(query)))),[category,query]);
 const item=glossary.find(x=>x.term===selected)??glossary[0];
 return <Context.Provider value={{open,close}}>
  {children}
  {visible&&createPortal(<div className="glossary-overlay" onPointerDown={e=>{if(e.target===e.currentTarget)close()}}>
   <section className="glossary-window" role="dialog" aria-modal="true" aria-labelledby="glossary-heading">
    <header className="glossary-header">
     <div><span className="glossary-kicker">CONSULTA TÉCNICA</span><h2 id="glossary-heading">Glosario de drivers y herramientas</h2></div>
     <button type="button" className="glossary-close" aria-label="Cerrar glosario" onClick={close}>×</button>
    </header>
    <div className="glossary-categories" role="group" aria-label="Filtrar términos">
     {categories.map(c=><button type="button" key={c} className={category===c?'is-active':''} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}
    </div>
    <div className="glossary-content">
     <aside className="glossary-list">
      <label className="glossary-search-label">Buscar concepto
       <input ref={search} type="search" placeholder="Driver, INF, PnP..." value={query} onChange={e=>setQuery(e.target.value)} />
      </label>
      <div className="glossary-terms" aria-label="Lista de conceptos">
       {filtered.map(t=><button type="button" key={t.term} className={selected===t.term?'is-selected':''}
        onClick={()=>{setSelected(t.term);setTableMode(false)}} aria-current={selected===t.term?'true':undefined}><strong>{t.term}</strong><small>{t.category}</small></button>)}
       {filtered.length===0&&<p className="glossary-empty">Sin coincidencias.</p>}
      </div>
     </aside>
     <article className="glossary-definition">
      <div className="glossary-category">{item.category}</div>
      <h3>{tableMode?'Tabla completa':item.term}</h3>
      <p className="glossary-lead">{tableMode?'Términos ordenados, con categoría y significado.':item.definition}</p>
      <button type="button" className="glossary-table-switch" onClick={()=>setTableMode(!tableMode)}>{tableMode?'Ver concepto seleccionado':'Ver tabla completa ('+filtered.length+')'}</button>
      {tableMode?<div className="glossary-table-scroll"><table className="glossary-table">
       <thead><tr><th>Concepto</th><th>Categoría</th><th>Descripción</th></tr></thead>
       <tbody>{filtered.map(t=><tr key={t.term}><th>{t.term}</th><td>{t.category}</td><td><strong className="glossary-row-lead">{t.definition}</strong><span>{t.detail}</span></td></tr>)}</tbody>
      </table></div>:<>
       {item.full&&<div className="glossary-full-name"><span>NOMBRE COMPLETO / SIGLAS</span><strong>{item.full}</strong></div>}
       <div className="glossary-section"><h4>EXPLICADO EN CRIOLLO</h4><p>{item.detail}</p></div>
       <div className="glossary-section"><h4>EJEMPLO EN LA PC / TALLER</h4><p>{item.example}</p></div>
       {item.warning&&<div className="glossary-caution"><strong>OJO CON ESTO</strong><p>{item.warning}</p></div>}
       {item.source&&<div className="glossary-source"><strong>FUENTE DOCUMENTAL</strong><a href={item.source} target="_blank" rel="noreferrer">{item.sourceLabel??'Consultar documentación oficial'} ↗</a></div>}
      </>}
     </article>
    </div>
    <footer className="glossary-footer">Consultá el glosario con el signo de pregunta o la tecla G. No cambia la diapositiva.</footer>
   </section>
  </div>,document.body)}
 </Context.Provider>;
}
export function useGlossary(){const ctx=useContext(Context);if(!ctx)throw new Error('GlossaryProvider requerido');return ctx}
export function GlossaryTerm({term,children}:{term:string;children?:ReactNode}){
 const {open}=useGlossary();return <button className="glossary-term" type="button" onClick={()=>open(term)}>{children??term} <span aria-hidden="true">ⓘ</span></button>;
}
export function GlossaryRailButton(){const {open}=useGlossary();return <button className="glossary-rail-btn" type="button" title="Glosario técnico (G)" aria-label="Abrir glosario técnico" onClick={()=>open()}><span aria-hidden="true">?</span></button>}

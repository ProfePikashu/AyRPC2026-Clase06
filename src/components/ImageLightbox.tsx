import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export type ImagePreview={src:string;title:string;alt:string};

export function ImageLightbox({item,onClose}:{item:ImagePreview;onClose:()=>void}){
 const closeRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
  const oldOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  closeRef.current?.focus({preventScroll:true});
  // Igual que Clase 04: cerrar el lightbox con Escape antes que otros diálogos.
  const onEscape=(event:KeyboardEvent)=>{
   if(event.key!=='Escape')return;
   event.preventDefault();
   event.stopImmediatePropagation();
   onClose();
  };
  document.addEventListener('keydown',onEscape,true);
  return ()=>{
   document.removeEventListener('keydown',onEscape,true);
   document.body.style.overflow=oldOverflow;
   previous?.focus({preventScroll:true});
  };
 },[onClose]);
 return createPortal(
  <div className="image-lightbox-backdrop" role="presentation"
   onPointerDown={event=>{if(event.target===event.currentTarget)onClose()}}>
   <section className="image-lightbox-window" role="dialog" aria-modal="true" aria-label={'Vista ampliada: '+item.title}>
    <button ref={closeRef} className="image-lightbox-close" type="button"
     aria-label="Cerrar imagen ampliada" title="Cerrar (Esc)" onClick={onClose}>×</button>
    <img src={item.src} alt={item.alt} decoding="async"/>
    <div className="image-lightbox-caption">{item.title}</div>
   </section>
  </div>,document.body
 );
}

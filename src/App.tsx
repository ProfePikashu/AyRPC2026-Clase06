import {useCallback,useEffect,useLayoutEffect,useRef,useState} from 'react';
import type {ComponentType,MouseEvent as ReactMouseEvent,KeyboardEvent as ReactKeyboardEvent,TouchEvent as ReactTouchEvent} from 'react';
import {clampZoom,frameAtZoom,panForAnchor,type Pan,type Point,type StageFit} from './lib/slideViewportZoom';
import { GlossaryRailButton, useGlossary } from './components/Glossary';
import { ImageLightbox } from './components/ImageLightbox';
import { OpeningVideo } from './components/OpeningVideo';
import type { ImagePreview } from './components/ImageLightbox';
import { topics } from './data/workshop';
import Slide01 from './slides/01-portada/Slide';
import DriverSlide from './slides/03-drivers/Slide';
import DeviceSlide from './slides/04-dispositivos/Slide';
import InstallSlide from './slides/05-instalacion/Slide';
import {TopicSlide} from './slides/TopicSlide';
const labels=topics.map(topic=>topic.short);
const slides=[Slide01,...topics.slice(1).map((_,i)=>({go}:{go:(value:number)=>void})=>i===1?<DriverSlide/>:i===2?<DeviceSlide/>:i===3?<InstallSlide/>:<TopicSlide index={i+1} go={go}/>)]
type ZoomGesture=
 |{kind:'pinch';distance:number;zoom:number;pan:Pan;point:Point}
 |{kind:'drag';point:Point;pan:Pan};
const distance=(a:{clientX:number;clientY:number},b:{clientX:number;clientY:number})=>Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);
const firstIndex=()=>{const match=window.location.hash.match(/^#slide-(\d+)$/);return match?Math.min(slides.length-1,Math.max(0,Number(match[1])-1)):0};

export default function App(){
 const glossary=useGlossary();
 const [index,setIndex]=useState(firstIndex);
 const [showOpening,setShowOpening]=useState(()=>import.meta.env.MODE!=='mobile'&&!/^#slide-\d+$/.test(window.location.hash));
 const [portrait,setPortrait]=useState(() => window.innerWidth <= 780 && window.innerHeight > window.innerWidth);
 const canvas=useRef<HTMLDivElement>(null);
 const stage=useRef<HTMLElement>(null);
 const touch=useRef<{x:number;y:number}|null>(null);
 const gesture=useRef<ZoomGesture|null>(null);
 const fitRef=useRef<StageFit|null>(null);
 const zoomRef=useRef(1);
 const panRef=useRef<Pan>({x:0,y:0});
 const [zoom,setZoom]=useState(1);
 const [fullscreen,setFullscreen]=useState(false);
 const [preview,setPreview]=useState<ImagePreview|null>(null);
 const closePreview=useCallback(()=>setPreview(null),[]);
 const [,setFullscreenNotice]=useState(false);
 const redrawZoom=useCallback((value:number,wantedPan:Pan)=>{
  const factor=clampZoom(value);
  const fit=fitRef.current;
  zoomRef.current=factor;
  if(fit&&canvas.current){
   const scene=frameAtZoom(fit,factor,wantedPan);
   panRef.current=scene.pan;
   canvas.current.style.transform=`translate3d(${scene.x}px,${scene.y}px,0) scale(${scene.scale})`;
   stage.current?.setAttribute('data-pan-x',scene.pan.x.toFixed(1));
   stage.current?.setAttribute('data-pan-y',scene.pan.y.toFixed(1));
  }else panRef.current=wantedPan;
  setZoom(current=>Math.abs(current-factor)<0.001?current:factor);
 },[]);
 const resetZoom=useCallback(()=>{redrawZoom(1,{x:0,y:0});gesture.current=null;touch.current=null},[redrawZoom]);
 useEffect(()=>{
  const onResize=()=>setPortrait(window.innerWidth<=780&&window.innerHeight>window.innerWidth);
  window.addEventListener('resize',onResize);
  return()=>window.removeEventListener('resize',onResize);
 },[]);
 useEffect(()=>{resetZoom()},[portrait,resetZoom]);
 useEffect(()=>{
  const update=()=>{
   const doc=document as Document & {webkitFullscreenElement?:Element};
   setFullscreen(Boolean(doc.fullscreenElement||doc.webkitFullscreenElement));
  };
  update();
  document.addEventListener('fullscreenchange',update);
  document.addEventListener('webkitfullscreenchange',update);
  return()=>{document.removeEventListener('fullscreenchange',update);document.removeEventListener('webkitfullscreenchange',update)};
 },[]);
 useLayoutEffect(() => {
  const parent = stage.current;
  const frame = canvas.current;
  if (!parent || !frame) return;
  let raf = 0;
  let previous = '';
  const fit = () => {
   const width = parent.clientWidth;
   const height = parent.clientHeight;
   const mobilePortrait = window.innerWidth <= 780 && window.innerHeight > window.innerWidth;
   setPortrait(mobilePortrait);
   if (mobilePortrait || width < 1 || height < 1) return;
   // Mantener una slide completa, sin scroll, y reservar sitio para el rail.
   // El rail no pertenece al lienzo escalado: su espacio debe descontarse.
   const leftInset = width < 900 ? 56 : 80;
   const rightInset = width < 900 ? 10 : 18;
   const marginY = height < 520 ? 5 : 13;
   const usableWidth = Math.max(1, width - leftInset - rightInset);
   const designedWidth = width >= 1580 ? Math.min(1640, usableWidth) : 1420;
   frame.style.width = `${designedWidth}px`;
   frame.style.minHeight = '810px';
   const designedHeight = Math.max(810, frame.scrollHeight);
   const scale = Math.min(1, usableWidth / designedWidth, (height - marginY * 2) / designedHeight);
   const x = leftInset + Math.max(0, (usableWidth - designedWidth * scale) / 2);
   const y = Math.max(0, (height - designedHeight * scale) / 2);
   const key = `${designedWidth}|${designedHeight}|${scale.toFixed(5)}|${x.toFixed(1)}|${y.toFixed(1)}`;
   if (key === previous) return;
   previous = key;
   fitRef.current={x,y,scale,designedWidth,designedHeight,stageWidth:width,stageHeight:height,leftInset,rightInset};
   redrawZoom(zoomRef.current,panRef.current);
   frame.style.visibility = 'visible';
   parent.dataset.fitScale = scale.toFixed(3);
   parent.dataset.contentHeight = String(designedHeight);
  };
  const schedule = () => {cancelAnimationFrame(raf);raf = requestAnimationFrame(fit)};
  const observer = new ResizeObserver(schedule);
  observer.observe(parent);
  observer.observe(frame);
  window.addEventListener('resize', schedule);
  schedule();
  return () => {cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener('resize',schedule)};
 },[index,portrait,redrawZoom]);

 // Captura todas las fotografías de las slides, incluso las que se montan
 // al cambiar pestañas. Las piezas decorativas del logo usan alt vacío.
 const showImage=useCallback((target:EventTarget|null):boolean=>{
  if(!(target instanceof HTMLElement))return false;
  if(target.closest('[data-lightbox-ignore]'))return false;
  if(target instanceof HTMLImageElement){
   const alt=target.alt.trim();
   if(!alt||!target.complete||target.naturalWidth===0)return false;
   const src=target.currentSrc||target.src;
   if(!src)return false;
   setPreview({src,title:alt,alt});
   return true;
  }
  const background=target.closest<HTMLElement>('[data-lightbox-src]');
  const src=background?.dataset.lightboxSrc;
  if(!src)return false;
  const title=background?.dataset.lightboxTitle||background?.getAttribute('aria-label')||'Imagen de la presentación';
  setPreview({src,title,alt:title});
  return true;
 },[]);
 const onImageClickCapture=(event:ReactMouseEvent<HTMLElement>)=>{
  // Alt + clic conserva la selección del punto de chip en el atlas.
  if(event.altKey)return;
  if(showImage(event.target)){
   event.preventDefault();
   event.stopPropagation();
  }
 };
 const onImageKeyDownCapture=(event:ReactKeyboardEvent<HTMLElement>)=>{
  if(event.key!=='Enter'&&event.key!==' ')return;
  const target=event.target;
  if(target instanceof HTMLImageElement||(target instanceof HTMLElement&&target.hasAttribute('data-lightbox-src'))){
   if(showImage(target)){event.preventDefault();event.stopPropagation()}
  }
 };
 useEffect(()=>{setPreview(null)},[index]);
 useEffect(()=>{
  const root=stage.current;
  if(!root)return;
  const makeAccessible=()=>{
   root.querySelectorAll<HTMLImageElement>('.slide-wrap img').forEach(img=>{
    if(!img.alt.trim()||img.closest('[data-lightbox-ignore]'))return;
    img.tabIndex=0;
    img.setAttribute('role','button');
    if(!img.title)img.title='Clic para ampliar · Enter o Espacio';
   });
  };
  makeAccessible();
  const observer=new MutationObserver(makeAccessible);
  observer.observe(root,{childList:true,subtree:true});
  return()=>observer.disconnect();
 },[index,portrait]);
 const go=useCallback((value:number)=>{
  const next=Math.min(slides.length-1,Math.max(0,value));
  resetZoom();
  setIndex(next);
  window.history.replaceState(null,'','#slide-'+(next+1));
  stage.current?.scrollTo({top:0,behavior:'instant'});
 },[resetZoom]);
 const localPoint=(x:number,y:number):Point=>{
  const rect=stage.current?.getBoundingClientRect();
  return {x:x-(rect?.left||0),y:y-(rect?.top||0)};
 };
 const onStageTouchStart=(event:ReactTouchEvent<HTMLElement>)=>{
  if(event.touches.length>=2){
   const a=event.touches[0],b=event.touches[1];
   gesture.current={kind:'pinch',distance:Math.max(1,distance(a,b)),zoom:zoomRef.current,pan:{...panRef.current},point:localPoint((a.clientX+b.clientX)/2,(a.clientY+b.clientY)/2)};
   touch.current=null;
  }else if(event.touches.length===1){
   const a=event.touches[0];
   if(zoomRef.current>1.001){
    gesture.current={kind:'drag',point:localPoint(a.clientX,a.clientY),pan:{...panRef.current}};
    touch.current=null;
   }else{
    gesture.current=null;
    touch.current={x:a.clientX,y:a.clientY};
   }
  }
 };
 const onStageTouchMove=(event:ReactTouchEvent<HTMLElement>)=>{
  const fit=fitRef.current;
  if(!fit)return;
  if(event.touches.length>=2){
   const a=event.touches[0],b=event.touches[1];
   if(gesture.current?.kind!=='pinch'){
    gesture.current={kind:'pinch',distance:Math.max(1,distance(a,b)),zoom:zoomRef.current,pan:{...panRef.current},point:localPoint((a.clientX+b.clientX)/2,(a.clientY+b.clientY)/2)};
    touch.current=null;
   }
   const start=gesture.current;
   const center=localPoint((a.clientX+b.clientX)/2,(a.clientY+b.clientY)/2);
   const next=clampZoom(start.zoom*distance(a,b)/start.distance);
   redrawZoom(next,panForAnchor(fit,start.zoom,start.pan,next,start.point,center));
  }else if(event.touches.length===1&&gesture.current?.kind==='drag'){
   const current=localPoint(event.touches[0].clientX,event.touches[0].clientY);
   redrawZoom(zoomRef.current,{x:gesture.current.pan.x+current.x-gesture.current.point.x,y:gesture.current.pan.y+current.y-gesture.current.point.y});
  }
 };
 const onStageTouchEnd=(event:ReactTouchEvent<HTMLElement>)=>{
  if(gesture.current){
   if(gesture.current.kind==='pinch'&&event.touches.length===1){
    const t=event.touches[0];
    gesture.current={kind:'drag',point:localPoint(t.clientX,t.clientY),pan:{...panRef.current}};
   }else if(event.touches.length===0)gesture.current=null;
   touch.current=null;
   return;
  }
  if(event.touches.length!==0||zoomRef.current>1.001||!touch.current)return;
  const end=event.changedTouches[0];
  const dx=end.clientX-touch.current.x;
  const dy=end.clientY-touch.current.y;
  touch.current=null;
  if(Math.abs(dx)>115&&Math.abs(dx)>Math.abs(dy)*1.6)go(index+(dx<0?1:-1));
 };
 useEffect(()=>{
  const key=(event:KeyboardEvent)=>{
   if(event.altKey||event.ctrlKey||event.metaKey)return;
   const el=event.target as HTMLElement;
   if(['INPUT','TEXTAREA','SELECT'].includes(el?.tagName)||el?.isContentEditable||document.querySelector('[role="dialog"]'))return;
   if(['ArrowRight','PageDown'].includes(event.key)){event.preventDefault();go(index+1)}
   if(['ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();go(index-1)}
   if(event.key.toLowerCase()==='g'){event.preventDefault();glossary.open();return}
   if(event.key==='Home'){event.preventDefault();go(0)}
   if(event.key==='End'){event.preventDefault();go(slides.length-1)}
   if(event.key.toLowerCase()==='f'){event.preventDefault();void toggleFullscreen()}
  };
  const hash=()=>{const match=window.location.hash.match(/^#slide-(\d+)$/);if(match)go(Number(match[1])-1)};
  window.addEventListener('keydown',key);window.addEventListener('hashchange',hash);
  return()=>{window.removeEventListener('keydown',key);window.removeEventListener('hashchange',hash)};
 },[go,index,glossary]);
 const toggleFullscreen=async()=>{
  const doc=document as Document & {webkitFullscreenElement?:Element;webkitExitFullscreen?:()=>Promise<void>|void};
  const root=document.documentElement as HTMLElement & {webkitRequestFullscreen?:()=>Promise<void>|void};
  try{
   if(doc.fullscreenElement||doc.webkitFullscreenElement){
    if(doc.exitFullscreen)await doc.exitFullscreen();
    else if(doc.webkitExitFullscreen)await doc.webkitExitFullscreen();
   }else if(root.requestFullscreen)await root.requestFullscreen();
   else if(root.webkitRequestFullscreen)await root.webkitRequestFullscreen();
   else setFullscreenNotice(true);
  }catch{setFullscreenNotice(true)}
 };
 const Component=slides[index] as ComponentType<{go:(value:number)=>void}>;
 const navItems=labels.map((label,i)=><button key={label} type="button" className={i===index?'active':''} onClick={()=>go(i)} aria-current={i===index?'step':undefined} aria-label={`Ir a diapositiva ${i+1}: ${label}`}><span>{String(i+1).padStart(2,'0')}</span></button>);
 return <div className={"presentation "+(portrait?"is-portrait":"is-landscape")}>
  {showOpening&&<OpeningVideo onFinished={()=>setShowOpening(false)}/>}
  <div className="ambient" aria-hidden="true"/>
  <div className="presentation-main">
   <nav className="scene-rail" aria-label="Navegación entre diapositivas"><div className="scene-rail-line" aria-hidden="true"/>{navItems}<GlossaryRailButton/></nav>
   <button className="fullscreen-btn" type="button" onClick={()=>void toggleFullscreen()} aria-label={fullscreen?'Salir de pantalla completa':'Pantalla completa'} title={fullscreen?'Salir de pantalla completa':'Pantalla completa'}>
    <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     {fullscreen?<path d="M8 3v5H3m13-5v5h5M8 21v-5H3m13 5v-5h5"/>:<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>}
    </svg>
   </button>
   <main className="stage" ref={stage} data-slide={String(index+1)} data-zoom={zoom.toFixed(2)} onClickCapture={onImageClickCapture} onKeyDownCapture={onImageKeyDownCapture} onTouchStart={onStageTouchStart} onTouchMove={onStageTouchMove} onTouchEnd={onStageTouchEnd} onTouchCancel={()=>{gesture.current=null;touch.current=null}}>
    {portrait ? <div className="portrait-guard" role="status"><div className="portrait-guard-phone" aria-hidden="true">⌗</div><h2>Girá el celular</h2><p>La presentación se ve en horizontal.</p></div> : <div className="slide-wrap" key={index} ref={canvas}><Component go={go}/></div>}
   </main>
  </div>
  {preview&&<ImageLightbox item={preview} onClose={closePreview}/>}
 </div>;
}

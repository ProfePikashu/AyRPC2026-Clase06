import {useRef,useState} from 'react';
import {portableMediaUrl} from '../lib/portableMediaUrl';
import './OpeningVideo.css';

export function OpeningVideo({onFinished}:{onFinished:()=>void}){
 const ref=useRef<HTMLVideoElement>(null);
 const [started,setStarted]=useState(false);
 const play=async()=>{
  const video=ref.current;
  if(!video)return;
  video.muted=false;
  try{await video.play();setStarted(true)}
  catch{setStarted(false)}
 };
 return <section className="opening-video" role="dialog" aria-modal="true" aria-label="Video de apertura AyRPC 2026">
  <video ref={ref} data-testid="opening-video" className="opening-video-media"
   src={portableMediaUrl(import.meta.env.BASE_URL+'media/ayrpc2026-intro.mp4')}
   playsInline preload="auto" onEnded={onFinished} onError={onFinished}/>
  {!started&&<button className="opening-video-start" type="button" onClick={()=>void play()}>
   INICIAR PRESENTACIÓN
  </button>}
 </section>;
}

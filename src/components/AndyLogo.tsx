import {portableMediaUrl} from '../lib/portableMediaUrl';
const asset=(name:string)=>portableMediaUrl(import.meta.env.BASE_URL+'branding/logo/parts/'+name);
/** Las cinco piezas originales y los dos canales de glitch de la portada Clase 01.
 * Mantener el mismo orden y geometría; no sustituir por texto ni por una silueta. */
export function AndyLogo(){
 return <div className="andy-logo-stage" aria-label="Logo de AndyAzhTEC">
  <div className="andy-logo-group base">
   <img className="andy-piece outer outer-left" src={asset('outer-frame.png')} alt=""/>
   <img className="andy-piece outer outer-right" src={asset('outer-frame.png')} alt=""/>
   <img className="andy-piece inner inner-left" src={asset('inner-a.png')} alt=""/>
   <img className="andy-piece inner inner-right" src={asset('inner-a.png')} alt=""/>
   <img className="andy-piece chevron" src={asset('bottom-chevron.png')} alt=""/>
  </div>
  <div className="andy-glitch cyan" aria-hidden="true">
   <img className="andy-piece outer" src={asset('outer-frame.png')} alt=""/>
   <img className="andy-piece inner" src={asset('inner-a.png')} alt=""/>
   <img className="andy-piece chevron" src={asset('bottom-chevron.png')} alt=""/>
  </div>
  <div className="andy-glitch magenta" aria-hidden="true">
   <img className="andy-piece outer" src={asset('outer-frame.png')} alt=""/>
   <img className="andy-piece inner" src={asset('inner-a.png')} alt=""/>
   <img className="andy-piece chevron" src={asset('bottom-chevron.png')} alt=""/>
  </div>
 </div>;
}

import { AndyLogo } from '../../components/AndyLogo';
export default function Slide(){
 return <article className="slide intro05-scene">
  <div className="intro05-grid" aria-hidden="true"/>
  <div className="intro05-glow cyan" aria-hidden="true"/>
  <div className="intro05-glow violet" aria-hidden="true"/>
  <div className="intro05-shell">
   <div className="intro05-side-mark"><AndyLogo/></div>
   <div className="intro05-main">
    <div className="intro05-kicker">CLASE 06 · DRIVERS Y HERRAMIENTAS</div>
    <h1 className="intro05-brand"><span>AyRPC</span><strong>2026</strong></h1>
    <div className="intro05-rule" aria-hidden="true"/>
    <h2>Drivers <span>y Herramientas</span></h2>
    <div className="intro05-meta"><span>CONTROLADORES</span><i>·</i><span>DIAGNÓSTICO</span><i>·</i><span>MANTENIMIENTO</span><i>·</i><span>TALLER</span></div>
   </div>
  </div>
 </article>;
}

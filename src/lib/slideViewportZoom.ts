// Geometría del zoom táctil sobre una slide que ya se ajusta al viewport.
// No altera la composición interna: amplía el lienzo y permite recorrerlo.
export type Pan={x:number;y:number};
export type Point={x:number;y:number};
export type StageFit={
 x:number;y:number;scale:number;
 designedWidth:number;designedHeight:number;
 stageWidth:number;stageHeight:number;leftInset:number;rightInset:number;
};
export const MIN_ZOOM=1;
export const MAX_ZOOM=4;
const clamp=(value:number,min:number,max:number)=>Math.max(min,Math.min(max,value));
export function clampZoom(value:number){return Number.isFinite(value)?clamp(value,MIN_ZOOM,MAX_ZOOM):1}
export function frameAtZoom(fit:StageFit,wanted:number,pan:Pan){
 const zoom=clampZoom(wanted);
 const originalWidth=fit.designedWidth*fit.scale;
 const originalHeight=fit.designedHeight*fit.scale;
 const width=originalWidth*zoom;
 const height=originalHeight*zoom;
 const baseX=fit.x-(width-originalWidth)/2;
 const baseY=fit.y-(height-originalHeight)/2;
 const usableLeft=fit.leftInset;
 const usableRight=fit.stageWidth-fit.rightInset;
 const minX=usableRight-baseX-width;
 const maxX=usableLeft-baseX;
 const minY=fit.stageHeight-baseY-height;
 const maxY=-baseY;
 const boundedPan:Pan={
  x:zoom<=1||width<=usableRight-usableLeft?0:clamp(pan.x,minX,maxX),
  y:zoom<=1||height<=fit.stageHeight?0:clamp(pan.y,minY,maxY)
 };
 return {zoom,pan:boundedPan,x:baseX+boundedPan.x,y:baseY+boundedPan.y,scale:fit.scale*zoom};
}
// Mantiene bajo los dedos el mismo punto de la slide al pellizcar.
// También acepta un destino diferente si los dos dedos se mueven juntos.
export function panForAnchor(fit:StageFit,fromZoom:number,fromPan:Pan,toZoom:number,fromPoint:Point,toPoint:Point):Pan{
 const initial=frameAtZoom(fit,fromZoom,fromPan);
 const target=frameAtZoom(fit,toZoom,{x:0,y:0});
 const x=(fromPoint.x-initial.x)/initial.scale;
 const y=(fromPoint.y-initial.y)/initial.scale;
 return {x:toPoint.x-x*target.scale-target.x,y:toPoint.y-y*target.scale-target.y};
}

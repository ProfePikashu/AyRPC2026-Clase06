/** In a standalone HTML the packer injects a lazy Blob URL resolver. */
declare global {
 interface Window { __AYRPC_ASSET_URL__?:(url:string)=>string }
}
export function portableMediaUrl(url:string):string{
 if(typeof window==='undefined')return url;
 return window.__AYRPC_ASSET_URL__?.(url)??url;
}

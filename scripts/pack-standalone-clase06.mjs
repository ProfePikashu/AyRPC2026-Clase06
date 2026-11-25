import fs from 'node:fs';
import path from 'node:path';

const MIME={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.avif':'image/avif','.gif':'image/gif','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.mp4':'video/mp4','.webm':'video/webm','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav','.ico':'image/x-icon'};
const slash=s=>s.split(path.sep).join('/');
const regexQuote=s=>s.split('').map(c=>'^$.*+?()[]{}|\\'.includes(c)?'\\'+c:c).join('');
function walk(dir){
 if(!fs.existsSync(dir))return [];
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>{
  const f=path.join(dir,d.name);
  return d.isDirectory()?walk(f):d.isFile()?[f]:[];
 });
}
function attribute(tag,name){return tag.match(new RegExp('\\b'+name+'=["\\x27]([^"\\x27]+)["\\x27]'))?.[1];}
export function packStandalone({dist,output,profile}){
 if(!['desktop','mobile'].includes(profile))throw Error('Invalid profile');
 const index=path.join(dist,'index.html');
 if(!fs.existsSync(index))throw Error('Missing '+index);
 if(fs.existsSync(output))throw Error('File exists, refusing to overwrite: '+output);
 let html=fs.readFileSync(index,'utf8');
 const scriptTags=[...html.matchAll(/<script\b[^>]*\bsrc=["'][^"']+\.js["'][^>]*><\/script>/gi)];
 const cssTags=[...html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi)];
 if(scriptTags.length!==1||cssTags.length!==1)throw Error('Expected one Vite JS and CSS: got '+scriptTags.length+'/'+cssTags.length);
 const resolve=uri=>path.join(dist,decodeURIComponent(uri.replace(/^(\.\/|\/)+/,'')));
 const jsFile=resolve(attribute(scriptTags[0][0],'src'));
 const cssFile=resolve(attribute(cssTags[0][0],'href'));
 let js=fs.readFileSync(jsFile,'utf8');
 let css=fs.readFileSync(cssFile,'utf8');
 const extraJs=walk(dist).filter(f=>f.endsWith('.js')&&path.resolve(f)!==path.resolve(jsFile));
 if(extraJs.length)throw Error('Unbundled JS chunks: '+extraJs.join(', '));
 let assets=walk(dist).filter(f=>MIME[path.extname(f).toLowerCase()]).map(file=>({file,rel:slash(path.relative(dist,file)),mime:MIME[path.extname(file).toLowerCase()]}));
 if(profile==='mobile')assets=assets.filter(a=>a.rel!=='media/ayrpc2026-intro.mp4');
 const aliases=Object.create(null);
 const counts=new Map();for(const a of assets){const n=path.basename(a.rel);counts.set(n,(counts.get(n)||0)+1)}
 for(const [i,a] of assets.entries()){
  a.id='ayrpc06-asset-'+i;
  for(const alias of [a.rel,'./'+a.rel,'/'+a.rel,path.basename(a.rel)]){
   if(alias!==path.basename(a.rel)||counts.get(alias)===1)aliases[alias]=[a.id,a.mime];
   // Los nombres de archivo solos pueden ser argumentos de un constructor de rutas.
   // Reemplazarlos aqui genera "carpeta/blob:null/..." y rompe file://.
   // Las rutas completas y dinamicas las resuelve portableMediaUrl al final.
   if(alias!==path.basename(a.rel)){
    for(const quote of ['"',"'"]){
     js=js.replaceAll(quote+alias+quote,'window.__AYRPC_ASSET_URL__('+JSON.stringify(alias)+')');
    }
   }
   const urlPattern=new RegExp('url\\(\\s*(["\\x27]?)'+regexQuote(alias)+'\\1\\s*\\)','g');
   if(urlPattern.test(css)){
    const uri='data:'+a.mime+';base64,'+fs.readFileSync(a.file).toString('base64');
    css=css.replace(urlPattern,'url("'+uri+'")');
   }
  }
 }
 html=html.replace(scriptTags[0][0],'<!--AYRPC06_SCRIPT-->');
 html=html.replace(cssTags[0][0],'<style>'+css.replace(/<\/style/gi,'<\\/style')+'</style>');
 const pieces=html.split('<!--AYRPC06_SCRIPT-->');
 if(pieces.length!==2)throw Error('Missing JS insertion marker');
 fs.mkdirSync(path.dirname(output),{recursive:true});
 const fd=fs.openSync(output,'wx');
 const out=s=>fs.writeSync(fd,s);
 const base64File=file=>{
  const f=fs.openSync(file,'r');const buf=Buffer.allocUnsafe(192*1024);
  try{for(;;){const n=fs.readSync(f,buf,0,buf.length,null);if(!n)break;out(buf.subarray(0,n).toString('base64'));}}
  finally{fs.closeSync(f);}
 };
 try{
  out(pieces[0]);
  for(const a of assets){
   out('<script type="application/octet-stream" id="'+a.id+'">');base64File(a.file);out('</script>\n');
  }
  out('<script>\n(function(){const refs='+JSON.stringify(aliases)+';const cache=Object.create(null);');
  out('window.__AYRPC_ASSET_URL__=function(url){if(typeof url!=="string"||url.startsWith("blob:")||url.startsWith("data:"))return url;');
  out('let item=refs[url];if(!item){let clean=url.split(/[?#]/)[0].replace(/\\\\/g,"/");try{clean=decodeURIComponent(clean)}catch(e){}const base=clean.slice(clean.lastIndexOf("/")+1);item=refs[clean]||refs[clean.replace(/^(\\.\\/|\\/)+/,"")]||refs[base];}');
  out('if(!item)return url;const id=item[0];if(cache[id])return cache[id];');
  out('const el=document.getElementById(id);if(!el)return url;const text=el.textContent||"";const chunks=[];');
  out('for(let i=0;i<text.length;i+=131072){const raw=atob(text.slice(i,i+131072));const bytes=new Uint8Array(raw.length);for(let j=0;j<raw.length;j++)bytes[j]=raw.charCodeAt(j);chunks.push(bytes);}');
  out('const result=URL.createObjectURL(new Blob(chunks,{type:item[1]}));cache[id]=result;el.textContent="";return result;};})();\n</script>\n');
  out('<script type="module">\n'+js.replace(/<\/script/gi,'<\\/script')+'\n</script>');
  out(pieces[1]);
 }finally{fs.closeSync(fd);}
 return {output,profile,size:fs.statSync(output).size,assetCount:assets.length,openingCount:assets.filter(a=>a.rel==='media/ayrpc2026-intro.mp4').length,videoCount:assets.filter(a=>a.mime.startsWith('video/')).length};
}

// Clase 06: compilar, empaquetar, probar file:// y publicar DOS HTML individuales.
// Conserva todos los release-single/ y release-work/ anteriores.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {packStandalone} from './pack-standalone-clase06.mjs';
import {smokeStandalone} from './smoke-standalone-clase06.mjs';

const root=process.cwd();
const at=(...p)=>path.join(root,...p);
const names={desktop:'AyRPC2026-Clase06-PC.html',mobile:'AyRPC2026-Clase06-Mobile.html'};
function runNode(args){
 const p=spawnSync(process.execPath,args,{cwd:root,stdio:'inherit',env:process.env});
 if(p.error)throw p.error;
 if(p.status!==0)throw Error('Fallo comando Node: '+args.join(' ')+' (exit '+p.status+')');
}
function checkMedia(){
 const required=[
  ['Opening original','public/media/ayrpc2026-intro.mp4'],
  ['Logo original: marco','public/branding/logo/parts/outer-frame.png'],
  ['Logo original: A','public/branding/logo/parts/inner-a.png'],
  ['Logo original: chevron','public/branding/logo/parts/bottom-chevron.png']
 ];
 const missing=required.filter(([,file])=>!fs.existsSync(at(...file.split('/'))));
 if(missing.length)throw Error('Faltan recursos obligatorios:\n'+missing.map(([label,file])=>'  '+label+': '+file).join('\n'));
 const requiredFolders={'04':1,'05':1,'06':1,'09':1,'10':17,'11':23,'12':26};
 for(const [n,min] of Object.entries(requiredFolders)){const dir=at('public','clase6','slide'+n);const files=fs.existsSync(dir)?fs.readdirSync(dir).filter(x=>/\\.(png|jpe?g|gif|webp|svg)$/i.test(x)):[];if(files.length<min)console.warn('AVISO: revisar capturas slide '+n+' ('+files.length+'/'+min+')');}
 if(!fs.existsSync(at('public','clase6','slide12','furmark-demo.mp4')))throw Error('Falta el video FurMark aprobado: public/clase6/slide12/furmark-demo.mp4');
 console.log('Opening y piezas originales del logo: verificados.');
}
async function main(){
 checkMedia();
 const suffix=new Date().toISOString().replace(/[:.]/g,'-');
 const work=at('release-work','Clase06-'+suffix);
 const pub=at('release-single','Clase06-'+suffix);
 if(fs.existsSync(work)||fs.existsSync(pub))throw Error('Ya existe la carpeta del release: '+suffix);
 fs.mkdirSync(work,{recursive:true});
 runNode(['node_modules/typescript/bin/tsc','--noEmit']);
 const outputs=[];
 for(const profile of ['desktop','mobile']){
  const dist=path.join(work,profile+'-dist');
  console.log('\nVite '+profile.toUpperCase());
  runNode(['node_modules/vite/bin/vite.js','build','--mode',profile==='desktop'?'pc':'mobile','--outDir',dist]);
  const output=path.join(work,names[profile]);
  const result=packStandalone({dist,output,profile});
  if(profile==='desktop'&&result.openingCount!==1)throw Error('El HTML PC no contiene el opening.');
  if(profile==='mobile'&&result.openingCount!==0)throw Error('El HTML Mobile contiene el opening inesperadamente.');
  console.log(profile.toUpperCase()+': '+(result.size/1024/1024).toFixed(2)+' MiB; '+result.assetCount+' recursos; '+result.videoCount+' videos');
  outputs.push({profile,output});
 }
 // Publicacion atomica desde la perspectiva del directorio final: SOLO despues de los smoke.
 for(const artifact of outputs){
  console.log('QA file:// '+artifact.profile);
  await smokeStandalone(artifact.output,artifact.profile);
 }
 fs.mkdirSync(pub,{recursive:true});
 for(const artifact of outputs){
  const dest=path.join(pub,names[artifact.profile]);
  fs.copyFileSync(artifact.output,dest,fs.constants.COPYFILE_EXCL);
 }
 console.log('\nRELEASE COMPLETO: '+pub);
 console.log('Dos HTML autocontenidos generados; falta la comprobacion visual del docente en Windows.');
}
main().catch(e=>{console.error('\nERROR DE RELEASE CLASE 06:\n'+(e.stack||e));process.exitCode=1});

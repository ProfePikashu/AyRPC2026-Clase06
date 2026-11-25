import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {packStandalone} from './pack-standalone-clase06.mjs';

test('Clase 06: PC embebe recursos y Mobile excluye MP4; no sobrescribe',()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'ayrpc06-'));
 try{
  const dist=path.join(tmp,'dist');
  fs.mkdirSync(path.join(dist,'assets'),{recursive:true});
  fs.mkdirSync(path.join(dist,'media'),{recursive:true});
  fs.mkdirSync(path.join(dist,'branding','logo','parts'),{recursive:true});
  fs.writeFileSync(path.join(dist,'index.html'),'<html><head><link rel="stylesheet" href="./assets/index.css"></head><body><div id="root"></div><script type="module" crossorigin src="./assets/index.js"></script></body></html>');
  fs.writeFileSync(path.join(dist,'assets','index.js'),'const pic="./branding/logo/parts/a.png";const mp4="/media/ayrpc2026-intro.mp4";const risky="</script>";const standaloneName="a.png";const dynamicPath="./branding/logo/parts/"+standaloneName;document.getElementById("root").dataset.test=pic;');
  fs.writeFileSync(path.join(dist,'assets','index.css'),'body{background-image:url("./branding/logo/parts/a.png")}');
  fs.writeFileSync(path.join(dist,'branding','logo','parts','a.png'),Buffer.from([137,80,78,71]));
  fs.writeFileSync(path.join(dist,'media','ayrpc2026-intro.mp4'),Buffer.from('OPENINGONLY'));
  const pc=path.join(tmp,'PC.html'),mobile=path.join(tmp,'Mobile.html');
  const p=packStandalone({dist,output:pc,profile:'desktop'});
  const m=packStandalone({dist,output:mobile,profile:'mobile'});
  const ps=fs.readFileSync(pc,'utf8'),ms=fs.readFileSync(mobile,'utf8');
  assert.equal(p.videoCount,1);
  assert.equal(m.videoCount,0);
  assert.equal(p.openingCount,1);assert.equal(m.openingCount,0);
  assert.match(ps,/window\.__AYRPC_ASSET_URL__\("\.\/branding\/logo\/parts\/a\.png"\)/);
  assert.match(ps,/data:image\/png;base64,/);
  assert.match(ps,/const standaloneName="a\.png"/);
  assert.match(ps,/const dynamicPath="\.\/branding\/logo\/parts\/"\+standaloneName/);
  assert.doesNotMatch(ps,/standaloneName=window\.__AYRPC_ASSET_URL__/);
  assert.match(ms,/const standaloneName="a\.png"/);
  assert.match(ps,/<\\\/script>/);
  assert.match(ps,/T1BFTklOR09OTFk=/);
  assert.doesNotMatch(ms,/T1BFTklOR09OTFk=/);
  assert.throws(()=>packStandalone({dist,output:pc,profile:'desktop'}),/refusing to overwrite/i);
 }finally{fs.rmSync(tmp,{recursive:true,force:true})}
});

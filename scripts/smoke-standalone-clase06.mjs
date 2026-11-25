// Clase 06 · apertura real de los HTML finales por file:// con Edge/Chrome.
import {existsSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {chromium} from 'playwright-core';

function browserPath(){
 const options=process.platform==='win32'?[
  process.env.CHROME_PATH,
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
 ]:[process.env.CHROME_PATH,'/usr/bin/chromium','/usr/bin/google-chrome','/usr/bin/chromium-browser'];
 return options.find(x=>x&&existsSync(x));
}
export async function smokeStandalone(filename,profile){
 if(!existsSync(filename))throw Error('No existe: '+filename);
 const browserExe=browserPath();
 if(!browserExe)throw Error('Falta Edge/Chrome para probar file://. Usa CHROME_PATH si corresponde.');
 const browser=await chromium.launch({executablePath:browserExe,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const context=await browser.newContext({viewport:profile==='desktop'?{width:1366,height:768}:{width:844,height:390},reducedMotion:'reduce'});
 const errors=[];
 const watch=page=>{
  page.on('pageerror',e=>errors.push('Error JS: '+e.message));
  page.on('requestfailed',r=>{
   const url=r.url();
   if(url.startsWith('file:'))errors.push('Recurso externo o inexistente: '+url+' '+(r.failure()?.errorText||''));
  });
 };
 try{
  const url=pathToFileURL(filename).href;
  await context.route(/^https?:/,route=>route.abort());
  const intro=await context.newPage();
  watch(intro);
  await intro.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
  if(profile==='desktop'){
   await intro.locator('.opening-video').waitFor({state:'visible',timeout:12000});
   const video=intro.locator('video.opening-video-media');
   const src=await video.getAttribute('src');
   if(!src?.startsWith('blob:'))errors.push('El opening no se cargo desde Blob: '+src);
   await intro.getByRole('button',{name:'INICIAR PRESENTACIÓN'}).click();
   await intro.waitForFunction(()=>{
    const v=document.querySelector('video.opening-video-media');
    return v&&!v.paused&&!v.muted&&v.readyState>=2;
   },null,{timeout:12000}).catch(()=>errors.push('El opening no inicio con video y audio.'));
   await intro.evaluate(()=>document.querySelector('video.opening-video-media')?.pause());
  }else{
   if(await intro.locator('.opening-video').count())errors.push('Mobile no debe mostrar opening.');
  }
  await intro.close();
  const page=await context.newPage();
  watch(page);
  await page.goto(url+'#slide-1',{waitUntil:'domcontentloaded',timeout:30000});
  for(let n=1;n<=15;n++){
   if(n>1)await page.evaluate(index=>{location.hash='slide-'+index},n);
   await page.waitForFunction(index=>document.querySelector('.stage')?.getAttribute('data-slide')===String(index),n,{timeout:10000});
   if(await page.locator('.slide').count()!==1)errors.push('Slide '+n+' no montada correctamente.');
   if(n===1){
    const logo=page.locator('img.andy-piece').first();
    await logo.waitFor({state:'attached',timeout:6000});
    const result=await logo.evaluate(async img=>{
     try{await img.decode()}catch{}
     return{src:img.getAttribute('src'),pixels:img.naturalWidth};
    });
    if(!result.src?.startsWith('blob:')||!result.pixels)errors.push('El logo de la portada no esta embebido: '+JSON.stringify(result));
   }
   const selectors={3:'.d3-mascot',12:'.d12-monitor',13:'.h13-vm',14:'.l14-vm',15:'.q15-cast'};
   if(selectors[n]&&!await page.locator(selectors[n]).count())errors.push('Slide '+n+': falta escena principal.');
   if(n===15&&await page.locator('.q15-mascot svg').count()!==4)errors.push('Faltan los cuatro monigotes.');
   if(n===7){
    const picture=page.locator('.d7-device-image');
    if(!await picture.locator('svg, img[src^="blob:"]').count())errors.push('Slide 07: falta imagen embebida o esquema SVG de respaldo.');
   }
   const imgs=await page.locator('img').evaluateAll(async imgs=>Promise.all(imgs.filter(i=>i.getAttribute('src')?.startsWith('blob:')).map(async i=>{try{await i.decode()}catch{}return {src:i.src,width:i.naturalWidth}})));
   for(const img of imgs)if(!img.width)errors.push('Imagen embebida no decodifica en slide '+n+': '+img.src);
   const view=await page.evaluate(()=>({
    totalWidth:document.documentElement.scrollWidth,totalHeight:document.documentElement.scrollHeight,
    width:innerWidth,height:innerHeight
   }));
   if(view.totalWidth>view.width+2||view.totalHeight>view.height+2)errors.push('Overflow slide '+n+': '+JSON.stringify(view));
  }
  await page.close();
  if(errors.length)throw Error('Smoke '+profile+' fallido:\n'+errors.join('\n'));
  console.log('Smoke file:// correcto: '+profile+'; 15 slides, contenido y recursos esenciales.');
 }finally{await context.close();await browser.close();}
}

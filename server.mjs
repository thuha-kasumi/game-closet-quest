import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {Game} from './game.mjs';
const files=new Map([['/','index.html'],['/styles.css','styles.css'],['/app.mjs','app.mjs'],['/catalog.mjs','catalog.mjs'],['/art.mjs','art.mjs'],['/favicon.svg','favicon.svg'],['/content.mjs','content.mjs'],['/closet-ui.mjs','closet-ui.mjs'],['/closet-store.mjs','closet-store.mjs'],...['png','jpg','webp','mp4','webm'].map(ext=>['/showcase.'+ext,'showcase.'+ext])]);
const mime={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',mjs:'text/javascript; charset=utf-8',svg:'image/svg+xml',png:'image/png',jpg:'image/jpeg',webp:'image/webp',mp4:'video/mp4',webm:'video/webm'};
export function createApp({game=new Game()}={}){
 const streams=new Map(),rates=new Map();
 function send(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));}
 function push(){for(const [res,c] of streams){const r=game.rooms.get(c.code),p=r?.players.find(x=>x.id===c.id);if(!r||!p){res.write('event: ended\ndata: {}\n\n');res.end();streams.delete(res);continue;}if(c.revision!==r.revision){res.write(`data: ${JSON.stringify(game.view(r,p))}\n\n`);c.revision=r.revision;}}}
 const server=http.createServer(async(req,res)=>{try{
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Frame-Options','DENY');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; media-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/health'){send(res,200,{ok:true});return;}
  if(req.method==='GET'&&files.has(url.pathname)){const f=files.get(url.pathname);let bytes;try{bytes=await readFile(new URL(f,import.meta.url));}catch(e){if(e.code==='ENOENT'){send(res,404,{error:'File not found'});return;}throw e;}res.writeHead(200,{'Content-Type':mime[f.split('.').pop()],'Cache-Control':'no-cache'});res.end(bytes);return;}
  if(req.method==='GET'&&url.pathname==='/api/events'){
   const r=game.room(url.searchParams.get('code')),p=game.auth(r,url.searchParams.get('token'));for(const [old,c] of streams)if(c.id===p.id){old.end();streams.delete(old);}
   res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache, no-transform','Connection':'keep-alive','X-Accel-Buffering':'no'});res.write('retry: 2000\n\n');streams.set(res,{code:r.code,id:p.id,revision:-1});req.on('close',()=>streams.delete(res));push();return;
  }
  if(req.method!=='POST'||!url.pathname.startsWith('/api/')){send(res,404,{error:'Not found'});return;}
  if(req.headers['sec-fetch-site']==='cross-site'){send(res,403,{error:'Please play from the game website.'});return;}
  if(!String(req.headers['content-type']||'').includes('application/json')){send(res,415,{error:'JSON required'});return;}
  const ip=req.socket.remoteAddress;const rate=rates.get(ip)||{n:0,time:Date.now()};if(Date.now()-rate.time>60000){rate.n=0;rate.time=Date.now();}rates.set(ip,rate);if(++rate.n>600){send(res,429,{error:'Too many requests. Please wait a moment.'});return;}
  let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>16384){send(res,413,{error:'Request too large'});return;}}let d;try{d=JSON.parse(body);}catch{send(res,400,{error:'Invalid request'});return;}if(!d||typeof d!=='object'||Array.isArray(d)){send(res,400,{error:'Invalid request'});return;}
  if(url.pathname==='/api/create'||url.pathname==='/api/join'){const {r,p}=url.pathname==='/api/create'?game.create(d.name):game.join(d.code,d.name);send(res,200,{token:p.token,state:game.view(r,p)});push();return;}
  const r=game.room(d.code),p=game.auth(r,req.headers.authorization?.replace(/^Bearer /,''));game.advance(r);
  if(url.pathname==='/api/ping'){send(res,200,game.view(r,p));push();return;}
  if(url.pathname!=='/api/action'){send(res,404,{error:'Not found'});return;}
  game.action(r,p,d.action,d);send(res,200,d.action==='leave'?{ok:true}:game.view(r,p));push();
 }catch(e){send(res,e.status||500,{error:e.status?e.message:'Something went wrong. Please try again.'});if(!e.status)console.error(e);}});
 const timer=setInterval(()=>{game.tick();push();for(const [res] of streams)res.write(': heartbeat\n\n');for(const [ip,r] of rates)if(Date.now()-r.time>120000)rates.delete(ip);},1000);timer.unref();
 server.on('close',()=>{clearInterval(timer);for(const [res]of streams)res.end();});
 server.requestTimeout=15000;server.headersTimeout=10000;
 return {server,game};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){const {server}=createApp();server.listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('Closet Quest is ready on port '+(process.env.PORT||3000)));}

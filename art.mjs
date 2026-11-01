import {catalog} from './catalog.mjs';
const items=new Map(catalog.map(x=>[x.id,x]));
const stroke='stroke="#51475d" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"';
function garment(i){if(!i)return '';const c=i.color,s=i.shape;let d='';
 if(i.category==='top'){
  if(s==='tank')d=`<path fill="${c}" d="M96 111h13q11 17 22 0h13l7 77H89z"/><path d="M108 114q12 19 24 0" fill="none"/>`;
  else if(s==='sweet')d=`<path fill="${c}" d="M94 112q13-10 26 3 13-13 26-3l17 28-15 9-3-14 6 53H89l6-53-3 14-15-9z"/><path d="M111 124l9 8 9-8m-9 8v48" fill="none"/>`;
  else d=`<path fill="${c}" d="M96 108l13 5q11 13 22 0l13-5 23 22-13 20-12-10 7 48H91l7-48-12 10-13-20z"/>${s==='knit'?'<path d="M96 174h48m-39-30v24m10-26v26m10-26v26m10-24v24" fill="none" opacity=".3"/>':''}${s==='shirt'?'<path d="M109 113l11 17 11-17m-11 17v55" fill="none"/><circle cx="124" cy="144" r="1.5"/><circle cx="124" cy="157" r="1.5"/>':''}${i.id==='tee-rock'?'<path fill="#e6c168" stroke="none" d="M124 131l-13 19h10l-4 16 16-21h-10z"/>':''}`;
 }else if(i.category==='bottom'){
  if(s==='skirt'||s==='plaid')d=`<path fill="${c}" d="M91 183h58l15 55H76z"/><path d="M103 189l-8 42m25-42v42m17-42 8 42" fill="none" opacity=".5"/>${s==='plaid'?'<path d="M87 202h65m-69 15h74" fill="none" stroke="#e1c9d8"/>':''}`;
  else if(s==='shorts')d=`<path fill="${c}" d="M91 183h58l6 42h-29l-6-23-6 23H85z"/><path d="M92 190h56m-28 1v11" fill="none"/>`;
  else d=`<path fill="${c}" d="M91 183h58l10 91h-33l-6-64-6 64H81z"/><path d="M93 191h54m-27 0v19" fill="none"/>${i.id==='jeans-blue'?'<path d="M96 198q0 15-9 15m57-15q0 15 9 15" fill="none"/>':''}`;
 }else if(i.category==='outer'){
  const end=s==='coat'?236:s==='cardigan'?205:183;
  d=`<path fill="${c}" d="M94 108l16 7-7 48 5 ${end-163}H85l4-63-6 37-17-6 13-49zM146 108l-16 7 7 48-5 ${end-163}h23l-4-63 6 37 17-6-13-49z"/><path d="M107 116l-9 18 8 9m27-27 9 18-8 9" fill="none"/>${s==='jacket'?'<path d="M88 164l13-4m38 0 13 4" fill="none"/>':''}`;
 }else if(i.category==='shoes'){
  if(s==='boots')d=`<path fill="${c}" d="M86 253h25v27l-2 12H77q-4-10 9-14zM129 253h25v25q13 4 9 14h-32l-2-12z"/><path d="M94 260h10m-10 8h10m32-8h10m-10 8h10M78 287h31m22 0h31" fill="none" stroke="#c6b9cc"/>`;
  else d=`<path fill="${c}" d="M85 277h27l-2 15H76q-3-10 9-15zM128 277h27q12 5 9 15h-34z"/><path d="M78 288h31m22 0h31" fill="none"/>${s==='sneakers'?'<path d="M91 280h12m34 0h12" fill="none"/>':'<path d="M92 277v9m54-9v9" fill="none"/>'}`;
 }else if(i.category==='extra'){
  if(s==='bag')d=`<path d="M151 135q40 6 31 49" fill="none" stroke="${c}" stroke-width="5"/><rect x="153" y="175" width="39" height="33" rx="9" fill="${c}"/><path d="M155 188h35" fill="none"/><circle cx="174" cy="190" r="3" fill="#eed89f"/>`;
  else d=`<path fill="${c}" d="M103 105q17 9 34 0l4 14q-20 12-42 0z"/><path fill="${c}" d="M127 119h12l10 41-15 4z"/><path d="M136 155l11-3" fill="none"/>`;
 }return `<g ${stroke}>${d}</g>`;
}
export function itemArt(i){const view={top:'65 100 110 100',bottom:'67 174 105 110',outer:'60 99 120 148',shoes:'64 246 112 53',extra:i?.shape==='scarf'?'90 98 70 73':'139 127 64 90'};return `<svg viewBox="${view[i.category]}" aria-hidden="true">${garment(i)}</svg>`;}
export function avatar(o={}){
 const resolve=cat=>{const base=items.get(o[cat]),custom=o.custom?.[cat];return base&&custom&&/^#[0-9a-f]{6}$/i.test(custom.color)?{...base,color:custom.color}:base;};
 const skin=['#f0ceb4','#dfaf89','#be8968','#966348','#704936'][o.skin||0];const hair=['#4a3943','#b67f50','#302d3c','#82634b'][o.hair||0];
 const hairBack=o.hair===2?`<path fill="${hair}" d="M79 57q-9-36 26-38 32-18 51 15 20 20 3 47l-5 15H84z"/>`:`<path fill="${hair}" d="M81 62q-4-46 39-46t39 46l5 63H76z"/>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 330" role="img" aria-label="Cartoon outfit preview"><ellipse cx="120" cy="305" rx="66" ry="10" fill="#51475d" opacity=".09"/>${hairBack}<g ${stroke} fill="${skin}"><path d="M95 110q25-13 50 0l16 70q3 12-5 14-8 2-10-10l-7-39 9 43H92l9-43-7 39q-2 12-10 10-8-2-5-14z"/><path d="M95 181h50l3 99h-18l-10-67-10 67H92z"/><path d="M110 92h20v22q-10 9-20 0z"/><ellipse cx="120" cy="64" rx="34" ry="38"/></g><path fill="${hair}" d="M85 53q0-36 35-34 33 0 35 34-19-2-27-19-12 19-43 19z"/><ellipse cx="107" cy="65" rx="3" ry="4" fill="#493c47"/><ellipse cx="133" cy="65" rx="3" ry="4" fill="#493c47"/><ellipse cx="99" cy="77" rx="7" ry="4" fill="#d78691" opacity=".5"/><ellipse cx="141" cy="77" rx="7" ry="4" fill="#d78691" opacity=".5"/><path d="M114 80q6 6 12 0" fill="none" stroke="#8f5963" stroke-width="2.2" stroke-linecap="round"/>${garment(resolve('bottom'))}${garment(resolve('top'))}${garment(resolve('shoes'))}${garment(resolve('outer'))}${garment(resolve('extra'))}</svg>`;
}

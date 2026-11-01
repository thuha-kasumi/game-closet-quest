import {catalog,categories} from './catalog.mjs';
export const CLOSET_KEY='closet-quest-photo-closet-v1';
export const MAX_ITEMS=24;
const byId=new Map(catalog.map(x=>[x.id,x]));
const clean=(v,n)=>typeof v==='string'?v.trim().replace(/[\u0000-\u001f]/g,'').slice(0,n):'';
export function validateItem(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('Invalid closet item.');
 if(!categories.includes(raw.category)||byId.get(raw.baseId)?.category!==raw.category)throw new Error('Choose a matching clothing category and shape.');
 if(!/^#[0-9a-f]{6}$/i.test(raw.color||''))throw new Error('Choose a garment color.');
 const name=clean(raw.name,40),id=clean(raw.id,64);
 if(!name||!id||!/^[a-zA-Z0-9-]+$/.test(id))throw new Error('Give this piece a name.');
 if(typeof raw.photo!=='string'||raw.photo.length>180000||!/^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(raw.photo))throw new Error('Add a supported clothing photo.');
 return {id,name,category:raw.category,baseId:raw.baseId,color:raw.color.toLowerCase(),location:clean(raw.location,60),tags:clean(raw.tags,100),photo:raw.photo};
}
export function readCloset(storage){try{storage??=globalThis.localStorage;const data=JSON.parse(storage.getItem(CLOSET_KEY)||'[]');if(!Array.isArray(data))return [];return data.slice(0,MAX_ITEMS).flatMap(x=>{try{return [validateItem(x)];}catch{return [];}});}catch{return [];}}
export function saveCloset(items,storage){
 if(!Array.isArray(items)||items.length>MAX_ITEMS)throw new Error(`This beta holds up to ${MAX_ITEMS} pieces. Export a backup, or remove a piece to add another.`);
 const safe=items.map(validateItem);if(new Set(safe.map(x=>x.id)).size!==safe.length)throw new Error('Duplicate closet items.');
 try{storage??=globalThis.localStorage;storage.setItem(CLOSET_KEY,JSON.stringify(safe));}catch{throw new Error('This browser could not save the closet. Export a backup, free some browser storage, or try a normal window.');}return safe;
}
export function mergeBackup(current,text){let data;try{data=JSON.parse(text);}catch{throw new Error('That is not a valid closet backup.');}if(data?.version!==1||!Array.isArray(data.items)||data.items.length>MAX_ITEMS)throw new Error('Choose a Closet Quest backup JSON file.');const merged=new Map(current.map(x=>[x.id,x]));for(const raw of data.items){const item=validateItem(raw);merged.set(item.id,item);}if(merged.size>MAX_ITEMS)throw new Error(`The combined closet would exceed ${MAX_ITEMS} pieces. Remove some pieces first.`);return [...merged.values()];}
export function illustration(item){const base=byId.get(item.baseId);return {...base,name:item.name,color:item.color,tags:item.tags.split(/[,\s]+/).filter(Boolean)};}
export function wearItem(outfit,item){return {...outfit,[item.category]:item.baseId,custom:{...(outfit.custom||{}),[item.category]:{key:item.id,name:item.name,color:item.color}}};}

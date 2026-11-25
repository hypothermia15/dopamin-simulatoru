'use strict';
/* util.js — piccoli helper condivisi da tutti gli script. */
const $=id=>document.getElementById(id);
const wall=()=>performance.now()/1000;

// Karşılaştırma sayfasındaki gömülü kopyalar için deterministik PRNG.
// Normal index.html akışında Math.random değişmez.
let _cmpSeed=null,_cmpState=0;
function _cmpHashSeed(v){
  const s=String(v==null?'':v);let h=2166136261>>>0;
  for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}
  return h>>>0||0x6d2b79f5;
}
function setComparisonSeed(seed){
  _cmpSeed=String(seed);_cmpState=_cmpHashSeed(seed);
}
function comparisonRandom(){
  _cmpState=(_cmpState+0x6D2B79F5)>>>0;
  let t=_cmpState;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);
  return ((t^(t>>>14))>>>0)/4294967296;
}
try{
  const q=new URLSearchParams(location.search);
  if(q.get('gomulu')==='1'&&q.has('seed')){
    setComparisonSeed(q.get('seed'));
    Math.random=comparisonRandom;
  }
}catch(e){}

function hexA(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;}
// Mescola due colori esadecimali: t=0 dà a, t=1 dà b
function mixHex(a,b,t){const x=parseInt(a.slice(1),16),y=parseInt(b.slice(1),16),m=(p,q)=>Math.round(p+(q-p)*t);return `rgb(${m(x>>16&255,y>>16&255)},${m(x>>8&255,y>>8&255)},${m(x&255,y&255)})`;}

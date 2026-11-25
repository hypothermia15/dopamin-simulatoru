'use strict';
/* karsilastir.js — iki gömülü simülatörü ortak ayarlar, seed ve zamanlama ile yönetir. */
(function(){
  const $=id=>document.getElementById(id);
  const W=i=>$('k-cerceve-'+i).contentWindow;
  const hazir=i=>{try{return typeof W(i).tamSifirla==='function'&&typeof W(i).durumOzeti==='function'&&typeof W(i).setComparisonPaused==='function';}catch(e){return false;}};

  const ISLEM={
    'mod-normal':['Beyin: nörotipik',w=>w.setMode('normal'),'mode'],
    'mod-adhd':['Beyin: DEHB',w=>w.setMode('adhd'),'mode'],
    'mph':['Metilfenidat, kısa etkili',w=>w.startMph(),'drug'],
    'doz-0':['Model ayarı: düşük',w=>w.setMphDose(0),'dose'],
    'doz-1':['Model ayarı: orta',w=>w.setMphDose(1),'dose'],
    'doz-2':['Model ayarı: yüksek',w=>w.setMphDose(2),'dose'],
    'mphx':['Metilfenidat, uzun etkili',w=>w.startMed('mphx'),'drug'],
    'atx':['Atomoksetin',w=>w.startMed('atx'),'drug'],
    'gua':['Guanfasin',w=>w.startMed('gua'),'drug'],
    'aps':['Antipsikotik',w=>w.startMed('aps'),'drug'],
    'ari':['Aripiprazol',w=>w.startMed('ari'),'drug'],
    'kafein':['Kafein',w=>w.startCaffeine(),'intervention'],
    'egzersiz':['Egzersiz',w=>w.startExercise(),'intervention'],
    'auto':['Otoreseptör freni: açık',w=>w.setMech('auto',true),'mechanism'],
    'up':['Reseptör artışı: açık',w=>w.setMech('up',true),'mechanism'],
    'iron':['Demir eksikliği: açık',w=>w.setMech('iron',true),'mechanism']
  };

  const HAZIR=[
    ['İlaçsız ve metilfenidat',20,['DEHB, ilaçsız',['mod-adhd']],['DEHB, metilfenidat',['mod-adhd','mph']],'Sağda taşıyıcı blokajı artar; alıcı nöronun hazır olma oranındaki 10 saniyelik ortalamayı ve Δ değerini izleyin.'],
    ['Kısa ve uzun etkili metilfenidat',20,['Kısa etkili',['mod-adhd','mph']],['Uzun etkili',['mod-adhd','mphx']],'Etkinin yükseliş ve sönüş hızları farklıdır; zaman içinde ortalama blokaj ve hazır olma oranını karşılaştırın.'],
    ['Düşük ve yüksek model ayarı',20,['Düşük model ayarı',['mod-adhd','doz-0','mph']],['Yüksek model ayarı',['mod-adhd','doz-2','mph']],'Model ayarları klinik doz değildir. Yüksek ayarda blokaj artsa da yanıtın doğrusal artması beklenmez.'],
    ['Antipsikotik ve aripiprazol',60,['Antipsikotik',['aps']],['Aripiprazol',['ari']],'İkisi de D2 reseptörlerini işgal eder; aripiprazol tarafında kısmi agonizm nedeniyle yanıt örüntüsü farklıdır.'],
    ['Nörotipik ve DEHB',30,['Nörotipik',['mod-normal']],['DEHB',['mod-adhd']],'Aynı seed ve uyaran altında modelin varsaydığı reseptör/taşıyıcı farklarının etkisini izleyin.'],
    ['Atomoksetin ve guanfasin',20,['Atomoksetin',['mod-adhd','atx']],['Guanfasin',['mod-adhd','gua']],'İki ilaç da bu striatal çizimde kaba benzetmeyle temsil edilir; asıl etkileri prefrontal korteks bağlamında düşünülmelidir.'],
    ['Otoreseptör freni: kapalı ve açık',90,['Fren kapalı',[]],['Fren açık',['auto']],'Sağda dopamin arttıkça salınım freni devreye girer.'],
    ['Antipsikotik: kısa ve uzun süreli',50,['Reseptör artışı kapalı',['aps']],['Reseptör artışı açık',['up','aps']],'Sağda uzun süreli kullanım varsayımıyla D2 sayısındaki değişimi izleyin.'],
    ['Demir eksikliği',80,['Olağan sentez',['mod-adhd']],['Demir eksikliği',['mod-adhd','iron']],'Yüksek uyaranda dopamin deposunun son 10 saniyelik ortalamasını karşılaştırın.']
  ];

  const taraf=[
    {title:'Sol',actions:[],chips:new Map()},
    {title:'Sağ',actions:[],chips:new Map()}
  ];
  let aktifPreset=-1,paused=false;
  const history=[[],[]];
  const WINDOW_MS=10000;

  function seedFor(i){
    const base=String($('k-seed').value||'20261125');
    return $('k-rng').value==='paired'?base:base+(i===0?'-sol':'-sag');
  }
  function ortakUygula(){
    const age=+$('k-yas').value,stim=+$('k-uyaran').value/100,speed=+$('k-hiz').value;
    $('k-yas-deger').textContent=age;
    $('k-uyaran-deger').textContent=Math.round(stim*100)+'%';
    $('k-hiz-deger').textContent=String(speed).replace('.',',')+'×';
    [0,1].forEach(i=>{if(hazir(i)){W(i).setAge(age);W(i).setStimulus(stim);W(i).setSpeed(speed);}});
  }
  function setPaused(on){
    paused=!!on;
    [0,1].forEach(i=>{if(hazir(i))W(i).setComparisonPaused(paused);});
    const b=$('k-durdur');
    b.setAttribute('aria-pressed',String(paused));
    b.textContent=paused?'▶ İkisini devam ettir':'⏸ İkisini durdur';
  }
  function reseedReset(i){
    const w=W(i);
    w.setComparisonPaused(true);
    if(typeof w.setComparisonSeed==='function')w.setComparisonSeed(seedFor(i));
    w.tamSifirla();w.setMode('normal');
  }
  function chipSet(i,key,label,kind){
    const m=taraf[i].chips;
    if(kind==='mode')for(const [k,v] of m)if(v.kind==='mode')m.delete(k);
    if(kind==='dose')for(const [k,v] of m)if(v.kind==='dose')m.delete(k);
    m.set(key,{label,kind});renderChips(i);
  }
  function renderChips(i){
    const box=$('k-chipler-'+i);box.textContent='';
    if(!taraf[i].chips.size)taraf[i].chips.set('mod-normal',{label:'Beyin: nörotipik',kind:'mode'});
    for(const v of taraf[i].chips.values()){
      const s=document.createElement('span');s.className='k-chip'+(v.kind==='dose'?' model':'');s.textContent=v.label;box.append(s);
    }
  }
  function uygula(i,key,{custom=false}={}){
    if(!hazir(i)||!ISLEM[key])return;
    ISLEM[key][1](W(i));
    const [label,,kind]=ISLEM[key];
    chipSet(i,key,label,kind);
    if(!taraf[i].actions.includes(key)||kind==='drug'||kind==='intervention')taraf[i].actions.push(key);
    if(custom)markCustom(i);
  }
  function markCustom(i){
    aktifPreset=-1;
    document.querySelectorAll('#k-hazir button').forEach(b=>b.setAttribute('aria-pressed','false'));
    taraf[i].title=i===0?'Özel koşul · Sol':'Özel koşul · Sağ';
    $('k-ad-'+i).textContent=taraf[i].title;
    $('k-ipucu').textContent='Elle müdahale uygulandı. Hazır karşılaştırma seçimi kaldırıldı; aktif koşulları chip’lerden izleyin.';
  }
  function clearState(i,title){
    taraf[i].title=title|| (i===0?'Sol':'Sağ');
    taraf[i].actions=[];taraf[i].chips=new Map();
    renderChips(i);$('k-ad-'+i).textContent=taraf[i].title;
  }
  function clearHistory(){history[0]=[];history[1]=[];renderAverage();}
  function syncRestart(){
    if(!hazir(0)||!hazir(1))return;
    setPaused(true);
    [0,1].forEach(i=>reseedReset(i));
    ortakUygula();
    [0,1].forEach(i=>{
      const actions=taraf[i].actions.slice();
      taraf[i].actions=[];taraf[i].chips=new Map();renderChips(i);
      actions.forEach(k=>uygula(i,k));
      // Kurulumun kendisi rastgele sayı tüketmiş olabilir; dinamik akışı aynı başlangıç noktasından başlat.
      if(typeof W(i).setComparisonSeed==='function')W(i).setComparisonSeed(seedFor(i));
    });
    clearHistory();
    requestAnimationFrame(()=>requestAnimationFrame(()=>setPaused(false)));
  }
  function hazirSec(n){
    if(!hazir(0)||!hazir(1))return;
    const h=HAZIR[n];aktifPreset=n;
    $('k-uyaran').value=h[1];
    [0,1].forEach(i=>clearState(i,h[2+i][0]));
    taraf[0].actions=h[2][1].slice();taraf[1].actions=h[3][1].slice();
    document.querySelectorAll('#k-hazir button').forEach((b,k)=>b.setAttribute('aria-pressed',String(k===n)));
    $('k-ipucu').textContent='Ne izlenmeli: '+h[4];
    syncRestart();
  }

  const METRICS=[
    ['alici','Alıcı nöron hazır','%'],
    ['blok','Taşıyıcı blokajı','%'],
    ['bos','Boş D2 reseptörü',''],
    ['depo','Dopamin deposu','%']
  ];
  function snapshot(){
    if(paused)return;
    const t=performance.now();
    [0,1].forEach(i=>{
      if(!hazir(i))return;
      const d=W(i).durumOzeti();
      history[i].push({t,alici:d.alici,blok:d.blok,bos:d.bos,depo:d.depo});
      while(history[i].length&&history[i][0].t<t-WINDOW_MS)history[i].shift();
      renderCurrent(i,d);
    });
    renderAverage();
  }
  function renderCurrent(i,d){
    const dl=$('k-oku-'+i);
    const rows=[['Anlık hazır',d.alici+'%'],['Anlık blokaj',d.blok+'%'],['Boş D2',d.bos+' / '+d.d2],['Depo',d.depo+'%']];
    if(d.fren>0)rows.push(['Otoreseptör freni','−'+d.fren+'%']);
    dl.textContent='';
    rows.forEach(([a,b])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=a;dd.textContent=b;dl.append(dt,dd);});
  }
  function avg(i,key){
    const a=history[i];if(!a.length)return null;
    return a.reduce((s,x)=>s+(Number(x[key])||0),0)/a.length;
  }
  function fmt(v,unit){
    if(v==null)return '—';
    return (Math.round(v*10)/10).toLocaleString('tr-TR',{maximumFractionDigits:1})+unit;
  }
  function renderAverage(){
    const body=$('k-ort-table').tBodies[0];body.textContent='';
    METRICS.forEach(([key,label,unit])=>{
      const l=avg(0,key),r=avg(1,key),d=l==null||r==null?null:r-l;
      const tr=document.createElement('tr');
      [label,fmt(l,unit),fmt(r,unit),d==null?'—':((d>0?'+':'')+fmt(d,unit))].forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.append(td);});
      body.append(tr);
    });
    const oldest=Math.min(history[0][0]?.t||Infinity,history[1][0]?.t||Infinity);
    const newest=Math.max(history[0].at(-1)?.t||0,history[1].at(-1)?.t||0);
    const sec=isFinite(oldest)?Math.min(10,Math.max(0,(newest-oldest)/1000)):0;
    $('k-pencere').textContent=sec<9.5?'Pencere: '+sec.toFixed(1).replace('.',',')+' sn':'Pencere: 10 sn';
  }

  HAZIR.forEach((h,n)=>{
    const b=document.createElement('button');b.type='button';b.textContent=h[0];b.setAttribute('aria-pressed','false');
    b.addEventListener('click',()=>hazirSec(n));$('k-hazir').append(b);
  });
  [0,1].forEach(i=>{
    const s=$('k-sec-'+i);
    Object.keys(ISLEM).forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=ISLEM[k][0];s.append(o);});
  });
  document.querySelectorAll('[data-uygula]').forEach(b=>b.addEventListener('click',()=>{
    const i=+b.dataset.uygula;uygula(i,$('k-sec-'+i).value,{custom:true});
  }));
  $('k-yas').addEventListener('input',ortakUygula);
  $('k-uyaran').addEventListener('input',ortakUygula);
  $('k-hiz').addEventListener('input',ortakUygula);
  $('k-rng').addEventListener('change',syncRestart);
  $('k-seed').addEventListener('change',syncRestart);
  $('k-durdur').addEventListener('click',()=>setPaused(!paused));
  $('k-sifirla').addEventListener('click',syncRestart);

  let deneme=0;
  const bekle=setInterval(()=>{
    if(hazir(0)&&hazir(1)){
      clearInterval(bekle);ortakUygula();hazirSec(0);setInterval(snapshot,250);
    }else if(++deneme>120)clearInterval(bekle);
  },100);
})();

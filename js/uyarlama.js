'use strict';
/* uyarlama.js — Türkçe uyarlamanın ekleri (özgün eserde yoktur).
   Uyarlayanın notları ve künye yalnızca dil Türkçeyken görünür; öteki dillerde sayfa özgün hâliyle kalır.
   Metinler sözlüğe (i18n/tr.js) konmadı: sözlük testi her dilde aynı anahtarları ister.
   applyI18n() her çağrıldığında renderAdaptNotes() yeniden çalışır (js/i18n.js). */
const ADAPT={
  credit:'Özgün eser: Stefano Caronia (2026), MIT lisansı · Türkçe uyarlama ve notlar: Doç. Dr. Miraç Barış Usta',
  sim:'<span class="ni" aria-hidden="true">🩺</span><span><b>Uyarlayanın notu.</b> Bu simülasyon tanı koymaz, tedavi önermez. DEHB tek bir dopamin farkına indirgenemez: buradaki “DEHB’li beyin” öğretim amaçlı bir karikatürdür. Ayrıntı: <a data-page-link="mech">Nasıl çalışır</a> sayfasının sonundaki notlar.</span>',
  act:'<b>Uyarlayanın notu.</b> İlaca başlama, doz ve süre kararı hekimle verilir. Kafein ve egzersiz düğmeleri bir düzeneği gösterir, tedavinin yerini tutmaz.',
  subst:'<b>Uyarlayanın notu.</b> Bu panel yalnızca dopamin düzeneğini gösterir. Maddelerin beden, ruh sağlığı ve yaşam üzerindeki zararları canlandırılmamıştır.',
  mechTitle:'🩺 Uyarlayanın notları',
  mech:[
    ['DEHB bir “dopamin eksikliği” değildir.','DEHB’de dopamin sisteminin rolünü destekleyen bulgular vardır, ama bulgular çalışmadan çalışmaya değişir ve noradrenalin gibi başka sistemler de işin içindedir. Tanı beyin görüntülemesiyle ya da bir reseptör sayımıyla konmaz: gelişim öyküsüne, belirtilerin farklı ortamlardaki görünümüne ve klinik değerlendirmeye dayanır. Simülasyondaki “az reseptör, çok taşıyıcı” tablosu tek bir varsayımın büyütülmüş hâlidir.'],
    ['İlaç kararı ekranda verilmez.','Simülasyonda metilfenidat düğmesine basınca nöronlar saniyeler içinde yanar. Gerçekte yanıtın büyüklüğü, uygun doz ve yan etkiler kişiden kişiye değişir. Ilaca başlama, doz ayarı ve izlem hekimin işidir. Buradaki sayılar klinik yanıtı öngörmez.'],
    ['Kafein ve egzersiz tedavi değildir.','İkisi de burada bir düzeneği göstermek için vardır. Düzenli uyku ve hareket herkes için değerlidir, ama simülasyondaki etkileri DEHB tedavisinin yerine geçecek bir kanıt saymayın. Kafein düğmesi çocuklara kafein önerisi olarak okunmamalıdır.'],
    ['“Kolay ödüller” bölümü bir benzetmedir.','Ekran kullanımıyla reseptör azalması arasındaki ilişki, simülasyonun gösterdiği kadar kesin ve hızlı değildir. Özgün yazar da bunu “Model ve gerçeklik” sayfasında zamanlaması ve genliği abartılmış olarak işaretler. Çocuğunuzun ekran kullanımıyla ilgili bir kaygınız varsa bunu onu tanıyan bir uzmanla değerlendirin.'],
    ['Ekran ve oyun için kanıt ilişki düzeyindedir.','Kısa videolarla ilgili 58 çalışmalık bir meta-analiz, kullanımın depresyon (r = 0,24), kaygı (r = 0,26) ve stresle (r = 0,41) ilişkili olduğunu bulmuştur. İlişki sorunlu kullanımda belirgindir, olağan kullanımda anlamlı değildir (<a href="https://doi.org/10.2196/82503" target="_blank" rel="noopener">Tang ve ark., 2026</a>). Ergenlerde TikTok üzerine 20 çalışmalık bir derleme benzer kaygıları dile getirir ve kendini ifade etme ile akran bağı gibi olumlu yanlara da değinir (<a href="https://doi.org/10.1007/s00787-024-02581-w" target="_blank" rel="noopener">Conte ve ark., 2025</a>). Oyun oynama bozukluğu olan kişilerin yaklaşık üçte birinde depresyon eşlik eder (<a href="https://doi.org/10.1016/j.jad.2021.02.014" target="_blank" rel="noopener">Ostinelli ve ark., 2021</a>). Sorunlu oyun oynayanlar daha kısa ve daha kötü uyur, bu etki ergenlerde daha büyüktür (<a href="https://doi.org/10.3389/fpsyt.2021.675237" target="_blank" rel="noopener">Kristensen ve ark., 2021</a>). Bu çalışmaların çoğu kesitseldir: neyin neye yol açtığını göstermez ve hiçbiri reseptör ölçmez. Simülasyondaki reseptör azalması bu bulgulardan çıkmaz, özgün yazarın benzetmesidir.']
  ],
  subMech:'Maddeler bölümü yalnızca dopamin düzeneğini anlatır. Zararların bütününü göstermez ve kullanım için bir ölçü vermez.',
  src:'Bu sayfa, Stefano Caronia’nın MIT lisanslı <a href="https://github.com/stefanocaronia/dopamine-simulator" target="_blank" rel="noopener">Dopamine Simulator</a> çalışmasının (v3.8) Türkçe uyarlamasıdır. Model ve sayılar değiştirilmedi. Çeviri, notlar ve varsayılan ayarlar (Türkçe, Çocuk modu) uyarlayana aittir. Notlardaki görüşler özgün yazarı bağlamaz.'
};
function renderAdaptNotes(){
  const tr=lang==='tr';
  const set=(id,html)=>{const el=document.getElementById(id);if(!el)return;el.hidden=!tr||!html;el.innerHTML=tr?html:'';};
  set('adapt-sim',ADAPT.sim);
  set('adapt-act',ADAPT.act);
  set('adapt-subst',kidMode?'':ADAPT.subst);
  set('adapt-credit',ADAPT.credit);
  const sep=document.getElementById('adapt-sep');if(sep)sep.hidden=!tr;
  if(!tr)return;
  const mech=document.getElementById('page-mech');
  if(mech&&!mech.querySelector('.adapt-sec')){
    const sec=document.createElement('section');sec.className='adapt-sec';
    let html='<h2>'+ADAPT.mechTitle+'</h2><ul>';
    for(const [t,b] of ADAPT.mech)html+='<li><b>'+t+'</b> '+b+'</li>';
    if(!kidMode)html+='<li>'+ADAPT.subMech+'</li>';
    sec.innerHTML=html+'</ul><p class="adapt-src">'+ADAPT.src+'</p>';
    mech.appendChild(sec);
  }
  const bio=document.getElementById('page-bio');
  if(bio&&!bio.querySelector('.adapt-sec')){
    const sec=document.createElement('section');sec.className='adapt-sec';
    sec.innerHTML='<h2>'+ADAPT.mechTitle+'</h2><p class="adapt-src">'+ADAPT.src+'</p>';
    bio.appendChild(sec);
  }
}

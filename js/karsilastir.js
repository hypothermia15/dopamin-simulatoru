'use strict';
/* karsilastir.js — Türkçe uyarlamanın eki. İki gömülü simülatörü (index.html?gomulu=1) yan yana yönetir.
   Çerçeveler aynı kökendedir; model işlevleri (setMode, startMed, setMech…) doğrudan çağrılır. */
(function () {
  const $ = id => document.getElementById(id);
  const W = i => $('k-cerceve-' + i).contentWindow;
  const hazir = i => { try { return typeof W(i).tamSifirla === 'function' && typeof W(i).durumOzeti === 'function'; } catch (e) { return false; } };

  // tek tek uygulanabilen işlemler
  const ISLEM = {
    'mod-normal': ['Beyin: nörotipik', w => w.setMode('normal')],
    'mod-adhd': ['Beyin: DEHB', w => w.setMode('adhd')],
    'mph': ['Metilfenidat, kısa etkili', w => w.startMph()],
    'doz-0': ['Metilfenidat dozu: düşük', w => w.setMphDose(0)],
    'doz-1': ['Metilfenidat dozu: orta', w => w.setMphDose(1)],
    'doz-2': ['Metilfenidat dozu: yüksek', w => w.setMphDose(2)],
    'mphx': ['Metilfenidat, uzun etkili', w => w.startMed('mphx')],
    'atx': ['Atomoksetin', w => w.startMed('atx')],
    'gua': ['Guanfasin', w => w.startMed('gua')],
    'aps': ['Antipsikotik', w => w.startMed('aps')],
    'ari': ['Aripiprazol', w => w.startMed('ari')],
    'kafein': ['Kafein', w => w.startCaffeine()],
    'egzersiz': ['Egzersiz', w => w.startExercise()],
    'auto': ['Otoreseptör freni: aç', w => w.setMech('auto', true)],
    'up': ['Uzun süreli antipsikotik (reseptör artışı): aç', w => w.setMech('up', true)],
    'iron': ['Demir eksikliği: aç', w => w.setMech('iron', true)]
  };
  // hazır karşılaştırmalar: [ad, uyaran %, sol(ad, işlemler), sağ(ad, işlemler), ne izlenmeli]
  const HAZIR = [
    ['İlaçsız ve metilfenidat', 20, ['DEHB, ilaçsız', ['mod-adhd']], ['DEHB, metilfenidat', ['mod-adhd', 'mph']], 'Sağda taşıyıcılar kapanır, dopamin aralıkta daha uzun kalır ve alıcı nöronlar daha sık hazır olur.'],
    ['Kısa ve uzun etkili metilfenidat', 20, ['Kısa etkili', ['mod-adhd', 'mph']], ['Uzun etkili', ['mod-adhd', 'mphx']], 'Solda etki hızlı başlar ve 30 saniyede biter, ardından geri tepme gelir. Sağda etki yavaş yükselir ve 75 saniye sürer.'],
    ['Düşük ve yüksek doz', 20, ['Düşük doz', ['mod-adhd', 'doz-0', 'mph']], ['Yüksek doz', ['mod-adhd', 'doz-2', 'mph']], 'Blokaj %40 ile %90. Yüksek dozda eşik yükselir: daha çok blokaj daha çok yanıt anlamına gelmez. Yüksek ayarın bedelleri temsilidir.'],
    ['Antipsikotik ve aripiprazol', 60, ['Antipsikotik', ['aps']], ['Aripiprazol', ['ari']], 'İkisi de reseptörleri işgal eder. Solda yanıt düşer. Sağda işgal edilmiş reseptörler zayıf bir sinyal verdiği için yanıt orta düzeyde kalır.'],
    ['Nörotipik ve DEHB', 30, ['Nörotipik', ['mod-normal']], ['DEHB', ['mod-adhd']], 'Aynı uyaran, farklı reseptör ve taşıyıcı sayısı. Bu fark tek bir varsayımın büyütülmüş hâlidir, tanı ölçütü değildir.'],
    ['Atomoksetin ve guanfasin', 20, ['Atomoksetin', ['mod-adhd', 'atx']], ['Guanfasin', ['mod-adhd', 'gua']], 'Solda geri alım yavaşça azalır. Sağda dopamin değişmez, alıcı nöronun eşiği düşer. İkisi de asıl olarak prefrontal kortekste etki eder: bu çizim kaba bir benzetmedir.'],
    ['Otoreseptör freni: kapalı ve açık', 90, ['Fren kapalı', []], ['Fren açık', ['auto']], 'Sağda aralık doldukça salınım azalır: dopamin kendi kendini sınırlar.'],
    ['Antipsikotik: kısa ve uzun süreli', 50, ['Reseptör artışı kapalı', ['aps']], ['Reseptör artışı açık', ['up', 'aps']], 'Sağda reseptör sayısı ilaç sürerken artar. İlaç bitince (60 saniye) fazladan reseptörler bir süre kalır: aşırı duyarlılık.'],
    ['Demir eksikliği', 80, ['Olağan sentez', ['mod-adhd']], ['Demir eksikliği', ['mod-adhd', 'iron']], 'Sağda depo daha geç dolar. Yüksek uyaranda depo yüzdesini izleyin.']
  ];

  function uyaranYaz() { const v = +$('k-uyaran').value; $('k-uyaran-deger').textContent = v + '%'; [0, 1].forEach(i => { if (hazir(i)) W(i).setStimulus(v / 100); }); }
  function hizYaz() { const v = +$('k-hiz').value; $('k-hiz-deger').textContent = String(v).replace('.', ',') + '×'; [0, 1].forEach(i => { if (hazir(i)) W(i).setSpeed(v); }); }
  function uygula(i, anahtar) { if (hazir(i) && ISLEM[anahtar]) ISLEM[anahtar][1](W(i)); }
  function sifirla() { [0, 1].forEach(i => { if (hazir(i)) { W(i).tamSifirla(); W(i).setMode('normal'); } }); uyaranYaz(); hizYaz(); }

  function hazirSec(n) {
    const h = HAZIR[n]; if (!hazir(0) || !hazir(1)) return;
    $('k-uyaran').value = h[1]; sifirla();
    [0, 1].forEach(i => { $('k-ad-' + i).textContent = h[2 + i][0]; h[2 + i][1].forEach(a => uygula(i, a)); });
    $('k-ipucu').textContent = 'Ne izlenmeli: ' + h[4];
    document.querySelectorAll('#k-hazir button').forEach((b, k) => b.setAttribute('aria-pressed', String(k === n)));
  }

  function oku() {
    [0, 1].forEach(i => {
      if (!hazir(i)) return; const d = W(i).durumOzeti(), dl = $('k-oku-' + i);
      const satir = [['Alıcı nöron hazır', d.alici + '%'], ['Taşıyıcı blokajı', d.blok + '%'], ['Boş D2 reseptörü', d.bos + ' / ' + d.d2], ['Dopamin deposu', d.depo + '%']];
      if (d.fren > 0) satir.push(['Otoreseptör freni', '−' + d.fren + '%']);
      if (dl.childElementCount !== satir.length * 2) { dl.textContent = ''; satir.forEach(() => { dl.append(document.createElement('dt'), document.createElement('dd')); }); }
      satir.forEach((s, k) => { dl.children[k * 2].textContent = s[0]; dl.children[k * 2 + 1].textContent = s[1]; });
    });
  }

  HAZIR.forEach((h, n) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = h[0]; b.setAttribute('aria-pressed', 'false'); b.addEventListener('click', () => hazirSec(n)); $('k-hazir').append(b); });
  [0, 1].forEach(i => { const s = $('k-sec-' + i); Object.keys(ISLEM).forEach(k => { const o = document.createElement('option'); o.value = k; o.textContent = ISLEM[k][0]; s.append(o); }); });
  document.querySelectorAll('[data-uygula]').forEach(b => b.addEventListener('click', () => { const i = +b.dataset.uygula; uygula(i, $('k-sec-' + i).value); }));
  $('k-uyaran').addEventListener('input', uyaranYaz); $('k-hiz').addEventListener('input', hizYaz);
  $('k-sifirla').addEventListener('click', () => { sifirla(); $('k-ad-0').textContent = 'Sol'; $('k-ad-1').textContent = 'Sağ'; $('k-ipucu').textContent = ''; document.querySelectorAll('#k-hazir button').forEach(b => b.setAttribute('aria-pressed', 'false')); });

  // iki çerçeve de hazır olunca ilk karşılaştırmayı başlat
  let deneme = 0; const bekle = setInterval(() => { if (hazir(0) && hazir(1)) { clearInterval(bekle); hazirSec(0); setInterval(oku, 400); } else if (++deneme > 100) clearInterval(bekle); }, 150);
})();

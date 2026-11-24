# Türkçe uyarlama

Bu depo, Stefano Caronia'nın [Dopamine Simulator](https://github.com/stefanocaronia/dopamine-simulator) çalışmasının (v3.8, MIT lisansı) Türkçe uyarlamasıdır. Özgün telif bildirimi `LICENSE` dosyasında aynen durur.

Uyarlayan: Doç. Dr. Miraç Barış Usta (çocuk ve ergen psikiyatrisi).

## Özgün eserden farklar

| Dosya | Değişiklik |
|---|---|
| `i18n/tr.js` | Yeni: Türkçe sözlük (325 anahtar, `i18n/en.js` temel alındı). |
| `js/ui.js` | Metin sayfaları çizildikten sonra notları ekleyen tek satır. |
| `js/i18n.js` | Dil listesine Türkçe eklendi. Varsayılan dil Türkçe, ilk açılışta Çocuk modu açık. |
| `js/uyarlama.js` | Yeni: yalnızca Türkçede görünen "Uyarlayanın notu" kutuları ve künye. |
| `index.html` | Türkçe başlık ve açıklama, Türkçe bayrak simgesi, not yerleri, alt bilgide künye. Bağış bağlantısı kaldırıldı. |
| `css/style.css` | Not kutularının biçimi (dosyanın sonunda). |

Özgün modelin sayıları ve çizim değiştirilmedi. 24 Kasım 2026'da modele tek bir ek yapıldı (aşağıda). `node tests/run.js` özgün testleri ve bu ekin altı testini çalıştırır (123 denetim).

## Uyarlayanın notları neden var

Simülasyon farklar görünsün diye sayıları bilerek abartır; özgün yazar bunu "Model ve gerçeklik" sayfasında açıkça belirtir. Türkçe sürüm aileler ve öğrenciler için yayımlandığından dört noktaya ayrıca not düşüldü: DEHB tek bir dopamin farkına indirgenemez; ilaç kararı hekimle verilir; kafein ve egzersiz tedavi değildir; "kolay ödüller" bölümü bir benzetmedir.

## 24 Kasım 2026: ekran ve oyun için kanıt notu

"Nasıl çalışır" sayfasındaki uyarlayan notlarına beşinci bir madde eklendi (`js/uyarlama.js`). Simülasyonda egzersiz, kısa video kaydırma ve video oyunları zaten vardır (Egzersiz düğmesi, "Kolay ödüller" düğmesi, Çocuk modundaki "Oyun" etkinliği); yeni düğme eklenmedi ve model değiştirilmedi. Not, kısa video ve sorunlu oyun oynama için dört kaynağın bulgularını özetler ve bunların ilişki düzeyinde olduğunu, reseptör ölçmediğini belirtir: Tang ve ark. 2026 (doi:10.2196/82503), Conte ve ark. 2025 (doi:10.1007/s00787-024-02581-w), Ostinelli ve ark. 2021 (doi:10.1016/j.jad.2021.02.014), Kristensen ve ark. 2021 (doi:10.3389/fpsyt.2021.675237). Künyeler ve özetler PubMed kayıtlarından alındı. Egzersiz için DEHB'ye özgü kaynak taranmadı.

## 24 Kasım 2026: metamfetamin (modele yapılan ilk ek)

Kullanıcı isteğiyle maddeler paneline metamfetamin eklendi. Özgün simülatörde yoktur.

| Dosya | Değişiklik |
|---|---|
| `js/model.js` | `SUBST.met` ve durum kaydı; `datBlock`, `datSpeedMult`, `threshMult`, `sleepMult` işlevlerine metamfetamin terimleri; renk. Özgün maddelerin sayıları değişmedi. |
| `js/ui.js`, `js/render.js`, `index.html`, `css/style.css` | Düğme, dolum çubuğu, ipucu, bloke taşıyıcı rengi. Çocuk modunda gizlenir. |
| `i18n/*.js` | Yedi yeni anahtar. Türkçe ve İngilizce yazıldı; öteki on dilde sözlük testi aynı anahtarları istediği için İngilizce metin kondu. |
| `tests/run.js`, `tests/render.js` | Altı yeni denetim; karma çalıştırmalara eklendi. |
| `docs/fedelta-biologica.md` | Ek kaydı. |

Kaynağa dayananlar (PubMed özetleri): ortalama eliminasyon yarılanma ömrü yaklaşık 10 saat, yüksek dozda psikoz, yoksunlukta çökkün duygudurum, kaygı ve uyku bozukluğu, akut dönem 7-10 gün (Cruickshank ve Dyer 2009, doi:10.1111/j.1360-0443.2009.02564.x; Glasner-Edwards ve Mooney 2014, doi:10.1007/s40263-014-0209-8; McGregor ve ark. 2005, doi:10.1111/j.1360-0443.2005.01160.x). Mekanizma etiketi ChEMBL kaydından (CHEMBL1201201, monoamin taşıyıcı inhibitörü).

Uyarlayanın seçtiği temsili değerler: süre 40 sn, DAT1 blokajı %60, taşıyıcı hızı ×0,5, uyarandan bağımsız ek salınım 18 molekül/sn, D2 kaybı saniyede %1,25 (doz başına %50), uyku borcu ×2, yoksunlukta eşik ×1,3 (40 sn). Bu sayılar bir ölçüme dayanmaz. Kokainle büyüklük karşılaştırması için kaynak taranmadı.

## 24 Kasım 2026: dört ilaç (uzun etkili metilfenidat, atomoksetin, guanfasin, antipsikotik)

Kullanıcı isteğiyle "Diğer ilaçlar" kartı eklendi. Hiçbiri özgün simülatörde yoktur. Kart Çocuk modunda gizlidir.

| İlaç | Modeldeki karşılığı (`MEDS`) | Kaynakta olan | Uyarlayanın seçtiği (temsili) |
|---|---|---|---|
| Uzun etkili metilfenidat (`mphx`) | DAT1 blokajı 10 sn'de %70'e çıkar, 75 sn sürer; DAT1 hızı ×0,4; uyku borcu ×1,5; bitişte 15 sn DAT1 ×1,15 | Günde tek doz uzatılmış salım, günde üç doz kısa etkiliye eşdeğer, en az 12 saat; uyku ve iştah etkileri benzer (Pelham 2001, doi:10.1542/peds.107.6.e105) | %70 tepe (kısa etkilide %85), yükseliş süresi, geri tepmenin daha hafif olması. Kaynak özeti tepe düzeyi ya da geri tepme karşılaştırması vermez. |
| Antipsikotik (`aps`) | D2 reseptörlerinin %70'i 60 sn işgal edilir (`effectiveD2()` çarpanı); `d2Sens` değişmez | Bütün antipsikotikler D2 bloke eder; haloperidolde yanıt %65, prolaktin %72, EPS %78 işgalin üzerinde artar; aralık %38-87 (Kapur 2000, doi:10.1176/appi.ajp.157.4.514) | %70 değeri bu eşiklerin arasından seçildi. Süre, başlangıç hızı. Kısmi agonistler, öteki reseptörler, uzun süreli kullanımda reseptör artışı modellenmedi. |
| Atomoksetin (`atx`) | Geri alım blokajı 45 sn'de %35'e çıkar, 90 sn sürer; DAT1 hızı ×0,7; geri tepme ve tolerans yok | NET Ki 5 nM, DAT Ki 1451 nM; sıçan PFK'sinde NA ve DA 3 kat artar, striatum ve akkumbenste DA değişmez (Bymaster 2002, doi:10.1016/S0893-133X(02)00346-9); etki 1-2 haftada başlar, 24 hafta ve sonrasına dek artar (Clemow ve Bushe 2015, doi:10.1177/0269881115602489; yazarlar Lilly çalışanı) | Bütün sayılar. Çizim striatum tipi bir sinapstır; atomoksetinin striatal dopamini değiştirmediği bulgusuyla birebir örtüşmez. Bu çelişki metinde ve notta açıkça yazıldı. |
| Guanfasin (`gua`) | Alıcı nöron eşiği 20 sn'de ×0,85'e iner, 90 sn sürer; dopamin değişmez | Postsinaptik α2A agonisti, PFK ağ bağlantılarını güçlendirir (Arnsten ve Jin 2012, PMID 22461743; DOI kaydı yok); 8 haftalık RKÇ, 6-17 yaş, n = 345; en sık yan etkiler baş ağrısı, uyku hâli, yorgunluk, üst karın ağrısı, sedasyon (Biederman 2008, doi:10.1542/peds.2006-3695) | Eşik oranı ve süreler. Sedasyon ve kan basıncı modellenmedi. |

Dosyalar: `js/model.js` (`MEDS`, `meds`, `medLevel()`, `startMed()`, beş işlevde terimler), `js/ui.js`, `js/render.js`, `index.html` (`#card-meds`), `css/style.css`, `i18n/*.js` (21 yeni anahtar; Türkçe ve İngilizce yazıldı, öteki on dilde İngilizce metin durur), `js/uyarlama.js`, `tests/run.js` (12 yeni denetim, toplam 135).

Doğrulanmayanlar: kaynakların yalnızca PubMed özetleri okundu, tam metinler okunmadı. Saniye cinsinden süreler gerçek farmakokinetiğin ölçeği değildir.

## 24 Kasım 2026: aripiprazol, metilfenidat doz ayarı ve antipsikotik düzeltmesi

**Düzeltme.** Aynı gün eklenen antipsikotik düğmesi ilk hâlinde reseptör sayısını azaltıyordu. Ölçümde bunun nöron yanıtını neredeyse hiç değiştirmediği görüldü (%50 uyaranda yanıt 0,90'dan 0,93'e), çünkü modelde dopamin molekülleri boş reseptöre yönelir. Düğme metni ise yanıtın azaldığını söylüyordu. Düzenek değiştirildi: reseptörler yerinde kalır, bir bölümü ilaçla işgal edilir (`r.drug`), işgal edilmiş reseptöre ulaşan molekül sinyal vermeden geri seker. Yeni ölçüm: aynı koşulda yanıt 0,90'dan 0,18'e iner. `effectiveD2()` özgün hâline döndürüldü.

| Ek | Modeldeki karşılığı | Kaynakta olan | Uyarlayanın seçtiği (temsili) |
|---|---|---|---|
| Aripiprazol (`ari`) | D2'lerin %85'i 90 sn işgal edilir. İşgal edilmiş reseptörler dopaminden bağımsız zayıf sinyal üretir (bağlanma başına sinyalin %30'u). Ölçüm, nörotipik: %5 uyaranda yanıt 0,08'den 0,19'a çıkar, %90 uyaranda 0,99'dan 0,62'ye iner. | Kısmi agonist, dopamine göre etkinlik %25-90 (Burris 2002, doi:10.1124/jpet.102.033175; yazarlar BMS çalışanı). 15 sağlıklı erkekte işgal %40-95, %90 üzerinde EPS yok (Yokoi 2002, doi:10.1016/S0893-133X(02)00304-4). | %85 işgal, %30 içsel etkinlik (kaynak aralığının alt ucuna yakın), sinyal sıklığı (`tone`), süre. `tone` değeri "az dopaminde artış, çok dopaminde azalış" görülecek biçimde ayarlandı, kaynaktan türetilmedi. Sinyal sıklığı reseptör sayısına değil işgal oranına bağlandı. 5-HT1A ve 5-HT2A etkileri, akatizi modellenmedi. |
| Metilfenidat dozu (`MPH_DOSE`, `mphDose`) | Düşük: blokaj %40, hız ×0,7, uyku ×1,2, geri tepme ×1,15. Orta: özgün değerler (%85, ×0,3, ×1,5, ×1,3). Yüksek: %90, ×0,25, uyku ×2, geri tepme ×1,5, eşik ×1,2. | DAT işgali 5 mg %12, 10 mg %40, 20 mg %54, 40 mg %72, 60 mg %74 (Volkow 1998, doi:10.1176/ajp.155.10.1325; 7 sağlıklı erişkin). Sıçanda düşük doz PFK'de NA ve DA'yı artırır (Berridge 2006, doi:10.1016/j.biopsych.2006.04.022); yalnızca düşük doz PFK nöron yanıt verirliğini artırır, yüksek doz baskılar (Devilbiss ve Berridge 2008, doi:10.1016/j.biopsych.2008.04.037). | Düşük ayarın %40'ı Volkow'un 10 mg değeridir. Özgün modelin %85'i Volkow'un ölçtüğü en yüksek değerin (%74) üzerindedir, bu yüzden ayarlar mg karşılığı değildir. Yüksek ayardaki bütün ek maliyetler temsilidir. Sıçan PFK bulgusu çocuklardaki klinik doz yanıtına aktarılamaz. |

Ölçülen sonuç (DEHB modu, %20 uyaran, 55 sn): ilaçsız 0,11; düşük 0,32; orta 0,34; yüksek 0,15. Ters U biçimi yüksek ayara eklenen temsili eşik ve uyku değerlerinden doğar.

Dosyalar: `js/model.js` (`MEDS.ari`, `MPH_DOSE`, `syncDrugReceptors()`, `freeD2()`, `setMphDose()`), `js/render.js`, `js/ui.js`, `index.html`, `css/style.css`, `i18n/*.js` (13 yeni anahtar, `t.aps.b` yeniden yazıldı), `js/uyarlama.js`, `tests/run.js` (toplam 148 denetim).

## Kaynaklar

"Model ve gerçeklik" sayfasındaki on kaynak özgün yazarın seçimidir. Künyeleri (dergi, yıl, cilt, ilk sayfa, ilk yazar) Kasım 2026'da PubMed kayıtlarıyla eşleştirildi; metinlerdeki sayısal aktarımlar tek tek kaynak makalelerle karşılaştırılmadı.

## Tıbbi uyarı

Bu sayfa eğitim amaçlıdır. Tanı koymaz, tedavi önermez, hekim muayenesinin yerini tutmaz.

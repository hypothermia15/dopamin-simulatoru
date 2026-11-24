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

Simülasyon modeli (`js/model.js`), çizim ve öteki on bir dilin sözlükleri değiştirilmedi. `node tests/run.js` özgün testleri çalıştırır.

## Uyarlayanın notları neden var

Simülasyon farklar görünsün diye sayıları bilerek abartır; özgün yazar bunu "Model ve gerçeklik" sayfasında açıkça belirtir. Türkçe sürüm aileler ve öğrenciler için yayımlandığından dört noktaya ayrıca not düşüldü: DEHB tek bir dopamin farkına indirgenemez; ilaç kararı hekimle verilir; kafein ve egzersiz tedavi değildir; "kolay ödüller" bölümü bir benzetmedir.

## 24 Kasım 2026: ekran ve oyun için kanıt notu

"Nasıl çalışır" sayfasındaki uyarlayan notlarına beşinci bir madde eklendi (`js/uyarlama.js`). Simülasyonda egzersiz, kısa video kaydırma ve video oyunları zaten vardır (Egzersiz düğmesi, "Kolay ödüller" düğmesi, Çocuk modundaki "Oyun" etkinliği); yeni düğme eklenmedi ve model değiştirilmedi. Not, kısa video ve sorunlu oyun oynama için dört kaynağın bulgularını özetler ve bunların ilişki düzeyinde olduğunu, reseptör ölçmediğini belirtir: Tang ve ark. 2026 (doi:10.2196/82503), Conte ve ark. 2025 (doi:10.1007/s00787-024-02581-w), Ostinelli ve ark. 2021 (doi:10.1016/j.jad.2021.02.014), Kristensen ve ark. 2021 (doi:10.3389/fpsyt.2021.675237). Künyeler ve özetler PubMed kayıtlarından alındı. Egzersiz için DEHB'ye özgü kaynak taranmadı.

## Kaynaklar

"Model ve gerçeklik" sayfasındaki on kaynak özgün yazarın seçimidir. Künyeleri (dergi, yıl, cilt, ilk sayfa, ilk yazar) Kasım 2026'da PubMed kayıtlarıyla eşleştirildi; metinlerdeki sayısal aktarımlar tek tek kaynak makalelerle karşılaştırılmadı.

## Tıbbi uyarı

Bu sayfa eğitim amaçlıdır. Tanı koymaz, tedavi önermez, hekim muayenesinin yerini tutmaz.

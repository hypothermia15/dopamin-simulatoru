const { test, expect } = require('@playwright/test');

test.describe('karsilastir.html smoke tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/karsilastir.html');
    await expect(page.locator('#k-hazir button').first()).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#k-chipler-0 .k-chip')).toContainText(['Beyin: DEHB']);
    await expect(page.locator('#k-chipler-1 .k-chip')).toContainText(['Beyin: DEHB', 'Metilfenidat, kısa etkili']);
  });

  test('eşleştirilmiş mod aynı seed ile başlar', async ({ page }) => {
    const seeds = await page.locator('iframe').evaluateAll(frames =>
      frames.map(f => new URL(f.src).searchParams.get('seed'))
    );
    expect(seeds).toEqual(['20261125', '20261125']);
    await expect(page.locator('#k-rng')).toHaveValue('paired');
  });

  test('yaş kontrolü iki gömülü modele de uygulanır', async ({ page }) => {
    await page.locator('#k-yas').fill('12');
    await page.locator('#k-yas').dispatchEvent('input');
    await expect(page.locator('#k-yas-deger')).toHaveText('12');
    const states = await Promise.all([
      page.frames()[1].evaluate(() => comparisonState()),
      page.frames()[2].evaluate(() => comparisonState())
    ]);
    expect(states.map(s => s.age)).toEqual([12, 12]);
  });

  test('elle müdahale preset seçimini kaldırır ve chip ekler', async ({ page }) => {
    await page.locator('#k-sec-0').selectOption('iron');
    await page.locator('[data-uygula="0"]').click();
    await expect(page.locator('#k-ad-0')).toContainText('Özel koşul');
    await expect(page.locator('#k-chipler-0')).toContainText('Demir eksikliği');
    await expect(page.locator('#k-hazir button[aria-pressed="true"]')).toHaveCount(0);
  });

  test('iki taraf birlikte durur ve devam eder', async ({ page }) => {
    await page.locator('#k-durdur').click();
    await expect(page.locator('#k-durdur')).toHaveAttribute('aria-pressed', 'true');
    const paused = await Promise.all([
      page.frames()[1].evaluate(() => getComparisonPaused()),
      page.frames()[2].evaluate(() => getComparisonPaused())
    ]);
    expect(paused).toEqual([true, true]);

    await page.locator('#k-durdur').click();
    await expect(page.locator('#k-durdur')).toHaveAttribute('aria-pressed', 'false');
  });

  test('anlık metrik listeleri kaldırılmıştır', async ({ page }) => {
    await expect(page.locator('.k-oku')).toHaveCount(0);
    await expect(page.locator('#k-ort-table tbody tr')).toHaveCount(4);
  });

  for (const width of [1280, 390]) {
    test(`iframe bilgi kartlarını kesmez (${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/karsilastir.html');
      await expect(page.locator('#k-hazir button').first()).toHaveAttribute('aria-pressed', 'true');
      await page.waitForTimeout(800);
      for (const id of ['#k-cerceve-0', '#k-cerceve-1']) {
        const frame = page.locator(id);
        const sizes = await frame.evaluate(el => ({
          iframe: el.getBoundingClientRect().height,
          content: el.contentDocument.getElementById('stage').scrollHeight
        }));
        expect(sizes.iframe).toBeGreaterThanOrEqual(sizes.content - 2);
      }
    });
  }

  test('10 saniyelik özet tablosu veri üretir', async ({ page }) => {
    await expect(page.locator('#k-ort-table tbody tr')).toHaveCount(4);
    await page.waitForTimeout(1200);
    const firstRow = page.locator('#k-ort-table tbody tr').first();
    await expect(firstRow.locator('td').nth(1)).not.toHaveText('—');
    await expect(firstRow.locator('td').nth(2)).not.toHaveText('—');
  });
});

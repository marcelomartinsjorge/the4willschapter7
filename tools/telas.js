// fotos de páginas com imagem nova: node tools/telas.js <porta> <pasta> id1 id2 ...
const { chromium } = require('playwright');
(async () => {
  const [porta, out, ...ids] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const erros = []; page.on('pageerror', (e) => erros.push(e.message));
  await page.addInitScript(() => { localStorage.clear(); localStorage.setItem('livro_lang', 'pt'); window.__LEITURA_K = .2; });
  await page.goto(`http://localhost:${porta}/index.html`); await page.waitForTimeout(800);
  await page.click('#cvGo'); await page.waitForTimeout(700); await page.evaluate(() => document.getElementById('intertitulo').click());
  for (const id of ids) {
    await page.evaluate((id) => window.__LIVRO.ir(id), id); await page.waitForTimeout(2600);
    for (let i = 0; i < 4; i++) await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => /Continuar/.test(x.textContent) && x.offsetParent); if (b) b.click(); }), await page.waitForTimeout(500);
    await page.screenshot({ path: `${out}/${id}.png` });
  }
  console.log('erros:', erros.length ? erros : 'nenhum'); await browser.close();
})();

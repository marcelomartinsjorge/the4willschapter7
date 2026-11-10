// foto do interrogatório e de uma noite (rótulos das frases): node tools/telas3.js <porta> <pasta>
const { chromium } = require('playwright');
(async () => {
  const [porta, out] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const erros = []; page.on('pageerror', (e) => erros.push(e.message));
  await page.addInitScript(() => { localStorage.clear(); localStorage.setItem('livro_lang', 'pt'); window.__LEITURA_K = .05; });
  await page.goto(`http://localhost:${porta}/index.html`); await page.waitForTimeout(800);
  await page.click('#cvGo'); await page.waitForTimeout(700); await page.evaluate(() => document.getElementById('intertitulo').click());
  await page.evaluate(() => { const st = window.__LIVRO.st; st.escolhas.carcereiro = 'garrick'; st.colecao.push('garrick', 'sargento', 'sarnai'); window.__LIVRO.ir('c04'); });
  await page.waitForTimeout(2500);
  for (let i = 0; i < 5; i++) { await page.evaluate(() => { const b = document.querySelector('.portao-btn'); if (b) b.click(); }); await page.waitForTimeout(300); }
  await page.click('#mgGo').catch(() => {}); await page.waitForTimeout(4500);
  await page.screenshot({ path: out + '/iq.png' });
  console.log('erros:', erros.length ? erros : 'nenhum'); await browser.close();
})();

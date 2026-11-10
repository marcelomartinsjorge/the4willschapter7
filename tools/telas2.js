// confere textos de páginas com estado montado: node tools/telas2.js <porta> <pasta>
const { chromium } = require('playwright');
(async () => {
  const [porta, out] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const erros = []; page.on('pageerror', (e) => erros.push(e.message));
  await page.addInitScript(() => { localStorage.clear(); localStorage.setItem('livro_lang', 'pt'); window.__LEITURA_K = .05; });
  await page.goto(`http://localhost:${porta}/index.html`); await page.waitForTimeout(800);
  await page.click('#cvGo'); await page.waitForTimeout(700); await page.evaluate(() => document.getElementById('intertitulo').click());
  const ir = async (id, prep) => {
    await page.evaluate(([id, prep]) => { const st = window.__LIVRO.st; if (prep) new Function('st', prep)(st); window.__LIVRO.ir(id); }, [id, prep || '']);
    await page.waitForTimeout(2200);
    for (let i = 0; i < 6; i++) { await page.evaluate(() => { const b = document.querySelector('.portao-btn'); if (b) b.click(); }); await page.waitForTimeout(300); }
    await page.waitForTimeout(800);
    const t = await page.evaluate(() => document.getElementById('ptext').innerText + '\n[opções] ' + [...document.querySelectorAll('#choices .opt')].map((b) => b.innerText.replace(/\n/g, ' ')).join(' | '));
    console.log('==== ' + id + '\n' + t);
  };
  await ir('a11', "st.f.resp_rota = true; st.f.resp_vivos = true;");
  await ir('a11b');
  await ir('b01', "st.escolhas.tripulacao = 'maru,brann,lio'; st.jogos.tripulacao = { escolhidos: ['maru','brann','lio'] };");
  await ir('c01'); await page.evaluate(() => { const b = document.getElementById('next'); b && !b.disabled && b.click(); }); await page.waitForTimeout(1200); await page.screenshot({ path: out + '/c01-opcoes.png' });
  await ir('c03b', "st.escolhas.carcereiro = 'wim'; st.escolhas.carcereiro2 = 'garrick'; if (!st.colecao.includes('hobb')) st.colecao.push('hobb');");
  await ir('c05');
  await ir('n2d', "st.escolhas.alvo1 = 'circulo'; st.jogos.noite1 = { resultado: 'cheia' };");
  await ir('n2d', "st.escolhas.alvo1 = 'joseph'; st.jogos.noite1 = { resultado: 'meia' };");
  await ir('n2a', "st.jogos.noite1 = { resultado: 'cheia' };");
  await ir('n3a', "st.jogos.noite1 = { resultado: 'cheia' }; st.jogos.noite2 = { resultado: 'cheia' };");
  await ir('n1o', "st.escolhas.alvo1 = 'mapas'; st.escolhas.masc1 = 'edric'; st.escolhas.traje1 = 'roubar'; st.jogos.noite1 = { resultado: 'meia', ordem: [1,3,2,5,4] }; st.feitos['mg:n1o'] = 1;");
  await ir('n1o', "st.escolhas.traje1 = 'matar'; st.jogos.noite1 = { resultado: 'nada', ordem: [4,1,2,3,5] };");
  console.log('erros:', erros.length ? erros : 'nenhum'); await browser.close();
})();

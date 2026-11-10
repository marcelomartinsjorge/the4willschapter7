// O robô do livro: joga o capítulo inteiro numa rota (escolhas sorteadas com semente) e acusa erro de script.
// Uso: node tools/robo.js <porta> <semente> [estadoAntes-json]
const { chromium } = require('playwright');
(async () => {
  const porta = process.argv[2] || 8737, semente = +(process.argv[3] || 1), antes = process.argv[4] || '{}';
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const erros = [];
  page.on('pageerror', (e) => erros.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource|net::ERR|404/.test(m.text())) erros.push('console: ' + m.text()); });
  await page.addInitScript(([antes, semente]) => {
    localStorage.clear(); localStorage.setItem('aqv_estado', antes); localStorage.setItem('livro_lang', semente % 2 ? 'pt' : 'en');
    window.__JOGO_BOT = true; window.__LEITURA_K = .05;
    let s = semente * 9301 + 49297; window.__rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }, [antes, semente]);
  await page.goto(`http://localhost:${porta}/index.html`);
  await page.click('#cvGo');
  await page.waitForTimeout(600);
  await page.evaluate(() => { const i = document.getElementById('intertitulo'); i && i.click(); });
  const vistas = new Set(); let passos = 0;
  while (passos++ < 900) {
    const estado = await page.evaluate(() => {
      if (document.getElementById('resumo').classList.contains('show')) return { fim: true };
      const L = window.__LIVRO; const p = window.LIVRO.paginas[L.st.i];
      const pb = document.querySelector('.portao-btn'); if (pb) { pb.click(); return { acao: 'portao', id: p.id }; }
      const opts = [...document.querySelectorAll('#choices .opt:not(:disabled):not(.jogar)')];
      if (opts.length) { const o = opts[Math.floor(window.__rnd() * opts.length)]; o.click(); return { acao: 'opt', id: p.id, txt: o.textContent.slice(0, 40) }; }
      const go = document.getElementById('mgGo'); if (go) { go.click(); return { acao: 'jogo', id: p.id }; }
      const nx = document.getElementById('next'); if (!nx.disabled) { nx.click(); return { acao: 'next', id: p.id }; }
      return { acao: 'espera', id: p.id };
    });
    if (estado.fim) break;
    vistas.add(estado.id);
    await page.waitForTimeout(estado.acao === 'jogo' ? 1500 : estado.acao === 'espera' ? 300 : 160);
  }
  const res = await page.evaluate(() => ({ st: window.__LIVRO.st, fim: document.getElementById('resumo').classList.contains('show'), frase: document.getElementById('rsFrase').textContent, notas: [...document.querySelectorAll('#rsRel li')].map((l) => l.textContent), pil: [...document.querySelectorAll('.rs-pilar')].map((l) => l.textContent) }));
  console.log(JSON.stringify({ semente, fim: res.fim, paginas: vistas.size, passos, escolhas: res.st.escolhas, jogos: Object.fromEntries(Object.entries(res.st.jogos).map(([k, v]) => [k, v.resultado || v.quando || v.termos || (v.escolhidos || v.ouvidos || []).join(',') || v.toques])), tom: res.st.tom, alarme: res.st.alarme, colecao: res.st.colecao.length, frase: res.frase, pilares: res.pil, notas: res.notas, erros }, null, 1));
  await browser.close();
})();

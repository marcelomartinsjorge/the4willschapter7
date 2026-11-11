/* ==========================================================================
   Capítulo VII · os momentos de jogo da Madrinha (sem sprite: retrato, texto e dedo)
   OUVIR         · escolher quem ouvir; o tempo não dá para todos (Alvena, os três dias)
   TRIPULAÇÃO    · três de cinco, e o barco é pequeno
   ABRIR A MÃO   · um toque só; o jogador escolhe quando (antes ou depois da salva)
   A MORTA       · não tocar em nada; cada toque é ela se mexendo
   O ANZOL       · fazer o outro dizer a frase de ouro (porta, pergunta, silêncio, direto)
   A LÂMINA      · o Anzol ao contrário: a frase de ouro dela e a vermelha da Laura
   A ORDEM       · cinco papéis verdadeiros; só a ordem muda o sentido
   Cada jogo recebe (root, ctx) e devolve uma Promise com o resultado.
   Nenhum tem derrota. O que muda é o custo, o tom e a pontuação.
   ========================================================================== */
(() => {
'use strict';
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const BOT = () => !!window.__JOGO_BOT;
const espera = (ms) => new Promise((r) => setTimeout(r, BOT() ? Math.min(ms, 40) : ms));
const val = (x, st) => (typeof x === 'function' ? x(st) : x);
const lista = (x, st) => [].concat(val(x, st) || []).map((y) => val(y, st)).flat().filter(Boolean);
const R = () => (window.__rnd ? window.__rnd() : 0);
const sorteio = (a) => (window.__rnd ? a[Math.floor(window.__rnd() * a.length)] : null);
const bg = (c, id) => `url('${c.rostoImg(id)}'), url('assets/images/rostos/sem-rosto.svg')`;

function fundo(root, img, extra = '') {
  root.insertAdjacentHTML('beforeend', `<div class="j7-bg ${extra}" style="background-image:url('${img}')"></div><div class="j7-veu"></div>`);
}
// o texto que vai entrando, uma linha de cada vez (falas com travessão ganham outra cor)
function linhas(el, arr, c, cls = '') {
  arr.forEach((t, i) => {
    const s = c.sub(c.tr(t)); const p = document.createElement('p');
    p.className = (s.startsWith('—') ? 'dlg ' : '') + cls; p.textContent = s; p.style.animationDelay = (i * .45) + 's';
    el.appendChild(p);
  });
}

// ================================================================== OUVIR · TRIPULAÇÃO (escolher N de M)
function escolhe(root, c, cfg, modo) {
  const { st, U, A } = c, J = U('j');
  const gente = val(cfg.gente, st);
  return new Promise((resolve) => {
    root.classList.add('j7-escolhe', modo);
    const pergs = (cfg.perguntas || []).map((q) => `<li data-q="${q.id}" class="${st.f['resp_' + q.id] ? 'ok' : ''}">${c.esc(c.tr(q.t))}</li>`).join('');
    root.insertAdjacentHTML('beforeend', `<div class="es-in"><p class="es-t">${c.esc(c.tr(cfg.titulo || ''))}</p>${pergs ? `<ul class="es-perg">${pergs}</ul>` : ''}<p class="es-conta"></p><div class="es-grade"></div><div class="es-fala" aria-live="polite"></div><div class="es-acoes"></div></div>`);
    const grade = root.querySelector('.es-grade'), fala = root.querySelector('.es-fala'), conta = root.querySelector('.es-conta'), acoes = root.querySelector('.es-acoes');
    const sel = [];
    const redesenha = () => {
      const falta = cfg.pick - sel.length;
      conta.textContent = modo === 'trip' ? (falta > 0 ? J.faltam(falta) : '') : (falta > 0 ? J.sobra(falta) : '');
      grade.querySelectorAll('.es-c').forEach((b) => {
        const on = sel.includes(b.dataset.id); b.classList.toggle('sel', on);
        b.classList.toggle('sem-tempo', modo !== 'trip' && !on && falta <= 0);
        b.disabled = modo !== 'trip' && (on || falta <= 0);
      });
      acoes.innerHTML = falta <= 0 ? `<button class="cta es-ok">${c.esc(modo === 'trip' ? J.zarpar : J.seguir)}</button>` : '';
      const ok = acoes.querySelector('.es-ok');
      if (ok) ok.onclick = () => {
        if (modo === 'trip') sel.forEach((id, i) => setTimeout(() => c.guarda(id), i * 500));
        resolve(modo === 'trip' ? { escolhidos: sel.slice() } : { ouvidos: sel.slice() });
      };
    };
    gente.forEach((g) => {
      const b = document.createElement('button'); b.className = 'es-c'; b.dataset.id = g.id; b.type = 'button';
      b.innerHTML = `<i class="es-r" style="background-image:${bg(c, g.id)}"></i><span>${c.esc(c.tr(g.rotulo))}</span>${modo === 'trip' ? `<small>${c.esc(c.sub(c.tr(lista(g.fala, st)[0])))}</small>` : ''}`;
      b.onclick = () => {
        if (modo === 'trip') {
          const i = sel.indexOf(g.id);
          if (i >= 0) sel.splice(i, 1); else if (sel.length < cfg.pick) sel.push(g.id);
          A.escolha(); redesenha(); return;
        }
        if (sel.length >= cfg.pick || sel.includes(g.id)) return;
        sel.push(g.id); A.escolha();
        fala.innerHTML = ''; linhas(fala, lista(g.fala, st), c); fala.classList.remove('on'); void fala.offsetWidth; fala.classList.add('on');
        setTimeout(() => c.guarda(g.id), 700);
        if (g.flag) st.f[g.flag] = true;
        [].concat(g.responde || []).forEach((q) => { st.f['resp_' + q] = true; const li = root.querySelector(`.es-perg li[data-q="${q}"]`); if (li && !li.classList.contains('ok')) setTimeout(() => { li.classList.add('ok'); A.tone && A.tone(660, .25, 'sine', .03); }, 1200); });
        if (g.frase) setTimeout(() => c.fraseAcende(g.frase), 1500);
        c.salvar(); redesenha();
      };
      grade.appendChild(b);
    });
    redesenha();
    if (BOT()) setTimeout(() => { const bs = [...grade.querySelectorAll('.es-c')].sort(() => (window.__rnd ? R() - .5 : 0)); bs.slice(0, cfg.pick).forEach((b, i) => setTimeout(() => b.click(), 30 + i * 30)); setTimeout(() => { const ok = root.querySelector('.es-ok'); ok && ok.click(); }, 60 + cfg.pick * 40); }, 60);
  });
}
const escuta = (root, c) => escolhe(root, c, c.L.escuta[c.p.jogoId], 'ouvir');
const tripulacao = (root, c) => escolhe(root, c, Object.assign({ titulo: c.L.tripulacao.titulo }, c.L.tripulacao), 'trip');

// ================================================================== ABRIR A MÃO
// Os besteiros erguem as armas (uns 5 s). Depois vem a salva sobre o barco. Um toque, quando o jogador quiser.
// Antes da salva, a água dela leva a tripulação; depois, já foram as bestas. Depois do toque, dez segundos sem controle.
function mao(root, c) {
  const { A, L } = c, cfg = L.mao;
  return new Promise((resolve) => {
    fundo(root, cfg.img, 'mo-bg');
    // o vídeo dela conjurando, se existir, fica atrás da concentração
    if (cfg.videoConj && !BOT()) { const v = document.createElement('video'); v.className = 'mo-conj'; v.muted = true; v.playsInline = true; v.loop = true; v.autoplay = true; v.src = c.vsrc ? c.vsrc(cfg.videoConj) : cfg.videoConj; v.onerror = () => v.remove(); root.appendChild(v); v.play().then(() => v.classList.add('on')).catch(() => v.remove()); }
    root.insertAdjacentHTML('beforeend', `<div class="mo-campo"></div><div class="mo-barra"><i></i></div><p class="mo-dica">${c.esc(c.tr(cfg.dica))}</p><div class="mo-pede"><p>${c.esc(c.tr(cfg.pede))}</p><button class="mo-mao" type="button" aria-label="${c.esc(c.tr(cfg.pede))}"><svg viewBox="0 0 64 64"><path d="M20 40V18a4 4 0 0 1 8 0v14M28 30V12a4 4 0 0 1 8 0v18M36 30V14a4 4 0 0 1 8 0v20M44 34V22a4 4 0 0 1 8 0v18c0 10-7 18-17 18h-3c-6 0-10-3-13-7l-7-10a4 4 0 0 1 6-5l6 6"/></svg></button></div><p class="mo-msg" aria-live="polite"></p><div class="mo-branco"></div>`);
    const msg = root.querySelector('.mo-msg'), btn = root.querySelector('.mo-mao'), campo = root.querySelector('.mo-campo'), barra = root.querySelector('.mo-barra i'), dica = root.querySelector('.mo-dica');
    let t0 = performance.now(), salva = false, feito = false, cheia = false, carga = 0, pesou = false, acertos = 0, erros = 0, perdidos = 0;
    const timers = [], pausa = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    root.classList.add('ergue', 'concentra'); A.sfx('bestas-erguem', .5, () => A.hiss(1.2, 800, .5, .04));
    msg.textContent = c.tr(cfg.conc);
    // ---- concentrar: o ouro sobe do fundo; o vermelho é o convés (setas, gritos)
    const desenha = () => { barra.style.width = carga + '%'; root.style.setProperty('--carga', (carga / 100).toFixed(3)); };
    // os sons do jogo: o acerto é uma gota que afina conforme o mar sobe; o erro é o convés batendo; o perdido, a água escorrendo
    const som = {
      gota: () => { const f = 420 + carga * 6; A.tone(f, .35, 'sine', .11); A.tone(f * 1.5, .5, 'sine', .06, .05); A.tone(f * 2, .3, 'triangle', .025, .1); A.hiss(.25, 900 + carga * 20, .8, .05, 0, 'lowpass'); },
      convés: () => { A.tone(95, .45, 'square', .09, 0, .5); A.tone(60, .7, 'sine', .14); A.hiss(.18, 2400, .5, .12); },
      perdeu: () => { A.tone(300, .4, 'sine', .035, 0, .6); },
      degrau: (n) => { [0, 4, 7].forEach((st_, j) => A.tone(196 * Math.pow(2, (st_ + n * 2) / 12), 1.4, 'sine', .05, j * .09)); A.hiss(1.2, 400, .5, .08, 0, 'lowpass'); },
    };
    let degraus = 0;
    const muda = (d) => {
      if (cheia) return; carga = Math.max(0, Math.min(100, carga + d)); desenha();
      const n = Math.floor(carga / 25); if (n > degraus) { degraus = n; if (n < 4) som.degrau(n); }
      if (!pesou && carga >= 80) { pesou = true; root.classList.add('pesa'); msg.textContent = c.tr(cfg.pesa); A.tone && A.tone(70, 1.6, 'sine', .05, 0, .5); }
      if (carga >= 100) enche();
    };
    const nasce = () => {
      if (cheia || feito) return;
      const k = carga / 100, vida = 2600 - 1300 * k, vermelho = !BOT() && Math.random() < .05 + .22 * k;
      const ativos = campo.querySelectorAll('.mo-g:not(.foi)').length;
      if (ativos < 2 + Math.round(2 * k)) {
        const g = document.createElement('button'); g.type = 'button'; g.className = 'mo-g' + (vermelho ? ' verm' : '');
        g.style.left = (12 + Math.random() * 76) + '%'; g.style.top = (22 + Math.random() * 52) + '%'; g.style.setProperty('--vida', vida + 'ms');
        g.setAttribute('aria-label', vermelho ? 'convés' : 'água');
        let foi = false;
        const some = () => { if (foi) return; foi = true; g.classList.add('foi'); setTimeout(() => g.remove(), 400); };
        g.onpointerdown = (e) => {
          e.stopPropagation(); e.preventDefault(); if (foi) return;
          if (vermelho) { erros++; muda(-15); root.classList.remove('treme'); void root.offsetWidth; root.classList.add('treme'); som.convés(); }
          else { acertos++; muda(9); som.gota(); }
          g.classList.add(vermelho ? 'errou' : 'pegou'); some();
        };
        campo.appendChild(g);
        setTimeout(() => { if (!foi) { if (!vermelho) { perdidos++; muda(-2); som.perdeu(); } some(); } }, vida);
      }
      pausa(nasce, 900 - 450 * k);
    };
    const enche = () => {
      if (cheia) return; cheia = true; root.classList.remove('concentra'); root.classList.add('cheia');
      campo.querySelectorAll('.mo-g').forEach((g) => g.remove()); dica.style.opacity = 0;
      msg.textContent = salva ? c.tr(cfg.gritos) : c.tr(cfg.segura);
      A.tone && A.tone(55, 2.4, 'sine', .07, 0, .6);
      pausa(abre, 12000);   // segurar tem limite: depois de um tempo, a água sai sozinha
    };
    // a salva vem quando vier; se ela ainda está juntando a água, a tripulação já está no chão quando ela soltar
    pausa(() => {
      if (feito) return; salva = true; root.classList.add('salva');
      msg.textContent = c.tr(cfg.salva); A.sfx('salva-bestas', .8, () => { for (let i = 0; i < 9; i++) A.hiss(.12, 2600, .9, .06, i * .05); });
      pausa(() => { if (!feito) { msg.textContent = c.tr(cfg.gritos); A.sfx('gritos-tripulacao', .5); } }, 1800);
    }, cfg.salvaMs || 22000);
    // ela é a Madrinha: mesmo distraída, a água vem. Depois da salva, a carga sobe sozinha devagar
    const sobe = setInterval(() => { if (salva && !cheia && !feito) muda(1.5); }, 300);
    const abre = () => {
      if (feito || !cheia) return; feito = true; timers.forEach(clearTimeout); clearInterval(sobe);
      const quando = salva ? 'tarde' : 'cedo'; c.registrar('abrir_mao', quando); c.registrar('mao_conc', acertos + '/' + erros + '/' + perdidos);
      root.classList.add('aberta'); btn.disabled = true; msg.textContent = '';
      A.duck(true); A.sfx('mar-para', .7, () => A.tone(55, 3, 'sine', .08, 0, .6));
      setTimeout(() => { root.classList.add('puxa'); A.sfx('mar-recua', .8, () => A.hiss(3, 300, .5, .2, 0, 'lowpass')); }, BOT() ? 10 : 1800);
      if (cfg.video && !BOT()) setTimeout(() => { const v = document.createElement('video'); v.className = 'mo-video'; v.muted = true; v.playsInline = true; v.autoplay = true; v.src = cfg.video; v.onerror = () => v.remove(); root.appendChild(v); v.play().then(() => v.classList.add('on')).catch(() => v.remove()); }, 1900);
      setTimeout(() => { root.classList.add('ruge'); A.sfx('onda-gigante', .95, () => { A.tone(40, 4, 'sawtooth', .12, 0, .5); A.hiss(4, 180, .4, .3, 0, 'lowpass'); }); }, BOT() ? 20 : 5100);
      setTimeout(() => { root.classList.add('branco'); }, BOT() ? 30 : 8500);
      setTimeout(() => { A.duck(false); resolve({ quando, ms: Math.round(performance.now() - t0), acertos, erros, perdidos }); }, BOT() ? 60 : 11300);
    };
    btn.onclick = abre;
    root.addEventListener('pointerdown', (e) => { if (!cheia || e.target === btn || btn.contains(e.target)) return; abre(); });
    const tecla = (e) => { if (cheia && (e.code === 'Space' || e.key === 'Enter')) { e.preventDefault(); removeEventListener('keydown', tecla); abre(); } };
    addEventListener('keydown', tecla);
    desenha();
    if (BOT()) { if (R() > .5) salva = true; carga = 99; setTimeout(() => { muda(5); abre(); }, 50); }
    else pausa(nasce, 1200);
  });
}

// ================================================================== A MORTA
// A página corre sozinha. Qualquer toque, clique ou tecla é ela se mexendo: o primeiro é de graça, o segundo dói.
function morta(root, c) {
  const { A, L, st } = c, cfg = Object.assign({}, L.morta, { falas: L.morta.falas.filter((f) => !f.se || f.se(st)) });
  return new Promise((resolve) => {
    fundo(root, cfg.img, 'mt-bg');
    root.insertAdjacentHTML('beforeend', '<div class="mt-ceu"></div><div class="mt-legenda" aria-live="polite"></div><div class="mt-dor"></div>');
    const leg = root.querySelector('.mt-legenda');
    let toques = 0, fim = false, pausa = 0, t = 0, last = performance.now(), prox = 0;
    const ouvidas = [], timers = [];
    const mostra = (txt, cls = '') => { const p = document.createElement('p'); p.className = cls; p.textContent = c.sub(c.tr(txt)); leg.appendChild(p); requestAnimationFrame(() => p.classList.add('on')); while (leg.children.length > 3) leg.firstElementChild.remove(); setTimeout(() => p.classList.add('velha'), 5200); };
    const acaba = () => {
      if (fim) return; fim = true; removeEventListener('keydown', mexe, true); timers.forEach(clearTimeout);
      c.registrar('morta_toques', String(toques));
      setTimeout(() => resolve({ toques, ouvidas: ouvidas.slice(), pontos: ouvidas.length }), BOT() ? 30 : 2600);
    };
    const mexe = (e) => {
      if (fim || t < .6) return;
      if (e && e.cancelable) e.preventDefault();
      toques++;
      if (toques === 1) {
        mostra(cfg.mexe1, 'ela'); setTimeout(() => mostra(cfg.mexe1b), 700); setTimeout(() => mostra(cfg.mexe1c, 'ela'), 1900);
        pausa = 3.2; A.sfx('passos-conves', .5, () => A.hiss(.3, 500, .6, .05));
      } else if (toques === 2) {
        mostra(cfg.mexe2); setTimeout(() => { mostra(cfg.mexe2b, 'ela'); root.classList.add('doi'); A.sfx('lanca-ferida', .8, () => { A.tone(110, .6, 'sawtooth', .07, 0, .5); A.hiss(.4, 1200, .5, .1); }); }, 900);
        setTimeout(acaba, 1400);
      }
    };
    root.addEventListener('pointerdown', mexe, true); addEventListener('keydown', mexe, true);
    if (BOT() && window.__rnd) { const n = Math.floor(R() * 3); for (let q = 0; q < n; q++) setTimeout(() => { t = Math.max(t, .7); mexe(); }, 120 + q * 160); }
    const loop = (now) => {
      if (fim || !root.isConnected) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      if (pausa > 0) pausa -= dt; else t += dt * (BOT() ? 12 : 1);
      while (prox < cfg.falas.length && t >= cfg.falas[prox].t) {
        const f = cfg.falas[prox++];
        mostra(f.txt); if (f.voz) c.narrate(f.voz, true);
        if (f.card) { ouvidas.push(f.card); timers.push(setTimeout(() => c.guarda(f.card), 900)); }
        if (f.frase && !st.f.fraseBoca) timers.push(setTimeout(() => c.fraseAcende(f.frase), 1800));
      }
      if (t >= cfg.dura) return acaba();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame((n) => { last = n; loop(n); });
  });
}

// ================================================================== O ANZOL
// No alto, a frase de ouro com as palavras escondidas. A cada fala do alvo, uma resposta: as palavras acendem
// (porta e pergunta), o silêncio funciona com quem fala demais, e o direto apaga duas e deixa uma farpa.
// Duas farpas e ele fecha a conversa. No fim, com a frase quase toda acesa, ele a diz em voz alta.
const MAXU = 8;
function frasePalavras(t, c) { return c.sub(c.tr(t)).replace(/[.!?]$/, '').split(/\s+/); }
function anzol(root, c) {
  const { st, L, A, U } = c, J = U('j');
  const k = +String(c.p.jogoId).replace(/\D/g, '') || 1;
  const alvo = L.alvoNoite(st, k), cfg = L.anzol[alvo], masc = L.mascNoite(st, k);
  return new Promise((resolve) => {
    fundo(root, cfg.img, 'az-bg');
    const ws = frasePalavras(cfg.ideia, c);
    root.insertAdjacentHTML('beforeend', `<div class="az-ouro" aria-label="${c.esc(c.tr(cfg.ideia))}"><small class="iq-rot az-rot">${c.esc(U('anzolOuro'))}</small>${ws.map((w, i) => `<span class="aw" style="--i:${i}">${c.esc(w)}</span>`).join(' ')}</div>
      <div class="az-in"><p class="az-quem">${c.esc(c.tr(cfg.lugar))}</p><div class="az-log" aria-live="polite"></div><div class="az-ops"></div></div>`);
    const log = root.querySelector('.az-log'), ops = root.querySelector('.az-ops'), spans = [...root.querySelectorAll('.aw')];
    let u = cfg.mascaras && cfg.mascaras[masc] ? cfg.mascaras[masc] : 0, farpas = 0, i = 0;
    const acende = (antes) => {
      const n = clamp(Math.round((clamp(u, 0, MAXU) / MAXU) * ws.length), 0, ws.length);
      spans.forEach((s, j) => { const on = j < n; if (on && !s.classList.contains('on')) { s.classList.add('on'); A.tone(660 + j * 40, .4, 'sine', .02); } if (!on && s.classList.contains('on')) { s.classList.remove('on'); s.classList.add('apaga'); setTimeout(() => s.classList.remove('apaga'), 900); } });
      return n;
    };
    acende();
    const terminar = (fechou) => {
      const f = clamp(u, 0, MAXU) / MAXU;
      const resultado = fechou ? 'nada' : f >= .75 ? 'cheia' : f >= .375 ? 'meia' : 'nada';
      ops.innerHTML = '';
      if (resultado === 'cheia') { u = MAXU; acende(); root.classList.add('diz'); A.ouro && A.ouro(.06); }
      c.registrar('anzol_' + alvo, resultado);
      setTimeout(() => { ops.innerHTML = `<button class="cta az-fim">${c.esc(J.seguir)}</button>`; ops.querySelector('.az-fim').onclick = () => resolve({ resultado, u, farpas, alvo, mascara: masc }); if (BOT()) ops.querySelector('.az-fim').click(); }, BOT() ? 20 : 1400);
    };
    const troca = () => {
      if (i >= cfg.trocas.length) return terminar(false);
      const tr_ = cfg.trocas[i];
      [...log.children].forEach((x) => x.classList.add('velha'));
      while (log.children.length > 6) log.firstElementChild.remove();
      linhas(log, [tr_.fala], c, 'alvo');
      const vis = tr_.ops.filter((o) => (!o.se || o.se(st)) && (!o.de || c.st.colecao.includes(val(o.de, st))));
      ops.innerHTML = '';
      setTimeout(() => {
        vis.forEach((o, n) => {
          const b = document.createElement('button'); b.className = 'opt az-op t-' + o.tipo; b.type = 'button';
          const de = val(o.de, st);
          b.innerHTML = `<span class="k">${n + 1}</span>${de ? `<i class="rosto mini" style="background-image:${bg(c, de)}"></i>` : ''}<span class="tx">${o.tipo === 'silencio' ? `<em>${c.esc(U('silencioR'))}</em>` : '“' + c.esc(c.sub(c.tr(val(o.txt, st)))) + '”'}</span>`;
          b.onclick = () => escolhe(o);
          ops.appendChild(b);
        });
        if (BOT()) { const best = sorteio(vis) || vis.slice().sort((a, b) => b.u - a.u)[0]; setTimeout(() => escolhe(best), 20); }
      }, BOT() ? 10 : 700);
    };
    const tecla = (e) => { if (!root.isConnected) return removeEventListener('keydown', tecla); if (/^[1-6]$/.test(e.key)) { const b = ops.querySelectorAll('.az-op')[+e.key - 1]; b && b.click(); } };
    addEventListener('keydown', tecla);
    const escolhe = (o) => {
      ops.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      A.escolha(); c.registrar('anzol_' + alvo + '_' + i, o.id);
      if (o.tipo !== 'silencio') linhas(log, ['— ' + c.sub(c.tr(val(o.txt, st)))], c, 'ela');
      setTimeout(() => {
        linhas(log, lista(o.resp, st), c);
        u += o.u; if (o.tipo === 'direto') { farpas++; root.classList.remove('farpa'); void root.offsetWidth; root.classList.add('farpa'); A.tone(180, .7, 'sawtooth', .03, 0, .7); }
        acende(); i++;
        setTimeout(() => (farpas >= 2 ? terminar(true) : troca()), BOT() ? 10 : 1500 + lista(o.resp, st).length * 600);
      }, BOT() ? 10 : 600);
    };
    setTimeout(troca, BOT() ? 10 : 900);
  });
}

// ================================================================== A LÂMINA (o interrogatório)
// Duas frases: em ouro, em cima, o que ela quer ouvir da Laura; em vermelho, embaixo, o que a Laura quer concluir.
// Sem rosto emprestado, as orelhas falam: resposta mentirosa acende o vermelho sozinha.
function interrogatorio(root, c) {
  const { st, L, A, U } = c, cfg = L.interrogatorio, J = U('j');
  return new Promise((resolve) => {
    fundo(root, cfg.img, 'iq-bg');
    const wo = frasePalavras(cfg.ouro, c), wv = frasePalavras(cfg.verm, c);
    root.insertAdjacentHTML('beforeend', `<div class="az-ouro iq-o"><small class="iq-rot">${c.esc(U('iqOuro'))}</small>${wo.map((w, i) => `<span class="aw" style="--i:${i}">${c.esc(w)}</span>`).join(' ')}</div>
      <div class="az-in iq-in"><div class="az-log" aria-live="polite"></div><div class="az-ops"></div></div>
      <div class="iq-verm">${wv.map((w, i) => `<span class="vw" style="--i:${i}">${c.esc(w)}</span>`).join(' ')}<small class="iq-rot">${c.esc(U('iqVerm'))}</small></div><div class="iq-orelhas"><i></i><i></i></div>`);
    const log = root.querySelector('.az-log'), ops = root.querySelector('.az-ops'), so = [...root.querySelectorAll('.aw')], sv = [...root.querySelectorAll('.vw')];
    let ouro = 0, verm = 0, i = 0, disse = false; const flags = [];
    const MAXO = 10, MAXV = 6;
    const pinta = () => {
      const no = Math.round(clamp(ouro / MAXO, 0, 1) * wo.length), nv = Math.round(clamp(verm / MAXV, 0, 1) * wv.length);
      so.forEach((s, j) => s.classList.toggle('on', j < no)); sv.forEach((s, j) => { const on = j < nv; if (on && !s.classList.contains('on')) A.tone(150 - j * 6, .5, 'triangle', .025); s.classList.toggle('on', on); });
      root.classList.toggle('quente', verm >= 3);
    };
    pinta();
    const fim = () => {
      ops.innerHTML = '';
      // abaixo do limiar, a Lâmina não acredita: decreta a morte (a página volta ao começo do interrogatório)
      const faltam = (cfg.chaves || []).filter((k) => !flags.includes(k));
      const falta = faltam.length > 1 ? 'pouco' : faltam[0] || (cfg.limiar && ouro < cfg.limiar ? 'pouco' : null);
      st.f.iqFalta = falta;
      if (falta) {
        root.classList.add('morre'); A.tone(70, 2.2, 'sawtooth', .05, 0, 1.2);
        lista(cfg.morte, st).forEach((x, n) => setTimeout(() => linhas(log, [x], c, n === 0 || n === 3 ? 'nota' : 'alvo vermelha'), BOT() ? 5 : 700 + n * 1500));
        c.registrar('interrogatorio', 'morte');
        setTimeout(() => { ops.innerHTML = `<button class="cta az-fim">${c.esc(J.seguir)}</button>`; ops.querySelector('.az-fim').onclick = () => resolve({ ouro, verm, termos: 'argola', flags, morte: true }); if (BOT()) ops.querySelector('.az-fim').click(); }, BOT() ? 30 : 7400);
        return;
      }
      const termos = verm <= 2 ? 'palavra' : verm <= 5 ? 'sombra' : 'argola';
      // convencida, a Laura diz a frase de ouro com a boca dela
      ouro = MAXO; pinta(); root.classList.add('diz');
      setTimeout(() => { linhas(log, ['— ' + c.sub(c.tr(cfg.ouro))], c, 'alvo dourada'); A.ouro && A.ouro(.06); }, BOT() ? 10 : 900);
      c.registrar('interrogatorio', termos);
      setTimeout(() => { ops.innerHTML = `<button class="cta az-fim">${c.esc(J.seguir)}</button>`; ops.querySelector('.az-fim').onclick = () => resolve({ ouro, verm, termos, flags }); if (BOT()) ops.querySelector('.az-fim').click(); }, BOT() ? 30 : 3000);
    };
    const pergunta = () => {
      if (i >= cfg.perguntas.length) return fim();
      const q = cfg.perguntas[i];
      [...log.children].forEach((x) => x.classList.add('velha'));
      while (log.children.length > 6) log.firstElementChild.remove();
      linhas(log, [val(q.fala, st)], c, 'alvo'); if (q.voz) c.narrate(q.voz, true);
      const vis = q.ops.filter((o) => (!o.se || o.se(st)) && (!o.de || (val(o.de, st) && st.colecao.includes(val(o.de, st)))));
      ops.innerHTML = '';
      setTimeout(() => {
        vis.forEach((o, n) => {
          const b = document.createElement('button'); b.className = 'opt az-op'; b.type = 'button'; const de = val(o.de, st);
          b.innerHTML = `<span class="k">${n + 1}</span>${de ? `<i class="rosto mini" style="background-image:${bg(c, de)}"></i>` : ''}<span class="tx">${o.silencio ? `<em>${c.esc(U('silencioR'))}</em>` : '“' + c.esc(c.sub(c.tr(val(o.txt, st)))) + '”'}${de ? `<small class="de-txt">${c.esc(U('deTxt'))}: ${c.esc(c.nomeCard(de))}</small>` : ''}</span>`;
          b.onclick = () => responde(o); ops.appendChild(b);
        });
        if (BOT()) setTimeout(() => responde(sorteio(vis) || vis.slice().sort((a, b) => (b.ouro - b.verm) - (a.ouro - a.verm))[0]), 20);
      }, BOT() ? 10 : 1500);
    };
    const tecla = (e) => { if (!root.isConnected) return removeEventListener('keydown', tecla); if (/^[1-6]$/.test(e.key)) { const b = ops.querySelectorAll('.az-op')[+e.key - 1]; b && b.click(); } };
    addEventListener('keydown', tecla);
    const responde = (o) => {
      ops.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      A.escolha(); c.registrar('lamina_' + i, o.id); st.f['lam_' + o.id] = true;
      if (!o.silencio) linhas(log, ['— ' + c.sub(c.tr(val(o.txt, st)))], c, 'ela');
      if (o.flag) flags.push(...[].concat(o.flag));
      setTimeout(() => {
        if (o.mente) { verm += 1; linhas(log, [cfg.orelhas], c, 'nota'); root.classList.remove('orelha'); void root.offsetWidth; root.classList.add('orelha'); }
        linhas(log, lista(o.resp, st), c);
        const rg = cfg.reage || {};
        const reac = [(o.ouro || 0) >= 2 ? rg.ouro2 : (o.ouro || 0) === 1 ? rg.ouro1 : null, (o.verm || 0) >= 2 ? rg.verm2 : (o.verm || 0) === 1 && !o.mente ? rg.verm1 : null].filter(Boolean);
        if (reac.length) setTimeout(() => linhas(log, reac, c, 'nota'), BOT() ? 5 : 900);
        ouro += o.ouro || 0; verm += o.verm || 0; pinta();
        // o vermelho cheio: a Laura diz a frase dela
        if (verm >= MAXV && !disse) { disse = true; setTimeout(() => { linhas(log, ['— ' + c.sub(c.tr(cfg.verm))], c, 'alvo vermelha'); A.tone(98, 1.6, 'sawtooth', .04, 0, .8); }, BOT() ? 10 : 1400); }
        i++;
        setTimeout(pergunta, BOT() ? 20 : 2200 + lista(o.resp, st).length * 650 + (disse ? 1200 : 0));
      }, BOT() ? 10 : 700);
    };
    setTimeout(pergunta, BOT() ? 10 : 900);
  });
}

// ================================================================== A ORDEM (a Sala dos Mapas)
// Cinco papéis verdadeiros. Arrastar (ou as setas) muda a ordem em que o conselho vai ouvir. Nenhuma palavra muda.
function ordem(root, c) {
  const { L, A, U } = c, cfg = L.ordem, J = U('j');
  return new Promise((resolve) => {
    fundo(root, cfg.img, 'or-bg');
    root.insertAdjacentHTML('beforeend', `<div class="or-in"><p class="or-t">${c.esc(c.lang === 'en' ? 'The council will hear them top to bottom.' : 'O conselho vai ouvir de cima para baixo.')}</p>${c.st.f.dicaUltimo && cfg.dica ? `<p class="or-dica">${c.esc(c.tr(cfg.dica))}</p>` : ''}<ol class="or-lista"></ol><div class="or-acoes"><button class="cta or-ok">${c.esc(J.deixar)}</button></div></div>`);
    const ol = root.querySelector('.or-lista');
    let ordem_ = cfg.papeis.map((p) => p.id);
    const desenha = () => {
      ol.innerHTML = ordem_.map((id, n) => { const p = cfg.papeis.find((x) => x.id === id); return `<li class="or-p" data-id="${id}"><span class="or-n">${n + 1}</span><span class="or-tx">${c.esc(c.tr(p.txt))}</span><span class="or-setas"><button class="or-up" aria-label="${c.esc(J.subir)}" ${n === 0 ? 'disabled' : ''}>▲</button><button class="or-dn" aria-label="${c.esc(J.descer)}" ${n === ordem_.length - 1 ? 'disabled' : ''}>▼</button></span></li>`; }).join('');
      ol.querySelectorAll('.or-p').forEach((li) => {
        const id = +li.dataset.id;
        li.querySelector('.or-up').onclick = (e) => { e.stopPropagation(); move(id, -1); };
        li.querySelector('.or-dn').onclick = (e) => { e.stopPropagation(); move(id, 1); };
        li.addEventListener('pointerdown', (e) => arrasta(e, li, id));
      });
    };
    const move = (id, d) => { const n = ordem_.indexOf(id), m = n + d; if (m < 0 || m >= ordem_.length) return; ordem_.splice(n, 1); ordem_.splice(m, 0, id); A.sfx('papel', .4, () => A.hiss(.18, 3000, .6, .04)); desenha(); };
    // arrastar: o papel segue o dedo; ao soltar, entra no lugar mais perto
    const arrasta = (e, li, id) => {
      if (e.target.closest('button')) return;
      e.preventDefault(); li.setPointerCapture && li.setPointerCapture(e.pointerId);
      const y0 = e.clientY, h = li.getBoundingClientRect().height + 8; li.classList.add('pega');
      const mv = (ev) => { li.style.transform = `translateY(${ev.clientY - y0}px)`; };
      const up = (ev) => {
        li.removeEventListener('pointermove', mv); li.removeEventListener('pointerup', up); li.removeEventListener('pointercancel', up);
        const d = Math.round((ev.clientY - y0) / h); li.classList.remove('pega'); li.style.transform = '';
        if (d) { const n = ordem_.indexOf(id), m = clamp(n + d, 0, ordem_.length - 1); ordem_.splice(n, 1); ordem_.splice(m, 0, id); A.sfx('papel', .4, () => A.hiss(.18, 3000, .6, .04)); }
        desenha();
      };
      li.addEventListener('pointermove', mv); li.addEventListener('pointerup', up); li.addEventListener('pointercancel', up);
    };
    desenha();
    root.querySelector('.or-ok').onclick = () => {
      const pos = {}; ordem_.forEach((id, n) => { pos[id] = n; });
      const agora = pos[3] <= 1 && pos[5] === ordem_.length - 1;
      const acabou = (pos[1] === 0 || pos[4] === 0) && pos[3] >= 2;
      const resultado = agora ? 'cheia' : acabou ? 'nada' : 'meia';
      c.registrar('ordem', ordem_.join(''));
      // o ensaio: cada papel, na ordem, e o murmúrio da mesa depois dele
      const fim = () => resolve({ ordem: ordem_.slice(), resultado });
      if (!cfg.reage || BOT()) return fim();
      root.classList.add('lendo');
      root.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      const acoes = root.querySelector('.or-acoes');
      acoes.innerHTML = `<p class="or-ensaio">${c.esc(c.tr(cfg.ensaio))}</p>`;
      const lis = [...ol.querySelectorAll('.or-p')];
      lis.forEach((li, n) => setTimeout(() => {
        lis.forEach((x) => x.classList.remove('lido-agora'));
        li.classList.add('lido', 'lido-agora');
        const r = cfg.reage[+li.dataset.id]; const fala = r ? (n <= 1 ? r.cedo : r.tarde) : '';
        if (fala) li.insertAdjacentHTML('beforeend', `<span class="or-reage">${c.esc(c.tr(fala))}</span>`);
        A.sfx('papel', .35, () => A.hiss(.18, 3000, .6, .04));
      }, 400 + n * 2200));
      setTimeout(() => { lis.forEach((x) => x.classList.remove('lido-agora')); acoes.insertAdjacentHTML('beforeend', `<button class="cta or-fim">${c.esc(J.seguir || 'Seguir')}</button>`); acoes.querySelector('.or-fim').onclick = fim; }, 400 + lis.length * 2200 + 600);
    };
    if (BOT()) setTimeout(() => { ordem_ = window.__rnd ? [1, 2, 3, 4, 5].sort(() => R() - .5) : [3, 2, 1, 4, 5]; root.querySelector('.or-ok').click(); }, 60);
  });
}

window.JOGOS7 = { escuta, tripulacao, mao, morta, anzol, interrogatorio, ordem };
})();

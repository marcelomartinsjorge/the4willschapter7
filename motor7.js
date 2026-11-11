/* ==========================================================================
   MOTOR DO LIVRO INTERATIVO · As Quatro Vontades · Capítulo VII (a Madrinha)
   A base é o motor do Cap. VI (escolha só depois de "Próxima", sons e vozes
   presos ao parágrafo com "Continuar", pontuação da jornada, tela final no
   estilo Telltale). Sai o que era do Kronk (névoa, fome, nariz, comer).
   Entra o que é dela:
   - a ÁGUA: a tela refrata como água (forte na Orla, fraca em Redom);
   - o SAL: uma crosta fina que cresce nas bordas conforme ela seca;
   - a FRASE: "Laura leva os melhores à Boca Seca", em ouro velho, com as
     palavras que ela ainda não entende turvas;
   - o VÉU: o medalhão no alto com o rosto que ela está usando;
   - a COLEÇÃO: o codex dela, um cartão por rosto (Quer · Não diz · Disse);
   - FECHAR OS OLHOS: quando o ouro vaza, um toque duplo no fôlego;
   - a DOR da Ala Funda, os avisos que se afogam, o tom e o alarme
     escondidos (nada disso vira número na tela).
   Todo arquivo de mídia é opcional: o que falta vira silêncio, um som feito
   por código, ou a imagem provisória que vem no pacote.
   O roteiro vem de window.LIVRO (capitulo7.js); os jogos, de window.JOGOS7.
   ========================================================================== */
(() => {
'use strict';
const L = window.LIVRO, CFG = window.CHAPTER_CONFIG || {}, CODEX = CFG.codex || {}, ZONES = Object.assign({}, CFG.zones || {}, L.zonas || {});
const SUPA = { url: 'https://qoxvlgscpljsrybywivf.supabase.co', key: 'sb_publishable_XvoczGgXZGAezAmabNUBrQ_r25L-7ga' };
const $ = (s, r = document) => r.querySelector(s);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const H264 = !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"');
const vsrc = (u) => (H264 || !/\.mp4$/.test(u) ? u : u.replace(/\.mp4$/, '.webm'));
const SAVE_KEY = 'livro_' + L.id;
let LANG = 'en'; try { LANG = localStorage.getItem('livro_lang') || 'en'; } catch (e) {}
const EN = window.LIVRO_EN || {};
const tr = (t) => (LANG === 'en' && t != null ? (EN[t] != null ? EN[t] : t) : t);
const UI = window.LIVRO_UI;
const U = (k) => UI[LANG][k];
const BOT = () => !!window.__JOGO_BOT;
const reduz = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------- estado
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16); }));
const novoEstado = () => ({ i: 0, rosto: 'ela', f: {}, escolhas: {}, feitos: {}, jogos: {}, colecao: [], avisos: [], piscadas: {}, tom: { seduzir: 0, intimidar: 0, manipular: 0 }, alarme: 0, corpos: 0, testemunhas: 0, vestiu: [], sessao: uuid() });
let st = novoEstado();
const salvar = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(st)); } catch (e) {} };
const carregar = () => { try { const j = JSON.parse(localStorage.getItem(SAVE_KEY)); return j && j.sessao ? j : null; } catch (e) { return null; } };
let ANTES = {}; try { ANTES = JSON.parse(localStorage.getItem('aqv_estado') || '{}') || {}; } catch (e) {}
window.AQV_ANTES = ANTES;
const P = L.paginas;
// páginas de desvio (presa, falhou) só abrem por L.desvio; nunca na sequência
const visivel = (p) => !p.soDesvio && (!p.se || p.se(st));
// o erro na Capital: conta, avisa, e no terceiro ela é presa (L.desvio leva à página de prisão)
const erra = () => { st.f.erros = (st.f.erros || 0) + 1; const a = L.avisoErro && L.avisoErro(st); if (a) later(() => toast(sub(tr(a))), 1700); };
const idxVis = (from, dir) => { let i = from + dir; while (i >= 0 && i < P.length && !visivel(P[i])) i += dir; return i; };

// ---------------------------------------------------------------- áudio (Web Audio)
const AC = window.AudioContext || window.webkitAudioContext;
const A = {
  ctx: null, bufs: {}, zone: null, narr: null, on: true,
  init() {
    if (this.ctx || !AC) return; this.ctx = new AC();
    this.master = this.ctx.createGain(); this.master.connect(this.ctx.destination);
    this.bed = this.ctx.createGain(); this.bed.connect(this.master);
    this.fx = this.ctx.createGain(); this.fx.gain.value = .85; this.fx.connect(this.master);
    const n = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate), d = n.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; this.noise = n;
  },
  resume() { this.ctx && this.ctx.state === 'suspended' && this.ctx.resume(); },
  async buf(url) {
    if (!this.ctx) return null;
    if (this.bufs[url]) return this.bufs[url];
    const p = fetch(url).then((r) => (r.ok ? r.arrayBuffer() : Promise.reject())).then((ab) => new Promise((res, rej) => this.ctx.decodeAudioData(ab, res, rej))).catch(() => null);
    this.bufs[url] = p; return p;
  },
  async loop(url, vol, fade = 1.5) {
    const b = await this.buf(url); if (!b) return null;
    const s = this.ctx.createBufferSource(); s.buffer = b; s.loop = true;
    const g = this.ctx.createGain(); g.gain.value = 0; s.connect(g); g.connect(this.bed); s.start();
    g.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + fade);
    return { s, g };
  },
  stop(h, fade = 1.5) { if (!h || !this.ctx) return; const t = this.ctx.currentTime; h.g.gain.cancelScheduledValues(t); h.g.gain.setValueAtTime(h.g.gain.value, t); h.g.gain.linearRampToValueAtTime(0, t + fade); setTimeout(() => { try { h.s.stop(); } catch (e) {} (h.extra || []).forEach((x) => { try { x.stop(); } catch (e) {} }); }, fade * 1000 + 100); },
  // cama sonora de reserva enquanto o arquivo da zona não existe: mar, vento ou pedra
  sintetico(tipo, vol) {
    const c = this.ctx, g = c.createGain(); g.gain.value = 0; g.connect(this.bed);
    const s = c.createBufferSource(); s.buffer = this.noise; s.loop = true;
    const f = c.createBiquadFilter();
    const P_ = { mar: [380, .6, .09, 220, .3], fundo: [180, .9, .05, 80, .5], vento: [420, .7, .07, 260, .32], pedra: [140, .8, .03, 40, .14], fogo: [900, .5, .6, 300, .18] }[tipo] || [420, .7, .07, 260, .32];
    f.type = tipo === 'fundo' || tipo === 'pedra' ? 'lowpass' : 'bandpass'; f.frequency.value = P_[0]; f.Q.value = P_[1];
    const lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = P_[2]; lg.gain.value = P_[3]; lfo.connect(lg); lg.connect(f.frequency); lfo.start();
    s.connect(f); f.connect(g); s.start();
    g.gain.linearRampToValueAtTime(vol * P_[4], c.currentTime + 2.5);
    return { s, g, extra: [lfo] };
  },
  async setZone(z) {
    if (!this.ctx || z === this.zone) return; this.zone = z;
    const old = this.zoneH; this.zoneH = null; this.stop(old, 2);
    const cfg = ZONES[z]; if (!cfg) return;
    let h = cfg.src ? await this.loop(cfg.src, cfg.volume * .8, 2.2) : null;
    if (!h && cfg.reserva) h = this.sintetico(cfg.reserva, cfg.volume);
    if (this.zone === z) this.zoneH = h; else this.stop(h, .3);
  },
  async once(url, vol = .7) { const b = await this.buf(url); if (!b) return 0; const s = this.ctx.createBufferSource(); s.buffer = b; const g = this.ctx.createGain(); g.gain.value = vol; s.connect(g); g.connect(this.fx); s.start(); return b.duration; },
  async narrate(url, onEnd, fila) {
    if (fila && (this.narr || this.carregando)) { (this.fila = this.fila || []).push([url, onEnd]); return true; }
    this.stopNarr(true); this.carregando = true; const b = await this.buf(url); this.carregando = false;
    if (!b) { const q = this.fila && this.fila.shift(); if (q && !this.narr) this.narrate(q[0], q[1]); onEnd && onEnd(false); return false; }
    const s = this.ctx.createBufferSource(); s.buffer = b; s.connect(this.master); s.start();
    this.duck(true); this.narr = s; s.onended = () => { if (this.narr === s) { this.narr = null; this.duck(false); onEnd && onEnd(true); const q = this.fila && this.fila.shift(); if (q) this.narrate(q[0], q[1]); } };
    return true;
  },
  stopNarr(manterFila) { if (!manterFila) this.fila = []; if (this.narr) { const s = this.narr; this.narr = null; try { s.stop(); } catch (e) {} this.duck(false); } },
  duck(on) { if (!this.ctx) return; const t = this.ctx.currentTime; this.bed.gain.cancelScheduledValues(t); this.bed.gain.setTargetAtTime(on ? .25 : 1, t, .25); },
  setOn(on) { this.on = on; if (this.master) this.master.gain.setTargetAtTime(on ? 1 : 0, this.ctx.currentTime, .1); },
  tone(f, d, type = 'sine', v = .08, when = 0, bend = 0) {
    if (!this.ctx) return; const t = this.ctx.currentTime + when, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); if (bend) o.frequency.exponentialRampToValueAtTime(f * bend, t + d);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g); g.connect(this.fx); o.start(t); o.stop(t + d + .05);
  },
  hiss(d, f, q, v, when = 0, type = 'bandpass') {
    if (!this.ctx) return; const t = this.ctx.currentTime + when, s = this.ctx.createBufferSource(); s.buffer = this.noise;
    const fl = this.ctx.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q; const g = this.ctx.createGain();
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v, t + d * .3); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    s.connect(fl); fl.connect(g); g.connect(this.fx); s.start(t); s.stop(t + d + .05);
  },
  // sfx: toca assets/audio/sfx/<nome>.mp3; se ainda não existir, a reserva feita por código
  async sfx(nome, vol = .6, reserva) { if (!this.ctx) return 0; const d = await this.once('assets/audio/sfx/' + nome + '.mp3', vol); if (!d && reserva) reserva(); return d; },
  virar() { this.sfx('pagina', .35, () => this.hiss(.35, 2400, .7, .05)); },
  escolha() { this.tone(196, .5, 'sine', .05); this.tone(294, .6, 'sine', .035, .06); },
  aviso() { this.tone(220, .9, 'triangle', .03); this.tone(330, 1.1, 'sine', .02, .1); },
  // o ouro: uma corda de vidro molhado, grave e longa (a frase dourada, o ouro que vaza)
  ouro(v = .05) { this.sfx('ouro', .5, () => { this.tone(523, 2.2, 'sine', v); this.tone(784, 2.6, 'sine', v * .6, .08); this.tone(1046, 1.8, 'sine', v * .3, .2); }); },
  // a moeda nos nós dos dedos
  moeda() { this.sfx('moeda', .5, () => { this.tone(2600, .08, 'triangle', .03); this.tone(3100, .1, 'triangle', .02, .09); }); },
  // a água que muda de forma (vestir um rosto)
  veste() { this.sfx('vestir', .6, () => { this.hiss(1.4, 600, .6, .07, 0, 'lowpass'); this.tone(196, 1.4, 'sine', .04, .1, .5); }); },
  colecao() { this.sfx('colecao', .45, () => { this.tone(660, .5, 'sine', .03); this.tone(990, .7, 'sine', .02, .08); }); },
  vara() { this.sfx('vara', .8, () => { this.hiss(.12, 1800, .5, .3); this.tone(90, .25, 'square', .06, 0, .6); }); },
  bolha() { this.sfx('bolhas', .4, () => { for (let i = 0; i < 4; i++) this.tone(300 + Math.random() * 500, .08, 'sine', .02, i * .07, 1.6); }); },
};

// ---------------------------------------------------------------- fundos
const bgWrap = $('#bg');
let bgKey = '';
const resolveFundo = (p) => (st.fundoPag && st.fundoPag[p.id]) || (typeof p.fundo === 'function' ? p.fundo(st) : p.fundo);
function setFundo(f) {
  if (!f) return; const key = JSON.stringify(f); if (key === bgKey) return; bgKey = key;
  const layer = document.createElement('div');
  layer.className = 'bgl kb-' + (f.kb || 'in') + (f.tint ? ' tint-' + f.tint : '');
  layer.style.setProperty('--dim', f.dim != null ? f.dim : .5);
  layer.style.setProperty('--foco', f.foco || '50% 40%');
  if (f.filtro) layer.style.setProperty('--filtro', f.filtro);
  if (f.video || f.clip) {
    const v = document.createElement('video'); v.src = vsrc(f.video || f.clip); v.muted = true; v.loop = !f.umaVez; v.playsInline = true; v.setAttribute('playsinline', ''); v.autoplay = true;
    v.style.objectPosition = f.foco || '50% 40%'; v.className = 'img';
    if (f.img) v.poster = f.img; layer.appendChild(v); v.play().catch(() => {});
  } else { const im = document.createElement('div'); im.className = 'img'; im.style.backgroundImage = `url("${f.img}")`; layer.appendChild(im); }
  bgWrap.appendChild(layer);
  document.body.classList.toggle('lado-dir', f.lado === 'dir');
  Clima.set(f.clima || null);
  requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.add('on')));
  const olds = [...bgWrap.children].filter((c) => c !== layer);
  setTimeout(() => olds.forEach((o) => o.remove()), 1600);
}

// ---------------------------------------------------------------- clima: bolhas, sal, brasas, chuva fina, poeira
const Clima = (() => {
  const cv = $('#fx'), cx = cv.getContext('2d'); let modo = null, alvo = 0, dens = 0, parts = [], t0 = performance.now();
  const PERFIS = {
    bolhas: { n: 46, cor: '200,236,240', vy: [-34, -10], vx: [-4, 4], r: [.8, 2.8], a: [.12, .4], wob: 18, anel: true },
    sal: { n: 70, cor: '236,240,236', vy: [-2, 4], vx: [6, 22], r: [.4, 1.3], a: [.1, .4], wob: 10 },
    brasas: { n: 40, cor: '255,180,100', vy: [-22, -6], vx: [-6, 6], r: [.6, 1.8], a: [.25, .8], wob: 10, pisca: true },
    poeira: { n: 60, cor: '236,214,170', vy: [-4, 6], vx: [-5, 8], r: [.5, 1.8], a: [.1, .4], wob: 10 },
    chuva: { n: 120, cor: '190,210,230', vy: [380, 520], vx: [-40, -20], r: [.5, 1], a: [.08, .25], wob: 0, risco: true },
    poeiraCal: { n: 55, cor: '246,244,236', vy: [-3, 5], vx: [-4, 6], r: [.5, 1.6], a: [.08, .3], wob: 8 },
  };
  const rs = () => { const d = Math.min(devicePixelRatio || 1, 2); cv.width = innerWidth * d; cv.height = innerHeight * d; cx.setTransform(d, 0, 0, d, 0, 0); };
  addEventListener('resize', rs); rs();
  const rnd = (a) => a[0] + Math.random() * (a[1] - a[0]);
  const novo = (pf) => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: rnd(pf.vx), vy: rnd(pf.vy), r: rnd(pf.r), a: rnd(pf.a), ph: Math.random() * 6.28 });
  let last = performance.now();
  const loop = (now) => {
    const dt = Math.max(0, Math.min((now - last) / 1000, .05)); last = now;
    dens = Math.max(0, dens + (alvo - dens) * Math.min(1, dt * 1.5));
    cx.clearRect(0, 0, innerWidth, innerHeight);
    const pf = PERFIS[modo];
    if (pf) {
      const n = Math.max(0, Math.round(pf.n * dens * (innerWidth < 700 ? .55 : 1)) || 0);
      while (parts.length < n) parts.push(novo(pf));
      if (parts.length > n) parts.length = n;
      const tt = (now - t0) / 1000;
      for (const q of parts) {
        q.x += (q.vx + Math.sin(tt * .6 + q.ph) * pf.wob * .3) * dt; q.y += q.vy * dt;
        if (q.y > innerHeight + 10 || q.y < -12 || q.x < -20 || q.x > innerWidth + 20) { Object.assign(q, novo(pf)); if (q.vx > 20) q.x = -10; if (q.vy < 0) q.y = innerHeight + 6; if (q.vy > 100) q.y = -10; }
        const al = q.a * (pf.pisca ? .55 + .45 * Math.sin(tt * 2.4 + q.ph * 3) : 1) * dens;
        if (pf.risco) { cx.strokeStyle = `rgba(${pf.cor},${al.toFixed(3)})`; cx.lineWidth = q.r; cx.beginPath(); cx.moveTo(q.x, q.y); cx.lineTo(q.x + q.vx * .03, q.y + q.vy * .03); cx.stroke(); continue; }
        cx.beginPath();
        if (pf.anel) { cx.strokeStyle = `rgba(${pf.cor},${al.toFixed(3)})`; cx.lineWidth = .8; cx.arc(q.x, q.y, q.r, 0, 6.283); cx.stroke(); }
        else { cx.fillStyle = `rgba(${pf.cor},${al.toFixed(3)})`; cx.arc(q.x, q.y, q.r, 0, 6.283); cx.fill(); }
      }
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  return { set(m) { if (m === modo) return; if (reduz()) m = null; modo = m; parts = []; dens = 0; alvo = m ? 1 : 0; } };
})();

// ---------------------------------------------------------------- A ÁGUA: a tela refrata (um filtro SVG no fundo)
// força 0 a 1: o deslocamento da imagem e a velocidade da onda. Em Redom ela enfraquece; na pedra, para.
const Agua = (() => {
  const turb = $('#aguaTurb'), disp = $('#aguaDisp');
  let alvo = 0, v = 0, t = 0, ultimo = 0;
  const quadro = (now) => {
    v += (alvo - v) * .03;
    if (turb && disp && now - ultimo > 55) {   // ~18 quadros por segundo: o bastante para a água e leve para o celular
      ultimo = now; t += .055 * (.35 + v);
      const fx = .006 + Math.sin(t * .7) * .0015, fy = .018 + Math.cos(t * .5) * .004;
      turb.setAttribute('baseFrequency', `${fx.toFixed(5)} ${fy.toFixed(5)}`);
      disp.setAttribute('scale', (v * (innerWidth < 700 ? 14 : 22)).toFixed(2));
      document.body.classList.toggle('agua-on', v > .02);
    }
    requestAnimationFrame(quadro);
  };
  requestAnimationFrame(quadro);
  return { set(a) { alvo = reduz() ? 0 : clamp(a || 0, 0, 1); }, get v() { return v; } };
})();
// o sal nas bordas: só cresce, a não ser quando ela dorme na água
const Sal = { set(k) { document.documentElement.style.setProperty('--sal', clamp(k || 0, 0, 1).toFixed(3)); } };

// ---------------------------------------------------------------- A FRASE DOURADA
// "Laura leva os melhores à Boca Seca": aparece sozinha, palavra por palavra. "Laura" e "Boca Seca"
// ficam turvas até ela saber o que são. Ninguém explica a frase.
const fraseEl = $('#frase');
let fraseT = [];
function palavrasFrase() {
  const f = L.frase[LANG] || L.frase.pt;
  return f.map((w) => ({ w: w.w, turva: (w.k === 'laura' && !st.f.fraseLaura) || (w.k === 'boca' && !st.f.fraseBoca), k: w.k }));
}
function frase(modo = 'mostra', acende) {
  fraseT.forEach(clearTimeout); fraseT = [];
  if (!fraseEl) return;
  if (modo === 'some') { fraseEl.classList.remove('on', 'fica', 'brilha'); return; }
  const ws = palavrasFrase();
  // a frase inteira: a metade escondida sobe depois da conhecida, uma palavra por vez, e fica
  const fim = modo === 'inteira' && L.fraseFim ? (L.fraseFim[LANG] || L.fraseFim.pt) : [];
  if (fim.length) ws[ws.length - 1] = Object.assign({}, ws[ws.length - 1], { w: ws[ws.length - 1].w + ',' });
  fraseEl.innerHTML = ws.map((x, i) => `<span class="fw ${x.turva ? 'turva' : ''} ${x.k && x.k === acende ? 'acende' : ''}" style="--i:${i}">${esc(x.w)}</span>`).join(' ')
    + fim.map((w, j) => ` <span class="fw nova" style="--j:${j}">${esc(w)}</span>`).join('');
  fraseEl.className = 'on ' + (modo === 'nasce' ? 'nasce' : '') + (modo === 'fica' || modo === 'inteira' ? ' fica' : '') + (modo === 'inteira' ? ' inteira' : '') + (modo === 'brilha' ? ' brilha' : '') + (st.f.pedra ? ' pedra' : '');
  A.ouro(modo === 'brilha' ? .07 : .045);
  if (modo !== 'fica' && modo !== 'inteira') fraseT.push(setTimeout(() => fraseEl.classList.remove('on', 'brilha'), modo === 'nasce' ? 9000 : 6200));
}
// a palavra que fica nítida: liga a flag e acende a frase com ela limpa
function fraseAcende(k) {
  if (k === 'laura') st.f.fraseLaura = true; if (k === 'boca') st.f.fraseBoca = true;
  salvar(); frase('mostra', k);
}

// ---------------------------------------------------------------- O VÉU: o medalhão do rosto que ela usa
const veuBtn = $('#veu');
const rostoImg = (id) => { const c = L.colecao[id] || (L.rostos || {})[id]; return c && c.img ? c.img : 'assets/images/rostos/sem-rosto.svg'; };
// o retrato que ainda não foi gerado: por baixo dele fica a silhueta (a segunda imagem do fundo só aparece se a primeira faltar)
const bgRosto = (src) => `url('${src}'), url('assets/images/rostos/sem-rosto.svg')`;
function desenhaVeu(anima) {
  if (!veuBtn) return;
  const i = veuBtn.querySelector('.vr'); i.style.backgroundImage = bgRosto(rostoImg(st.rosto));
  veuBtn.classList.toggle('pedra', !!st.f.pedra);
  veuBtn.classList.toggle('mascara', st.rosto !== 'ela');
  veuBtn.querySelector('.qt').textContent = st.colecao.length;
  veuBtn.title = U('colecaoT') + ' (C)';
  if (anima) { veuBtn.classList.remove('ondula'); void veuBtn.offsetWidth; veuBtn.classList.add('ondula'); }
}
function veste(id) {
  if (!id || st.rosto === id) return;
  st.rosto = id; if (id !== 'ela' && !st.vestiu.includes(id)) st.vestiu.push(id); salvar();
  A.veste(); desenhaVeu(true);
  document.body.classList.remove('vestindo'); void document.body.offsetWidth; document.body.classList.add('vestindo');
  if (!st.f.dicaVeu && id !== 'ela') { st.f.dicaVeu = true; salvar(); later(() => toast(U('dicaVeu'), true), 1200); }
}

// ---------------------------------------------------------------- A COLEÇÃO (o codex dela)
const COL = L.colecao || {};
const campo = (c, k) => { const v = c[k]; const x = typeof v === 'function' ? v(st) : v; return x ? sub(tr(x)) : ''; };
const nomeCard = (id) => (COL[id] ? campo(COL[id], 'nome') : id);
function guarda(id, quieto) {
  if (!COL[id]) return;
  if (st.colecao.includes(id)) return;
  st.colecao.push(id); salvar(); desenhaVeu(); registrar('col_' + id, '1');
  if (quieto) return;
  A.colecao();
  const c = COL[id], el = document.createElement('div'); el.className = 'card-novo';
  const linha = campo(c, 'naoDiz') ? `${U('naoDiz')}: ${campo(c, 'naoDiz')}` : campo(c, 'disse') ? `${U('disse')}: ${campo(c, 'disse')}` : campo(c, 'quer') ? `${U('quer')}: ${campo(c, 'quer')}` : '';
  el.innerHTML = `<i class="rosto" style="background-image:${bgRosto(rostoImg(id))}"></i><small>${esc(U('colecaoNovo'))}</small><b>${esc(nomeCard(id))}</b><span>${esc(linha)}</span>`;
  // vários cartões juntos entram em fila, um embaixo do outro
  let caixa = document.getElementById('cardsNovos'); if (!caixa) { caixa = document.createElement('div'); caixa.id = 'cardsNovos'; document.body.appendChild(caixa); }
  caixa.appendChild(el); requestAnimationFrame(() => el.classList.add('on'));
  veuBtn && (veuBtn.classList.remove('pulsa'), void veuBtn.offsetWidth, veuBtn.classList.add('pulsa'));
  setTimeout(() => el.classList.remove('on'), 5200); setTimeout(() => el.remove(), 6000);
}
// os cartões que abrem alguma opção na tela atual (escolha ou minijogo com respostas que nascem da Coleção)
function servindoAgora() {
  const out = new Set(), p = P[st.i] || {};
  const olha = (ops) => (ops || []).forEach((o) => { if (o.se && !o.se(st)) return; const d = o.de && (typeof o.de === 'function' ? o.de(st) : o.de); if (d && st.colecao.includes(d)) out.add(d); });
  if (p.escolha) olha(p.escolha.opcoes);
  if (p.minijogo) { const d = L[p.minijogo]; const cfg = d && (d.perguntas ? d : d[p.jogoId] || d[typeof L.alvoNoite === 'function' ? L.alvoNoite(st, p.noite || 1) : ''] || d); if (cfg && cfg.perguntas) cfg.perguntas.forEach((q) => olha(q.ops)); if (cfg && cfg.falas) cfg.falas.forEach((q) => olha(q.ops)); if (cfg && cfg.trocas) cfg.trocas.forEach((q) => olha(q.ops)); }
  return out;
}
function abrirColecao() {
  const m = $('#colecaoModal');
  $('#clTitle').textContent = U('colecaoT'); $('#clSub').textContent = U('colecaoSub');
  const lin = (rot, v) => (v ? `<p><em>${esc(rot)}</em> ${esc(v)}</p>` : '');
  const serve = servindoAgora(), LUG = U('lugares') || {}, ordemL = ['redom', 'coluna', 'sentenca', 'orla'];
  const ids = st.colecao.slice().reverse().filter((id) => COL[id]);
  const grupos = ordemL.map((g) => [g, ids.filter((id) => (COL[id].lugar || 'redom') === g)]).filter(([, l]) => l.length);
  // os que servem agora vêm primeiro, com o selo
  const topo = ids.filter((id) => serve.has(id));
  const item = (id) => {
    const c = COL[id]; if (!c) return '';
    const veste_ = c.veste && (typeof c.veste === 'function' ? c.veste(st) : c.veste);
    const morto = typeof c.morto === 'function' ? c.morto(st) : !!c.morto;
    return `<li class="${morto ? 'morto' : ''} ${serve.has(id) ? 'serve' : ''}">${serve.has(id) ? `<span class="serve-tag">${esc(U('serve'))}</span>` : ''}<i class="rosto" style="background-image:${bgRosto(rostoImg(id))}"></i><div><b>${esc(nomeCard(id))}${veste_ ? ' <span class="vst" title="' + esc(U('vestivel')) + '">◐</span>' : ''}</b>${lin(U('quer') + ':', campo(c, 'quer'))}${lin(U('naoDiz') + ':', campo(c, 'naoDiz'))}${lin(U('disse') + ':', campo(c, 'disse'))}${campo(c, 'fim') ? `<p class="fim">${esc(campo(c, 'fim'))}</p>` : ''}</div></li>`;
  };
  $('#clLista').innerHTML = (topo.length ? topo.map(item).join('') : '') + grupos.map(([g, l]) => `<li class="grupo">${esc(LUG[g] || g)}</li>` + l.filter((id) => !serve.has(id)).map(item).join('')).join('') || `<li class="vazio">${esc(U('colecaoVazia'))}</li>`;
  m.classList.add('show'); A.colecao();
}
veuBtn && (veuBtn.onclick = abrirColecao);
$('#clClose').onclick = () => $('#colecaoModal').classList.remove('show');

// ---------------------------------------------------------------- codex (verbetes impessoais)
function aliasesAtuais() {
  const out = [];
  for (const [id, c] of Object.entries(CODEX)) {
    const al = LANG === 'en' ? (c.aliasesEn || [c.en && c.en.title]) : (c.aliasesPt || [c.pt && c.pt.title]);
    for (const a of al.filter(Boolean)) out.push([a, id]);
  }
  return out.sort((a, b) => b[0].length - a[0].length);
}
const esc = (t) => String(t).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const linkUsados = new Set();
function linkify(text) {
  let html = esc(text);
  for (const [a, id] of aliasesAtuais()) {
    if (linkUsados.has(id)) continue;
    const re = new RegExp(`(^|[^\\p{L}])(${a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![\\p{L}])`, 'u');
    if (re.test(html)) { html = html.replace(re, `$1<button class="gloss" data-codex="${id}">$2</button>`); linkUsados.add(id); }
  }
  return html;
}
function abrirCodex(id) {
  const c = CODEX[id]; if (!c) return; const t = c[LANG] || c.pt || c.en; let pg = 0;
  const m = $('#codex'); $('#cxImg').style.backgroundImage = `url("${c.image}")`; $('#cxEye').textContent = t.eyebrow || ''; $('#cxTitle').textContent = t.title;
  const draw = () => { $('#cxText').innerHTML = t.pages[pg].map((p) => `<p>${esc(p)}</p>`).join(''); $('#cxPg').textContent = `${pg + 1} / ${t.pages.length}`; $('#cxPrev').disabled = pg === 0; $('#cxNext').disabled = pg === t.pages.length - 1; };
  $('#cxPrev').onclick = () => { pg--; draw(); }; $('#cxNext').onclick = () => { pg++; draw(); };
  draw(); m.classList.add('show'); A.tone(330, .5, 'sine', .03);
}
document.addEventListener('click', (e) => { const g = e.target.closest('.gloss'); if (g) { e.preventDefault(); abrirCodex(g.dataset.codex); } });
$('#cxClose').onclick = () => $('#codex').classList.remove('show');

// ---------------------------------------------------------------- avisos (estilo Telltale), com o rosto de quem vai lembrar
const ROSTOS = L.rostosAviso || {};
const rostoDe = (t) => { let best = null, bi = 1e9; Object.keys(ROSTOS).forEach((n) => { const i = String(t).indexOf(n); if (i >= 0 && i < bi) { bi = i; best = ROSTOS[n]; } }); return best ? rostoImg(best) : null; };
const rostoHTML = (src, cls = 'rosto') => (src ? `<i class="${cls}" style="background-image:${bgRosto(src)}"></i>` : '');
function toast(t, info) { const el = document.createElement('div'); el.className = 'toast' + (info ? ' info' : ''); const r = info ? null : rostoDe(t); if (r) { el.classList.add('com-rosto'); el.innerHTML = rostoHTML(r) + `<span>${esc(t)}</span>`; } else el.textContent = t; $('#toasts').appendChild(el); if (!info) A.aviso(); setTimeout(() => el.classList.add('out'), info ? 5200 : 3800); setTimeout(() => el.remove(), info ? 6000 : 4600); return el; }
// a subversão: os avisos de antes voltam um por um, afundam e se apagam; no lugar fica um só
function afogaAvisos(filtro, ultimo) {
  const lista = st.avisos.filter((a) => !filtro || filtro(a, st)).slice(-6);
  lista.forEach((a, k) => later(() => {
    const el = document.createElement('div'); el.className = 'toast com-rosto afoga'; const r = rostoDe(sub(tr(a)));
    el.innerHTML = rostoHTML(r) + `<span>${esc(sub(tr(a)))}</span>`; $('#toasts').appendChild(el); A.tone(220 - k * 14, 1.2, 'triangle', .022);
    later(() => el.classList.add('afunda'), 1300); later(() => el.remove(), 3400);
  }, k * 650));
  later(() => { const el = toast(sub(tr(ultimo))); el.classList.add('ninguem'); A.tone(98, 2.6, 'sine', .05); }, lista.length * 650 + 1400);
}

// ---------------------------------------------------------------- estatísticas (Supabase)
function registrar(escolha, opcao) {
  fetch(`${SUPA.url}/rest/v1/livro_escolhas?on_conflict=sessao,capitulo,escolha`, {
    method: 'POST', headers: { apikey: SUPA.key, 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify({ capitulo: L.id, escolha: String(escolha).slice(0, 40), opcao: String(opcao).slice(0, 40), sessao: st.sessao }),
  }).catch(() => {});
}
async function estatisticas() {
  try {
    const r = await fetch(`${SUPA.url}/rest/v1/rpc/livro_estatisticas`, { method: 'POST', headers: { apikey: SUPA.key, 'Content-Type': 'application/json' }, body: JSON.stringify({ p_capitulo: L.id }) });
    return r.ok ? r.json() : [];
  } catch (e) { return []; }
}

// ---------------------------------------------------------------- render de página
const txt = $('#ptext'), box = $('#choices'), btnNext = $('#next'), btnPrev = $('#prev'), panel = $('#page');
// um parágrafo pode ser: 'texto', { t, se?, voz?, sfx?, guarda?, frase?, veste? } ou st => (qualquer um destes, ou lista)
// a voz (e o som, e o cartão da Coleção) fica PRESA ao parágrafo: se um parágrafo condicional some, nada cai no lugar errado
const umObj = (x) => {
  if (x == null || x === false) return [];
  if (typeof x === 'string') return [{ t: x }];
  if (typeof x === 'function') return [].concat(x(st)).map(umObj).flat();
  if (Array.isArray(x)) return x.map(umObj).flat();
  if (x.se && !x.se(st)) return [];
  return x.t ? [x] : [];
};
const resolve = (list) => [].concat(typeof list === 'function' ? list(st) : (list || [])).map(umObj).flat();
const sub = (s) => (L.subst ? L.subst(s, st, tr) : s);
const paras = (list) => resolve(list).map((o) => sub(tr(o.t)));
// os sons e os efeitos presos aos parágrafos, com o índice certo
const itensDe = (objs, base = 0) => objs.map((o, k) => [
  o.voz ? { voz: o.voz, p: base + k } : null,
  o.sfx ? { sfx: o.sfx, p: base + k, v: o.v } : null,
  o.guarda ? { guarda: o.guarda, p: base + k, solto: true } : null,
  o.frase ? { frase: o.frase, p: base + k, solto: true } : null,
  o.veste ? { veste: o.veste, p: base + k, solto: true } : null,
  o.moeda ? { moeda: true, p: base + k, solto: true } : null,
]).flat().filter(Boolean);
// '—' abre uma fala; '«' abre a frase que o outro diz em voz alta, no ouro (o Anzol que pegou)
function pHTML(p, extra = '') {
  if (p.startsWith('«')) return `<p class="dlg dourada ${extra}">${linkify('— ' + p.slice(1).trim())}</p>`;
  if (p.startsWith('¶')) return `<p class="vermelha ${extra}">${esc(p.slice(1).trim())}</p>`;
  const dlg = p.startsWith('—');
  return `<p class="${dlg ? 'dlg' : ''} ${extra}">${linkify(p)}</p>`;
}
let timers = [];
const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
const later = (fn, ms) => timers.push(setTimeout(fn, ms));
const vozUrl = (n) => 'assets/audio/voz/' + n + '.mp3';
const fala = (nome, ms = 0) => { if (!nome) return; later(() => { if (A.ctx && A.on) A.narrate(vozUrl(nome), null, true); }, ms); };
let cuesPend = [];
const palavras = (el) => (el.textContent || '').trim().split(/\s+/).length;
const msAte = (els, k) => { if (!els.length) return 900; if (k < 0) k = els.length + k; k = Math.max(0, Math.min(els.length - 1, k)); let w = 0; for (let i = 0; i < k; i++) w += palavras(els[i]); return (700 + (w / 3.3) * 1000) * (window.__LEITURA_K || 1); };
const tocaItem = (it) => {
  if (it.guarda) return [].concat(typeof it.guarda === 'function' ? it.guarda(st) : it.guarda).filter(Boolean).forEach((g) => guarda(g));
  if (it.frase) return it.frase === 'laura' || it.frase === 'boca' ? fraseAcende(it.frase) : frase(it.frase);
  if (it.veste) return veste(typeof it.veste === 'function' ? it.veste(st) : it.veste);
  if (it.moeda) { A.moeda(); document.body.classList.remove('moeda'); void document.body.offsetWidth; document.body.classList.add('moeda'); return; }
  if (!A.ctx || !A.on) return;
  if (it.voz) A.narrate(vozUrl(typeof it.voz === 'function' ? it.voz(st) : it.voz), null, true); else if (it.fn) it.fn(A, st); else if (it.sfx) A.sfx(it.sfx, it.v != null ? it.v : .7); else if (it.s) A.once(it.s, it.v != null ? it.v : .7);
};
function agendaItens(itens, els, base = 0) {
  (itens || []).forEach((it) => {
    if (it.se && !it.se(st)) return;
    // o cartão, o rosto e a frase não podem se perder se o leitor virar a página antes da hora: vão junto na saída
    const c = { done: false, fim: !!it.fim || !!(it.guarda || it.veste || it.frase === 'laura' || it.frase === 'boca') };
    c.tocar = () => { if (c.done) return; c.done = true; tocaItem(it); };
    if (c.fim) cuesPend.push(c);
    later(c.tocar, base + (it.p != null ? msAte(els, it.p) : (it.ms != null ? it.ms : 900)));
  });
}
// som no meio do texto: o texto PARA antes do parágrafo que tem som (ou voz); o leitor clica em Continuar
function agendaPortoes(itens, els, aoAcabar) {
  const n = els.length, idx = (it) => (it.p < 0 ? Math.max(0, n + it.p) : Math.min(n - 1, it.p));
  const lista = (itens || []).filter((it) => !(it.se && !it.se(st)));
  const portaoDe = (it) => !it.fim && it.p != null && idx(it) > 0 && !it.solto;
  const meio = lista.filter(portaoDe);
  const gates = [...new Set(meio.map(idx))].sort((x, y) => x - y);
  // o que não é portão (cartão, frase, som solto) e cai depois de um portão vai junto com ele
  const presos = {};
  const soltos = lista.filter((it) => !meio.includes(it)).filter((it) => {
    if (it.p == null || it.fim) return true;
    const g = gates.filter((x) => x <= idx(it)).pop();
    if (g == null) return true;
    (presos[g] = presos[g] || []).push(it); return false;
  });
  agendaItens(soltos, els);
  if (!gates.length) return false;
  els.slice(gates[0]).forEach((el) => el.classList.add('em-espera'));
  const mostra = (k) => {
    const g = gates[k], ate = k + 1 < gates.length ? gates[k + 1] : n;
    const w = document.createElement('div'); w.className = 'portao';
    const b = document.createElement('button'); b.className = 'cta portao-btn'; b.type = 'button'; b.textContent = U('continuar');
    w.appendChild(b); els[g].before(w);
    b.onclick = () => {
      if (!w.isConnected) return; w.remove();
      for (let i = g; i < ate; i++) { els[i].classList.remove('em-espera'); els[i].classList.add('novo'); els[i].style.animationDelay = ((i - g) * .35) + 's'; }
      meio.filter((it) => idx(it) === g).forEach(tocaItem);
      (presos[g] || []).forEach((it) => { const c = { done: false, tocar() { if (c.done) return; c.done = true; tocaItem(it); } }; cuesPend.push(c); later(c.tocar, 250 + Math.max(0, idx(it) - g) * 600); });
      if (k + 1 < gates.length) mostra(k + 1); else aoAcabar();
      const nb = $('.portao-btn'); nb ? nb.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) : els[g].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
  };
  mostra(0);
  return true;
}

// a dor da Ala Funda: a vara, a horas sem padrão; a tela pisca e o texto pula
let dorT = 0;
function dor(on) {
  clearTimeout(dorT); if (!on) return;
  const bate = () => { if (!P[st.i] || !P[st.i].dor) return; A.vara(); document.body.classList.remove('dor'); void document.body.offsetWidth; document.body.classList.add('dor'); dorT = setTimeout(bate, 5200 + Math.random() * 7000); };
  dorT = setTimeout(bate, 2200 + Math.random() * 2600);
}

function render(dir = 1) {
  clearTimers(); cuesPend = []; A.stopNarr(); linkUsados.clear();
  document.body.classList.remove('apaga', 'vaza', 'dor');
  const p = P[st.i]; if (!p) return;
  // o ponto de volta: guarda o estado inteiro ao entrar pela primeira vez
  if (p.checkpoint && !st.feitos['ck:' + p.id]) { st.feitos['ck:' + p.id] = 1; const c = Object.assign({}, st); delete c.ckpt; st.ckpt = JSON.stringify(c); }
  if (p.aoEntrar && !st.feitos['in:' + p.id]) { st.feitos['in:' + p.id] = 1; p.aoEntrar(st, { toast: (t) => later(() => toast(sub(tr(t))), 600), guarda, veste }); }
  if (p.pedra != null) { st.f.pedra = !!(typeof p.pedra === 'function' ? p.pedra(st) : p.pedra); }
  setFundo(resolveFundo(p));
  Agua.set(p.agua != null ? (typeof p.agua === 'function' ? p.agua(st) : p.agua) : (L.aguaDe ? L.aguaDe(st, p) : 0));
  Sal.set(p.sal != null ? (typeof p.sal === 'function' ? p.sal(st) : p.sal) : (L.salDe ? L.salDe(st, p) : 0));
  if (p.veste && !p.cartao) veste(typeof p.veste === 'function' ? p.veste(st) : p.veste);
  desenhaVeu();
  if (A.ctx) { A.setZone(p.zona); if (p.som && dir > 0) A.once(p.som, .55); }
  document.body.dataset.zona = p.zona || '';
  document.body.classList.toggle('na-pedra', !!st.f.pedra);
  { let k = st.i; while (k > 0 && !P[k].parte) k--; $('#parte').textContent = P[k].parte ? tr(P[k].parte) : ''; }
  const vis = P.filter(visivel), n = vis.indexOf(p) + 1; $('#pnum').textContent = `${n}`;
  $('#prog').style.setProperty('--p', (n / vis.length).toFixed(3));
  panel.classList.remove('in'); void panel.offsetWidth; panel.classList.add('in');
  panel.classList.toggle('cartao', !!p.cartao);
  if (p.cartao) {
    const c = p.cartao;
    txt.innerHTML = `<div class="ct"><p class="ct-num">${esc(tr(c.num))}</p><h2 class="ct-nome">${esc(tr(c.nome))}</h2><span class="ct-orn">✦</span>
      ${c.epigrafe ? `<blockquote class="ct-epi"><p>${esc(tr(c.epigrafe))}</p><cite>${esc(tr(c.fonte))}</cite></blockquote>` : ''}</div>`;
  } else txt.innerHTML = paras(p.texto).map((t, k) => pHTML(t, k === 0 && p.capitular ? 'cap' : '')).join('');
  const sonsPag = (p.cartao ? [] : itensDe(resolve(p.texto))).concat((p.sons || []).filter((it) => !(it.se && !it.se(st))));
  box.innerHTML = ''; box.style.display = '';
  [...txt.children].forEach((el, k) => { el.style.animationDelay = (k * .35) + 's'; });
  $('#extras').innerHTML = '';
  let livre = true;
  if (escolhaAtiva(p)) livre = renderEscolha(p);
  if (p.minijogo) livre = renderMinijogo(p);
  if (p.piscar) livre = renderPiscar(p, dir, sonsPag);
  setNext(livre);
  if (sonsPag.length && dir >= 0 && !p.piscar) {
    const liberaTudo = () => { box.style.display = ''; setNext(livre); };
    const portao = agendaPortoes(sonsPag, [...txt.children], liberaTudo);
    if (portao) { box.style.display = 'none'; setNext(false); }
  }
  if (p.frase && dir >= 0) { const fm = typeof p.frase === 'function' ? p.frase(st) : p.frase; if (fm) later(() => { if (P[st.i] === p) frase(fm); }, fm === 'nasce' ? 500 : 900); }
  else if (fraseEl && !fraseEl.classList.contains('fica')) frase('some');
  if (p.afoga && dir >= 0 && !st.feitos['af:' + p.id]) { st.feitos['af:' + p.id] = 1; later(() => afogaAvisos(p.afoga.filtro, p.afoga.ultimo), p.afoga.ms || 1400); }
  dor(!!p.dor && dir >= 0);
  btnPrev.disabled = idxVis(st.i, -1) < 0; btnPrev.textContent = U('voltar');
  btnNext.textContent = p.fim ? U('fim') : p.volta ? U('tentar') : U('prox');
  st.feitos[p.id] = st.feitos[p.id] || 1; salvar();
  panel.scrollTop = 0;
}
function setNext(on) { btnNext.disabled = !on; btnNext.classList.toggle('pulse', on); }
function appendParas(list, cls = '') { const ps = paras(list); ps.forEach((t, k) => { txt.insertAdjacentHTML('beforeend', pHTML(t, 'novo ' + cls)); txt.lastElementChild.style.animationDelay = (k * .35) + 's'; }); return ps.length; }
// o texto que chega depois (resultado de escolha, fim de jogo): se tiver voz, para antes dela e pede Continuar
function appendComSom(list, extra, depois) {
  const objs = resolve(list), n0 = txt.children.length;
  appendParas(list);
  const els = [...txt.children].slice(n0);
  const itens = itensDe(objs).concat((extra || []).filter((it) => !(it.se && !it.se(st))));
  if (!itens.length) { depois && depois(); return; }
  box.style.display = 'none';
  // o primeiro parágrafo do resultado também espera o Continuar quando tem voz (a escolha acabou de ser feita)
  const portao = agendaPortoes(itens.map((it) => (it.p === 0 && it.voz ? Object.assign({}, it, { p: 0, solto: false }) : it)), els, () => { box.style.display = ''; depois && depois(); });
  if (!portao) { box.style.display = ''; depois && depois(); }
}

// ----- FECHAR OS OLHOS: o ouro vaza pelo rosto emprestado; um toque duplo no fôlego
function renderPiscar(p, dir, sonsPag) {
  const g = p.piscar, els = [...txt.children], antes = typeof g.antes === 'function' ? g.antes(st) : (g.antes != null ? g.antes : els.length);
  els.slice(antes).forEach((el) => el.classList.add('oculto'));
  // os sons dos parágrafos visíveis tocam; os dos escondidos tocam quando aparecem (depois do piscar)
  const depoisCues = [];
  sonsPag.forEach((it) => { const k = it.p == null ? 0 : it.p; if (k >= antes) depoisCues.push(it); else if (dir >= 0) agendaItens([it], els); });
  const feito = st.piscadas[g.id];
  const fecha = (ok) => {
    els.slice(antes).forEach((el, k) => { el.classList.remove('oculto'); el.classList.add('novo'); el.style.animationDelay = (k * .35) + 's'; });
    depoisCues.forEach((it) => later(() => tocaItem(it), 400));
    const res = typeof g[ok ? 'ok' : 'falha'] === 'function' ? g[ok ? 'ok' : 'falha'](st) : g[ok ? 'ok' : 'falha'];
    appendComSom(res, null, () => setNext(true));
    panel.scrollTop = panel.scrollHeight;
  };
  if (feito != null) { later(() => fecha(feito), 50); return false; }
  const atraso = Math.min(5200, 1200 + antes * 1100) * (window.__LEITURA_K || 1);
  later(() => {
    if (P[st.i] !== p) return;
    const primeira = !st.f.piscouAntes;
    const JAN = (primeira ? 2.4 : g.janela || 1.6) * 1000;
    document.body.classList.add('vaza'); A.ouro(.06); veuBtn && veuBtn.classList.add('vaza');
    const ov = document.createElement('div'); ov.className = 'piscar';
    ov.innerHTML = `<div class="olhos"><i></i><i></i></div><svg class="folego" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46"/></svg>${primeira ? `<p class="pdica">${esc(U('piscarDica'))}</p>` : ''}`;
    document.body.appendChild(ov); requestAnimationFrame(() => ov.classList.add('on'));
    const circ = ov.querySelector('.folego circle'); circ.style.transition = `stroke-dashoffset ${JAN}ms linear`; requestAnimationFrame(() => requestAnimationFrame(() => { circ.style.strokeDashoffset = '289'; }));
    let toques = [], acabou = false;
    const termina = (ok) => {
      if (acabou) return; acabou = true; clearTimeout(tm);
      removeEventListener('pointerdown', toque, true); removeEventListener('keydown', tecla, true);
      st.piscadas[g.id] = ok; st.f.piscouAntes = true; salvar(); registrar('piscar_' + g.id, ok ? 'fechou' : 'vazou');
      ov.classList.add(ok ? 'fechou' : 'vazou'); document.body.classList.remove('vaza'); veuBtn && veuBtn.classList.remove('vaza');
      if (ok) { A.hiss(.5, 900, .7, .05); document.body.classList.add('pisca'); setTimeout(() => document.body.classList.remove('pisca'), 700); }
      else A.tone(140, 1.2, 'sawtooth', .03, 0, .7);
      setTimeout(() => ov.remove(), 900);
      if (!ok && g.aoFalhar) g.aoFalhar(st);
      if (!ok && g.erro && (typeof g.erro !== 'function' || g.erro(st))) erra();
      later(() => fecha(ok), 700);
    };
    const toque = (e) => {
      if (e.target.closest && e.target.closest('#codex, #colecaoModal')) return;
      if (e.cancelable) e.preventDefault(); e.stopPropagation();
      const t = performance.now(); toques = toques.filter((x) => t - x < 520); toques.push(t);
      ov.classList.remove('toque'); void ov.offsetWidth; ov.classList.add('toque');
      if (toques.length >= 2) termina(true);
    };
    const tecla = (e) => { if (e.code === 'Space' || e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) toque(e); } };
    addEventListener('pointerdown', toque, true); addEventListener('keydown', tecla, true);
    const tm = setTimeout(() => termina(false), JAN);
    if (BOT()) setTimeout(() => termina(true), 120);
  }, dir >= 0 ? atraso : 0);
  return false;
}

// ----- ESCOLHAS: abrem só depois de "Próxima"
const escolhaAtiva = (p) => !!(p.escolha && (!p.escolha.se || p.escolha.se(st)));
const rotulo = (o) => (o.silencio ? U('silencioR') : sub(tr(typeof o.txt === 'function' ? o.txt(st) : o.txt)));
const opcoesVis = (lista) => lista.filter((o) => !o.se || o.se(st));
const resultadoDe = (o) => (typeof o.resultado === 'function' ? o.resultado(st) : o.resultado);
const fv = (x) => (typeof x === 'function' ? x(st) : x);
const rotHTML = (o) => (o.silencio ? `<em>${U('silencio')}</em>` : fv(o.fala) ? `“${esc(rotulo(o))}”` : fv(o.gesto) ? `<i class="gst">${esc(rotulo(o))}</i>` : esc(rotulo(o)));
// a opção que nasce da Coleção mostra, pequeno, o rosto de quem contou
const optHTML = (o, k) => { const de = o.de && (typeof o.de === 'function' ? o.de(st) : o.de); return `<button class="opt ${o.silencio ? 'sil' : ''} ${fv(o.fala) ? 'fala' : ''} ${de ? 'de-col' : ''} ${o.preco ? 'preco p-' + o.preco : ''}" data-id="${o.id}"><span class="k">${k + 1}</span>${de ? rostoHTML(rostoImg(de), 'rosto mini') : ''}<span class="tx">${rotHTML(o)}</span></button>`; };
function renderEscolha(p) {
  const e = p.escolha, feita = st.escolhas[e.id];
  if (feita) { const o = e.opcoes.find((x) => x.id === feita); if (o) { box.innerHTML = `<p class="feita">${U('escolheu')} ${fv(o.fala) ? '“' + esc(rotulo(o)) + '”' : esc(rotulo(o))}</p>`; appendParas(resultadoDe(o)); } return true; }
  p._revelado = false; box.innerHTML = '';
  return true;
}
function abreEscolha(p) {
  const e = p.escolha, ops = opcoesVis(e.opcoes);
  box.innerHTML = `<p class="eyebrow">${e.pergunta ? esc(sub(tr(typeof e.pergunta === 'function' ? e.pergunta(st) : e.pergunta))) : U('oque')}</p>` + ops.map(optHTML).join('');
  box.querySelectorAll('.opt').forEach((b) => b.onclick = () => escolher(p, b.dataset.id));
}
// os tons antigos (de saves velhos ou de texto ainda não revisto) caem num dos três verbos
const TOM_ANTIGO = { doce: 'seduzir', fria: 'intimidar', cruel: 'intimidar', divertida: 'manipular' };
function aplicar(o) {
  if (!o) return;
  const v = (x) => (typeof x === 'function' ? x(st) : x);
  if (o.tom) [].concat(v(o.tom)).forEach((k) => { k = TOM_ANTIGO[k] || k; st.tom[k] = (st.tom[k] || 0) + 1; });
  if (o.alarme) st.alarme += v(o.alarme);
  if (o.corpos) st.corpos += v(o.corpos);
  if (o.testemunha) st.testemunhas += v(o.testemunha);
  if (o.flag) [].concat(v(o.flag)).forEach((f) => { st.f[f] = true; });
  if (o.guarda) [].concat(v(o.guarda)).filter(Boolean).forEach((g) => later(() => guarda(g), 900));
  if (o.aoEscolher) o.aoEscolher(st);
  if (o.erro && v(o.erro)) erra();
  const av = v(o.aviso);
  if (av) { [].concat(av).forEach((a, k) => { st.avisos.push(a); later(() => toast(sub(tr(a))), 700 + k * 900); }); }
}
function escolher(p, id) {
  const e = p.escolha; if (st.escolhas[e.id]) return;
  const o = e.opcoes.find((x) => x.id === id); st.escolhas[e.id] = id;
  const fo = typeof o.fundo === 'function' ? o.fundo(st) : o.fundo;
  if (fo) { (st.fundoPag = st.fundoPag || {})[p.id] = fo; setFundo(fo); }
  box.querySelectorAll('.opt').forEach((b) => { b.disabled = true; b.classList.toggle('sel', b.dataset.id === id); });
  if (o.som) A.sfx(o.som, .7);
  A.escolha(); registrar(e.id, id); salvar();
  aplicar(o); salvar();
  if (o.voz) fala(typeof o.voz === 'function' ? o.voz(st) : o.voz, 200);
  later(() => { appendComSom(resultadoDe(o), null, () => setNext(true)); panel.scrollTop = panel.scrollHeight; }, 450);
}

// ---------------------------------------------------------------- minijogos (window.JOGOS7)
let overlay = $('#mg');
function renovaOverlay() { const n = overlay.cloneNode(false); n.className = ''; n.innerHTML = ''; overlay.replaceWith(n); overlay = n; }
function abreOverlay(cls) { renovaOverlay(); overlay.className = 'show ' + cls; document.body.classList.add('mg-on'); return overlay; }
function fechaOverlay() { renovaOverlay(); document.body.classList.remove('mg-on'); }
const ctxJogo = (p) => ({ lang: LANG, A, st, tr, U, p, paras, esc, linkify, vsrc, L, toast: (t) => toast(sub(tr(t))), registrar, salvar, guarda, veste, sub, rostoImg, nomeCard, Agua, frase, fraseAcende,
  narrate: (n, fila, onEnd) => { if (A.ctx && A.on) A.narrate(vozUrl(n), onEnd || null, fila); else if (onEnd) onEnd(false); },
  gesto: (root, titulo, subT) => gesto(root, titulo, subT) });
// o véu antes do jogo: uma frase de como jogar, e um toque para começar
function gesto(root, titulo, subT) {
  const veu = document.createElement('div'); veu.className = 'gesto-veu';
  const g = document.createElement('div'); g.className = 'gesto';
  g.innerHTML = `<p>${esc(titulo)}</p>${subT ? `<small>${esc(subT)}</small>` : ''}<em class="gesto-ir">${esc(U('comecar'))}</em>`;
  root.appendChild(veu); root.appendChild(g); requestAnimationFrame(() => { g.classList.add('on'); veu.classList.add('on'); });
  window.__mgPausa = true;
  return new Promise((res) => {
    let feito = false;
    const some = (e) => {
      if (feito) return; if (e) { if (e.cancelable) e.preventDefault(); e.stopPropagation(); }
      feito = true; window.__mgPausa = false;
      g.classList.remove('on'); veu.classList.remove('on'); setTimeout(() => { g.remove(); veu.remove(); }, 500);
      root.removeEventListener('pointerdown', some, true); removeEventListener('keydown', some, true); res();
    };
    setTimeout(() => { root.addEventListener('pointerdown', some, true); addEventListener('keydown', some, true); }, 350);
    if (BOT()) setTimeout(some, 50);
  });
}
function renderMinijogo(p) {
  const tipo = p.minijogo, done = st.feitos['mg:' + p.id];
  if (done) { appendParas(typeof p.depois === 'function' ? p.depois(st) : p.depois); return true; }
  const dica = p.mgDica !== undefined ? tr(typeof p.mgDica === 'function' ? p.mgDica(st) : p.mgDica) : (typeof U('dica')[tipo] === 'function' ? U('dica')[tipo](st) : U('dica')[tipo]);
  const vb = (U('verboDe') || {})[tipo];
  const nome = (typeof p.mgNome === 'function' ? tr(p.mgNome(st)) : p.mgNome ? tr(p.mgNome) : null) || U('mg')[tipo];
  box.innerHTML = `<p class="eyebrow">${U('momento')}</p><button class="opt jogar" id="mgGo"><span class="k">▶</span><span class="tx">${vb ? `<span class="verbo v-${vb}">${esc(U('verbo')[vb])}</span>` : ''}${esc(nome)}</span></button>${dica ? `<p class="dica">${esc(dica)}</p>` : ''}`;
  $('#mgGo').onclick = () => {
    box.innerHTML = '';
    const o = abreOverlay('j7 jg-' + tipo);
    const fn = window.JOGOS7[tipo];
    Promise.resolve(fn(o, ctxJogo(p))).then((res) => {
      st.jogos[p.jogoId || tipo] = res || true; st.feitos['mg:' + p.id] = 1; salvar(); if (overlay === o) fechaOverlay();
      if (p.aoTerminar) p.aoTerminar(st, res, { guarda, veste, toast: (t) => later(() => toast(sub(tr(t))), 400) });
      salvar(); desenhaVeu();
      if (P[st.i] !== p) return;   // o leitor saiu da página no meio do jogo: o resultado fica guardado, o texto não cai em outra página
      if (res && res.nav) return irProxima();
      appendComSom(typeof p.depois === 'function' ? p.depois(st) : p.depois, p.sonsDepois, () => setNext(true));
      panel.scrollTop = panel.scrollHeight;
    });
  };
  return false;
}

// ---------------------------------------------------------------- navegação
function irProxima() {
  const p = P[st.i];
  if (p && escolhaAtiva(p) && !st.escolhas[p.escolha.id] && !p._revelado) { p._revelado = true; setNext(false); abreEscolha(p); box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); return; }
  if (p && p.apaga && !p._saindo) { p._saindo = true; setNext(false); document.body.classList.add('apaga'); later(() => { p._saindo = false; irProxima2(); }, 2000); return; }
  irProxima2();
}
function irProxima2() {
  const p = P[st.i];
  cuesPend.forEach((c) => c.tocar()); cuesPend = [];
  if (p && p.aoSair && !st.feitos['out:' + p.id]) { st.feitos['out:' + p.id] = 1; p.aoSair(st, { guarda, veste }); }
  if (p && p.fim) return resumo();
  // presa ou derrotada: volta ao ponto guardado (a saída da cela), com tudo o que veio depois desfeito
  if (p && p.volta && st.ckpt) {
    const tent = (st.tentativas || 0) + 1, ck = st.ckpt;
    st = JSON.parse(ck); st.ckpt = ck; st.tentativas = tent; st.feitos['ck:' + P[st.i].id] = 1;
    P.forEach((x) => { delete x._revelado; delete x._saindo; });
    salvar(); A.ctx && A.virar(); render(1); return;
  }
  const d = L.desvio && L.desvio(st, p);
  if (d) { const k = P.findIndex((x) => x.id === d); if (k >= 0 && k !== st.i) { st.i = k; A.ctx && A.virar(); render(1); return; } }
  const j = idxVis(st.i, 1); if (j >= P.length) return resumo();
  st.i = j; A.ctx && A.virar(); render(1);
}
function irAnterior() { const j = idxVis(st.i, -1); if (j < 0) return; st.i = j; A.ctx && A.virar(); render(-1); }
btnNext.onclick = () => { if (!btnNext.disabled) irProxima(); };
btnPrev.onclick = irAnterior;
addEventListener('keydown', (e) => {
  if (document.body.classList.contains('mg-on') || !$('#cover').classList.contains('hide') || document.querySelector('.piscar')) return;
  if ($('#codex').classList.contains('show') || $('#colecaoModal').classList.contains('show')) { if (e.key === 'Escape') { $('#codex').classList.remove('show'); $('#colecaoModal').classList.remove('show'); } return; }
  if (['ArrowRight', 'Enter', ' '].includes(e.key)) { e.preventDefault(); const pb = $('.portao-btn'); if (pb) pb.click(); else if (!btnNext.disabled) irProxima(); }
  else if (e.key === 'ArrowLeft') irAnterior();
  else if (/^[1-6]$/.test(e.key)) { const bs = [...box.querySelectorAll('.opt:not(:disabled)')]; const b = bs[+e.key - 1]; b && b.click(); }
  else if (e.key === 'c' || e.key === 'C') { if (st.colecao.length) abrirColecao(); }
});
let sx = null, sy = null;
panel.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
panel.addEventListener('touchend', (e) => {
  if (sx == null) return; const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null;
  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { if (dx < 0 && !btnNext.disabled) irProxima(); else if (dx > 0) irAnterior(); }
});

// ---------------------------------------------------------------- resumo final (estilo Telltale)
function guardaEstado() {
  try {
    const todos = JSON.parse(localStorage.getItem('aqv_estado') || '{}');
    todos.v = 1;
    todos[L.chaveEstado] = Object.assign(L.estadoFinal(st), { pontos: st.pontos || null, quando: new Date().toISOString() });
    localStorage.setItem('aqv_estado', JSON.stringify(todos));
  } catch (e) {}
}
function pontosCap1() {
  try {
    if (ANTES.cap1 && Number.isFinite(ANTES.cap1.pontos)) return Math.round(ANTES.cap1.pontos);
    const c1 = JSON.parse(localStorage.getItem('livro_cap01') || 'null');
    if (c1 && c1.jogo && Number.isFinite(Number(c1.jogo.score))) return Math.round(Number(c1.jogo.score));
  } catch (e) {}
  return null;
}
function anteriores() {
  const e = ANTES, out = {};
  const c1 = pontosCap1(); if (c1 != null) out.cap01 = c1;
  if (e.cap2 && e.cap2.pontos && Number.isFinite(e.cap2.pontos.total)) out.cap02 = Math.round(e.cap2.pontos.total);
  if (e.cap3 && Number.isFinite(e.cap3.pontos)) out.cap03 = Math.round(e.cap3.pontos);
  ['cap4', 'cap5', 'cap6'].forEach((k) => { if (e[k] && e[k].pontos && Number.isFinite(e[k].pontos.total)) out['cap0' + k.slice(3)] = Math.round(e[k].pontos.total); });
  return out;
}
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function jogadorId() {
  try {
    let j = localStorage.getItem('aqv_jogador');
    if (!j || !UUID.test(j)) { j = UUID.test(st.sessao) ? st.sessao : uuid(); localStorage.setItem('aqv_jogador', j); }
    return j;
  } catch (e) { return UUID.test(st.sessao) ? st.sessao : null; }
}
function calculaPontos() {
  const r = L.pontos(st), ant = anteriores();
  st.pontos = { total: r.total, partes: r.partes, antes: ant, somaAntes: Object.values(ant).reduce((a, b) => a + b, 0) };
  return st.pontos;
}
async function enviaPontos(pt) {
  const j = jogadorId(); if (!j) return null;
  const rpc = (cap, pontos, detalhes) => fetch(`${SUPA.url}/rest/v1/rpc/livro_salva_pontos`, {
    method: 'POST', headers: { apikey: SUPA.key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_jogador: j, p_capitulo: cap, p_pontos: pontos, p_detalhes: detalhes }),
  }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  for (const [cap, v] of Object.entries(pt.antes)) await rpc(cap, Math.min(2000000, v), { origem: L.id });
  const r = await rpc(L.id, pt.total, Object.fromEntries(pt.partes));
  return r && r[0] ? r[0] : null;
}
function mostraPontos(pt, srv) {
  const loc = LANG === 'en' ? 'en-US' : 'pt-BR', n = (x) => Number(x).toLocaleString(loc);
  const temAntes = Object.keys(pt.antes).length > 0;
  const jornada = srv && srv.total != null ? Number(srv.total) : temAntes ? pt.somaAntes + pt.total : null;
  $('#rsPontos').innerHTML = `
    <p class="eyebrow">${U('pontos')}</p>
    <p class="rs-num">${n(pt.total)}</p>
    <ul class="rs-pts">${pt.partes.map(([k, v]) => `<li><span>${U('pts')[k]}</span><b>${n(v)}</b></li>`).join('')}
    ${temAntes ? `<li><span>${U('pts').antes}</span><b>${n(pt.somaAntes)}</b></li>` : ''}</ul>
    ${jornada != null ? `<p class="rs-jornada"><span>${U('jornada')}</span><b>${n(jornada)}</b>${srv && srv.posicao ? `<em>${U('posicao')(n(srv.posicao), n(srv.leitores))}</em>` : ''}</p>` : `<p class="rs-sem">${U('semCap1')}</p>`}`;
}
async function resumo() {
  const pt = calculaPontos();
  guardaEstado(); salvar();
  A.stopNarr(); frase('some');
  $('#resumo').classList.add('show');
  mostraPontos(pt, null); enviaPontos(pt).then((srv) => { if (srv) mostraPontos(pt, srv); });
  const R = L.resumo(st, LANG);
  $('#rsFrase').textContent = R.frase;
  const pil = $('#rsPilares');
  if (pil) pil.innerHTML = R.pilares && R.pilares.length ? `<p class="eyebrow">${esc(R.pilaresT)}</p>` + R.pilares.map((x) => `<div class="rs-pilar"><h4>${esc(x.titulo)}</h4><p class="feito">${esc(x.feito)}</p>${x.volta ? `<p class="volta">${esc(x.volta)}</p>` : ''}</div>`).join('') : '';
  const rv = R.revela;
  $('#rsRevela').innerHTML = !rv ? '' : `<div class="kcard"><div class="kimg" style="background-image:url('${rv.img}')"></div><div class="ktx"><p class="eyebrow">${esc(rv.olho)}</p><h3>${esc(rv.nome)}</h3><p class="ksub">${esc(rv.titulo)}</p>${[].concat(rv.texto).map((t) => `<p class="ktexto">${esc(t)}</p>`).join('')}</div></div>`;
  $('#rsRevela').classList.toggle('card', !!rv);
  $('#rsRel').innerHTML = R.notas.map((r) => { const rs = rostoDe(String(r).split(':')[0]); return `<li class="${rs ? 'com-rosto' : ''}">${rostoHTML(rs)}<span>${esc(r)}</span></li>`; }).join('');
  $('#rsPerfil').innerHTML = R.colecao && R.colecao.length ? `<p class="eyebrow">${esc(R.colecaoT)}</p><ul class="rs-col">${R.colecao.map((x) => `<li>${rostoHTML(rostoImg(x.id))}<span>${esc(x.nome)}</span></li>`).join('')}</ul>` : '';
  const desenha = (stats) => {
    $('#rsEsc').innerHTML = R.linhas.map((l) => {
      const tot = stats.filter((x) => x.escolha === l.id).reduce((a, b) => a + Number(b.total), 0);
      const mine = stats.find((x) => x.escolha === l.id && x.opcao === l.opcao);
      const pct = tot && mine ? Math.round((Number(mine.total) / tot) * 100) : null;
      return `<li><span class="q">${esc(l.q)}</span><span class="a">${esc(l.a)}</span>${pct != null ? `<span class="pct"><i style="width:${pct}%"></i><b>${U('mesmo')(pct)}</b></span>` : ''}</li>`;
    }).join('');
  };
  desenha([]); desenha(await estatisticas());
}
const reiniciar = () => { st = novoEstado(); if (L.inicio) L.inicio(st); salvar(); desenhaVeu(); $('#resumo').classList.remove('show'); render(1); };
$('#rsReler').onclick = () => { if (confirm(U('confirm'))) reiniciar(); };
$('#menuReset').onclick = () => { if (confirm(U('confirm'))) reiniciar(); };

// ---------------------------------------------------------------- idioma
function aplicaIdioma() {
  document.documentElement.lang = LANG === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('.lang').forEach((b) => { b.textContent = LANG === 'pt' ? 'EN' : 'PT'; b.setAttribute('aria-label', LANG === 'pt' ? 'Read in English' : 'Ler em português'); });
  $('#cvTitle').textContent = tr(L.titulo);
  $('#cvEye').textContent = U('coverEye'); $('#cvSub').textContent = LANG === 'en' ? L.subtituloEn : L.subtitulo; $('#cvLede').textContent = U('coverLede');
  $('#cvGo').textContent = salvo && salvo.i > 0 ? U('coverRestart') : U('coverGo'); $('#cvCont').textContent = U('coverCont'); $('#cvHint').textContent = U('coverHint');
  $('.tl .cap').textContent = U('capN'); $('#rhead').textContent = `${tr(L.titulo)} · ${LANG === 'en' ? L.subtituloEn : L.subtitulo}`;
  $('#rsEye').textContent = U('fimCap'); $('#rsH').textContent = U('ficou'); $('#rsSuas').textContent = U('suas'); $('#rsReler').textContent = U('reler');
  $('#rsProx').textContent = (LANG === 'en' ? L.proximo.tituloEn : L.proximo.titulo) + (L.proximo.url ? ' →' : '');
  document.title = LANG === 'en' ? L.tituloPagEn : L.tituloPag;
  desenhaVeu();
}
document.querySelectorAll('.lang').forEach((b) => b.addEventListener('click', () => {
  LANG = LANG === 'pt' ? 'en' : 'pt'; try { localStorage.setItem('livro_lang', LANG); } catch (e) {}
  aplicaIdioma(); if ($('#cover').classList.contains('hide') && !document.body.classList.contains('mg-on')) render(0); if ($('#resumo').classList.contains('show')) resumo();
}));

// ---------------------------------------------------------------- capa / início
$('#cover').style.setProperty('--capa', `url("${L.capa}")`);
if (L.proximo.url) $('#rsProx').href = L.proximo.url; else { $('#rsProx').removeAttribute('href'); $('#rsProx').classList.add('off'); }
const salvo = carregar();
if (salvo && salvo.i > 0) $('#cvCont').hidden = false;
aplicaIdioma();
Clima.set('bolhas'); Agua.set(.6); document.body.classList.add('na-capa');
const comecar = (continuar) => {
  A.init(); A.resume();
  st = continuar && salvo ? Object.assign(novoEstado(), salvo) : novoEstado();
  if (!(continuar && salvo) && L.inicio) L.inicio(st);
  salvar(); desenhaVeu();
  ['assets/audio/sfx/pagina.mp3', 'assets/audio/sfx/ouro.mp3', 'assets/audio/sfx/vestir.mp3'].forEach((u) => A.buf(u));
  $('#cover').classList.add('hide'); document.body.classList.remove('na-capa'); A.virar();
  if (!(continuar && salvo) && L.intertitulo) intertitulo(tr(L.intertitulo), () => render(1)); else render(1);
};
function intertitulo(frase_, depois) {
  let el = $('#intertitulo');
  if (!el) { el = document.createElement('section'); el.id = 'intertitulo'; el.setAttribute('aria-live', 'polite'); document.body.appendChild(el); }
  el.innerHTML = `<p>${esc(frase_)}</p>`; el.classList.remove('sai'); el.classList.add('show');
  let feito = false;
  const fim = () => { if (feito) return; feito = true; clearTimeout(t); document.removeEventListener('keydown', tecla, true); el.classList.add('sai'); setTimeout(() => { el.classList.remove('show', 'sai'); }, 1200); setTimeout(depois, 500); };
  const t = setTimeout(fim, 5200);
  const tecla = (e) => { if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); fim(); } };
  el.onclick = fim;
  document.addEventListener('keydown', tecla, true);
}
$('#cvGo').onclick = () => comecar(false);
$('#cvCont').onclick = () => comecar(true);
$('#som').onclick = () => { A.init(); A.setOn(!A.on); $('#som').classList.toggle('off', !A.on); };
window.__LIVRO = { get st() { return st; }, set st(v) { st = v; }, render, irProxima, A, guarda, veste, frase, ir: (id) => { st.i = P.findIndex((p) => p.id === id); render(1); } };
})();

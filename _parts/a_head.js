/* ==========================================================================
   AS QUATRO VONTADES · CAPÍTULO VII · A MADRINHA — A MULHER SEM NOME
   --------------------------------------------------------------------------
   Cada texto vem em par: T('português', 'english'). O inglês é o original;
   o português é a tradução e é a chave. Mudou um, mude o outro.
   POV: a avatar (ela não sabe que é avatar, não sabe de deus nenhum).
   Presente, primeira pessoa. Fala leve e molhada, perto do ouvido; o ácido
   fica no que ela vê e no que faz. Metáfora do mar ou da sombra, uma por
   tela. Nunca diz medo, deus, jogo, peça, destino, vontade. O que chega
   perto de medo, ela chama de perigoso.
   V('D01', T(...)) prende a dublagem ao parágrafo. D = a voz dela (narração),
   S = soldados da Sentença, L = Laura, M = falas de máscara (a voz da pessoa
   cujo rosto ela usa), A = o alvo quando diz a frase de ouro em voz alta.
   Travessão só em fala. '«' abre a frase de ouro na boca de outro.
   O que vem de antes: st.c4 e st.c6 (copiados de aqv_estado em inicio()).
   ========================================================================== */
window.LIVRO_EN = window.LIVRO_EN || {};
const T = (pt, en) => { if (en != null) window.LIVRO_EN[pt] = en; return pt; };
const se = (cond, t) => ({ se: cond, t });
const V = (voz, t, cond) => ({ voz, t, se: cond });
const G = (guarda, t) => ({ guarda, t });
const IMG = (n) => 'assets/images/' + n + '.jpg';
const VID = (n) => 'assets/video/' + n + '.mp4';
const ROSTO = (n) => 'assets/images/rostos/' + n + '.jpg';

// ---------------------------------------------------------------- o que veio antes
const c4 = (st) => st.c4 || {};
const c6 = (st) => st.c6 || {};
// o círculo da Laura aos 36 (decidido pelo Cap. IV): só tem consorte quem terminou em romance
const consorte = (st) => (c4(st).noite === 'markus' ? 'markus' : c4(st).beijoJustine ? 'justine' : null);
const circulo = (st) => (consorte(st) === 'justine' ? 'justine' : 'markus');
const justineCasada = (st) => consorte(st) !== 'justine';
// ---------------------------------------------------------------- atalhos
const J = (st, k) => st.jogos[k] || {};
const tem = (st, id) => st.colecao.includes(id);
const TRIP = ['maru', 'lio', 'teshka', 'nhale', 'brann'];
const noBarco = (st, k) => ((J(st, 'tripulacao').escolhidos) || ['maru', 'lio', 'brann']).includes(k);
// a lealdade da tripulação (escondida): nasce do que cada um é e muda com o que ela responde nas noites
const LEAL0 = { maru: 0, lio: 2, teshka: 0, nhale: 1, brann: 0 };
const leal = (st, k) => { const l = st.f.leal || {}; return l[k] != null ? l[k] : LEAL0[k]; };
const ganha = (k, n) => (st) => { st.f.leal = Object.assign({}, st.f.leal || {}); st.f.leal[k] = leal(st, k) + n; };
const vivoBarco = (st, k) => noBarco(st, k) && st.f.motimMorto !== k;
// quem tenta virar o barco diante da Sentença: o primeiro sem lealdade (o Maru não, se ela tomou o leme dele)
const amotinado = (st) => ['teshka', 'maru', 'brann'].find((k) => noBarco(st, k) && leal(st, k) <= 0 && !(k === 'maru' && st.escolhas.n_maru === 'cruel')) || null;
const teshkaAborda = (st) => vivoBarco(st, 'teshka') && !!st.f.teshkaGalera;
const brannAtira = (st) => vivoBarco(st, 'brann') && !!st.f.brannAtira;
const maruLado = (st) => vivoBarco(st, 'maru') && (leal(st, 'maru') >= 1 || !!st.f.maruCanta);
const nhaleAjuda = (st) => noBarco(st, 'nhale') && leal(st, 'nhale') >= 1;
// o último que estende a mão na água (a Nhalé fica embaixo; quem abordou morre no convés deles)
const ultimoDe = (st) => ['lio', 'maru', 'brann', 'teshka'].find((k) => vivoBarco(st, k) && !(k === 'teshka' && teshkaAborda(st))) || null;
const salvo = (st) => (st.escolhas.rosto === 'nhale' ? st.f.ultimo : null);
const NOME_TRIP = { maru: 'Maru', lio: 'Lio', teshka: 'Teshka', nhale: 'Nhalé', brann: 'Brann' };
// as três perguntas de Alvena: quando a Sentença passa, o que fazem com quem pegam vivo, como chegar perto
const sabe = (st, k) => !!st.f['resp_' + k];
const fezCarcereiro = (st, id) => st.escolhas.carcereiro === id || st.escolhas.carcereiro2 === id;
const termos = (st) => J(st, 'interrogatorio').termos || 'sombra';
const alvoDa = (st, k) => st.escolhas['alvo' + k] || null;
const trabalhados = (st) => [1, 2, 3].map((k) => alvoDa(st, k)).filter(Boolean);
const resultadoDe = (st, alvo) => { const k = [1, 2, 3].find((n) => alvoDa(st, n) === alvo); return k ? (J(st, 'noite' + k).resultado || 'nada') : null; };
const NOMES_ALVO = {
  markus: T('Markus', 'Markus'), justine: T('Justine', 'Justine'), joseph: T('Sir Joseph', 'Sir Joseph'), varr: T('Lorde Varr', 'Lord Varr'), ansel: T('Ansel', 'Ansel'), mapas: T('a Sala dos Mapas', 'the Map Room'),
};

// a Ala Funda: os quatro carcereiros, cada um trabalhado com o que ela aprendeu deles pelo som (dois, em duas escolhas)
const ALA_OPCOES = (filtro) => [
  { id: 'wim', gesto: true, tom: 'divertida', txt: T('Dar ao Wim uma palavra para o buraco da canção.', 'Give Wim a word for the hole in his song.'),
    resultado: [T('Na terceira descida, ele para no lugar de sempre, onde a palavra some. Da cela, eu dou uma para ele. Errada, e bonita.', 'On his third trip down, he stops in the usual place, where the word goes missing. From the cell, I hand him one. Wrong, and pretty.'),
      T('Wim ri no degrau, com a tocha na mão. — Não é essa — diz, e fica. A canção dele nunca teve resposta.', 'Wim laughs on the step, torch in hand. — That’s not it — he says, and stays. His song has never had an answer.'),
      T('— A Lâmina desce sozinha, sabia? Sempre. E pergunta o que já sabe, só para ver se a gente mente.', '— The Blade comes down alone, you know? Always. And she asks what she already knows, just to see if you lie.')] },
  { id: 'garrick', fala: true, tom: 'fria', txt: T('Garrick.', 'Garrick.'),
    resultado: [T('Digo o nome dele no escuro, uma vez. Ele para no meio da escada. Nunca disse o nome perto da cela.', 'I say his name into the dark, once. He stops halfway down the stairs. He has never said his name near the cell.'),
      T('— O comandante Simon dizia que dá azar olhar conjuradora nos olhos — diz, de costas, por fim. — Servi com ele. Era homem de dividir o pão com quem estava de guarda. Na frente dela, ninguém diz o nome dele. Ninguém.', '— Commander Simon used to say it’s bad luck to look a conjurer in the eye — he says at last, with his back to me. — I served under him. He was a man who shared his bread with whoever stood watch. In front of her, no one says his name. No one.')] },
  { id: 'pell', gesto: true, tom: 'cruel', txt: T('Rir quando o Pell tropeçar no verso.', 'Laugh when Pell trips on the line.'),
    resultado: [T('Na volta, ele tropeça no verso de sempre. Da cela, eu rio, uma vez, baixo.', 'On the way back, he trips on the usual line. From the cell, I laugh, once, low.'),
      T('Pell para no degrau. Uma conjuradora rindo da Juíza ele não deixa passar, e desce para me ensinar.', 'Pell stops on the step. A conjurer laughing at the Judge he will not let pass, and he comes down to teach me.'),
      T('— A Juíza pesa todo mundo. Até a Lâmina. A Lâmina não reza desde o irmão, e dizem que quer o deserto. Vingança é peso que a Juíza não perdoa.', '— The Judge weighs everyone. Even the Blade. The Blade hasn’t prayed since her brother, and they say she wants the desert. Vengeance is a weight the Judge doesn’t forgive.')] },
  { id: 'dunstan', gesto: true, tom: 'doce', txt: T('Arrancar uma moeda da barra da saia e deixar no chão, onde ele vê.', 'Pull a coin from my skirt’s hem and leave it on the floor, where he will see it.'),
    resultado: [T('Ouro velho, da Orla. Deixo perto da grade e não digo nada. Na descida seguinte, a moeda some.', 'Old gold, from the Shore. I leave it near the bars and say nothing. On his next trip down, the coin is gone.'),
      T('Na outra, Dunstan para na frente da cela e conta as moedas do bolso em voz alta. Tem uma a mais.', 'On the next, Dunstan stops at the cell and counts the coins in his pocket out loud. There is one more.'),
      T('— Sabe quanto custa uma galera parada na costa de vocês? Mais que uma aldeia por ano. Uma galera por aldeia. E a gente aqui com o soldo atrasado.', '— You know what a galley sitting off your coast costs? More than a village a year. A galley for every village. And us down here with our pay late.')] },
].map((o) => (filtro ? Object.assign({ se: (st) => filtro(st, o.id) }, o) : o));

// os avisos (estilo Telltale)
const AV = {
  orla: T('A Orla vai lembrar disso.', 'The Shore will remember this.'),
  maru: T('Maru vai lembrar disso.', 'Maru will remember this.'),
  lio: T('Lio vai lembrar disso.', 'Lio will remember this.'),
  teshka: T('Teshka vai lembrar disso.', 'Teshka will remember this.'),
  nhale: T('Nhalé vai lembrar disso.', 'Nhalé will remember this.'),
  brann: T('Brann vai lembrar disso.', 'Brann will remember this.'),
  trip: T('A tripulação vai lembrar disso.', 'The crew will remember this.'),
  ninguem: T('Ninguém vai lembrar disso.', 'No one will remember this.'),
  laura: T('Laura vai lembrar disso.', 'Laura will remember this.'),
  lavadeira: T('A lavadeira vai lembrar disso.', 'The washerwoman will remember this.'),
};

window.LIVRO_UI = {
  pt: {
    parte: 'Parte', prox: 'Próxima', fim: 'Encerrar o capítulo', voltar: '← Voltar', continuar: 'Continuar', oque: 'O que eu faço?', escolheu: 'Você escolheu:', silencio: 'não dizer nada', silencioR: 'Silêncio', momento: 'Momento de jogo',
    colecaoT: 'A Coleção', colecaoSub: 'Os rostos que eu guardo', colecaoNovo: 'Na Coleção', colecaoVazia: 'Nenhum rosto ainda.', serve: 'serve agora', deTxt: 'de', lugares: { orla: 'A Orla', sentenca: 'A Sentença', redom: 'Redom', coluna: 'A coluna' }, quer: 'Quer', naoDiz: 'Não diz', disse: 'Disse', vestivel: 'tenho a roupa',
    dicaVeu: 'O rosto que ela veste fica no alto. Toque nele para abrir a Coleção.', piscarDica: 'Toque duas vezes. Rápido.',
    mg: { escuta: 'Os pequenos', tripulacao: 'A tripulação', mao: 'Abrir a mão', morta: 'A Morta', anzol: 'O Anzol', interrogatorio: 'A Lâmina', ordem: 'A Ordem' },
    verbo: { ouvir: 'Ouvir', poder: 'Poder', esperar: 'Esperar', anzol: 'Anzol', ler: 'Ler' },
    verboDe: { escuta: 'ouvir', tripulacao: 'ouvir', mao: 'poder', morta: 'esperar', anzol: 'anzol', interrogatorio: 'anzol', ordem: 'ler' },
    dica: {
      escuta: 'Toque em quem você quer ouvir. Não sobra tempo para todos: o que cada um é diz o que pode saber.',
      tripulacao: 'Toque em três para levar. Toque outra vez para deixar.',
      mao: 'Um toque. Você escolhe quando.',
      morta: 'Não se mexa. Quem se mexe para de ouvir.',
      anzol: 'A frase de ouro, no alto, é o que você quer ouvir da boca dele. A cada fala, escolha a sua: as palavras acendem quando ele chega perto. Dizer a frase você mesma apaga palavras.',
      interrogatorio: 'A frase de ouro é o que você quer ouvir da boca dela. A vermelha é o que ela vai concluir de você. Cada resposta acende uma, a outra ou as duas. Mentira acende o vermelho, porque as orelhas falam. As respostas com um rosto vêm de alguém que você ouviu.',
      ordem: 'Arraste os papéis para mudar a ordem, ou use as setas. Nenhuma palavra muda: só a ordem em que vão ser lidos.',
    },
    comecar: 'Toque para começar',
    coverEye: 'As Quatro Vontades · Livro I · Capítulo VII', coverLede: 'Ela sobe do fundo com uma frase pronta e nenhum nome. O povo dela se ajoelha. Ela acha natural.', coverGo: 'Subir', coverCont: 'Continuar de onde parei', coverRestart: 'Começar do início', coverHint: 'Use fones. Avance com o botão, com a seta → ou deslizando para o lado.',
    confirm: 'Recomeçar o capítulo? Suas escolhas serão apagadas.', capN: 'Capítulo VII', fimCap: 'Fim do Capítulo VII', ficou: 'O que ficou no sal', suas: 'O que você escolheu', reler: 'Reler e escolher diferente', mesmo: (p) => `${p}% dos leitores fizeram o mesmo`,
    pontos: 'Pontuação do capítulo', jornada: 'Jornada (Capítulos I a VII)', posicao: (p, n) => `${p}º de ${n} leitores`, semCap1: 'Jogue os capítulos anteriores neste navegador para somar a jornada.',
    pts: { anzol: 'O Anzol', morta: 'A Morta', olhos: 'Os olhos', ala: 'A Ala Funda', antes: 'Capítulos I a VI' },
    j: { seguir: 'Seguir', zarpar: 'Zarpar', faltam: (n) => (n === 1 ? 'Falta um.' : `Faltam ${n}.`), sobra: (n) => (n === 1 ? 'Sobra tempo para um.' : `Sobra tempo para ${n}.`), abrir: 'Abrir a mão', deixar: 'Deixar assim', ouvidos: 'ouvido', subir: 'subir', descer: 'descer', porta: 'porta', pergunta: 'pergunta', silencio: 'silêncio', direto: 'direto' },
  },
  en: {
    parte: 'Part', prox: 'Next', fim: 'Close the chapter', voltar: '← Back', continuar: 'Continue', oque: 'What do I do?', escolheu: 'You chose:', silencio: 'say nothing', silencioR: 'Silence', momento: 'Moment of play',
    colecaoT: 'The Collection', colecaoSub: 'The faces I keep', colecaoNovo: 'In the Collection', colecaoVazia: 'No faces yet.', serve: 'useful now', deTxt: 'from', lugares: { orla: 'The Shore', sentenca: 'The Sentence', redom: 'Redom', coluna: 'The column' }, quer: 'Wants', naoDiz: 'Doesn’t say', disse: 'Said', vestivel: 'I have the clothes',
    dicaVeu: 'The face she wears stays at the top. Tap it to open the Collection.', piscarDica: 'Tap twice. Quick.',
    mg: { escuta: 'The small folk', tripulacao: 'The crew', mao: 'Open the hand', morta: 'The Dead Woman', anzol: 'The Hook', interrogatorio: 'The Blade', ordem: 'The Order' },
    verbo: { ouvir: 'Listen', poder: 'Power', esperar: 'Wait', anzol: 'Hook', ler: 'Read' },
    verboDe: { escuta: 'ouvir', tripulacao: 'ouvir', mao: 'poder', morta: 'esperar', anzol: 'anzol', interrogatorio: 'anzol', ordem: 'ler' },
    dica: {
      escuta: 'Tap whoever you want to listen to. There is no time for all of them: what each one is tells you what they might know.',
      tripulacao: 'Tap three to take. Tap again to leave one behind.',
      mao: 'One tap. You choose when.',
      morta: 'Don’t move. Whoever moves stops hearing.',
      anzol: 'The gold sentence at the top is what you want to hear from his mouth. At each line, choose yours: the words light up as he comes closer. Saying the sentence yourself puts words out.',
      interrogatorio: 'The gold sentence is what you want to hear from her mouth. The red one is what she will conclude about you. Each answer lights one, the other, or both. A lie lights the red, because the ears talk. Answers with a face come from someone you listened to.',
      ordem: 'Drag the papers to change the order, or use the arrows. No word changes: only the order in which they are read.',
    },
    comecar: 'Tap to begin',
    coverEye: 'The Four Wills · Book I · Chapter VII', coverLede: 'She rises from the deep with a sentence ready and no name. Her people kneel. She finds it natural.', coverGo: 'Rise', coverCont: 'Continue where I left off', coverRestart: 'Start from the beginning', coverHint: 'Wear headphones. Move on with the button, the → key, or a swipe.',
    confirm: 'Restart the chapter? Your choices will be erased.', capN: 'Chapter VII', fimCap: 'End of Chapter VII', ficou: 'What the salt kept', suas: 'What you chose', reler: 'Read again and choose differently', mesmo: (p) => `${p}% of readers did the same`,
    pontos: 'Chapter score', jornada: 'Journey (Chapters I to VII)', posicao: (p, n) => `#${p} of ${n} readers`, semCap1: 'Play the earlier chapters in this browser to add up the journey.',
    pts: { anzol: 'The Hook', morta: 'The Dead Woman', olhos: 'The eyes', ala: 'The Deep Ward', antes: 'Chapters I to VI' },
    j: { seguir: 'Go on', zarpar: 'Set sail', faltam: (n) => (n === 1 ? 'One more.' : `${n} more.`), sobra: (n) => (n === 1 ? 'Time for one.' : `Time for ${n}.`), abrir: 'Open the hand', deixar: 'Leave it so', ouvidos: 'heard', subir: 'up', descer: 'down', porta: 'door', pergunta: 'question', silencio: 'silence', direto: 'direct' },
  },
};

window.LIVRO = {
  id: 'cap07',
  chaveEstado: 'cap7',
  titulo: T('A Madrinha', 'The Godmother'),
  subtitulo: 'A Mulher Sem Nome',
  subtituloEn: 'The Woman With No Name',
  intertitulo: T('Vinte dias depois das Goelas.', 'Twenty days after the Gullets.'),
  tituloPag: 'A Madrinha · As Quatro Vontades',
  tituloPagEn: 'The Godmother · The Four Wills',
  capa: IMG('capa'),
  proximo: { titulo: 'Capítulo VIII', tituloEn: 'Chapter VIII', url: '' },

  // ---------------------------------------------------------------- o que veio antes, com os padrões para quem não jogou
  inicio: (st) => {
    let a = {}; try { a = JSON.parse(localStorage.getItem('aqv_estado') || '{}') || {}; } catch (e) {}
    const k4 = a.cap4 || {}, k6 = a.cap6 || {};
    st.c4 = { veio: !!a.cap4, noite: k4.noite || 'ficar', beijoJustine: !!k4.beijoJustine, varr: k4.varr || null, josephDesconfia: !!k4.josephDesconfia };
    st.c6 = { veio: !!a.cap6, rangido: k6.rangido || 'olhar' };
  },

  // ---------------------------------------------------------------- a frase (em ouro). k marca as palavras que ficam turvas até ela entender
  frase: {
    pt: [{ w: 'Laura', k: 'laura' }, { w: 'leva' }, { w: 'os' }, { w: 'melhores' }, { w: 'à' }, { w: 'Boca Seca', k: 'boca' }],
    en: [{ w: 'Laura', k: 'laura' }, { w: 'takes' }, { w: 'the' }, { w: 'best' }, { w: 'to the' }, { w: 'Dry Mouth', k: 'boca' }],
  },

  // ---------------------------------------------------------------- as zonas de som
  zonas: {
    fundo: { src: 'assets/audio/fundo-loop.mp3', volume: .5, reserva: 'fundo' },
    cais: { src: 'assets/audio/cais-loop.mp3', volume: .5, reserva: 'mar' },
    cabine: { src: 'assets/audio/cabine-loop.mp3', volume: .4, reserva: 'mar' },
    alvena: { src: 'assets/audio/alvena-loop.mp3', volume: .45, reserva: 'vento' },
    mar: { src: 'assets/audio/mar-aberto-loop.mp3', volume: .5, reserva: 'mar' },
    galera: { src: 'assets/audio/galera-loop.mp3', volume: .55, reserva: 'mar' },
    conves: { src: 'assets/audio/conves-loop.mp3', volume: .45, reserva: 'mar' },
    estrada: { src: 'assets/audio/estrada-loop.mp3', volume: .4, reserva: 'vento' },
    ala: { src: 'assets/audio/ala-funda-loop.mp3', volume: .45, reserva: 'pedra' },
    capital: { src: 'assets/audio/capital-dia-loop.mp3', volume: .4, reserva: 'vento' },
    noite: { src: 'assets/audio/capital-noite-loop.mp3', volume: .4, reserva: 'vento' },
    cisterna: { src: 'assets/audio/cisterna-loop.mp3', volume: .5, reserva: 'fundo' },
    dentro: { src: 'assets/audio/interior-loop.mp3', volume: .35, reserva: 'pedra' },
    coluna: { src: 'assets/audio/coluna-loop.mp3', volume: .5, reserva: 'vento' },
  },

  // a água da tela: forte na Orla e na forma verdadeira; em Redom, cada dia mais fraca; na pedra, nenhuma
  aguaDe: (st) => (st.f.pedra ? 0 : .3),
  salDe: () => 0,

  // o rosto dela (o medalhão sem máscara)
  rostos: { ela: { img: ROSTO('ela') } },
  // o primeiro nome de um aviso escolhe o rosto que aparece nele
  rostosAviso: { Maru: 'maru', Lio: 'lio', Teshka: 'teshka', Nhalé: 'nhale', Brann: 'brann', Laura: 'laura', 'Os Nymae': 'velha', 'A Orla': 'velha', 'The Shore': 'velha', 'A lavadeira': 'lavadeira', 'The washerwoman': 'lavadeira', Markus: 'markus', Justine: 'justine', Joseph: 'joseph', Varr: 'varr', Ansel: 'ansel' },

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
  { id: 'wim', de: 'wim', gesto: true, tom: 'divertida', txt: T('Dar ao Wim uma palavra para o buraco da canção.', 'Give Wim a word for the hole in his song.'),
    resultado: [T('Na terceira descida, ele para no lugar de sempre, onde a palavra some. Da cela, eu dou uma para ele. Errada, e bonita.', 'On his third trip down, he stops in the usual place, where the word goes missing. From the cell, I hand him one. Wrong, and pretty.'),
      T('Wim ri no degrau, com a tocha na mão. — Não é essa — diz, e fica. A canção dele nunca teve resposta.', 'Wim laughs on the step, torch in hand. — That’s not it — he says, and stays. His song has never had an answer.'),
      T('— A Lâmina desce sozinha, sabia? Sempre. E pergunta o que já sabe, só para ver se a gente mente.', '— The Blade comes down alone, you know? Always. And she asks what she already knows, just to see if you lie.')] },
  { id: 'garrick', de: 'garrick', fala: true, tom: 'fria', txt: T('Garrick.', 'Garrick.'),
    resultado: [T('Digo o nome dele no escuro, uma vez. Ele para no meio da escada. Nunca disse o nome perto da cela.', 'I say his name into the dark, once. He stops halfway down the stairs. He has never said his name near the cell.'),
      T('— O comandante Simon dizia que dá azar olhar conjuradora nos olhos — diz, de costas, por fim. — Servi com ele. Era homem de dividir o pão com quem estava de guarda. Na frente dela, ninguém diz o nome dele. Ninguém.', '— Commander Simon used to say it’s bad luck to look a conjurer in the eye — he says at last, with his back to me. — I served under him. He was a man who shared his bread with whoever stood watch. In front of her, no one says his name. No one.')] },
  { id: 'pell', de: 'pell', gesto: true, tom: 'cruel', txt: T('Rir quando o Pell tropeçar no verso.', 'Laugh when Pell trips on the line.'),
    resultado: [T('Na volta, ele tropeça no verso de sempre. Da cela, eu rio, uma vez, baixo.', 'On the way back, he trips on the usual line. From the cell, I laugh, once, low.'),
      T('Pell para no degrau. Uma conjuradora rindo da Juíza ele não deixa passar, e desce para me ensinar.', 'Pell stops on the step. A conjurer laughing at the Judge he will not let pass, and he comes down to teach me.'),
      T('— A Juíza pesa todo mundo. Até a Lâmina. A Lâmina não reza desde o irmão, e dizem que quer o deserto. Vingança é peso que a Juíza não perdoa.', '— The Judge weighs everyone. Even the Blade. The Blade hasn’t prayed since her brother, and they say she wants the desert. Vengeance is a weight the Judge doesn’t forgive.')] },
  { id: 'dunstan', de: 'dunstan', gesto: true, tom: 'doce', txt: T('Arrancar uma moeda da barra da saia e deixar no chão, onde ele vê.', 'Pull a coin from my skirt’s hem and leave it on the floor, where he will see it.'),
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
    colecaoT: 'A Coleção', colecaoSub: 'Os rostos que eu guardo', colecaoNovo: 'Na Coleção', colecaoVazia: 'Nenhum rosto ainda.', serve: 'serve agora', deTxt: 'de', iqOuro: 'o que eu quero ouvir da boca dela', anzolOuro: 'o que eu quero ouvir dessa boca', iqVerm: 'o que ela vai concluir de mim', lugares: { orla: 'A Orla', sentenca: 'A Sentença', redom: 'Redom', coluna: 'A coluna' }, quer: 'Quer', naoDiz: 'Não diz', disse: 'Disse', vestivel: 'tenho a roupa',
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
    colecaoT: 'The Collection', colecaoSub: 'The faces I keep', colecaoNovo: 'In the Collection', colecaoVazia: 'No faces yet.', serve: 'useful now', deTxt: 'from', iqOuro: 'what I want to hear from her mouth', anzolOuro: 'what I want to hear from that mouth', iqVerm: 'what she will conclude about me', lugares: { orla: 'The Shore', sentenca: 'The Sentence', redom: 'Redom', coluna: 'The column' }, quer: 'Wants', naoDiz: 'Doesn’t say', disse: 'Said', vestivel: 'I have the clothes',
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

  // ---------------------------------------------------------------- A COLEÇÃO: o codex dela, um cartão por rosto
  // nome, Quer, Não diz, Disse (na voz dela, curto). morto: o cartão fica, com a linha do fim.
  colecao: {
    velha: { lugar: 'orla', img: ROSTO('velha'), nome: T('A velha da escada', 'The old woman on the stairs'), quer: T('que a avó dela tenha tido razão.', 'for her grandmother to have been right.'), disse: T('Da casa da avó dela só sobrou ela. Os outros a Sentença levou.', 'Of her grandmother’s house only she is left. The rest the Sentence took.') },
    sarnai: { lugar: 'orla', img: ROSTO('sarnai'), nome: T('Sarnai, das Viúvas do Sal', 'Sarnai, of the Salt Widows'), quer: T('Alvena de volta.', 'Alvena back.'), naoDiz: T('que deve barcos a Ossian, e que alguém da casa dela vendeu a rota do irmão de Ruo.', 'that she owes Ossian boats, and that someone of her house sold the route of Ruo’s brother.'), disse: T('Redom fechou o porto de Alvena para a Orla.', 'Redom closed the port of Alvena to the Shore.') },
    ossian: { lugar: 'orla', img: ROSTO('ossian'), nome: T('Ossian Três-Dedos, dos Mastreiros', 'Ossian Three-Fingers, of the Mastmen'), quer: T('o meu nome do lado dele da mesa.', 'my name on his side of the table.'), naoDiz: (st) => (st.escolhas.chefes === 'doce' ? T('que já fez a conta do que ganha se Redom pagar.', 'that he has already worked out what he gains if Redom pays.') : null), disse: T('Redom leva vivos para a Lâmina os que acha que conjuram. Em Alvena, quem sabe das coisas é a casa da Ondina.', 'Redom takes those it thinks can conjure to the Blade alive. In Alvena, the one who knows things is Ondina’s house.') },
    ruo: { lugar: 'orla', img: ROSTO('ruo'), nome: T('Ruo, do Recife', 'Ruo, of the Reef'), quer: T('que eu afunde a Sentença.', 'for me to sink the Sentence.'), disse: T('A Sentença queimou a frota do irmão dele no Canal das Garças.', 'The Sentence burned his brother’s fleet in the Heron Channel.') },
    iska: { lugar: 'orla', img: ROSTO('iska'), veste: true, nome: T('Iska, marinheira', 'Iska, sailor'), quer: T('rir mais alto que o mar.', 'to laugh louder than the sea.'), naoDiz: (st) => (st.escolhas.roupa1 === 'seduzir' ? T('que a cicatriz foi faca, e quem foi.', 'that the scar was a knife, and whose.') : T('que a cicatriz no braço não foi raio nenhum.', 'that the scar on her arm was no lightning at all.')) },
    aguadeiro: { lugar: 'orla', img: ROSTO('aguadeiro'), nome: T('O menino da água', 'The water boy'), quer: T('vender o último balde antes do sol.', 'to sell the last bucket before the sun.'), disse: T('A Sentença ancora em Alvena a cada nove dias e volta pelo Canal das Garças.', 'The Sentence anchors at Alvena every nine days and goes back through the Heron Channel.') },
    pedagio: { lugar: 'orla', img: ROSTO('pedagio'), nome: T('A mulher do pedágio', 'The toll woman'), quer: T('troco certo, uma vez na vida.', 'the right change, once in her life.'), disse: T('A Sentença pesca os afogados da Orla e vende no molhe, por peso.', 'The Sentence fishes up the Shore’s drowned and sells them on the mole, by weight.') },
    desertor: { lugar: 'orla', img: ROSTO('desertor'), nome: T('O desertor', 'The deserter'), quer: T('esquecer o deserto.', 'to forget the desert.'), naoDiz: T('o nome do regimento.', 'the name of his regiment.'), disse: T('A Boca Seca é o deserto aonde Redom manda os filhos todo ano, e todo ano volta menos filho.', 'The Dry Mouth is the desert where Redom sends its sons every year, and every year fewer sons come back.') },
    padre: { lugar: 'orla', img: ROSTO('padre'), nome: T('O padre do Cavaleiro', 'The Knight’s priest'), quer: T('que eu reze com ele.', 'for me to pray with him.'), disse: T('Conjurador vai vivo para a Capital, e a Lâmina julga com os próprios olhos.', 'Conjurers go alive to the Capital, and the Blade judges them with her own eyes.') },
    mira: { lugar: 'orla', img: ROSTO('mira'), nome: T('Mira, da casa da Ondina', 'Mira, of Ondina’s house'), quer: T('uma noite sem soldado.', 'one night without a soldier.'), disse: T('Soldado de Redom conta tudo na cama e na frente de defunto.', 'A Redom soldier tells everything in bed and in front of a corpse.') },
    // a tripulação: o cartão fica depois da Sentença, com a linha do fim
    maru: { lugar: 'orla', img: ROSTO('maru'), nome: T('Maru, piloto', 'Maru, pilot'), quer: T('chegar a Redom sem ser visto.', 'to reach Redom unseen.'), naoDiz: T('que o olho branco ainda enxerga um pouco.', 'that the white eye still sees a little.'), morto: (st) => !!st.f.naufragio && salvo(st) !== 'maru', fim: (st) => (salvo(st) === 'maru' ? T('Voltou para a Orla com a Nhalé.', 'Went back to the Shore with Nhalé.') : st.f.motimMorto === 'maru' ? T('Morreu pela minha mão, no barco.', 'Died by my hand, in the boat.') : st.f.naufragio ? T('Afundou com a mão no leme.', 'Went down with his hand on the tiller.') : null) },
    lio: { lugar: 'orla', img: ROSTO('lio'), nome: T('Lio', 'Lio'), quer: T('que eu lembre o nome dele.', 'for me to remember his name.'), morto: (st) => !!st.f.naufragio && salvo(st) !== 'lio', fim: (st) => (salvo(st) === 'lio' ? T('Voltou para a Orla com a Nhalé. Vai ver chuva um dia.', 'Went back to the Shore with Nhalé. He’ll see rain someday.') : st.f.naufragio ? T('Boiou de costas.', 'Floated on his back.') : null) },
    teshka: { lugar: 'orla', img: ROSTO('teshka'), nome: T('Teshka, capitã', 'Teshka, captain'), quer: T('saber quanto paga.', 'to know what it pays.'), naoDiz: (st) => (st.escolhas.n_teshka === 'fria' ? T('que veio me ver errar de perto, porque o marido não voltou da última promessa.', 'that she came to watch me fail up close, because her husband never came back from the last promise.') : null), morto: (st) => !!st.f.naufragio && salvo(st) !== 'teshka', fim: (st) => (salvo(st) === 'teshka' ? T('Voltou para a Orla com a Nhalé.', 'Went back to the Shore with Nhalé.') : st.f.motimMorto === 'teshka' ? T('Morreu pela minha mão, no barco.', 'Died by my hand, in the boat.') : teshkaAborda(st) ? T('Morreu no convés da Sentença.', 'Died on the Sentence’s deck.') : st.f.naufragio ? T('Não voltou.', 'Did not go home.') : null) },
    nhale: { lugar: 'orla', img: ROSTO('nhale'), nome: T('Nhalé, do fundo', 'Nhalé, of the deep'), quer: T('ver gente da terra de perto.', 'to see land people up close.'), morto: (st) => !!st.f.naufragio && !salvo(st), fim: (st) => (salvo(st) ? T('Levou um dos meus para o fundo, vivo.', 'Carried one of mine down to the deep, alive.') : st.f.naufragio ? T('Bateu na quilha e parou.', 'Knocked on the keel and stopped.') : null) },
    brann: { lugar: 'orla', img: ROSTO('brann'), nome: T('Brann, besteiro', 'Brann, crossbowman'), quer: T('ser pago.', 'to be paid.'), naoDiz: (st) => (st.escolhas.n_brann === 'divertida' ? T('que veio ver uma galera de perto, e não pelo dinheiro.', 'that he came to see a galley up close, not for the money.') : null), morto: (st) => !!st.f.naufragio && salvo(st) !== 'brann', fim: (st) => (salvo(st) === 'brann' ? T('Voltou para a Orla com a Nhalé.', 'Went back to the Shore with Nhalé.') : st.f.motimMorto === 'brann' ? T('Morreu pela minha mão, no barco.', 'Died by my hand, in the boat.') : !st.f.naufragio ? null : brannAtira(st) ? T('Caiu rindo.', 'Fell laughing.') : (st.jogos.mao || {}).quando === 'cedo' ? T('Não chegou a atirar.', 'Never got the shot off.') : T('Acertou um antes.', 'Hit one first.')) },
    // os da Sentença (a Morta)
    capitao: { lugar: 'sentenca', img: ROSTO('capitao'), nome: T('O capitão da Sentença', 'The captain of the Sentence'), quer: T('pagar a casa da Ondina.', 'to pay Ondina’s house.'), disse: T('Vende os mortos por peso em Alvena.', 'He sells the dead by weight in Alvena.') },
    hobb: { lugar: 'sentenca', img: ROSTO('hobb'), nome: T('Hobb, da Sentença', 'Hobb, of the Sentence'), disse: T('A Lâmina não come desde que o irmão morreu. Manda o prato de volta cheio.', 'The Blade hasn’t eaten since her brother died. She sends the plate back full.') },
    grisalho: { lugar: 'sentenca', img: ROSTO('grisalho'), nome: T('O soldado grisalho', 'The grey soldier'), quer: T('não voltar para o deserto.', 'not to go back to the desert.'), disse: T('Se a Lâmina quiser vingança, vai todo mundo, e o deserto come metade.', 'If the Blade wants vengeance, everyone goes, and the desert eats half.') },
    sargento: { lugar: 'sentenca', img: ROSTO('sargento'), nome: T('O sargento da Sentença', 'The sergeant of the Sentence'), quer: T('cumprir a lei sem pensar nela.', 'to keep the law without thinking about it.'), disse: T('A Lâmina julga os conjuradores pessoalmente.', 'The Blade judges conjurers herself.') },
    // os quatro da escada (Ala Funda)
    wim: { lugar: 'redom', img: ROSTO('wim'), nome: T('Wim, o que cantarola', 'Wim, the one who hums'), quer: T('que o turno acabe.', 'for the shift to end.'), disse: (st) => (fezCarcereiro(st, 'wim') ? T('A Lâmina desce sozinha e pergunta o que já sabe, para ver se a gente mente.', 'The Blade comes down alone and asks what she already knows, to see if you lie.') : null) },
    garrick: { img: ROSTO('garrick'), nome: T('Garrick, o que nunca olha', 'Garrick, the one who never looks'), quer: T('não ver.', 'not to see.'), disse: (st) => (fezCarcereiro(st, 'garrick') ? T('Serviu com o comandante Simon. Na frente da Lâmina, o nome dele não se diz.', 'He served under Commander Simon. In front of the Blade, his name is not said.') : null) },
    pell: { img: ROSTO('pell'), nome: T('Pell, o que reza', 'Pell, the one who prays'), quer: T('que a Juíza seja levada a sério.', 'for the Judge to be taken seriously.'), disse: (st) => (fezCarcereiro(st, 'pell') ? T('A Lâmina não reza desde o irmão, e dizem que quer o deserto.', 'The Blade hasn’t prayed since her brother, and they say she wants the desert.') : null) },
    dunstan: { img: ROSTO('dunstan'), nome: T('Dunstan, o que conta moedas', 'Dunstan, the one who counts coins'), quer: T('o soldo atrasado.', 'his late pay.'), disse: (st) => (fezCarcereiro(st, 'dunstan') ? T('Cada galera parada na costa custa a Redom mais que uma aldeia por ano.', 'Every galley sitting on the coast costs Redom more than a village a year.') : null) },
    laura: { img: ROSTO('laura'), nome: T('Laura D’Orrose', 'Laura D’Orrose'), quer: T('ainda não sei.', 'I don’t know yet.'), naoDiz: (st) => (st.f.usouSimon ? T('que o irmão dela está em cada prato que ela manda de volta.', 'that her brother is in every plate she sends back.') : null), fim: T('Este eu não visto.', 'This one I don’t wear.') },
    // Redom: os pequenos
    criada: { img: ROSTO('criada'), veste: true, nome: T('Greta, criada da estalagem', 'Greta, inn maid'), quer: T('dormir até o galo.', 'to sleep until the rooster.') },
    capa: { img: ROSTO('capa'), nome: T('A moça da capa roxa', 'The girl in the purple cloak'), quer: T('uma capa boa, de graça.', 'a good cloak, for free.'), naoDiz: T('que um homem de Redom vai segui-la até o porto.', 'that a man of Redom will follow her to the harbor.') },
    ferreiro: { img: ROSTO('ferreiro'), nome: T('O ferreiro das argolas', 'The smith of the shackles'), quer: T('que a argola dele dure.', 'for his shackle to hold.') },
    cavalarico: { img: ROSTO('cavalarico'), veste: true, nome: T('Tam, cavalariço da sala de armas', 'Tam, armory stable boy'), quer: T('que o cavalo do comandante coma.', 'for the commander’s horse to eat.'), disse: T('Markus dorme na sala de armas desde a notícia, e pediu o cavalo do comandante Simon para a coluna.', 'Markus has slept in the armory since the news, and asked for Commander Simon’s horse for the column.') },
    escudeiro: { img: ROSTO('escudeiro'), veste: true, nome: T('Corin, escudeiro', 'Corin, squire'), quer: T('ir na coluna.', 'to go with the column.'), disse: T('Markus treinou o comandante Simon depois do Torneio, aos quinze anos, e no primeiro dia o derrubou onze vezes.', 'Markus trained Commander Simon after the Tourney, at fifteen, and knocked him down eleven times on the first day.') },
    novica: { img: ROSTO('novica'), veste: true, nome: T('Irmã Ada, noviça da Juíza', 'Sister Ada, novice of the Judge'), quer: T('que a capela fique limpa.', 'for the chapel to stay clean.'), disse: T('Justine reza pelo comandante toda noite, na capela da Juíza, sozinha.', 'Justine prays for the commander every night, in the Judge’s chapel, alone.') },
    dama: { img: ROSTO('dama'), veste: true, nome: T('Lady Elsbeth, dama de companhia', 'Lady Elsbeth, lady-in-waiting'), quer: T('ser vista perto da Guardiã da Lei.', 'to be seen near the Keeper of the Law.'), disse: T('Justine escreveu a lei que deixa a Lâmina ir à guerra quando quiser.', 'Justine wrote the law that lets the Blade go to war whenever she wants.') },
    vinho: { img: ROSTO('vinho'), veste: true, nome: T('Pip, o moço do vinho', 'Pip, the wine boy'), quer: T('que o velho não peça a conta.', 'for the old man not to ask for the bill.'), disse: T('A mão do Sir Joseph treme de manhã, e ele quer uma última campanha antes de morrer.', 'Sir Joseph’s hand shakes in the mornings, and he wants one last campaign before he dies.') },
    viuva: { img: ROSTO('viuva'), veste: true, nome: T('Hilde, viúva de um sargento', 'Hilde, a sergeant’s widow'), quer: T('a pensão do marido.', 'her husband’s pension.'), disse: T('O marido dela morreu numa duna que estava vazia quando ele subiu.', 'Her husband died on a dune that was empty when he climbed it.') },
    horne: { img: ROSTO('horne'), veste: true, nome: T('O sargento Horne', 'Sergeant Horne'), quer: T('que o Lorde Varr pare de beber antes do conselho.', 'for Lord Varr to stop drinking before council.'),
      disse: (st) => ({ ajudar: T('Lorde Varr diz para quem quiser ouvir que deve uma prova à Lâmina.', 'Lord Varr tells anyone who’ll listen that he owes the Blade an exam.'), errar: T('Lorde Varr ainda conta a história do número errado quando bebe, e ainda não ri.', 'Lord Varr still tells the story of the wrong number when he drinks, and still doesn’t laugh.') }[c4(st).varr] || T('Lorde Varr comanda a infantaria e nunca foi escolhido para nada que desse uma canção.', 'Lord Varr commands the infantry and has never been chosen for anything worth a song.')) },
    maud: { img: ROSTO('maud'), veste: true, nome: T('Maud Varr', 'Maud Varr'), quer: T('que o irmão volte com uma canção.', 'for her brother to come back with a song.'), disse: T('O irmão dela não suporta ver os outros partirem sem ele.', 'Her brother can’t stand to watch the others leave without him.') },
    bertha: { img: ROSTO('bertha'), veste: true, nome: T('Bertha, mãe de um sentinela', 'Bertha, a sentry’s mother'), quer: T('ouvir mais uma vez como foi.', 'to hear once more how it was.'), disse: T('O sentinela Ansel vem toda tarde contar a ela como o filho morreu, e conta igual, toda tarde.', 'The sentry Ansel comes every afternoon to tell her how her son died, and tells it the same, every afternoon.') },
    aldo: { img: ROSTO('aldo'), veste: true, nome: T('Mestre Aldo, curandeiro', 'Master Aldo, healer'), quer: T('que o menino durma.', 'for the boy to sleep.'), disse: T('Ansel acorda gritando que o Grakh olhou para ele.', 'Ansel wakes up shouting that the Grakh looked at him.') },
    edric: { img: ROSTO('edric'), veste: true, nome: T('Edric, escrivão do conselho', 'Edric, council clerk'), quer: T('que leiam a letra dele.', 'for them to read his hand.'), disse: T('Toda manhã ele lê os relatórios em voz alta para o conselho, na ordem em que estão na pasta.', 'Every morning he reads the reports aloud to the council, in the order they lie in the folder.') },
    lavadeira: { img: ROSTO('lavadeira'), nome: T('A lavadeira', 'The washerwoman'), quer: T('voltar para a água.', 'to go back to the water.'),
      fim: (st) => ({ levantar: T('Voltou para a roupa dos soldados.', 'Went back to the soldiers’ laundry.'), usar: T('Vai carregar água na coluna.', 'Will carry water in the column.'), matar: T('Dorme na cisterna.', 'Sleeps in the cistern.') }[st.escolhas.lavadeira] || null), morto: (st) => st.escolhas.lavadeira === 'matar' },
    // os rostos que eu vi de passagem (servem de máscara quando não há outra)
    guarda: { img: ROSTO('guarda'), veste: true, nome: T('Um guarda da Cidadela', 'A Citadel guard'), quer: T('o fim do turno.', 'the end of his watch.') },
    criadaC: { img: ROSTO('criadaC'), veste: true, nome: T('Uma criada do palácio', 'A palace maid'), quer: T('passar sem ser notada.', 'to pass unnoticed.') },
    moco: { img: ROSTO('moco'), veste: true, nome: T('Um moço de recados', 'An errand boy'), quer: T('correr menos.', 'to run less.') },
    // os alvos (entram quando ela trabalha cada um)
    markus: { img: ROSTO('markus'), nome: T('Markus', 'Markus'), quer: T('estar onde ela estiver.', 'to be wherever she is.'), naoDiz: T('que dorme com a espada do comandante Simon ao lado.', 'that he sleeps with Commander Simon’s sword beside him.') },
    justine: { img: ROSTO('justine'), nome: T('Justine', 'Justine'), quer: T('que a lei sirva para alguma coisa.', 'for the law to be good for something.'), naoDiz: T('que reza mais pela Laura que pelo morto.', 'that she prays more for Laura than for the dead man.') },
    joseph: { img: ROSTO('joseph'), nome: T('Sir Joseph', 'Sir Joseph'), quer: T('uma última campanha.', 'one last campaign.'), naoDiz: T('a mão.', 'the hand.') },
    varr: { img: ROSTO('varr'), nome: T('Lorde Varr', 'Lord Varr'), quer: T('uma canção com o nome dele.', 'a song with his name in it.'), naoDiz: T('a conta que ainda tem com ela.', 'the score he still has with her.') },
    ansel: { img: ROSTO('ansel'), nome: T('Ansel, sentinela', 'Ansel, sentry'), quer: T('dormir.', 'to sleep.'), naoDiz: T('que ainda deve um pão a um morto.', 'that he still owes a dead man a loaf of bread.') },
    // a coluna
    estrebaria: { lugar: 'coluna', img: ROSTO('estrebaria'), veste: true, nome: T('Wil, moço da estrebaria', 'Wil, stable hand'), quer: T('um cavalo que não morda.', 'a horse that doesn’t bite.') },
    forja: { lugar: 'coluna', img: ROSTO('forja'), veste: true, nome: T('Bram, ajudante de ferreiro', 'Bram, smith’s helper'), quer: T('uma semana sem queimadura.', 'one week without a burn.') },
    ilse: { lugar: 'coluna', img: ROSTO('ilse'), veste: true, nome: T('Ilse, ajudante de curandeiro', 'Ilse, healer’s helper'), quer: T('ver a Lâmina de perto.', 'to see the Blade up close.') },
    nell: { lugar: 'coluna', img: ROSTO('nell'), veste: true, nome: T('Nell, da cozinha', 'Nell, of the kitchen'), quer: T('sal que não acabe.', 'salt that doesn’t run out.') },
    intendente: { lugar: 'coluna', img: ROSTO('intendente'), nome: T('O intendente da revista', 'The steward at the muster'), quer: T('contar certo.', 'to count right.'), disse: T('Olha os dentes dos servos antes de deixá-los entrar na coluna.', 'He looks at the servants’ teeth before he lets them into the column.') },
  },

  // ---------------------------------------------------------------- OUVIR (escolher quem ouvir; o tempo não dá para todos)
  escuta: {
    alvena: { pick: 3, titulo: T('Alvena', 'Alvena'),
      perguntas: [
        { id: 'rota', t: T('Quando a Sentença passa', 'When the Sentence comes through') },
        { id: 'vivos', t: T('O que Redom faz com quem pega vivo', 'What Redom does with those it takes alive') },
        { id: 'perto', t: T('Como chegar perto dela sem afundar antes da hora', 'How to get close to her without sinking too soon') },
      ],
      gente: [
      { id: 'aguadeiro', responde: 'rota', flag: 'rotaSentenca', rotulo: T('O menino que vende água aos navios que ancoram', 'The boy who sells water to the ships at anchor'), fala: [T('— A galera grande? Ancora aqui a cada nove dias e volta pelo Canal das Garças. Compra água de mim.', '— The big galley? Anchors here every nine days and goes back through the Heron Channel. Buys water from me.'), T('— Se eu vender o último balde antes do sol, minha mãe não grita.', '— If I sell the last bucket before sunup, my mother doesn’t shout.')] },
      { id: 'pedagio', responde: 'perto', rotulo: T('A mulher que cobra o pedágio do molhe', 'The woman who takes the toll on the mole'), fala: [T('— A Sentença? Traz os afogados da Orla e vende aqui no molhe, por peso, para o curtume e para os porcos. Pesca até morto, que morto paga a dívida do capitão na casa da Ondina.', '— The Sentence? Brings in the Shore’s drowned and sells them here on the mole, by weight, to the tannery and the pigs. Fishes up even the dead, because the dead pay the captain’s debt at Ondina’s house.'), T('— Quer saber mais da galera, pergunta na janela da Ondina. Soldado conta tudo na cama. E me dá o troco certo, que hoje foi só troco errado.', '— Want to know more about the galley, ask at Ondina’s window. A soldier tells everything in bed. And give me the right change; it’s been wrong all day.')] },
      { id: 'mira', responde: 'rota', flag: 'miraOuvido', rotulo: T('Uma moça na janela da casa da Ondina', 'A girl at the window of Ondina’s house'), fala: [T('— Os de Redom contam tudo para quem eles acham que não conta para ninguém. Para mim, para a parede, para defunto.', '— Redom’s lot tell everything to whoever they think won’t tell anyone. To me, to the wall, to a corpse.'), T('— A galera dorme aqui a cada nove dias e volta pelo canal. Eu só queria uma noite sem soldado.', '— The galley sleeps here every nine days and goes back by the channel. I’d just like one night without a soldier.')] },
      { id: 'padre', responde: 'vivos', rotulo: T('O padre do Cavaleiro, na escada do templo', 'The Knight’s priest, on the temple steps'), fala: [T('— Conjurador, filha? Conjurador aqui não vai para a forca. Vai vivo para a Capital, de pedra nos pulsos, e a Lâmina julga com os próprios olhos. O Cavaleiro anda com ela.', '— A conjurer, daughter? Conjurers don’t go to the gallows here. They go alive to the Capital, stone on their wrists, and the Blade judges with her own eyes. The Knight rides with her.'), T('— Reza comigo?', '— Will you pray with me?')] },
      { id: 'desertor', responde: 'vivos', frase: 'boca', flag: 'fraseBoca', rotulo: T('Um desertor de Redom que pede esmola e já guiou carroça de presos', 'A Redom deserter begging for coins, who once drove a prisoners’ cart'), fala: [T('— Já levei conjurador para a Capital. Carroça de grade, pedra surda nos pulsos, Ala Funda. Vivo, sempre. A Lâmina quer ver.', '— I’ve driven conjurers to the Capital. Barred cart, deafstone on the wrists, the Deep Ward. Alive, always. The Blade wants to see them.'), T('— Boca Seca? É o deserto. Redom manda os filhos para lá todo ano, e todo ano volta menos filho. Eu voltei. Só não me pergunta o regimento.', '— Dry Mouth? It’s the desert. Redom sends its sons there every year, and every year fewer sons come back. I came back. Just don’t ask me the regiment.')] },
    ] },
    // os três dias na Capital: um pequeno por dia
    dia1: { pick: 1, titulo: T('O primeiro dia', 'The first day'), gente: (st) => [
      circulo(st) === 'justine'
        ? { id: 'novica', rotulo: T('Uma noviça varrendo a escada da capela da Juíza', 'A novice sweeping the steps of the Judge’s chapel'), fala: [T('— A Guardiã da Lei? Vem toda noite rezar pelo comandante. Sozinha. Manda a gente sair antes de acender a vela.', '— The Keeper of the Law? She comes every night to pray for the commander. Alone. Sends us out before she lights the candle.')] }
        : { id: 'cavalarico', rotulo: T('Um cavalariço lavando um cavalo cinzento', 'A stable boy washing a grey horse'), fala: [T('— Esse era do comandante Simon. O marechal Markus mandou separar para a coluna. Ele dorme na sala de armas desde a notícia, sabia? Do lado da baia.', '— This one was Commander Simon’s. Marshal Markus had him set aside for the column. He’s slept in the armory since the news, did you know? Right by the stall.')] },
      { id: 'vinho', rotulo: T('O moço que leva vinho à taverna dos oficiais velhos', 'The boy who carries wine to the old officers’ tavern'), fala: [T('— O Sir Joseph? De manhã a mão dele treme tanto que eu sirvo pela esquerda. Ele diz que quer uma última campanha antes de morrer. Diz toda noite.', '— Sir Joseph? In the mornings his hand shakes so much I pour from the left. He says he wants one last campaign before he dies. Says it every night.')] },
      { id: 'horne', rotulo: T('Um sargento velho no portão do quartel', 'An old sergeant at the barracks gate'), fala: (st) => [{ ajudar: T('— O Lorde Varr? Diz para quem quiser ouvir que deve uma à Lâmina. Desde uma prova do Torneio, vinte anos atrás. Diz isso bêbado e sóbrio.', '— Lord Varr? Tells anyone who’ll listen that he owes the Blade one. Since an exam at the Tourney, twenty years back. Says it drunk and sober.'), errar: T('— O Lorde Varr? Ainda conta a história de um número errado numa prova do Torneio, vinte anos atrás. Conta bêbado. Ainda não ri.', '— Lord Varr? Still tells the story of a wrong number on a Tourney exam, twenty years back. Tells it drunk. Still doesn’t laugh.') }[c4(st).varr] || T('— O Lorde Varr? Comanda a infantaria. Nunca foi escolhido para nada que desse canção, e sabe disso.', '— Lord Varr? Commands the infantry. Never been chosen for anything worth a song, and he knows it.')] },
    ] },
    dia2: { pick: 1, titulo: T('O segundo dia', 'The second day'), gente: [
      { id: 'bertha', rotulo: T('Uma mulher de luto na porta de casa', 'A woman in mourning at her door'), fala: [T('— O menino Ansel vem toda tarde me contar como o meu filho morreu nas Goelas. Conta igual. Eu deixo, porque ele precisa contar mais do que eu preciso ouvir.', '— The boy Ansel comes every afternoon to tell me how my son died at the Gullets. Tells it the same. I let him, because he needs to tell it more than I need to hear it.')] },
      { id: 'edric', rotulo: T('Um escrivão comprando tinta na feira', 'A clerk buying ink at the market'), fala: [T('— De manhã eu leio os relatórios para o conselho. Em voz alta, na ordem em que estão na pasta. Ali, papel não muda de lugar. Eles nem leem; escutam.', '— In the mornings I read the reports to the council. Aloud, in the order they lie in the folder. Paper doesn’t move there. They don’t even read; they listen.')] },
      { id: 'viuva', rotulo: T('Uma viúva na fila da pensão', 'A widow in the pension line'), fala: [T('— O meu marido morreu atrás deles numa duna. A duna estava vazia quando ele subiu. Eles somem, os bichos. Todo mundo sabe que eles somem.', '— My husband died chasing them up a dune. The dune was empty when he climbed it. They vanish, those beasts. Everyone knows they vanish.')] },
    ] },
    dia3: { pick: 1, titulo: T('O terceiro dia', 'The third day'), gente: (st) => [
      { id: 'aldo', rotulo: T('Um curandeiro saindo da enfermaria do quartel', 'A healer leaving the barracks infirmary'), fala: [T('— O sentinela que voltou das Goelas? Acorda gritando que o Grakh olhou para ele. Olhou, só isso. Eu dou chá. Não adianta.', '— The sentry who came back from the Gullets? He wakes up shouting that the Grakh looked at him. Looked, that’s all. I give him tea. It does nothing.')] },
      { id: 'maud', rotulo: T('Uma mulher alta discutindo com um vendedor de selas', 'A tall woman arguing with a saddle seller'), fala: [T('— Para o meu irmão, o Lorde Varr. Se ele não for, alguém vai ter que segurá-lo em casa, e esse alguém sou eu. Ele não suporta ver os outros partirem sem ele.', '— For my brother, Lord Varr. If he doesn’t go, someone will have to hold him at home, and that someone is me. He can’t stand to watch the others leave without him.')] },
      circulo(st) === 'justine'
        ? { id: 'dama', rotulo: T('Uma dama de companhia esperando a liteira', 'A lady-in-waiting waiting for her litter'), fala: [T('— A Guardiã escreveu a lei que deixa a Lâmina ir à guerra quando quiser. Escreveu numa noite. Nunca vi lei tão curta.', '— The Keeper wrote the law that lets the Blade go to war whenever she wants. Wrote it in one night. I never saw a law so short.')] }
        : { id: 'escudeiro', rotulo: T('Um escudeiro limpando uma espada de pau', 'A squire cleaning a wooden sword'), fala: [T('— É do comandante Simon. O marechal pegou ele depois do Torneio, com quinze anos, quando o mestre de armas já não tinha o que ensinar. No primeiro dia derrubou ele onze vezes com esta aqui, o marechal conta. Só conta isso.', '— It was Commander Simon’s. The marshal took him on after the Tourney, at fifteen, when the master-at-arms had nothing left to teach him. The first day he knocked him down eleven times with this one, the marshal says. That’s all he says.'), T('— Eu queria ir na coluna. Dizem que escudeiro não vai.', '— I wanted to go with the column. They say squires don’t.')] },
    ] },
  },

  // a tripulação: três de cinco
  tripulacao: { pick: 3, gente: [
    { id: 'maru', rotulo: T('Maru, piloto velho', 'Maru, old pilot'), fala: [T('Conhece os recifes de olho fechado e fala com o barco como se fala com um cachorro. Quer chegar a Redom escondido.', 'Knows the reefs with his eyes shut and talks to the boat the way you talk to a dog. Wants to reach Redom unseen.')] },
    { id: 'lio', rotulo: T('Lio, o mais novo do cais', 'Lio, the youngest on the docks'), fala: [T('O que segurou o pano para mim na escada. Nunca saiu da Orla e não sabe lutar. Pula na água atrás de mim, se eu pular.', 'The one who held the cloth for me on the stairs. Has never left the Shore and can’t fight. Would jump in the water after me, if I jumped.')] },
    { id: 'teshka', rotulo: T('Teshka, capitã de um cúter', 'Teshka, captain of a cutter'), fala: [T('Tem o barco mais rápido do cais e ajoelha com um joelho só. Quer saber quanto paga. Se a conta não fechar, vira o barco.', 'Has the fastest boat on the docks and kneels on one knee only. Wants to know what it pays. If the sum doesn’t add up, she turns the boat.')] },
    { id: 'nhale', rotulo: T('Nhalé, do povo do fundo', 'Nhalé, of the deep folk'), fala: [T('Uma Merés. Guia o barco por baixo, batendo na quilha. Embaixo d’água, leva alguém para o fundo vivo, se quiser levar.', 'A Merés. Guides the boat from below, knocking on the keel. Underwater, she can carry someone down to the deep alive, if she wants to.')] },
    { id: 'brann', rotulo: T('Brann, besteiro', 'Brann, crossbowman'), fala: [T('Humano da Orla, uma cicatriz comprida no pescoço. Acerta um homem num convés a cem passos. Vai pelo dinheiro e diz isso na minha cara.', 'A man of the Shore, a long scar down his neck. Can hit a man on a deck at a hundred paces. Goes for the money and says so to my face.')] },
  ] },

  // ---------------------------------------------------------------- A MORTA: as falas dos soldados, no tempo
  // t em segundos; card: o cartão que a fala dá; voz: a gravação (S01…)
  morta: {
    img: IMG('s05-conves'), dura: 46,
    falas: [
      { t: 1.5, txt: T('— Essa ainda respira.', '— This one’s still breathing.') },
      { t: 4.5, txt: T('— Respira nada. Puxa para o convés, que o capitão quer contar os corpos.', '— Breathing nothing. Haul her up, the captain wants the bodies counted.') },
      { t: 10, card: 'capitao', txt: T('— Conta direito, Hobb. O capitão vende os mortos por peso em Alvena e paga a casa da Ondina com o que sobra.', '— Count right, Hobb. The captain sells the dead by weight in Alvena and pays Ondina’s house with what’s left.') },
      { t: 17, card: 'hobb', txt: T('— Meu primo serve na Cidadela. Diz que a Lâmina não come desde que o irmão morreu. Manda o prato de volta cheio.', '— My cousin serves at the Citadel. Says the Blade hasn’t eaten since her brother died. Sends the plate back full.') },
      { t: 21, se: (st) => brannAtira(st), txt: T('— Quem acertou o mestre dos besteiros? Daquela casca de noz?', '— Who hit the master of crossbows? From that nutshell?') },
      { t: 25, card: 'grisalho', frase: 'boca', txt: T('— E agora? Boca Seca outra vez? Se ela quiser vingança, vai todo mundo, e o deserto come metade.', '— And now? The Dry Mouth again? If she wants vengeance, everyone goes, and the desert eats half.') },
      { t: 29, se: (st) => maruLado(st), txt: T('— O mastro do meio quebrou igual graveto. Mar parado não faz isso.', '— The middle mast snapped like a twig. A still sea doesn’t do that.') },
      { t: 33, txt: T('— Olha o ombro dela. Seta inteira dentro, e nada. Essa desgraçada é dura igual Grakh.', '— Look at her shoulder. Whole bolt in, and nothing. This bitch is tough as a Grakh.') },
      { t: 40, txt: T('— Os da Orla vão para a balança de Alvena. Separa os que não estão faltando pedaço.', '— The Shore’s lot go to the scales at Alvena. Set aside the ones with nothing missing.') },
    ],
    mexe1: T('Um dedo meu se mexe.', 'One of my fingers moves.'),
    mexe1b: T('— Ei.', '— Hey.'),
    mexe1c: T('Um soldado olha. A conversa para, e volta.', 'A soldier looks. The talk stops, and comes back.'),
    mexe2: T('— Essa mexeu.', '— That one moved.'),
    mexe2b: T('A ponta de uma lança entra na ferida do ombro e gira. Depois disso, só a dor fala.', 'The tip of a spear goes into the wound in my shoulder and turns. After that, only the pain talks.'),
  },

  // ---------------------------------------------------------------- ABRIR A MÃO
  mao: {
    img: IMG('s03-costado'), video: VID('b03-onda'),
    pede: T('Abrir a mão.', 'Open the hand.'),
    salva: T('— Bestas! — grita alguém em cima da galera.', '— Crossbows! — someone shouts on the galley.'),
    gritos: T('A salva desce. Alguém grita o meu nome, que eu não tenho.', 'The volley comes down. Someone shouts my name, which I don’t have.'),
  },

  // ---------------------------------------------------------------- O ANZOL: fazer o outro dizer
  // u: palavras que acendem (2 bom, 1 meio, 0 nada, -2 o direto). de: o cartão que abre a opção.
  // mascaras: o rosto que ele recebe bem dá uma palavra antes da primeira fala.
  anzol: {
    markus: {
      img: IMG('n-markus'), lugar: T('A sala de armas, de madrugada', 'The armory, before dawn'),
      ideia: T('Onde ela for, vão os melhores.', 'Where she goes, the best go.'), falador: false, mascaras: { cavalarico: 1, escudeiro: 1 },
      trocas: [
        { fala: T('— Fecha a porta. O vento apaga a vela.', '— Shut the door. The wind puts out the candle.'), ops: [
          { id: 'p', tipo: 'porta', de: 'cavalarico', u: 2, txt: T('Trouxe o cavalo do comandante para a baia, senhor. Como o senhor pediu.', 'I brought the commander’s horse to the stall, sir. As you asked.'), resp: [T('Ele para de passar a pedra na lâmina.', 'He stops running the stone along the blade.'), T('— Ele come?', '— Is he eating?'), T('— Come, senhor. E olha para a estrada do sul.', '— He eats, sir. And he looks at the south road.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('O senhor não vai dormir?', 'Aren’t you going to sleep, sir?'), resp: [T('— Eu durmo aqui. É mais perto da porta.', '— I sleep here. It’s closer to the door.')] },
          { id: 's', tipo: 'silencio', u: 0, resp: [T('Fecho a porta e espero. Ele espera também, e a sala é dele. Ganha.', 'I shut the door and wait. He waits too, and it is his room. He wins.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('A General-Rainha devia levar os melhores, senhor.', 'The General-Queen should take the best, sir.'), resp: [T('Ele levanta os olhos da lâmina e me mede da bota à boca.', 'He lifts his eyes from the blade and measures me from boot to mouth.'), T('— Quem mandou você dizer isso?', '— Who sent you to say that?')] },
        ] },
        { fala: T('— Ela vai mandar a Terceira com o Varr. Dois mil homens. O conselho acha que basta para enterrar o que sobrou.', '— She’ll send the Third with Varr. Two thousand men. The council thinks it’s enough to bury what’s left.'), ops: [
          { id: 'p', tipo: 'porta', de: 'escudeiro', u: 2, txt: T('O comandante aprendeu espada com o senhor. Com dois mil, quem vai é o Varr.', 'The commander learned the sword from you. With two thousand, it’s Varr who goes.'), resp: [T('— Depois do Torneio. Caiu onze vezes no primeiro dia e levantou onze.', '— After the Tourney. He fell eleven times the first day and got up eleven.'), T('O polegar dele corre pelo fio da espada.', 'His thumb runs along the edge.'), T('— O Varr nunca viu ele segurar nada.', '— Varr never saw him hold anything.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E o senhor acha que basta?', 'And do you think it’s enough?'), resp: [T('— Eu acho que o que sobrou foi o que matou ele.', '— I think what’s left is what killed him.')] },
          { id: 's', tipo: 'silencio', u: 0, resp: [T('Ele espera que eu diga alguma coisa. Como eu não digo, volta para a pedra.', 'He waits for me to say something. When I don’t, he goes back to the stone.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Dois mil é pouco. Tem que ir todo mundo.', 'Two thousand is too few. Everyone has to go.'), resp: [T('— Desde quando você conta homem?', '— Since when do you count men?')] },
        ] },
        { fala: T('— Ela não come. Manda o prato de volta cheio.', '— She doesn’t eat. She sends the plate back full.'), ops: [
          { id: 'p', tipo: 'porta', de: 'hobb', u: 2, txt: T('Na Cidadela dizem que ela só come na estrada.', 'At the Citadel they say she only eats on the road.'), resp: [T('Ele quase ri.', 'He almost laughs.'), T('— Na estrada ela come em pé, da panela dos soldados. Sempre foi assim.', '— On the road she eats standing, from the soldiers’ pot. She always has.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('O senhor vai com ela?', 'Will you go with her?'), resp: [T('— Se ela for. Ela não vai. Vai mandar.', '— If she goes. She won’t. She’ll send.')] },
          { id: 's', tipo: 'silencio', u: 0, resp: [T('A vela estala. Ele olha para ela e não para mim.', 'The candle crackles. He looks at it, not at me.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Se ela for com os melhores, ela come.', 'If she goes with the best, she’ll eat.'), resp: [T('Ele larga a pedra em cima da mesa.', 'He drops the stone on the table.'), T('— Você fala demais para esta hora.', '— You talk too much for this hour.')] },
        ] },
        { fala: T('— Ela pediu os mapas da Boca Seca e leu até a vela acabar. Não me disse uma palavra.', '— She asked for the maps of the Dry Mouth and read until the candle died. Didn’t say a word to me.'), ops: [
          { id: 'p', tipo: 'porta', u: 2, txt: T('Quando ela lê assim, já decidiu ir. Só falta alguém dizer em voz alta.', 'When she reads like that, she’s already decided to go. It only needs someone to say it out loud.'), resp: [T('Ele fica muito quieto.', 'He goes very still.'), T('Depois respira pelo nariz, curto. Peguei.', 'Then he breathes through his nose, short. Got him.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E o que ela decidiu?', 'And what did she decide?'), resp: [T('— Ela decide sozinha. Depois avisa o conselho.', '— She decides alone. Then she tells the council.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Diga a ela que leve os melhores, senhor.', 'Tell her to take the best, sir.'), resp: [T('— Isso eu digo quando eu quiser.', '— I’ll say that when I want to.')] },
        ] },
      ],
      fim: {
        cheia: [T('Ele embainha a espada do comandante Simon e fica de pé.', 'He sheathes Commander Simon’s sword and stands.'), { t: T('«Onde ela for, vão os melhores.', '«Where she goes, the best go.') }, T('— Amanhã eu digo isso no conselho. Com a minha voz.', '— Tomorrow I say it in council. In my own voice.')],
        meia: [T('— Ela não vai sozinha. Isso eu garanto.', '— She won’t go alone. That I promise.'), T('É menos do que eu queria. Ele vai dizer isso a ela e vai achar que pensou primeiro.', 'It’s less than I wanted. He’ll say it to her and think he thought of it first.')],
        nada: [T('— Vai dormir. Ela sabe o que faz.', '— Go to bed. She knows what she’s doing.'), T('Ele volta para a pedra. A conversa fica na sala, e eu saio sem ela.', 'He goes back to the stone. The talk stays in the room, and I leave without it.')],
      },
    },

    justine: {
      img: IMG('n-justine'), lugar: T('A capela da Juíza, à meia-noite', 'The Judge’s chapel, at midnight'),
      ideia: T('A balança não aceita a metade.', 'The scales do not take half.'), falador: true, mascaras: { novica: 1, dama: 1 },
      trocas: [
        { fala: T('— Se veio varrer, varre depois. Eu ainda não acabei.', '— If you came to sweep, sweep later. I’m not done.'), ops: [
          { id: 'p', tipo: 'porta', de: 'novica', u: 2, txt: T('A senhora reza pelo comandante toda noite. Eu acendo a vela dele também.', 'You pray for the commander every night, my lady. I light his candle too.'), resp: [T('Ela tira a pena de entre os dentes.', 'She takes the quill from between her teeth.'), T('— Acende. Ele odiava vela. Dizia que cheirava a velório.', '— Light it. He hated candles. Said they smelled of wakes.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('A senhora prefere ficar sozinha?', 'Would you rather be alone, my lady?'), resp: [T('— Eu prefiro ficar com a Juíza. Você pode ficar, se não falar.', '— I’d rather be with the Judge. You can stay, if you don’t talk.')] },
          { id: 's', tipo: 'silencio', u: 2, resp: [T('Eu não digo nada. Ela não suporta uma sala calada, e fala por nós duas.', 'I say nothing. She can’t bear a quiet room, and talks for both of us.'), T('— Ele odiava esta capela. Vinha só para me ver rezar e rir de mim.', '— He hated this chapel. He came only to watch me pray and laugh at me.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('A Lâmina devia levar os melhores, senhora.', 'The Blade should take the best, my lady.'), resp: [T('— Que interessante. Uma moça com opinião sobre exército, à meia-noite.', '— How interesting. A girl with views on armies, at midnight.')] },
        ] },
        { fala: T('— Ela vai mandar dois mil. O conselho chama isso de prudência. Eu chamo de economia.', '— She’ll send two thousand. The council calls it prudence. I call it thrift.'), ops: [
          { id: 'p', tipo: 'porta', de: 'dama', u: 2, txt: T('Foi a senhora que escreveu a lei que deixa a Lâmina ir à guerra.', 'You wrote the law that lets the Blade go to war, my lady.'), resp: [T('— Escrevi para ela ir quando quisesse. Não para ir com metade.', '— I wrote it so she could go when she wished. Not so she could go with half.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E a Juíza, o que acha?', 'And the Judge, what does she think?'), resp: [T('— A Juíza não acha nada. Pesa.', '— The Judge doesn’t think. She weighs.')] },
          { id: 's', tipo: 'silencio', u: 1, resp: [T('— Você não fala muito, para uma moça desta casa. Gosto disso.', '— You don’t talk much, for a girl of this house. I like that.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Dois mil é pouco para quem matou o irmão dela.', 'Two thousand is too few for whoever killed her brother.'), resp: [T('Ela me olha por cima da vela e não pisca.', 'She looks at me over the candle and doesn’t blink.'), T('— Quem você está repetindo?', '— Whose words are those?')] },
        ] },
        { fala: T('— Os relatórios dizem que a Pira acabou. Eu li os relatórios. Também li o Simon, desde os catorze anos, e ele nunca acabou nada pela metade.', '— The reports say the Pyre is finished. I read the reports. I also read Simon, since he was fourteen, and he never finished anything by half.'), ops: [
          { id: 'p', tipo: 'porta', de: 'hobb', u: 2, txt: T('Na Cidadela dizem que ela manda o prato de volta cheio.', 'At the Citadel they say she sends the plate back full.'), resp: [T('— Manda. E eu mando de volta para ela. Somos duas teimosas nesta casa.', '— She does. And I send it back to her. There are two stubborn women in this house.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E ele ia querer o quê?', 'And what would he have wanted?'), resp: [T('— Ia querer ir junto. Ele sempre queria ir junto.', '— To go along. He always wanted to go along.')] },
          { id: 's', tipo: 'silencio', u: 2, resp: [T('Ela fala para a balança da estátua e não para mim. Melhor assim.', 'She talks to the statue’s scales and not to me. Better that way.'), T('— Ele ia rir do conselho. Ia rir até a Laura rir também.', '— He’d have laughed at the council. Laughed until Laura laughed too.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Então que ela não faça pela metade.', 'Then let her not do it by half.'), resp: [T('— Você ouviu isso de alguém. Eu conheço frase emprestada.', '— You heard that from someone. I know a borrowed sentence.')] },
        ] },
        { fala: T('— Amanhã o conselho decide. E eu vou estar lá, de pena na mão, escrevendo o que eles decidirem.', '— Tomorrow the council decides. And I’ll be there, quill in hand, writing down whatever they decide.'), ops: [
          { id: 'p', tipo: 'porta', u: 2, txt: T('A senhora escreve a lei, e a Juíza pesa. Metade de um exército pesa quanto?', 'You write the law, and the Judge weighs. How much does half an army weigh?'), resp: [T('Ela ri, curto, pelo canto da boca.', 'She laughs, short, from the corner of her mouth.'), T('— Pesa um morto e meio.', '— It weighs one dead man and a half.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E a senhora vai escrever o que eles decidirem?', 'And will you write down whatever they decide?'), resp: [T('— Eu escrevo o que é lei. O resto é ata.', '— I write what is law. The rest is minutes.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Escreva que ela leva os melhores.', 'Write that she takes the best.'), resp: [T('— Eu escrevo o que eu quiser, menina.', '— I write what I like, girl.')] },
        ] },
      ],
      fim: {
        cheia: [T('Ela fecha o livro de orações em cima do dedo.', 'She closes the prayer book over her finger.'), { t: T('«A balança não aceita a metade.', '«The scales do not take half.') }, T('— Amanhã eu digo isso a ela, antes do conselho.', '— Tomorrow I’ll tell her, before the council.')],
        meia: [T('— Vou falar com ela. Não sei o que vou falar.', '— I’ll talk to her. I don’t know what I’ll say.'), T('Fica um pedaço da frase com ela. Pedaço também afunda barco.', 'A piece of the sentence stays with her. A piece can sink a boat too.')],
        nada: [T('— Pode ir. A Juíza e eu temos o que conversar.', '— You may go. The Judge and I have things to discuss.'), T('Saio. A balança da estátua fica parada, e eu também não mexi nela.', 'I leave. The statue’s scales stay still, and I didn’t move them either.')],
      },
    },

    joseph: {
      img: IMG('n-joseph'), lugar: T('A taverna dos oficiais velhos, tarde da noite', 'The old officers’ tavern, late at night'),
      ideia: T('Pouco, e ele escapa outra vez.', 'Too few, and he slips away again.'), falador: true, mascaras: { vinho: 1, viuva: 1 },
      trocas: [
        { fala: T('— Mais vinho. E não me olha para a mão.', '— More wine. And don’t look at my hand.'), ops: [
          { id: 'p', tipo: 'porta', de: 'vinho', u: 2, txt: T('Eu sirvo pela esquerda, senhor, para o copo ficar do lado bom.', 'I pour from the left, sir, so the cup stays on the good side.'), resp: [T('Ele ri sozinho, alto, e a taça gira na mão boa.', 'He laughs to himself, loud, and the cup turns in his good hand.'), T('— Esperto. Ela era assim, aos dezesseis.', '— Clever. She was like that, at sixteen.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('O senhor vai na coluna?', 'Will you ride with the column, sir?'), resp: [T('— Se ela deixar um velho ir.', '— If she lets an old man go.')] },
          { id: 's', tipo: 'silencio', u: 2, resp: [T('Sirvo e espero. A taça treme, e ele fala para eu não olhar a mão.', 'I pour and wait. The cup shakes, and he talks so I won’t look at his hand.'), T('— Trinta anos de deserto, e sabe o que me sobrou? Esta mão.', '— Thirty years of desert, and you know what I have left? This hand.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('A Lâmina devia levar os melhores, senhor.', 'The Blade should take the best, sir.'), resp: [T('— Devia, devia. Todo mundo nesta taverna sabe o que ela devia.', '— Should, should. Everyone in this tavern knows what she should.')] },
        ] },
        { fala: T('— Trinta anos eu corro atrás desses bichos. Sabe o que eles fazem quando a gente chega? Somem.', '— Thirty years I’ve chased those beasts. You know what they do when we get there? They vanish.'), ops: [
          { id: 'p', tipo: 'porta', de: 'viuva', u: 2, txt: T('Meu marido morreu atrás deles. Numa duna que estava vazia quando ele subiu.', 'My husband died chasing them. On a dune that was empty when he climbed it.'), resp: [T('A taça para.', 'The cup stops.'), T('— Numa duna vazia. Muita gente boa morreu numa duna vazia.', '— On an empty dune. Many good men died on an empty dune.')] },
          { id: 'q', tipo: 'pergunta', u: 2, txt: T('E como se pega o que some?', 'And how do you catch what vanishes?'), resp: [T('— Cercando. Com gente que não acaba.', '— You surround it. With men who don’t run out.')] },
          { id: 's', tipo: 'silencio', u: 1, resp: [T('— Some. Como fumaça. Você nunca viu, você é daqui.', '— They vanish. Like smoke. You never saw it, you’re from here.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Então que mandem todo mundo.', 'Then let them send everyone.'), resp: [T('— Você não manda nem no vinho.', '— You don’t even command the wine.')] },
        ] },
        { fala: T('— Dois mil. Dois mil é escaramuça. Escaramuça é o que Redom faz há duzentos anos, e há duzentos anos eles fogem.', '— Two thousand. Two thousand is a skirmish. Skirmish is what Redom has done for two hundred years, and for two hundred years they’ve run.'), ops: [
          { id: 'p', tipo: 'porta', de: 'desertor', u: 2, txt: T('Em Alvena, um desertor me disse que todo ano Redom manda os filhos e todo ano volta menos filho.', 'In Alvena, a deserter told me that every year Redom sends its sons and every year fewer sons come back.'), resp: [T('— Volta menos porque vai pouco. Vai pouco, e o bicho escapa.', '— Fewer come back because too few go. Too few, and the beast gets away.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E se for mais?', 'And if more go?'), resp: [T('— Se for mais, a gente fecha as saídas. Os poços, as dunas, a rocha. Fecha tudo.', '— If more go, we close the ways out. The wells, the dunes, the rock. Close it all.')] },
          { id: 's', tipo: 'silencio', u: 2, resp: [T('Ele gira a taça e fala para o vinho.', 'He turns the cup and talks to the wine.'), T('— Eu disse isso ao pai dela. O pai dela riu. Morreu nas Goelas, o pai dela.', '— I told her father that. Her father laughed. Died at the Gullets, her father.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Com pouco, ele escapa.', 'With too few, he gets away.'), resp: [T('Ele me olha com os olhos de quem já foi general.', 'He looks at me with the eyes of a man who was a general once.'), T('— Quem pôs isso na sua boca?', '— Who put that in your mouth?')] },
        ] },
        { fala: T('— Ela não vai me ouvir. Eu perdi para ela. Quem perdeu não dá conselho.', '— She won’t listen to me. I lost to her. The one who lost doesn’t give advice.'), ops: [
          { id: 'p', tipo: 'porta', de: 'vinho', u: 2, txt: T('Quem perdeu para ela é quem sabe como ela vence. E o senhor quer uma última campanha.', 'The one who lost to her is the one who knows how she wins. And you want one last campaign, sir.'), resp: [T('Ele pensa nisso de boca aberta. Depois fecha a boca, satisfeito.', 'He thinks about it with his mouth open. Then he shuts his mouth, pleased.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E se o senhor falar mesmo assim?', 'And if you speak anyway, sir?'), resp: [T('— Aí ela me escuta e faz o contrário. Ela gosta de me fazer o contrário.', '— Then she hears me and does the opposite. She likes doing me the opposite.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Diga a ela que leve todo mundo.', 'Tell her to take everyone.'), resp: [T('— Vai embora, antes que eu lembre do seu rosto.', '— Go, before I remember your face.')] },
        ] },
      ],
      fim: {
        cheia: [T('Ele bate a taça na mesa.', 'He slams the cup on the table.'), { t: T('«Pouco, e ele escapa outra vez.', '«Too few, and he slips away again.') }, T('— Vou dizer isso a ela amanhã, na cara. Uma vez na vida ela vai ter que ouvir um velho.', '— I’ll tell her tomorrow, to her face. Once in her life she’ll have to listen to an old man.')],
        meia: [T('— Eu vou falar. Ela não vai ouvir, mas eu vou falar.', '— I’ll speak. She won’t listen, but I’ll speak.'), T('Velho que fala para não ser ouvido grita mais alto.', 'An old man who speaks not to be heard shouts louder.')],
        nada: [T('— Pode ir, menina. O vinho eu sirvo sozinho.', '— You can go, girl. I’ll pour the wine myself.'), T('Ele derrama metade na mesa e não liga.', 'He spills half on the table and doesn’t care.')],
      },
    },

    varr: {
      img: IMG('n-varr'), lugar: T('O refeitório da infantaria, depois do toque de recolher', 'The infantry mess, after curfew'),
      ideia: T('Nenhum homem quer ser o que ficou em casa.', 'No man wants to be the one who stayed home.'), falador: true, mascaras: { horne: 1, maud: 1 },
      trocas: [
        { fala: T('— Senta aqui. Bebe. Amanhã a gente sabe quem vai e quem fica.', '— Sit here. Drink. Tomorrow we find out who goes and who stays.'), ops: [
          { id: 'p', tipo: 'porta', de: 'horne', u: 2, txt: (st) => ({ ajudar: T('O senhor deve uma à Lâmina. Desde aquela prova.', 'You owe the Blade one, sir. Since that exam.'), errar: T('O senhor ainda não esqueceu aquele número errado.', 'You still haven’t forgotten that wrong number, sir.') }[c4(st).varr] || T('O senhor nunca foi escolhido para nada que desse canção.', 'You’ve never been chosen for anything worth a song, sir.')),
            resp: (st) => ({ ajudar: [T('— Devo. — Ele bate no meu ombro com força. — E um Varr paga o que deve.', '— I do. — He slaps my shoulder hard. — And a Varr pays what he owes.')], errar: [T('— Esquecer? Eu vou morrer sabendo aquela conta.', '— Forget it? I’ll die knowing that sum.')] }[c4(st).varr] || [T('— Nunca. — Ele ri e não acha graça.', '— Never. — He laughs and doesn’t find it funny.')]) },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E o senhor vai?', 'And will you go, sir?'), resp: [T('— Com dois mil? Eu vou. E os bons ficam.', '— With two thousand? I go. And the good ones stay.')] },
          { id: 's', tipo: 'silencio', u: 2, resp: [T('Bebo e não digo nada. Ele aguenta três goles.', 'I drink and say nothing. He lasts three sips.'), T('— Sabe quem fica? Os melhores. Os melhores ficam guardando a cama da Cidadela.', '— You know who stays? The best. The best stay home guarding the Citadel’s beds.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Todo oficial devia ir.', 'Every officer should go.'), resp: [T('— Desde quando você decide isso?', '— Since when do you decide that?')] },
        ] },
        { fala: T('— A Terceira é minha. Dois mil homens que nunca viram um Grakh de perto.', '— The Third is mine. Two thousand men who’ve never seen a Grakh up close.'), ops: [
          { id: 'p', tipo: 'porta', de: 'maud', u: 2, txt: T('A sua irmã diz que o senhor não suporta ver os outros partirem sem o senhor.', 'Your sister says you can’t stand to see the others leave without you, sir.'), resp: [T('— A Maud fala demais. E fala certo.', '— Maud talks too much. And she talks right.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E os outros comandantes?', 'And the other commanders?'), resp: [T('— Os outros ficam. Na volta, vão rir de mim ou chorar em cima de mim. Depende.', '— The others stay. When I’m back, they’ll laugh at me or weep over me. Depends.')] },
          { id: 's', tipo: 'silencio', u: 1, resp: [T('— Dois mil meninos. E eu na frente deles, para eles verem como se faz.', '— Two thousand boys. And me in front of them, so they see how it’s done.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Dois mil meninos não bastam.', 'Two thousand boys aren’t enough.'), resp: [T('— Você fala igual aos velhos do conselho.', '— You talk like the old men on the council.')] },
        ] },
        { fala: T('— Se eu voltar com a cabeça do bicho, a canção é minha. Se eu não voltar, a culpa também é.', '— If I come back with the beast’s head, the song is mine. If I don’t come back, so is the blame.'), ops: [
          { id: 'p', tipo: 'porta', de: 'grisalho', u: 2, txt: T('Na Sentença, um soldado velho disse que, se ela quiser vingança, vai todo mundo.', 'On the Sentence, an old soldier said that if she wants vengeance, everyone goes.'), resp: [T('Ele repete, pesando cada palavra.', 'He repeats it, weighing each word.'), T('— Todo mundo. Todo mundo quer ir aonde tem canção.', '— Everyone. Everyone wants to go where there’s a song.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E o que os outros oficiais acham?', 'And what do the other officers think?'), resp: [T('— Que eu tive sorte. Todos acham que eu tive sorte.', '— That I got lucky. They all think I got lucky.')] },
          { id: 's', tipo: 'silencio', u: 2, resp: [T('Ele enche a minha caneca sem perguntar e olha para a mesa dos outros oficiais.', 'He fills my mug without asking and looks at the other officers’ table.'), T('— Olha para eles. Cada um ali queria estar no meu lugar, e nenhum vai dizer.', '— Look at them. Every one of them wants my place, and not one will say it.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Então leve todos com o senhor.', 'Then take them all with you, sir.'), resp: [T('— Eu não levo nada. Quem leva é ela.', '— I don’t take anything. She does the taking.')] },
        ] },
        { fala: T('— Amanhã eu falo no conselho. Falo o quê?', '— Tomorrow I speak in council. Say what?'), ops: [
          { id: 'p', tipo: 'porta', u: 2, txt: T('Que os seus homens não querem ver os outros partirem da janela. Nem os dos outros.', 'That your men don’t want to watch the others leave from a window. Nor does anyone else’s.'), resp: [T('Ele ri, e desta vez acha graça.', 'He laughs, and this time he finds it funny.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('O que o senhor quiser dizer?', 'Whatever you want to say, sir?'), resp: [T('— Eu quero dizer que eu vou. E que eu não quero ir sozinho.', '— I want to say I’m going. And that I don’t want to go alone.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Diga que todos têm que ir.', 'Say that everyone has to go.'), resp: [T('— Isso é conversa de quem não vai.', '— That’s talk from someone who isn’t going.')] },
        ] },
      ],
      fim: {
        cheia: [T('Ele levanta a caneca para a mesa toda.', 'He raises his mug to the whole table.'), { t: T('«Nenhum homem quer ser o que ficou em casa.', '«No man wants to be the one who stayed home.') }, T('Os oficiais batem as canecas. Amanhã cada um vai achar que pensou nisso primeiro.', 'The officers bang their mugs. Tomorrow each of them will think he thought of it first.')],
        meia: [T('— Eu vou dizer que a Terceira não vai sozinha.', '— I’ll say the Third doesn’t go alone.'), T('Uma frase pela metade, na boca de um homem que fala alto. Empurra.', 'Half a sentence, in the mouth of a loud man. It pushes.')],
        nada: [T('— Vai dormir, que amanhã é cedo.', '— Go to bed, tomorrow’s early.'), T('Ele vira a caneca e esquece que eu estava ali.', 'He drains the mug and forgets I was there.')],
      },
    },

    ansel: {
      img: IMG('n-ansel'), lugar: T('A enfermaria do quartel, à noite', 'The barracks infirmary, at night'),
      ideia: T('Ele me deixou ir para ela vir.', 'He let me go so that she would come.'), falador: false, mascaras: { bertha: 1, aldo: 1 },
      trocas: [
        { fala: T('— Não precisa me olhar assim. Eu já contei para todo mundo.', '— You don’t have to look at me like that. I’ve told everyone already.'), ops: [
          { id: 'p', tipo: 'porta', de: 'bertha', u: 2, txt: T('Conta para mim, filho. Eu gosto de ouvir de você.', 'Tell me, son. I like hearing it from you.'), resp: [T('Ele abaixa a cabeça.', 'He lowers his head.'), T('— Ele dividiu o pão comigo. A última coisa que ele fez de manhã foi dividir o pão.', '— He shared his bread with me. The last thing he did that morning was share his bread.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('Conta para mim também.', 'Tell me too.'), resp: (st) => [/acab/.test(String(c6(st).rangido)) ? T('— O Grakh grande acabou com o comandante num golpe só, sem olhar. Depois me viu.', '— The big Grakh finished the commander in one blow, without looking. Then he saw me.') : T('— O Grakh grande ficou olhando o comandante até ele parar. Não acabou com ele. Ficou olhando. Depois olhou para mim.', '— The big Grakh kept looking at the commander until he stopped. He didn’t finish him. He just looked. Then he looked at me.')] },
          { id: 's', tipo: 'silencio', u: 1, resp: [T('Ele aguenta o silêncio menos do que acha.', 'He can bear the silence less than he thinks.'), T('— Ele me viu.', '— He saw me.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('O Grakh deixou você ir de propósito.', 'The Grakh let you go on purpose.'), resp: [T('— Quem te contou isso?', '— Who told you that?')] },
        ] },
        { fala: T('— Eu estava no cavalo. Ele estava em cima do comandante.', '— I was on the horse. He was over the commander.'), ops: [
          { id: 'p', tipo: 'porta', de: 'aldo', u: 2, txt: T('Você acorda de noite gritando que ele olhou para você.', 'You wake at night shouting that he looked at you.'), resp: [T('— Olhou. Bicho não olha assim. Olhou e voltou para o que estava fazendo.', '— He looked. Beasts don’t look like that. He looked and went back to what he was doing.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E o que ele fez?', 'And what did he do?'), resp: [T('— Nada. Deixou eu ir.', '— Nothing. He let me go.')] },
          { id: 's', tipo: 'silencio', u: 0, resp: [T('Ele aperta o lençol com as duas mãos e não diz mais nada.', 'He grips the sheet with both hands and says nothing more.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Ele deixou você ir para você contar.', 'He let you go so you would tell.'), resp: [T('Ele recua na cama.', 'He shrinks back on the bed.'), T('— Você não estava lá.', '— You weren’t there.')] },
        ] },
        { fala: T('— Eu podia ter morrido lá. Devia.', '— I could have died there. I should have.'), ops: [
          { id: 'p', tipo: 'porta', de: 'garrick', u: 2, txt: T('O comandante dividia o pão com quem estava de guarda. Ele não ia querer você morto.', 'The commander shared his bread with whoever was on watch. He wouldn’t want you dead.'), resp: [T('— Ele disse que o pão de amanhã era por conta dele.', '— He said tomorrow’s bread was on him.'), T('O menino ri, e o riso quebra no meio.', 'The boy laughs, and the laugh breaks in the middle.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('Por que um bicho deixa um homem ir?', 'Why would a beast let a man go?'), resp: [T('Ele pensa. É a primeira vez que alguém pergunta isso.', 'He thinks. It’s the first time anyone has asked him.'), T('— Não sei.', '— I don’t know.')] },
          { id: 's', tipo: 'silencio', u: 0, resp: [T('Ele espera que eu diga que não. Eu não digo, e ele fica com o "devia".', 'He waits for me to say no. I don’t, and he keeps the "should".')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Você ficou vivo para ela ir até lá.', 'You stayed alive so she would go there.'), resp: [T('— Para com isso. Por favor.', '— Stop. Please.')] },
        ] },
        { fala: T('— Eu cavalguei sem parar até a Cidadela. Ela ouviu tudo e não disse nada.', '— I rode to the Citadel without stopping. She heard it all and said nothing.'), ops: [
          { id: 'p', tipo: 'porta', u: 2, txt: T('Quem deixa um mensageiro ir quer que a mensagem chegue. Ele queria que ela soubesse.', 'Whoever lets a messenger go wants the message to arrive. He wanted her to know.'), resp: [T('Ansel fica branco.', 'Ansel goes white.'), T('— Ele queria que ela fosse.', '— He wanted her to come.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E o que ela fez?', 'And what did she do?'), resp: [T('— Pediu os mapas.', '— She asked for the maps.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Ele está esperando por ela.', 'He’s waiting for her.'), resp: [T('— Sai daqui.', '— Get out.')] },
        ] },
      ],
      fim: {
        cheia: [T('Ele se levanta da cama, depressa, de camisa.', 'He gets up from the bed, fast, in his shirt.'), { t: T('«Ele me deixou ir para ela vir.', '«He let me go so that she would come.') }, T('— Eu tenho que contar isso. Eu não contei essa parte.', '— I have to tell this. I didn’t tell that part.'), T('Tudo o que ele vai dizer é verdade. Eu só arrumei a ordem.', 'Everything he’ll say is true. I only rearranged it.')],
        meia: [T('— Ele me viu. Ele sabia o que estava fazendo.', '— He saw me. He knew what he was doing.'), T('Vai contar isso amanhã, com a voz tremendo. A voz que treme convence mais.', 'He’ll tell it tomorrow, with his voice shaking. A shaking voice convinces better.')],
        nada: [T('— Me deixa dormir.', '— Let me sleep.'), T('Deixo. Ele não dorme.', 'I let him. He doesn’t sleep.')],
      },
    },
  },

  // ---------------------------------------------------------------- O INTERROGATÓRIO (o Anzol ao contrário)
  // ouro: o que ela quer ouvir de Laura; verm: o que Laura quer concluir. mente: as orelhas falam (vermelho +1)
  interrogatorio: {
    img: IMG('c-laura'),
    ouro: T('Volte e ponha a Orla de joelhos.', 'Go back and bring the Shore to its knees.'),
    verm: T('Foi você que levantou o mar.', 'It was you who raised the sea.'),
    orelhas: T('Minhas orelhas colam no crânio. Ela olha para elas, e não para a minha boca.', 'My ears press flat to my skull. She looks at them, and not at my mouth.'),
    // o que o rosto dela faz depois de cada resposta: o jogador lê a conta sem ver números
    reage: {
      ouro2: T('Ela se inclina para a frente. A conta muda de lado.', 'She leans forward. Her count changes sides.'),
      ouro1: T('Ela guarda a resposta.', 'She puts the answer away.'),
      verm2: T('Atrás dela, uma mão desce até o cabo da espada.', 'Behind her, a hand drops to a sword hilt.'),
      verm1: T('Ela olha para as minhas orelhas.', 'She looks at my ears.'),
    },
    perguntas: [
      { fala: T('— Nome.', '— Name.'), ops: [
        { id: 'nao', txt: T('Não tenho.', 'I don’t have one.'), ouro: 0, verm: 0, resp: [T('— Todo mundo tem. Até os Grakh têm.', '— Everyone has one. Even the Grakh do.')] },
        { id: 'quiser', txt: T('Do que você quiser.', 'Whatever you like.'), ouro: 0, verm: 1, resp: [T('Ela não ri.', 'She doesn’t laugh.'), T('— Não brinca comigo.', '— Don’t play with me.')] },
        { id: 'madrinha', txt: T('Na Orla me chamam de Madrinha.', 'On the Shore they call me Godmother.'), ouro: 1, verm: 0, resp: [T('— Madrinha de quem?', '— Godmother to whom?'), T('— De quem pede.', '— To whoever asks.')] },
        { id: 'soldados', de: 'sargento', txt: T('Pergunte aos seus soldados como me trouxeram.', 'Ask your soldiers how they brought me in.'), ouro: 1, verm: 1, resp: [T('— Disseram que você estava morta. E não estava.', '— They said you were dead. And you weren’t.')] },
      ] },
      { fala: T('— Um barco de pesca contra a maior galera da costa. Por quê?', '— A fishing boat against the biggest galley on the coast. Why?'), ops: [
        { id: 'trazer', txt: T('Eu queria que me trouxessem até você.', 'I wanted them to bring me to you.'), ouro: 2, verm: 0, resp: [T('Ela não responde. Os olhos dela param em mim e contam alguma coisa que eu ainda não sei o que é.', 'She doesn’t answer. Her eyes stop on me and count something I can’t name yet.')] },
        { id: 'piloto', mente: true, txt: T('O meu piloto errou o canal.', 'My pilot took the wrong channel.'), ouro: 0, verm: 1, resp: [T('— O seu piloto morreu. É fácil pôr a culpa em morto.', '— Your pilot is dead. It’s easy to blame the dead.')] },
        { id: 'morde', txt: T('Para Redom saber que a Orla ainda morde.', 'So Redom would know the Shore still bites.'), ouro: 1, verm: 1, resp: [T('— Mordeu e perdeu os dentes.', '— It bit, and lost its teeth.')] },
      ] },
      { fala: (st) => (maruLado(st) ? T('— Os meus homens viram o mar subir. Um mar parado, que respirou fundo e quebrou o mastro da maior galera da costa.', '— My men saw the sea rise. A still sea, that took a deep breath and broke the mast of the biggest galley on the coast.') : T('— Os meus homens viram o mar subir. Um mar parado, que respirou fundo e subiu.', '— My men saw the sea rise. A still sea, that took a deep breath and rose.')), ops: [
        { id: 'quer', mente: true, txt: T('O mar da Orla sobe quando quer.', 'The Shore’s sea rises when it likes.'), ouro: 0, verm: 1, resp: [T('— Sobe. Nunca subiu em cima de uma galera de Redom.', '— It does. It never rose over a Redom galley.')] },
        { id: 'perto', txt: T('Eu vi de perto. Mais perto que os seus homens.', 'I saw it up close. Closer than your men.'), ouro: 0, verm: 0, resp: [T('— Viu.', '— You did.'), T('Ela guarda a resposta e não diz onde.', 'She puts the answer away and doesn’t say where.')] },
        { id: 'fui', txt: T('Fui eu.', 'It was me.'), ouro: 1, verm: 9, flag: 'confessou', resp: [T('Ela não se mexe. O homem atrás dela põe a mão na espada.', 'She doesn’t move. The man behind her puts his hand on his sword.')] },
        { id: 'cala', silencio: true, ouro: 0, verm: 1, resp: [T('— Na minha mesa, silêncio também é resposta.', '— At my table, silence is an answer too.')] },
      ] },
      { fala: T('— A Orla não tem líder. Redom sabe disso há cem anos.', '— The Shore has no leader. Redom has known that for a hundred years.'), ops: [
        { id: 'nos', de: 'sarnai', txt: T('Não tem líder. Tem dívida. Sarnai deve barcos a Ossian. Alguém da casa de Sarnai vendeu à sua galera a rota do irmão de Ruo. Eu sei quem deve a quem.', 'It has no leader. It has debts. Sarnai owes Ossian boats. Someone of Sarnai’s house sold your galley the route of Ruo’s brother. I know who owes whom.'), ouro: 3, verm: 0, resp: [T('Pela primeira vez ela olha para o homem atrás dela.', 'For the first time she looks at the man behind her.'), T('— Pescadora não sabe disso.', '— A fisherwoman doesn’t know that.')] },
        { id: 'agora', txt: T('Agora tem.', 'Now it does.'), ouro: 1, verm: 1, resp: [T('— Desde quando?', '— Since when?'), T('— Desde que eu subi.', '— Since I came up.')] },
        { id: 'segue', mente: true, txt: T('A Orla me segue.', 'The Shore follows me.'), ouro: 0, verm: 1, resp: [T('— Seguiu você até a minha galera. E morreu toda.', '— It followed you to my galley. And all of it died.')] },
      ] },
      { fala: T('— O que você quer?', '— What do you want?'), ops: [
        { id: 'agua', txt: T('Voltar para a água.', 'To go back to the water.'), ouro: 0, verm: 0, resp: [T('— Isso todo preso quer.', '— Every prisoner wants that.')] },
        { id: 'costa', txt: T('Que você mande os seus para onde quiser, e esqueça a costa.', 'For you to send your people wherever you like, and forget the coast.'), ouro: 2, verm: 0, resp: [T('Ela inclina a cabeça um pouco. A conta dela muda de lado.', 'She tilts her head a little. Her count changes sides.')] },
        { id: 'galera', de: (st) => (fezCarcereiro(st, 'dunstan') ? 'dunstan' : null), txt: T('Que Redom pare de pagar uma galera por aldeia. A costa custa a você mais que uma guerra.', 'For Redom to stop paying a galley for every village. The coast costs you more than a war.'), ouro: 2, verm: 0, resp: [T('— Quem te contou o preço de uma galera?', '— Who told you what a galley costs?'), T('— Eu sei somar.', '— I can add.')] },
        { id: 'irmao', de: (st) => (fezCarcereiro(st, 'garrick') ? 'garrick' : tem(st, 'hobb') ? 'hobb' : null), txt: (st) => (fezCarcereiro(st, 'garrick') ? T('Simon. Aqui embaixo esse nome não se diz perto de você.', 'Simon. Down here that name isn’t said near you.') : T('Até os soldados da Sentença sabem que você não come desde o seu irmão.', 'Even the soldiers on the Sentence know you haven’t eaten since your brother.')), ouro: 2, verm: 2, flag: 'usouSimon', resp: [T('Pela primeira vez a voz dela muda. Fica mais baixa.', 'For the first time her voice changes. It drops.'), T('— Como uma pirata sabe do meu irmão?', '— How does a pirate know about my brother?')] },
        { id: 'deserto', txt: T('Que você termine o que começou na Boca Seca.', 'For you to finish what you started in the Dry Mouth.'), ouro: 1, verm: 2, flag: 'semente', resp: [T('Os olhos dela esfriam.', 'Her eyes go cold.'), T('— O que você sabe da Boca Seca?', '— What do you know about the Dry Mouth?')] },
        { id: 'mim', txt: T('O que você quiser de mim.', 'Whatever you want from me.'), ouro: 0, verm: 2, resp: (st) => (st.f.lam_quiser ? [T('— Eu já disse para não brincar.', '— I told you not to play.')] : [T('— Você não tem nada que eu queira.', '— You have nothing I want.')]) },
      ] },
    ],
  },

  // ---------------------------------------------------------------- A ORDEM (a Sala dos Mapas): cinco papéis verdadeiros
  ordem: {
    img: IMG('n-mapas'),
    papeis: [
      { id: 1, txt: T('A Pira recuou das Goelas com perdas pesadas, perto da metade.', 'The Pyre fell back from the Gullets with heavy losses, near half.') },
      { id: 2, txt: T('O comandante Simon D’Orrose está morto.', 'Commander Simon D’Orrose is dead.') },
      { id: 3, txt: T('O sentinela viu o Grakh grande vivo, e o Grakh o deixou ir.', 'The sentry saw the big Grakh alive, and the Grakh let him go.') },
      { id: 4, txt: T('Os poços das Goelas continuam com Redom.', 'The wells of the Gullets remain with Redom.') },
      { id: 5, txt: T('Batedores: a Pira se move para o norte.', 'Scouts: the Pyre is moving north.') },
    ],
  },

  paginas: [

    // ===================================================== ABERTURA
    { id: 'c00', zona: 'fundo', agua: .8, fundo: { img: IMG('capa'), dim: .55, kb: 'in', clima: 'bolhas', foco: '60% 40%' },
      cartao: { num: T('Capítulo VII · A Madrinha', 'Chapter VII · The Godmother'), nome: T('A Mulher Sem Nome', 'The Woman With No Name'), epigrafe: T('A Madrinha dá o vento que você pedir, e o resto fica por conta dela.', 'The Godmother gives you the wind you ask for, and the rest is up to her.'), fonte: T('dito de Nove Mastros', 'saying of Nine Masts') } },

    // ===================================================== PARTE I · A ÁGUA
    { id: 'p1', parte: T('I · A Água', 'I · The Water'), zona: 'fundo', agua: 1, fundo: { img: IMG('a01-fundo'), dim: .55, clima: 'bolhas' },
      cartao: { num: T('Parte I', 'Part I'), nome: T('A Água', 'The Water'), epigrafe: T('Quem sobe do fundo não deve explicação a quem ficou no barco.', 'Whoever rises from the deep owes no explanation to those who stayed in the boat.'), fonte: T('dito de Nove Mastros', 'saying of Nine Masts') } },

    { id: 'a01', zona: 'fundo', agua: 1, frase: 'nasce', fundo: { video: VID('a01-fundo'), img: IMG('a01-fundo'), dim: .4, clima: 'bolhas', foco: '55% 45%' },
      texto: [
        V('D00', T('Abro os olhos debaixo d’água e respiro. Aqui embaixo respirar é macio: a água entra fria e sai morna. Lá em cima a luz se quebra em pedaços. Em volta de mim, moças de cauda nadam em roda e cantam. Param quando me veem de olhos abertos.', 'I open my eyes under the water and breathe. Down here breathing is soft: the water goes in cold and comes out warm. Up above, the light breaks into pieces. Around me, girls with tails swim in a ring and sing. They stop when they see my eyes open.')),
        V('D01', T('A frase já estava aqui quando acordei, dobradinha como um bilhete. Duas palavras dela eu não conheço. Laura é um nome sem rosto. Boca Seca deve ser uma doença.', 'The sentence was here when I woke, folded small like a note. Two of its words I don’t know. Laura is a name without a face. Dry Mouth must be some sickness.')),
        T('Não pergunto como cheguei. Subo.', 'I don’t ask how I got here. I go up.'),
      ] },

    { id: 'a02', zona: 'cais', agua: .7, fundo: { img: IMG('a02-escada'), dim: .45, foco: '62% 45%' },
      texto: [
        T('A cidade em cima da água é feita de navios. Dezenas deles, amarrados casco com casco, com pontes de corda de um convés a outro e lanternas penduradas nos mastros. Cheira a alcatrão, a peixe e a gente acordada cedo.', 'The city on top of the water is made of ships. Dozens of them, lashed hull to hull, with rope bridges from deck to deck and lanterns hung from the masts. It smells of tar, of fish, and of people up early.'),
        V('D02', T('Na escada do cais, uma mulher derruba o cesto e se ajoelha em cima dos peixes. Gagueja um título que eu nunca ouvi. Estendo a mão. Ela beija meus dedos. Deixo que termine.', 'On the dock stairs a woman drops her basket and kneels on the fish. She stammers a title I have never heard. I hold out my hand. She kisses my fingers. I let her finish.')),
        T('Outros param. Olham para as tábuas. Um velho começa a mesma frase três vezes e não termina nenhuma.', 'Others stop. They look at the planks. An old man starts the same sentence three times and finishes none of them.'),
        T('Alguém me cobre com um pano. Uma menina passa óleo no meu cabelo com os dedos, de trás para a frente, tremendo. Inclino a cabeça para ela alcançar melhor.', 'Someone covers me with a cloth. A girl works oil into my hair with her fingers, back to front, trembling. I tilt my head so she can reach.'),
      ] },

    { id: 'a02b', zona: 'cais', agua: .7, fundo: { img: IMG('a02b-cais'), dim: .45, foco: '55% 45%' },
      texto: [
        T('Até o meio-dia, Nove Mastros inteira sabe. Os barcos que iam sair ficam amarrados. Os que já tinham saído aparecem no horizonte, voltando de vela cheia.', 'By noon, all of Nine Masts knows. The boats that were about to leave stay tied up. The ones already out show on the horizon, coming back under full sail.'),
        T('Uma mulher ergue um bebê acima das cabeças, para ele me ver de longe. Dois meninos mergulham no lugar onde eu subi e voltam de mãos vazias, procurando o que eu deixei lá embaixo.', 'A woman lifts a baby above the heads so it can see me from afar. Two boys dive where I came up and surface empty-handed, looking for whatever I left down there.'),
        T('Os olhos deles não aguentam os meus por muito tempo. Olham, abaixam, voltam, como se olha o sol na água.', 'Their eyes can’t hold mine for long. They look, drop, come back, the way you look at sun on water.'),
        T('Deixo que olhem. Por enquanto, é de graça.', 'I let them look. For now, it’s free.'),
      ] },

    { id: 'a03', zona: 'cais', agua: .7, fundo: { img: IMG('a03-velha'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Uma velha de orelhas rasgadas abre caminho entre eles. Tem os olhos amarelos de todo mundo aqui. Olha para os meus e ri com uma boca quase sem dente.', 'An old woman with torn ears pushes through them. She has the yellow eyes everyone here has. She looks into mine and laughs with a mouth nearly out of teeth.'),
        T('— A Madrinha voltou. Minha avó viu a senhora.', '— The Godmother is back. My grandmother saw you.'),
        V('D03', T('— Então a sua avó viu bem.', '— Then your grandmother saw well.')),
        T('Ela faz o resto da conta sozinha, e termina chorando.', 'She does the rest of the sum on her own, and finishes in tears.'),
      ] },

    { id: 'a03b', zona: 'cais', agua: .7, fundo: { img: IMG('a03-velha'), dim: .6, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Enquanto os mais velhos não chegam, ela senta no degrau abaixo do meu e conta o que a avó contava. Conta alto, para os outros ouvirem que ela sabe.', 'While the elders are still coming, she sits on the step below mine and tells what her grandmother used to tell. She tells it loud, so the others hear that she knows.'),
        T('— A Madrinha ensinou o primeiro barco a mentir para o vento. Quem vai navegar, quem vai se aventurar, quem vai enganar alguém, pede a ela. Pede antes, que depois ela não escuta.', '— The Godmother taught the first boat to lie to the wind. Whoever goes sailing, whoever goes adventuring, whoever means to fool someone, asks her. Asks before, because after she doesn’t listen.'),
        T('— E paga. Moeda no mar, antes de soltar o cabo. Ela não cobra. Mas lembra de quem não pagou.', '— And pays. A coin into the sea before you cast off. She doesn’t charge. But she remembers who didn’t pay.'),
        { t: T('Olho para a minha saia. As moedas costuradas na barra batem umas nas outras quando eu mexo a perna. Prata gasta, ouro velho, cobre verde. Tanta gente me pediu coisas. Passo o dedo nelas e não lembro de nenhuma.', 'I look down at my skirt. The coins sewn into the hem knock together when I move my leg. Worn silver, old gold, green copper. So many people asked me for things. I run a finger over them and don’t remember one.'), moeda: true },
        G('velha', T('— Da casa da minha avó só sobrei eu, Madrinha — diz a velha, mais baixo, só para mim. — Os outros a Sentença levou.', '— Of my grandmother’s house there’s only me left, Godmother — the old woman says, lower, just for me. — The rest the Sentence took.')),
      ] },

    { id: 'a04', zona: 'cabine', agua: .6, fundo: { img: IMG('a04-cabine'), dim: .5, foco: '60% 45%' },
      texto: [
        T('De noite me levam ao maior dos navios, o que fica no meio da cidade e não sai mais do lugar. Três pessoas me esperam na cabine. Cada uma acha que chegou primeiro.', 'At night they take me to the largest ship, the one in the middle of the city that no longer goes anywhere. Three people are waiting in the cabin. Each thinks they arrived first.'),
        G('sarnai', T('Sarnai é das Viúvas do Sal e tem a idade da velha da escada. Reza de olhos fechados antes de falar e só abre quando chega na parte do pedido.', 'Sarnai is of the Salt Widows, as old as the woman on the stairs. She prays with her eyes shut before she speaks, and opens them only when she reaches the part with the request.')),
        G('ossian', T('Ossian Três-Dedos é humano, dos Mastreiros, com um raio desenhado na pele do pescoço até a orelha. Ele se ajoelha depressa, para ser o primeiro a se levantar.', 'Ossian Three-Fingers is human, of the Mastmen, with lightning drawn on his skin from neck to ear. He kneels quickly, so as to be the first to stand.')),
        G('ruo', T('Ruo é do Recife, é novo e não se ajoelha. Fica de braços cruzados na porta, procurando nos meus olhos a costura de uma máscara.', 'Ruo is of the Reef, young, and does not kneel. He stands at the door with his arms crossed, searching my eyes for the seam of a mask.')),
      ] },

    { id: 'a05', zona: 'cabine', agua: .6, fundo: { img: IMG('a04-cabine'), dim: .62 },
      texto: [
        T('— Redom tomou Alvena há quatro verões, Madrinha — diz Sarnai. — Fechou o porto para a Orla. Quem leva peixe para vender sai de lá sem o barco.', '— Redom took Alvena four summers ago, Godmother — says Sarnai. — Closed the port to the Shore. Whoever brings fish to sell comes back without the boat.'),
        T('— Para eles, todo barco da Orla é pirata e todo Nymae é feiticeiro — diz Ossian. — Os homens, eles enforcam no molhe de Alvena. Os que eles acham que conjuram, levam vivos para a Capital, para a Lâmina ver com os olhos dela.', '— To them, every boat of the Shore is a pirate and every Nymae a sorcerer — says Ossian. — The men they hang on the mole at Alvena. The ones they think can conjure, they take alive to the Capital, for the Blade to see with her own eyes.'),
        T('— A Sentença queimou a frota do meu irmão no Canal das Garças — diz Ruo. — É a galera que caça a costa. Se a senhora é quem dizem, afunda a Sentença.', '— The Sentence burned my brother’s fleet in the Heron Channel — says Ruo. — She’s the galley that hunts the coast. If you are who they say, sink the Sentence.'),
        V('D04', T('Enquanto eles pedem, eu escuto o resto. Sarnai deve barcos a Ossian, e por isso fala mais alto que ele. Ossian quer o meu nome do lado dele da mesa. Ruo diz "meu irmão" olhando para Sarnai, e Sarnai alisa a saia. Foi alguém da casa dela que vendeu a rota.', 'While they ask, I listen to the rest. Sarnai owes Ossian boats, and so she speaks louder than he does. Ossian wants my name on his side of the table. Ruo says "my brother" looking at Sarnai, and Sarnai smooths her skirt. It was someone of her house who sold the route.')),
        T('Na Orla não há quem mande. Há quem saiba os nós.', 'On the Shore there is no one who rules. There is whoever knows the knots.'),
      ],
      escolha: { id: 'chefes', pergunta: T('O que eu dou a eles?', 'What do I give them?'), opcoes: [
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.orla, txt: T('Redom vai pagar por cada barco.', 'Redom will pay for every boat.'),
          resultado: [T('Sarnai chora de olhos fechados. Ossian já faz a conta de quanto vai receber. Ruo sai e fecha a porta com cuidado, que é como os novos batem porta.', 'Sarnai weeps with her eyes closed. Ossian is already counting what he’ll get. Ruo leaves and shuts the door carefully, which is how the young slam doors.')] },
        { id: 'fria', fala: true, tom: 'fria', aviso: AV.orla, txt: T('Eu vou a Redom.', 'I am going to Redom.'),
          resultado: [T('Eles não entendem. Sarnai se ajoelha outra vez, por garantia. Ossian pergunta com quantos navios. Digo que com um, pequeno, e ele ri até ver que eu não estou rindo.', 'They don’t understand. Sarnai kneels again, to be safe. Ossian asks with how many ships. I say one, a small one, and he laughs until he sees I am not laughing.')] },
        { id: 'comida', gesto: true, tom: 'divertida', aviso: AV.orla, txt: T('Pedir comida e deixar que esperem.', 'Ask for food and let them wait.'),
          resultado: [T('Eles obedecem antes de eu terminar a frase. Como peixe frito com os dedos, na frente dos três, e lambo o sal de cada dedo antes de responder qualquer coisa. Quando termino, os pedidos estão menores.', 'They obey before I finish the sentence. I eat fried fish with my fingers in front of the three of them and lick the salt off each finger before I answer anything. When I finish, the requests have shrunk.')] },
        { id: 'sarnai', fala: true, tom: 'cruel', aviso: AV.orla, txt: T('Sarnai, quem da sua casa vendeu a rota?', 'Sarnai, who of your house sold the route?'),
          resultado: [T('A cabine prende o ar. Sarnai abre a boca e não sai a reza nem o pedido. Ruo descruza os braços. Ossian me olha e refaz a conta.', 'The cabin holds its breath. Sarnai opens her mouth and neither prayer nor request comes out. Ruo uncrosses his arms. Ossian looks at me and does his sums again.'),
            T('Não espero a resposta. Sarnai vai passar a noite procurando quem da casa dela me contou.', 'I don’t wait for the answer. Sarnai will spend the night hunting for whoever in her house told me.')] },
      ] } },

    { id: 'a05c', zona: 'cais', agua: .65, fundo: { img: IMG('a05c-oferendas'), dim: .45, foco: '55% 45%' },
      texto: [
        T('De manhã tem fila na prancha do meu barco. Cada um traz uma moeda e um pedido, e diz o pedido baixo, perto do meu ouvido, como se o resto do cais não estivesse escutando.', 'In the morning there is a line at my boat’s gangplank. Each one brings a coin and a request, and says the request low, close to my ear, as if the rest of the dock weren’t listening.'),
        T('Um pescador quer Alvena de volta, porque o peixe dele apodrece sem porto. Uma mãe quer o filho que a Sentença levou para remar nas galeras. Um rapaz quer que a moça do barco vizinho olhe para ele, e fica vermelho até a ponta das orelhas.', 'A fisherman wants Alvena back, because his fish rots without a port. A mother wants the son the Sentence took to row in the galleys. A young man wants the girl on the next boat to look at him, and goes red to the tips of his ears.'),
        T('Escuto cada um de olhos fechados e não prometo nada. Eles saem da fila achando que eu prometi.', 'I listen to each of them with my eyes closed and promise nothing. They leave the line thinking I did.'),
      ],
      escolha: { id: 'oferendas', pergunta: T('Como eu recebo?', 'How do I receive them?'), opcoes: [
        { id: 'nomes', gesto: true, tom: 'doce', aviso: AV.orla, txt: T('Tocar a testa de cada um e repetir o nome que disseram.', 'Touch each forehead and say back the name they gave.'),
          resultado: [T('Digo cada nome de volta, uma vez, devagar. Eles saem da fila com a mão na testa, onde eu toquei. À tarde, metade do cais repete o próprio nome do jeito que eu disse.', 'I say each name back, once, slowly. They leave the line with a hand on their forehead, where I touched. By afternoon, half the dock is saying its own name the way I said it.')] },
        { id: 'chao', gesto: true, tom: 'fria', aviso: AV.orla, txt: T('Não tocar em nenhum deles. Deixar que ponham a moeda no chão e saiam.', 'Touch none of them. Let them set the coin on the floor and go.'),
          resultado: [T('Eles põem a moeda na frente dos meus pés e esperam uma palavra que não vem. Saem andando de costas. À noite as moedas são um monte, e o cais dá a volta para não passar perto.', 'They set the coin before my feet and wait for a word that doesn’t come. They leave walking backward. By night the coins are a heap, and the dock walks the long way round to avoid it.')] },
        { id: 'mentira', gesto: true, tom: 'divertida', aviso: AV.orla, txt: T('Devolver a moeda de quem mentiu no pedido.', 'Give back the coin of whoever lied in the request.'),
          resultado: [T('O terceiro da fila pede o barco do irmão de volta. O irmão está vivo, no barco ao lado, e os dois brigaram por uma rede. Devolvo a moeda dele sem dizer nada. Ele fica com ela na mão, branco.', 'The third in line asks for his brother’s boat back. The brother is alive, on the next boat over, and the two fought over a net. I hand his coin back without a word. He stands there holding it, white.'),
            T('Dali em diante, a fila pede baixo e pede certo.', 'From then on, the line asks quietly and asks true.')] },
      ] } },

    { id: 'a06', zona: 'cais', agua: .6, fundo: { img: IMG('a06-moeda'), dim: .45, foco: '62% 50%' },
      texto: [
        T('O último da fila é um menino de uns oito anos. Não fala nada. Abre a mão aos poucos, para a coisa não fugir.', 'The last in line is a boy of about eight. He says nothing. He opens his hand bit by bit, so the thing won’t escape.'),
        T('— Achei num barco queimado, no Canal das Garças. É dinheiro deles. Aqui não vale nada.', '— I found it on a burned boat, in the Heron Channel. It’s their money. It’s worth nothing here.'),
        T('— E você quer o quê, por ela?', '— And what do you want for it?'),
        T('— Minha mãe diz que moeda do inimigo é a que mais pede.', '— My mother says the enemy’s coin is the one that asks the most.'),
        T('Uma moeda de prata. De um lado, uma balança. Do outro, uma mulher de cabelo preso e queixo erguido. Em volta, letras: LAURA D’ORROSE · GENERAL-RAINHA.', 'A silver coin. On one side, a pair of scales. On the other, a woman with her hair tied back and her chin raised. Around her, letters: LAURA D’ORROSE · GENERAL-QUEEN.'),
        { t: T('Laura. A palavra turva assenta, como areia no fundo depois que o barco passa.', 'Laura. The cloudy word settles, like sand on the bottom once the boat has passed.'), frase: 'laura' },
        V('D05', T('O ourives gostava dela, ou devia dinheiro a ela. Na moeda, o queixo sobe mais que o de qualquer rainha.', 'The engraver loved her, or owed her money. On the coin her chin rises higher than any queen’s.')),
        { t: T('Esta eu não costuro na saia. Ela anda pelos nós dos meus dedos, de um lado para o outro, e eu deixo.', 'This one I don’t sew onto my skirt. It walks across my knuckles, back and forth, and I let it.'), moeda: true },
      ] },

    { id: 'a06b', zona: 'cabine', agua: .6, fundo: { img: IMG('a06b-plano'), dim: .5, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('Mando chamar Ossian. Ele vem correndo, porque fui eu que chamei. Ponho a moeda na mesa, com o rosto para cima.', 'I send for Ossian. He comes running, because I was the one who called. I set the coin on the table, face up.'),
        T('— É a Lâmina — diz ele, sem tocar. — A General-Rainha. Laura D’Orrose. Mandou fazer essa moeda no ano em que tomou Alvena.', '— That’s the Blade — he says, without touching it. — The General-Queen. Laura D’Orrose. She had that coin struck the year she took Alvena.'),
        T('Na porta, sem que eu pergunte, ele conta o que acha que vai me servir.', 'At the door, without my asking, he tells me what he thinks will be of use.'),
        T('— Em Alvena, quem sabe das coisas é a casa da Ondina. Taverna embaixo, camas em cima. Os soldados de Redom bebem lá de graça e pagam com o que contam.', '— In Alvena, the one who knows things is Ondina’s house. Tavern downstairs, beds upstairs. Redom’s soldiers drink there for free and pay with what they tell.'),
        T('Ele espera alguma coisa em troca. Olho para ele até ele lembrar que a porta é para sair.', 'He waits for something in return. I look at him until he remembers the door is for leaving.'),
      ] },

    { id: 'a06c', zona: 'cabine', agua: .6, fundo: { img: IMG('a06b-plano'), dim: .62, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('Sozinha, viro a moeda na mesa com a ponta do dedo. Laura. General-Rainha. A Lâmina, que manda trazer os conjuradores vivos, para ver de perto.', 'Alone, I turn the coin on the table with a fingertip. Laura. General-Queen. The Blade, who has conjurers brought to her alive, to see them up close.'),
        T('Ela não vem à Orla. Vai ter de mandar me buscar.', 'She doesn’t come to the Shore. She’ll have to send for me.'),
        V('D20', T('Para quem é da Orla, Redom só abre uma porta, e quem abre é o carcereiro. Preciso que a Sentença me pegue. Viva.', 'For anyone from the Shore, Redom opens only one door, and the one who opens it is the jailer. I need the Sentence to catch me. Alive.')),
      ] },

    { id: 'a07', zona: 'cais', agua: .55, fundo: { img: IMG('a07-taverna'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Antes, Alvena, onde Redom enforca Nymae no molhe. Vou com a cara de outra.', 'Alvena first, where Redom hangs Nymae on the mole. I’ll go wearing someone else’s face.'),
        T('Na taverna do cais tem uma marinheira que ri mais alto que todo mundo. Iska. Sobe na mesa para mostrar o braço: uma cicatriz em zigue-zague do pulso ao cotovelo.', 'In the dock tavern there is a sailor who laughs louder than anyone. Iska. She climbs on the table to show her arm: a zigzag scar from wrist to elbow.'),
        T('— Raio! No meio do mar, com a âncora na mão. Fiquei três dias sem ouvir nada.', '— Lightning! In the middle of the sea, with the anchor in my hand. I couldn’t hear a thing for three days.'),
        G('iska', T('Os outros já ouviram a história e riem igual. Eu olho a cicatriz. Raio não deixa beira reta. Aquilo foi faca, de baixo para cima, de alguém que estava perto o bastante para ela não ver.', 'The others have heard the story before and laugh the same. I look at the scar. Lightning doesn’t leave a straight edge. That was a knife, from below, from someone close enough that she didn’t see it coming.')),
        T('A cara dela já é minha. A camisa ainda está no corpo dela.', 'Her face is already mine. The shirt is still on her back.'),
      ],
      escolha: { id: 'roupa1', pergunta: T('A roupa da Iska', 'Iska’s clothes'), opcoes: [
        { id: 'roubar', gesto: true, preco: 'roubar', tom: 'divertida', txt: T('Tirar a camisa e as calças do varal dela.', 'Take the shirt and trousers off her line.'),
          resultado: [T('O varal fica com um buraco no meio. À tarde ela vai procurar a camisa em todos os barcos do cais e xingar a vizinha.', 'The line is left with a gap in the middle. In the afternoon she’ll look for the shirt on every boat on the dock and curse her neighbor.')] },
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'doce', testemunha: 1, txt: T('Perguntar quem fez a cicatriz, baixinho, no fim da noite.', 'Ask who made the scar, softly, at the end of the night.'),
          resultado: [T('Ela para de rir. Depois ri mais baixo, só para mim, e conta um nome que nunca contou na taverna. De madrugada me dá a camisa sem eu precisar pedir. Vai lembrar de uma mulher de olhos estranhos por uns dias, e depois vai achar que sonhou.', 'She stops laughing. Then she laughs lower, only for me, and tells me a name she has never told in the tavern. Before dawn she gives me the shirt without my having to ask. She’ll remember a woman with strange eyes for a few days, and then she’ll think she dreamed it.')] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'cruel', corpos: 1, txt: T('Esperar por ela sozinha na ponte de corda.', 'Wait for her alone on the rope bridge.'),
          resultado: [T('A lâmina sai da minha manga e volta. A ponte balança um pouco e para. A água embaixo da cidade aceita o que eu dou a ela.', 'The blade leaves my sleeve and comes back. The bridge sways a little and stops. The water under the city takes what I give it.')] },
      ] } },

    { id: 'a08', zona: 'cais', agua: .5, fundo: { video: VID('a08-metamorfose'), img: IMG('a08-metamorfose'), dim: .4, foco: '60% 40%' },
      texto: [
        T('Fecho os olhos e penso na Iska: a risada, o raio no braço, o peso todo numa perna só.', 'I close my eyes and think of Iska: the laugh, the lightning on her arm, all her weight on one leg.'),
        V('D06', T('A pele puxa. As escamas entram uma por uma, como dentes de pente. As orelhas se dobram e colam no crânio, e o mundo fica seco e alto. Minha boca muda de tamanho.', 'My skin pulls. The scales sink in one by one, like the teeth of a comb. My ears fold and press flat to my skull, and the world goes dry and loud. My mouth changes size.')),
        { t: T('Digo o nome dela em voz alta, para experimentar. A voz que sai é a dela, rouca de rir, na primeira tentativa.', 'I say her name aloud, to try it. The voice that comes out is hers, hoarse from laughing, on the first attempt.'), voz: 'D07', veste: 'iska' },
        T('Visto a camisa. Serve.', 'I put on the shirt. It fits.'),
      ] },

    { id: 'a09', zona: 'alvena', agua: .35, veste: 'iska', fundo: { img: IMG('a09-alvena'), dim: .45, foco: '60% 40%' },
      texto: [
        T('Alvena é uma cidade de pedra clara com um farol na ponta do molhe. No farol tem uma bandeira vermelha com uma espada branca, e a guarda da espada é uma balança.', 'Alvena is a town of pale stone with a lighthouse at the end of the mole. On the lighthouse flies a red banner with a white sword, and the sword’s guard is a pair of scales.'),
        T('Soldados de Redom bebem de graça nas mesas da rua. Quem passa perto deles abaixa a cabeça sem perceber que abaixou.', 'Redom’s soldiers drink for free at the street tables. Whoever passes near them lowers their head without noticing they did.'),
        T('Ando com o rosto da Iska, e os olhos passam por mim e seguem. Tenho uma manhã e três perguntas: quando a Sentença passa, o que Redom faz com quem pega vivo, e como chegar perto dela sem ir para o fundo antes da hora.', 'I walk in Iska’s face, and eyes pass over me and move on. I have one morning and three questions: when the Sentence comes through, what Redom does with those it takes alive, and how to get close to her without going to the bottom too soon.'),
      ],
      minijogo: 'escuta', jogoId: 'alvena', mgNome: T('Ouvir os pequenos de Alvena', 'Listen to the small folk of Alvena'),
      depois: (st) => [
        st.f.fraseBoca ? T('Boca Seca é um deserto. A minha boca tem gosto de sal desde que acordei.', 'Dry Mouth is a desert. My mouth has tasted of salt since I woke.')
          : T('O sino do farol bate o meio-dia. Saio do mercado com o que ouvi.', 'The lighthouse bell strikes noon. I leave the market with what I heard.'),
      ] },

    { id: 'a10', zona: 'alvena', agua: .35, veste: 'iska', fundo: { img: IMG('a10-soldado'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Na saída do mercado, um soldado de Redom agarra o meu braço. Está bêbado e acha que me conhece.', 'At the market gate a Redom soldier grabs my arm. He is drunk and thinks he knows me.'),
        T('— Ô, marinheira. Você me deve um beijo desde o verão.', '— Hey, sailor girl. You’ve owed me a kiss since summer.'),
        T('O susto sobe pelo braço que ele aperta, e o rosto da Iska escorrega.', 'The start runs up the arm he is squeezing, and Iska’s face slips.'),
      ],
      piscar: { id: 'p1', antes: 3,
        ok: [T('Fecho os olhos. Quando abro, sou a Iska outra vez, e ele já está rindo de outra coisa. Solta o meu braço.', 'I close my eyes. When I open them I am Iska again, and he is already laughing at something else. He lets go of my arm.')],
        falha: [T('Demoro. Um menino parado ao lado do soldado vê o ouro nos olhos da marinheira. Arregala os olhos, sorri para mim e sai correndo com o segredo.', 'I’m too slow. A boy standing by the soldier sees the gold in the sailor’s eyes. His own go wide, he smiles at me, and he runs off with the secret.')] } },

    // o respiro: a noite depois de Alvena. Nenhuma informação nova: o que ela ouviu vira plano, na boca dela
    { id: 'a11', zona: 'cais', agua: .7, veste: 'ela', fundo: { img: IMG('a11-cais-noite'), dim: .5, foco: '60% 45%' },
      texto: (st) => [
        T('De volta a Nove Mastros, tiro o rosto da Iska como se tira uma luva molhada.', 'Back in Nine Masts, I take off Iska’s face the way you peel off a wet glove.'),
        T('Sento na popa do meu barco com os pés na água e espero a água esquentar.', 'I sit on the stern of my boat with my feet in the water and wait for the water to warm.'),
        sabe(st, 'rota') ? T('Nove dias, no Canal das Garças. Sei onde esperar.', 'Nine days, in the Heron Channel. I know where to wait.')
          : T('O dia da galera eu não sei. Espero no mar o tempo que for.', 'The galley’s day I don’t know. I’ll wait at sea as long as it takes.'),
        sabe(st, 'perto') ? T('Ela pesca os afogados da Orla para vender. Chego boiando.', 'She fishes up the Shore’s drowned to sell. I’ll arrive floating.')
          : T('Como chegar perto dela sem levar seta, ainda não sei.', 'How to get close to her without taking a bolt, I still don’t know.'),
        sabe(st, 'vivos') ? T('Quem conjura vai vivo para a Lâmina. Vão me ver conjurar.', 'Whoever conjures goes to the Blade alive. They’ll see me conjure.')
          : T('O que Redom faz com quem pega vivo, descubro lá.', 'What Redom does with those it takes alive, I’ll find out there.'),
        T('Falta gente para remar.', 'I need people to row.'),
      ] },

    { id: 'a11b', zona: 'cais', agua: .7, veste: 'ela', fundo: { img: IMG('a02b-cais'), dim: .55, foco: '55% 45%' },
      texto: [
        T('Digo no cais que vou a Redom num barco pequeno e que preciso de três pessoas. Metade do cais se oferece aos gritos. Passo dois dias olhando os que ficaram quietos.', 'I say on the dock that I am going to Redom in a small boat and need three people. Half the dock volunteers at the top of its lungs. I spend two days watching the ones who kept quiet.'),
        T('Cinco valem a pena. Cada um quer uma coisa que eu posso dar.', 'Five are worth it. Each of them wants something I can give.'),
      ],
      minijogo: 'tripulacao', jogoId: 'tripulacao', mgNome: T('Escolher três', 'Choose three'),
      aoTerminar: (st, r, ctx) => { (r.escolhidos || []).forEach((k, i) => { st.avisos.push(AV[k]); setTimeout(() => ctx.toast(AV[k]), 300 + i * 1100); }); },
      depois: [T('Três. O barco tem quatro lugares, e o quarto é meu.', 'Three. The boat has four places, and the fourth is mine.')] },

    // as noites no mar: uma conversa séria com cada um dos três. A resposta muda a lealdade (escondida),
    // e a lealdade decide quem tenta virar o barco diante da Sentença, quem ajuda e quem pode ser salvo
    { id: 'a12m', se: (st) => noBarco(st, 'maru'), zona: 'mar', agua: .7, fundo: { img: IMG('a12-maru'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Maru fica no leme e canta para o barco. Uma canção sem fim, que ele recomeça quando acaba.', 'Maru keeps the tiller and sings to the boat. A song with no end, which he starts over when it ends.'),
        G('maru', T('O olho bom vigia a vela. O branco vigia a mim, porque ainda enxerga um pouco, e ele vira a cabeça de leve para esse lado quando não quer que eu saiba que está olhando.', 'His good eye watches the sail. The white one watches me, because it still sees a little, and he turns his head slightly that way when he doesn’t want me to know he is looking.')),
        T('— A senhora conhece a rota dos recifes, Madrinha? Por ali a gente chega em Redom sem galera nenhuma ver.', '— Do you know the reef route, Godmother? That way we reach Redom without a single galley seeing.'),
      ],
      escolha: { id: 'n_maru', opcoes: [
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.maru, aoEscolher: ganha('maru', 1), txt: T('Conheço. Canta mais um pouco.', 'I do. Sing a little more.'),
          resultado: [T('Ele canta, achando que vamos pelos recifes. Deixo que ache.', 'He sings, thinking we’re taking the reefs. I let him think it.')] },
        { id: 'fria', fala: true, tom: 'fria', aviso: AV.maru, txt: T('Pelos recifes não tem graça.', 'The reefs are no fun.'),
          resultado: [T('Ele espera que eu diga por onde. Eu não digo. Ele volta para a canção, mais baixo, e não erra uma nota.', 'He waits for me to say which way. I don’t. He goes back to the song, lower, and doesn’t miss a note.')] },
        { id: 'cruel', gesto: true, tom: 'cruel', aviso: AV.maru, aoEscolher: ganha('maru', -1), txt: T('Esperar que ele durma e tomar o leme.', 'Wait for him to sleep and take the tiller.'),
          resultado: [T('De madrugada a cabeça dele cai no peito. Tiro a mão dele do leme sem acordá-lo e viro o barco para o Canal das Garças. Quando ele acorda, estou sentada no lugar dele. Ele não pergunta nada, e o leme não volta para a mão dele.', 'Before dawn his head drops to his chest. I lift his hand off the tiller without waking him and turn the boat toward the Heron Channel. When he wakes, I am sitting in his place. He asks nothing, and the tiller doesn’t go back to his hand.')] },
      ] } },
    { id: 'a12l', se: (st) => noBarco(st, 'lio'), zona: 'mar', agua: .7, fundo: { img: IMG('a12-lio'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Lio senta perto de mim no rolo de corda. Trouxe o pano da escada do cais, dobrado, e ainda não decidiu se devolve ou se guarda.', 'Lio sits near me on the coil of rope. He has brought the cloth from the dock stairs, folded, and still hasn’t decided whether to give it back or keep it.'),
        T('— A senhora lembra o meu nome, Madrinha?', '— Do you remember my name, Godmother?'),
        G('lio', T('— Lio. — Ele sorri como quem ganhou um barco. Depois pergunta o que veio perguntar.', '— Lio. — He smiles like someone who has been given a boat. Then he asks what he came to ask.')),
        T('— Em Redom chove?', '— Does it rain in Redom?'),
      ],
      escolha: { id: 'n_lio', opcoes: [
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.lio, aoEscolher: ganha('lio', 1), txt: T('Chove. Água sem sal, caindo do céu, direto na boca de quem abre.', 'It rains. Water with no salt, falling from the sky, straight into the mouth of whoever opens it.'),
          resultado: [T('Ele abre a boca para o céu sem nuvem, para treinar. Depois me dá o pano, para eu ter onde me secar em Redom.', 'He opens his mouth to the cloudless sky, to practice. Then he gives me the cloth, so I’ll have something to dry myself with in Redom.')] },
        { id: 'fria', gesto: true, tom: 'fria', aviso: AV.lio, aoEscolher: ganha('lio', 1), txt: T('Pôr o pano de volta nos ombros dele, sem responder.', 'Put the cloth back around his shoulders, without answering.'),
          resultado: [T('Ele fica quieto com o pano nos ombros, como se eu tivesse dito uma coisa grande. Dorme assim, sentado.', 'He goes quiet with the cloth on his shoulders, as if I had said something important. He falls asleep like that, sitting up.')] },
        { id: 'divertida', fala: true, tom: 'divertida', aviso: AV.lio, aoEscolher: ganha('lio', 2), txt: T('Vou te mostrar.', 'I’ll show you.'),
          resultado: [T('Ele dorme rindo, com o pano apertado no peito, contando nos dedos quantos dias faltam para ver chuva.', 'He falls asleep laughing, the cloth clutched to his chest, counting on his fingers how many days until he sees rain.')] },
      ] } },
    { id: 'a12t', se: (st) => noBarco(st, 'teshka'), zona: 'mar', agua: .7, fundo: { img: IMG('a12-teshka'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Teshka limpa a faca na proa. Limpa quando pensa, e nesta noite pensa muito.', 'Teshka cleans her knife at the bow. She cleans it when she thinks, and tonight she thinks a lot.'),
        T('— Quanto paga, Madrinha? Até agora a senhora não disse.', '— What does it pay, Godmother? You still haven’t said.'),
      ],
      escolha: { id: 'n_teshka', opcoes: [
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.teshka, aoEscolher: ganha('teshka', 1), txt: T('O que você quiser, quando voltarmos.', 'Whatever you want, when we get back.'),
          resultado: [T('Ela guarda a faca. Faz a conta de um barco novo e gosta do número.', 'She sheathes the knife. She works out the price of a new boat and likes the number.')] },
        { id: 'fria', fala: true, tom: 'fria', aviso: AV.teshka, aoEscolher: ganha('teshka', -1), txt: T('Nada. Você não veio pelo dinheiro.', 'Nothing. You didn’t come for the money.'),
          resultado: [T('— Não vim — ela diz. — Nem pela senhora. O meu marido não voltou da última vez que alguém prometeu Alvena. Vim ver a senhora errar de perto.', '— No — she says. — Nor for you. My husband didn’t come back the last time someone promised Alvena. I came to watch you fail up close.'),
            T('Ela volta a limpar a faca, com mais cuidado.', 'She goes back to cleaning the knife, more carefully.')] },
        { id: 'divertida', fala: true, tom: 'divertida', aviso: AV.teshka, flag: 'teshkaGalera', aoEscolher: ganha('teshka', 2), txt: T('A Sentença. Se você tomar, é sua.', 'The Sentence. If you take her, she’s yours.'),
          resultado: [T('Ela para de limpar a faca. Olha para o escuro, para o lado de Redom, e ri baixo, sem graça nenhuma.', 'She stops cleaning the knife. She looks into the dark, toward Redom, and laughs low, with no humor at all.'),
            T('— Três mastros — diz, e volta a limpar, mais devagar.', '— Three masts — she says, and goes back to cleaning, slower.')] },
      ] } },
    { id: 'a12n', se: (st) => noBarco(st, 'nhale'), zona: 'mar', agua: .8, fundo: { img: IMG('a12-nhale'), dim: .45, lado: 'dir', foco: '35% 55%' },
      texto: [
        T('Nhalé passa a noite embaixo do barco. De vez em quando bate na quilha, três batidas, para dizer que está ali.', 'Nhalé spends the night under the boat. Every so often she knocks on the keel, three knocks, to say she is there.'),
        G('nhale', T('Sobe uma vez, só o rosto, com o cabelo aberto na água como tinta. Nunca viu gente da terra de perto e quer saber se eles têm cheiro.', 'She comes up once, just her face, her hair spread on the water like ink. She has never seen land people up close and wants to know if they have a smell.')),
      ],
      escolha: { id: 'n_nhale', opcoes: [
        { id: 'doce', gesto: true, tom: 'doce', aviso: AV.nhale, aoEscolher: ganha('nhale', 1), txt: T('Bater de volta na quilha, três vezes.', 'Knock back on the keel, three times.'),
          resultado: [T('Ela responde com três, e depois com mais três. Ficamos assim até o sol.', 'She answers with three, and then three more. We stay like that until the sun.')] },
        { id: 'fria', gesto: true, tom: 'fria', aviso: AV.nhale, aoEscolher: ganha('nhale', -1), txt: T('Não responder.', 'Don’t answer.'),
          resultado: [T('Ela espera um pouco e afunda sem fazer barulho. No resto da viagem, as batidas vêm mais espaçadas.', 'She waits a little and sinks without a sound. For the rest of the voyage, the knocks come further apart.')] },
        { id: 'divertida', fala: true, tom: 'divertida', aviso: AV.nhale, aoEscolher: ganha('nhale', 1), txt: T('Têm. Cheiram a pão queimado e a pressa.', 'They do. They smell of burnt bread and hurry.'),
          resultado: [T('Ela ri dentro d’água, e o riso sobe em bolhas.', 'She laughs underwater, and the laugh comes up in bubbles.')] },
      ] } },
    { id: 'a12b', se: (st) => noBarco(st, 'brann'), zona: 'mar', agua: .7, fundo: { img: IMG('a12-brann'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Brann engraxa a besta no colo e me olha de lado. Para ele eu sou uma mulher de olhos esquisitos que paga bem, e ele não finge outra coisa.', 'Brann greases the crossbow in his lap and watches me sideways. To him I am a woman with odd eyes who pays well, and he doesn’t pretend otherwise.'),
        T('— Quantos de nós voltam, Madrinha?', '— How many of us come back, Godmother?'),
      ],
      escolha: { id: 'n_brann', opcoes: [
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.brann, txt: T('Todos.', 'All of you.'),
          resultado: [T('Ele ri pelo canto da boca. — A senhora mente bonito — diz, e não se incomoda com isso.', 'He laughs out of the side of his mouth. — You lie prettily — he says, and it doesn’t bother him.')] },
        { id: 'divertida', fala: true, tom: 'divertida', aviso: AV.brann, flag: 'brannAtira', aoEscolher: ganha('brann', 1), txt: T('Quantos você quer que voltem, Brann?', 'How many do you want to come back, Brann?'),
          resultado: [T('Ele demora. — Eu — diz, por fim, e não ri.', 'He takes his time. — Me — he says at last, and doesn’t laugh.'),
            T('Depois, mais baixo: — Dinheiro eu ganho em Alvena, matando rato de porão. Vim ver uma galera de perto.', 'Then, lower: — Money I make in Alvena, killing cellar rats. I came to see a galley up close.')] },
        { id: 'cruel', gesto: true, tom: 'cruel', aviso: AV.brann, flag: 'brannGuarda', aoEscolher: ganha('brann', 1), txt: T('Tirar uma seta da aljava dele e pôr na mão dele.', 'Take a bolt from his quiver and put it in his hand.'),
          resultado: [T('— Guarda essa para quem tentar virar o barco — digo.', '— Keep this one for whoever tries to turn the boat — I say.'),
            T('Ele olha a seta, depois a mim, e guarda a seta separada das outras.', 'He looks at the bolt, then at me, and puts it away apart from the others.')] },
      ] } },

    // ===================================================== PARTE II · A SENTENÇA
    { id: 'p2', parte: T('II · A Sentença', 'II · The Sentence'), zona: 'mar', agua: .7, fundo: { img: IMG('b01-mar'), dim: .55 },
      cartao: { num: T('Parte II', 'Part II'), nome: T('A Sentença', 'The Sentence'), epigrafe: T('Redom não afunda pirata. Redom enforca.', 'Redom doesn’t sink pirates. Redom hangs them.'), fonte: T('dito da Orla', 'saying of the Shore') } },

    { id: 'b01', zona: 'mar', agua: .7, fundo: { video: VID('b01-mar'), img: IMG('b01-mar'), dim: .45, foco: '55% 50%' },
      // sem saber o dia, a espera no canal custa a todos; quem foi enganado sobre a rota descobre aqui
      aoEntrar: (st) => {
        if (!sabe(st, 'rota')) TRIP.forEach((k) => { if (noBarco(st, k)) ganha(k, -1)(st); });
        if (noBarco(st, 'maru') && st.escolhas.n_maru === 'doce') ganha('maru', -2)(st);
      },
      texto: [
        T('Dois dias de mar. A tripulação quer a rota escondida, pelos recifes, para chegar a Redom sem ser vista. Eu mando seguir pelo Canal das Garças.', 'Two days of sea. The crew wants the hidden route, through the reefs, to reach Redom unseen. I order them through the Heron Channel.'),
        (st) => (noBarco(st, 'teshka') ? T('A faca da Teshka para no meio da lâmina. Ela olha a água, depois a mim. — Por este canal passa a galera. A senhora sabe disso.', 'Teshka’s knife stops halfway down the blade. She looks at the water, then at me. — The galley comes through this channel. You know that.')
          : noBarco(st, 'maru') ? T('A canção do Maru acaba no meio de um verso, e ele não recomeça. — Madrinha. Por aqui passa a galera.', 'Maru’s song breaks off in the middle of a line, and he doesn’t start it again. — Godmother. The galley comes this way.')
            : noBarco(st, 'brann') ? T('Brann ri pelo canto da boca e começa a contar as setas da aljava. — Então é por isso que a senhora paga bem.', 'Brann laughs out of the side of his mouth and starts counting the bolts in his quiver. — So that’s why you pay so well.')
              : T('Lio não entende. Nhalé entende por ele e bate na quilha com força, de baixo.', 'Lio doesn’t understand. Nhalé understands for him and knocks hard on the keel from below.')),
        se((st) => noBarco(st, 'maru') && st.escolhas.n_maru === 'doce', T('Maru me olha com o olho branco, o que ainda enxerga um pouco. Eu disse a ele que conhecia os recifes.', 'Maru looks at me with his white eye, the one that still sees a little. I told him I knew the reefs.')),
        (st) => (sabe(st, 'rota') ? T('Em Alvena me contaram nove dias. Hoje é o nono.', 'In Alvena they told me nine days. Today is the ninth.')
          : T('Não sei o dia da galera. Esperamos três noites no canal, com o barco parado no caminho dela. Na terceira, a tripulação não dorme e não olha para mim.', 'I don’t know the galley’s day. We wait three nights in the channel, the boat sitting in her path. On the third, the crew doesn’t sleep and doesn’t look at me.')),
      ] },

    { id: 'b02', zona: 'galera', agua: .7, fundo: { video: VID('b02-sentenca'), img: IMG('b02-sentenca'), dim: .4, foco: '60% 45%' },
      aoEntrar: (st) => { st.f.motim = amotinado(st); },
      texto: [
        T('A Sentença aparece no fim da tarde. Três mastros, um costado de madeira escura e duas fileiras de besteiros no convés. Ao lado dela, o nosso barco é uma casca de noz.', 'The Sentence appears at the end of the afternoon. Three masts, a hull of dark timber, and two rows of crossbowmen on deck. Beside her, our boat is a nutshell.'),
        (st) => ({
          teshka: T('Teshka tira a mão do leme de quem estiver nele e começa a virar o barco. — Ninguém aqui vai morrer por uma promessa que a senhora não pagou.', 'Teshka pulls the tiller out of whoever’s hand is on it and starts to bring the boat about. — Nobody here is dying for a promise you never paid.'),
          maru: T('Maru vira o leme para o lado dos recifes sem dizer nada, com o olho bom fechado.', 'Maru swings the tiller toward the reefs without a word, his good eye shut.'),
          brann: T('Brann aponta a besta para mim. — Vira esse barco, Madrinha. Eu vim atirar, não vim morrer.', 'Brann aims his crossbow at me. — Turn this boat, Godmother. I came to shoot, not to die.'),
        }[st.f.motim] || T('A tripulação olha para mim, esperando a ordem de virar.', 'The crew looks at me, waiting for the order to turn.')),
        se((st) => !!st.f.motim && st.f.motim !== 'brann' && vivoBarco(st, 'brann') && !!st.f.brannGuarda, T('Brann ergue a besta com a seta que guardou separada e aponta para {MOT}. Não diz nada. Espera a minha ordem.', 'Brann raises his crossbow with the bolt he kept apart and aims it at {MOT}. He says nothing. He waits for my order.')),
      ],
      escolha: { id: 'ordem', pergunta: (st) => (st.f.motim ? T('O que eu faço?', 'What do I do?') : T('O que eu digo a eles?', 'What do I tell them?')), opcoes: [
        { id: 'mentira', fala: true, tom: 'doce', aviso: AV.trip, txt: T('Ninguém morre hoje.', 'No one dies today.'),
          resultado: (st) => (st.f.motim
            ? [leal(st, st.f.motim) >= 0 ? T('{MOT} solta o leme. Acredita, porque sou eu quem diz.', '{MOT} lets go of the tiller. Believes it, because I’m the one saying it.') : T('{MOT} não acredita. Solta assim mesmo, porque os outros acreditaram.', '{MOT} doesn’t believe it. Lets go anyway, because the others did.')]
            : [noBarco(st, 'lio') ? T('Eles acreditam, porque sou eu quem diz. Lio até sorri.', 'They believe me, because I’m the one saying it. Lio even smiles.') : T('Eles acreditam, porque sou eu quem diz.', 'They believe me, because I’m the one saying it.')]) },
        { id: 'verdade', fala: (st) => !st.f.motim, gesto: (st) => !!st.f.motim, tom: 'fria', aviso: AV.trip,
          txt: (st) => (st.f.motim ? (st.f.motim === 'brann' ? T('Andar até a besta e baixar a ponta com dois dedos.', 'Walk up to the crossbow and push the point down with two fingers.') : T('Pôr a mão em cima da mão no leme e apertar até soltar.', 'Lay my hand over the hand on the tiller and squeeze until it lets go.')) : T('Eu preciso que me vejam. Vocês, não.', 'I need them to see me. Not you.')),
          resultado: (st) => (st.f.motim
            ? [st.f.motim === 'brann' ? T('A ponta desce. Brann não atira. Olha os meus dedos na besta dele e não mexe os dele.', 'The point goes down. Brann doesn’t shoot. He looks at my fingers on his crossbow and doesn’t move his own.') : T('Aperto até a mão soltar. Viro o barco de volta para a galera. O leme fica comigo.', 'I squeeze until the hand lets go. I bring the boat back toward the galley. The tiller stays with me.')]
            : [T('Eles não entendem e obedecem assim mesmo.', 'They don’t understand, and they obey anyway.')]) },
        { id: 'olhar', se: (st) => !st.f.motim, gesto: true, tom: 'cruel', aviso: AV.trip, txt: T('Olhar para cada um até que abaixem os olhos.', 'Look at each one until they lower their eyes.'),
          resultado: [T('Um por um, eles abaixam os olhos. O último abaixa porque os outros abaixaram.', 'One by one, they lower their eyes. The last one lowers his because the others did.')] },
        { id: 'matar', se: (st) => !!st.f.motim, gesto: true, tom: 'cruel', corpos: 1, aviso: AV.trip, aoEscolher: (st) => { st.f.motimMorto = st.f.motim; }, txt: T('Tirar a lâmina da manga.', 'Draw the blade from my sleeve.'),
          resultado: [T('A lâmina sai da manga e volta. {MOT} senta no fundo do barco com as duas mãos no pescoço, e eu pego o leme. Os outros não dizem mais nada até o fim.', 'The blade leaves my sleeve and comes back. {MOT} sits down in the bottom of the boat with both hands at the throat, and I take the tiller. The others don’t say another word until the end.')] },
        { id: 'galera', se: (st) => !!st.f.motim, fala: (st) => st.f.motim !== 'maru', gesto: (st) => st.f.motim === 'maru', tom: 'divertida', aviso: AV.trip,
          aoEscolher: (st) => { if (st.f.motim === 'teshka') st.f.teshkaGalera = true; if (st.f.motim === 'brann') st.f.brannAtira = true; if (st.f.motim === 'maru') st.f.maruCanta = true; },
          txt: (st) => ({ teshka: T('Teshka, a galera é sua se você tomar.', 'Teshka, the galley is yours if you take her.'), brann: T('Quarenta besteiros, Brann. Nenhum melhor que você.', 'Forty crossbowmen, Brann. Not one better than you.'), maru: T('Pedir ao Maru que cante a canção até o fim, desta vez.', 'Ask Maru to sing the song all the way to the end, this time.') }[st.f.motim]),
          resultado: (st) => ({
            teshka: [T('Teshka ri, sem graça nenhuma, e vira o leme de volta. — Três mastros — diz, e tira o gancho de abordagem do fundo do barco.', 'Teshka laughs, with no humor at all, and brings the tiller back. — Three masts — she says, and pulls the boarding hook from the bottom of the boat.')],
            brann: [T('Brann olha a galera por cima da besta. Baixa a arma e escolhe uma seta. — Quarenta — diz, e conta outra vez, para ter certeza.', 'Brann looks at the galley over his crossbow. He lowers it and picks a bolt. — Forty — he says, and counts again, to be sure.')],
            maru: [T('Ele entende. Abre o olho bom, vira o leme de volta para a galera e canta a canção até o fim, pela primeira vez, sem recomeçar.', 'He understands. He opens his good eye, brings the tiller back toward the galley, and sings the song to the end, for the first time, without starting over.')],
          }[st.f.motim]) },
      ] } },

    { id: 'b03', zona: 'galera', agua: .9, fundo: { img: IMG('s03-costado'), dim: .4, foco: '50% 40%' },
      texto: [
        T('A galera vira o costado para nós. Os besteiros erguem as armas. Eu fico de pé na proa, onde a Sentença me vê.', 'The galley turns her broadside to us. The crossbowmen raise their weapons. I stand at the bow, where the Sentence can see me.'),
        V('D21', T('Preciso que ela me veja. Viva.', 'I need her to see me. Alive.')),
        se((st) => maruLado(st), T('Maru põe o barco de lado para a galera sem que eu peça. Assim a água pega a Sentença pelo costado.', 'Maru brings the boat broadside to the galley without my asking. That way the water takes the Sentence on her side.')),
        se((st) => brannAtira(st), T('Brann atira antes de todo mundo. O homem que dava as ordens aos besteiros cai para trás, e a primeira fileira atrasa.', 'Brann shoots before anyone. The man giving orders to the crossbowmen falls backward, and the first row falters.')),
        se((st) => teshkaAborda(st), T('Teshka gira o gancho por cima da cabeça e solta. Prende na amurada deles. Ela sobe pela corda com a faca nos dentes.', 'Teshka whirls the hook over her head and lets it fly. It catches on their rail. She climbs the rope with the knife in her teeth.')),
        T('O mar fica parado. Prende a respiração junto comigo.', 'The sea goes still. It holds its breath with me.'),
      ],
      minijogo: 'mao', jogoId: 'mao', mgDica: T('Um toque. Você escolhe quando.', 'One tap. You choose when.'),
      aoTerminar: (st) => { st.f.naufragio = true; st.f.estrago = (maruLado(st) ? 1 : 0) + (brannAtira(st) ? 1 : 0) + (teshkaAborda(st) ? 1 : 0); },
      depois: (st) => [
        ...(J(st, 'mao').quando === 'cedo' ? [
          T('O mar recua de baixo dos dois barcos, como um lençol puxado. Depois volta em pé.', 'The sea draws back from under both ships, like a sheet pulled away. Then it comes back standing.'),
          V('D08', T('A água sobe pelo costado da Sentença e passa por cima de nós primeiro. É a minha água que leva a tripulação.', 'The water climbs the Sentence’s side and goes over us first. It is my water that takes the crew.')),
        ] : [
          T('A salva desce sobre o nosso convés. Eu espero a segunda. Só então abro a mão.', 'The volley comes down on our deck. I wait for the second. Only then do I open my hand.'),
          V('D09', T('O mar volta em pé, por cima de tudo. Os meus já estavam no chão quando a água chegou.', 'The sea comes back standing, over everything. My people were already down when the water arrived.')),
        ]),
        se(() => maruLado(st), T('A onda bate no costado da Sentença. O mastro do meio quebra como espinha de peixe e cai em cima dos besteiros.', 'The wave strikes the Sentence’s side. The middle mast snaps like a fishbone and comes down on the crossbowmen.')),
        se(() => teshkaAborda(st), T('Teshka está no convés deles quando a onda chega. Vejo a faca dela subir duas vezes antes de a água levar tudo.', 'Teshka is on their deck when the wave arrives. I see her knife rise twice before the water takes everything.')),
        T('A Sentença não afunda. Fica adernada, com o costado quebrado. Essa eu deixo boiar.', 'The Sentence doesn’t sink. She lists, her side broken. That one I let float.'),
      ] },

    { id: 'b04', zona: 'mar', agua: 1, veste: 'ela', fundo: { img: IMG('b04-destrocos'), dim: .5, foco: '55% 50%' },
      aoEntrar: (st) => { st.f.ultimo = ultimoDe(st); },
      texto: (st) => {
        const t = [], e = st.escolhas, cedo = J(st, 'mao').quando === 'cedo', u = st.f.ultimo;
        const conta = (k) => vivoBarco(st, k) && k !== u;
        if (st.f.motimMorto) t.push(T('{MOT} já estava no fundo do barco quando a água chegou. Esse fui eu.', '{MOT} was already in the bottom of the boat when the water came. That one was me.'));
        if (conta('maru')) t.push(st.f.maruCanta ? T('Maru afunda com a mão no leme. A canção acaba antes dele.', 'Maru goes down with his hand on the tiller. The song ends before he does.')
          : e.n_maru === 'cruel' ? T('Maru afunda olhando para o leme que eu tirei dele.', 'Maru goes down looking at the tiller I took from him.')
            : T('Maru afunda com a mão no leme e o olho bom aberto, olhando para mim.', 'Maru goes down with his hand on the tiller and his good eye open, looking at me.'));
        if (conta('lio')) t.push(e.ordem === 'mentira' ? T('Lio boia de costas, de boca aberta, igual na escada do cais. Eu disse a ele que hoje não. Ele acreditou até o fim.', 'Lio floats on his back, mouth open, just as on the dock stairs. I told him not today. He believed it to the end.') : T('Lio boia de costas, de boca aberta, igual na escada do cais.', 'Lio floats on his back, mouth open, just as on the dock stairs.'));
        if (vivoBarco(st, 'teshka') && teshkaAborda(st)) t.push(T('Teshka morre no convés da Sentença, com a faca na mão e dois soldados embaixo dela.', 'Teshka dies on the Sentence’s deck, knife in hand and two soldiers beneath her.'));
        else if (conta('teshka')) t.push(e.n_teshka === 'fria' ? T('Teshka morre de olhos abertos, olhando para mim. Veio me ver errar de perto.', 'Teshka dies with her eyes open, looking at me. She came to watch me fail up close.') : T('Teshka morre sem saber quanto pagava.', 'Teshka dies without knowing what it paid.'));
        if (conta('brann')) t.push(brannAtira(st) ? T('Brann não para de atirar. Acerta mais um no pescoço antes de cair, e cai rindo.', 'Brann doesn’t stop shooting. He puts one more in the throat before he falls, and falls laughing.') : cedo ? T('Brann ainda tem a besta erguida quando a água chega, com a seta no lugar.', 'Brann still has his crossbow raised when the water comes, the bolt still in place.') : T('Brann ainda acerta um soldado antes de cair.', 'Brann still hits a soldier before he falls.'));
        if (noBarco(st, 'nhale')) t.push(nhaleAjuda(st) ? T('Embaixo de mim, uma sombra de escama sobe do fundo e espera.', 'Beneath me, a scaled shadow rises from the deep and waits.') : T('Nhalé bate na quilha por baixo, três vezes, e depois uma, e depois para.', 'Nhalé knocks on the keel from below, three times, then once, then stops.'));
        return t;
      },
      escolha: { id: 'rosto', se: (st) => !!st.f.ultimo, pergunta: T('{ULT} estende a mão para mim, na água.', '{ULT} reaches for me, in the water.'), opcoes: [
        { id: 'pegar', gesto: true, tom: 'doce', txt: T('Pegar a mão.', 'Take the hand.'), resultado: [T('Pego. A mão aperta a minha e vai afrouxando, e eu seguro até não ter mais o que segurar.', 'I take it. The hand squeezes mine and slowly loosens, and I hold on until there is nothing left to hold.')] },
        { id: 'ver', gesto: true, tom: 'fria', txt: T('Ver afundar.', 'Watch it go under.'), resultado: [T('Vejo. A água fecha em cima, e fecha bem.', 'I watch. The water closes over, and closes well.')] },
        { id: 'decorar', gesto: true, tom: 'cruel', txt: T('Decorar o rosto.', 'Learn the face by heart.'), resultado: [T('Decoro. Os cílios, os dentes, a última palavra, que não chega a sair. Guardo junto com os outros.', 'I learn it by heart. The lashes, the teeth, the last word, which never makes it out. I keep it with the others.')] },
        { id: 'nhale', se: (st) => nhaleAjuda(st), gesto: true, tom: 'doce', aviso: (st) => AV[st.f.ultimo], txt: T('Empurrar a mão para baixo, para a Nhalé.', 'Push the hand down, to Nhalé.'),
          resultado: [T('Empurro a mão para baixo, e outra mão, de escama, pega a de {ULT}. As duas somem no escuro, para o fundo, onde seta nenhuma chega.', 'I push the hand down, and another hand, a scaled one, takes {ULT}’s. Both vanish into the dark, down to the deep, where no bolt can reach.'),
            T('Nhalé vai levar {ULT} de volta para a Orla, com a história.', 'Nhalé will carry {ULT} back to the Shore, with the story.')] },
      ] } },

    { id: 'b04b', zona: 'mar', agua: 1, fundo: { img: IMG('b04-destrocos'), dim: .62 },
      afoga: { filtro: (a, st) => { const s = salvo(st); return [AV.maru, AV.lio, AV.teshka, AV.nhale, AV.brann, AV.trip].includes(a) && !(s && (a === AV[s] || a === AV.nhale)); }, ultimo: AV.ninguem, ms: 900 },
      texto: (st) => [sabe(st, 'perto')
        ? T('Uma seta perdida entra no meu ombro. Deixo o corpo boiar de bruços, como os afogados que a Sentença pesca para vender no molhe. Com morto, Redom não gasta a segunda seta.', 'A stray bolt goes into my shoulder. I let my body float face down, like the drowned the Sentence fishes up to sell on the mole. Redom doesn’t waste a second bolt on the dead.')
        : T('Uma seta entra no meu ombro, e outra passa raspando a orelha. Boio de bruços entre eles e paro de mexer, porque os que mexem levam a segunda.', 'A bolt goes into my shoulder, and another grazes my ear. I float face down among them and stop moving, because the ones who move take the second.')] },

    { id: 'b05', zona: 'conves', agua: .4, fundo: { img: IMG('s05-conves'), dim: .45, foco: '50% 35%' },
      texto: [
        T('Um gancho me puxa para o convés da Sentença. Deixo o corpo mole, a boca entreaberta, um olho meio fechado.', 'A hook drags me onto the Sentence’s deck. I let my body go slack, mouth half open, one eye half shut.'),
        V('D10', T('Estou morta. Os mortos têm toda a paciência do mundo.', 'I am dead. The dead have all the patience in the world.')),
        (st) => (st.f.miraOuvido ? T('A Mira, da janela da Ondina, tinha razão: na frente de morto, soldado conta tudo.', 'Mira, at Ondina’s window, was right: in front of the dead, a soldier tells everything.') : T('Na frente de morto, soldado não baixa a voz.', 'In front of the dead, a soldier doesn’t lower his voice.')),
      ],
      minijogo: 'morta', jogoId: 'morta',
      depois: (st) => {
        const m = J(st, 'morta');
        return m.toques >= 2 ? [T('A dor fica no ombro, quente. Guardo a dor também.', 'The pain stays in my shoulder, hot. I keep the pain too.')]
          : m.toques === 1 ? [T('Um dedo só. Depois disso, nada.', 'One finger. After that, nothing.')]
            : [T('Não me mexo uma vez. Cada coisa que eles dizem cai em mim como moeda num poço.', 'I don’t move once. Everything they say falls into me like coins into a well.')];
      } },

    // ela se finge de morta para ouvir; para ser levada à Lâmina, precisa ser achada viva, e escolhe o jeito
    { id: 'b05b', zona: 'conves', agua: .4, fundo: { img: IMG('b05b-olhos'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: (st) => (J(st, 'morta').toques >= 2 ? [
        T('Já sabem que estou viva. A ponta da lança contou a eles.', 'They already know I’m alive. The spear point told them.'),
        G('sargento', T('O sargento olha a seta, depois os meus olhos. — Seta inteira no ombro, e mexendo. Conjuradora. Algema de pedra. A Lâmina julga essas pessoalmente.', 'The sergeant looks at the bolt, then at my eyes. — Whole bolt in the shoulder, and moving. A conjurer. Stone shackles. The Blade judges these herself.')),
      ] : [
        T('Os soldados separam os corpos. Os da Orla vão num monte, para a balança de Alvena. Se eu continuar morta, vou com eles.', 'The soldiers sort the bodies. The Shore’s go in a heap, for the scales at Alvena. If I stay dead, I go with them.'),
        sabe(st, 'vivos') ? T('Quem conjura vai vivo para a Lâmina. Então mostro.', 'Whoever conjures goes to the Blade alive. So I show them.') : T('Não sei o que Redom faz com quem conjura. Vou descobrir agora.', 'I don’t know what Redom does with conjurers. I am about to find out.'),
      ]),
      escolha: { id: 'olhos', se: (st) => J(st, 'morta').toques < 2, pergunta: T('Como eu volto a viver?', 'How do I come back to life?'), opcoes: [
        { id: 'devagar', gesto: true, tom: 'fria', txt: T('Abrir os olhos para o sargento, e só para ele.', 'Open my eyes for the sergeant, and only for him.'),
          resultado: [T('O primeiro que eu vejo é o sargento. Ele para no meio de uma ordem.', 'The first one I see is the sergeant. He stops in the middle of an order.'),
            G('sargento', T('— Essa está viva. Seta inteira no ombro, e viva. — Ele não grita. — Conjuradora. Algema de pedra. A Lâmina julga essas pessoalmente.', '— This one’s alive. Whole bolt in the shoulder, and alive. — He doesn’t shout. — A conjurer. Stone shackles. The Blade judges these herself.'))] },
        { id: 'sorrir', gesto: true, tom: 'divertida', txt: T('Sorrir para o soldado que me carrega.', 'Smile at the soldier carrying me.'),
          resultado: [T('O soldado que me arrasta pelos pés vê o sorriso antes de entender. Larga as minhas pernas no convés e dá dois passos para trás. — Sargento. Essa aqui está viva.', 'The soldier dragging me by the feet sees the smile before he understands. He drops my legs on the deck and takes two steps back. — Sergeant. This one’s alive.'),
            G('sargento', T('O sargento olha a seta, depois os meus olhos. — Conjuradora. Algema de pedra. A Lâmina julga essas pessoalmente.', 'The sergeant looks at the bolt, then at my eyes. — A conjurer. Stone shackles. The Blade judges these herself.'))] },
        { id: 'nome', fala: true, tom: 'doce', txt: T('Laura.', 'Laura.'),
          resultado: [T('Digo baixinho, como quem chama alguém do outro quarto. O convés para.', 'I say it softly, the way you call someone in the next room. The deck goes still.'),
            T('O sargento se agacha perto do meu rosto. — De onde uma afogada da Orla tira o nome da General?', 'The sergeant crouches by my face. — Where does a drowned girl from the Shore get the General’s name?'),
            G('sargento', T('Eu não respondo. Ele se levanta. — Conjuradora. Algema de pedra. Ela vai querer ver essa.', 'I don’t answer. He stands. — A conjurer. Stone shackles. She’ll want to see this one.'))] },
      ] } },

    { id: 'b06', zona: 'conves', agua: 0, pedra: true, sons: [{ sfx: 'algema', p: 0, v: .7 }], fundo: { img: IMG('b06-algema'), dim: .45, foco: '55% 50%' },
      texto: [
        T('Fecham nos meus pulsos duas argolas de ferro com uma pedra cinzenta cravada em cada uma. Os soldados chamam de pedra surda.', 'They close two iron rings around my wrists, each with a grey stone set in it. The soldiers call it deafstone.'),
        V('D11', T('A pedra bebe. Sinto a boca dela nos pulsos, e cada rosto que eu sei vestir escorre para dentro do ferro.', 'The stone drinks. I feel its mouth on my wrists, and every face I know how to wear runs down into the iron.')),
        { t: T('A frase, não. A frase continua aqui.', 'The sentence doesn’t. The sentence stays.'), frase: 'fica' },
      ] },

    { id: 'b07', zona: 'estrada', agua: 0, sal: .15, pedra: true, fundo: { video: VID('b07-carroca'), img: IMG('b07-carroca'), dim: .45, clima: 'poeira', foco: '55% 45%' },
      texto: [
        T('Uma carroça com grade me leva de Alvena para a Capital Branca. Dias de estrada.', 'A cart with bars takes me from Alvena to the White Capital. Days of road.'),
        T('Nas aldeias, a gente de Redom vem ver a prisioneira da Sentença. Jogam coisas, cospem, mandam as crianças olharem. Eu olho de volta e coleciono.', 'In the villages, Redom’s people come to see the Sentence’s prisoner. They throw things, spit, send their children to look. I look back, and collect.'),
        V('D12', T('No terceiro dia o sol de Redom encontra a minha pele, e ela repuxa no pulso, embaixo do ferro. É a primeira vez. Guardo isso também.', 'On the third day Redom’s sun finds my skin, and it pulls tight at the wrist, under the iron. It is the first time. I keep that too.')),
      ] },


    // ===================================================== PARTE III · A ALA FUNDA
    { id: 'p3', parte: T('III · A Ala Funda', 'III · The Deep Ward'), zona: 'ala', agua: 0, sal: .2, pedra: true, fundo: { img: IMG('c01-escada'), dim: .6 },
      cartao: { num: T('Parte III', 'Part III'), nome: T('A Ala Funda', 'The Deep Ward'), epigrafe: T('Na cela do fundo, nome nenhum se escreve.', 'In the bottom cell, no name is written.'), fonte: T('ordem da Cidadela', 'order of the Citadel') } },

    { id: 'c01', zona: 'ala', agua: 0, sal: .2, pedra: true, fundo: { img: IMG('c01-escada'), dim: .45, foco: '55% 50%' },
      texto: [
        T('A Ala Funda fica embaixo da Cidadela e não aparece em livro nenhum. Gasta pão, vela e carcereiro. A cela do fundo é toda de pedra surda: chão, teto e paredes.', 'The Deep Ward lies under the Citadel and appears in no book. It costs bread, candles and jailers. The bottom cell is all deafstone: floor, ceiling and walls.'),
        T('Só quatro carcereiros descem a escada, os mesmos há anos. A guarda lá em cima conhece cada um pelo rosto e não deixa passar outro.', 'Only four jailers come down the stairs, the same four for years. The guard up top knows each one by his face and lets no other through.'),
        V('D13', T('Uma guarda que só deixa passar rosto conhecido. Eu, que só tenho rosto emprestado, acho graça.', 'A guard that lets through only known faces. I, who have only borrowed faces, find that funny.')),
        T('Aprendo os quatro pelo som dos passos e pelo nome que um grita para o outro na escada.', 'I learn the four by the sound of their steps, and by the names they shout to each other on the stairs.'),
        G('wim', T('Wim cantarola sempre a mesma canção, para o turno passar mais depressa, e esquece sempre a mesma palavra, no mesmo lugar.', 'Wim always hums the same song, to make the shift go faster, and always forgets the same word, in the same place.')),
        G('garrick', T('Garrick desce sem nunca olhar para dentro da cela. Os outros dizem o nome dele. Ele, nunca.', 'Garrick comes down without ever looking into the cell. The others say his name. He never does.')),
        G('pell', T('Pell reza para a Juíza na volta, alto e sério, e tropeça sempre no mesmo verso.', 'Pell prays to the Judge on the way back, loud and solemn, and always trips on the same line.')),
        G('dunstan', T('Dunstan conta as moedas do bolso, degrau por degrau, e nunca chega na conta que quer.', 'Dunstan counts the coins in his pocket, step by step, and never reaches the sum he wants.')),
        V('D22', T('A Laura vai descer. Antes dela, quero saber dela. Até lá, dá tempo de trabalhar dois.', 'Laura will come down. Before she does, I want to know her. Until then, there is time to work two of them.')),
      ],
      escolha: { id: 'carcereiro', pergunta: T('Qual eu trabalho primeiro?', 'Which one do I work first?'), opcoes: ALA_OPCOES() } },

    { id: 'c01b', zona: 'ala', agua: 0, sal: .22, pedra: true, fundo: { img: IMG('c01-escada'), dim: .55, foco: '55% 50%' },
      texto: [T('Mais quatro pães. A escada continua descendo nas mesmas horas, com os mesmos passos.', 'Four more loaves. The stairs keep coming down at the same hours, with the same steps.')],
      escolha: { id: 'carcereiro2', pergunta: T('E o segundo?', 'And the second?'), opcoes: ALA_OPCOES((st, id) => st.escolhas.carcereiro !== id) } },

    { id: 'c02', zona: 'ala', agua: 0, sal: .25, pedra: true, dor: true, fundo: { img: IMG('c02-cela'), dim: .45, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('De tempos em tempos, sem hora certa, um deles desce e bate nas grades com uma vara. Às vezes em mim. É para a cabeça nunca achar o silêncio de que precisa para conjurar.', 'Every now and then, at no set hour, one of them comes down and beats the bars with a rod. Sometimes me. It is so my head never finds the silence it needs to conjure.'),
        V('D14', T('Redom se protege de mim com método. Gosto de método.', 'Redom guards itself against me with method. I like method.')),
        T('Sem rosto emprestado, as orelhas são minhas outra vez, e mentem mal. Quando a vara bate na grade, elas colam no crânio antes de mim.', 'Without a borrowed face, my ears are mine again, and they lie badly. When the rod hits the bars, they press flat to my skull before I do.'),
        T('Conto os dias pelo pão. Sete pães.', 'I count the days by the bread. Seven loaves.'),
      ] },

    { id: 'c03', zona: 'ala', agua: 0, sal: .25, pedra: true, sons: [{ sfx: 'porta-cela', p: 0, v: .7 }], fundo: { img: IMG('c03-laura'), dim: .42, foco: '60% 40%' },
      texto: [
        T('No oitavo pão a porta abre sem bater, porque a porta é dela.', 'On the eighth loaf the door opens without a knock, because the door is hers.'),
        { moeda: true, t: T('Ela tem o rosto da moeda que o menino me deu, com o queixo mais baixo, e os olhos são verdes, coisa que a prata não conta. O cabelo é cor de trigo, solto, de quem não teve tempo de prender. Tem calos nas mãos e olheiras de quem não dorme. Nenhuma coroa. Uma faixa escura amarrada no braço.', 'She has the face from the coin the boy gave me, with the chin lower, and her eyes are green, which silver doesn’t tell. Her hair is the color of wheat, loose, like someone who had no time to tie it. She has calluses on her hands and the shadows of someone who doesn’t sleep. No crown. A dark band tied around her arm.') },
        (st) => (consorte(st) === 'markus' ? T('Atrás dela, na porta, um homem alto com a mão no punho da espada. Ela não olha para ele, e ele não olha para outra coisa que não seja ela.', 'Behind her, in the doorway, a tall man with his hand on his sword hilt. She doesn’t look at him, and he looks at nothing but her.')
          : consorte(st) === 'justine' ? T('Atrás dela, uma mulher de pena entre os dentes e um livro aberto no braço. Escreve antes de a Laura falar.', 'Behind her, a woman with a quill between her teeth and a book open on her arm. She writes before Laura speaks.')
            : T('Atrás dela, um oficial velho com uma pena e um livro aberto no braço.', 'Behind her, an old officer with a quill and a book open on his arm.')),
        V('D15', T('Ela conta. A boca não se mexe, mas os olhos param em mim de quando em quando, e eu ainda não descobri o que ela está contando.', 'She counts. Her lips don’t move, but her eyes stop on me every so many things, and I haven’t worked out yet what she is counting.')),
        T('A vara desce nas grades no meio da primeira pergunta.', 'The rod comes down on the bars in the middle of the first question.'),
        V(null, T('— Parem com isso. Quero ela pensando.', '— Stop that. I want her thinking.')),
      ] },

    // antes da primeira pergunta: o que ela juntou da Laura. Cada linha só aparece se o jogador ouviu de quem sabia
    // antes da primeira pergunta: o que ela vê na Laura puxa o que ela ouviu. Cada linha só aparece se o jogador ouviu de quem sabia
    { id: 'c03b', zona: 'ala', agua: 0, sal: .25, pedra: true, fundo: { img: IMG('c-laura'), dim: .6, foco: '62% 40%' },
      texto: [
        T('Ela puxa um banco e senta na minha frente, perto o bastante para eu sentir o cheiro de óleo de lâmina nas mãos dela.', 'She pulls up a stool and sits in front of me, close enough for me to smell the blade oil on her hands.'),
        se((st) => fezCarcereiro(st, 'wim'), T('Não traz papel nenhum. O Wim avisou: ela pergunta o que já sabe, para ver se a gente mente.', 'She brings no paper. Wim warned me: she asks what she already knows, to see if you lie.')),
        se((st) => tem(st, 'hobb'), T('Os pulsos são finos demais para mãos com tantos calos. Desde que o irmão morreu, ela manda o prato de volta cheio.', 'Her wrists are too thin for hands with so many calluses. Since her brother died, she sends her plate back full.')),
        se((st) => fezCarcereiro(st, 'garrick'), T('A faixa escura no braço é pelo irmão, o comandante Simon. Na frente dela, o nome dele não se diz.', 'The dark band on her arm is for her brother, Commander Simon. In front of her, his name is not said.')),
        se((st) => tem(st, 'grisalho') || fezCarcereiro(st, 'pell'), T('Senta na ponta do banco, pronta para levantar e partir. Os soldados dela rezam para ela não levar todo mundo para a Boca Seca.', 'She sits on the edge of the stool, ready to get up and leave. Her soldiers pray she won’t take them all to the Dry Mouth.')),
        se((st) => fezCarcereiro(st, 'dunstan'), T('O olhar dela desce para as moedas da minha saia e sobe. O Dunstan contou na escada: a costa custa a Redom uma galera por aldeia.', 'Her eyes drop to the coins on my skirt and come back up. Dunstan counted it out on the stairs: the coast costs Redom a galley for every village.')),
        V('D23', T('Ela quer o deserto e não pode ir, porque a costa prende as galeras dela. Se a Orla ajoelhar, a costa solta. Quero que ela mesma me mande de volta para fazer a Orla ajoelhar.', 'She wants the desert and can’t go, because the coast ties down her galleys. If the Shore kneels, the coast lets go. I want her to send me back to do it herself.')),
        T('Volte e ponha a Orla de joelhos. Quero ouvir isso da boca dela.', 'Go back and bring the Shore to its knees. I want to hear it from her mouth.'),
      ] },

    { id: 'c04', zona: 'ala', agua: 0, sal: .25, pedra: true, fundo: { img: IMG('c-laura'), dim: .45, foco: '62% 40%' },
      texto: [
        T('Ela tem a porta, a tocha e quem está atrás dela. Eu tenho a boca.', 'She has the door, the torch, and whoever stands behind her. I have my mouth.'),
      ],
      minijogo: 'interrogatorio', jogoId: 'interrogatorio', mgNome: T('Responder à Lâmina', 'Answer the Blade'),
      aoTerminar: (st, r) => { (r.flags || []).forEach((f) => { st.f[f] = true; }); },
      depois: (st) => [
        T('Ela fala para quem está atrás dela, e não para mim.', 'She speaks to the person behind her, not to me.'),
        V(null, T('— Tomar a Orla pela força custa décadas, porque lá só se chega de barco. Uma mulher que traga as facções vale mais que uma forca.', '— Taking the Shore by force costs decades, because you only get there by boat. A woman who brings the factions in is worth more than a gallows.')),
        { palavra: T('— Dois cavaleiros levam você até a costa. Daqui a três luas, eu quero as facções no meu porto, de joelhos ou em barcos.', '— Two knights will take you to the coast. Three moons from now, I want the factions in my harbor, on their knees or in boats.'),
          sombra: T('— Você vai até a costa. Um homem meu vai junto, e não volta sem você ou sem a sua cabeça.', '— You go to the coast. One of my men goes with you, and he doesn’t come back without you or without your head.'),
          argola: T('— Uma argola fica no seu pulso até a Orla assinar.', '— One shackle stays on your wrist until the Shore signs.') }[termos(st)],
      ] },

    { id: 'c05', zona: 'ala', agua: 0, sal: .25, pedra: true, fundo: { img: IMG('c03-laura'), dim: .55, foco: '60% 40%' },
      aoEntrar: (st, ctx) => { st.avisos.push(AV.laura); ctx.toast(AV.laura); },
      texto: [
        T('Na porta, ela para e se vira. Abaixa a tocha devagar, até a cela quase apagar.', 'At the door, she stops and turns. She lowers the torch slowly, until the cell is nearly dark.'),
        V(null, T('— Já vi muitos de vocês. Nenhum tinha olho que acende quando a tocha baixa.', '— I’ve seen plenty of your kind. None had eyes that light up when the torch goes down.')),
        T('Ela não espera resposta. A porta fecha sem bater.', 'She doesn’t wait for an answer. The door shuts without a sound.'),
        T('Agora sei o que ela contava desde a porta: as minhas orelhas.', 'Now I know what she was counting from the door: my ears.'),
        G('laura', T('Guardo o rosto dela com os outros. É o único em que eu não sei o que a pessoa quer.', 'I keep her face with the others. It is the only one where I don’t know what the person wants.')),
      ] },

    // ===================================================== PARTE IV · OS PEQUENOS
    { id: 'p4', parte: T('IV · Os Pequenos', 'IV · The Small Folk'), zona: 'capital', agua: .25, sal: .3, pedra: false, fundo: { img: IMG('d03-capital'), dim: .55 },
      cartao: { num: T('Parte IV', 'Part IV'), nome: T('Os Pequenos', 'The Small Folk'), epigrafe: T('Os pequenos dizem a verdade sobre os grandes.', 'The small tell the truth about the great.'), fonte: T('dito de Nove Mastros', 'saying of Nine Masts') } },

    // sumir: o custo depende dos termos
    { id: 'd01p', se: (st) => termos(st) === 'palavra', zona: 'estrada', agua: .3, sal: .3, pedra: false, veste: 'ela', fundo: { img: IMG('d01-estalagem'), dim: .5, foco: '55% 45%' },
      texto: [
        T('Dois cavaleiros me levam pela estrada da costa. Na beira da estrada, tiram as argolas, porque a Lâmina mandou, e a pele dos pulsos volta a respirar.', 'Two knights take me down the coast road. At the roadside they take off the shackles, because the Blade ordered it, and the skin of my wrists breathes again.'),
        (st) => (tem(st, 'mira') ? T('Na primeira estalagem eles dormem com o rosto virado para a porta, como a Mira, da casa da Ondina, disse que os de Redom dormem.', 'At the first inn they sleep with their faces to the door, just as Mira, from Ondina’s house, said Redom’s men sleep.') : T('Na primeira estalagem eles dormem com o rosto virado para a porta.', 'At the first inn they sleep with their faces to the door.')),
        G('criada', T('Quem não dorme é a criada, Greta, que limpa a cozinha cantando baixo. Tem a minha altura e as mãos vermelhas de sabão.', 'The one who doesn’t sleep is the maid, Greta, scrubbing the kitchen and singing under her breath. She is my height, with hands red from soap.')),
      ],
      escolha: { id: 'trajeCriada', pergunta: T('A roupa da Greta', 'Greta’s clothes'), opcoes: [
        { id: 'roubar', gesto: true, preco: 'roubar', tom: 'divertida', alarme: 1, txt: T('Pegar o vestido de reserva no quartinho dela.', 'Take the spare dress from her little room.'), resultado: [{ t: T('O vestido serve mal. Serve. Volto para a Capital antes do sol, e os cavaleiros acordam com a cama vazia.', 'The dress fits badly. It fits. I am back in the Capital before sunrise, and the knights wake to an empty bed.'), veste: 'criada' }] },
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'doce', testemunha: 1, txt: T('Ajudar na cozinha até ela me oferecer a roupa.', 'Help in the kitchen until she offers me the clothes.'), resultado: [{ t: T('Ela me dá o vestido e um pedaço de pão para a estrada. Vai contar dessa moça bonita a quem perguntar. Volto para a Capital antes do sol.', 'She gives me the dress and a piece of bread for the road. She’ll tell anyone who asks about the pretty girl. I am back in the Capital before sunrise.'), veste: 'criada' }] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'cruel', corpos: 1, alarme: 2, txt: T('Esperar que ela vá buscar água no poço.', 'Wait for her to go and draw water at the well.'), resultado: [{ t: T('O poço é fundo. Ela cai sem gritar. Volto para a Capital com o rosto e a roupa dela antes do sol.', 'The well is deep. She falls without a scream. I am back in the Capital with her face and her clothes before sunrise.'), veste: 'criada' }] },
      ] } },

    { id: 'd01s', se: (st) => termos(st) === 'sombra', zona: 'capital', agua: .3, sal: .3, pedra: false, veste: 'ela', fundo: { img: IMG('d01-sombra'), dim: .5, foco: '60% 45%' },
      texto: [
        T('Tiram as argolas na porta da Cidadela. O homem da Laura me segue desde ali. Anda bem: nunca perto, nunca longe.', 'They take off the shackles at the Citadel gate. Laura’s man follows me from there. He walks well: never close, never far.'),
        G('capa', T('No mercado, uma moça da minha altura experimenta uma capa velha e não tem dinheiro para ela.', 'At the market, a girl my height tries on an old cloak and doesn’t have the money for it.')),
      ],
      escolha: { id: 'sombra', pergunta: T('A sombra', 'The shadow'), opcoes: [
        { id: 'trocar', gesto: true, tom: 'divertida', testemunha: 1, txt: T('Trocar de roupa com a moça e deixar a minha capa roxa com ela.', 'Swap clothes with the girl and leave her my purple cloak.'),
          resultado: [{ t: T('Ela sai do mercado de capa roxa, feliz da vida, para o lado do porto. A sombra segue a capa. Eu saio pelo outro lado, com o rosto dela.', 'She leaves the market in my purple cloak, delighted, toward the harbor. The shadow follows the cloak. I leave the other way, in her face.'), veste: 'capa' }] },
        { id: 'matar', gesto: true, tom: 'cruel', corpos: 1, alarme: 2, txt: T('Levar a sombra para um beco.', 'Lead the shadow into an alley.'),
          resultado: [{ t: T('Ele entra no beco atrás de mim, porque é o trabalho dele. Não sai. Saio eu, com o rosto da moça da capa.', 'He follows me into the alley, because that is his job. He doesn’t come out. I do, in the face of the girl with the cloak.'), veste: 'capa' }] },
      ] } },

    { id: 'd01a', se: (st) => termos(st) === 'argola', zona: 'capital', agua: 0, sal: .3, pedra: true, veste: 'ela', fundo: { img: IMG('d01-argola'), dim: .45, foco: '55% 50%' },
      texto: [
        T('Uma argola fica no meu pulso esquerdo. Com ela, o rosto não muda. Saio da Cidadela com a minha cara, de capuz, e a Capital inteira me olha de lado.', 'One shackle stays on my left wrist. With it, my face doesn’t change. I leave the Citadel in my own face, hooded, and the whole Capital looks at me sideways.'),
        G('ferreiro', T('A argola tem a marca de um ferreiro da Rua das Forjas.', 'The shackle bears the mark of a smith on Forge Street.')),
      ],
      escolha: { id: 'argola', pergunta: T('A argola', 'The shackle'), opcoes: [
        { id: 'polegar', gesto: true, tom: 'fria', flag: 'polegar', txt: T('Quebrar o polegar para a mão passar.', 'Break my thumb so the hand slips through.'),
          resultado: [T('Encosto a mão numa pedra e piso. O estalo é pequeno. A mão passa pela argola como peixe por uma rede rasgada.', 'I set my hand on a stone and step on it. The crack is small. The hand slides through the shackle like a fish through a torn net.'), T('Enfaixo com um pedaço da barra da roupa. A mão vai ficar enfaixada por muito tempo.', 'I bind it with a strip from my hem. The hand will stay bound for a long time.')] },
        { id: 'seduz', gesto: true, tom: 'doce', testemunha: 1, txt: T('Ir até o ferreiro e pedir com jeito.', 'Go to the smith and ask nicely.'),
          resultado: [T('O ferreiro abre a argola dele com uma ferramenta que só ele tem e fica com a minha voz na cabeça por uns dias. Não pergunta de onde veio a moça de capuz.', 'The smith opens his own shackle with a tool only he has and keeps my voice in his head for a few days. He doesn’t ask where the hooded girl came from.')] },
        { id: 'mata', gesto: true, tom: 'cruel', corpos: 1, alarme: 2, txt: T('Ir até o ferreiro e não deixar quem lembre.', 'Go to the smith and leave nobody who remembers.'),
          resultado: [T('Ele abre a argola. Depois a forja fica fria.', 'He opens the shackle. Afterward the forge goes cold.')] },
      ] } },

    { id: 'd02', zona: 'cisterna', agua: .9, sal: .12, veste: 'ela', fundo: { video: VID('d02-cisterna'), img: IMG('d02-cisterna'), dim: .45, clima: 'bolhas', foco: '55% 50%' },
      texto: [
        T('Embaixo do templo do Cavaleiro tem uma cisterna velha, de colunas, que a cidade esqueceu. A água é parada e tem gosto de cal. Serve.', 'Under the Knight’s temple there is an old cistern, full of columns, that the city has forgotten. The water is still and tastes of lime. It will do.'),
        V('D16', T('Toda noite, depois do trabalho, eu tiro o rosto do dia e durmo lá embaixo, na minha pele, no escuro. É a única hora em que a água me segura.', 'Every night, after the work, I take off the day’s face and sleep down there, in my own skin, in the dark. It is the only hour when the water holds me.')),
        T('O sal some um pouco. No dia seguinte volta, maior.', 'The salt fades a little. The next day it comes back, larger.'),
      ] },

    { id: 'd03', zona: 'capital', agua: .25, sal: .3, fundo: { img: IMG('d03-capital'), dim: .45, clima: 'poeiraCal', foco: '55% 40%' },
      texto: [
        T('Os pequenos da Capital já sabem o que o conselho ainda não decidiu: a coluna sai daqui a quatro dias. Falta saber de que tamanho.', 'The Capital’s small folk already know what the council hasn’t decided yet: the column leaves in four days. What’s left is how big.'),
        T('Com a Orla de joelhos, Redom não precisa mais guardar a costa. Pode levar tudo para o deserto. Fui eu que pedi isso a ela, e ela acha que a ideia foi dela.', 'With the Shore on its knees, Redom no longer needs to guard the coast. It can take everything to the desert. I am the one who asked her for that, and she thinks the idea was hers.'),
        V('D17', T('Tenho três noites. De dia, ouço os pequenos. De noite, visto um deles e vou atrás dos grandes. Não dá para todos. Escolho.', 'I have three nights. By day I listen to the small. By night I wear one of them and go after the great. There isn’t time for all. I choose.')),
      ] },

    ...NOITE(1),

    // a lavadeira (a manhã do segundo dia, antes de ouvir os pequenos)
    { id: 'l01', zona: 'capital', agua: .2, sal: .38, veste: 'criadaC', fundo: { img: IMG('l01-lavadeira'), dim: .45, lado: 'dir', foco: '35% 55%' },
      texto: [
        T('Na manhã do segundo dia passo por uma rua de lavanderias. Entre as mulheres de Redom, uma Nymae lava roupa de soldado, com uma argola de cativa no tornozelo. Veio de algum barco que a Sentença tomou.', 'On the morning of the second day I pass down a street of laundries. Among the women of Redom, a Nymae washes soldiers’ clothes, a captive’s ring on her ankle. She came from some boat the Sentence took.'),
        T('Ela levanta os olhos amarelos para mim, que estou com o rosto de uma criada qualquer, e vê o ouro.', 'She lifts her yellow eyes to me, in the face of some maid, and sees the gold.'),
        T('Larga a roupa na água e se ajoelha na lama, no meio da rua. As pessoas param.', 'She drops the laundry in the water and kneels in the mud, in the middle of the street. People stop.'),
        T('O susto me pega pelas costas, e o rosto da criada escorrega.', 'The start takes me from behind, and the maid’s face slips.'),
      ],
      piscar: { id: 'p2', antes: 4, aoFalhar: (st) => { st.alarme += 1; },
        ok: [T('Fecho os olhos a tempo. Só ela viu.', 'I close my eyes in time. Only she saw.')],
        falha: [T('Demoro. Um soldado do outro lado da rua vê um brilho no rosto da criada e para, com a mão no cinto.', 'I’m too slow. A soldier across the street sees a glint in the maid’s face and stops, his hand on his belt.')] } },

    { id: 'l02', zona: 'capital', agua: .2, sal: .38, fundo: { img: IMG('l01-lavadeira'), dim: .58, lado: 'dir', foco: '35% 55%' },
      texto: [
        G('lavadeira', T('Ela segura a barra da minha saia com as duas mãos e não diz nada. Diz tudo com a testa, encostada no meu pé.', 'She holds the hem of my skirt with both hands and says nothing. She says everything with her forehead, pressed to my foot.')),
        T('Uma Nymae ajoelhada para uma criada de Redom, no meio da rua. As janelas começam a abrir.', 'A Nymae on her knees to a Redom maid, in the middle of the street. Shutters start to open.'),
      ],
      escolha: { id: 'lavadeira', pergunta: T('A lavadeira', 'The washerwoman'), opcoes: [
        { id: 'levantar', gesto: true, tom: 'doce', alarme: 1, aviso: AV.lavadeira, txt: T('Levantá-la e seguir.', 'Lift her up and walk on.'),
          resultado: [T('Ponho a mão embaixo do braço dela e levanto. Ela me deixa ir sem dizer nada e fica de pé no meio da rua, com a roupa dos soldados afundando na água.', 'I put my hand under her arm and lift her. She lets me go without a word and stays standing in the middle of the street, the soldiers’ laundry sinking in the water.')] },
        { id: 'usar', fala: true, tom: 'fria', flag: 'lavadeiraColuna', aviso: AV.lavadeira, txt: T('Peça para carregar água na coluna. Eu acho você lá.', 'Ask to carry water in the column. I’ll find you there.'),
          resultado: [T('Ela beija a minha mão de criada e diz que sim. Vai pedir. Vão aceitar: uma Nymae carrega água melhor que qualquer um.', 'She kisses my maid’s hand and says yes. She’ll ask. They’ll take her: a Nymae carries water better than anyone.')] },
        { id: 'matar', gesto: true, tom: 'cruel', corpos: 1, aviso: AV.ninguem, txt: T('Voltar à noite e levá-la para a cisterna.', 'Come back at night and take her to the cistern.'),
          resultado: [T('À noite eu volto. Ela vem comigo até a cisterna sem perguntar nada, porque sou eu. Lá embaixo, a água fica com ela.', 'At night I come back. She follows me to the cistern without asking anything, because it is me. Down there, the water keeps her.')] },
      ] } },

    ...NOITE(2),
    ...NOITE(3),

    { id: 'd10', zona: 'capital', agua: .12, sal: .55, frase: 'brilha', aoEntrar: (st) => { st.f.fraseBoca = true; }, fundo: { img: IMG('d10-praca'), dim: .45, clima: 'poeiraCal', foco: '55% 40%' },
      texto: (st) => {
        const cheias = trabalhados(st).filter((a) => resultadoDe(st, a) === 'cheia').length;
        return [
          T('Na manhã seguinte os pequenos contam antes dos arautos. A moça do pão conta, o cavalariço conta, o menino que corre com recados conta: a Lâmina leva os melhores à Boca Seca.', 'The next morning the small folk tell it before the heralds. The bread girl tells it, the stable boy tells it, the boy who runs errands tells it: the Blade takes the best to the Dry Mouth.'),
          cheias >= 2 ? T('No conselho, dizem, três vozes falaram a mesma coisa com palavras diferentes, e cada uma achou que era a primeira.', 'In council, they say, three voices said the same thing in different words, and each thought it was the first.')
            : cheias === 1 ? T('No conselho, dizem, uma voz falou mais alto que as outras, e as outras foram atrás.', 'In council, they say, one voice spoke louder than the rest, and the rest followed.')
              : T('No conselho, dizem, foi ela mesma quem decidiu, sozinha. Eu sei que não foi assim.', 'In council, they say, she decided it herself, alone. I know it wasn’t like that.'),
          V('D18', T('A frase na minha cabeça brilha uma vez e fica quieta, sem sumir.', 'The sentence in my head shines once and goes quiet, without fading.')),
        ];
      } },

    // ===================================================== PARTE V · A COLUNA
    { id: 'p5', parte: T('V · A Coluna', 'V · The Column'), zona: 'coluna', agua: .1, sal: .6, fundo: { img: IMG('e01-acampamento'), dim: .55, clima: 'poeira' },
      cartao: { num: T('Parte V', 'Part V'), nome: T('A Coluna', 'The Column'), epigrafe: T('Exército em marcha tem mais servo que soldado, e servo ninguém conta.', 'An army on the march has more servants than soldiers, and nobody counts servants.'), fonte: T('dito dos intendentes de Redom', 'saying of Redom’s stewards') } },

    { id: 'e01', zona: 'coluna', agua: .1, sal: .6, fundo: { video: VID('e01-acampamento'), img: IMG('e01-acampamento'), dim: .45, clima: 'poeira', foco: '55% 45%' },
      texto: [
        T('Fora dos muros, a coluna se monta: carroças, cavalos, tendas, forjas de campanha, a cozinha do exército. Servo de todo tipo, e nenhum deles é visto.', 'Outside the walls, the column takes shape: wagons, horses, tents, field forges, the army’s kitchen. Servants of every kind, and none of them is seen.'),
        (st) => (st.alarme >= 4 ? T('Na porta de cada tenda, um soldado olha rostos. Alguém em Redom anda contando roupas roubadas e corpos na água.', 'At every tent flap a soldier is looking at faces. Someone in Redom has been counting stolen clothes and bodies in the water.')
          : st.alarme >= 2 ? T('Na porta das tendas mais perto da Lâmina, um soldado olha rostos.', 'At the flaps of the tents nearest the Blade, a soldier is looking at faces.')
            : T('Os soldados olham as carroças e não olham as pessoas.', 'The soldiers look at the wagons and not at the people.')),
      ],
      escolha: { id: 'disfarce', pergunta: T('O último rosto', 'The last face'), opcoes: [
        { id: 'estrebaria', gesto: true, guarda: 'estrebaria', txt: T('O de Wil, moço da estrebaria. Os cochos dos cavalos são de água.', 'Wil’s, the stable hand. The horses’ troughs are full of water.'), resultado: [T('Wil tem a minha altura e um jeito de andar torto que eu aprendo em uma tarde.', 'Wil is my height and has a crooked walk I learn in an afternoon.')] },
        { id: 'forja', gesto: true, guarda: 'forja', txt: T('O de Bram, ajudante de ferreiro. Perto do fogo, os olhos fogem.', 'Bram’s, the smith’s helper. Near the fire, eyes look away.'), resultado: [T('Perto do fogo, a pele vai secar mais rápido. Escolho assim mesmo: o fogo esconde.', 'Near the fire, my skin will dry faster. I choose it anyway: the fire hides.')] },
        { id: 'ilse', gesto: true, guarda: 'ilse', se: (st) => st.alarme <= 1, txt: T('O de Ilse, ajudante de curandeiro. A tenda dos feridos fica perto da tenda da Lâmina.', 'Ilse’s, the healer’s helper. The wounded tent stands near the Blade’s tent.'), resultado: [T('Ilse quer ver a Lâmina de perto. Eu também.', 'Ilse wants to see the Blade up close. So do I.')] },
        { id: 'nell', gesto: true, guarda: 'nell', se: (st) => st.alarme <= 3, txt: T('O de Nell, da cozinha. Água e sal ao alcance da mão.', 'Nell’s, from the kitchen. Water and salt within reach.'), resultado: [T('Na cozinha tem sal em saco e água em barril. Tem também o prato da Lâmina, que volta cheio.', 'In the kitchen there is salt by the sack and water by the barrel. There is also the Blade’s plate, which comes back full.')] },
      ] } },

    { id: 'e02', zona: 'coluna', agua: .1, sal: .62, fundo: { img: IMG('e02-tenda'), dim: .5, foco: '55% 45%' },
      texto: [T('A roupa, uma última vez.', 'The clothes, one last time.')],
      escolha: { id: 'trajeColuna', pergunta: (st) => T('A roupa de {DISFARCE}', '{DISFARCE}’s clothes'), opcoes: [
        { id: 'roubar', gesto: true, preco: 'roubar', tom: 'divertida', alarme: 1, txt: T('Roubar enquanto dorme.', 'Steal them while they sleep.'), resultado: (st) => [{ t: T('Amanhã alguém vai sair da coluna procurando a própria camisa. A coluna não espera.', 'Tomorrow someone will leave the column looking for their own shirt. The column won’t wait.'), veste: st.escolhas.disfarce }] },
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'doce', testemunha: 1, txt: T('Chegar perto demais e esperar que ofereçam.', 'Stand too close and wait to be offered.'), resultado: (st) => [{ t: T('Ganho a roupa e um lugar no fogo. E alguém que vai me procurar com os olhos a viagem toda.', 'I get the clothes and a place by the fire. And someone whose eyes will look for me the whole way.'), veste: st.escolhas.disfarce }] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'cruel', corpos: 1, alarme: 2, txt: T('Não deixar a quem dar falta.', 'Leave no one to miss them.'), resultado: (st) => [{ t: T('Uma carroça de feno guarda o resto. O feno vai até a Boca Seca, e a Boca Seca não devolve nada.', 'A hay wagon keeps the rest. The hay goes to the Dry Mouth, and the Dry Mouth gives nothing back.'), veste: st.escolhas.disfarce }] },
      ] } },

    { id: 'e03', zona: 'coluna', agua: .08, sal: .66, fundo: { img: IMG('e03-odres'), dim: .45, foco: '55% 50%' },
      texto: [
        T('Os servos recebem um odre cada um. Cheio, ele pesa como um gato no ombro.', 'The servants are given one waterskin each. Full, it weighs like a cat on your shoulder.'),
        T('Para o meu corpo, um odre é um gole.', 'For my body, a waterskin is one swallow.'),
      ],
      escolha: { id: 'agua', pergunta: T('A água', 'The water'), opcoes: [
        { id: 'um', gesto: true, txt: T('Um odre, como todo mundo.', 'One waterskin, like everyone.'), resultado: [T('Um odre, como todo mundo. O que faltar, a pele paga.', 'One skin, like everyone. Whatever is missing, my skin will pay.')] },
        { id: 'escondida', gesto: true, alarme: 1, txt: T('Dois odres e uma bexiga escondida debaixo da roupa.', 'Two skins and a bladder hidden under my clothes.'), resultado: [T('A bexiga faz um volume que um olho bom acharia estranho, e os olhos daqui ainda não aprenderam a olhar para servo.', 'The bladder makes a lump a good eye would find odd, and the eyes here haven’t yet learned to look at servants.')] },
        { id: 'cochos', gesto: true, txt: T('Nada além do que os outros levam. Beber dos cochos dos cavalos.', 'Nothing beyond what the others carry. Drink from the horses’ troughs.'), resultado: [T('Os cavalos não vão se importar. Os homens, se virem, vão.', 'The horses won’t mind. The men, if they see, will.')] },
      ] } },

    { id: 'e04', zona: 'coluna', agua: .06, sal: .72, fundo: { img: IMG('e04-revista'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        G('intendente', T('Na revista dos servos, um intendente passa pela fila puxando os queixos para a luz. Olha os dentes, como se olham os de um cavalo.', 'At the servants’ muster, a steward walks the line pulling chins up to the light. He looks at the teeth, the way you look at a horse’s.')),
        T('Chega em mim. Os dedos dele são quentes e secos, e o sol bate direto nos meus olhos.', 'He reaches me. His fingers are hot and dry, and the sun hits my eyes full on.'),
      ],
      piscar: { id: 'p4', antes: 2, aoFalhar: (st) => { st.f.intendenteViu = true; },
        ok: [T('Aperto os olhos contra o sol, igual ao servo da frente. Ele passa ao próximo.', 'I squint against the sun, like the servant before me. He moves on to the next.')],
        falha: [T('Demoro. Ele franze a testa, olha uma segunda vez, e segue. Vai lembrar de mim no calor.', 'I’m too slow. He frowns, looks a second time, and moves on. He’ll remember me in the heat.')] } },

    { id: 'e05', zona: 'coluna', agua: .05, sal: .85, frase: 'fica', aoEntrar: (st) => { st.f.fraseLaura = true; st.f.fraseBoca = true; }, fundo: { video: VID('e05-saida'), img: IMG('e05-saida'), dim: .42, clima: 'poeira', foco: '55% 45%' },
      texto: [
        T('A coluna sai pelo portão sul da Capital Branca. Eu caminho atrás dos cavalos, com o rosto de {DISFARCE}.', 'The column leaves by the south gate of the White Capital. I walk behind the horses, in {DISFARCE}’s face.'),
        (st) => (st.f.polegar ? T('A mão enfaixada segura o odre. Lá na frente, um ponto de cabelo cor de trigo monta um cavalo cinzento.', 'My bound hand holds the waterskin. Far ahead, a spot of wheat-colored hair rides a grey horse.') : T('Lá na frente, um ponto de cabelo cor de trigo monta um cavalo cinzento.', 'Far ahead, a spot of wheat-colored hair rides a grey horse.')),
        T('O sol de Redom ainda nem é o do deserto, e a pele do meu pulso já repuxa embaixo da manga. Provo o meu lábio. O sal está seco.', 'Redom’s sun isn’t even the desert’s yet, and the skin of my wrist already pulls tight under the sleeve. I taste my lip. The salt is dry.'),
        { t: T('A moeda anda pelos nós dos meus dedos.', 'The coin walks across my knuckles.'), moeda: true },
        V('D19', T('A frase está completa. Atrás dela não tem mais nada escrito.', 'The sentence is complete. Behind it, nothing else is written.')),
      ],
      fim: true },
  ],

  // ---------------------------------------------------------------- as noites: quem é o alvo da noite k e que rosto ela usa
  alvoNoite: (st, k) => { const a = st.escolhas['alvo' + k]; return a === 'circulo' ? circulo(st) : a; },
  mascNoite: (st, k) => st.escolhas['masc' + k] || 'criadaC',

  // ---------------------------------------------------------------- o que este capítulo deixa para os próximos
  estadoFinal: (st) => {
    const it = J(st, 'interrogatorio'), m = J(st, 'morta');
    return {
      tripulacao: (J(st, 'tripulacao').escolhidos || []).map((k) => ({ id: k, resposta: st.escolhas['n_' + k] || null, lealdade: leal(st, k) })),
      motim: st.f.motim || null, matouNoMotim: st.f.motimMorto || null, sobrevivente: salvo(st), oferendas: st.escolhas.oferendas || null, olhos: st.escolhas.olhos || null,
      alvena: { rota: sabe(st, 'rota'), vivos: sabe(st, 'vivos'), perto: sabe(st, 'perto') }, estrago: st.f.estrago || 0, carcereiros: [st.escolhas.carcereiro, st.escolhas.carcereiro2].filter(Boolean),
      ordem: st.escolhas.ordem || null, abriuMao: J(st, 'mao').quando || null, rosto: st.escolhas.rosto || null,
      morta: { toques: m.toques || 0, ouvidas: (m.ouvidas || []).length }, carcereiro: st.escolhas.carcereiro || null,
      interrogatorio: { ouro: it.ouro || 0, vermelho: it.verm || 0, termos: termos(st) },
      semente: !!st.f.semente, usouSimon: !!st.f.usouSimon, confessou: !!st.f.confessou,
      fuga: st.escolhas.trajeCriada || st.escolhas.sombra || st.escolhas.argola || null, polegar: !!st.f.polegar,
      alvos: [1, 2, 3].map((k) => ({ alvo: window.LIVRO.alvoNoite(st, k), mascara: st.escolhas['masc' + k] || null, roupa: st.escolhas['traje' + k] || null, resultado: J(st, 'noite' + k).resultado || null })),
      lavadeira: st.escolhas.lavadeira || null, piscadas: Object.assign({}, st.piscadas), rostos: st.vestiu.slice(), corpos: st.corpos, testemunhas: st.testemunhas,
      alarme: st.alarme, disfarce: st.escolhas.disfarce || null, agua: st.escolhas.agua || null, intendenteViu: !!st.f.intendenteViu,
      tom: Object.assign({}, st.tom), colecao: st.colecao.slice(), consorte: consorte(st), escolhas: st.escolhas,
    };
  },

  // ---------------------------------------------------------------- pontuação escondida (cap07)
  pontos: (st) => {
    const an = [1, 2, 3].reduce((a, k) => a + ({ cheia: 3500, meia: 1800, nada: 500 }[J(st, 'noite' + k).resultado] || 0), 0);
    const m = J(st, 'morta'), mo = ((m.ouvidas || []).length * 350) + ((m.toques || 0) === 0 ? 2000 : 0);
    const ol = Object.values(st.piscadas).filter(Boolean).length * 900;
    const al = Math.max(600, 4200 - 350 * (J(st, 'interrogatorio').verm || 0));
    const partes = [['anzol', Math.max(1500, an)], ['morta', Math.max(400, mo)], ['olhos', Math.max(300, ol)], ['ala', al]];
    return { total: partes.reduce((a, [, v]) => a + v, 0), partes };
  },

  // ---------------------------------------------------------------- tela final (um narrador fora do roleplay)
  resumo: (st, lang) => {
    const tr = (x) => (lang === 'en' && window.LIVRO_EN[x] != null ? window.LIVRO_EN[x] : x);
    const t = (pt) => window.LIVRO.subst(tr(pt), st, tr);
    const tom = Object.entries(st.tom).sort((a, b) => b[1] - a[1])[0][0];
    const frase = t({
      doce: T('Ela mentiu com carinho do começo ao fim, e todos a quem ela mentiu ficaram agradecidos.', 'She lied tenderly from beginning to end, and everyone she lied to was grateful.'),
      fria: T('Ela disse a verdade quase sempre. A verdade matou do mesmo jeito.', 'She told the truth nearly every time. The truth killed just the same.'),
      cruel: T('Quando roubar bastava, ela matou.', 'Where stealing would have done, she killed.'),
      divertida: T('Ela riu de tudo, inclusive da Lâmina. Os outros não riram junto.', 'She laughed at everything, the Blade included. The others didn’t laugh along.'),
    }[tom]);
    const disf = st.escolhas.disfarce || 'estrebaria';
    const revela = {
      img: ROSTO('ela'),
      olho: t(T('A mulher que os Nymae chamavam de Madrinha', 'The woman the Nymae called Godmother')),
      nome: t(T('Sem nome', 'No name')),
      titulo: t(T('Nenhum que ela soubesse', 'None that she knew of')),
      texto: [
        t({ estrebaria: T('Saiu com o exército de Redom pelo portão sul, carregando água para os cavalos.', 'She left with Redom’s army through the south gate, carrying water for the horses.'),
          forja: T('Saiu com o exército de Redom pelo portão sul, puxando o fole de uma forja de campanha.', 'She left with Redom’s army through the south gate, working the bellows of a field forge.'),
          ilse: T('Saiu com o exército de Redom pelo portão sul, com ataduras para a tenda dos feridos, a vinte passos da tenda da Lâmina.', 'She left with Redom’s army through the south gate, carrying bandages for the wounded tent, twenty paces from the Blade’s.'),
          nell: T('Saiu com o exército de Redom pelo portão sul, com um saco de sal no ombro, na cozinha do exército.', 'She left with Redom’s army through the south gate, a sack of salt on her shoulder, in the army’s kitchen.') }[disf]),
        t(T('Laura D’Orrose não sabe que ela está lá.', 'Laura D’Orrose does not know she is there.')),
      ],
    };
    const trip = (J(st, 'tripulacao').escolhidos || ['maru', 'lio', 'brann']);
    const nomesTrip = trip.map((k) => t(window.LIVRO.colecao[k].nome).split(',')[0]);
    const lista = (a) => (a.length <= 1 ? a.join('') : a.slice(0, -1).join(', ') + (lang === 'en' ? ' and ' : ' e ') + a[a.length - 1]);
    const pilares = [
      { titulo: t(T('A tripulação', 'The crew')),
        feito: (lang === 'en' ? 'You took ' : 'Você levou ') + lista(nomesTrip) + '. ' + (salvo(st) ? t(T('A Nhalé levou {ULT} para o fundo, vivo. Os outros, ', 'Nhalé carried {ULT} down to the deep, alive. The others, ')) : '') + (J(st, 'mao').quando === 'cedo' ? t(T('Quem os matou foi a água dela.', 'What killed them was her water.')) : t(T('Quem os matou foram as bestas de Redom, enquanto ela esperava.', 'What killed them was Redom’s crossbows, while she waited.'))),
        volta: t({ mentira: T('Ela tinha dito a eles que hoje não.', 'She had told them not today.'), verdade: T('Ela tinha dito a verdade, e eles foram assim mesmo.', 'She had told them the truth, and they went anyway.'), olhar: T('Ela não disse nada. Eles foram pelo olhar dela.', 'She said nothing. They went on her look alone.') }[st.escolhas.ordem] || T('Eles foram porque era ela.', 'They went because it was her.')) },
      { titulo: t(T('A Lâmina', 'The Blade')),
        feito: t({ palavra: T('Laura a soltou com dois cavaleiros e a palavra dela.', 'Laura released her with two knights and her word.'), sombra: T('Laura a soltou com um homem atrás.', 'Laura released her with a man behind her.'), argola: T('Laura a soltou com uma argola no pulso.', 'Laura released her with a shackle on her wrist.') }[termos(st)]),
        volta: [st.f.confessou && t(T('Você disse que foi você que levantou o mar.', 'You said it was you who raised the sea.')), st.f.semente && t(T('Você falou da Boca Seca na frente dela.', 'You spoke of the Dry Mouth in front of her.')), st.f.usouSimon && t(T('Você falou do irmão dela.', 'You spoke of her brother.'))].filter(Boolean).join(' ') || t(T('Ela vai lembrar dos olhos.', 'She will remember the eyes.')) },
    ];
    const ditos = trabalhados(st).map((a) => {
      const al = a === 'circulo' ? circulo(st) : a, r = resultadoDe(st, a), nome = t(NOMES_ALVO[al]);
      return al === 'mapas' ? t({ cheia: T('Na Sala dos Mapas, os papéis disseram "agora".', 'In the Map Room, the papers said "now".'), meia: T('Na Sala dos Mapas, os papéis dividiram o conselho.', 'In the Map Room, the papers split the council.'), nada: T('Na Sala dos Mapas, os papéis disseram "acabou".', 'In the Map Room, the papers said "it’s over".') }[r])
        : nome + (lang === 'en' ? { cheia: ' said the gold sentence.', meia: ' said half of it.', nada: ' didn’t say it.' }[r] : { cheia: ' disse a frase de ouro.', meia: ' disse metade.', nada: ' não disse.' }[r]);
    });
    const algum = trabalhados(st).some((a) => resultadoDe(st, a) !== 'nada');
    pilares.push({ titulo: t(T('Os grandes', 'The great')), feito: ditos.join(' '), volta: algum ? t(T('Cada um achou que a ideia era dele.', 'Each one thought the idea was his own.')) : t(T('A ideia ficou com ela. A Lâmina levou os melhores do mesmo jeito.', 'The idea stayed with her. The Blade took the best all the same.')) });
    const n = [];
    trip.forEach((k) => { const c = window.LIVRO.colecao[k]; const fimK = c.fim(st); n.push(t(c.nome).split(',')[0] + ': ' + t(fimK || (typeof c.quer === 'function' ? c.quer(st) : c.quer) || '').replace(/^./, (x) => x.toLowerCase())); });
    n.push((lang === 'en' ? 'Iska: ' : 'Iska: ') + t({ roubar: T('procura a camisa até hoje.', 'still looking for her shirt.'), seduzir: T('acha que sonhou.', 'thinks she dreamed it.'), matar: T('dorme embaixo de Nove Mastros.', 'sleeps under Nine Masts.') }[st.escolhas.roupa1] || T('não soube de nada.', 'never knew a thing.')));
    if (st.escolhas.lavadeira) n.push(t(T('A lavadeira', 'The washerwoman')) + ': ' + t(window.LIVRO.colecao.lavadeira.fim(st)).replace(/^./, (x) => x.toLowerCase()));
    n.push(t(T('Rostos vestidos', 'Faces worn')) + ': ' + st.vestiu.length + ' · ' + t(T('corpos que a água guardou', 'bodies the water kept')) + ': ' + st.corpos);
    n.push(t({ um: T('A água: um odre, como todo mundo.', 'The water: one skin, like everyone.'), escondida: T('A água: dois odres e uma bexiga escondida.', 'The water: two skins and a hidden bladder.'), cochos: T('A água: os cochos dos cavalos.', 'The water: the horses’ troughs.') }[st.escolhas.agua] || T('A água: a que der.', 'The water: whatever comes.')));
    const fechou = Object.values(st.piscadas).filter(Boolean).length, total = Object.keys(st.piscadas).length;
    if (total) n.push(t(T('O ouro vazou', 'The gold leaked')) + ': ' + (total - fechou) + (lang === 'en' ? ' of ' : ' de ') + total + (lang === 'en' ? ' times.' : ' vezes.'));
    const colecao = st.colecao.map((id) => ({ id, nome: t(window.LIVRO.colecao[id] ? window.LIVRO.colecao[id].nome : id) }));
    const R = {
      chefes: { doce: T('“Redom vai pagar por cada barco.”', '“Redom will pay for every boat.”'), fria: T('“Eu vou a Redom.”', '“I am going to Redom.”'), comida: T('Pediu comida e os fez esperar', 'Asked for food and made them wait'), sarnai: T('Perguntou a Sarnai quem vendeu a rota', 'Asked Sarnai who sold the route') },
      oferendas: { nomes: T('Devolveu o nome de cada um', 'Gave each their name back'), chao: T('Deixou as moedas no chão', 'Left the coins on the floor'), mentira: T('Devolveu a moeda de quem mentiu', 'Gave back the liar’s coin') },
      ordem: { mentira: T('“Ninguém morre hoje.”', '“No one dies today.”'), verdade: T('Tomou o leme, ou a palavra', 'Took the tiller, or the floor'), olhar: T('O olhar, até abaixarem os olhos', 'The look, until they lowered their eyes'), matar: T('A lâmina, em quem tentou virar o barco', 'The blade, for whoever tried to turn the boat'), galera: T('Deu a quem ia fugir uma razão para ficar', 'Gave the one about to flee a reason to stay') },
      rosto: { pegar: T('Pegou a mão', 'Took the hand'), ver: T('Viu afundar', 'Watched it go under'), decorar: T('Decorou o rosto', 'Learned the face'), nhale: T('Deu a mão à Nhalé', 'Gave the hand to Nhalé') },
      olhos: { devagar: T('Abriu os olhos para o sargento', 'Opened her eyes for the sergeant'), sorrir: T('Sorriu para quem a carregava', 'Smiled at the one carrying her'), nome: T('Disse o nome da Laura', 'Said Laura’s name') },
      carcereiro: { wim: T('Wim, o que cantarola', 'Wim, who hums'), garrick: T('Garrick, o que nunca olha', 'Garrick, who never looks'), pell: T('Pell, o que reza', 'Pell, who prays'), dunstan: T('Dunstan, o que conta moedas', 'Dunstan, who counts coins') },
      lavadeira: { levantar: T('Levantou e seguiu', 'Lifted her and walked on'), usar: T('Mandou para a coluna', 'Sent her to the column'), matar: T('A cisterna', 'The cistern') },
      disfarce: { estrebaria: T('Moço da estrebaria', 'Stable hand'), forja: T('Ajudante de ferreiro', 'Smith’s helper'), ilse: T('Ajudante de curandeiro', 'Healer’s helper'), nell: T('Moça da cozinha', 'Kitchen girl') },
      agua: { um: T('Um odre', 'One skin'), escondida: T('Água escondida', 'Hidden water'), cochos: T('Os cochos', 'The troughs') },
    };
    const Q = {
      chefes: T('Os chefes da Orla', 'The chiefs of the Shore'), oferendas: T('As oferendas', 'The offerings'), ordem: T('Diante da Sentença', 'Facing the Sentence'), rosto: T('A última mão', 'The last hand'), olhos: T('No convés da Sentença', 'On the Sentence’s deck'),
      carcereiro: T('Na Ala Funda', 'In the Deep Ward'), lavadeira: T('A lavadeira', 'The washerwoman'), disfarce: T('O último rosto', 'The last face'), agua: T('A água', 'The water'),
    };
    const linhas = [];
    Object.keys(R).forEach((k) => { const v = st.escolhas[k]; if (v && R[k][v]) linhas.push({ id: k, opcao: v, q: t(Q[k]), a: t(R[k][v]) }); });
    return { frase, pilares, pilaresT: t(T('O que ficou', 'What stayed')), revela, notas: n, colecao, colecaoT: t(T('A Coleção', 'The Collection')), linhas };
  },
};

// {MASC} (o rosto da noite), {DISFARCE} (o da coluna) e {LEITOR} (quem lê os papéis), já no idioma da leitura
const CURTO = {
  cavalarico: T('Tam', 'Tam'), escudeiro: T('Corin', 'Corin'), novica: T('a irmã Ada', 'Sister Ada'), dama: T('Lady Elsbeth', 'Lady Elsbeth'), vinho: T('Pip', 'Pip'), viuva: T('Hilde', 'Hilde'),
  horne: T('o sargento Horne', 'Sergeant Horne'), maud: T('Maud', 'Maud'), bertha: T('Bertha', 'Bertha'), aldo: T('mestre Aldo', 'Master Aldo'), edric: T('Edric', 'Edric'),
  guarda: T('um guarda da Cidadela', 'a Citadel guard'), criadaC: T('uma criada do palácio', 'a palace maid'), moco: T('um moço de recados', 'an errand boy'),
  estrebaria: T('Wil', 'Wil'), forja: T('Bram', 'Bram'), ilse: T('Ilse', 'Ilse'), nell: T('Nell', 'Nell'),
};
window.LIVRO.subst = (s, st, tr) => {
  if (typeof s !== 'string' || s.indexOf('{') < 0) return s;
  const p = window.LIVRO.paginas[st.i] || {}, k = p.noite || 1;
  return s.replace(/\{MOT\}/g, () => NOME_TRIP[st.f.motim || st.f.motimMorto] || '').replace(/\{ULT\}/g, () => NOME_TRIP[st.f.ultimo] || '').replace(/\{MASC\}/g, () => tr(CURTO[window.LIVRO.mascNoite(st, k)] || CURTO.criadaC))
    .replace(/\{DISFARCE\}/g, () => tr(CURTO[st.escolhas.disfarce] || CURTO.estrebaria))
    .replace(/\{LEITOR\}/g, () => (window.LIVRO.mascNoite(st, k) === 'edric' && st.escolhas['traje' + k] === 'matar' ? tr(T('eu mesma, com a voz do Edric', 'I myself, in Edric’s voice')) : tr(T('o Edric', 'Edric'))));
};

// ---------------------------------------------------------------- AS TRÊS NOITES (dia: ouvir um pequeno · noite: um alvo, um rosto, uma roupa, o Anzol)
function NOITE(k) {
  const DIA = {
    1: T('O primeiro dia. Visto o rosto de uma criada do palácio que vi no corredor e ando pela Capital ouvindo quem serve.', 'The first day. I wear the face of a palace maid I saw in a corridor and walk the Capital listening to those who serve.'),
    2: T('Depois da lavadeira, sigo. A Capital cheira a cal e a pão, e quem serve fala alto quando quem manda não está.', 'After the washerwoman, I move on. The Capital smells of lime and bread, and those who serve talk loud when those who rule are away.'),
    3: T('O terceiro dia. Amanhã a coluna sai, e a cidade toda já sabe, menos o tamanho.', 'The third day. Tomorrow the column leaves, and the whole city knows it, all but the size.'),
  };
  // a manhã seguinte: a frase da noite na boca dos pequenos (a cidade produzindo a decisão)
  const AGORA = T('Ele está vivo, e está fugindo. É agora ou nunca.', 'He’s alive, and he’s running. It’s now or never.');
  const fraseDe = (st, n) => { const a = window.LIVRO.alvoNoite(st, n); return a === 'mapas' ? AGORA : (window.LIVRO.anzol[a] || {}).ideia || ''; };
  const en = (pt) => (window.LIVRO_EN && window.LIVRO_EN[pt]) || pt;
  const metade = (f) => { const w = f.replace(/[.!?]+$/, '').split(' '); return w.slice(0, Math.ceil(w.length / 2)).join(' ') + '…'; };
  const ECO = (st) => {
    const r = J(st, 'noite' + (k - 1)).resultado || 'nada', f = fraseDe(st, k - 1);
    if (r === 'cheia') return T('Na fila do pão, uma moça diz para outra: «' + f + '» Ontem à noite, só uma pessoa tinha dito isso. Dita pela cidade, parece ideia da cidade.',
      'In the bread line, one girl says to another: «' + en(f) + '» Last night only one person had said it. Said by the city, it sounds like the city’s idea.');
    if (r === 'meia') return T('Na boca de um guarda, ouço metade da frase de ontem: «' + metade(f) + '» A outra metade ficou com quem eu não terminei.',
      'In a guard’s mouth I hear half of last night’s sentence: «' + metade(en(f)) + '» The other half stayed with the one I didn’t finish.');
    return T('A cidade não repete nada da noite passada. Cheira a cal e a pão, e eu tenho uma noite a menos.', 'The city repeats nothing from last night. It smells of lime and bread, and I have one night fewer.');
  };
  // antes de escolher o alvo: o objetivo, e quantas frases já andam sozinhas
  const RUMO = (st) => {
    if (k === 1) return T('Quero que o conselho escolha os melhores e ache que escolheu sozinho.', 'I want the council to choose the best and believe it chose alone.');
    const n = [1, 2].filter((x) => x < k && J(st, 'noite' + x).resultado === 'cheia').length;
    return n === 2 ? T('Duas frases minhas já andam pela cidade sem mim. Falta a última boca.', 'Two of my sentences already walk the city without me. One last mouth.')
      : n === 1 ? T('Uma frase minha já anda pela cidade sem mim. Preciso de outra.', 'One of my sentences already walks the city without me. I need another.')
        : T('Nenhuma frase minha anda pela cidade ainda. O conselho não espera.', 'None of my sentences walks the city yet. The council won’t wait.');
  };
  const NT = {
    1: T('A primeira noite. A Capital Branca apaga as velas cedo e acende as tochas das rondas.', 'The first night. The White Capital puts out its candles early and lights the watch torches.'),
    2: T('A segunda noite. Chove fino, e a chuva lava a cal das ruas.', 'The second night. A fine rain falls, and it washes the lime off the streets.'),
    3: T('A última noite. Amanhã de manhã o conselho decide o que já está decidido.', 'The last night. Tomorrow morning the council decides what is already decided.'),
  };
  const alvo = (st) => window.LIVRO.alvoNoite(st, k);
  const usado = (st, id) => [1, 2, 3].some((n) => n < k && st.escolhas['alvo' + n] === id);
  const MASC = { markus: ['cavalarico', 'escudeiro', 'guarda'], justine: ['novica', 'dama', 'criadaC'], joseph: ['vinho', 'viuva', 'moco'], varr: ['horne', 'maud', 'guarda'], ansel: ['bertha', 'aldo', 'moco'], mapas: ['edric', 'criadaC'] };
  const PASSAGEM = ['guarda', 'criadaC', 'moco'];
  const ROT = {
    cavalarico: T('O rosto do Tam, o cavalariço que cuida do cavalo do comandante.', 'The face of Tam, the stable boy who tends the commander’s horse.'),
    escudeiro: T('O rosto do Corin, o escudeiro da espada de pau.', 'The face of Corin, the squire with the wooden sword.'),
    novica: T('O rosto da irmã Ada, a noviça que varre a capela.', 'The face of Sister Ada, the novice who sweeps the chapel.'),
    dama: T('O rosto de Lady Elsbeth, a dama de companhia.', 'The face of Lady Elsbeth, the lady-in-waiting.'),
    vinho: T('O rosto do Pip, o moço que serve vinho pela esquerda.', 'The face of Pip, the boy who pours from the left.'),
    viuva: T('O rosto da Hilde, a viúva da duna vazia.', 'The face of Hilde, the widow of the empty dune.'),
    horne: T('O rosto do sargento Horne, do portão do quartel.', 'The face of Sergeant Horne, from the barracks gate.'),
    maud: T('O rosto da Maud, a irmã dele.', 'The face of Maud, his sister.'),
    bertha: T('O rosto da Bertha, a mãe que escuta toda tarde.', 'The face of Bertha, the mother who listens every afternoon.'),
    aldo: T('O rosto do mestre Aldo, o curandeiro do chá que não adianta.', 'The face of Master Aldo, the healer whose tea does nothing.'),
    edric: T('O rosto do Edric, o escrivão que lê em voz alta.', 'The face of Edric, the clerk who reads aloud.'),
    guarda: T('O rosto de um guarda da Cidadela que vi de passagem.', 'The face of a Citadel guard I saw in passing.'),
    criadaC: T('O rosto de uma criada do palácio que vi de passagem.', 'The face of a palace maid I saw in passing.'),
    moco: T('O rosto de um moço de recados que vi de passagem.', 'The face of an errand boy I saw in passing.'),
  };
  // a manhã depois da Sala dos Mapas: a ordem que ela deixou, dita, e o que essa ordem fez no conselho
  const PAPEL = {
    1: ['pelas perdas nas Goelas', 'nas perdas nas Goelas', 'the losses at the Gullets'],
    2: ['pela morte do comandante Simon', 'na morte do comandante Simon', 'Commander Simon’s death'],
    3: ['pelo sentinela e pelo Grakh vivo', 'no sentinela e no Grakh vivo', 'the sentry and the living Grakh'],
    4: ['pelos poços que continuam com Redom', 'nos poços que continuam com Redom', 'the wells still held by Redom'],
    5: ['pela Pira indo para o norte', 'na Pira indo para o norte', 'the Pyre moving north'],
  };
  const ordemFim = (st) => {
    const j = J(st, 'noite' + k), r = j.resultado, o = j.ordem || [3, 2, 1, 4, 5];
    const a = PAPEL[o[0]], b = PAPEL[o[o.length - 1]];
    const eu = window.LIVRO.mascNoite(st, k) === 'edric' && st.escolhas['traje' + k] === 'matar';
    const leu = eu ? T('De manhã, eu mesma leio os papéis para o conselho, com a voz do Edric. Começo ' + a[0] + ' e termino ' + b[1] + '.',
      'In the morning, I read the papers to the council myself, in Edric’s voice. I start with ' + a[2] + ' and end with ' + b[2] + '.')
      : T('De manhã, o Edric lê os papéis na ordem que eu deixei. Começa ' + a[0] + ' e termina ' + b[1] + '.',
        'In the morning, Edric reads the papers in the order I left them. He starts with ' + a[2] + ' and ends with ' + b[2] + '.');
    const cedo = o.indexOf(3) <= 1;
    return r === 'cheia' ? [
      leu,
      T('Um velho do conselho é o primeiro a falar, e fala como se tivesse pensado sozinho:', 'An old man on the council is the first to speak, and speaks as if he had thought of it alone:'),
      T('«Ele está vivo, e está fugindo. É agora ou nunca.', '«He’s alive, and he’s running. It’s now or never.'),
    ] : r === 'meia' ? [
      leu,
      cedo ? T('O Grakh vivo entra cedo, mas a leitura não acaba na Pira fugindo, e a pressa se perde no meio. Metade do conselho ouve "acabou", e a outra metade ouve "ainda não".', 'The living Grakh comes in early, but the reading doesn’t end on the Pyre running, and the urgency gets lost in the middle. Half the council hears "it’s over", and the other half hears "not yet".')
        : T('O Grakh vivo entra no meio da leitura. Metade do conselho já ouviu "acabou", e a outra metade ouve "ainda não".', 'The living Grakh comes in halfway through the reading. Half the council has already heard "it’s over", and the other half hears "not yet".'),
      T('Briga de conselho também empurra. Empurra torto.', 'A council quarrel pushes too. It pushes crooked.'),
    ] : [
      leu,
      T('Quando o sentinela entra na leitura, o conselho já decidiu que acabou. Respira aliviado.', 'By the time the sentry comes into the reading, the council has already decided it’s over. It breathes easier.'),
      T('Dei a eles a ordem que eles queriam ouvir. Esse papel vai ter de ser feito por outra boca.', 'I gave them the order they wanted to hear. This work will have to be done by another mouth.'),
    ];
  };
  const pgs = [
    { id: 'n' + k + 'd', noite: k, zona: 'capital', agua: .24 - k * .05, sal: .3 + k * .08, veste: 'criadaC', aoEntrar: (st, ctx) => ctx.guarda('criadaC', true),
      fundo: { img: IMG('n-dia' + k), dim: .45, clima: 'poeiraCal', foco: '55% 45%' },
      texto: (st) => [DIA[k], ...(k > 1 ? [ECO(st)] : []), ...(k === 3 && st.alarme > 0 ? [T('Na porta da Cidadela dobraram a guarda. Alguém deu falta de uma roupa, ou de uma pessoa, e agora olham duas vezes para cada rosto.', 'At the Citadel gate they have doubled the guard. Someone missed a set of clothes, or a person, and now they look twice at every face.')] : [])], minijogo: 'escuta', jogoId: 'dia' + k, mgNome: T('Ouvir um dos pequenos', 'Listen to one of the small'),
      depois: [T('Guardo. De noite vai servir.', 'I keep it. By night it will be useful.')] },
    { id: 'n' + k + 'a', noite: k, zona: 'noite', agua: .2 - k * .04, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .5, clima: k === 2 ? 'chuva' : null, foco: '55% 40%' },
      texto: (st) => [NT[k], RUMO(st)],
      escolha: { id: 'alvo' + k, pergunta: T('Atrás de quem eu vou?', 'Whom do I go after?'), opcoes: [
        { id: 'circulo', se: (st) => !usado(st, 'circulo'), txt: (st) => (circulo(st) === 'justine' ? T('Justine, na capela da Juíza.', 'Justine, in the Judge’s chapel.') : T('Markus, na sala de armas.', 'Markus, in the armory.')), resultado: (st) => [circulo(st) === 'justine' ? T('A mulher que escreve antes de a Laura falar.', 'The woman who writes before Laura speaks.') : T('O homem que não olha para outra coisa que não seja ela.', 'The man who looks at nothing but her.')] },
        { id: 'joseph', se: (st) => !usado(st, 'joseph'), txt: T('Sir Joseph, na taverna dos oficiais velhos.', 'Sir Joseph, in the old officers’ tavern.'), resultado: [T('Um velho que perdeu para ela e nunca terminou de perder.', 'An old man who lost to her and never finished losing.')] },
        { id: 'varr', se: (st) => !usado(st, 'varr'), txt: T('Lorde Varr, no refeitório da infantaria.', 'Lord Varr, in the infantry mess.'), resultado: [T('O homem que vai com dois mil, se deixarem.', 'The man who goes with two thousand, if they let him.')] },
        { id: 'ansel', se: (st) => !usado(st, 'ansel'), txt: T('O sentinela que voltou das Goelas, na enfermaria.', 'The sentry who came back from the Gullets, in the infirmary.'), resultado: [T('Tudo o que ele diz é verdade. Melhor ainda.', 'Everything he says is true. Better still.')] },
        { id: 'mapas', se: (st) => !usado(st, 'mapas'), txt: T('A Sala dos Mapas, antes de amanhecer.', 'The Map Room, before dawn.'), resultado: [T('Lá não tem boca para trabalhar. Tem papel.', 'There’s no mouth to work there. There’s paper.')] },
      ] } },
    { id: 'n' + k + 'm', noite: k, zona: 'noite', agua: .2 - k * .04, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .58, clima: k === 2 ? 'chuva' : null },
      texto: (st) => [alvo(st) === 'mapas' ? T('A Sala dos Mapas fica no alto da Cidadela. A guarda deixa entrar quem tem a chave e um rosto que ela conhece.', 'The Map Room is high in the Citadel. The guard lets in whoever has the key and a face it knows.') : window.LIVRO.anzol[alvo(st)].lugar],
      escolha: { id: 'masc' + k, pergunta: T('Que rosto eu visto?', 'Which face do I wear?'), opcoes: Object.keys(ROT).map((id) => ({
        id, gesto: true, se: (st) => (MASC[alvo(st)] || []).includes(id) && (PASSAGEM.includes(id) || tem(st, id)), txt: ROT[id],
        aoEscolher: (st) => { if (PASSAGEM.includes(id) && !tem(st, id)) st.colecao.push(id); },
        resultado: [{ t: T('Penso em {MASC} até a pele obedecer.', 'I think of {MASC} until my skin obeys.'), veste: id }] })) } },
    { id: 'n' + k + 'r', noite: k, zona: 'noite', agua: .2 - k * .04, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .62, clima: k === 2 ? 'chuva' : null },
      texto: [T('Agora, o resto.', 'Now, the rest.')],
      escolha: { id: 'traje' + k, pergunta: T('A roupa de {MASC}', '{MASC}’s clothes'), opcoes: [
        { id: 'roubar', gesto: true, preco: 'roubar', tom: 'divertida', alarme: 1, txt: T('Roubar enquanto dorme.', 'Steal them while they sleep.'), resultado: [T('A roupa sai de uma cadeira, de um baú, de um prego na parede. Amanhã alguém vai dar falta e procurar.', 'The clothes come off a chair, out of a chest, off a nail on the wall. Tomorrow someone will miss them and search.')] },
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'doce', testemunha: 1, txt: T('Tirar com as minhas próprias mãos, numa porta dos fundos.', 'Take them off with my own hands, at a back door.'), resultado: [T('Saio vestida. Fica alguém lembrando de uma mulher bonita que não é de lugar nenhum.', 'I leave dressed. Someone is left remembering a beautiful woman from nowhere at all.')] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'cruel', corpos: 1, alarme: 2, txt: T('Esperar numa rua sem luz.', 'Wait in an unlit street.'), resultado: [T('A lâmina sai da manga e volta. Um bueiro da Rua das Fontes desce até a cisterna. Esta noite eu durmo acompanhada.', 'The blade leaves my sleeve and returns. A drain on Fountain Street runs down to the cistern. Tonight I sleep in company.')] },
      ] } },
  ];
  if (k === 1) pgs.push({ id: 'n1p', noite: 1, zona: 'noite', agua: .16, sal: .4, fundo: { img: IMG('n-tocha'), dim: .45, foco: '55% 45%' },
    texto: [
      T('No caminho, um guarda da ronda levanta a tocha para ver quem passa.', 'On the way, a watchman raises his torch to see who is passing.'),
      T('A chama chega perto demais do meu rosto, e o calor me pega de surpresa.', 'The flame comes too close to my face, and the heat catches me by surprise.'),
    ],
    piscar: { id: 'p3', antes: 2, aoFalhar: (st) => { st.alarme += 1; },
      ok: [T('Baixo os olhos contra a luz, e a luz passa. Ele baixa a tocha e segue.', 'I lower my eyes against the light, and the light moves on. He lowers the torch and walks on.')],
      falha: [T('Demoro. A tocha para no ar. — Os seus olhos… — ele começa, e eu já estou na outra esquina.', 'I’m too slow. The torch stops in the air. — Your eyes… — he begins, and I am already around the corner.')] } });
  pgs.push(
    { id: 'n' + k + 'j', noite: k, se: (st) => alvo(st) !== 'mapas', zona: 'dentro', agua: .15, sal: .36 + k * .08, fundo: (st) => ({ img: window.LIVRO.anzol[alvo(st)].img, dim: .48, lado: 'dir', foco: '35% 40%' }),
      texto: [T('Entro. O rosto passa.', 'I go in. The face gets through.')],
      minijogo: 'anzol', jogoId: 'noite' + k, mgNome: (st) => NOMES_ALVO[alvo(st)],
      aoTerminar: (st, r, ctx) => { ctx.guarda(alvo(st)); },
      depois: (st) => window.LIVRO.anzol[alvo(st)].fim[J(st, 'noite' + k).resultado || 'nada'] },
    { id: 'n' + k + 'o', noite: k, se: (st) => alvo(st) === 'mapas', zona: 'dentro', agua: .15, sal: .36 + k * .08, fundo: { img: IMG('n-mapas'), dim: .45, foco: '55% 45%' },
      texto: [T('Os relatórios do conselho estão numa pasta de couro em cima da mesa grande, cinco papéis com selo. Só quem lê em voz alta abre a pasta antes do conselho.', 'The council’s reports lie in a leather folder on the great table, five sealed papers. Only the one who reads them aloud opens the folder before council.')],
      minijogo: 'ordem', jogoId: 'noite' + k, mgNome: T('Os papéis do conselho', 'The council’s papers'),
      depois: ordemFim });
  return pgs;
}

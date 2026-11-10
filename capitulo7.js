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
const termos = (st) => J(st, 'interrogatorio').termos || 'sombra';
const alvoDa = (st, k) => st.escolhas['alvo' + k] || null;
const trabalhados = (st) => [1, 2, 3].map((k) => alvoDa(st, k)).filter(Boolean);
const resultadoDe = (st, alvo) => { const k = [1, 2, 3].find((n) => alvoDa(st, n) === alvo); return k ? (J(st, 'noite' + k).resultado || 'nada') : null; };
const NOMES_ALVO = {
  markus: T('Markus', 'Markus'), justine: T('Justine', 'Justine'), joseph: T('Sir Joseph', 'Sir Joseph'), varr: T('Lorde Varr', 'Lord Varr'), ansel: T('Ansel', 'Ansel'), mapas: T('a Sala dos Mapas', 'the Map Room'),
};

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
    colecaoT: 'A Coleção', colecaoSub: 'Os rostos que eu guardo', colecaoNovo: 'Na Coleção', colecaoVazia: 'Nenhum rosto ainda.', quer: 'Quer', naoDiz: 'Não diz', disse: 'Disse', vestivel: 'tenho a roupa',
    dicaVeu: 'O rosto que ela veste fica no alto. Toque nele para abrir a Coleção.', piscarDica: 'Toque duas vezes. Rápido.',
    mg: { escuta: 'Os pequenos', tripulacao: 'A tripulação', mao: 'Abrir a mão', morta: 'A Morta', anzol: 'O Anzol', interrogatorio: 'A Lâmina', ordem: 'A Ordem' },
    verbo: { ouvir: 'Ouvir', poder: 'Poder', esperar: 'Esperar', anzol: 'Anzol', ler: 'Ler' },
    verboDe: { escuta: 'ouvir', tripulacao: 'ouvir', mao: 'poder', morta: 'esperar', anzol: 'anzol', interrogatorio: 'anzol', ordem: 'ler' },
    dica: {
      escuta: 'Toque em quem você quer ouvir. Não sobra tempo para todos.',
      tripulacao: 'Toque em três para levar. Toque outra vez para deixar.',
      mao: 'Um toque. Você escolhe quando.',
      morta: '',
      anzol: 'A frase de ouro, no alto, é o que você quer ouvir da boca dele. A cada fala, escolha a sua: as palavras acendem quando ele chega perto. Dizer a frase você mesma apaga palavras.',
      interrogatorio: 'Duas frases. A de ouro é a sua; a vermelha é a dela. Cada resposta acende uma, a outra ou as duas.',
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
    colecaoT: 'The Collection', colecaoSub: 'The faces I keep', colecaoNovo: 'In the Collection', colecaoVazia: 'No faces yet.', quer: 'Wants', naoDiz: 'Doesn’t say', disse: 'Said', vestivel: 'I have the clothes',
    dicaVeu: 'The face she wears stays at the top. Tap it to open the Collection.', piscarDica: 'Tap twice. Quick.',
    mg: { escuta: 'The small folk', tripulacao: 'The crew', mao: 'Open the hand', morta: 'The Dead Woman', anzol: 'The Hook', interrogatorio: 'The Blade', ordem: 'The Order' },
    verbo: { ouvir: 'Listen', poder: 'Power', esperar: 'Wait', anzol: 'Hook', ler: 'Read' },
    verboDe: { escuta: 'ouvir', tripulacao: 'ouvir', mao: 'poder', morta: 'esperar', anzol: 'anzol', interrogatorio: 'anzol', ordem: 'ler' },
    dica: {
      escuta: 'Tap whoever you want to listen to. There is no time for all of them.',
      tripulacao: 'Tap three to take. Tap again to leave one behind.',
      mao: 'One tap. You choose when.',
      morta: '',
      anzol: 'The gold sentence at the top is what you want to hear from his mouth. At each line, choose yours: the words light up as he comes closer. Saying the sentence yourself puts words out.',
      interrogatorio: 'Two sentences. The gold one is yours; the red one is hers. Each answer lights one, the other, or both.',
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
    velha: { img: ROSTO('velha'), nome: T('A velha da escada', 'The old woman on the stairs'), quer: T('que a avó dela tenha tido razão.', 'for her grandmother to have been right.'), naoDiz: T('que é a última da casa dela.', 'that she is the last of her house.') },
    sarnai: { img: ROSTO('sarnai'), nome: T('Sarnai, das Viúvas do Sal', 'Sarnai, of the Salt Widows'), quer: T('ver a Sentença queimar.', 'to see the Sentence burn.'), naoDiz: T('que deve barcos a Ossian, e que alguém da casa dela vendeu a rota do irmão de Ruo.', 'that she owes Ossian boats, and that someone of her house sold the route of Ruo’s brother.'), disse: T('Redom fechou o porto de Alvena para a Orla.', 'Redom closed the port of Alvena to the Shore.') },
    ossian: { img: ROSTO('ossian'), nome: T('Ossian Três-Dedos, dos Mastreiros', 'Ossian Three-Fingers, of the Mastmen'), quer: T('o meu nome do lado dele da mesa.', 'my name on his side of the table.'), naoDiz: T('que já fez a conta do que ganha se Redom cair.', 'that he has already worked out what he gains if Redom falls.'), disse: T('Para Redom, todo barco da Orla é pirata e todo Nymae é feiticeiro.', 'To Redom, every boat of the Shore is a pirate and every Nymae a sorcerer.') },
    ruo: { img: ROSTO('ruo'), nome: T('Ruo, do Recife', 'Ruo, of the Reef'), quer: T('que eu prove.', 'for me to prove it.'), naoDiz: T('que quer acreditar.', 'that he wants to believe.'), disse: T('A Sentença queimou a frota do irmão dele no Canal das Garças.', 'The Sentence burned his brother’s fleet in the Heron Channel.') },
    iska: { img: ROSTO('iska'), veste: true, nome: T('Iska, marinheira', 'Iska, sailor'), quer: T('rir mais alto que o mar.', 'to laugh louder than the sea.'), naoDiz: T('que a cicatriz no braço não foi raio nenhum.', 'that the scar on her arm was no lightning at all.') },
    aguadeiro: { img: ROSTO('aguadeiro'), nome: T('O menino da água', 'The water boy'), quer: T('vender o último balde antes do sol.', 'to sell the last bucket before the sun.'), disse: T('A Sentença volta pelo Canal das Garças a cada nove dias.', 'The Sentence comes back through the Heron Channel every nine days.') },
    pedagio: { img: ROSTO('pedagio'), nome: T('A mulher do pedágio', 'The toll woman'), quer: T('troco certo, uma vez na vida.', 'the right change, once in her life.'), disse: T('O capitão da Sentença deve três luas à casa da Ondina.', 'The captain of the Sentence owes three moons to Ondina’s house.') },
    desertor: { img: ROSTO('desertor'), nome: T('O desertor', 'The deserter'), quer: T('esquecer o deserto.', 'to forget the desert.'), naoDiz: T('o nome do regimento.', 'the name of his regiment.'), disse: T('A Boca Seca é o deserto aonde Redom manda os filhos todo ano, e todo ano volta menos filho.', 'The Dry Mouth is the desert where Redom sends its sons every year, and every year fewer sons come back.') },
    padre: { img: ROSTO('padre'), nome: T('O padre do Cavaleiro', 'The Knight’s priest'), quer: T('que eu reze com ele.', 'for me to pray with him.'), disse: T('A Lâmina tomou a costa em quatro verões, e o Cavaleiro anda com ela.', 'The Blade took the coast in four summers, and the Knight rides with her.') },
    mira: { img: ROSTO('mira'), nome: T('Mira, da casa da Ondina', 'Mira, of Ondina’s house'), quer: T('uma noite sem soldado.', 'one night without a soldier.'), disse: T('Os soldados de Redom dormem com o rosto virado para a porta.', 'Redom’s soldiers sleep with their faces to the door.') },
    // a tripulação: o cartão fica depois da Sentença, com a linha do fim
    maru: { img: ROSTO('maru'), nome: T('Maru, piloto', 'Maru, pilot'), quer: T('ver mais uma tempestade.', 'to see one more storm.'), naoDiz: T('que o olho branco ainda enxerga um pouco.', 'that the white eye still sees a little.'), morto: (st) => !!st.f.naufragio, fim: (st) => (st.f.naufragio ? T('Afundou com a mão no leme.', 'Went down with his hand on the tiller.') : null) },
    lio: { img: ROSTO('lio'), nome: T('Lio', 'Lio'), quer: T('que eu lembre o nome dele.', 'for me to remember his name.'), morto: (st) => !!st.f.naufragio, fim: (st) => (st.f.naufragio ? T('Boiou de costas.', 'Floated on his back.') : null) },
    teshka: { img: ROSTO('teshka'), nome: T('Teshka, capitã', 'Teshka, captain'), quer: T('voltar.', 'to go home.'), naoDiz: T('que veio sem acreditar em mim.', 'that she came without believing in me.'), morto: (st) => !!st.f.naufragio, fim: (st) => (st.f.naufragio ? T('Não voltou.', 'Did not go home.') : null) },
    nhale: { img: ROSTO('nhale'), nome: T('Nhalé, do fundo', 'Nhalé, of the deep'), quer: T('ver gente da terra de perto.', 'to see land people up close.'), morto: (st) => !!st.f.naufragio, fim: (st) => (st.f.naufragio ? T('Bateu na quilha e parou.', 'Knocked on the keel and stopped.') : null) },
    brann: { img: ROSTO('brann'), nome: T('Brann, besteiro', 'Brann, crossbowman'), quer: T('que alguém conte dele numa taverna.', 'for someone to tell about him in a tavern.'), naoDiz: T('que veio pela briga e não pelo dinheiro.', 'that he came for the fight and not the money.'), morto: (st) => !!st.f.naufragio, fim: (st) => (!st.f.naufragio ? null : (st.jogos.mao || {}).quando === 'cedo' ? T('Não chegou a atirar.', 'Never got the shot off.') : T('Acertou um antes.', 'Hit one first.')) },
    // os da Sentença (a Morta)
    capitao: { img: ROSTO('capitao'), nome: T('O capitão da Sentença', 'The captain of the Sentence'), quer: T('pagar a casa da Ondina.', 'to pay Ondina’s house.'), disse: T('Vende os mortos por peso em Alvena.', 'He sells the dead by weight in Alvena.') },
    hobb: { img: ROSTO('hobb'), nome: T('Hobb, da Sentença', 'Hobb, of the Sentence'), quer: T('que o primo dele arrume um posto na Cidadela.', 'for his cousin to find him a post at the Citadel.'), disse: T('A Lâmina não come desde que o irmão morreu. Manda o prato de volta cheio.', 'The Blade hasn’t eaten since her brother died. She sends the plate back full.') },
    grisalho: { img: ROSTO('grisalho'), nome: T('O soldado grisalho', 'The grey soldier'), quer: T('não voltar para o deserto.', 'not to go back to the desert.'), disse: T('Se a Lâmina quiser vingança, vai todo mundo, e o deserto come metade.', 'If the Blade wants vengeance, everyone goes, and the desert eats half.') },
    sargento: { img: ROSTO('sargento'), nome: T('O sargento da Sentença', 'The sergeant of the Sentence'), quer: T('cumprir a lei sem pensar nela.', 'to keep the law without thinking about it.'), disse: T('Conjuradora vai para a Ala Funda. É a lei.', 'A conjurer goes to the Deep Ward. It is the law.') },
    // os quatro da escada (Ala Funda)
    wim: { img: ROSTO('wim'), nome: T('Wim, o que cantarola', 'Wim, the one who hums'), quer: T('que o turno acabe.', 'for the shift to end.'), disse: (st) => (st.escolhas.carcereiro === 'wim' ? T('A Lâmina desce sozinha. Sempre.', 'The Blade comes down alone. Always.') : null) },
    garrick: { img: ROSTO('garrick'), nome: T('Garrick, o que nunca olha', 'Garrick, the one who never looks'), quer: T('não ver.', 'not to see.'), disse: (st) => (st.escolhas.carcereiro === 'garrick' ? T('Serviu com o comandante Simon, que dividia o pão com quem estava de guarda.', 'He served under Commander Simon, who shared his bread with whoever was on watch.') : null) },
    pell: { img: ROSTO('pell'), nome: T('Pell, o que reza', 'Pell, the one who prays'), quer: T('que a Juíza veja que ele bate sem raiva.', 'for the Judge to see that he strikes without anger.'), disse: (st) => (st.escolhas.carcereiro === 'pell' ? T('A Juíza pesa até a Lâmina.', 'The Judge weighs even the Blade.') : null) },
    dunstan: { img: ROSTO('dunstan'), nome: T('Dunstan, o que conta moedas', 'Dunstan, the one who counts coins'), quer: T('o soldo atrasado.', 'his late pay.'), disse: (st) => (st.escolhas.carcereiro === 'dunstan' ? T('Cada galera parada na costa custa a Redom mais que uma aldeia por ano.', 'Every galley sitting on the coast costs Redom more than a village a year.') : null) },
    laura: { img: ROSTO('laura'), nome: T('Laura D’Orrose', 'Laura D’Orrose'), quer: T('ainda não sei.', 'I don’t know yet.'), naoDiz: (st) => (st.f.usouSimon ? T('que o irmão dela está em cada prato que ela manda de volta.', 'that her brother is in every plate she sends back.') : null), fim: T('Este eu não visto.', 'This one I don’t wear.') },
    // Redom: os pequenos
    criada: { img: ROSTO('criada'), veste: true, nome: T('Greta, criada da estalagem', 'Greta, inn maid'), quer: T('dormir até o galo.', 'to sleep until the rooster.') },
    capa: { img: ROSTO('capa'), nome: T('A moça da capa roxa', 'The girl in the purple cloak'), quer: T('uma capa boa, de graça.', 'a good cloak, for free.'), naoDiz: T('que um homem de Redom vai segui-la até o porto.', 'that a man of Redom will follow her to the harbor.') },
    ferreiro: { img: ROSTO('ferreiro'), nome: T('O ferreiro das argolas', 'The smith of the shackles'), quer: T('que a argola dele dure.', 'for his shackle to hold.') },
    cavalarico: { img: ROSTO('cavalarico'), veste: true, nome: T('Tam, cavalariço da sala de armas', 'Tam, armory stable boy'), quer: T('que o cavalo do comandante coma.', 'for the commander’s horse to eat.'), disse: T('Markus dorme na sala de armas desde a notícia, e pediu o cavalo do comandante Simon para a coluna.', 'Markus has slept in the armory since the news, and asked for Commander Simon’s horse for the column.') },
    escudeiro: { img: ROSTO('escudeiro'), veste: true, nome: T('Corin, escudeiro', 'Corin, squire'), quer: T('ir na coluna.', 'to go with the column.'), disse: T('Markus treinou o comandante Simon com espada de pau quando ele tinha nove anos.', 'Markus trained Commander Simon with a wooden sword when he was nine.') },
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
    estrebaria: { img: ROSTO('estrebaria'), veste: true, nome: T('Wil, moço da estrebaria', 'Wil, stable hand'), quer: T('um cavalo que não morda.', 'a horse that doesn’t bite.') },
    forja: { img: ROSTO('forja'), veste: true, nome: T('Bram, ajudante de ferreiro', 'Bram, smith’s helper'), quer: T('uma semana sem queimadura.', 'one week without a burn.') },
    ilse: { img: ROSTO('ilse'), veste: true, nome: T('Ilse, ajudante de curandeiro', 'Ilse, healer’s helper'), quer: T('ver a Lâmina de perto.', 'to see the Blade up close.') },
    nell: { img: ROSTO('nell'), veste: true, nome: T('Nell, da cozinha', 'Nell, of the kitchen'), quer: T('sal que não acabe.', 'salt that doesn’t run out.') },
    intendente: { img: ROSTO('intendente'), nome: T('O intendente da revista', 'The steward at the muster'), quer: T('contar certo.', 'to count right.'), disse: T('Olha os dentes dos servos antes de deixá-los entrar na coluna.', 'He looks at the servants’ teeth before he lets them into the column.') },
  },

  // ---------------------------------------------------------------- OUVIR (escolher quem ouvir; o tempo não dá para todos)
  escuta: {
    alvena: { pick: 3, titulo: T('Alvena', 'Alvena'), gente: [
      { id: 'aguadeiro', rotulo: T('O menino que vende água no porto', 'The boy who sells water at the harbor'), fala: [T('— A galera grande? Volta pelo Canal das Garças. Sei porque compram água de mim quando ela ancora. Nove dias, sempre.', '— The big galley? Comes back through the Heron Channel. I know because they buy water from me when she anchors. Nine days, always.')], flag: 'rotaSentenca' },
      { id: 'pedagio', rotulo: T('A mulher do pedágio, no molhe', 'The toll woman, on the mole'), fala: [T('— O capitão da Sentença? Deve três luas à casa da Ondina. Paga em promessa, e promessa de capitão bóia.', '— The Sentence’s captain? Owes three moons to Ondina’s house. Pays in promises, and a captain’s promise floats.')], flag: 'dividaCapitao' },
      { id: 'desertor', rotulo: T('O desertor de Redom que pede esmola', 'The Redom deserter begging for coins'), fala: [T('— Boca Seca? É o deserto. Redom manda os filhos para lá todo ano, e todo ano volta menos filho. Eu voltei. Não conta para os outros.', '— Dry Mouth? It’s the desert. Redom sends its sons there every year, and every year fewer sons come back. I came back. Don’t tell the others.')], frase: 'boca' },
      { id: 'padre', rotulo: T('O padre do Cavaleiro, na escada do templo', 'The Knight’s priest, on the temple steps'), fala: [T('— A Lâmina tomou a costa em quatro verões, filha. O Cavaleiro anda com ela. Reza comigo?', '— The Blade took the coast in four summers, daughter. The Knight rides with her. Will you pray with me?')] },
      { id: 'mira', rotulo: T('Uma moça da casa da Ondina, na janela', 'A girl from Ondina’s house, at the window'), fala: [T('— Os de Redom? Dormem com a cara virada para a porta. Todos. Até bêbados. Até comigo em cima.', '— Redom’s lot? They sleep with their faces to the door. All of them. Even drunk. Even with me on top.')] },
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
        : { id: 'escudeiro', rotulo: T('Um escudeiro limpando uma espada de pau', 'A squire cleaning a wooden sword'), fala: [T('— É do comandante Simon. O marechal treinou ele com esta aqui, quando ele tinha nove anos. Segurava de cabeça para baixo, o marechal conta. Só conta isso.', '— It was Commander Simon’s. The marshal trained him with this one, when he was nine. He held it upside down, the marshal says. That’s all he says.')] },
    ] },
  },

  // a tripulação: três de cinco
  tripulacao: { pick: 3, gente: [
    { id: 'maru', rotulo: T('Maru, piloto velho', 'Maru, old pilot'), fala: [T('Um olho branco de sal e o outro preto. Fala com o barco como se fala com um cachorro. Conhece a rota pelos recifes, a escondida.', 'One eye white with salt, the other black. Talks to the boat the way you talk to a dog. Knows the hidden route through the reefs.')] },
    { id: 'lio', rotulo: T('Lio, o mais novo do cais', 'Lio, the youngest on the docks'), fala: [T('Foi ele quem segurou o pano para mim na escada. Adulto, mas nunca saiu da Orla. Pergunta se em Redom chove.', 'He held the cloth for me on the stairs. Grown, but he has never left the Shore. He asks if it rains in Redom.')] },
    { id: 'teshka', rotulo: T('Teshka, capitã de um cúter', 'Teshka, captain of a cutter'), fala: [T('Ajoelha com um joelho só e pergunta quanto paga. Tem o barco mais rápido do cais e uma faca que ela limpa quando pensa.', 'Kneels on one knee only and asks what it pays. Has the fastest boat on the docks and a knife she cleans when she thinks.')] },
    { id: 'nhale', rotulo: T('Nhalé, do povo do fundo', 'Nhalé, of the deep folk'), fala: [T('Uma Merés. Não aguenta muito tempo fora d’água; guia o barco por baixo, batendo na quilha. Quer ver gente da terra de perto.', 'A Merés. She can’t stay long out of water; she guides the boat from below, knocking on the keel. She wants to see land people up close.')] },
    { id: 'brann', rotulo: T('Brann, besteiro', 'Brann, crossbowman'), fala: [T('Humano da Orla, uma cicatriz de raio no pescoço. Para ele eu sou uma mulher de olhos esquisitos, e ele diz isso na minha cara. Vai pelo dinheiro e pela briga.', 'A man of the Shore, a lightning scar down his neck. To him I am a woman with odd eyes, and he says so to my face. He comes for the money and the fight.')] },
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
      { t: 25, card: 'grisalho', frase: 'boca', txt: T('— E agora? Boca Seca outra vez? Se ela quiser vingança, vai todo mundo, e o deserto come metade.', '— And now? The Dry Mouth again? If she wants vengeance, everyone goes, and the desert eats half.') },
      { t: 33, txt: T('— Olha o ombro dela. Seta inteira dentro, e nada. Essa desgraçada é dura igual Grakh.', '— Look at her shoulder. Whole bolt in, and nothing. This bitch is tough as a Grakh.') },
      { t: 41, card: 'sargento', txt: T('— Algema de pedra nela. Conjuradora vai para a Ala Funda. É a lei.', '— Stone shackles on her. A conjurer goes to the Deep Ward. It’s the law.') },
    ],
    mexe1: T('Um dedo meu se mexe.', 'One of my fingers moves.'),
    mexe1b: T('— Ei.', '— Hey.'),
    mexe1c: T('Um soldado olha. A conversa para, e volta.', 'A soldier looks. The talk stops, and comes back.'),
    mexe2: T('— Essa mexeu.', '— That one moved.'),
    mexe2b: T('A ponta de uma lança entra na ferida do ombro e gira. Depois disso, só a dor fala.', 'The tip of a spear goes into the wound in my shoulder and turns. After that, only the pain talks.'),
  },

  // ---------------------------------------------------------------- ABRIR A MÃO
  mao: {
    img: IMG('s03-costado'),
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
          { id: 'p', tipo: 'porta', de: 'escudeiro', u: 2, txt: T('O comandante aprendeu espada com o senhor. Com dois mil, quem vai é o Varr.', 'The commander learned the sword from you. With two thousand, it’s Varr who goes.'), resp: [T('— Aos nove anos. Segurava o pau de cabeça para baixo.', '— At nine. He held the stick upside down.'), T('O polegar dele corre pelo fio da espada.', 'His thumb runs along the edge.'), T('— O Varr nunca viu ele segurar nada.', '— Varr never saw him hold anything.')] },
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
          { id: 'p', tipo: 'porta', u: 2, txt: T('Quando ela lê assim, já decidiu ir. Só falta alguém dizer em voz alta.', 'When she reads like that, she’s already decided to go. It only needs someone to say it out loud.'), resp: [T('Ele fica muito quieto.', 'He goes very still.'), T('Depois respira pelo nariz, curto, e eu sei que acertei.', 'Then he breathes through his nose, short, and I know I’ve hit it.')] },
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
          { id: 's', tipo: 'silencio', u: 2, resp: [T('Sirvo e fico calada. Ele não aguenta mesa em silêncio e enche sozinho.', 'I pour and keep quiet. He can’t stand a silent table and fills it himself.'), T('— Trinta anos de deserto, e sabe o que me sobrou? Esta mão.', '— Thirty years of desert, and you know what I have left? This hand.')] },
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
        meia: [T('— Eu vou falar. Ela não vai ouvir, mas eu vou falar.', '— I’ll speak. She won’t listen, but I’ll speak.'), T('Velho que fala para não ser ouvido grita mais alto. Serve.', 'An old man who speaks not to be heard shouts louder. That will do.')],
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
          { id: 's', tipo: 'silencio', u: 2, resp: [T('Bebo e não digo nada. Ele odeia beber com quem não fala, e fala por dois.', 'I drink and say nothing. He hates drinking with someone who doesn’t talk, and talks for two.'), T('— Sabe quem fica? Os melhores. Os melhores ficam guardando a cama da Cidadela.', '— You know who stays? The best. The best stay home guarding the Citadel’s beds.')] },
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
          { id: 'p', tipo: 'porta', u: 2, txt: T('Que os seus homens não querem ficar olhando os outros partirem. Nem os dos outros.', 'That your men don’t want to watch the others leave. Nor do anyone else’s.'), resp: [T('Ele ri, e desta vez acha graça.', 'He laughs, and this time he finds it funny.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('O que o senhor quiser dizer?', 'Whatever you want to say, sir?'), resp: [T('— Eu quero dizer que eu vou. E que eu não quero ir sozinho.', '— I want to say I’m going. And that I don’t want to go alone.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Diga que todos têm que ir.', 'Say that everyone has to go.'), resp: [T('— Isso é conversa de quem não vai.', '— That’s talk from someone who isn’t going.')] },
        ] },
      ],
      fim: {
        cheia: [T('Ele levanta a caneca para a mesa toda.', 'He raises his mug to the whole table.'), { t: T('«Nenhum homem quer ser o que ficou em casa.', '«No man wants to be the one who stayed home.') }, T('Os oficiais batem as canecas. Amanhã cada um vai achar que pensou nisso primeiro.', 'The officers bang their mugs. Tomorrow each of them will think he thought of it first.')],
        meia: [T('— Eu vou dizer que a Terceira não vai sozinha.', '— I’ll say the Third doesn’t go alone.'), T('Uma frase pela metade, na boca de um homem que fala alto. Serve para empurrar.', 'Half a sentence, in the mouth of a loud man. Good enough for a push.')],
        nada: [T('— Vai dormir, que amanhã é cedo.', '— Go to bed, tomorrow’s early.'), T('Ele vira a caneca e esquece que eu estava ali.', 'He drains the mug and forgets I was there.')],
      },
    },

    ansel: {
      img: IMG('n-ansel'), lugar: T('A enfermaria do quartel, à noite', 'The barracks infirmary, at night'),
      ideia: T('Ele me deixou ir para ela vir.', 'He let me go so that she would come.'), falador: false, mascaras: { bertha: 1, aldo: 1 },
      trocas: [
        { fala: T('— Não precisa me olhar assim. Eu já contei para todo mundo.', '— You don’t have to look at me like that. I’ve told everyone already.'), ops: [
          { id: 'p', tipo: 'porta', de: 'bertha', u: 2, txt: T('Conta para mim, filho. Eu gosto de ouvir de você.', 'Tell me, son. I like hearing it from you.'), resp: [T('Ele abaixa a cabeça.', 'He lowers his head.'), T('— Ele dividiu o pão comigo. A última coisa que ele fez de manhã foi dividir o pão.', '— He shared his bread with me. The last thing he did that morning was share his bread.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('Conta para mim também.', 'Tell me too.'), resp: [T('— O Grakh grande matou o comandante. Depois me viu.', '— The big Grakh killed the commander. Then he saw me.')] },
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
      { fala: T('— Os meus homens viram o mar subir. Um mar parado, que respirou fundo e subiu.', '— My men saw the sea rise. A still sea, that took a deep breath and rose.'), ops: [
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
        { id: 'galera', de: 'dunstan', txt: T('Que Redom pare de pagar uma galera por aldeia. A costa custa a você mais que uma guerra.', 'For Redom to stop paying a galley for every village. The coast costs you more than a war.'), ouro: 2, verm: 0, resp: [T('— Quem te contou o preço de uma galera?', '— Who told you what a galley costs?'), T('— Eu sei somar.', '— I can add.')] },
        { id: 'irmao', de: (st) => (tem(st, 'hobb') ? 'hobb' : tem(st, 'garrick') && st.escolhas.carcereiro === 'garrick' ? 'garrick' : null), txt: T('Sinto muito pelo seu irmão.', 'I’m sorry about your brother.'), ouro: 2, verm: 2, flag: 'usouSimon', resp: [T('Pela primeira vez a voz dela muda. Fica mais baixa.', 'For the first time her voice changes. It drops.'), T('— Como uma pirata sabe do meu irmão?', '— How does a pirate know about my brother?')] },
        { id: 'deserto', txt: T('Que você termine o que começou na Boca Seca.', 'For you to finish what you started in the Dry Mouth.'), ouro: 1, verm: 2, flag: 'semente', resp: [T('Os olhos dela esfriam.', 'Her eyes go cold.'), T('— O que você sabe da Boca Seca?', '— What do you know about the Dry Mouth?')] },
        { id: 'mim', txt: T('O que você quiser de mim.', 'Whatever you want from me.'), ouro: 0, verm: 2, resp: [T('— Eu já disse para não brincar.', '— I told you not to play.')] },
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
        T('Abro os olhos debaixo d’água e respiro. Aqui embaixo respirar é macio: a água entra fria e sai morna.', 'I open my eyes under the water and breathe. Down here breathing is soft: the water goes in cold and comes out warm.'),
        T('Lá em cima a luz se quebra em pedaços. Em volta de mim, moças de cauda nadam em roda e cantam. Param quando me veem de olhos abertos.', 'Up above, the light breaks into pieces. Around me, girls with tails swim in a ring and sing. They stop when they see my eyes open.'),
        V('D01', T('A frase já estava aqui quando acordei, dobradinha como um bilhete. Duas palavras dela eu não conheço. Laura é um nome sem rosto. Boca Seca deve ser uma doença.', 'The sentence was here when I woke, folded small like a note. Two of its words I don’t know. Laura is a name without a face. Dry Mouth must be some sickness.')),
        T('Não pergunto como cheguei. Subo.', 'I don’t ask how I got here. I go up.'),
      ] },

    { id: 'a02', zona: 'cais', agua: .7, fundo: { img: IMG('a02-escada'), dim: .45, foco: '62% 45%' },
      texto: [
        T('A cidade em cima da água é feita de navios. Dezenas deles, amarrados casco com casco, com pontes de corda de um convés a outro e lanternas penduradas nos mastros. Cheira a alcatrão, a peixe e a gente acordada cedo.', 'The city on top of the water is made of ships. Dozens of them, lashed hull to hull, with rope bridges from deck to deck and lanterns hung from the masts. It smells of tar, of fish, and of people up early.'),
        V('D02', T('Na escada do cais, uma mulher derruba o cesto e se ajoelha em cima dos peixes. Gagueja um título que eu nunca ouvi. Estendo a mão. Ela beija meus dedos, e eu deixo, porque é gostoso ser esperada.', 'On the dock stairs a woman drops her basket and kneels on the fish. She stammers a title I have never heard. I hold out my hand. She kisses my fingers, and I let her, because it is lovely to be expected.')),
        T('Outros param. Olham para as tábuas. Um velho começa a mesma frase três vezes e não termina nenhuma.', 'Others stop. They look at the planks. An old man starts the same sentence three times and finishes none of them.'),
        T('Alguém me cobre com um pano. Uma menina passa óleo no meu cabelo com os dedos, de trás para a frente, tremendo, e eu deixo que ela trabalhe enquanto os mais velhos chegam.', 'Someone covers me with a cloth. A girl works oil into my hair with her fingers, back to front, trembling, and I let her work while the elders come.'),
      ] },

    { id: 'a03', zona: 'cais', agua: .7, fundo: { img: IMG('a03-velha'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Uma velha de orelhas rasgadas abre caminho entre eles. Tem os olhos amarelos de todo mundo aqui. Olha para os meus e ri com uma boca quase sem dente.', 'An old woman with torn ears pushes through them. She has the yellow eyes everyone here has. She looks into mine and laughs with a mouth nearly out of teeth.'),
        T('— A Madrinha voltou. Minha avó viu a senhora.', '— The Godmother is back. My grandmother saw you.'),
        V('D03', T('— Então a sua avó viu bem.', '— Then your grandmother saw well.')),
        G('velha', T('Não confirmo e não desminto. Deixo que ela termine a conta sozinha, e ela termina chorando.', 'I neither confirm nor deny. I let her finish the sum alone, and she finishes it crying.')),
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
        T('— Para eles, todo barco da Orla é pirata e todo Nymae é feiticeiro — diz Ossian. — Enforcam primeiro e perguntam o nome depois.', '— To them, every boat of the Shore is a pirate and every Nymae a sorcerer — says Ossian. — They hang first and ask the name after.'),
        T('— A Sentença queimou a frota do meu irmão no Canal das Garças — diz Ruo. — Se a senhora é quem dizem, afunda a Sentença.', '— The Sentence burned my brother’s fleet in the Heron Channel — says Ruo. — If you are who they say, sink the Sentence.'),
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
      ] } },

    { id: 'a06', zona: 'cais', agua: .6, fundo: { img: IMG('a06-moeda'), dim: .45, foco: '62% 50%' },
      texto: [
        T('De manhã, um menino me traz o que achou num barco queimado e abre a mão aos poucos, para a coisa não fugir.', 'In the morning a boy brings me what he found on a burned boat and opens his hand bit by bit, so the thing won’t escape.'),
        T('Uma moeda de prata. De um lado, uma balança. Do outro, uma mulher de cabelo preso e queixo erguido. Em volta, letras: LAURA D’ORROSE · GENERAL-RAINHA.', 'A silver coin. On one side, a pair of scales. On the other, a woman with her hair tied back and her chin raised. Around her, letters: LAURA D’ORROSE · GENERAL-QUEEN.'),
        { t: T('Laura. A palavra turva assenta, como areia no fundo depois que o barco passa.', 'Laura. The cloudy word settles, like sand on the bottom once the boat has passed.'), frase: 'laura' },
        V('D05', T('O ourives gostava dela, ou devia dinheiro a ela. Na moeda, o queixo sobe mais que o de qualquer rainha.', 'The engraver loved her, or owed her money. On the coin her chin rises higher than any queen’s.')),
        { t: T('Fico com a moeda. Ela anda pelos nós dos meus dedos, de um lado para o outro, e eu deixo.', 'I keep the coin. It walks across my knuckles, back and forth, and I let it.'), moeda: true },
      ] },

    { id: 'a07', zona: 'cais', agua: .55, fundo: { img: IMG('a07-iska'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        G('iska', T('Para ir a Alvena preciso de um rosto que Redom não enforque. Ontem, no cais, vi uma marinheira humana que ri alto e tem uma cicatriz em forma de raio no braço. Vi e ouvi. Basta.', 'To go to Alvena I need a face Redom won’t hang. Yesterday, on the dock, I saw a human sailor who laughs loud and has a lightning-shaped scar on her arm. I saw and I heard. That is enough.')),
        T('O rosto eu tenho. Falta a roupa, porque a roupa não muda comigo.', 'The face I have. The clothes I lack, because clothes don’t change with me.'),
      ],
      escolha: { id: 'roupa1', pergunta: T('A roupa da Iska', 'Iska’s clothes'), opcoes: [
        { id: 'roubar', gesto: true, preco: 'roubar', tom: 'divertida', txt: T('Tirar a camisa e as calças do varal dela.', 'Take the shirt and trousers off her line.'),
          resultado: [T('O varal fica com um buraco no meio. À tarde ela vai procurar a camisa em todos os barcos do cais e xingar a vizinha.', 'The line is left with a gap in the middle. In the afternoon she’ll look for the shirt on every boat on the dock and curse her neighbor.')] },
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'doce', testemunha: 1, txt: T('Pagar uma bebida e pedir a roupa no fim da noite.', 'Buy her a drink and ask for the clothes at the end of the night.'),
          resultado: [T('Ela ri alto na taverna, depois mais baixo, depois só para mim. De madrugada me dá a camisa sem eu precisar pedir. Vai lembrar de uma mulher de olhos estranhos até o fim da semana, e depois vai achar que sonhou.', 'She laughs loud in the tavern, then lower, then only for me. Before dawn she gives me the shirt without my having to ask. She’ll remember a woman with strange eyes until the end of the week, and then she’ll think she dreamed it.')] },
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
        T('Ando com o rosto da Iska, e os olhos passam por mim e seguem. Tenho uma manhã. Escolho com quem gastar.', 'I walk in Iska’s face, and eyes pass over me and move on. I have one morning. I choose whom to spend it on.'),
      ],
      minijogo: 'escuta', jogoId: 'alvena', mgNome: T('Ouvir os pequenos de Alvena', 'Listen to the small folk of Alvena'),
      depois: (st) => [
        se(() => !!st.f.fraseBoca, T('Uma boca seca. A minha tem gosto de sal desde que acordei.', 'A dry mouth. Mine has tasted of salt since I woke.')),
        T('Guardo o que eles disseram. Cada um acha que contou uma coisa pequena.', 'I keep what they told me. Each of them thinks they told a small thing.'),
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

    { id: 'a11', zona: 'cais', agua: .7, veste: 'ela', fundo: { img: IMG('a11-cais-noite'), dim: .5, foco: '60% 45%' },
      texto: [
        T('De volta a Nove Mastros, tiro o rosto da Iska como se tira uma luva molhada.', 'Back in Nine Masts, I take off Iska’s face the way you peel off a wet glove.'),
        T('Digo que vou a Redom e que preciso de um barco pequeno e de três pessoas. Metade do cais se oferece. A outra metade se oferece depois, mais baixo.', 'I say I am going to Redom and need a small boat and three people. Half the dock offers itself. The other half offers later, more quietly.'),
      ],
      minijogo: 'tripulacao', jogoId: 'tripulacao', mgNome: T('Escolher três', 'Choose three'),
      aoTerminar: (st, r, ctx) => { (r.escolhidos || []).forEach((k, i) => { st.avisos.push(AV[k]); setTimeout(() => ctx.toast(AV[k]), 300 + i * 1100); }); },
      depois: [T('Três. O barco é pequeno, e a frase não pede mais.', 'Three. The boat is small, and the sentence asks for no more.')] },

    // a noite de partir: uma conversa com cada um dos três (a resposta muda como cada um morre)
    { id: 'a12m', se: (st) => noBarco(st, 'maru'), zona: 'mar', agua: .7, fundo: { img: IMG('a12-maru'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Maru canta para o barco enquanto ajusta a vela. Uma canção sem fim, que ele recomeça quando acaba.', 'Maru sings to the boat while he trims the sail. A song with no end, which he starts over when it ends.'),
        T('— A senhora conhece a rota dos recifes, Madrinha? Por ali a gente chega em Redom sem galera nenhuma ver.', '— Do you know the reef route, Godmother? That way we reach Redom without a single galley seeing.'),
      ],
      escolha: { id: 'n_maru', opcoes: [
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.maru, txt: T('Conheço. Canta mais um pouco.', 'I do. Sing a little more.'), resultado: [T('Ele canta, achando que vamos pelos recifes. Deixo que ache.', 'He sings, thinking we’re taking the reefs. I let him think it.')] },
        { id: 'fria', fala: true, tom: 'fria', aviso: AV.maru, txt: T('Não vamos pelos recifes.', 'We’re not going by the reefs.'), resultado: [T('O olho bom dele me mede. O branco também. Ele volta para a vela sem perguntar mais nada.', 'His good eye measures me. The white one too. He goes back to the sail without another question.')] },
        { id: 'diverte', gesto: true, tom: 'divertida', aviso: AV.maru, txt: T('Cantar com ele, errando a letra.', 'Sing with him, getting the words wrong.'), resultado: [T('Ele me corrige três vezes e na quarta desiste, rindo, e canta a minha versão.', 'He corrects me three times, and on the fourth he gives up, laughing, and sings my version.')] },
      ] } },
    { id: 'a12l', se: (st) => noBarco(st, 'lio'), zona: 'mar', agua: .7, fundo: { img: IMG('a12-lio'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Lio fica perto de mim no escuro. Já perguntou três coisas e quer perguntar a quarta.', 'Lio stays close to me in the dark. He has asked three things already and wants to ask a fourth.'),
        T('— Em Redom chove, Madrinha?', '— Does it rain in Redom, Godmother?'),
      ],
      escolha: { id: 'n_lio', opcoes: [
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.lio, txt: T('Chove. Chuva de água doce, que você nunca provou.', 'It does. Sweet-water rain, which you have never tasted.'), resultado: [T('Ele abre a boca para o céu sem nuvem, para treinar.', 'He opens his mouth to the cloudless sky, to practice.')] },
        { id: 'fria', fala: true, tom: 'fria', aviso: AV.lio, txt: T('Não sei. Nunca fui.', 'I don’t know. I’ve never been.'), resultado: [T('— Nem a senhora? — Ele ri, contente, porque achou uma coisa que a gente não sabe juntos.', '— Not even you? — He laughs, pleased, because he has found something we don’t know together.')] },
        { id: 'diverte', fala: true, tom: 'divertida', aviso: AV.lio, txt: T('Lá chove sal. Por isso eles são tão secos.', 'Over there it rains salt. That’s why they’re so dry.'), resultado: [T('Ele acredita por um momento, e depois finge que não acreditou.', 'He believes it for a moment, and then pretends he didn’t.')] },
      ] } },
    { id: 'a12t', se: (st) => noBarco(st, 'teshka'), zona: 'mar', agua: .7, fundo: { img: IMG('a12-teshka'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Teshka limpa a faca na proa. Limpa quando pensa, e hoje pensa muito.', 'Teshka cleans her knife at the bow. She cleans it when she thinks, and tonight she thinks a lot.'),
        T('— Quanto paga, Madrinha? Até agora a senhora não disse.', '— What does it pay, Godmother? You still haven’t said.'),
      ],
      escolha: { id: 'n_teshka', opcoes: [
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.teshka, txt: T('O que você quiser, quando voltarmos.', 'Whatever you want, when we get back.'), resultado: [T('Ela guarda a faca. Faz a conta de um barco novo e gosta do número.', 'She sheathes the knife. She works out the price of a new boat and likes the number.')] },
        { id: 'fria', fala: true, tom: 'fria', aviso: AV.teshka, txt: T('Nada. Você veio porque quis.', 'Nothing. You came because you wanted to.'), resultado: [T('— Vim — ela diz, e volta a limpar a faca com mais cuidado.', '— I did — she says, and goes back to cleaning the knife, more carefully.')] },
        { id: 'diverte', fala: true, tom: 'divertida', aviso: AV.teshka, txt: T('Paga uma história. Você vai contar para os netos.', 'It pays a story. You’ll tell it to your grandchildren.'), resultado: [T('— Eu não tenho netos. — Ela pensa. — Ainda.', '— I don’t have grandchildren. — She thinks. — Yet.')] },
      ] } },
    { id: 'a12n', se: (st) => noBarco(st, 'nhale'), zona: 'mar', agua: .8, fundo: { img: IMG('a12-nhale'), dim: .45, lado: 'dir', foco: '35% 55%' },
      texto: [
        T('Nhalé passa a noite embaixo do barco. De vez em quando bate na quilha, três batidas, para dizer que está ali.', 'Nhalé spends the night under the boat. Every so often she knocks on the keel, three knocks, to say she is there.'),
        T('Sobe uma vez, só o rosto, e pergunta se a gente da terra tem cheiro.', 'She comes up once, only her face, and asks if land people have a smell.'),
      ],
      escolha: { id: 'n_nhale', opcoes: [
        { id: 'doce', gesto: true, tom: 'doce', aviso: AV.nhale, txt: T('Bater de volta, três vezes.', 'Knock back, three times.'), resultado: [T('Ela responde com três, e depois com mais três. Ficamos assim até o sol.', 'She answers with three, and then three more. We stay like that until the sun.')] },
        { id: 'fria', gesto: true, tom: 'fria', aviso: AV.nhale, txt: T('Não responder.', 'Don’t answer.'), resultado: [T('Ela espera a resposta um pouco, e depois afunda sem fazer barulho.', 'She waits a little for an answer, and then sinks without a sound.')] },
        { id: 'diverte', fala: true, tom: 'divertida', aviso: AV.nhale, txt: T('Têm. Cheiram a pão queimado e a pressa.', 'They do. They smell of burnt bread and hurry.'), resultado: [T('Ela ri dentro d’água, e o riso sobe em bolhas.', 'She laughs underwater, and the laugh comes up in bubbles.')] },
      ] } },
    { id: 'a12b', se: (st) => noBarco(st, 'brann'), zona: 'mar', agua: .7, fundo: { img: IMG('a12-brann'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Brann engraxa a besta no colo e me olha de lado.', 'Brann greases the crossbow in his lap and watches me sideways.'),
        T('— Aposto uma moeda que a senhora dorme antes de a lua sair.', '— I bet a coin you’ll be asleep before the moon’s up.'),
      ],
      escolha: { id: 'n_brann', opcoes: [
        { id: 'doce', gesto: true, tom: 'doce', aviso: AV.brann, txt: T('Aceitar e perder de propósito.', 'Accept, and lose on purpose.'), resultado: [T('Fecho os olhos antes da lua. Ele ganha a moeda e passa o resto da noite desconfiado de ter ganhado.', 'I close my eyes before the moon. He wins the coin and spends the rest of the night suspicious of having won.')] },
        { id: 'fria', fala: true, tom: 'fria', aviso: AV.brann, txt: T('Eu não durmo, Brann.', 'I don’t sleep, Brann.'), resultado: [T('— Todo mundo dorme. — Ele espera a lua. A lua sai, e eu continuo olhando para ele.', '— Everybody sleeps. — He waits for the moon. The moon comes up, and I am still looking at him.')] },
        { id: 'diverte', gesto: true, tom: 'divertida', aviso: AV.brann, txt: T('Apostar a moeda com o rosto da Laura.', 'Bet the coin with Laura’s face.'), resultado: [T('Ele olha a moeda e não aposta. — Essa vale mais que eu.', 'He looks at the coin and doesn’t bet. — That one’s worth more than me.')] },
      ] } },

    // ===================================================== PARTE II · A SENTENÇA
    { id: 'p2', parte: T('II · A Sentença', 'II · The Sentence'), zona: 'mar', agua: .7, fundo: { img: IMG('b01-mar'), dim: .55 },
      cartao: { num: T('Parte II', 'Part II'), nome: T('A Sentença', 'The Sentence'), epigrafe: T('Redom não afunda pirata. Redom enforca.', 'Redom doesn’t sink pirates. Redom hangs them.'), fonte: T('dito da Orla', 'saying of the Shore') } },

    { id: 'b01', zona: 'mar', agua: .7, fundo: { video: VID('b01-mar'), img: IMG('b01-mar'), dim: .45, foco: '55% 50%' },
      texto: [
        T('Dois dias de mar. A tripulação quer a rota escondida, pelos recifes, para chegar a Redom sem ser vista. Eu mando seguir pelo Canal das Garças.', 'Two days of sea. The crew wants the hidden route, through the reefs, to reach Redom unseen. I order them through the Heron Channel.'),
        (st) => (noBarco(st, 'teshka') ? T('Teshka é a primeira a entender, e para de limpar a faca. — Esse é o canal da galera.', 'Teshka is the first to understand, and stops cleaning her knife. — That’s the galley’s channel.')
          : noBarco(st, 'maru') ? T('Maru é o primeiro a entender, e para de cantar. — Esse é o canal da galera, Madrinha.', 'Maru is the first to understand, and stops singing. — That’s the galley’s channel, Godmother.')
            : noBarco(st, 'brann') ? T('Brann é o primeiro a entender, e ri pelo canto da boca. — Esse é o canal da galera.', 'Brann is the first to understand, and laughs out of the side of his mouth. — That’s the galley’s channel.')
              : T('Lio não entende. Nhalé entende por ele e bate na quilha com força, de baixo.', 'Lio doesn’t understand. Nhalé understands for him and knocks hard on the keel from below.')),
        se((st) => !!st.f.rotaSentenca, T('O menino da água de Alvena contou nove dias. Hoje é o nono.', 'The water boy in Alvena counted nine days. Today is the ninth.')),
      ] },

    { id: 'b02', zona: 'galera', agua: .7, fundo: { video: VID('b02-sentenca'), img: IMG('b02-sentenca'), dim: .4, foco: '60% 45%' },
      texto: [
        T('A Sentença aparece no fim da tarde. Três mastros, um costado de madeira escura e duas fileiras de besteiros no convés. Ao lado dela, o nosso barco é uma casca de noz.', 'The Sentence appears at the end of the afternoon. Three masts, a hull of dark timber, and two rows of crossbowmen on deck. Beside her, our boat is a nutshell.'),
        T('A tripulação implora para virar. Eu quero ser vista.', 'The crew begs to turn back. I want to be seen.'),
      ],
      escolha: { id: 'ordem', pergunta: T('O que eu digo a eles?', 'What do I tell them?'), opcoes: [
        { id: 'mentira', fala: true, tom: 'doce', aviso: AV.trip, txt: T('Ninguém morre hoje.', 'No one dies today.'),
          resultado: (st) => [noBarco(st, 'lio') ? T('Eles acreditam, porque sou eu quem diz. Lio até sorri.', 'They believe me, because I’m the one saying it. Lio even smiles.') : T('Eles acreditam, porque sou eu quem diz.', 'They believe me, because I’m the one saying it.')] },
        { id: 'verdade', fala: true, tom: 'fria', aviso: AV.trip, txt: T('Eu preciso que me vejam. Vocês, não.', 'I need them to see me. Not you.'),
          resultado: [T('Eles não entendem e obedecem assim mesmo. Nenhum deles pergunta o que eu quis dizer.', 'They don’t understand, and they obey anyway. None of them asks what I meant.')] },
        { id: 'olhar', gesto: true, tom: 'cruel', aviso: AV.trip, txt: T('Olhar para cada um até que abaixem os olhos.', 'Look at each one until they lower their eyes.'),
          resultado: [T('Um por um, eles abaixam os olhos. O último abaixa porque os outros abaixaram.', 'One by one, they lower their eyes. The last one lowers his because the others did.')] },
      ] } },

    { id: 'b03', zona: 'galera', agua: .9, fundo: { img: IMG('s03-costado'), dim: .4, foco: '50% 40%' },
      texto: [
        T('A galera vira o costado para nós. Os besteiros erguem as armas. Eu fico de pé na proa.', 'The galley turns her broadside to us. The crossbowmen raise their weapons. I stand at the bow.'),
        T('O mar fica parado. Prende a respiração junto comigo.', 'The sea goes still. It holds its breath with me.'),
      ],
      minijogo: 'mao', jogoId: 'mao', mgDica: T('Um toque. Você escolhe quando.', 'One tap. You choose when.'),
      aoTerminar: (st) => { st.f.naufragio = true; },
      depois: (st) => [
        ...(J(st, 'mao').quando === 'cedo' ? [
          T('O mar recua de baixo dos dois barcos, como um lençol puxado. Depois volta em pé.', 'The sea draws back from under both ships, like a sheet pulled away. Then it comes back standing.'),
          V('D08', T('A água sobe pelo costado da Sentença e passa por cima de nós primeiro. É a minha água que leva a tripulação.', 'The water climbs the Sentence’s side and goes over us first. It is my water that takes the crew.')),
        ] : [
          T('A salva desce sobre o nosso convés. Eu espero a segunda. Só então abro a mão.', 'The volley comes down on our deck. I wait for the second. Only then do I open my hand.'),
          V('D09', T('O mar volta em pé, por cima de tudo. Os meus já estavam no chão quando a água chegou.', 'The sea comes back standing, over everything. My people were already down when the water arrived.')),
        ]),
        T('A Sentença não afunda. Fica adernada, com o costado quebrado. Era preciso que ela continuasse boiando.', 'The Sentence doesn’t sink. She lists, her side broken. She needed to stay afloat.'),
      ] },

    { id: 'b04', zona: 'mar', agua: 1, veste: 'ela', fundo: { img: IMG('b04-destrocos'), dim: .5, foco: '55% 50%' },
      texto: (st) => {
        const t = [], e = st.escolhas, cedo = J(st, 'mao').quando === 'cedo';
        if (noBarco(st, 'maru')) t.push({ t: { doce: T('Maru afunda com a mão no leme, ainda cantando. A canção para no meio, que é onde ela sempre recomeçava.', 'Maru goes down with his hand on the tiller, still singing. The song stops in the middle, which is where it always started over.'), fria: T('Maru afunda com a mão no leme e o olho bom aberto, olhando para mim.', 'Maru goes down with his hand on the tiller and his good eye open, looking at me.') }[e.n_maru] || T('Maru afunda com a mão no leme. A última coisa que eu ouço dele é a letra certa da canção.', 'Maru goes down with his hand on the tiller. The last thing I hear from him is the right words of the song.') });
        if (noBarco(st, 'lio')) t.push({ t: e.ordem === 'mentira' ? T('Lio boia de costas, com a boca aberta, igual na escada do cais. Eu disse a ele que hoje não. Ele acreditou até o fim.', 'Lio floats on his back, mouth open, just as on the dock stairs. I told him not today. He believed it to the end.') : T('Lio boia de costas, com a boca aberta, igual na escada do cais.', 'Lio floats on his back, mouth open, just as on the dock stairs.') });
        if (noBarco(st, 'teshka')) t.push({ t: { fria: T('Teshka tenta virar o cúter até o fim. Morre com a faca limpa na mão.', 'Teshka tries to bring the cutter about until the end. She dies with the clean knife in her hand.'), doce: T('Teshka morre sem saber quanto pagava.', 'Teshka dies without knowing what it paid.') }[e.n_teshka] || T('Teshka morre rindo de raiva, com a faca na mão.', 'Teshka dies laughing with rage, knife in hand.') });
        if (noBarco(st, 'nhale')) t.push({ t: e.n_nhale === 'doce' ? T('Nhalé bate na quilha por baixo, três vezes. Eu bato de volta. Ela não responde mais.', 'Nhalé knocks on the keel from below, three times. I knock back. She doesn’t answer again.') : T('Nhalé bate na quilha por baixo, três vezes, e depois uma, e depois para.', 'Nhalé knocks on the keel from below, three times, then once, then stops.') });
        if (noBarco(st, 'brann')) t.push({ t: cedo ? T('Brann ainda tem a besta erguida quando a água chega. Não chega a atirar.', 'Brann still has his crossbow raised when the water comes. He never gets the shot off.') : T('Brann atira até o fim e acerta um soldado no pescoço antes de cair.', 'Brann shoots to the end and hits a soldier in the neck before he falls.') });
        return t.map((x) => x.t);
      },
      escolha: { id: 'rosto', pergunta: (st) => T('O último estende a mão para mim, na água.', 'The last one reaches for me, in the water.'), opcoes: [
        { id: 'pegar', gesto: true, tom: 'doce', txt: T('Pegar a mão.', 'Take the hand.'), resultado: [T('Pego. A mão aperta a minha e vai afrouxando, e eu seguro até não ter mais o que segurar.', 'I take it. The hand squeezes mine and slowly loosens, and I hold on until there is nothing left to hold.')] },
        { id: 'ver', gesto: true, tom: 'fria', txt: T('Ver afundar.', 'Watch it go under.'), resultado: [T('Vejo. A água fecha em cima, e fecha bem.', 'I watch. The water closes over, and closes well.')] },
        { id: 'decorar', gesto: true, tom: 'cruel', txt: T('Decorar o rosto.', 'Learn the face by heart.'), resultado: [T('Decoro. Os cílios, a cicatriz, a última coisa que a boca tenta dizer. Guardo junto com os outros.', 'I learn it. The lashes, the scar, the last thing the mouth tries to say. I keep it with the others.')] },
      ] } },

    { id: 'b04b', zona: 'mar', agua: 1, fundo: { img: IMG('b04-destrocos'), dim: .62 },
      afoga: { filtro: (a) => [AV.maru, AV.lio, AV.teshka, AV.nhale, AV.brann, AV.trip].includes(a), ultimo: AV.ninguem, ms: 900 },
      texto: [T('Uma seta de besta entra no meu ombro, e eu continuo viva, boiando entre eles.', 'A crossbow bolt goes into my shoulder, and I stay alive, floating among them.')] },

    { id: 'b05', zona: 'conves', agua: .4, fundo: { img: IMG('s05-conves'), dim: .45, foco: '50% 35%' },
      texto: [
        T('Um gancho me puxa para o convés da Sentença. Deixo o corpo mole, a boca entreaberta, um olho meio fechado.', 'A hook drags me onto the Sentence’s deck. I let my body go slack, mouth half open, one eye half shut.'),
        V('D10', T('Estou morta. Os mortos têm toda a paciência do mundo.', 'I am dead. The dead have all the patience in the world.')),
      ],
      minijogo: 'morta', jogoId: 'morta', mgDica: '',
      depois: (st) => {
        const m = J(st, 'morta');
        return m.toques >= 2 ? [T('A dor fica no ombro, quente. Guardo a dor também.', 'The pain stays in my shoulder, hot. I keep the pain too.')]
          : m.toques === 1 ? [T('Um dedo só. Depois disso, nada.', 'One finger. After that, nothing.')]
            : [T('Não me mexo uma vez. Cada coisa que eles dizem cai em mim como moeda num poço.', 'I don’t move once. Everything they say falls into me like coins into a well.')];
      } },

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
        G(['wim', 'garrick', 'pell', 'dunstan'], T('Aprendo os quatro pelo som dos passos. Um cantarola. Um desce e nunca olha para dentro da cela. Um reza na volta. Um conta moedas no bolso, degrau por degrau.', 'I learn the four by the sound of their steps. One hums. One comes down and never looks into the cell. One prays on the way back. One counts coins in his pocket, step by step.')),
      ],
      escolha: { id: 'carcereiro', pergunta: T('Com quem eu falo?', 'Whom do I talk to?'), opcoes: [
        { id: 'wim', gesto: true, tom: 'divertida', txt: T('Cantar junto com o que cantarola.', 'Sing along with the one who hums.'),
          resultado: [T('Na terceira descida, Wim para de cantarolar para ouvir a minha voz. Depois fala, para não ficar quieto.', 'On his third trip down, Wim stops humming to hear my voice. Then he talks, so as not to be quiet.'), T('— A Lâmina desce sozinha, sabia? Sempre. Nunca manda outro no lugar dela.', '— The Blade comes down alone, you know? Always. Never sends anyone in her place.')] },
        { id: 'garrick', gesto: true, tom: 'fria', txt: T('Perguntar ao que nunca olha por que ele não olha.', 'Ask the one who never looks why he doesn’t.'),
          resultado: [T('— O comandante Simon dizia que dá azar olhar conjuradora nos olhos — diz Garrick, de costas. — Servi com ele, antes. Era homem de dividir o pão com quem estava de guarda.', '— Commander Simon used to say it’s bad luck to look a conjurer in the eye — says Garrick, with his back to me. — I served under him, before. He was a man who shared his bread with whoever stood watch.')] },
        { id: 'pell', gesto: true, tom: 'doce', txt: T('Rezar alto, para o que reza ouvir.', 'Pray out loud, for the one who prays to hear.'),
          resultado: [T('Pell para no degrau. Uma conjuradora rezando para a Juíza é coisa que ele precisa corrigir.', 'Pell stops on the step. A conjurer praying to the Judge is something he has to correct.'), T('— A Juíza pesa todo mundo. Até a Lâmina. Até você.', '— The Judge weighs everyone. Even the Blade. Even you.')] },
        { id: 'dunstan', gesto: true, tom: 'divertida', txt: T('Pedir ao que conta moedas que me venda uma vela.', 'Ask the one who counts coins to sell me a candle.'),
          resultado: [T('— Com que dinheiro, peixe? — Mas ele para, porque dinheiro é a única conversa que ele não recusa.', '— With what money, fish? — But he stops, because money is the one conversation he never refuses.'), T('— Sabe quanto custa uma galera parada na costa de vocês? Mais que uma aldeia por ano. Uma galera por aldeia. E a gente aqui sem soldo.', '— You know what a galley sitting off your coast costs? More than a village a year. A galley for every village. And us down here without pay.')] },
      ] } },

    { id: 'c02', zona: 'ala', agua: 0, sal: .25, pedra: true, dor: true, fundo: { img: IMG('c02-cela'), dim: .45, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('A cada tantas horas, sem padrão, um deles desce e bate nas grades com uma vara. Às vezes em mim. É para a cabeça nunca achar o silêncio de que precisa para conjurar.', 'Every so many hours, with no pattern, one of them comes down and beats the bars with a rod. Sometimes me. It is so my head never finds the silence it needs to conjure.'),
        V('D14', T('Redom se protege de mim com método. Gosto de método.', 'Redom guards itself against me with method. I like method.')),
        T('Sem rosto emprestado, as minhas orelhas falam por mim. Abrem quando alguma coisa me interessa e colam no crânio quando alguma coisa é perigosa. Não mando nelas.', 'Without a borrowed face, my ears speak for me. They open when something interests me and press flat to my skull when something is dangerous. I don’t command them.'),
        T('Conto os dias pelo pão. Sete pães.', 'I count the days by the bread. Seven loaves.'),
      ] },

    { id: 'c03', zona: 'ala', agua: 0, sal: .25, pedra: true, sons: [{ sfx: 'porta-cela', p: 0, v: .7 }], fundo: { img: IMG('c03-laura'), dim: .42, foco: '60% 40%' },
      texto: [
        T('No oitavo pão a porta abre sem bater, porque a porta é dela.', 'On the eighth loaf the door opens without a knock, because the door is hers.'),
        T('Ela tem o rosto da moeda, mas a moeda mentiu nos olhos. São verdes. O cabelo é cor de trigo, solto, de quem não teve tempo de prender. Tem calos nas mãos e olheiras de quem não dorme. Nenhuma coroa. Uma faixa escura amarrada no braço.', 'She has the face from the coin, but the coin lied about the eyes. They are green. Her hair is the color of wheat, loose, like someone who had no time to tie it. She has calluses on her hands and the shadows of someone who doesn’t sleep. No crown. A dark band tied around her arm.'),
        (st) => (consorte(st) === 'markus' ? T('Atrás dela, na porta, um homem alto com a mão no punho da espada. Ela não olha para ele, e ele não olha para outra coisa que não seja ela.', 'Behind her, in the doorway, a tall man with his hand on his sword hilt. She doesn’t look at him, and he looks at nothing but her.')
          : consorte(st) === 'justine' ? T('Atrás dela, uma mulher de pena entre os dentes e um livro aberto no braço. Escreve antes de a Laura falar.', 'Behind her, a woman with a quill between her teeth and a book open on her arm. She writes before Laura speaks.')
            : T('Atrás dela, um oficial velho com uma pena e um livro aberto no braço.', 'Behind her, an old officer with a quill and a book open on his arm.')),
        V('D15', T('Ela conta. A boca não se mexe, mas os olhos param em mim a cada tantas coisas, e eu ainda não descobri o que ela está contando.', 'She counts. Her lips don’t move, but her eyes stop on me every so many things, and I haven’t worked out yet what she is counting.')),
        T('A vara desce nas grades no meio da primeira pergunta.', 'The rod comes down on the bars in the middle of the first question.'),
        V(null, T('— Parem com isso. Quero ela pensando.', '— Stop that. I want her thinking.')),
      ] },

    { id: 'c04', zona: 'ala', agua: 0, sal: .25, pedra: true, fundo: { img: IMG('c-laura'), dim: .45, foco: '62% 40%' },
      texto: [
        T('Ela puxa um banco e senta na minha frente, perto o bastante para eu sentir o cheiro de óleo de lâmina nas mãos dela.', 'She pulls up a stool and sits in front of me, close enough for me to smell the blade oil on her hands.'),
        T('Sem rosto emprestado, só tenho a boca. E as orelhas, que não são minhas.', 'Without a borrowed face, I have only my mouth. And my ears, which aren’t mine.'),
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
        T('Na porta, ela para e se vira.', 'At the door, she stops and turns.'),
        V(null, T('— Os olhos de vocês são amarelos. Os seus, não.', '— Your people’s eyes are yellow. Yours aren’t.')),
        T('Ela não espera resposta. A porta fecha sem bater, do jeito que abriu.', 'She doesn’t wait for an answer. The door shuts without a sound, the way it opened.'),
        G('laura', T('O cartão dela entra na Coleção sozinho, sem eu pedir. É o único em que eu não sei o que a pessoa quer.', 'Her card goes into the Collection on its own, without my asking. It is the only one where I don’t know what the person wants.')),
      ] },

    // ===================================================== PARTE IV · OS PEQUENOS
    { id: 'p4', parte: T('IV · Os Pequenos', 'IV · The Small Folk'), zona: 'capital', agua: .25, sal: .3, pedra: false, fundo: { img: IMG('d03-capital'), dim: .55 },
      cartao: { num: T('Parte IV', 'Part IV'), nome: T('Os Pequenos', 'The Small Folk'), epigrafe: T('Os pequenos dizem a verdade sobre os grandes.', 'The small tell the truth about the great.'), fonte: T('dito de Nove Mastros', 'saying of Nine Masts') } },

    // sumir: o custo depende dos termos
    { id: 'd01p', se: (st) => termos(st) === 'palavra', zona: 'estrada', agua: .3, sal: .3, pedra: false, veste: 'ela', fundo: { img: IMG('d01-estalagem'), dim: .5, foco: '55% 45%' },
      texto: [
        T('Dois cavaleiros me levam pela estrada da costa. Na beira da estrada, tiram as argolas, porque a Lâmina mandou, e a pele dos pulsos volta a respirar.', 'Two knights take me down the coast road. At the roadside they take off the shackles, because the Blade ordered it, and the skin of my wrists breathes again.'),
        (st) => (tem(st, 'mira') ? T('Na primeira estalagem eles dormem com o rosto virado para a porta, como a moça da casa da Ondina disse que os de Redom dormem.', 'At the first inn they sleep with their faces to the door, just as the girl from Ondina’s house said Redom’s men sleep.') : T('Na primeira estalagem eles dormem com o rosto virado para a porta.', 'At the first inn they sleep with their faces to the door.')),
        G('criada', T('Quem não dorme é a criada, Greta, que limpa a cozinha cantando baixo. Vi e ouvi.', 'The one who isn’t asleep is the maid, Greta, who cleans the kitchen singing softly. I saw and I heard.')),
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
          resultado: [{ t: T('Ele entra no beco atrás de mim, porque é o trabalho dele. Não sai. Saio eu, com o rosto da moça da capa, que vi de passagem.', 'He follows me into the alley, because that is his job. He doesn’t come out. I do, in the face of the girl with the cloak, whom I saw in passing.'), veste: 'capa' }] },
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
        T('Uma Nymae ajoelhada para uma criada de Redom, no meio da rua. Isso é perigoso.', 'A Nymae on her knees to a Redom maid, in the middle of the street. That is dangerous.'),
      ],
      escolha: { id: 'lavadeira', pergunta: T('A lavadeira', 'The washerwoman'), opcoes: [
        { id: 'levantar', gesto: true, tom: 'doce', alarme: 1, aviso: AV.lavadeira, txt: T('Levantá-la e seguir.', 'Lift her up and walk on.'),
          resultado: [T('Ponho a mão embaixo do braço dela e levanto. Ela me deixa ir sem dizer nada. Talvez diga depois, a alguém. Talvez não.', 'I put my hand under her arm and lift her. She lets me go without a word. Maybe she’ll say something later, to someone. Maybe not.')] },
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
              : T('No conselho, dizem, foi ela mesma quem decidiu, sem ouvir ninguém. Eu sei que não foi assim.', 'In council, they say, she decided it herself, without listening to anyone. I know it wasn’t like that.'),
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
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'doce', testemunha: 1, txt: T('Pedir, perto demais.', 'Ask, standing too close.'), resultado: (st) => [{ t: T('Ganho a roupa e um lugar no fogo. Perco um pouco do segredo, que fica com quem me deu.', 'I win the clothes and a place by the fire. I lose a little of the secret, which stays with whoever gave them to me.'), veste: st.escolhas.disfarce }] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'cruel', corpos: 1, alarme: 2, txt: T('Não deixar a quem dar falta.', 'Leave no one to miss them.'), resultado: (st) => [{ t: T('Uma carroça de feno guarda o resto. O feno vai até a Boca Seca, e a Boca Seca não devolve nada.', 'A hay wagon keeps the rest. The hay goes to the Dry Mouth, and the Dry Mouth gives nothing back.'), veste: st.escolhas.disfarce }] },
      ] } },

    { id: 'e03', zona: 'coluna', agua: .08, sal: .66, fundo: { img: IMG('e03-odres'), dim: .45, foco: '55% 50%' },
      texto: [
        T('Os servos recebem um odre cada um. Cheio, ele pesa como um gato no ombro.', 'The servants are given one waterskin each. Full, it weighs like a cat on your shoulder.'),
        T('O meu corpo foi feito para outra água. Faço a conta e não gosto do resultado.', 'My body was made for other water. I do the sum and don’t like the answer.'),
      ],
      escolha: { id: 'agua', pergunta: T('A água', 'The water'), opcoes: [
        { id: 'um', gesto: true, txt: T('Um odre, como todo mundo.', 'One waterskin, like everyone.'), resultado: [T('Um odre. O resto, eu aguento. Ou não.', 'One skin. The rest, I’ll bear. Or I won’t.')] },
        { id: 'escondida', gesto: true, alarme: 1, txt: T('Dois odres e uma bexiga escondida debaixo da roupa.', 'Two skins and a bladder hidden under my clothes.'), resultado: [T('A bexiga faz um volume que um olho bom acharia estranho. Os olhos daqui não são bons. Por enquanto.', 'The bladder makes a lump a good eye would find odd. The eyes here are not good. Not yet.')] },
        { id: 'cochos', gesto: true, txt: T('Nada além do que os outros levam. Beber dos cochos dos cavalos.', 'Nothing beyond what the others carry. Drink from the horses’ troughs.'), resultado: [T('Os cavalos não vão se importar. Os homens, se virem, vão.', 'The horses won’t mind. The men, if they see, will.')] },
      ] } },

    { id: 'e04', zona: 'coluna', agua: .06, sal: .72, fundo: { img: IMG('e04-revista'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        G('intendente', T('Na revista dos servos, um intendente passa pela fila puxando os queixos para a luz. Olha os dentes, como se olham os de um cavalo.', 'At the servants’ muster, a steward walks the line pulling chins up to the light. He looks at the teeth, the way you look at a horse’s.')),
        T('Chega em mim. Os dedos dele são quentes e secos, e o sol bate direto nos meus olhos.', 'He reaches me. His fingers are hot and dry, and the sun hits my eyes full on.'),
      ],
      piscar: { id: 'p4', antes: 2, aoFalhar: (st) => { st.f.intendenteViu = true; },
        ok: [T('Fecho os olhos contra o sol, como todo mundo faz. Ele passa ao próximo.', 'I close my eyes against the sun, as everyone does. He moves on to the next.')],
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
      tripulacao: (J(st, 'tripulacao').escolhidos || []).map((k) => ({ id: k, resposta: st.escolhas['n_' + k] || null })),
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
        feito: (lang === 'en' ? 'You took ' : 'Você levou ') + lista(nomesTrip) + '. ' + (J(st, 'mao').quando === 'cedo' ? t(T('Quem os matou foi a água dela.', 'What killed them was her water.')) : t(T('Quem os matou foram as bestas de Redom, enquanto ela esperava.', 'What killed them was Redom’s crossbows, while she waited.'))),
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
    trip.forEach((k) => { const c = window.LIVRO.colecao[k]; n.push(t(c.nome).split(',')[0] + ': ' + t(c.fim(st) || c.quer).replace(/^./, (x) => x.toLowerCase())); });
    n.push((lang === 'en' ? 'Iska: ' : 'Iska: ') + t({ roubar: T('procura a camisa até hoje.', 'still looking for her shirt.'), seduzir: T('acha que sonhou.', 'thinks she dreamed it.'), matar: T('dorme embaixo de Nove Mastros.', 'sleeps under Nine Masts.') }[st.escolhas.roupa1] || T('não soube de nada.', 'never knew a thing.')));
    if (st.escolhas.lavadeira) n.push(t(T('A lavadeira', 'The washerwoman')) + ': ' + t(window.LIVRO.colecao.lavadeira.fim(st)).replace(/^./, (x) => x.toLowerCase()));
    n.push(t(T('Rostos vestidos', 'Faces worn')) + ': ' + st.vestiu.length + ' · ' + t(T('corpos que a água guardou', 'bodies the water kept')) + ': ' + st.corpos);
    n.push(t({ um: T('A água: um odre, como todo mundo.', 'The water: one skin, like everyone.'), escondida: T('A água: dois odres e uma bexiga escondida.', 'The water: two skins and a hidden bladder.'), cochos: T('A água: os cochos dos cavalos.', 'The water: the horses’ troughs.') }[st.escolhas.agua] || T('A água: a que der.', 'The water: whatever comes.')));
    const fechou = Object.values(st.piscadas).filter(Boolean).length, total = Object.keys(st.piscadas).length;
    if (total) n.push(t(T('O ouro vazou', 'The gold leaked')) + ': ' + (total - fechou) + (lang === 'en' ? ' of ' : ' de ') + total + (lang === 'en' ? ' times.' : ' vezes.'));
    const colecao = st.colecao.map((id) => ({ id, nome: t(window.LIVRO.colecao[id] ? window.LIVRO.colecao[id].nome : id) }));
    const R = {
      chefes: { doce: T('“Redom vai pagar por cada barco.”', '“Redom will pay for every boat.”'), fria: T('“Eu vou a Redom.”', '“I am going to Redom.”'), comida: T('Pediu comida e os fez esperar', 'Asked for food and made them wait') },
      ordem: { mentira: T('“Ninguém morre hoje.”', '“No one dies today.”'), verdade: T('“Eu preciso que me vejam. Vocês, não.”', '“I need them to see me. Not you.”'), olhar: T('O olhar, até abaixarem os olhos', 'The look, until they lowered their eyes') },
      rosto: { pegar: T('Pegou a mão', 'Took the hand'), ver: T('Viu afundar', 'Watched it go under'), decorar: T('Decorou o rosto', 'Learned the face') },
      carcereiro: { wim: T('Wim, o que cantarola', 'Wim, who hums'), garrick: T('Garrick, o que nunca olha', 'Garrick, who never looks'), pell: T('Pell, o que reza', 'Pell, who prays'), dunstan: T('Dunstan, o que conta moedas', 'Dunstan, who counts coins') },
      lavadeira: { levantar: T('Levantou e seguiu', 'Lifted her and walked on'), usar: T('Mandou para a coluna', 'Sent her to the column'), matar: T('A cisterna', 'The cistern') },
      disfarce: { estrebaria: T('Moço da estrebaria', 'Stable hand'), forja: T('Ajudante de ferreiro', 'Smith’s helper'), ilse: T('Ajudante de curandeiro', 'Healer’s helper'), nell: T('Moça da cozinha', 'Kitchen girl') },
      agua: { um: T('Um odre', 'One skin'), escondida: T('Água escondida', 'Hidden water'), cochos: T('Os cochos', 'The troughs') },
    };
    const Q = {
      chefes: T('Os chefes da Orla', 'The chiefs of the Shore'), ordem: T('Diante da Sentença', 'Facing the Sentence'), rosto: T('A última mão', 'The last hand'),
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
  return s.replace(/\{MASC\}/g, () => tr(CURTO[window.LIVRO.mascNoite(st, k)] || CURTO.criadaC))
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
  const ordemFim = (st) => {
    const r = J(st, 'noite' + k).resultado;
    return r === 'cheia' ? [
      T('De manhã, {LEITOR} lê os papéis na ordem que eu deixei. Começa pelo sentinela e pelo Grakh vivo, e termina na Pira indo para o norte.', 'In the morning, {LEITOR} reads the papers in the order I left them. He starts with the sentry and the Grakh alive, and ends with the Pyre moving north.'),
      T('Um velho do conselho é o primeiro a falar, e fala como se tivesse pensado sozinho:', 'An old man on the council is the first to speak, and speaks as if he had thought of it alone:'),
      { t: T('«Ele está vivo, e está fugindo. É agora ou nunca.', '«He’s alive, and he’s running. It’s now or never.') },
    ] : r === 'meia' ? [
      T('De manhã, {LEITOR} lê os papéis na ordem que eu deixei. Metade do conselho ouve "acabou", e a outra metade ouve "ainda não".', 'In the morning, {LEITOR} reads the papers in the order I left them. Half the council hears "it’s over", and the other half hears "not yet".'),
      T('Briga de conselho também empurra. Só empurra mais devagar.', 'A council quarrel pushes too. It just pushes slower.'),
    ] : [
      T('De manhã, {LEITOR} lê os papéis na ordem que eu deixei, e o conselho ouve "acabou". Respira aliviado.', 'In the morning, {LEITOR} reads the papers in the order I left them, and the council hears "it’s over". It breathes easier.'),
      T('Dei a eles a ordem que eles queriam ouvir. Esse papel vai ter de ser feito por outra boca.', 'I gave them the order they wanted to hear. This work will have to be done by another mouth.'),
    ];
  };
  const pgs = [
    { id: 'n' + k + 'd', noite: k, zona: 'capital', agua: .24 - k * .05, sal: .3 + k * .08, veste: 'criadaC', aoEntrar: (st, ctx) => ctx.guarda('criadaC', true),
      fundo: { img: IMG('n-dia' + k), dim: .45, clima: 'poeiraCal', foco: '55% 45%' },
      texto: [DIA[k]], minijogo: 'escuta', jogoId: 'dia' + k, mgNome: T('Ouvir um dos pequenos', 'Listen to one of the small'),
      depois: [T('Guardo. De noite vai servir.', 'I keep it. By night it will be useful.')] },
    { id: 'n' + k + 'a', noite: k, zona: 'noite', agua: .2 - k * .04, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .5, clima: k === 2 ? 'chuva' : null, foco: '55% 40%' },
      texto: [NT[k]],
      escolha: { id: 'alvo' + k, pergunta: T('Atrás de quem eu vou?', 'Whom do I go after?'), opcoes: [
        { id: 'circulo', se: (st) => !usado(st, 'circulo'), txt: (st) => (circulo(st) === 'justine' ? T('Justine, na capela da Juíza.', 'Justine, in the Judge’s chapel.') : T('Markus, na sala de armas.', 'Markus, in the armory.')), resultado: (st) => [circulo(st) === 'justine' ? T('A mulher que escreve antes de a Laura falar.', 'The woman who writes before Laura speaks.') : T('O homem que não olha para outra coisa que não seja ela.', 'The man who looks at nothing but her.')] },
        { id: 'joseph', se: (st) => !usado(st, 'joseph'), txt: T('Sir Joseph, na taverna dos oficiais velhos.', 'Sir Joseph, in the old officers’ tavern.'), resultado: [T('Um velho que perdeu para ela e nunca terminou de perder.', 'An old man who lost to her and never finished losing.')] },
        { id: 'varr', se: (st) => !usado(st, 'varr'), txt: T('Lorde Varr, no refeitório da infantaria.', 'Lord Varr, in the infantry mess.'), resultado: [T('O homem que vai com dois mil, se ninguém disser o contrário.', 'The man who goes with two thousand, if no one says otherwise.')] },
        { id: 'ansel', se: (st) => !usado(st, 'ansel'), txt: T('O sentinela que voltou das Goelas, na enfermaria.', 'The sentry who came back from the Gullets, in the infirmary.'), resultado: [T('Tudo o que ele diz é verdade. Melhor ainda.', 'Everything he says is true. Better still.')] },
        { id: 'mapas', se: (st) => !usado(st, 'mapas'), txt: T('A Sala dos Mapas, antes de amanhecer.', 'The Map Room, before dawn.'), resultado: [T('Lá não tem boca para trabalhar. Tem papel.', 'There’s no mouth to work there. There’s paper.')] },
      ] } },
    { id: 'n' + k + 'm', noite: k, zona: 'noite', agua: .2 - k * .04, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .58, clima: k === 2 ? 'chuva' : null },
      texto: (st) => [alvo(st) === 'mapas' ? T('A Sala dos Mapas fica no alto da Cidadela. A guarda deixa entrar quem tem a chave e um rosto que ela conhece.', 'The Map Room is high in the Citadel. The guard lets in whoever has the key and a face it knows.') : window.LIVRO.anzol[alvo(st)].lugar],
      escolha: { id: 'masc' + k, pergunta: T('Que rosto eu visto?', 'Which face do I wear?'), opcoes: Object.keys(ROT).map((id) => ({
        id, gesto: true, se: (st) => (MASC[alvo(st)] || []).includes(id) && (PASSAGEM.includes(id) || tem(st, id)), txt: ROT[id],
        aoEscolher: (st) => { if (PASSAGEM.includes(id) && !tem(st, id)) st.colecao.push(id); },
        resultado: [{ t: T('Penso em {MASC} até a pele obedecer. Obedece.', 'I think of {MASC} until my skin obeys. It does.'), veste: id }] })) } },
    { id: 'n' + k + 'r', noite: k, zona: 'noite', agua: .2 - k * .04, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .62, clima: k === 2 ? 'chuva' : null },
      texto: [T('Falta a roupa.', 'The clothes are still missing.')],
      escolha: { id: 'traje' + k, pergunta: T('A roupa de {MASC}', '{MASC}’s clothes'), opcoes: [
        { id: 'roubar', gesto: true, preco: 'roubar', tom: 'divertida', alarme: 1, txt: T('Roubar enquanto dorme.', 'Steal them while they sleep.'), resultado: [T('A roupa sai de uma cadeira, de um baú, de um prego na parede. Amanhã alguém vai dar falta e procurar.', 'The clothes come off a chair, out of a chest, off a nail on the wall. Tomorrow someone will miss them and search.')] },
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'doce', testemunha: 1, txt: T('Tirar com as minhas próprias mãos, numa porta dos fundos.', 'Take them off with my own hands, at a back door.'), resultado: [T('Saio vestida. Fica alguém lembrando de uma mulher bonita que não é de lugar nenhum.', 'I leave dressed. Someone is left remembering a beautiful woman from nowhere at all.')] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'cruel', corpos: 1, alarme: 2, txt: T('Esperar numa rua sem luz.', 'Wait in an unlit street.'), resultado: [T('A lâmina sai da manga e volta. Um bueiro da Rua das Fontes desce até a cisterna, e a água da cidade aceita.', 'The blade leaves my sleeve and comes back. A drain on Fountain Street runs down to the cistern, and the city’s water accepts.')] },
      ] } },
  ];
  if (k === 1) pgs.push({ id: 'n1p', noite: 1, zona: 'noite', agua: .16, sal: .4, fundo: { img: IMG('n-tocha'), dim: .45, foco: '55% 45%' },
    texto: [
      T('No caminho, um guarda da ronda levanta a tocha para ver quem passa.', 'On the way, a watchman raises his torch to see who is passing.'),
      T('A chama chega perto demais do meu rosto, e o calor me pega de surpresa.', 'The flame comes too close to my face, and the heat catches me by surprise.'),
    ],
    piscar: { id: 'p3', antes: 2, aoFalhar: (st) => { st.alarme += 1; },
      ok: [T('Fecho os olhos contra a luz, como todo mundo faz. Ele baixa a tocha e segue.', 'I shut my eyes against the light, as anyone would. He lowers the torch and walks on.')],
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

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
// quantos de Redom a onda leva: a primeira fileira inteira, e o que a tripulação somou
const NUM_PT = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Catorze', 'Quinze', 'Dezesseis', 'Dezessete', 'Dezoito', 'Dezenove', 'Vinte', 'Vinte e um', 'Vinte e dois', 'Vinte e três', 'Vinte e quatro', 'Vinte e cinco', 'Vinte e seis'];
const NUM_EN = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Twenty-one', 'Twenty-two', 'Twenty-three', 'Twenty-four', 'Twenty-five', 'Twenty-six'];
const CONTA = (st) => {
  const n = 14 + (maruLado(st) ? 6 : 0) + (brannAtira(st) ? 1 : 0) + (teshkaAborda(st) ? 2 : 0) + (nhaleAjuda(st) ? 3 : 0);
  return { pt: 'Conto os que vão para a água. ' + NUM_PT[n] + ' homens de Redom, com as bestas ainda carregadas.', en: 'I count the ones who go into the water. ' + NUM_EN[n] + ' men of Redom, their crossbows still loaded.' };
};
// ---------------------------------------------------------------- a trégua (Parte IV): quantos chefes ela trouxe, quanto o caderno desconfia
const trChefe = (st) => { st.f.trChefes = (st.f.trChefes || 0) + 1; };
const trSusp = (st) => { st.f.trSusp = (st.f.trSusp || 0) + 1; };

// ---------------------------------------------------------------- o método (roubar, seduzir, matar) tem consequência
// cada rosto tem um jeito certo, um meio e um errado; a pista está na descrição do rosto.
// o errado conta um erro; no terceiro erro ela é presa e o capítulo volta à saída da cela
const ERROS_MAX = 3;
const convenceu = (st) => [1, 2, 3].reduce((a, k) => a + ({ cheia: 2, meia: 1 }[J(st, 'noite' + k).resultado] || 0), 0) >= 4;
const MR = (c, pt, en) => [c, T(pt, en)];
const METODO = {
  cavalarico: {
    roubar: MR('certo', 'O Tam dorme de boca aberta no feno, e a roupa dele está pendurada no prego da baia. O cavalo cinzento me vê tirar e guarda o segredo.', 'Tam sleeps open-mouthed in the hay, and his clothes hang on the nail in the stall. The grey horse watches me take them and keeps the secret.'),
    seduzir: MR('meio', 'Ele tira a camisa sozinho, rindo, achando que tem sorte. Amanhã vai contar aos outros cavalariços da mulher bonita da baia, e os outros vão rir. Por enquanto.', 'He takes off his shirt himself, laughing, thinking he’s in luck. Tomorrow he’ll tell the other grooms about the beautiful woman in the stall, and the others will laugh. For now.'),
    matar: MR('errado', 'O feno abafa tudo. Mas antes do sol o marechal desce para ver o cavalo cinzento, como desce toda madrugada, e acha o menino.', 'The hay muffles everything. But before sunrise the marshal comes down to see the grey horse, as he does every morning, and finds the boy.'),
  },
  escudeiro: {
    roubar: MR('errado', 'São doze meninos na mesma sala, e um deles dorme mal. Acorda comigo de joelhos no baú e grita "ladrão" para a sala. Saio pela janela com a roupa, e doze bocas vão contar.', 'Twelve boys in one room, and one of them sleeps badly. He wakes to find me kneeling at the chest and shouts "thief" to the room. I leave by the window with the clothes, and twelve mouths will tell it.'),
    seduzir: MR('certo', 'Chamo o Corin para fora com um dedo. Ele vem, porque nunca foi chamado. Dá-me a roupa e a espada de pau e vai ficar calado, porque no alojamento ia virar piada: uma mulher daquelas, e justo ele.', 'I call Corin outside with one finger. He comes, because he has never been called. He gives me his clothes and the wooden sword and will keep quiet, because in the barracks it would become a joke: a woman like that, and him of all people.'),
    matar: MR('meio', 'Espero que ele saia para a latrina. Um bueiro da Rua das Fontes desce até a cisterna. De manhã, os escudeiros contam onze e acham que o décimo segundo fugiu para a coluna.', 'I wait for him to go out to the latrine. A drain on Fountain Street runs down to the cistern. In the morning the squires count eleven and decide the twelfth ran off to the column.'),
  },
  novica: {
    roubar: MR('certo', 'A irmã Ada dorme sozinha na sacristia, com o hábito dobrado no banco. Levo o hábito e deixo o banco arrumado. Amanhã ela jura que esqueceu onde pôs.', 'Sister Ada sleeps alone in the sacristy, her habit folded on the bench. I take the habit and leave the bench tidy. Tomorrow she’ll swear she forgot where she put it.'),
    seduzir: MR('errado', 'Ela me dá o hábito tremendo, e de manhã confessa tudo ao padre da Juíza, com detalhe. O padre conta à Guardiã. A Guardiã escreve.', 'She gives me the habit trembling, and in the morning she confesses everything to the Judge’s priest, in detail. The priest tells the Keeper. The Keeper writes it down.'),
    matar: MR('meio', 'A sacristia tem uma porta para o pátio, e o pátio tem um poço. De manhã a capela procura a noviça e acha que ela fugiu do voto, como fogem as noviças.', 'The sacristy has a door to the yard, and the yard has a well. In the morning the chapel looks for the novice and decides she fled her vow, as novices do.'),
  },
  dama: {
    roubar: MR('meio', 'Tiro um vestido do meio de vinte. A criada que conta os vestidos vai dar falta de um e, desta vez, culpar a lavanderia.', 'I take one gown out of twenty. The maid who counts the gowns will miss one and, this time, blame the laundry.'),
    seduzir: MR('certo', 'Digo a ela que a Guardiã precisa de alguém de confiança esta noite. Lady Elsbeth me empresta o vestido com as próprias mãos e ainda me ajuda com os laços. Vai passar a semana achando que fez parte de alguma coisa.', 'I tell her the Keeper needs someone she can trust tonight. Lady Elsbeth lends me the gown with her own hands and even helps me with the laces. She’ll spend the week believing she was part of something.'),
    matar: MR('errado', 'Aperto o laço do vestido no pescoço dela até ela parar. Uma dama da Guardiã não some quieta: de manhã a casa toda procura, e quem procura acha.', 'I tighten the gown’s lace around her neck until she stops. A lady of the Keeper’s doesn’t vanish quietly: in the morning the whole house searches, and those who search find.'),
  },
  vinho: {
    roubar: MR('certo', 'Pip dorme bêbado na adega, abraçado no vinho que rouba do velho. Tiro a roupa dele como se tira a casca de uma fruta. Ele nem muda de lado.', 'Pip sleeps drunk in the cellar, hugging the wine he steals from the old man. I peel his clothes off like the rind of a fruit. He doesn’t even turn over.'),
    seduzir: MR('meio', 'Ele me dá a roupa e um gole. Amanhã vai contar na taverna que dormiu com uma mulher de olhos de ouro, e os velhos vão rir dele. Um vai rir menos.', 'He gives me his clothes and a swallow of wine. Tomorrow he’ll tell the tavern he slept with a woman with golden eyes, and the old men will laugh at him. One will laugh less.'),
    matar: MR('errado', 'Ele não acorda nem para morrer. De manhã, o Sir Joseph pede o vinho pela esquerda, e quem serve é outro. Um velho que já foi general repara em quem falta.', 'He doesn’t wake even to die. In the morning Sir Joseph calls for wine from the left, and someone else pours. An old man who was once a general notices who is missing.'),
  },
  viuva: {
    roubar: MR('errado', 'Hilde dorme mal desde a duna. Acorda com o rangido do baú e me vê de costas, com o vestido dela na mão. Grita o nome do marido morto, e a rua acende.', 'Hilde has slept badly since the dune. She wakes at the creak of the chest and sees my back, her dress in my hand. She screams her dead husband’s name, and the street lights up.'),
    seduzir: MR('meio', 'Sento com ela e escuto a história da duna, e depois escuto de novo. Ela me dá o vestido de luto, de presente, para a moça bonita que escutou. Amanhã, na fila da pensão, vai falar de mim.', 'I sit with her and listen to the dune story, and then I listen again. She gives me her mourning dress as a gift, for the pretty girl who listened. Tomorrow, in the pension line, she’ll talk about me.'),
    matar: MR('certo', 'A Hilde não recebe visita desde a pensão. A água da cisterna aceita, e a casa dela vai ficar fechada muito tempo antes que alguém bata.', 'No one has visited Hilde since the pension. The cistern’s water accepts her, and her house will stay shut a long time before anyone knocks.'),
  },
  horne: {
    roubar: MR('errado', 'Tiro a farda dele do corpo, botão por botão, e no último ele acorda. Saio pelo telhado com a farda e um sargento gritando atrás.', 'I take his uniform off him button by button, and on the last one he wakes. I leave over the roof with the uniform and a sergeant shouting behind me.'),
    seduzir: MR('certo', 'Ele bebe sozinho depois do turno. Bebo com ele. Antes do fim da garrafa ele me dá a farda e a vergonha de amanhã, e vergonha cala a boca de um homem melhor que qualquer ordem.', 'He drinks alone after his watch. I drink with him. Before the bottle is done he gives me his uniform and tomorrow’s shame, and shame shuts a man’s mouth better than any order.'),
    matar: MR('meio', 'Espero por ele na volta do turno, numa rua sem luz. De manhã o quartel acha o sargento ali e culpa uma briga de bêbado. Alguém sabe que ele bebia sozinho.', 'I wait for him on his way back from the watch, in an unlit street. In the morning the barracks finds the sergeant there and blames a drunken brawl. Someone knows he drank alone.'),
  },
  maud: {
    roubar: MR('certo', 'Maud dorme no quarto de cima, e o guarda-roupa fica na antessala. As criadas roncam na cozinha. Saio com o vestido e com a capa, que ela nunca usa.', 'Maud sleeps upstairs, and the wardrobe stands in the anteroom. The maids snore in the kitchen. I leave with the gown and with the cloak she never wears.'),
    seduzir: MR('meio', 'Maud repara em tudo, até em mim. Empresta-me o vestido por curiosidade, e no café conta ao irmão de uma moça estranha que sabia demais sobre canções.', 'Maud notices everything, even me. She lends me the gown out of curiosity, and at breakfast she tells her brother about a strange girl who knew too much about songs.'),
    matar: MR('errado', 'Subo a escada sem acordar as criadas. Mas a irmã de um lorde não some: de manhã o Lorde Varr tem um motivo para ficar em casa, e a Capital tem uma pergunta.', 'I climb the stairs without waking the maids. But a lord’s sister doesn’t vanish: in the morning Lord Varr has a reason to stay home, and the Capital has a question.'),
  },
  bertha: {
    roubar: MR('meio', 'A porta está aberta, como sempre. Levo o vestido de luto do prego. Uma vizinha me vê sair, me toma por ladra de roupa de morto e vai comentar.', 'The door is open, as always. I take the mourning dress from the nail. A neighbor sees me leave, takes me for a thief of the dead’s clothes, and will talk.'),
    seduzir: MR('certo', 'Sento e peço que ela conte como foi. Ela conta, e chora, e me dá o xale e o vestido para eu ir rezar pelo filho dela no templo. Dorme agradecida.', 'I sit and ask her to tell me how it was. She tells it, and weeps, and gives me her shawl and her dress so I can go and pray for her son at the temple. She falls asleep grateful.'),
    matar: MR('errado', 'Ela abre a porta para mim, porque abre para todos. De tarde, o Ansel vem contar como o filho dela morreu, como vem toda tarde, e acha a casa vazia.', 'She opens the door to me, because she opens it to everyone. In the afternoon Ansel comes to tell how her son died, as he does every afternoon, and finds the house empty.'),
  },
  aldo: {
    roubar: MR('meio', 'O avental dele está no gancho da enfermaria. Um doente acordado me vê pegar e não diz nada agora. Vai dizer amanhã, ao próprio Aldo, que conversa com todos.', 'His apron hangs on the infirmary hook. A patient who is awake sees me take it and says nothing now. He’ll say it tomorrow, to Aldo himself, who talks with them all.'),
    seduzir: MR('errado', 'Ele fala comigo até o galo, de cada doente, de cada chá. De manhã vai falar de mim a cada doente, e um deles é o sentinela.', 'He talks to me until cockcrow, about every patient, every tea. In the morning he’ll talk about me to every patient, and one of them is the sentry.'),
    matar: MR('certo', 'Na enfermaria morre gente toda noite. De manhã tem um morto a mais na fileira, e quem conta os mortos não confere os nomes.', 'In the infirmary people die every night. In the morning there is one more dead man in the row, and whoever counts the dead doesn’t check the names.'),
  },
  edric: {
    roubar: MR('certo', 'Edric dorme pesado em cima da loja de tinta. Levo a roupa e a chave da Sala dos Mapas e devolvo as duas antes que ele acorde para ler.', 'Edric sleeps heavily above the ink shop. I take his clothes and the Map Room key, and I put both back before he wakes to read.'),
    seduzir: MR('errado', 'Ele me deixa entrar e conta tudo de si. Amanhã vai contar de mim a quem estiver perto, na sala do conselho, enquanto arruma a pasta que alguém mexeu.', 'He lets me in and tells me everything about himself. Tomorrow he’ll tell about me to whoever is near, in the council room, while he straightens the folder someone has touched.'),
    matar: MR('meio', 'Ele morre dormindo, em cima da tinta. Amanhã, quem lê os papéis no conselho sou eu, com a voz dele. Depois a loja fica fechada, e alguém vai perguntar por quê.', 'He dies asleep, above the ink. Tomorrow I am the one who reads the papers to the council, in his voice. Afterward the shop stays shut, and someone will ask why.'),
  },
  guarda: {
    roubar: MR('meio', 'O guarda dorme no catre do posto, e a farda de reserva está no baú. Levo. Amanhã o baú vai ter uma farda a menos, e o sargento dele conta fardas.', 'The guard sleeps on the post’s cot, and the spare uniform is in the chest. I take it. Tomorrow the chest will be one uniform short, and his sergeant counts uniforms.'),
    seduzir: MR('certo', 'Novo no posto e sozinho no turno da noite, ele me empresta a farda por uma hora e passa o resto da vida achando que sonhou.', 'New to the post and alone on the night watch. He lends me his uniform for an hour and spends the rest of his life thinking he dreamed it.'),
    matar: MR('errado', 'Ele morre no posto, sozinho, como estava. E um guarda que falta ao turno faz a Cidadela toda dobrar o turno.', 'He dies at his post, alone, as he was. And a guard who misses his watch makes the whole Citadel double the watch.'),
  },
  criadaC: {
    roubar: MR('certo', 'As criadas do palácio dormem dez num quarto e penduram a roupa no mesmo varal. Uma peça a menos no varal é coisa de todo dia.', 'The palace maids sleep ten to a room and hang their clothes on the same line. One piece less on the line happens every day.'),
    seduzir: MR('meio', 'Ela me dá a roupa e uma fofoca de graça. Amanhã vai dar a fofoca de mim para as outras nove.', 'She gives me her clothes and a piece of gossip for free. Tomorrow she’ll give the gossip about me to the other nine.'),
    matar: MR('errado', 'Espero uma delas no corredor dos banhos. Mas dez criadas dormem no mesmo quarto, e de manhã nove acordam e contam.', 'I wait for one of them in the bath corridor. But ten maids sleep in one room, and in the morning nine wake up and count.'),
  },
  moco: {
    roubar: MR('meio', 'Os moços de recados dormem num monte, embaixo da escada. Puxo uma camisa do monte, e o monte resmunga. Um deles vai lembrar de uma sombra.', 'The errand boys sleep in a heap under the stairs. I pull a shirt from the heap, and the heap grumbles. One of them will remember a shadow.'),
    seduzir: MR('certo', 'Mostro uma moeda. Ele me dá a roupa, a corrida da manhã e o nome do sargento que bate nele. Por uma moeda, esquece o resto.', 'I show him a coin. He gives me his clothes, his morning run, and the name of the sergeant who beats him. For a coin, he forgets the rest.'),
    matar: MR('errado', 'É leve de carregar até o bueiro. Mas menino de recado tem mãe, e mãe não para de procurar.', 'He is light to carry to the drain. But an errand boy has a mother, and a mother doesn’t stop looking.'),
  },
};
const METODO_C = {
  estrebaria: {
    roubar: MR('certo', 'Wil dorme no feno com os cavalos, e os cavalos me deixam passar. Amanhã ele vai sair da coluna procurando a própria camisa, e a coluna não espera.', 'Wil sleeps in the hay with the horses, and the horses let me by. Tomorrow he’ll leave the column looking for his own shirt, and the column won’t wait.'),
    seduzir: MR('meio', 'Ganho a roupa e um lugar no fogo. E alguém que vai me procurar com os olhos a viagem toda.', 'I get the clothes and a place by the fire. And someone whose eyes will look for me the whole way.'),
    matar: MR('errado', 'Uma carroça de feno guarda o resto. Mas os cavalos sentem o cheiro de sangue no feno e passam a manhã empinando, e o cavalariço-chefe quer saber por quê.', 'A hay wagon keeps the rest. But the horses smell the blood in the hay and spend the morning rearing, and the head groom wants to know why.'),
  },
  forja: {
    roubar: MR('errado', 'Bram acorda com a primeira tábua que range, de martelo na mão. Saio correndo com a roupa e ele grita "ladrão" para o acampamento.', 'Bram wakes at the first creaking board, hammer in hand. I run off with the clothes and he shouts "thief" to the camp.'),
    seduzir: MR('certo', 'Ajudo no fole até ele suar. Ele tira a camisa sozinho e me dá, para eu também não morrer de calor. Vai lembrar só disso: que fez calor.', 'I work the bellows until he sweats. He takes off his shirt himself and gives it to me, so I won’t die of the heat either. That’s all he’ll remember: that it was hot.'),
    matar: MR('meio', 'A forja é quente o bastante para não sobrar nada. De manhã o ferreiro procura o ajudante, xinga e pega outro.', 'The forge is hot enough to leave nothing. In the morning the smith looks for his helper, curses, and takes another.'),
  },
  ilse: {
    roubar: MR('certo', 'Ilse dorme sentada, cansada demais para deitar. Tiro o avental dela do banco e ela não acorda nem quando um ferido geme.', 'Ilse sleeps sitting up, too tired to lie down. I take her apron from the bench and she doesn’t wake even when a wounded man groans.'),
    seduzir: MR('meio', 'Ela me dá o avental e me ensina a enrolar atadura. De manhã vai contar ao curandeiro da moça que sabia mais que ela.', 'She gives me her apron and teaches me to roll a bandage. In the morning she’ll tell the healer about the girl who knew more than she did.'),
    matar: MR('errado', 'Faço sem barulho. Mas a vinte passos da tenda da Lâmina a guarda nunca dorme, e um dos guardas ouve.', 'I do it without a sound. But twenty paces from the Blade’s tent the guard never sleeps, and one of the guards hears.'),
  },
  nell: {
    roubar: MR('errado', 'Nell dorme com a faca do sal no avental. Acorda quando eu toco o avental, e a faca acorda antes dela. Saio com a roupa e com um corte, e a cozinha toda ouve.', 'Nell sleeps with the salt knife in her apron. She wakes when I touch the apron, and the knife wakes before she does. I leave with the clothes and a cut, and the whole kitchen hears.'),
    seduzir: MR('certo', 'Divido o sal com ela, uma pitada de cada vez, até ela rir. Ela me dá a roupa e o lugar dela perto do barril, e guarda segredo, porque nunca dividiram nada com ela.', 'I share the salt with her, a pinch at a time, until she laughs. She gives me her clothes and her place by the barrel, and keeps the secret, because no one has ever shared anything with her.'),
    matar: MR('meio', 'Os sacos de sal guardam o resto. Na cozinha falta uma moça, e o cozinheiro acha que ela fugiu da marcha, como fogem tantos.', 'The salt sacks keep the rest. The kitchen is one girl short, and the cook decides she ran from the march, as so many do.'),
  },
};
const METODO_COLUNA = (st, m) => (METODO_C[st.escolhas.disfarce] || METODO_C.estrebaria)[m];
const AVISO_ERRO = {
  1: T('A Capital começou a procurar.', 'The Capital has started looking.'),
  2: T('Mais um rastro, e a Capital me acha.', 'One more trace, and the Capital finds me.'),
};

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
    parte: 'Parte', prox: 'Próxima', tentar: 'Tentar de novo', fim: 'Encerrar o capítulo', voltar: '← Voltar', continuar: 'Continuar', oque: 'O que eu faço?', escolheu: 'Você escolheu:', silencio: 'não dizer nada', silencioR: 'Silêncio', momento: 'Momento de jogo',
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
    parte: 'Part', prox: 'Next', tentar: 'Try again', fim: 'Close the chapter', voltar: '← Back', continuar: 'Continue', oque: 'What do I do?', escolheu: 'You chose:', silencio: 'say nothing', silencioR: 'Silence', momento: 'Moment of play',
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
  aguaDe: () => 0,   // a tela só refrata quando ela está dentro d'água (cada página diz)
  salDe: () => 0,

  // o rosto dela (o medalhão sem máscara)
  rostos: { ela: { img: ROSTO('ela') } },
  // o primeiro nome de um aviso escolhe o rosto que aparece nele
  rostosAviso: { Maru: 'maru', Lio: 'lio', Teshka: 'teshka', Nhalé: 'nhale', Brann: 'brann', Laura: 'laura', 'Os Nymae': 'velha', 'A Orla': 'velha', 'The Shore': 'velha', 'A lavadeira': 'lavadeira', 'The washerwoman': 'lavadeira', Markus: 'markus', Justine: 'justine', Joseph: 'joseph', Varr: 'varr', Ansel: 'ansel' },

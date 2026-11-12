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
const NUM_PT = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Catorze', 'Quinze', 'Dezesseis', 'Dezessete', 'Dezoito', 'Dezenove', 'Vinte', 'Vinte e um', 'Vinte e dois', 'Vinte e três', 'Vinte e quatro', 'Vinte e cinco', 'Vinte e seis', 'Vinte e sete', 'Vinte e oito', 'Vinte e nove'];
const NUM_EN = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Twenty-one', 'Twenty-two', 'Twenty-three', 'Twenty-four', 'Twenty-five', 'Twenty-six', 'Twenty-seven', 'Twenty-eight', 'Twenty-nine'];
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
// como ela pega a roupa do dono do rosto, à noite. O resultado cruza o jeito do dono (sono, o que ele quer, quem está perto)
// com o rosto com que ela sai: o Bento (menino aguadeiro: entra em qualquer casa, ninguém repara) ou a Lume (Casa das Lanternas:
// ninguém diz não para ela, ninguém esquece). roubar · perto (Lume seduz; Bento engana; com o moço de recados, a Lume paga) · matar
const METODO = {
  cavalarico: {
    roubar: {
      bento: MR('certo', 'O Tam dorme de boca aberta no feno, e a roupa dele está pendurada no prego da baia. O cavalo cinzento me vê tirar e guarda o segredo.', 'Tam sleeps open-mouthed in the hay, and his clothes hang on the nail in the stall. The grey horse watches me take them and keeps the secret.'),
      lume: MR('meio', 'O Tam não acorda. Acorda o ajudante que dorme na baia do lado, e vê a Lume sair da baia do comandante. De manhã a estrebaria toda sabe.', 'Tam doesn’t wake. The helper sleeping in the next stall does, and sees Lume leave the commander’s stall. By morning the whole stable knows.'),
    },
    perto: {
      lume: MR('meio', 'Desço na baia do Tam e sento no feno junto dele, com a saia levantada até o joelho. Ele tira a camisa sozinho, rindo, achando que tem sorte. Amanhã os outros cavalariços vão saber que a Lume desceu na baia dele, e vão rir, até alguém perguntar o que a Lume foi fazer na baia do cavalo do comandante.', 'I go down to Tam’s stall and sit in the hay beside him, my skirt pulled up to the knee. He takes off his shirt himself, laughing, thinking he’s in luck. Tomorrow the other grooms will know Lume came down to his stall, and they’ll laugh, until someone asks what Lume was doing in the commander’s horse’s stall.'),
      bento: MR('meio', 'Acordo o Tam com o balde: o marechal quer o cavalo cinzento escovado antes do sol, e camisa suja na baia ele não aceita. O Tam me dá a camisa para lavar e vai escovar o cavalo de peito nu. O marechal vai perguntar por quê.', 'I wake Tam with the bucket: the marshal wants the grey horse groomed before sunrise, and won’t have a dirty shirt in the stall. Tam gives me the shirt to wash and goes to groom the horse bare-chested. The marshal will ask why.'),
    },
    matar: MR('errado', 'Aperto o rosto do Tam contra o feno até o corpo dele amolecer. O feno abafa tudo. Mas antes do sol o marechal desce para ver o cavalo cinzento, como desce toda madrugada, e acha o rapaz.', 'I press Tam’s face into the hay until his body goes slack. The hay muffles everything. But before sunrise the marshal comes down to see the grey horse, as he does every morning, and finds the young man.'),
  },
  escudeiro: {
    roubar: {
      bento: MR('errado', 'São doze escudeiros na mesma sala, e um deles dorme mal. Acorda comigo de joelhos no baú e grita "ladrão" para a sala. Saio pela janela com a roupa, e doze bocas vão contar.', 'Twelve squires in one room, and one of them sleeps badly. He wakes to find me kneeling at the chest and shouts "thief" to the room. I leave by the window with the clothes, and twelve mouths will talk.'),
      lume: MR('errado', 'Doze escudeiros na mesma sala, e sempre tem um acordado. Uma saia vermelha entre as camas acorda os outros onze. Saio pela janela com a roupa do Corin e onze bocas para contar.', 'Twelve squires in one room, and one is always awake. A red skirt between the beds wakes the other eleven. I leave by the window with Corin’s clothes and eleven mouths to tell it.'),
    },
    perto: {
      lume: MR('certo', 'Chamo o Corin para fora com um dedo. Ele vem, porque nunca foi chamado. Me dá a roupa e a espada de pau e vai ficar calado, porque no alojamento ia virar piada: uma moça daquelas, e justo ele.', 'I call Corin outside with one finger. He comes, because he has never been called. He gives me his clothes and the wooden sword and will keep quiet, because in the barracks it would become a joke: a girl like that, and him of all people.'),
      bento: MR('meio', 'Entro com o balde e um recado: o comandante quer a roupa de gala do Corin para a coluna. Ele me entrega a roupa e a espada de pau, orgulhoso. De manhã conta aos onze que vai na coluna, e alguém vai perguntar ao comandante.', 'I come in with the bucket and a message: the commander wants Corin’s dress clothes for the column. He hands me the clothes and the wooden sword, proud. In the morning he tells the eleven he’s going with the column, and someone will ask the commander.'),
    },
    matar: MR('meio', 'Espero que ele saia para a latrina e afogo o Corin no tanque de lavar. Um bueiro da Rua das Fontes desce até a cisterna. De manhã, os escudeiros contam onze e acham que o décimo segundo fugiu para a coluna.', 'I wait for him to go out to the latrine and drown Corin in the washing trough. A drain on Fountain Street runs down to the cistern. In the morning the squires count eleven and decide the twelfth ran off to the column.'),
  },
  novica: {
    roubar: {
      bento: MR('certo', 'A irmã Ada dorme sozinha na sacristia, com o hábito dobrado no banco. Levo o hábito e deixo o banco arrumado. Amanhã ela jura que esqueceu onde pôs.', 'Sister Ada sleeps alone in the sacristy, her habit folded on the bench. I take the habit and leave the bench tidy. Tomorrow she’ll swear she forgot where she put it.'),
      lume: MR('certo', 'Porta de capela não tem tranca. A noviça dorme de terço na mão. Levo o hábito e deixo o banco como estava.', 'A chapel door has no lock. The novice sleeps with her beads in her hand. I take the habit and leave the bench as it was.'),
    },
    perto: {
      lume: MR('errado', 'Peço à noviça que ouça a confissão de uma moça da vida. Ela ouve, vermelha, e me empresta o hábito para eu rezar sem vergonha. De manhã confessa tudo ao padre da Juíza, com detalhe. O padre conta à Guardiã. A Guardiã escreve.', 'I ask the novice to hear the confession of a girl of the street. She listens, blushing, and lends me her habit so I can pray without shame. In the morning she confesses everything to the Judge’s priest, in detail. The priest tells the Keeper. The Keeper writes it down.'),
      bento: MR('meio', 'Bato na sacristia com o balde: a Guardiã quer o hábito da irmã para benzer. Ela me entrega. De manhã confessa ao padre que deu o hábito a um menino, e o padre vai perguntar à Guardiã.', 'I knock at the sacristy with the bucket: the Keeper wants the sister’s habit, to bless it. She hands it over. In the morning she confesses to the priest that she gave her habit to a boy, and the priest will ask the Keeper.'),
    },
    matar: MR('meio', 'A sacristia tem uma porta para o pátio, e o pátio tem um poço. Levo a noviça até lá pela mão, e ela vem rezando. De manhã a capela procura a noviça e acha que ela fugiu do voto, como fogem as noviças.', 'The sacristy has a door to the yard, and the yard has a well. I lead the novice there by the hand, and she comes praying. In the morning the chapel looks for the novice and decides she fled her vow, as novices do.'),
  },
  dama: {
    roubar: {
      bento: MR('meio', 'Entro com a água do banho e saio com um vestido do meio de vinte. A criada que conta os vestidos vai dar falta de um e, desta vez, culpar a lavanderia.', 'I come in with the bathwater and leave with one gown out of twenty. The maid who counts the gowns will miss one and, this time, blame the laundry.'),
      lume: MR('errado', 'A criada que conta os vestidos dorme na porta do quarto. Uma mulher pintada no corredor de uma dama da Guardiã é escândalo, e ela grita. Saio com o vestido e com a casa acordada atrás.', 'The maid who counts the gowns sleeps at the bedroom door. A painted woman in the corridor of one of the Keeper’s ladies is a scandal, and she screams. I leave with the gown and the house awake behind me.'),
    },
    perto: {
      lume: MR('errado', 'Lady Elsbeth não deixa a Lume passar da porta e manda chamar a guarda. Desço pela janela da antessala com um vestido do baú. No café, ela conta tudo à Guardiã.', 'Lady Elsbeth doesn’t let Lume past her door and calls the guard. I leave through the anteroom window with a gown from the chest. At breakfast, she tells the Keeper everything.'),
      bento: MR('certo', 'Levo um recado: a Guardiã precisa de alguém de confiança esta noite e pede o vestido azul de Lady Elsbeth para uma sobrinha. Ela me entrega o vestido com as próprias mãos. Vai passar a semana achando que fez parte de alguma coisa.', 'I bring a message: the Keeper needs someone she can trust tonight and asks for Lady Elsbeth’s blue gown for a niece. She hands me the gown with her own hands. She’ll spend the week believing she was part of something.'),
    },
    matar: MR('errado', 'Aperto o laço do vestido no pescoço dela até ela parar. Uma dama da Guardiã não some quieta: de manhã a casa toda procura, e quem procura acha.', 'I tighten the gown’s lace around her neck until she stops. A lady of the Keeper’s doesn’t vanish quietly: in the morning the whole house searches, and those who search find.'),
  },
  vinho: {
    roubar: {
      bento: MR('certo', 'Pip dorme bêbado na adega, abraçado no vinho que rouba do velho. Tiro a roupa dele como se tira a casca de uma fruta. Ele nem muda de lado.', 'Pip sleeps drunk in the cellar, hugging the wine he steals from the old man. I peel his clothes off like the rind of a fruit. He doesn’t even turn over.'),
      lume: MR('meio', 'Pip abre um olho, sorri para a Lume e volta a dormir sem a roupa. Amanhã vai jurar na taverna que a Lume desceu à adega por ele.', 'Pip opens one eye, smiles at Lume, and goes back to sleep without his clothes. Tomorrow he’ll swear at the tavern that Lume came down to the cellar for him.'),
    },
    perto: {
      lume: MR('meio', 'Desço à adega e bebo com ele no gargalo do vinho que ele rouba do velho. Ele me dá a roupa e um gole. Amanhã vai contar na taverna que dormiu com uma moça que cheirava a mar, e os velhos vão rir dele. Um vai rir menos.', 'I go down to the cellar and drink with him from the neck of the wine he steals from the old man. He gives me his clothes and a swallow of wine. Tomorrow he’ll tell the tavern he slept with a girl who smelled of the sea, and the old men will laugh at him. One will laugh less.'),
      bento: MR('meio', 'Acordo o Pip com o balde: o taverneiro quer a roupa dele lavada, de tanto vinho. Ele tira e volta a dormir. Quando acordar, vai pedir a roupa ao taverneiro, que não mandou menino algum.', 'I wake Pip with the bucket: the tavern keeper wants his clothes washed, they’re so soaked in wine. He strips and goes back to sleep. When he wakes he’ll ask the tavern keeper for his clothes, and the tavern keeper sent no boy.'),
    },
    matar: MR('errado', 'Faço o vinho derramado descer pela boca do Pip. Ele não acorda nem para morrer. De manhã, o Sir Joseph pede o vinho pela esquerda, e quem serve é outro. Um velho que já foi general repara em quem falta.', 'I make the spilled wine run down Pip’s mouth. He doesn’t wake even to die. In the morning Sir Joseph calls for wine from the left, and someone else pours. An old man who was once a general notices who is missing.'),
  },
  viuva: {
    roubar: {
      bento: MR('errado', 'Hilde dorme mal desde a duna. Acorda com o rangido do baú e me vê de costas, com o vestido dela na mão. Grita o nome do marido morto, e a rua acende.', 'Hilde has slept badly since the dune. She wakes at the creak of the chest and sees my back, her dress in my hand. She screams her dead husband’s name, and the street lights up.'),
      lume: MR('errado', 'Hilde acorda com o primeiro rangido e vê uma mulher pintada no quarto dela, com o vestido dela na mão. Grita o nome do marido morto, e a rua acende.', 'Hilde wakes at the first creak and sees a painted woman in her room, her dress in hand. She screams her dead husband’s name, and the street lights up.'),
    },
    perto: {
      lume: MR('meio', 'Sento com ela e escuto a história da duna, e depois escuto de novo. Ela me dá o vestido de luto, de presente, para a moça que escutou. Amanhã, na fila da pensão, vai falar de mim.', 'I sit with her and listen to the dune story, and then I listen again. She gives me her mourning dress as a gift, for the girl who listened. Tomorrow, in the pension line, she’ll talk about me.'),
      bento: MR('meio', 'Bato com o balde: a pensão precisa do vestido preto para costurar a fita das viúvas. Ela me entrega. Amanhã vai à pensão perguntar pela fita.', 'I knock with the bucket: the pension office needs her black dress to sew on the widows’ ribbon. She hands it over. Tomorrow she’ll go to the pension office to ask about the ribbon.'),
    },
    matar: MR('certo', 'Seguro a Hilde dentro da tina do banho até a água parar de mexer. A Hilde não recebe visita desde a pensão. A água da cisterna aceita, e a casa dela vai ficar fechada muito tempo antes que alguém bata.', 'I hold Hilde under in the bath until the water stops moving. No one has visited Hilde since the pension. The cistern’s water accepts her, and her house will stay shut a long time before anyone knocks.'),
  },
  horne: {
    roubar: {
      bento: MR('errado', 'Ele dorme de farda. Tiro botão por botão, e no último ele acorda. Saio pelo telhado com a farda e um sargento gritando atrás.', 'He sleeps in his uniform. I take it off him button by button, and on the last one he wakes. I leave over the roof with the uniform and a sergeant shouting behind me.'),
      lume: MR('errado', 'A farda está no corpo dele, e ele acorda no segundo botão. Mulher pintada no quarto de um sargento vira briga, e a briga chama a ronda. Pulo a janela com a farda, e a ronda acha um sargento de ceroulas e uma história.', 'The uniform is on his body, and he wakes at the second button. A painted woman in a sergeant’s room turns into a brawl, and the brawl brings the watch. I leave by the window with the uniform, and the watch finds a sergeant in his drawers and a story.'),
    },
    perto: {
      lume: MR('certo', 'Ele bebe sozinho depois do turno. Bebo com ele. Antes do fim da garrafa ele me dá a farda. Amanhã vai ter vergonha demais para contar a alguém.', 'He drinks alone after his watch. I drink with him. Before the bottle is done he gives me his uniform. Tomorrow he’ll be too ashamed to tell anyone.'),
      bento: MR('errado', 'Levo o recado: o quartel quer a farda dele para a revista. O Horne conhece todas as ordens do quartel, e essa não existe. Me segura pela orelha até eu morder a mão dele. Saio com a farda do cabide e um sargento gritando ladrão para a rua.', 'I bring the message: the barracks wants his uniform for inspection. Horne knows every order in the barracks, and that one doesn’t exist. He holds me by the ear until I bite his hand. I leave with the uniform from the peg and a sergeant shouting thief down the street.'),
    },
    matar: MR('meio', 'Espero por ele na volta do turno, numa rua sem luz, e quebro o pescoço dele contra o muro. De manhã o quartel acha o sargento ali e culpa uma briga de bêbado. Alguém sabe que ele bebia sozinho.', 'I wait for him on his way back from the watch, in an unlit street, and break his neck against the wall. In the morning the barracks finds the sergeant there and blames a drunken brawl. Someone knows he drank alone.'),
  },
  maud: {
    roubar: {
      bento: MR('certo', 'Entro pela cozinha com a água. A Maud dorme no quarto de cima, e o guarda-roupa fica na antessala. As criadas roncam. Saio com o vestido e com a capa, que ela nunca usa.', 'I come in through the kitchen with the water. Maud sleeps upstairs, and the wardrobe stands in the anteroom. The maids snore. I leave with the gown and with the cloak she never wears.'),
      lume: MR('meio', 'As criadas roncam, e eu saio com o vestido. Mas o cheiro de água de rosas fica na antessala, e a Maud repara em tudo. De manhã pergunta quem esteve ali.', 'The maids snore, and I leave with the gown. But the rosewater lingers in the anteroom, and Maud notices everything. In the morning she asks who was there.'),
    },
    perto: {
      lume: MR('meio', 'Bato na porta da Maud cantando baixo uma canção da Orla que ela nunca ouviu. Maud repara em tudo, até em mim. Me empresta o vestido por curiosidade, e no café conta ao irmão de uma moça estranha que sabia demais sobre canções.', 'I knock at Maud’s door, softly singing a Shore song she has never heard. Maud notices everything, even me. She lends me the gown out of curiosity, and at breakfast she tells her brother about a strange girl who knew too much about songs.'),
      bento: MR('errado', 'A Maud olha o menino de cima a baixo e pergunta de que fonte ele vem. Digo uma. Ela me entrega o vestido velho, sorrindo, e de manhã manda a criada à fonte. Lá, o Bento de verdade jura que nunca subiu aquela escada.', 'Maud looks the boy up and down and asks which fountain he comes from. I name one. She hands me the old gown, smiling, and in the morning sends her maid to the fountain. There, the real Bento swears he never climbed those stairs.'),
    },
    matar: MR('errado', 'Subo a escada sem acordar as criadas e aperto o travesseiro no rosto da Maud até ela parar. Mas a irmã de um lorde não some: de manhã o Lorde Varr tem um motivo para ficar em casa, e a Capital tem uma pergunta.', 'I climb the stairs without waking the maids and press the pillow over Maud’s face until she stops. But a lord’s sister doesn’t vanish: in the morning Lord Varr has a reason to stay home, and the Capital has a question.'),
  },
  bertha: {
    roubar: {
      bento: MR('meio', 'A porta está aberta, como sempre. Levo o vestido de luto do prego. Uma vizinha me vê sair, toma o menino por ladrão de roupa de morto e vai comentar.', 'The door is open, as always. I take the mourning dress from the nail. A neighbor sees me leave, takes the boy for a thief of the dead’s clothes, and will talk.'),
      lume: MR('meio', 'A porta está aberta. Levo o vestido preto do prego. Uma vizinha vê a Lume sair da casa da mãe do morto, e a rua vai falar disso por um mês.', 'The door is open. I take the black dress from the nail. A neighbor sees Lume leave the dead man’s mother’s house, and the street will talk about it for a month.'),
    },
    perto: {
      lume: MR('certo', 'Sento e deixo que ela conte como foi. Ela conta, e chora, e me dá o xale e o vestido para eu ir rezar pelo filho dela no templo. Dorme agradecida.', 'I sit and let her tell me how it was. She tells it, and weeps, and gives me her shawl and her dress so I can go and pray for her son at the temple. She sleeps grateful.'),
      bento: MR('meio', 'Digo que o Ansel pediu o xale para levar ao templo. Ela me dá o xale e o vestido. De tarde, pergunta ao Ansel se ele rezou.', 'I say Ansel asked for the shawl to take to the temple. She gives me the shawl and the dress. In the afternoon she asks Ansel whether he prayed.'),
    },
    matar: MR('errado', 'Ela abre a porta para mim, porque abre para todos. Fecho a porta, e fecho a boca dela com a mão até acabar. De tarde, o Ansel vem contar como o filho dela morreu, como vem toda tarde, e acha a casa vazia.', 'She opens the door to me, because she opens it to everyone. I close the door, and close her mouth with my hand until it is over. In the afternoon Ansel comes to tell how her son died, as he does every afternoon, and finds the house empty.'),
  },
  aldo: {
    roubar: {
      bento: MR('meio', 'O avental dele está no gancho da enfermaria. Um doente acordado vê o menino pegar e não diz nada agora. Vai dizer amanhã, ao próprio Aldo, que conversa com todos.', 'His apron hangs on the infirmary hook. A patient who is awake sees the boy take it and says nothing now. He’ll say it tomorrow, to Aldo himself, who talks with everyone.'),
      lume: MR('meio', 'O avental está no gancho. Um doente acordado vê uma mulher de vermelho entre as camas e acha que é o fim chegando. Conta ao Aldo quando ele acordar.', 'The apron is on the hook. A patient who is awake sees a woman in red between the beds and thinks the end has come for him. He tells Aldo when he wakes.'),
    },
    perto: {
      lume: MR('errado', 'Entro na enfermaria com um corte de mentira na mão. Ele fala comigo até o galo, de cada doente, de cada chá, e me empresta o avental para eu não sujar a saia. De manhã vai falar de mim a cada doente, e um deles é o sentinela.', 'I walk into the infirmary with a pretend cut on my hand. He talks to me until cockcrow, about every patient, every tea, and lends me his apron so I won’t soil my skirt. In the morning he’ll talk about me to every patient, and one of them is the sentry.'),
      bento: MR('errado', 'Digo que o médico do marechal pediu o avental emprestado. O Aldo me dá o avental e a vida do médico do marechal, de brinde. Amanhã vai agradecer ao médico, pessoalmente.', 'I say the marshal’s physician asked to borrow the apron. Aldo gives me the apron and the physician’s life story, free of charge. Tomorrow he’ll go thank the physician, in person.'),
    },
    matar: MR('certo', 'O Aldo dorme numa cama da fileira dos doentes. A água do jarro entra no peito dele, porque eu mando. Na enfermaria morre gente toda noite. De manhã tem um morto a mais na fileira, e quem conta os mortos não confere os nomes.', 'Aldo sleeps in a bed in the row of the sick. The water from the jug goes into his chest, because I tell it to. In the infirmary people die every night. In the morning there is one more dead man in the row, and whoever counts the dead doesn’t check the names.'),
  },
  edric: {
    roubar: {
      bento: MR('certo', 'Edric dorme pesado em cima da loja de tinta. Levo a roupa e a chave da Sala dos Mapas e devolvo as duas antes que ele acorde para ler.', 'Edric sleeps heavily above the ink shop. I take his clothes and the Map Room key, and I put both back before he wakes to read.'),
      lume: MR('meio', 'Levo a roupa e a chave. Mas a loja fica numa rua de escrivães, e um deles, voltando tarde, vê a Lume sair da porta do Edric. De manhã o Edric vai ouvir a piada, e vai contar a todos.', 'I take the clothes and the key. But the shop is on a street of clerks, and one of them, coming home late, sees Lume leave Edric’s door. In the morning Edric will hear the joke, and tell it to everyone.'),
    },
    perto: {
      lume: MR('errado', 'Bato na loja de tinta dizendo que perdi a chave de casa e que a rua está escura. Ele me deixa entrar, conta tudo de si e dorme no meio de uma frase. Saio com a roupa e com a chave. Amanhã vai contar de mim a quem estiver perto, na sala do conselho, enquanto arruma a pasta que alguém mexeu.', 'I knock at the ink shop saying I’ve lost my house key and the street is dark. He lets me in, tells me everything about himself, and falls asleep mid-sentence. I leave with the clothes and the key. Tomorrow he’ll tell about me to whoever is near, in the council room, while he straightens the folder someone touched.'),
      bento: MR('errado', 'Digo que a Cidadela quer a chave da Sala dos Mapas esta noite. O Edric não solta a chave, mas me manda escovar o casaco enquanto procura a ordem por escrito. A chave, eu tiro do bolso do casaco. Amanhã ele vai contar a todos que alguém pediu.', 'I say the Citadel wants the Map Room key tonight. Edric won’t give up the key, but sends me to brush his coat while he looks for the written order. The key I take from the coat pocket. Tomorrow he’ll tell everyone someone asked.'),
    },
    matar: MR('meio', 'Despejo a água do tinteiro na garganta dele sem tocar no tinteiro. Ele morre dormindo, em cima da tinta. Amanhã, quem lê os papéis no conselho sou eu, com a voz dele. Depois a loja fica fechada, e alguém vai perguntar por quê.', 'I pour the inkwell’s water down his throat without touching the inkwell. He dies asleep, above the ink. Tomorrow I am the one who reads the papers to the council, in his voice. Afterward the shop stays shut, and someone will ask why.'),
  },
  guarda: {
    roubar: {
      bento: MR('meio', 'O guarda dorme no catre do posto, e a farda de reserva está no baú. Levo. Amanhã o baú vai ter uma farda a menos, e o sargento dele conta fardas.', 'The guard sleeps on the post’s cot, and the spare uniform is in the chest. I take it. Tomorrow the chest will be one uniform short, and his sergeant counts uniforms.'),
      lume: MR('meio', 'Levo a farda de reserva do baú. Amanhã o sargento dele conta fardas, e o guarda lembra do cheiro de água de rosas no posto.', 'I take the spare uniform from the chest. Tomorrow his sergeant counts uniforms, and the guard remembers the smell of rosewater at the post.'),
    },
    perto: {
      lume: MR('certo', 'Paro no posto com uma lanterna apagada e peço fogo. Ele é novo no posto e está sozinho no turno da noite. Entre uma brasa e outra, me empresta a farda por uma hora e passa o resto da vida achando que sonhou.', 'I stop at the post with an unlit lantern and ask for a light. He is new to the post and alone on the night watch. Between one ember and the next, he lends me his uniform for an hour and spends the rest of his life thinking he dreamed it.'),
      bento: MR('certo', 'Levo o recado do sargento: a farda de reserva vai para a lavanderia esta noite. Ele é novo no posto e obedece a qualquer ordem. Me entrega a farda dobrada.', 'I bring the sergeant’s message: the spare uniform goes to the laundry tonight. He is new to the post and obeys any order. He hands me the uniform folded.'),
    },
    matar: MR('errado', 'Chamo a água do cantil dele para dentro do peito. Ele morre no posto, sozinho, como estava. E um guarda que falta ao turno faz a Cidadela toda dobrar o turno.', 'I call the water from his flask down into his chest. He dies at his post, alone, as he was. And a guard who misses his watch makes the whole Citadel double the watch.'),
  },
  criadaC: {
    roubar: {
      bento: MR('certo', 'As criadas do palácio dormem dez num quarto e penduram a roupa no mesmo varal. Uma peça a menos no varal é coisa de todo dia.', 'The palace maids sleep ten to a room and hang their clothes on the same line. One piece less on the line happens every day.'),
      lume: MR('certo', 'O varal das criadas fica no pátio dos fundos, longe das camas. Uma peça a menos no varal é coisa de todo dia.', 'The maids’ washing line is in the back yard, far from the beds. One piece less on the line happens every day.'),
    },
    perto: {
      lume: MR('meio', 'Ajudo a criada a recolher o varal e conto uma fofoca de um capitão da guarda. Ela me dá a roupa e uma fofoca de graça. Amanhã vai dar a fofoca de mim para as outras nove.', 'I help the maid take in the washing and tell her a piece of gossip about a captain of the guard. She gives me her clothes and a piece of gossip for free. Tomorrow she’ll give the gossip about me to the other nine.'),
      bento: MR('meio', 'Levo água para o quarto das criadas e saio com uma roupa do varal no fundo do balde. Uma delas me vê e acha graça. Amanhã vai rir com as outras nove do menino da água.', 'I carry water to the maids’ room and leave with a piece from the line at the bottom of the bucket. One of them sees me and finds it funny. Tomorrow she’ll laugh with the other nine about the water boy.'),
    },
    matar: MR('errado', 'Espero uma delas no corredor dos banhos e afogo na tina. Mas dez criadas dormem no mesmo quarto, e de manhã nove acordam e contam.', 'I wait for one of them in the bath corridor and drown her in the tub. But ten maids sleep in one room, and in the morning nine wake up and count.'),
  },
  moco: {
    roubar: {
      bento: MR('certo', 'Os moços de recados dormem num monte, embaixo da escada. Mais um menino no monte não chama atenção. Saio dele com uma camisa.', 'The errand boys sleep in a heap under the stairs. One more boy in the heap draws no notice. I come out of it with a shirt.'),
      lume: MR('meio', 'Uma saia vermelha embaixo da escada acorda o monte. Saio com uma camisa e com risada atrás. Um deles vai lembrar dela.', 'A red skirt under the stairs wakes the whole heap. I leave with a shirt and laughter behind me. One of them will remember her.'),
    },
    perto: {
      lume: MR('certo', 'Mostro uma moeda. Ele me dá a roupa, a corrida da manhã e o nome do sargento que bate nele. Por uma moeda, esquece o resto.', 'I show him a coin. He gives me his clothes, his morning run, and the name of the sergeant who beats him. For a coin, he forgets the rest.'),
      bento: MR('certo', 'Troco de camisa com ele por uma moeda, de menino para menino. Ele nem pergunta.', 'I swap shirts with him for a coin, boy to boy. He doesn’t even ask.'),
    },
    matar: MR('errado', 'Aperto o pescoço do moço até ele parar de chutar. É leve de carregar até o bueiro. Mas menino de recado tem mãe, e mãe não para de procurar.', 'I squeeze the boy’s neck until he stops kicking. He is light to carry to the drain. But an errand boy has a mother, and a mother doesn’t stop looking.'),
  },
};
const METODO_C = {
  estrebaria: {
    roubar: MR('certo', 'Wil dorme no feno com os cavalos, e os cavalos me deixam passar. Amanhã ele vai sair da coluna procurando a própria camisa, e a coluna não espera.', 'Wil sleeps in the hay with the horses, and the horses let me by. Tomorrow he’ll leave the column looking for his own shirt, and the column won’t wait.'),
    seduzir: MR('meio', 'Sento no feno do lado do Wil e rio das piadas dele. Antes da meia-noite ele me dá a camisa, para eu não passar frio. Ganho também um lugar no fogo. E alguém que vai me procurar com os olhos a viagem toda.', 'I sit in the hay beside Wil and laugh at his jokes. Before midnight he gives me his shirt, so I won’t be cold. I get a place by the fire too. And someone whose eyes will look for me the whole way.'),
    matar: MR('errado', 'Espero o Wil dormir e aperto o rosto dele contra o feno até ele ficar quieto. Uma carroça de feno guarda o resto. Mas os cavalos sentem o cheiro de sangue no feno e passam a manhã empinando, e o cavalariço-chefe quer saber por quê.', 'I wait for Wil to fall asleep and press his face into the hay until he goes still. A hay wagon keeps the rest. But the horses smell the blood in the hay and spend the morning rearing, and the head groom wants to know why.'),
  },
  forja: {
    roubar: MR('errado', 'Bram acorda com a primeira tábua que range, de martelo na mão. Saio correndo com a roupa e ele grita "ladrão" para o acampamento.', 'Bram wakes at the first creaking board, hammer in hand. I run off with the clothes and he shouts "thief" to the camp.'),
    seduzir: MR('certo', 'Ajudo no fole até ele suar. Ele tira a camisa sozinho e me dá, para eu também não morrer de calor. Vai lembrar só disso: que fez calor.', 'I work the bellows until he sweats. He takes off his shirt himself and gives it to me, so I won’t die of the heat either. That’s all he’ll remember: that it was hot.'),
    matar: MR('meio', 'A água do balde de têmpera sobe pela garganta do Bram. A forja é quente o bastante para não sobrar nada. De manhã o ferreiro procura o ajudante, xinga e pega outro.', 'The water from the quenching bucket climbs into Bram’s throat. The forge is hot enough to leave nothing. In the morning the smith looks for his helper, curses, and takes another.'),
  },
  ilse: {
    roubar: MR('certo', 'Ilse dorme sentada, cansada demais para deitar. Tiro o avental dela do banco e ela não acorda nem quando um ferido geme.', 'Ilse sleeps sitting up, too tired to lie down. I take her apron from the bench and she doesn’t wake even when a wounded man groans.'),
    seduzir: MR('meio', 'Ajudo a Ilse a trocar as ataduras até o fim da fila de feridos. Ela me dá o avental e me ensina a enrolar atadura. De manhã vai contar ao curandeiro da moça que sabia mais que ela.', 'I help Ilse change dressings to the end of the line of wounded. She gives me her apron and teaches me to roll a bandage. In the morning she’ll tell the healer about the girl who knew more than she did.'),
    matar: MR('errado', 'A água do balde de ataduras desce pela garganta dela, sem barulho. Mas a vinte passos da tenda da Laura a guarda nunca dorme, e um dos guardas ouve.', 'The water from the dressings bucket runs down her throat, without a sound. But twenty paces from Laura’s tent the guard never sleeps, and one of the guards hears.'),
  },
  nell: {
    roubar: MR('errado', 'Nell dorme com a faca do sal no avental. Acorda quando eu toco o avental, e a faca acorda antes dela. Saio com a roupa e com um corte, e a cozinha toda ouve.', 'Nell sleeps with the salt knife in her apron. She wakes when I touch the apron, and the knife wakes before she does. I leave with the clothes and a cut, and the whole kitchen hears.'),
    seduzir: MR('certo', 'Divido o sal com ela, uma pitada de cada vez, até ela rir. Ela me dá a roupa e o lugar dela perto do barril, e guarda segredo, porque nunca dividiram nada com ela.', 'I share the salt with her, a pinch at a time, until she laughs. She gives me her clothes and her place by the barrel, and keeps the secret, because no one has ever shared anything with her.'),
    matar: MR('meio', 'Encho o peito da Nell com a água do barril, devagar, para a faca dela não acordar. Os sacos de sal guardam o resto. Na cozinha falta uma moça, e o cozinheiro acha que ela fugiu da marcha, como fogem tantos.', 'I fill Nell’s chest with the barrel’s water, slowly, so her knife won’t wake. The salt sacks keep the rest. The kitchen is one girl short, and the cook decides she ran from the march, as so many do.'),
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
// a noite do Varr: a Madrinha está com o rosto da Maud, a irmã dele?
const euMaud = (st) => { const k = [1, 2, 3].find((n) => alvoDa(st, n) === 'varr'); return !!k && window.LIVRO.mascNoite(st, k) === 'maud'; };
const trabalhados = (st) => [1, 2, 3].map((k) => alvoDa(st, k)).filter(Boolean);
const resultadoDe = (st, alvo) => { const k = [1, 2, 3].find((n) => alvoDa(st, n) === alvo); return k ? (J(st, 'noite' + k).resultado || 'nada') : null; };
const NOMES_ALVO = {
  markus: T('Markus', 'Markus'), justine: T('Justine', 'Justine'), joseph: T('Sir Joseph', 'Sir Joseph'), varr: T('Lorde Varr', 'Lord Varr'), ansel: T('Ansel', 'Ansel'), mapas: T('a Sala dos Mapas', 'the Map Room'),
};

// a Ala Funda: os quatro carcereiros, cada um trabalhado com o que ela aprendeu deles pelo som (dois, em duas escolhas)
const ALA_OPCOES = (filtro) => [
  { id: 'wim', de: 'wim', gesto: true, tom: 'seduzir', txt: T('Esperar o Wim parar no buraco da canção e olhar para ele até ele olhar de volta.', 'Wait for Wim to stop at the hole in his song and look at him until he looks back.'),
    resultado: [T('Na terceira descida, ele para no lugar de sempre, onde a palavra some, e me encontra olhando. Fica. Aqui embaixo, nunca olharam para ele.', 'On his third trip down, he stops in the usual place, where the word goes missing, and finds me looking. He stays. Down here, no one has ever looked at him.'),
      T('Senta no último degrau, com a tocha no colo, e fala para encher o silêncio.', 'He sits on the bottom step, the torch in his lap, and talks to fill the silence.'),
      T('— A Lâmina desce sozinha, sabia? Sempre. E pergunta o que já sabe, só para ver se a gente mente.', '— The Blade comes down alone, you know? Always. And she asks what she already knows, just to see if you lie.')] },
  { id: 'garrick', de: 'garrick', fala: true, tom: 'intimidar', txt: T('Garrick.', 'Garrick.'),
    resultado: [T('Digo o nome dele no escuro, uma vez. Ele para no meio da escada. Nunca disse o nome perto da cela.', 'I say his name into the dark, once. He stops halfway down the stairs. He has never said his name near the cell.'),
      T('— O comandante Simon dizia que dá azar olhar conjuradora nos olhos — diz, de costas, por fim. — Servi com ele. Era homem de dividir o pão com quem estava de guarda. Na frente dela, ninguém diz o nome dele. Ninguém.', '— Commander Simon used to say it’s bad luck to look a conjurer in the eye — he says at last, with his back to me. — I served under him. He was a man who shared his bread with whoever stood watch. In front of her, no one says his name. No one.')] },
  { id: 'pell', de: 'pell', fala: true, tom: 'manipular', txt: T('A sua Juíza pesa conjuradora também, Pell?', 'Does your Judge weigh conjurers too, Pell?'),
    resultado: [T('Pell para no degrau. Uma conjuradora perguntando da Juíza ele não deixa sem resposta, e desce para me ensinar.', 'Pell stops on the step. A conjurer asking about the Judge he will not leave unanswered, and he comes down to teach me.'),
      T('— A Juíza pesa todo mundo. Até a Lâmina. A Lâmina não reza desde o irmão, e dizem que quer o deserto. Vingança é peso que a Juíza não perdoa.', '— The Judge weighs everyone. Even the Blade. The Blade hasn’t prayed since her brother, and they say she wants the desert. Vengeance is a weight the Judge doesn’t forgive.'),
      T('Ele sobe convencido de que salvou alguém.', 'He goes back up convinced he has saved someone.')] },
  { id: 'dunstan', de: 'dunstan', gesto: true, tom: 'manipular', txt: T('Soltar uma moeda da barra da saia e deixar perto da grade, onde ele vê.', 'Work a coin loose from my skirt’s hem and leave it by the bars, where he will see it.'),
    resultado: [T('Ouro velho, da Orla. Não digo nada. Na descida seguinte, a moeda some.', 'Old gold, from the Shore. I say nothing. On his next trip down, the coin is gone.'),
      T('Na outra, Dunstan para na frente da cela e conta as moedas do bolso em voz alta. Tem uma a mais.', 'On the next, Dunstan stops at the cell and counts the coins in his pocket out loud. There is one more.'),
      T('— Sabe quanto custa uma galera parada na costa de vocês? O imposto de uma aldeia, por ano. E tem uma galera parada na frente de cada aldeia. E a gente aqui com o soldo atrasado.', '— You know what a galley sitting off your coast costs? A whole village’s taxes, every year. And there’s a galley sitting off every village. And us down here with our pay late.')] },
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
    mg: { escuta: 'Os pequenos', tripulacao: 'A tripulação', mao: 'Abrir a mão', morta: 'A Morta', anzol: 'O Anzol', interrogatorio: 'A Laura', ordem: 'A Ordem' },
    verbo: { ouvir: 'Ouvir', poder: 'Poder', esperar: 'Esperar', anzol: 'Anzol', ler: 'Ler' },
    verboDe: { escuta: 'ouvir', tripulacao: 'ouvir', mao: 'poder', morta: 'esperar', anzol: 'anzol', interrogatorio: 'anzol', ordem: 'ler' },
    dica: {
      escuta: 'Toque em quem você quer ouvir. Não sobra tempo para todos: o que cada um é diz o que pode saber.',
      tripulacao: 'Toque em três para levar. Toque outra vez para deixar.',
      mao: 'Um toque. Você escolhe quando.',
      morta: 'Não se mexa. Quem se mexe para de ouvir.',
      anzol: 'A frase de ouro, no alto, é o que você quer ouvir da boca dele. A cada fala, escolha a sua: as palavras acendem quando ele chega perto. Dizer a frase você mesma apaga palavras.',
      interrogatorio: 'A frase de ouro é o que você quer ouvir da boca dela. A vermelha é o que ela vai concluir de você. Cada resposta acende uma, a outra ou as duas. Mentira acende o vermelho, porque as orelhas falam. As respostas com um rosto vêm de alguém que você ouviu. Ela pergunta coisas que já sabe. Leia o corpo dela: ele mostra quando ela começa a acreditar. Se não acreditar, ela decreta a sua morte.',
      ordem: 'Arraste os papéis para mudar a ordem, ou use as setas. Nenhuma palavra muda: só a ordem em que vão ser lidos.',
    },
    comecar: 'Toque para começar',
    coverEye: 'As Quatro Vontades · Livro I · Capítulo VII', coverLede: 'Ela sobe do fundo com uma frase pronta e nenhum nome. O povo dela se ajoelha. Ela acha natural.', coverGo: 'Subir', coverCont: 'Continuar de onde parei', coverRestart: 'Começar do início', coverHint: 'Use fones. Avance com o botão, com a seta → ou deslizando para o lado.',
    confirm: 'Recomeçar o capítulo? Suas escolhas serão apagadas.', capN: 'Capítulo VII', fimCap: 'Fim do Capítulo VII', ficou: 'O que ficou no sal', suas: 'O que você escolheu', reler: 'Reler e escolher diferente', mesmo: (p) => `${p}% dos leitores fizeram o mesmo`,
    pontos: 'Pontuação do capítulo', jornada: 'Jornada (Capítulos I a VII)', posicao: (p, n) => `${p}º de ${n} leitores`, semCap1: 'Jogue os capítulos anteriores neste navegador para somar a jornada.',
    pts: { anzol: 'O Anzol', morta: 'A Morta', olhos: 'O rosto', ala: 'A Ala Funda', antes: 'Capítulos I a VI' },
    j: { seguir: 'Seguir', zarpar: 'Zarpar', faltam: (n) => (n === 1 ? 'Falta um.' : `Faltam ${n}.`), sobra: (n) => (n === 1 ? 'Sobra tempo para um.' : `Sobra tempo para ${n}.`), abrir: 'Abrir a mão', deixar: 'Deixar assim', ouvidos: 'ouvido', subir: 'subir', descer: 'descer', porta: 'porta', pergunta: 'pergunta', silencio: 'silêncio', direto: 'direto' },
  },
  en: {
    parte: 'Part', prox: 'Next', tentar: 'Try again', fim: 'Close the chapter', voltar: '← Back', continuar: 'Continue', oque: 'What do I do?', escolheu: 'You chose:', silencio: 'say nothing', silencioR: 'Silence', momento: 'Moment of play',
    colecaoT: 'The Collection', colecaoSub: 'The faces I keep', colecaoNovo: 'In the Collection', colecaoVazia: 'No faces yet.', serve: 'useful now', deTxt: 'from', iqOuro: 'what I want to hear from her mouth', anzolOuro: 'what I want to hear from that mouth', iqVerm: 'what she will conclude about me', lugares: { orla: 'The Shore', sentenca: 'The Sentence', redom: 'Redom', coluna: 'The column' }, quer: 'Wants', naoDiz: 'Doesn’t say', disse: 'Said', vestivel: 'I have the clothes',
    dicaVeu: 'The face she wears stays at the top. Tap it to open the Collection.', piscarDica: 'Tap twice. Quick.',
    mg: { escuta: 'The small folk', tripulacao: 'The crew', mao: 'Open the hand', morta: 'The Dead Woman', anzol: 'The Hook', interrogatorio: 'Laura', ordem: 'The Order' },
    verbo: { ouvir: 'Listen', poder: 'Power', esperar: 'Wait', anzol: 'Hook', ler: 'Read' },
    verboDe: { escuta: 'ouvir', tripulacao: 'ouvir', mao: 'poder', morta: 'esperar', anzol: 'anzol', interrogatorio: 'anzol', ordem: 'ler' },
    dica: {
      escuta: 'Tap whoever you want to listen to. There is no time for all of them: what each one is tells you what they might know.',
      tripulacao: 'Tap three to take. Tap again to leave one behind.',
      mao: 'One tap. You choose when.',
      morta: 'Don’t move. Whoever moves stops hearing.',
      anzol: 'The gold sentence at the top is what you want to hear from his mouth. At each line, choose yours: the words light up as he comes closer. Saying the sentence yourself puts words out.',
      interrogatorio: 'The gold sentence is what you want to hear from her mouth. The red one is what she will conclude about you. Each answer lights one, the other, or both. A lie lights the red, because the ears talk. Answers with a face come from someone you listened to. She asks things she already knows. Read her body: it shows when she starts to believe. If she doesn’t believe, she orders your death.',
      ordem: 'Drag the papers to change the order, or use the arrows. No word changes: only the order in which they are read.',
    },
    comecar: 'Tap to begin',
    coverEye: 'The Four Wills · Book I · Chapter VII', coverLede: 'She rises from the deep with a sentence ready and no name. Her people kneel. She finds it natural.', coverGo: 'Rise', coverCont: 'Continue where I left off', coverRestart: 'Start from the beginning', coverHint: 'Wear headphones. Move on with the button, the → key, or a swipe.',
    confirm: 'Restart the chapter? Your choices will be erased.', capN: 'Chapter VII', fimCap: 'End of Chapter VII', ficou: 'What the salt kept', suas: 'What you chose', reler: 'Read again and choose differently', mesmo: (p) => `${p}% of readers did the same`,
    pontos: 'Chapter score', jornada: 'Journey (Chapters I to VII)', posicao: (p, n) => `#${p} of ${n} readers`, semCap1: 'Play the earlier chapters in this browser to add up the journey.',
    pts: { anzol: 'The Hook', morta: 'The Dead Woman', olhos: 'The face', ala: 'The Deep Ward', antes: 'Chapters I to VI' },
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
  // a metade escondida: só sobe no fim, na coluna
  fraseFim: {
    pt: ['e', 'a', 'Boca Seca', 'bebe', 'todos.'],
    en: ['and', 'the', 'Dry Mouth', 'drinks', 'them all.'],
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

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
  proximo: { titulo: 'Capítulo VIII', tituloEn: 'Chapter VIII', url: 'https://marcelomartinsjorge.github.io/the4willschapter8/' },

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

  // ---------------------------------------------------------------- A COLEÇÃO: o codex dela, um cartão por rosto
  // nome, Quer, Não diz, Disse (na voz dela, curto). morto: o cartão fica, com a linha do fim.
  colecao: {
    velha: { lugar: 'orla', img: ROSTO('velha'), nome: T('A velha da escada', 'The old woman on the stairs'), quer: T('que a avó dela tenha tido razão.', 'for her grandmother to have been right.'), disse: T('Da casa da avó dela só sobrou ela. Os outros a Sentença levou.', 'Of her grandmother’s house only she is left. The rest the Sentence took.') },
    sarnai: { lugar: 'orla', img: ROSTO('sarnai'), nome: T('Sarnai, das Viúvas do Sal', 'Sarnai, of the Salt Widows'), quer: T('Alvena de volta.', 'Alvena back.'), naoDiz: T('que deve barcos a Ossian, e que alguém da casa dela vendeu a rota do irmão de Ruo.', 'that she owes Ossian boats, and that someone of her house sold the route of Ruo’s brother.'), disse: T('Redom fechou o porto de Alvena para a Orla.', 'Redom closed the port of Alvena to the Shore.') },
    ossian: { lugar: 'orla', img: ROSTO('ossian'), nome: T('Ossian Três-Dedos, dos Mastreiros', 'Ossian Three-Fingers, of the Mastmen'), quer: T('o meu nome do lado dele da mesa.', 'my name on his side of the table.'), naoDiz: (st) => (st.escolhas.chefes === 'doce' ? T('que já se vê sentado ao meu lado em todas as mesas da Orla.', 'that he already sees himself at my side at every table on the Shore.') : null), disse: T('Redom leva vivos para a rainha de Redom os que acha que conjuram. Em Alvena, quem sabe das coisas é a casa da Ondina.', 'Redom takes those it thinks can conjure to Redom’s queen alive. In Alvena, the one who knows things is Ondina’s house.') },
    ruo: { lugar: 'orla', img: ROSTO('ruo'), nome: T('Ruo, do Recife', 'Ruo, of the Reef'), quer: T('que eu afunde a Sentença.', 'for me to sink the Sentence.'), disse: T('A Sentença queimou a frota do irmão dele no Canal das Garças. Estava esperando, porque alguém vendeu a rota a Redom.', 'The Sentence burned his brother’s fleet in the Heron Channel. She was waiting there, because someone sold the route to Redom.') },
    iska: { lugar: 'orla', img: ROSTO('iska'), veste: true, nome: T('Iska, marinheira', 'Iska, sailor'), quer: T('rir mais alto que o mar.', 'to laugh louder than the sea.'), naoDiz: (st) => (st.f.iskaDente ? T('que a cicatriz foi faca de um soldado de dente de ouro, em Alvena.', 'that the scar was the knife of a gold-toothed soldier, in Alvena.') : T('que a cicatriz no braço não foi raio nenhum.', 'that the scar on her arm was no lightning at all.')) },
    aguadeiro: { lugar: 'orla', img: ROSTO('aguadeiro'), nome: T('O menino da água', 'The water boy'), quer: T('vender o último balde antes do sol.', 'to sell the last bucket before the sun.'), disse: T('A Sentença ancora em Alvena a cada nove dias e volta pelo Canal das Garças.', 'The Sentence anchors at Alvena every nine days and goes back through the Heron Channel.') },
    pedagio: { lugar: 'orla', img: ROSTO('pedagio'), nome: T('A mulher do pedágio', 'The toll woman'), quer: T('troco certo, uma vez na vida.', 'the right change, once in her life.'), disse: T('A Sentença pesca os afogados da Orla e vende no molhe, por peso.', 'The Sentence fishes up the Shore’s drowned and sells them on the mole, by weight.') },
    desertor: { lugar: 'orla', img: ROSTO('desertor'), nome: T('O desertor', 'The deserter'), quer: T('esquecer o deserto.', 'to forget the desert.'), naoDiz: T('o nome do regimento.', 'the name of his regiment.'), disse: T('A Boca Seca é o deserto aonde Redom manda os filhos todo ano, e todo ano volta menos filho.', 'The Dry Mouth is the desert where Redom sends its sons every year, and every year fewer sons come back.') },
    padre: { lugar: 'orla', img: ROSTO('padre'), nome: T('O padre do Cavaleiro', 'The Knight’s priest'), quer: T('que eu reze com ele.', 'for me to pray with him.'), disse: T('Conjurador vai vivo para a Capital, e a Lâmina julga com os próprios olhos.', 'Conjurers go alive to the Capital, and the Blade judges them with her own eyes.') },
    mira: { lugar: 'orla', img: ROSTO('mira'), nome: T('Mira, da casa da Ondina', 'Mira, of Ondina’s house'), quer: T('uma noite sem soldado.', 'one night without a soldier.'), disse: T('Soldado de Redom conta tudo na cama e na frente de defunto.', 'A Redom soldier tells everything in bed and in front of a corpse.') },
    // a tripulação: o cartão fica depois da Sentença, com a linha do fim
    maru: { lugar: 'orla', img: ROSTO('maru'), nome: T('Maru, piloto', 'Maru, pilot'), quer: T('pegar a Sentença de noite, pelos recifes.', 'to take the Sentence by night, through the reefs.'), naoDiz: T('que o olho branco ainda enxerga um pouco.', 'that the white eye still sees a little.'), morto: (st) => !!st.f.naufragio && salvo(st) !== 'maru', fim: (st) => (salvo(st) === 'maru' ? T('Voltou para a Orla com a Nhalé.', 'Went back to the Shore with Nhalé.') : st.f.motimMorto === 'maru' ? T('Morreu pela minha mão, no barco.', 'Died by my hand, in the boat.') : st.f.naufragio ? T('Afundou com a mão no leme.', 'Went down with his hand on the tiller.') : null) },
    lio: { lugar: 'orla', img: ROSTO('lio'), nome: T('Lio', 'Lio'), quer: T('ser dado ao mar no lugar do irmão.', 'to be given to the sea in his brother’s place.'), morto: (st) => !!st.f.naufragio && salvo(st) !== 'lio', fim: (st) => (salvo(st) === 'lio' ? T('Voltou para a Orla com a Nhalé. Vai ver chuva um dia.', 'Went back to the Shore with Nhalé. He’ll see rain someday.') : st.f.naufragio ? T('Boiou de costas.', 'Floated on his back.') : null) },
    teshka: { lugar: 'orla', img: ROSTO('teshka'), nome: T('Teshka, capitã', 'Teshka, captain'), quer: T('que o mar devolva o que levou.', 'for the sea to give back what it took.'), naoDiz: (st) => (st.escolhas.n_teshka === 'fria' ? T('que tem medo de afundar como o marido.', 'that she is afraid of going under like her husband.') : st.escolhas.n_teshka === 'divertida' ? T('que culpa o Ossian pelo marido.', 'that she blames Ossian for her husband.') : null), morto: (st) => !!st.f.naufragio && salvo(st) !== 'teshka', fim: (st) => (salvo(st) === 'teshka' ? T('Voltou para a Orla com a Nhalé.', 'Went back to the Shore with Nhalé.') : st.f.motimMorto === 'teshka' ? T('Morreu pela minha mão, no barco.', 'Died by my hand, in the boat.') : teshkaAborda(st) ? T('Morreu no convés da Sentença.', 'Died on the Sentence’s deck.') : st.f.naufragio ? T('Não voltou.', 'Did not go home.') : null) },
    nhale: { lugar: 'orla', img: ROSTO('nhale'), nome: T('Nhalé, do fundo', 'Nhalé, of the deep'), quer: T('saber de onde eu vim.', 'to know where I came from.'), morto: (st) => !!st.f.naufragio && !salvo(st), fim: (st) => (salvo(st) ? T('Levou um dos meus para o fundo, vivo.', 'Carried one of mine down to the deep, alive.') : st.f.naufragio ? T('Bateu na quilha e parou.', 'Knocked on the keel and stopped.') : null) },
    brann: { lugar: 'orla', img: ROSTO('brann'), nome: T('Brann, besteiro', 'Brann, crossbowman'), quer: T('ver de perto se a Madrinha é truque de caneca.', 'to see up close whether the Godmother is a cup trick.'), naoDiz: (st) => (st.escolhas.n_brann === 'fria' ? T('que acreditou em mim no instante em que eu disse quantos voltam.', 'that he believed in me the moment I said how many come back.') : null), morto: (st) => !!st.f.naufragio && salvo(st) !== 'brann', fim: (st) => (salvo(st) === 'brann' ? T('Voltou para a Orla com a Nhalé.', 'Went back to the Shore with Nhalé.') : st.f.motimMorto === 'brann' ? T('Morreu pela minha mão, no barco.', 'Died by my hand, in the boat.') : !st.f.naufragio ? null : brannAtira(st) ? T('Caiu rindo.', 'Fell laughing.') : (st.jogos.mao || {}).quando === 'cedo' ? T('Não chegou a atirar.', 'Never got the shot off.') : T('Acertou um antes.', 'Hit one first.')) },
    // os da Sentença (a Morta)
    capitao: { lugar: 'sentenca', img: ROSTO('capitao'), nome: T('O capitão da Sentença', 'The captain of the Sentence'), quer: T('pagar a casa da Ondina.', 'to pay Ondina’s house.'), disse: T('Vende os mortos por peso em Alvena.', 'He sells the dead by weight in Alvena.') },
    hobb: { lugar: 'sentenca', img: ROSTO('hobb'), nome: T('Hobb, da Sentença', 'Hobb, of the Sentence'), disse: T('A Lâmina não come desde que o irmão morreu. Manda o prato de volta cheio.', 'The Blade hasn’t eaten since her brother died. She sends the plate back full.') },
    grisalho: { lugar: 'sentenca', img: ROSTO('grisalho'), nome: T('O soldado grisalho', 'The grey soldier'), quer: T('não voltar para o deserto.', 'not to go back to the desert.'), disse: T('Se a Lâmina quiser vingança, vai todo mundo, e o deserto come metade.', 'If the Blade wants vengeance, everyone goes, and the desert eats half.') },
    sargento: { lugar: 'sentenca', img: ROSTO('sargento'), nome: T('O sargento da Sentença', 'The sergeant of the Sentence'), quer: T('cumprir a lei sem pensar nela.', 'to keep the law without thinking about it.'), disse: T('A Lâmina julga os conjuradores pessoalmente.', 'The Blade judges conjurers herself.') },
    // os quatro da escada (Ala Funda)
    wim: { lugar: 'redom', img: ROSTO('wim'), nome: T('Wim, o que cantarola', 'Wim, the one who hums'), quer: T('que o turno acabe.', 'for the shift to end.'), disse: (st) => (fezCarcereiro(st, 'wim') ? T('A Lâmina desce sozinha e pergunta o que já sabe, para ver se a gente mente.', 'The Blade comes down alone and asks what she already knows, to see if you lie.') : null) },
    garrick: { img: ROSTO('garrick'), nome: T('Garrick, o que nunca olha', 'Garrick, the one who never looks'), quer: T('não ver.', 'not to see.'), disse: (st) => (fezCarcereiro(st, 'garrick') ? T('Serviu com o comandante Simon. Na frente da Lâmina, o nome dele não se diz.', 'He served under Commander Simon. In front of the Blade, his name is not said.') : null) },
    pell: { img: ROSTO('pell'), nome: T('Pell, o que reza', 'Pell, the one who prays'), quer: T('que a Juíza seja levada a sério.', 'for the Judge to be taken seriously.'), disse: (st) => (fezCarcereiro(st, 'pell') ? T('A Lâmina não reza desde o irmão, e dizem que quer o deserto.', 'The Blade hasn’t prayed since her brother, and they say she wants the desert.') : null) },
    dunstan: { img: ROSTO('dunstan'), nome: T('Dunstan, o que conta moedas', 'Dunstan, the one who counts coins'), quer: T('o soldo atrasado.', 'his late pay.'), disse: (st) => (fezCarcereiro(st, 'dunstan') ? T('Cada galera parada na costa custa a Redom o imposto de uma aldeia por ano.', 'Every galley sitting on the coast costs Redom a village’s taxes a year.') : null) },
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
    aubert: { lugar: 'redom', img: ROSTO('aubert'), nome: T('O comandante Aubert', 'Commander Aubert'), quer: T('levar à Laura, por escrito, tudo o que viu.', 'to bring Laura everything he saw, in writing.'), naoDiz: T('que conta velas quando não consegue contar palavras.', 'that he counts sails when he can’t count words.') },
    // os dois rostos de saída: com eles ela chega perto de quem tem a roupa
    bento: { img: ROSTO('bento'), veste: true, nome: T('Bento, menino aguadeiro', 'Bento, the water boy'), quer: T('uma moeda por balde.', 'a coin a bucket.') },
    lume: { img: ROSTO('lume'), veste: true, nome: T('Lume, da Casa das Lanternas', 'Lume, of the House of Lanterns'), quer: T('que paguem antes.', 'to be paid first.') },
    // os rostos que eu vi de passagem (servem de máscara quando não há outra)
    guarda: { img: ROSTO('guarda'), veste: true, nome: T('Um guarda da Cidadela', 'A Citadel guard'), quer: T('o fim do turno.', 'the end of his watch.') },
    criadaC: { img: ROSTO('criadaC'), veste: true, nome: T('Uma criada do palácio', 'A palace maid'), quer: T('passar sem ser notada.', 'to pass unnoticed.') },
    moco: { img: ROSTO('moco'), veste: true, nome: T('Um moço de recados', 'An errand boy'), quer: T('correr menos.', 'to run less.') },
    // os alvos (entram quando ela trabalha cada um)
    markus: { img: ROSTO('markus'), nome: T('Markus', 'Markus'), quer: T('estar onde ela estiver.', 'to be wherever she is.'), naoDiz: T('que dorme com a espada do comandante Simon ao lado.', 'that he sleeps with Commander Simon’s sword beside him.') },
    justine: { img: ROSTO('justine'), nome: T('Justine', 'Justine'), quer: T('que a lei sirva para alguma coisa.', 'for the law to be good for something.'), naoDiz: T('que reza mais pela Laura que pelo morto.', 'that she prays more for Laura than for the dead man.') },
    joseph: { img: ROSTO('joseph'), nome: T('Sir Joseph', 'Sir Joseph'), quer: T('uma última campanha.', 'one last campaign.'), naoDiz: T('a mão.', 'the hand.') },
    varr: { img: ROSTO('varr'), nome: T('Lorde Varr', 'Lord Varr'), quer: T('uma canção com o nome dele.', 'a song with his name in it.'), naoDiz: T('o que ainda não perdoou nela.', 'what he still hasn’t forgiven her.') },
    ansel: { img: ROSTO('ansel'), nome: T('Ansel, sentinela', 'Ansel, sentry'), quer: T('dormir.', 'to sleep.'), naoDiz: T('que ainda deve um pão a um morto.', 'that he still owes a dead man a loaf of bread.') },
    // a coluna
    estrebaria: { lugar: 'coluna', img: ROSTO('estrebaria'), veste: true, nome: T('Wil, moço da estrebaria', 'Wil, stable hand'), quer: T('um cavalo que não morda.', 'a horse that doesn’t bite.') },
    forja: { lugar: 'coluna', img: ROSTO('forja'), veste: true, nome: T('Bram, ajudante de ferreiro', 'Bram, smith’s helper'), quer: T('uma semana sem queimadura.', 'one week without a burn.') },
    ilse: { lugar: 'coluna', img: ROSTO('ilse'), veste: true, nome: T('Ilse, ajudante de curandeiro', 'Ilse, healer’s helper'), quer: T('ver a Laura de perto.', 'to see Laura up close.') },
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
      { id: 'bertha', rotulo: T('Uma mulher de luto na porta de casa', 'A woman in mourning at her door'), fala: [T('— O menino Ansel vem toda tarde me contar como o meu filho morreu nas Goelas. Conta igual. Eu deixo, porque ele precisa contar mais do que eu preciso ouvir.', '— The boy Ansel comes every afternoon to tell me how my son died at the Gullets. Tells it the same. I let him, because he needs to tell it more than I need to hear it.')] },
    ] },
    dia2: { pick: 1, titulo: T('O segundo dia', 'The second day'), gente: (st) => [
      circulo(st) === 'justine'
        ? { id: 'dama', rotulo: T('Uma dama de companhia esperando a liteira', 'A lady-in-waiting waiting for her litter'), fala: [T('— A Guardiã escreveu a lei que deixa a Lâmina ir à guerra quando quiser. Escreveu numa noite. Nunca vi lei tão curta.', '— The Keeper wrote the law that lets the Blade go to war whenever she wants. Wrote it in one night. I never saw a law so short.')] }
        : { id: 'escudeiro', rotulo: T('Um escudeiro limpando uma espada de pau', 'A squire cleaning a wooden sword'), fala: [T('— É do comandante Simon. O marechal pegou ele depois do Torneio, com quinze anos, quando o mestre de armas já não tinha o que ensinar. No primeiro dia derrubou ele onze vezes com esta aqui, o marechal conta. Só conta isso.', '— It was Commander Simon’s. The marshal took him on after the Tourney, at fifteen, when the master-at-arms had nothing left to teach him. The first day he knocked him down eleven times with this one, the marshal says. That’s all he says.'), T('— Eu queria ir na coluna. Dizem que escudeiro não vai.', '— I wanted to go with the column. They say squires don’t.')] },
      { id: 'viuva', rotulo: T('Uma viúva na fila da pensão', 'A widow in the pension line'), fala: [T('— O meu marido morreu atrás deles numa duna. A duna estava vazia quando ele subiu. Eles somem, os bichos. Todo mundo sabe que eles somem.', '— My husband died chasing them up a dune. The dune was empty when he climbed it. They vanish, those beasts. Everyone knows they vanish.')] },
      { id: 'maud', rotulo: T('Uma mulher alta discutindo com um vendedor de selas', 'A tall woman arguing with a saddle seller'), fala: [T('— Para o meu irmão, o Lorde Varr. Se ele não for, alguém vai ter que segurá-lo em casa, e esse alguém sou eu. Ele não suporta ver os outros partirem sem ele.', '— For my brother, Lord Varr. If he doesn’t go, someone will have to hold him at home, and that someone is me. He can’t stand to watch the others leave without him.')] },
      { id: 'aldo', rotulo: T('Um curandeiro saindo da enfermaria do quartel', 'A healer leaving the barracks infirmary'), fala: [T('— O sentinela que voltou das Goelas? Acorda gritando que o Grakh olhou para ele. Olhou, só isso. Eu dou chá. Não adianta.', '— The sentry who came back from the Gullets? He wakes up shouting that the Grakh looked at him. Looked, that’s all. I give him tea. It does nothing.')] },
    ] },
    dia3: { pick: 1, titulo: T('O terceiro dia', 'The third day'), gente: [
      { id: 'edric', rotulo: T('Um escrivão comprando tinta na feira', 'A clerk buying ink at the market'), fala: [T('— De manhã eu leio os relatórios para o conselho. Em voz alta, na ordem em que estão na pasta. Ali, papel não muda de lugar. Eles nem leem; escutam.', '— In the mornings I read the reports to the council. Aloud, in the order they lie in the folder. Paper doesn’t move there. They don’t even read; they listen.')] },
      { id: 'guarda', flag: 'dicaEdric', rotulo: T('Um guarda da Cidadela no fim do turno', 'A Citadel guard at the end of his watch'), fala: [T('— A Sala dos Mapas? Só sobe quem tem a chave e cara conhecida. O Edric sobe toda madrugada para arrumar a pasta, e para o Edric os guardas nem olham.', '— The Map Room? Only those with the key and a known face go up. Edric goes up every morning before dawn to tidy the folder, and the guards don’t even look at Edric.')] },
      { id: 'criadaC', flag: 'dicaUltimo', rotulo: T('Uma criada que serve água ao conselho', 'A maid who serves water to the council'), fala: [T('— Os velhos? Escutam o primeiro papel com sono e o último com fome. O que eles ouvem por último é o que levam para o almoço, e voltam do almoço decididos.', '— The old men? They hear the first paper sleepy and the last one hungry. Whatever they hear last is what they take to lunch, and they come back from lunch decided.')] },
    ] },
  },

  // a tripulação: três de cinco
  tripulacao: { pick: 3, gente: [
    { id: 'maru', rotulo: T('Maru, piloto dos Mastreiros', 'Maru, pilot of the Mastmen'), fala: [T('O melhor piloto da casa dele. Conhece os recifes de olho fechado, e um dos olhos já é branco. A mãe dele contava que a Madrinha devolve o olho de quem pede direito.', 'The best pilot of his house. Knows the reefs with his eyes shut, and one of his eyes is already white. His mother used to say the Godmother gives back the eye of whoever asks right.')] },
    { id: 'lio', rotulo: T('Lio, o mais novo do cais', 'Lio, the youngest on the docks'), fala: [T('O que segurou o pano para mim na escada. Nunca saiu da Orla e não sabe lutar. A casa dele só tinha ele para dar, e ele veio no lugar do irmão.', 'The one who held the cloth for me on the stairs. Has never left the Shore and can’t fight. His house had no one better to give, and he came in his brother’s place.')] },
    { id: 'teshka', rotulo: T('Teshka, capitã de um cúter', 'Teshka, captain of a cutter'), fala: [T('Tem o barco mais rápido do cais e ajoelha com um joelho só. O marido foi dado ao mar no ano passado, numa promessa de Alvena, e não voltou.', 'Has the fastest boat on the docks and kneels on one knee only. Her husband was given to the sea last year, on a promise of Alvena, and never came back.')] },
    { id: 'nhale', rotulo: T('Nhalé, do povo do fundo', 'Nhalé, of the deep folk'), fala: [T('Uma Merés da roda que cantava quando eu abri os olhos. Guia o barco por baixo, batendo na quilha. Embaixo d’água, leva alguém para o fundo vivo, se quiser levar.', 'A Merés from the ring that was singing when I opened my eyes. Guides the boat from below, knocking on the keel. Underwater, she can carry someone down to the deep alive, if she wants to.')] },
    { id: 'brann', rotulo: T('Brann, besteiro de Alvena', 'Brann, crossbowman of Alvena'), fala: [T('Humano, com uma cicatriz comprida no pescoço. Acerta um homem num convés a cem passos. Nenhuma casa o deu: veio sozinho, e cospe na água quando alguém diz Madrinha.', 'Human, a long scar down his neck. Can hit a man on a deck at a hundred paces. No house gave him: he came on his own, and spits in the water when anyone says Godmother.')] },
  ] },

  // ---------------------------------------------------------------- A MORTA: as falas dos soldados, no tempo
  // t em segundos; card: o cartão que a fala dá; voz: a gravação (S01…)
  morta: {
    img: IMG('s05-conves'), dura: 46,
    falas: [
      { t: 1.5, txt: T('— Mais uma da Orla. Puxa pelo cabelo, que pelo braço escorrega.', '— Another one from the Shore. Pull her by the hair, the arm’s too slippery.') },
      { t: 4.5, txt: T('— Joga com os outros. O capitão quer os corpos contados antes de Alvena.', '— Throw her with the rest. The captain wants the bodies counted before Alvena.') },
      { t: 10, card: 'capitao', txt: T('— Conta direito, Hobb. O capitão vende os mortos por peso em Alvena e paga a casa da Ondina com o que sobra.', '— Count right, Hobb. The captain sells the dead by weight in Alvena and pays Ondina’s house with what’s left.') },
      { t: 17, card: 'hobb', txt: T('— Pena que morreu. Conjuradora viva vai para a Lâmina, e quem leva ganha folga. Meu primo serve na Cidadela. Diz que a Lâmina não come desde que o irmão morreu. Manda o prato de volta cheio.', '— Shame she’s dead. A live conjurer goes to the Blade, and whoever brings her in gets leave. My cousin serves at the Citadel. Says the Blade hasn’t eaten since her brother died. Sends the plate back full.') },
      { t: 21, se: (st) => brannAtira(st), txt: T('— Quem acertou o mestre dos besteiros? Daquela casca de noz?', '— Who hit the master of crossbows? From that nutshell?') },
      { t: 25, card: 'grisalho', frase: 'boca', txt: T('— Quem não come quer guerra. Ela vai querer a Boca Seca outra vez. Se for por vingança, vai todo mundo, e o deserto come metade.', '— Someone who won’t eat wants war. She’ll want the Dry Mouth again. If it’s for vengeance, everyone goes, and the desert eats half.') },
      { t: 29, se: (st) => maruLado(st), txt: T('— O mastro do meio quebrou igual graveto. Mar parado não faz isso.', '— The middle mast snapped like a twig. A still sea doesn’t do that.') },
      { t: 33, txt: T('— Essa nem esfriou. — É o sol. Joga no monte.', '— This one isn’t even cold. — It’s the sun. Throw her on the pile.') },
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
    img: IMG('s03-costado'), video: VID('b03-onda'), videoConj: VID('b03-conjura'), salvaMs: 22000,
    // concentrar (o ouro sobe do fundo; o vermelho é o convés) e depois escolher a hora de soltar
    conc: T('Trazer a água do fundo.', 'Bring up the water from the deep.'),
    dica: T('Toque o ouro antes que ele apague. O vermelho é o barulho do convés: não toque.', 'Touch the gold before it fades. The red is the noise of the deck: don’t touch it.'),
    pesa: T('O mar quer subir todo. Seguro.', 'The sea wants to rise whole. I hold it.'),
    segura: T('Está na minha mão. Eu escolho a hora, e quanto.', 'It is in my hand. I choose the moment, and how much.'),
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
      ideia: T('Com pouca gente, os Grakh escapam outra vez.', 'With too few men, the Grakh slip away again.'), falador: true, mascaras: { vinho: 1, viuva: 1 },
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
          { id: 's', tipo: 'silencio', u: 2, resp: [T('Ele gira a taça e fala para o vinho.', 'He turns the cup and talks to the wine.'), T('— Eu disse isso ao pai dela. O pai dela riu. Morreu no deserto, o pai dela.', '— I told her father that. Her father laughed. Died in the desert, her father.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Com pouco, ele escapa.', 'With too few, he gets away.'), resp: [T('Ele me olha com os olhos de quem já foi general.', 'He looks at me with the eyes of a man who was a general once.'), T('— Quem pôs isso na sua boca?', '— Who put that in your mouth?')] },
        ] },
        { fala: T('— Ela não vai me ouvir. Eu perdi para ela. Quem perdeu não dá conselho.', '— She won’t listen to me. I lost to her. The one who lost doesn’t give advice.'), ops: [
          { id: 'p', tipo: 'porta', de: 'vinho', u: 2, txt: T('Quem perdeu para ela é quem sabe como ela vence. E o senhor quer uma última campanha.', 'The one who lost to her is the one who knows how she wins. And you want one last campaign, sir.'), resp: [T('Ele pensa nisso de boca aberta. Depois fecha a boca, satisfeito.', 'He thinks about it with his mouth open. Then he shuts his mouth, pleased.')] },
          { id: 'q', tipo: 'pergunta', u: 1, txt: T('E se o senhor falar mesmo assim?', 'And if you speak anyway, sir?'), resp: [T('— Aí ela me escuta e faz o contrário. Ela gosta de me fazer o contrário.', '— Then she hears me and does the opposite. She likes doing me the opposite.')] },
          { id: 'd', tipo: 'direto', u: -2, txt: T('Diga a ela que leve todo mundo.', 'Tell her to take everyone.'), resp: [T('— Vai embora, antes que eu lembre do seu rosto.', '— Go, before I remember your face.')] },
        ] },
      ],
      fim: {
        cheia: [T('Ele bate a taça na mesa.', 'He slams the cup on the table.'), { t: T('«Com pouca gente, os Grakh escapam outra vez.', '«With too few men, the Grakh slip away again.') }, T('— Vou dizer isso a ela amanhã, na cara. Uma vez na vida ela vai ter que ouvir um velho.', '— I’ll tell her tomorrow, to her face. Once in her life she’ll have to listen to an old man.')],
        meia: [T('— Eu vou falar. Ela não vai ouvir, mas eu vou falar.', '— I’ll speak. She won’t listen, but I’ll speak.'), T('Velho que fala para não ser ouvido grita mais alto.', 'An old man who speaks not to be heard shouts louder.')],
        nada: [T('— Pode ir. O vinho eu sirvo sozinho.', '— You can go. I’ll pour the wine myself.'), T('Ele derrama metade na mesa e não liga.', 'He spills half on the table and doesn’t care.')],
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
          { id: 'p', tipo: 'porta', de: 'maud', livre: (st) => euMaud(st), txt: (st) => (euMaud(st) ? T('Eu te conheço, irmão. Você não aguenta ficar em casa enquanto os outros vão.', 'I know you, brother. You can’t bear staying home while the others go.') : T('A sua irmã diz que o senhor não suporta ver os outros partirem sem o senhor.', 'Your sister says you can’t stand to see the others leave without you, sir.')), u: 2,
            resp: (st) => (euMaud(st) ? [T('— Você fala demais, Maud. E fala certo.', '— You talk too much, Maud. And you talk right.')] : [T('— A Maud fala demais. E fala certo.', '— Maud talks too much. And she talks right.')]) },
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
      ouro2: T('Os olhos dela param em mim, e ficam.', 'Her eyes stop on me, and stay.'),
      ouro1: T('Ela espera o resto da resposta.', 'She waits for the rest of the answer.'),
      verm2: T('Os dedos dela apertam o joelho.', 'Her fingers tighten on her knee.'),
      // quando ela passa a acreditar numa das duas coisas que faltam
      chave_influencia: T('Ela para de olhar para as minhas orelhas. Agora só escuta.', 'She stops looking at my ears. Now she only listens.'),
      chave_motivo: T('Pela primeira vez, ela sai da ponta do banco.', 'For the first time, she moves back from the edge of the stool.'),
      verm1: T('Ela olha para as minhas orelhas.', 'She looks at my ears.'),
    },
    // abaixo disto, a Lâmina não acredita: decreta a morte, e o jogo volta ao começo do interrogatório
    limiar: 8,
    // além do ouro, ela só solta quem provou as duas coisas: que a Orla obedece, e o que a Madrinha ganha com isso
    chaves: ['influencia', 'motivo'],
    morte: (st) => [T('Ela se levanta. O banco arrasta na pedra.', 'She stands. The stool scrapes on the stone.'),
      st.f.iqFalta === 'influencia' ? T('— Você me fala do mar. Não me mostrou uma casa da Orla que faça o que você manda. Mar eu não sento na mesa do conselho.', '— You talk to me about the sea. You didn’t show me one house of the Shore that does what you say. I can’t seat the sea at the council table.')
        : st.f.iqFalta === 'motivo' ? T('— Você não me disse o que ganha com isso. Quem entrega a própria casa sem dizer o preço, ou é santa, ou mente. Santa eu nunca vi.', '— You didn’t tell me what you gain. Whoever hands over her own house without naming the price is either a saint or a liar. I’ve never seen a saint.')
          : T('— Você fala como os conjuradores que sentaram na frente deste banco antes de você. Bonito, e nada.', '— You talk like the conjurers who sat in front of this stool before you. Pretty, and nothing.'),
      T('— Ao amanhecer, no pátio. Sem nome no livro.', '— At dawn, in the yard. No name in the book.'),
      T('A porta fecha, e a tocha vai junto.', 'The door shuts, and the torch goes with it.')],
    perguntas: [
      { fala: T('— Nome.', '— Name.'), ops: [
        { id: 'madrinha', txt: T('Na Orla me chamam de Madrinha.', 'On the Shore they call me Godmother.'), ouro: 1, verm: 0, resp: [T('— A Madrinha da Orla. — Ela não ri. — Li sobre ela, num livro de povos de fora, ao lado do dragão do norte. História para marinheiro não ter medo do escuro.', '— The Shore’s Godmother. — She doesn’t laugh. — I read about her, in a book of outland peoples, next to the dragon of the north. A story so sailors won’t fear the dark.')] },
        { id: 'porao', txt: T('Pergunte aos seus soldados como os presos da Orla me chamavam no porão.', 'Ask your soldiers what the Shore’s prisoners called me in the hold.'), ouro: 2, verm: 0, flag: 'influencia', resp: [T('Ela não se vira. O guarda atrás dela fala sozinho, para a parede.', 'She doesn’t turn. The guard behind her speaks on his own, to the wall.'), T('— Se ajoelharam, comandante. Os três. Com as correntes.', '— They knelt, commander. All three. In their chains.'), T('Ela não tira os olhos de mim enquanto ele fala.', 'She doesn’t take her eyes off me while he speaks.')] },
        { id: 'perto', txt: T('Pergunte de novo. Mais perto.', 'Ask again. Closer.'), ouro: 1, verm: 2, resp: [T('Ela não chega mais perto. Olha a minha boca, depois as minhas mãos, depois a boca outra vez.', 'She doesn’t come closer. She looks at my mouth, then my hands, then my mouth again.'), T('— Você faz isso com todo mundo. Comigo, não.', '— You do that to everyone. Not to me.')] },
        { id: 'nao', txt: T('Não tenho.', 'I don’t have one.'), ouro: 0, verm: 0, resp: [T('— Todo mundo tem. Até os Grakh têm.', '— Everyone has one. Even the Grakh do.')] },
      ] },
      { fala: T('— A Sentença queimou uma frota da Orla no Canal das Garças, de lanternas apagadas, esperando. Alguém da Orla vendeu a rota. Que casa?', '— The Sentence burned a Shore fleet in the Heron Channel, lanterns out, waiting. Someone on the Shore sold the route. Which house?'), ops: [
        { id: 'viuvas', txt: T('As Viúvas do Sal. Você sabe, porque foi a sua prata que pagou.', 'The Salt Widows. You know, because it was your silver that paid.'), ouro: 2, verm: 0, resp: [T('— Foi.', '— It was.'), T('Ela não pergunta como eu sei. A pena atrás dela nem se mexe: isso já está escrito.', 'She doesn’t ask how I know. The quill behind her doesn’t even move: that is already written.')] },
        { id: 'ninguem', mente: true, txt: T('Nenhuma casa da Orla vende a Orla.', 'No house of the Shore sells the Shore.'), ouro: 0, verm: 1, resp: [T('— Vendeu por quarenta moedas de prata. Quem assinou o recibo fui eu.', '— It sold it for forty silver coins. I signed the receipt myself.')] },
        { id: 'naosei', mente: true, txt: T('Isso eu não sei.', 'That I don’t know.'), ouro: 0, verm: 0, resp: [T('— Sabe. Quem não sabe disso não senta na mesa das casas.', '— You know. Whoever doesn’t know that doesn’t sit at the houses’ table.')] },
      ] },
      { fala: T('— Um barco de pesca contra a maior galera da costa. Por quê?', '— A fishing boat against the biggest galley on the coast. Why?'), ops: [
        { id: 'trazer', txt: T('Eu queria que me trouxessem até você.', 'I wanted them to bring me to you.'), ouro: 2, verm: 0, resp: [T('Ela não responde. Fica me olhando, como se a resposta ainda não tivesse acabado.', 'She doesn’t answer. She keeps looking at me, as if the answer weren’t finished yet.')] },
        { id: 'conte', txt: T('Quantos dos seus voltaram daquele canal, Laura? Conte. Depois me pergunte de novo.', 'How many of yours came back from that channel, Laura? Count. Then ask me again.'), ouro: 2, verm: 1, resp: [T('Atrás dela, a pena para no papel.', 'Behind her, the quill stops on the page.'), T('— Sei quantos não voltaram — diz ela. — Contei um por um. Agora responda.', '— I know how many didn’t come back — she says. — I counted them one by one. Now answer.'), T('— Eu respondi.', '— I did.')] },
        { id: 'morde', txt: T('Para Redom saber que, sem paz na Orla, o mar sempre vai ser perigoso.', 'So Redom would know that without peace on the Shore, the sea will always be dangerous.'), ouro: 1, verm: 1, resp: [T('— O mar. Não você.', '— The sea. Not you.')] },
        { id: 'piloto', mente: true, txt: T('O meu piloto errou o canal.', 'My pilot took the wrong channel.'), ouro: 0, verm: 1, resp: [T('— O seu piloto morreu. É fácil pôr a culpa em morto.', '— Your pilot is dead. It’s easy to blame the dead.')] },
      ] },
      { fala: (st) => (maruLado(st) ? T('— Os meus homens viram o mar subir. Um mar parado, que respirou fundo e quebrou o mastro da maior galera da costa.', '— My men saw the sea rise. A still sea, that took a deep breath and broke the mast of the biggest galley on the coast.') : T('— Os meus homens viram o mar subir. Um mar parado, que respirou fundo e varreu o convés da maior galera da costa.', '— My men saw the sea rise. A still sea, that took a deep breath and swept the deck of the biggest galley on the coast.')), ops: [
        { id: 'fui', txt: T('Fui eu. E estou aqui, com uma pedra no pulso, porque quis.', 'It was me. And I am here, with a stone on my wrist, because I chose to be.'), ouro: 3, verm: 3, flag: 'confessou', resp: [T('Ela não se mexe. O guarda da porta põe a mão na espada.', 'She doesn’t move. The guard at the door puts his hand on his sword.'), T('— Porque quis — repete ela, como quem põe a palavra numa balança.', '— Because you chose to — she repeats, like someone setting the word on a scale.')] },
        { id: 'leu', se: (st) => !!st.f.lam_madrinha, txt: T('Você leu sobre a Madrinha. Leu o que ela faz com o mar de quem a desagrada.', 'You read about the Godmother. You read what she does with the sea to those who displease her.'), ouro: 2, verm: 1, resp: [T('— Li. Num livro de lendas.', '— I did. In a book of legends.'), T('Mas olha para os meus olhos mais tempo do que antes, e a mão dela sai do joelho.', 'But she looks into my eyes longer than before, and her hand leaves her knee.')] },
        { id: 'vi', txt: T('Eu vi de perto. Mais perto que os seus homens.', 'I saw it up close. Closer than your men.'), ouro: 1, verm: 0, resp: [T('— Viu.', '— You did.'), T('Ela guarda a resposta e não diz onde.', 'She puts the answer away and doesn’t say where.')] },
        { id: 'quer', mente: true, txt: T('O mar da Orla sobe quando quer.', 'The Shore’s sea rises when it likes.'), ouro: 0, verm: 1, resp: [T('— Sobe. Nunca subiu em cima de uma galera de Redom.', '— It does. It never rose over a Redom galley.')] },
      ] },
      { fala: T('— A Orla não tem líder. Redom sabe disso há cem anos. Três casas que se odeiam não sentam numa mesa por causa de uma lenda.', '— The Shore has no leader. Redom has known that for a hundred years. Three houses that hate each other don’t sit at one table for the sake of a legend.'), ops: [
        { id: 'nos', de: 'sarnai', txt: T('Não tem líder. Tem dívida. Sarnai deve barcos a Ossian, Ossian quer o meu nome do lado dele da mesa, e o Recife quer a cabeça de quem vendeu a rota. Eu sei quem deve a quem.', 'It has no leader. It has debts. Sarnai owes Ossian boats, Ossian wants my name on his side of the table, and the Reef wants the head of whoever sold the route. I know who owes whom.'), ouro: 3, verm: 0, flag: 'influencia', resp: [T('Ela se inclina para a frente. Atrás dela, a pena corre.', 'She leans forward. Behind her, the quill runs.'), T('— Redom paga espião na Orla desde que tomou Alvena. Nenhum me trouxe isso.', '— Redom has paid spies on the Shore since it took Alvena. Not one brought me that.')] },
        { id: 'mortos', txt: T('Os mortos daquele barco eram os melhores de casas que não dividem nem a água. Pergunte quem os mandou para morrer comigo.', 'The dead in that boat were the best of houses that won’t even share water. Ask who sent them to die with me.'), ouro: 2, verm: 1, flag: 'influencia', resp: [T('Atrás dela, a pena para, e o guarda da porta fala: — Os corpos tinham marcas de casas diferentes, comandante. No mesmo barco.', 'Behind her, the quill stops, and the guard at the door speaks: — The bodies bore the marks of different houses, commander. In the same boat.'), T('— Casas que não dividem nem a água — diz ela. — E deram os filhos a você.', '— Houses that won’t even share water — she says. — And they gave you their sons.')] },
        { id: 'mar', txt: T('Tem a quem o mar obedece. E ela está na sua cela.', 'It has the one the sea obeys. And she is in your cell.'), ouro: 1, verm: 1, resp: [T('— Na minha cela, tudo obedece a mim. E mar não assina tratado.', '— In my cell, everything obeys me. And the sea doesn’t sign treaties.')] },
        { id: 'agora', txt: T('Agora tem.', 'Now it does.'), ouro: 1, verm: 1, resp: [T('— Desde quando?', '— Since when?'), T('— Desde que eu subi.', '— Since I came up.')] },
        { id: 'segue', mente: true, txt: T('A Orla me segue.', 'The Shore follows me.'), ouro: 0, verm: 1, resp: [T('— Seguiu você até a minha galera. E morreu toda.', '— It followed you to my galley. And all of it died.')] },
      ] },
      { fala: T('— Digamos que a Orla faça o que você manda. Por que você me daria a Orla?', '— Say the Shore does what you tell it. Why would you give the Shore to me?'), ops: [
        { id: 'ordem', txt: T('Porque a Orla não tem lei, tem dívida. Uma casa vende a outra, e quem paga a sua forca é o pescador. Com Redom na mesa, a dívida acaba. E quem sentou Redom na mesa fica com o que sobrar.', 'Because the Shore has no law, it has debts. One house sells another, and the fisherman pays for your gallows. With Redom at the table, the debts end. And whoever seated Redom at the table keeps what’s left.'), ouro: 3, verm: 0, flag: 'motivo',
          resp: [T('— Ordem. Com você do lado de quem dá a ordem. — Ela pesa a frase, devagar. — Isso eu entendo.', '— Order. With you on the side that gives the orders. — She weighs the sentence, slowly. — That I understand.')] },
        { id: 'dona', txt: T('Porque uma Orla de joelhos para Redom ajoelha primeiro para mim.', 'Because a Shore on its knees to Redom kneels to me first.'), ouro: 2, verm: 2, flag: 'motivo',
          resp: [T('— Você quer ser a dona da costa, com a minha bandeira em cima.', '— You want to own the coast, with my flag over it.'), T('A mão dela volta para o joelho. — Pelo menos quer alguma coisa.', 'Her hand goes back to her knee. — At least you want something.')] },
        { id: 'ganha', txt: T('Porque Redom vai ganhar de qualquer jeito. Melhor que ganhe comigo dentro.', 'Because Redom will win either way. Better it wins with me inside.'), ouro: 1, verm: 0,
          resp: [T('— Vai. Então eu não preciso de você.', '— It will. Then I don’t need you.')] },
        { id: 'paz', mente: true, txt: T('Estou cansada de enterrar os meus. A Orla precisa de paz.', 'I’m tired of burying my own. The Shore needs peace.'), ouro: 0, verm: 1,
          resp: [T('— Quem quer paz não quebra a maior galera da costa.', '— Whoever wants peace doesn’t break the biggest galley on the coast.')] },
      ] },
      { fala: T('— E de mim, o que você quer?', '— And from me, what do you want?'), ops: [
        { id: 'prazo', txt: T('Um escrivão seu e um barco. Em três meses, conte as velas na costa.', 'A scribe of yours and a boat. In three months, count the sails on the coast.'), ouro: 2, verm: 0, resp: [T('— E se as velas não sumirem?', '— And if the sails don’t vanish?'), T('— Então a sua forca continua no mesmo lugar, esperando por mim.', '— Then your gallows stays where it is, waiting for me.')] },
        { id: 'galera', de: (st) => (fezCarcereiro(st, 'dunstan') ? 'dunstan' : null), txt: T('Que Redom pare de pagar o imposto de uma aldeia por galera parada. A costa custa a você mais que uma guerra.', 'For Redom to stop paying a village’s taxes for every idle galley. The coast costs you more than a war.'), ouro: 2, verm: 0, resp: [T('— Quem te contou o preço de uma galera?', '— Who told you what a galley costs?'), T('— Os seus carcereiros contam moedas alto na escada.', '— Your jailers count their coins out loud on the stairs.')] },
        { id: 'irmao', de: (st) => (fezCarcereiro(st, 'garrick') ? 'garrick' : tem(st, 'hobb') ? 'hobb' : null), txt: T('Que os seus homens voltem para onde querem estar. No deserto, com quem matou o seu irmão.', 'For your men to go back where they want to be. In the desert, with whoever killed your brother.'), ouro: 2, verm: 2, flag: 'usouSimon',
          resp: (st) => [T('Pela primeira vez a voz dela muda. Fica mais baixa.', 'For the first time her voice changes. It drops.'), T('— Uma pirata qualquer não sabe do meu irmão.', '— Some pirate doesn’t know about my brother.'),
            fezCarcereiro(st, 'garrick') ? T('— Os seus carcereiros sabem. E param na escada quando o nome dele passa perto.', '— Your jailers know. And they stop on the stairs when his name comes near.') : T('— Os seus soldados sabem. E falam alto na frente dos mortos.', '— Your soldiers know. And they talk loud in front of the dead.')] },
        { id: 'costa', txt: T('Que você esqueça a costa.', 'For you to forget the coast.'), ouro: 1, verm: 0, resp: [T('— Eu não esqueço nada.', '— I forget nothing.')] },
        { id: 'mim', txt: T('O que você quiser de mim.', 'Whatever you want from me.'), ouro: 0, verm: 2, resp: (st) => (st.f.lam_perto ? [T('— Eu já disse que comigo não funciona.', '— I already told you it doesn’t work on me.')] : [T('— Você não tem nada que eu queira.', '— You have nothing I want.')]) },
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
    // a leitura de manhã, ensaiada na cabeça dela: o que o conselho murmura depois de cada papel, conforme o lugar dele
    reage: {
      1: { cedo: T('— Perto da metade? Então acabou para eles.', '— Near half? Then it’s over for them.'), tarde: T('— Perderam metade, e mesmo assim se mexem.', '— They lost half, and still they move.') },
      2: { cedo: T('A mesa fica quieta. Alguém olha para a cadeira vazia da Laura.', 'The table goes quiet. Someone looks at Laura’s empty chair.'), tarde: T('— O comandante… — e ninguém termina.', '— The commander… — and no one finishes.') },
      3: { cedo: T('— Vivo? O grande? E deixou o menino voltar?', '— Alive? The big one? And he let the boy come back?'), tarde: T('— Um sentinela assustado. Viu o que quis ver.', '— A frightened sentry. He saw what he wanted to see.') },
      4: { cedo: T('— Os poços são nossos. Ganhamos.', '— The wells are ours. We won.'), tarde: T('— Pelo menos os poços.', '— At least the wells.') },
      5: { cedo: T('— Para o norte. Estão indo embora. Melhor assim.', '— North. They’re leaving. All the better.'), tarde: T('— Para o norte. Fugindo. Vivo e fugindo.', '— North. Running. Alive and running.') },
    },
    dica: T('O que eles ouvem por último é o que levam para o almoço.', 'Whatever they hear last is what they take to lunch.'),
    ensaio: T('Leio os papéis na cabeça, na voz do Edric, e escuto a mesa.', 'I read the papers in my head, in Edric’s voice, and listen to the table.'),
  },

  paginas: [

    // ===================================================== ABERTURA
    { id: 'c00', zona: 'fundo', agua: .8, fundo: { img: IMG('capa'), dim: .55, kb: 'in', clima: 'bolhas', foco: '60% 40%' },
      cartao: { num: T('Capítulo VII · A Madrinha', 'Chapter VII · The Godmother'), nome: T('A Mulher Sem Nome', 'The Woman With No Name'), epigrafe: T('Dê moedas ao mar antes de pedir qualquer coisa. A Madrinha nunca dá nada de graça.', 'Give coins to the sea before you ask for anything. The Godmother never gives anything for free.'), fonte: T('dito de Nove Mastros', 'saying of Nine Masts') } },

    // ===================================================== PARTE I · A ÁGUA
    { id: 'p1', parte: T('I · A Água', 'I · The Water'), zona: 'fundo', agua: 1, fundo: { img: IMG('a01-fundo'), dim: .55, clima: 'bolhas' },
      cartao: { num: T('Parte I', 'Part I'), nome: T('A Água', 'The Water'), epigrafe: T('Quem sobe do fundo não deve explicação a quem ficou no barco.', 'Whoever rises from the deep owes no explanation to those who stayed in the boat.'), fonte: T('dito de Nove Mastros', 'saying of Nine Masts') } },

    { id: 'a01', zona: 'fundo', agua: 1, frase: 'nasce', fundo: { video: VID('a01-fundo'), img: IMG('a01-fundo'), dim: .4, clima: 'bolhas', foco: '55% 45%' },
      texto: [
        V('D00', T('Abro os olhos debaixo d’água e respiro. Aqui embaixo respirar é macio: a água entra fria e sai morna. Lá em cima a luz se quebra em pedaços. Em volta de mim, moças de cauda nadam em roda e cantam. Param quando me veem de olhos abertos.', 'I open my eyes under the water and breathe. Down here breathing is soft: the water goes in cold and comes out warm. Up above, the light breaks into pieces. Around me, girls with tails swim in a ring and sing. They stop when they see my eyes open.')),
        V('D01', T('A frase já estava aqui quando acordei, dobradinha como um bilhete. Duas palavras dela eu não conheço. Laura é um nome sem rosto. Boca Seca deve ser uma doença.', 'The sentence was here when I woke, folded small like a note. Two of its words I don’t know. Laura is a name without a face. Dry Mouth must be some sickness.')),
        T('Não pergunto como cheguei. Subo.', 'I don’t ask how I got here. I go up.'),
      ] },

    { id: 'a02', zona: 'cais', agua: 0, fundo: { img: IMG('a02-escada'), dim: .45, foco: '62% 45%' },
      texto: [
        T('A cidade em cima da água é feita de navios. Dezenas deles, amarrados casco com casco, com pontes de corda de um convés a outro e lanternas penduradas nos mastros. É uma bagunça organizada: filhos e filhas do mar correm de um lado para o outro, atarefados, como cardume.', 'The city on top of the water is made of ships. Dozens of them, lashed hull to hull, with rope bridges from deck to deck and lanterns hung from the masts. It is an orderly mess: sons and daughters of the sea hurry back and forth, busy, like a shoal.'),
        V('D02', T('Na escada do cais, uma mulher derruba o cesto e se ajoelha em cima dos peixes. Gagueja um título que eu nunca ouvi. Estendo a mão. Ela beija meus dedos. Deixo que termine.', 'On the dock stairs a woman drops her basket and kneels on the fish. She stammers a title I have never heard. I hold out my hand. She kisses my fingers. I let her finish.')),
        T('Outros param. Olham para as tábuas. Um velho balbucia alguma coisa e procura moedas na bolsinha com a mão tremendo, e derruba todas nas tábuas.', 'Others stop. They look down at the planks. An old man mumbles something and gropes in his pouch for coins with a shaking hand, and drops them all on the planks.'),
        T('Enquanto subo, a água em volta das estacas fica lisa. Os barcos amarrados param de bater uns nos outros e só voltam a bater quando eu chego no último degrau. Todo o cais viu, e o cais fica calado.', 'As I climb, the water around the pilings goes smooth. The moored boats stop knocking against each other and only start again when I reach the top step. The whole dock saw, and the dock keeps quiet.'),
        T('Alguém me cobre com um pano. Uma menina passa óleo no meu cabelo com os dedos, de trás para a frente, tremendo. Inclino a cabeça para ela alcançar melhor.', 'Someone covers me with a cloth. A girl works oil into my hair with her fingers, back to front, trembling. I tilt my head so she can reach.'),
      ] },

    { id: 'a02b', zona: 'cais', agua: 0, fundo: { img: IMG('a02b-cais'), dim: .45, foco: '55% 45%' },
      texto: [
        T('Até o meio-dia, Nove Mastros inteira sabe. Os barcos que iam sair ficam amarrados. Os que já tinham saído aparecem no horizonte, voltando de vela cheia.', 'By noon, all of Nine Masts knows. The boats that were about to leave stay tied up. The ones already out show on the horizon, coming back under full sail.'),
        T('Uma mulher ergue um bebê acima das cabeças, para ele me ver de longe. Dois meninos mergulham no lugar onde eu subi e voltam de mãos vazias, procurando o que eu deixei lá embaixo.', 'A woman lifts a baby above the heads so it can see me from afar. Two boys dive where I came up and surface empty-handed, looking for whatever I left down there.'),
        T('Não aguentam me olhar por muito tempo. Olham, abaixam, voltam, como se olha o sol na água.', 'They can’t look at me for long. They look, drop their eyes, look back, the way you look at sun on water.'),
        T('Deixo que olhem. Quem olha muito, depois pede.', 'I let them look. Whoever looks long enough asks, later.'),
      ] },

    { id: 'a03', zona: 'cais', agua: 0, fundo: { img: IMG('a03-velha'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Uma velha de orelhas rasgadas abre caminho entre eles, apoiada no ombro de um menino. Para no degrau de baixo e me olha de perto, muito tempo, com a boca quase sem dente aberta.', 'An old woman with torn ears pushes through them, leaning on a boy’s shoulder. She stops on the step below and looks at me up close, a long time, her nearly toothless mouth open.'),
        T('— A Madrinha voltou. Minha avó viu a senhora.', '— The Godmother is back. My grandmother saw you.'),
        V('D03', T('— Então a sua avó viu bem.', '— Then your grandmother saw well.')),
        T('Ela se ajoelha na minha frente, com dificuldade para dobrar as pernas. Primeiro ouço o soluço preso. Depois o choro se solta e escorre pelos meus pés, quente, mais quente que a água do cais.', 'She kneels before me, her legs slow to bend. First I hear the sob she holds in. Then the weeping breaks loose and runs over my feet, warm, warmer than the water of the dock.'),
        T('Choro de gente é mais grosso que água do mar. Tiro o pé de baixo dele, sem pressa, e sorrio para ela. Ela toma o sorriso por bênção e chora mais.', 'People’s tears are thicker than seawater. I slide my foot out from under them, unhurried, and smile at her. She takes the smile for a blessing and weeps harder.'),
      ] },

    { id: 'a03b', zona: 'cais', agua: 0, fundo: { img: IMG('a03-velha'), dim: .6, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Enquanto os chefes das maiores casas da Orla não chegam, ela senta no degrau abaixo do meu e repete o que a avó contava. Fala alto, para os outros ouvirem que ela sabe.', 'While the heads of the Shore’s greatest houses are still on their way, she sits on the step below mine and repeats what her grandmother used to tell. She says it loud, so the others hear that she knows.'),
        T('— A Madrinha ensinou o primeiro barco a mentir para o vento. Quem vai navegar, quem vai se aventurar, quem vai enganar alguém, pede a ela. Pede antes, que depois ela não escuta.', '— The Godmother taught the first boat to lie to the wind. Whoever goes sailing, whoever goes adventuring, whoever means to fool someone, asks her. Asks before, because after she doesn’t listen.'),
        T('— E paga. Moeda no mar, antes de soltar o cabo. Ela não cobra. Mas lembra de quem não pagou.', '— And pays. A coin into the sea before you cast off. She doesn’t charge. But she remembers who didn’t pay.'),
        { t: T('Olho para a minha saia. As moedas costuradas na barra batem umas nas outras quando eu mexo a perna. Prata gasta, ouro velho, cobre verde. Tanta gente me pediu coisas. Passo o dedo nelas e não lembro de nenhuma.', 'I look down at my skirt. The coins sewn into the hem knock together when I move my leg. Worn silver, old gold, green copper. So many people asked me for things. I run a finger over them and don’t remember one.'), moeda: true },
        G('velha', T('— Da casa da minha avó só sobrei eu, Madrinha — diz a velha, mais baixo, só para mim. — Os outros a Sentença levou. Desde que a mulher de Redom subiu, cada ano é pior que o outro. O mar está ficando vermelho, Madrinha. Vermelho das bandeirolas de Redom.', '— Of my grandmother’s house there’s only me left, Godmother — the old woman says, lower, just for me. — The rest the Sentence took. Since their queen rose, every year is worse than the last. The sea is turning red, Godmother. Red with Redom’s pennants.')),
      ] },

    { id: 'a04', zona: 'cabine', agua: 0, fundo: { img: IMG('a04-cabine'), dim: .5, foco: '60% 45%' },
      texto: [
        T('De noite me levam ao maior dos navios, o que fica no meio da cidade e não sai mais do lugar. Três pessoas me esperam na cabine. Cada uma acha que é mais importante que as outras duas.', 'At night they take me to the largest ship, the one in the middle of the city that no longer goes anywhere. Three people are waiting in the cabin. Each thinks they matter more than the other two.'),
        G('sarnai', T('Sarnai é das Viúvas do Sal e tem a idade da velha da escada. Reza de olhos fechados antes de falar e só abre quando chega na parte do pedido.', 'Sarnai is of the Salt Widows, as old as the woman on the stairs. She prays with her eyes shut before she speaks, and opens them only when she reaches the part with the request.')),
        G('ossian', T('Ossian Três-Dedos é humano, dos Mastreiros, com um raio desenhado na pele do pescoço até a orelha. Ele se ajoelha depressa, para ser o primeiro a se levantar.', 'Ossian Three-Fingers is human, of the Mastmen, with lightning drawn on his skin from neck to ear. He kneels quickly, so as to be the first to stand.')),
        G('ruo', T('Ruo é do Recife, é novo e não se ajoelha. Fica de braços cruzados na porta, procurando alguma coisa nos meus olhos. Conheço esse olhar: desconfia de mim. Dou a ele o meu melhor sorriso.', 'Ruo is of the Reef, young, and does not kneel. He stands at the door with his arms crossed, searching my eyes for something. I know that look: he doesn’t trust me. I give him my best smile.')),
      ] },

    { id: 'a05', zona: 'cabine', agua: 0, fundo: { img: IMG('a04-cabine'), dim: .62 },
      // o Ossian conta aqui que quem conjura vai vivo para a Capital: o plano inteiro depende disso, então nunca fica por descobrir
      aoEntrar: (st) => { st.f.resp_vivos = true; },
      texto: [
        T('— Redom tomou Alvena há quatro verões, Madrinha — diz Sarnai. — Fechou o porto para a Orla. Quem leva peixe para vender sai de lá sem o barco.', '— Redom took Alvena four summers ago, Godmother — says Sarnai. — Closed the port to the Shore. Whoever brings fish to sell comes back without the boat.'),
        T('— Para eles, todo barco da Orla é pirata e todo Nymae é feiticeiro — diz Ossian. — Os homens, eles enforcam no molhe de Alvena. Os que eles acham que conjuram, levam vivos para a Capital, para a rainha deles ver com os próprios olhos.', '— To them, every boat of the Shore is a pirate and every Nymae a sorcerer — says Ossian. — The men they hang on the mole at Alvena. The ones they think can conjure, they take alive to the Capital, for their queen to see with her own eyes.'),
        T('— A Sentença queimou a frota do meu irmão no Canal das Garças — diz Ruo. — Ele saiu de noite, por uma rota que só três casas da Orla conheciam, e a galera já estava lá, de lanternas apagadas, esperando. Alguém vendeu a rota para Redom. Se a senhora é quem dizem, afunda a Sentença.', '— The Sentence burned my brother’s fleet in the Heron Channel — says Ruo. — He went out by night, by a route only three houses of the Shore knew, and the galley was already there, lanterns dark, waiting. Someone sold the route to Redom. If you are who they say, sink the Sentence.'),
        V('D04', T('Enquanto eles pedem, eu escuto o resto. Sarnai deve barcos a Ossian, e por isso fala mais alto que ele. Ossian quer o meu nome do lado dele da mesa. Ruo diz "meu irmão" olhando para Sarnai, e Sarnai alisa a saia. Foi alguém da casa dela que vendeu a rota.', 'While they ask, I listen to the rest. Sarnai owes Ossian boats, and so she speaks louder than he does. Ossian wants my name on his side of the table. Ruo says "my brother" looking at Sarnai, and Sarnai smooths her skirt. It was someone of her house who sold the route.')),
        T('Na Orla não há quem mande. Há quem saiba os nós. E eu, de algum jeito, sei todos eles, como se a Orla fosse a minha enseada.', 'On the Shore there is no one who rules. There is whoever knows the knots. And I, somehow, know every one of them, as if the Shore were my own cove.'),
      ],
      escolha: { id: 'chefes', pergunta: T('O que eu dou a eles?', 'What do I give them?'), opcoes: [
        { id: 'doce', fala: true, tom: 'seduzir', aviso: AV.orla, txt: T('Alvena aberta, Sarnai. Eu, do seu lado, Ossian. E a Sentença, Ruo.', 'Alvena open, Sarnai. Me, at your side, Ossian. And the Sentence, Ruo.'),
          resultado: [T('Digo cada pedido de volta, olhando para quem pediu, e cada um ouve só o seu. Sarnai chora sem abrir os olhos. Ossian já se vê sentado ao meu lado em todas as mesas da Orla. Ruo descruza os braços sem perceber.', 'I say each request back, looking at whoever made it, and each of them hears only their own. Sarnai weeps without opening her eyes. Ossian already sees himself sitting at my side at every table on the Shore. Ruo uncrosses his arms without noticing.'),
            T('Antes que saiam, aviso que vou dormir neste navio, e que o povo pode subir a bordo quando o sol nascer. Eles saem certos de que eu tomei o lado deles. Os três.', 'Before they go, I tell them I will sleep on this ship, and that the people may come aboard at sunrise. They leave certain I have taken their side. All three.')] },
        { id: 'fria', fala: true, tom: 'intimidar', aviso: AV.orla, txt: T('Eu vou a Redom.', 'I am going to Redom.'),
          resultado: [T('Ossian ri e pergunta com quantos navios. Não respondo. O navio inteiro sobe um palmo na água, sem onda nenhuma, e desce. Lá fora, as amarras rangem de casco em casco pela cidade toda.', 'Ossian laughs and asks with how many ships. I don’t answer. The whole ship rises a hand’s breadth in the water, with no wave at all, and settles. Outside, the moorings creak from hull to hull across the whole city.'),
            T('Ossian para de rir. Sarnai se ajoelha outra vez e fica no chão.', 'Ossian stops laughing. Sarnai kneels again and stays down.'),
            T('Digo que este navio é meu a partir desta noite, e que de manhã recebo o povo. Os três entendem o convite e saem calados.', 'I tell them this ship is mine from tonight, and that in the morning I will receive the people. The three of them understand the invitation and leave in silence.')] },
        { id: 'comida', gesto: true, tom: 'manipular', aviso: AV.orla, txt: T('Não dizer nada, e deixar que eles falem até acabar.', 'Say nothing, and let them talk until they run out.'),
          resultado: [T('Cada silêncio meu eles enchem com uma coisa a mais. Sarnai acaba oferecendo os barcos que deve a Ossian. Ossian oferece os mastros dele. Ruo oferece o braço.', 'Every silence of mine they fill with one thing more. Sarnai ends up offering the boats she owes Ossian. Ossian offers his masts. Ruo offers his arm.'),
            T('Quando eu me levanto, eles já me deram mais do que tinham vindo pedir.', 'When I stand, they have already given me more than they came to ask for.'),
            T('Digo que este navio é meu a partir desta noite, e que de manhã recebo o povo. Os três entendem o convite e saem calados.', 'I tell them this ship is mine from tonight, and that in the morning I will receive the people. The three of them understand the invitation and leave in silence.')] },
        { id: 'sarnai', fala: true, tom: 'intimidar', aviso: AV.orla, txt: T('Sarnai, quem da sua casa vendeu a rota?', 'Sarnai, who of your house sold the route?'),
          resultado: [T('A cabine prende o ar. Sarnai abre a boca, mas não fala nada, e isso já é resposta para os três. Ela vai passar a noite procurando quem da casa dela me contou, e não vai achar. Não existe segredo entre um peixe e o mar.', 'The cabin holds its breath. Sarnai opens her mouth but says nothing, and that is already an answer for all three. She will spend the night hunting for whoever in her house told me, and she won’t find them. There are no secrets between a fish and the sea.'),
            T('Antes que a briga comece, aviso que o navio agora é meu, e que ao nascer do sol o povo sobe a bordo. Os três entendem o convite e saem calados.', 'Before the quarrel can start, I tell them the ship is mine now, and that at sunrise the people come aboard. The three of them understand the invitation and leave in silence.')] },
      ] } },

    { id: 'a05c', zona: 'cais', agua: 0, fundo: { img: IMG('a05c-oferendas'), dim: .45, foco: '55% 45%' },
      texto: [
        T('De manhã tem fila na prancha do navio. Cada um traz uma moeda e um pedido, e diz o pedido baixo, perto do meu ouvido, como se o resto do cais não estivesse escutando.', 'In the morning there is a line at the ship’s gangplank. Each one brings a coin and a request, and says the request low, close to my ear, as if the rest of the dock weren’t listening.'),
        T('Um pescador quer Alvena de volta, porque o peixe dele apodrece sem porto. Uma mãe quer o filho que a Sentença levou para remar nas galeras. Um rapaz quer que a moça do barco vizinho olhe para ele, e fica vermelho até a ponta das orelhas.', 'A fisherman wants Alvena back, because his fish rots without a port. A mother wants the son the Sentence took to row in the galleys. A young man wants the girl on the next boat to look at him, and goes red to the tips of his ears.'),
        T('Escuto cada um de olhos fechados e não prometo nada. Eles saem da fila achando que eu prometi.', 'I listen to each of them with my eyes closed and promise nothing. They leave the line thinking I did.'),
        T('Nem todos trazem moeda. Uma tecelã traz uma capa tingida de roxo e a põe nos meus ombros, ali mesmo na prancha, por cima da saia das moedas. Do braço dela pende um vestido da mesma cor, dobrado, para quando o meu se gastar. Um velho deixa no degrau uma faca de escamar, fina como folha, e não pede nada. A faca vai para a manga.', 'Not all of them bring coins. A weaver brings a cloak dyed purple and lays it on my shoulders, right there on the gangplank, over the skirt of coins. From her arm hangs a dress of the same color, folded, for when mine wears out. An old man leaves a scaling knife on the step, thin as a leaf, and asks for nothing. The knife goes into my sleeve.'),
      ],
      escolha: { id: 'oferendas', pergunta: T('Como eu recebo?', 'How do I receive them?'), opcoes: [
        { id: 'nomes', gesto: true, tom: 'seduzir', aviso: AV.orla, txt: T('Tocar a testa de cada um e perguntar o nome, perto do ouvido.', 'Touch each forehead and ask the name, close to the ear.'),
          resultado: [T('Cada um diz o nome, e eu devolvo uma vez, com a boca quase encostada. Eles saem da fila com a mão na testa, onde eu toquei. À tarde, metade do cais repete o próprio nome do jeito que eu disse.', 'Each of them says their name, and I give it back once, my mouth almost touching. They leave the line with a hand on their forehead, where I touched. By afternoon, half the dock is saying its own name the way I said it.')] },
        { id: 'chao', gesto: true, tom: 'intimidar', aviso: AV.orla, txt: T('Não tocar em nenhum deles. Deixar que ponham a moeda no chão e saiam.', 'Touch none of them. Let them set the coin on the floor and go.'),
          resultado: [T('Eles põem a moeda na frente dos meus pés e esperam uma palavra que não vem. Saem andando de costas. À noite as moedas são um monte, e o cais dá a volta para não passar perto.', 'They set the coin before my feet and wait for a word that doesn’t come. They leave walking backward. By night the coins are a heap, and the dock walks the long way round to avoid it.')] },
        { id: 'mentira', gesto: true, tom: 'manipular', aviso: AV.orla, txt: T('Devolver a moeda de quem mentiu no pedido.', 'Give back the coin of whoever lied in the request.'),
          resultado: [T('O terceiro da fila pede o barco do irmão de volta e coça a orelha quando diz irmão. O irmão está vivo, no barco ao lado, e os dois brigaram por uma rede. Devolvo a moeda sem dizer nada. Ele fica com ela na mão, branco.', 'The third in line asks for his brother’s boat back and scratches his ear when he says brother. The brother is alive, on the next boat over, and the two fought over a net. I hand back the coin without a word. He stands there holding it, white.'),
            T('Dali em diante, a fila pede baixo e pede certo.', 'From then on, the line asks quietly and asks true.')] },
      ] } },

    { id: 'a06', zona: 'cais', agua: 0, fundo: { img: IMG('a06-moeda'), dim: .45, foco: '62% 50%' },
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

    { id: 'a06b', zona: 'cabine', agua: 0, fundo: { img: IMG('a06b-plano'), dim: .5, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('Mando chamar Ossian. Ele vem correndo, porque fui eu que chamei. Ponho a moeda na mesa, com o rosto para cima.', 'I send for Ossian. He comes running, because I was the one who called. I set the coin on the table, face up.'),
        T('— É a rainha deles — diz ele, sem tocar. — Laura D’Orrose. Lá em Redom chamam de Lâmina, ou de General-Rainha. Mandou fazer essa moeda no ano em que tomou Alvena.', '— That’s their queen — he says, without touching it. — Laura D’Orrose. In Redom they call her the Blade, or the General-Queen. She had this coin struck the year she took Alvena.'),
        T('Na porta, sem que eu pergunte, ele conta o que acha que vai me servir.', 'At the door, without my asking, he tells me what he thinks will be of use.'),
        T('— Em Alvena, quem sabe das coisas é a casa da Ondina. Taverna embaixo, camas em cima. Os soldados de Redom bebem lá de graça e pagam com a língua.', '— In Alvena, the one who knows things is Ondina’s house. Tavern downstairs, beds upstairs. Redom’s soldiers drink there for free and pay with their tongues.'),
        T('Ele espera alguma coisa em troca. Passo a moeda entre os dedos, olho para ele outra vez, sorrio, e depois olho para a porta. Ele sai como quem foi pago.', 'He expects something in return. I pass the coin between my fingers, look at him again, smile, and then look at the door. He leaves like a man who has been paid.'),
      ] },

    { id: 'a06c', zona: 'cabine', agua: 0, fundo: { img: IMG('a06b-plano'), dim: .62, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('Sozinha, viro a moeda na mesa com a ponta do dedo. General-Rainha, Lâmina: isso é para quem deve alguma coisa a ela. Para mim, é Laura, a que manda trazer os conjuradores vivos, para ver de perto.', 'Alone, I turn the coin on the table with a fingertip. General-Queen, Blade: those are for people who owe her something. To me she is Laura, the one who has conjurers brought to her alive, to see them up close.'),
        T('Ela não vem à Orla. Vai ter de mandar me buscar.', 'She doesn’t come to the Shore. She’ll have to send for me.'),
        V('D20', T('Para quem é da Orla, Redom só abre uma porta, e quem abre é o carcereiro. Preciso que a Sentença me pegue. Viva.', 'For anyone from the Shore, Redom opens only one door, and the one who opens it is the jailer. I need the Sentence to catch me. Alive.')),
      ] },

    { id: 'a07', zona: 'cais', agua: 0, fundo: { img: IMG('a07-taverna'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Antes de ir atrás da Sentença e deixar que ela me pegue, preciso passar por Alvena. Fica a meio dia de vela, na costa, e é de Redom há quatro verões. No molhe de lá, Redom enforca Nymae. Para andar em Alvena, preciso de um rosto humano e da roupa que vem com ele.', 'Before I go after the Sentence and let her take me, I need to pass through Alvena. It lies half a day’s sail away, on the coast, and has been Redom’s for four summers. On its mole, Redom hangs Nymae. To walk in Alvena, I need a human face and the clothes that come with it.'),
        T('Digo isso uma vez na taverna do cais, sem levantar a voz. Não preciso explicar o plano: várias mulheres humanas da Orla já estão de pé, oferecendo o próprio corpo. Se eu pedisse, me dariam a vida. Fico com a que ri mais alto, a quem faltam alguns dentes.', 'I say it once in the dockside tavern, without raising my voice. I don’t need to explain the plan: several human women of the Shore are already on their feet, offering their own bodies. If I asked, they would give me their lives. I take the one who laughs loudest, the one missing a few teeth.'),
        T('Iska vende peixe em Alvena toda semana, e os soldados de lá conhecem a cara dela. Ela sobe na mesa para mostrar o braço, feliz de ser a escolhida: uma cicatriz em zigue-zague do pulso ao cotovelo. — Hah! Raio! No meio do mar, com a âncora na mão. Fiquei três dias sem ouvir nada. A Madrinha me favorece.', 'Iska sells fish in Alvena every week, and the soldiers there know her face. She climbs on the table to show her arm, glad to be the chosen one: a zigzag scar from wrist to elbow. — Hah! Lightning! In the middle of the sea, with the anchor in my hand. I couldn’t hear a thing for three days. The Godmother favors me.'),
        G('iska', T('Os outros já ouviram a história e riem igual. Eu olho a cicatriz. Raio não deixa beira reta. Aquilo foi faca, de baixo para cima, de alguém que estava perto o bastante para ela não ver.', 'The others have heard the story before and laugh the same. I look at the scar. Lightning doesn’t leave a straight edge. That was a knife, from below, from someone close enough that she didn’t see it coming.')),
        T('Em Alvena, alguém pode perguntar da cicatriz. A Iska que eu vou ser tem de saber a verdade.', 'In Alvena, someone may ask about the scar. The Iska I am going to be has to know the truth.'),
      ],
      escolha: { id: 'iskaColo', pergunta: T('A Iska', 'Iska'), opcoes: [
        { id: 'colo', gesto: true, tom: 'seduzir', flag: 'iskaDente', txt: T('Chamar a Iska para uma conversa particular.', 'Call Iska aside for a private word.'),
          resultado: [T('Ela para de rir e me segue até uma mesa mais afastada. Sem floreio, com a voz baixa perto do ouvido dela, pergunto da vida dela, devagar, até chegar na cicatriz.', 'She stops laughing and follows me to a table further off. No flourishes: low-voiced, close to her ear, I ask about her life, slowly, until I get to the scar.'),
            T('Ela conta, envergonhada: foi um soldado da guarnição, no molhe, por causa de um cesto de peixe passado que ela vendeu a ele. — Ele ainda está lá — diz. — Tem um dente de ouro.', 'She tells it, ashamed: a soldier of the garrison, on the mole, over a basket of stale fish she sold him. — He’s still there — she says. — He has a gold tooth.')] },
      ] } },

    { id: 'a08', zona: 'cais', agua: 0, fundo: { video: VID('a08-metamorfose'), img: IMG('a08-metamorfose'), dim: .4, foco: '60% 40%' },
      texto: [
        T('A Iska senta diante de mim para eu olhar. Fecho os olhos e penso nela: a risada, o raio no braço, o peso todo numa perna só.', 'Iska sits before me so I can look. I close my eyes and think of her: the laugh, the lightning on her arm, all her weight on one leg.'),
        V('D06', T('A pele puxa. As escamas entram uma por uma, como dentes de pente. As orelhas se dobram e colam no crânio, e o mundo fica seco e alto. Minha boca muda de tamanho.', 'My skin pulls. The scales sink in one by one, like the teeth of a comb. My ears fold and press flat to my skull, and the world goes dry and loud. My mouth changes size.')),
        { t: T('Digo o nome dela em voz alta, para experimentar. A voz que sai é a dela, rouca de rir, na primeira tentativa.', 'I say her name aloud, to try it. The voice that comes out is hers, hoarse from laughing, on the first attempt.'), voz: 'D07', veste: 'iska' },
        T('Ela tapa a própria boca, de olhos arregalados. Pelo jeito, não tinha entendido que eu ia usar o corpo dela de verdade. Tira a roupa ali mesmo e me entrega, sem eu precisar pedir.', 'She covers her own mouth, eyes wide. It seems she hadn’t understood I would really use her body. She takes off her clothes right there and hands them to me, without my having to ask.'),
        T('Visto a camisa dela. Serve.', 'I put on her shirt. It fits.'),
        T('Duas Iskas no mesmo cais é uma Iska a mais.', 'Two Iskas on the same dock is one Iska too many.'),
      ],
      escolha: { id: 'roupa1', pergunta: T('E a Iska de verdade?', 'And the real Iska?'), opcoes: [
        { id: 'roubar', fala: true, tom: 'manipular', txt: T('Amanhã você não põe o pé em Alvena.', 'Tomorrow you don’t set foot in Alvena.'),
          resultado: [T('Ela não pergunta por quê. Faz que sim, rindo, e desce para o porão do navio com uma garrafa, para passar o dia lá embaixo.', 'She doesn’t ask why. She nods, laughing, and goes down into the ship’s hold with a bottle, to spend the day below.'),
            T('Vai contar essa noite pelo resto da vida.', 'She will tell of this night for the rest of her life.')] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'intimidar', corpos: 1, txt: T('Levar a Iska até a ponte de corda e matá-la, para só existir uma.', 'Walk Iska to the rope bridge and kill her, so there is only one.'),
          resultado: [T('Ela vai comigo, contando a história do raio outra vez. A faca de escamar sai da minha manga e volta. A ponte balança um pouco e para. A água embaixo da cidade aceita o que eu dou a ela.', 'She comes with me, telling the lightning story again. The scaling knife leaves my sleeve and comes back. The bridge sways a little and stops. The water under the city takes what I give it.'),
            T('Amanhã, em Alvena, só existe uma Iska.', 'Tomorrow, in Alvena, there is only one Iska.')] },
      ] } },

    { id: 'a09', zona: 'alvena', agua: 0, veste: 'iska', fundo: { img: IMG('a09-alvena'), dim: .45, foco: '60% 40%' },
      texto: [
        T('Alvena é uma cidade de pedra clara com um farol na ponta do molhe. No farol tem uma bandeira vermelha com uma espada branca, e a guarda da espada é uma balança.', 'Alvena is a town of pale stone with a lighthouse at the end of the mole. On the lighthouse flies a red banner with a white sword, and the sword’s guard is a pair of scales.'),
        T('Soldados de Redom bebem de graça nas mesas da rua. Quem passa perto deles abaixa a cabeça sem perceber que abaixou.', 'Redom’s soldiers drink for free at the street tables. Whoever passes near them lowers their head without noticing they did.'),
        T('Ando com o rosto da Iska, e os olhos passam por mim e seguem. Tenho uma manhã e duas perguntas: quando a Sentença passa, e como chegar perto dela sem ir para o fundo antes da hora. O que Redom faz com quem conjura, o Ossian já me contou.', 'I walk in Iska’s face, and eyes pass over me and move on. I have one morning and two questions: when the Sentence comes through, and how to get close to her without going to the bottom too soon. What Redom does with conjurers, Ossian has already told me.'),
      ],
      minijogo: 'escuta', jogoId: 'alvena', mgNome: T('Ouvir os pequenos de Alvena', 'Listen to the small folk of Alvena'),
      depois: (st) => [
        st.f.fraseBoca ? T('Boca Seca é um deserto. Péssima notícia: antes fosse uma doença.', 'Dry Mouth is a desert. Bad news: I’d rather it were a disease.')
          : T('O sino do farol bate o meio-dia. Saio do mercado com o que ouvi.', 'The lighthouse bell strikes noon. I leave the market with what I heard.'),
      ] },

    { id: 'a10', zona: 'alvena', agua: 0, veste: 'iska', fundo: { img: IMG('a10-soldado'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Na saída do mercado, um soldado de Redom agarra o meu braço. Está bêbado e acha que me conhece.', 'At the market gate a Redom soldier grabs my arm. He is drunk and thinks he knows me.'),
        T('— Ô, marinheira. Você me deve um beijo desde o verão.', '— Hey, sailor girl. You’ve owed me a kiss since summer.'),
        se((st) => !!st.f.iskaDente, T('Ele ri, e na boca dele brilha um dente de ouro.', 'He laughs, and a gold tooth flashes in his mouth.')),
        T('O aperto dele dói, e a dor sobe pelo braço. O rosto da Iska escorrega.', 'His grip hurts, and the pain runs up my arm. Iska’s face slips.'),
      ],
      piscar: { id: 'p1', antes: 3,
        ok: [T('Fecho os olhos. Quando abro, sou a Iska outra vez.', 'I close my eyes. When I open them I am Iska again.')],
        falha: [T('Demoro. Um menino parado ao lado do soldado vê a escama subir pelo pescoço da marinheira e afundar de novo. Arregala os olhos, sorri para mim e sai correndo com o segredo.', 'I’m too slow. A boy standing by the soldier sees scales rise along the sailor’s neck and sink again. His eyes go wide, he smiles at me, and he runs off with the secret.')] } },

    { id: 'a10b', zona: 'alvena', agua: 0, veste: 'iska', fundo: { img: IMG('a10-soldado'), dim: .55, lado: 'dir', foco: '35% 40%' },
      texto: [T('Ele não solta. Puxa a marinheira para perto da boca dele e espera o beijo.', 'He doesn’t let go. He pulls the sailor girl toward his mouth and waits for the kiss.')],
      escolha: { id: 'dente', pergunta: T('O soldado', 'The soldier'), opcoes: [
        { id: 'beijar', gesto: true, tom: 'seduzir', txt: T('Beijar o soldado.', 'Kiss the soldier.'),
          resultado: [T('Beijo a boca dele, devagar, do jeito que a Iska não beijaria. Ele ri, satisfeito, e me solta.', 'I kiss his mouth, slowly, the way Iska never would. He laughs, pleased, and lets me go.'),
            T('— Depois do presentinho no braço resolveu se comportar, hein? Te vejo hoje à noite na Ondina. Se você não aparecer… já sabe.', '— After that little present on your arm you’ve decided to behave, eh? See you tonight at Ondina’s. If you don’t show up… you know.'),
            T('Ele vai esperar a noite inteira. A Iska de verdade não vai pôr o pé em Alvena tão cedo.', 'He’ll wait all night. The real Iska won’t set foot in Alvena any time soon.')] },
        { id: 'ameacar', gesto: true, tom: 'intimidar', txt: T('Encostar a faca de escamar na barriga dele.', 'Press the scaling knife to his belly.'),
          resultado: (st) => [st.f.iskaDente
            ? T('Ponho a minha mão por cima da dele e desço as duas até a cicatriz, sem pressa, pelo caminho que a faca dele fez. Ele olha o zigue-zague, depois sente a ponta da minha faca contra a barriga. O riso acaba. Solta sozinho e vai embora sem o beijo.', 'I lay my hand over his and bring both down to the scar, unhurried, along the road his knife once made. He looks at the zigzag, then feels the point of my knife against his belly. The laugh stops. He lets go on his own and leaves without the kiss.')
            : T('A faca sai da manga e encosta na barriga dele, por baixo da camisa, longe dos olhos do mercado. O riso acaba. Ele me solta e vai embora sem o beijo, olhando para trás duas vezes.', 'The knife leaves my sleeve and rests against his belly, under his shirt, out of the market’s sight. The laugh stops. He lets me go and leaves without the kiss, looking back twice.')] },
      ] } },

    // o respiro: a noite depois de Alvena. Nenhuma informação nova: o que ela ouviu vira plano, na boca dela
    { id: 'a11', zona: 'cais', agua: 0, veste: 'ela', fundo: { img: IMG('a11-cais-noite'), dim: .5, foco: '60% 45%' },
      texto: (st) => [
        T('' + (st.escolhas.roupa1 === 'matar' ? 'De volta a Nove Mastros, devolvo o rosto da Iska ao mar.' : 'De volta a Nove Mastros, devolvo o rosto da Iska.') + ' Passei o dia com a boca dela, que ri de tudo e mastiga aberta. Lavo a minha no mar até sair a sensação de ter sido uma humana feia.', '' + (st.escolhas.roupa1 === 'matar' ? 'Back in Nine Masts, I give Iska’s face back to the sea.' : 'Back in Nine Masts, I give Iska her face back.') + ' I spent the day in her mouth, which laughs at everything and chews open. I rinse mine in the sea until the feeling of having been an ugly human is gone.'),
        T('Sento na popa do navio com os pés na água e espero a água esquentar.', 'I sit on the ship’s stern with my feet in the water and wait for the water to warm.'),
        sabe(st, 'rota') ? T('Nove dias, no Canal das Garças. Sei onde esperar.', 'Nine days, in the Heron Channel. I know where to wait.')
          : T('O dia da galera eu não sei. Espero no mar o tempo que for.', 'The galley’s day I don’t know. I’ll wait at sea as long as it takes.'),
        sabe(st, 'perto') ? T('Ela pesca os afogados da Orla e vende no molhe, por peso. Chego boiando.', 'She fishes up the Shore’s drowned and sells them on the mole, by weight. I’ll arrive floating.')
          : T('Como chegar perto dela sem levar seta, ainda não sei.', 'How to get close to her without taking a bolt, I still don’t know.'),
        sabe(st, 'vivos') ? T('Quem conjura vai vivo para a Laura. Vão me ver conjurar.', 'Whoever conjures goes to Laura alive. They’ll see me conjure.')
          : T('O que Redom faz com quem pega vivo, descubro lá.', 'What Redom does with those it takes alive, I’ll find out there.'),
        T('Falta o barco, e quem vá nele.', 'What’s missing is the boat, and who goes in it.'),
      ] },

    { id: 'a11b', zona: 'cais', agua: 0, veste: 'ela', fundo: { img: IMG('a02b-cais'), dim: .55, foco: '55% 45%' },
      texto: [
        T('Em Nove Mastros, quando uma casa quer uma coisa grande do mar, dá ao mar o melhor que tem. Um barco sai com o melhor piloto, a melhor capitã, o melhor besteiro. Nem todos voltam, e ninguém chama isso de morrer. Chamam de ser dado ao mar.', 'In Nine Masts, when a house wants something great from the sea, it gives the sea the best it has. A boat goes out with the best pilot, the best captain, the best crossbowman. Not all of them come back, and no one calls that dying. They call it being given to the sea.'),
        T('Ruo pediu a Sentença. Na manhã seguinte, as casas trazem os seus melhores até os degraus onde eu subi e param no degrau de baixo do meu, por conta própria.', 'Ruo asked for the Sentence. The next morning the houses bring their best to the steps where I came up and stop on the step below mine, without anyone telling them to.'),
        T('Cinco. Nenhum pergunta quantos vão, nem se voltam. Esperam que eu olhe.', 'Five. None of them asks how many go, or whether they come back. They wait for me to look.'),
      ],
      minijogo: 'tripulacao', jogoId: 'tripulacao', mgNome: T('Escolher três', 'Choose three'),
      aoTerminar: (st, r, ctx) => { (r.escolhidos || []).forEach((k, i) => { st.avisos.push(AV[k]); setTimeout(() => ctx.toast(AV[k]), 300 + i * 1100); }); },
      depois: [T('Três. Os escolhidos se ajoelham no degrau de alegria, e as casas deles choram de orgulho. O barco tem quatro lugares, e o quarto é meu.', 'Three. The chosen kneel on the step for joy, and their houses weep with pride. The boat has four places, and the fourth is mine.')] },

    // a véspera do canal: uma noite só. Cada um recebe uma tarefa, e o jeito de dar a tarefa muda a lealdade (escondida).
    // A lealdade decide quem tenta virar o barco diante da Sentença, quem ajuda e quem pode ser salvo.
    { id: 'a12', zona: 'mar', agua: 0, fundo: { video: VID('b01-mar'), img: IMG('b01-mar'), dim: .55, foco: '55% 50%' },
      texto: [
        T('De Nove Mastros ao Canal das Garças são dois dias de vela. A tripulação fala baixo perto de mim, como quem está na maior aventura da vida.', 'From Nine Masts to the Heron Channel is two days under sail. The crew speaks low near me, like people on the greatest adventure of their lives.'),
        (st) => (sabe(st, 'rota') ? null : T('Nenhum dos pequenos de Alvena soube me dizer quando a Sentença passa. Vamos esperar no canal sem dia marcado, e a tripulação percebe que eu também não sei.', 'None of the small folk of Alvena could tell me when the Sentence comes through. We will wait in the channel with no day set, and the crew sees that I don’t know either.')),
        T('Na última noite antes do canal, chamo um de cada vez até a proa. Cada um vai fazer uma coisa só, e nenhum sabe a do outro.', 'On the last night before the channel, I call them one at a time to the bow. Each of them will do one thing only, and none knows the others’.'),
      ] },

    { id: 'a12m', se: (st) => noBarco(st, 'maru'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-maru'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Maru não larga o leme, então sou eu que vou até ele.', 'Maru won’t let go of the tiller, so I go to him.'),
        G('maru', T('Um dos olhos dele é branco. Quando fala comigo, vira esse lado para mim, como se fosse o lado que me vê melhor.', 'One of his eyes is white. When he speaks to me, he turns that side toward me, as if it were the side that sees me best.')),
        T('— Quando ela vier, você põe o barco no meio do canal, à vista dela — digo. — E quando ela virar o costado, você vira o nosso de lado.', '— When she comes, you put the boat in the middle of the channel, in her sight — I say. — And when she turns her side, you turn ours broadside.'),
        T('Ele demora. — No meio do canal, Madrinha? À vista? A minha mãe dizia que a Madrinha ensinou o primeiro barco a mentir para o vento. Não a ir de peito aberto contra ele.', 'He takes his time. — Mid-channel, Godmother? In plain sight? My mother used to say the Godmother taught the first boat to lie to the wind. Not to go chest-first against it.'),
      ],
      escolha: { id: 'n_maru', opcoes: [
        { id: 'doce', gesto: true, tom: 'seduzir', aviso: AV.maru, aoEscolher: ganha('maru', 2), txt: T('Encostar atrás dele, com a boca perto da orelha do lado branco.', 'Lean against his back, my mouth close to the ear on his white side.'),
          resultado: [T('— Eu não minto para o vento, Maru. Ele é que acredita em mim.', '— I don’t lie to the wind, Maru. It believes me.'),
            T('Ele fica imóvel, sem respirar, até eu me afastar. Depois amarra um pano branco no leme, para achar o lado certo sem olhar, e treina a virada no escuro até o sol.', 'He goes still, not breathing, until I move away. Then he ties a white rag to the tiller, to find the right side without looking, and practices the turn in the dark until sunrise.')] },
        { id: 'divertida', gesto: true, tom: 'manipular', aviso: AV.maru, aoEscolher: ganha('maru', 1), txt: T('Pôr a mão na água e deixar o mar mostrar a ele.', 'Put my hand in the water and let the sea show him.'),
          resultado: [T('Debaixo do barco, a água acende em fio. Um caminho claro entre as pedras, o único fundo bastante para uma galera de três mastros.', 'Beneath the boat, the water lights up in a thread. A clear path between the rocks, the only deep water enough for a three-masted galley.'),
            T('— Ela só cabe por aqui — digo. — E só aqui tem largura para virar.', '— She only fits through here — I say. — And only here is there room to turn.'),
            T('Ele olha o fio de luz até apagar. Não fala mais dos recifes.', 'He watches the thread of light until it fades. He doesn’t mention the reefs again.')] },
        { id: 'fria', fala: true, tom: 'intimidar', aviso: AV.maru, txt: T('Sua mãe também dizia que a Madrinha lembra de quem não pagou.', 'Your mother also used to say the Godmother remembers who didn’t pay.'),
          resultado: [T('Ele tira uma moeda do bolso e joga no mar sem pensar, como fazia em menino. Não discute mais.', 'He takes a coin from his pocket and throws it into the sea without thinking, the way he did as a boy. He doesn’t argue again.'),
            T('Vai pilotar à vista porque tem medo de mim. O medo dele vai durar até a galera aparecer.', 'He’ll steer in plain sight because he is afraid of me. His fear will last until the galley shows.')] },
      ] } },

    { id: 'a12l', se: (st) => noBarco(st, 'lio'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-lio'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Lio chega com o pano dobrado no braço, o mesmo que segurou para mim nos degraus do cais.', 'Lio comes with the cloth folded over his arm, the same one he held for me on the dock steps.'),
        T('— A minha casa só tinha a mim para dar, Madrinha. A senhora quer o quê de mim?', '— My house only had me to give, Godmother. What do you want from me?'),
      ],
      escolha: { id: 'n_lio', opcoes: [
        { id: 'doce', gesto: true, tom: 'seduzir', aviso: AV.lio, aoEscolher: ganha('lio', 1), txt: T('Pôr a mão no peito dele, em cima do coração, até ele parar de tremer.', 'Lay my hand on his chest, over his heart, until he stops trembling.'),
          resultado: [T('Demora. Quando para, eu tiro a mão.', 'It takes a while. When it stops, I take my hand away.'),
            T('— Quando os outros quiserem voltar, você rema para a galera — digo. — Só você.', '— When the others want to turn back, you row toward the galley — I say. — Only you.'),
            T('Ele dorme sentado no banco, com as mãos já no cabo do remo.', 'He sleeps sitting on the bench, his hands already on the oar.')] },
        { id: 'divertida', gesto: true, tom: 'manipular', aviso: AV.lio, aoEscolher: ganha('lio', 2), txt: T('Estender a mão sobre a cabeça dele.', 'Hold my hand out over his head.'),
          resultado: [T('A água do mar sobe pela borda num fio, passa por cima do barco e cai sobre ele em gotas finas. Ele lambe a boca. Não tem sal.', 'The seawater climbs the side in a thread, passes over the boat, and falls on him in fine drops. He licks his lips. There is no salt.'),
            T('— Quando os outros quiserem voltar, você rema para a galera — digo. — Depois, chove.', '— When the others want to turn back, you row toward the galley — I say. — Afterward, it rains.'),
            T('Ele acredita nas duas coisas do mesmo jeito.', 'He believes both things the same way.')] },
        { id: 'fria', fala: true, tom: 'intimidar', aviso: AV.lio, aoEscolher: ganha('lio', 1), txt: T('Que você reme. Quando os outros quiserem voltar, você rema mais forte.', 'That you row. When the others want to turn back, you row harder.'),
          resultado: [T('Ele faz que sim antes de entender. Depois entende, e faz que sim outra vez, mais devagar.', 'He nods before he understands. Then he understands, and nods again, more slowly.'),
            T('Passa a noite no banco do remo, sem dormir.', 'He spends the night on the rowing bench, without sleeping.')] },
      ] } },

    { id: 'a12t', se: (st) => noBarco(st, 'teshka'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-teshka'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Teshka chega à proa limpando a faca na coxa. É a primeira vez que fala comigo.', 'Teshka comes to the bow wiping her knife on her thigh. It is the first time she speaks to me.'),
        T('— O meu marido foi dado ao mar no ano passado, numa promessa de Alvena. O mar ficou com ele. Eu rezei para a senhora sete noites, de joelhos nos degraus. A senhora não veio.', '— My husband was given to the sea last year, on a promise of Alvena. The sea kept him. I prayed to you seven nights, on my knees on the steps. You didn’t come.'),
      ],
      escolha: { id: 'n_teshka', opcoes: [
        { id: 'fria', fala: true, tom: 'intimidar', aviso: AV.teshka, flag: 'teshkaGalera', aoEscolher: ganha('teshka', 1), txt: T('O mar ficou com ele porque ele era o melhor. Você está neste barco pelo mesmo motivo.', 'The sea kept him because he was the best. You are on this boat for the same reason.'),
          resultado: [T('A faca para. Ela entende o que é ser dada ao mar e se endireita como quem foi chamada pelo nome.', 'The knife stops. She understands what it is to be given to the sea, and straightens like someone called by name.'),
            T('— Então, quando a galera encostar, eu subo primeiro — diz.', '— Then when the galley comes alongside, I go up first — she says.')] },
        { id: 'doce', gesto: true, tom: 'seduzir', aviso: AV.teshka, flag: 'teshkaGalera', aoEscolher: ganha('teshka', 1), txt: T('Pôr os dedos molhados no queixo dela e levantar o rosto até o meu.', 'Put my wet fingers under her chin and lift her face to mine.'),
          resultado: [T('— Agora eu vim — digo. — Quando a galera encostar, você sobe primeiro. Eu vou estar olhando.', '— Now I have come — I say. — When the galley comes alongside, you go up first. I will be watching.'),
            T('Ela aguenta o olhar mais do que qualquer um no barco. Depois guarda a faca, tira o gancho de abordagem de baixo do banco e passa a noite enrolando a corda no braço.', 'She holds my gaze longer than anyone on the boat. Then she sheathes the knife, pulls the boarding hook from under the bench, and spends the night winding the rope around her arm.')] },
        { id: 'divertida', fala: true, tom: 'manipular', aviso: AV.teshka, flag: 'teshkaGalera', aoEscolher: ganha('teshka', 2), txt: T('Quem prometeu Alvena da outra vez?', 'Who promised Alvena the last time?'),
          resultado: [T('— Ossian — diz ela, e cospe o nome na água. — Mandou o meu marido na frente e ficou atrás, olhando.', '— Ossian — she says, and spits the name into the water. — Sent my husband in front and stayed behind, watching.'),
            T('— O Ossian nunca pôs o pé numa galera — digo. — Amanhã você põe.', '— Ossian never set foot on a galley — I say. — Tomorrow you will.'),
            T('Ela olha para o escuro, para o lado do canal. — Primeiro que todo mundo.', 'She looks into the dark, toward the channel. — Before anyone else.')] },
      ] } },

    { id: 'a12n', se: (st) => noBarco(st, 'nhale'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-nhale'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Nhalé sobe só o rosto, com o cabelo aberto na água como tinta. Estava na roda que cantava quando eu abri os olhos.', 'Nhalé raises only her face, her hair spread in the water like ink. She was in the ring that sang when I opened my eyes.'),
        T('— As velhas da roda mandaram perguntar de onde a senhora veio, antes da roda.', '— The old ones of the ring sent me to ask where you came from, before the ring.'),
      ],
      escolha: { id: 'n_nhale', opcoes: [
        { id: 'divertida', gesto: true, tom: 'manipular', aviso: AV.nhale, aoEscolher: ganha('nhale', 1), flag: 'rodaConta', txt: T('Pôr a mão na água, sem responder.', 'Put my hand in the water, without answering.'),
          resultado: [T('A água em volta dela fica parada como vidro. — Você estava lá — digo. — Conte você.', 'The water around her goes still as glass. — You were there — I say. — You tell it.'),
            T('Ela conta. As Merés cantavam naquele ponto havia três gerações, uma roda por lua, e nada subia. Na lua de antes da minha, as velhas quiseram parar. As novas continuaram. Subiu.', 'She tells it. The Merés had sung at that spot for three generations, one ring each moon, and nothing ever rose. The moon before mine, the old ones wanted to stop. The young ones kept on. Something rose.'),
            T('Quando acaba, ela entende que respondeu à própria pergunta. Passa a noite embaixo do barco, batendo na quilha baixinho, para eu saber que está ali.', 'When she finishes, she understands she has answered her own question. She spends the night beneath the boat, knocking softly on the keel, so I know she is there.')] },
        { id: 'fria', fala: true, tom: 'intimidar', aviso: AV.nhale, aoEscolher: ganha('nhale', -1), txt: T('Diga às velhas que eu respondo quando eu voltar.', 'Tell the old ones I’ll answer when I come back.'),
          resultado: [T('Ela dá um meio sorriso e afunda até sumir da minha vista. Sinto ela acompanhando o barco por baixo.', 'She gives half a smile and sinks until she is out of my sight. I can feel her following the boat from below.')] },
      ] } },

    { id: 'a12b', se: (st) => noBarco(st, 'brann'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-brann'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Brann engraxa a besta no colo. Cada vez que alguém do barco diz Madrinha, ele cospe na água.', 'Brann greases the crossbow in his lap. Every time someone on the boat says Godmother, he spits into the water.'),
        T('— Em Alvena, Madrinha era qualquer Nymae que soubesse fazer truque barato com caneca d’água na porta da taverna — diz. — Se você é quem todos dizem, o que a gente vai fazer de tão importante?', '— In Alvena, Godmother was any Nymae who could do a cheap trick with a cup of water at the tavern door — he says. — If you’re who everyone says, what are we off to do that’s so important?'),
      ],
      escolha: { id: 'n_brann', opcoes: [
        { id: 'divertida', fala: true, tom: 'manipular', aviso: AV.brann, flag: 'brannAtira', aoEscolher: ganha('brann', 1), txt: T('Vamos afundar a Sentença.', 'We are going to sink the Sentence.'),
          resultado: [T('A mão dele para no meio da besta. — A Sentença. Com um barco de pesca. — Ele olha para os outros, depois para mim, e os outros não riem. — Quem a senhora quer que eu derrube?', 'His hand stops halfway along the crossbow. — The Sentence. With a fishing boat. — He looks at the others, then at me, and nobody laughs. — Who do you want me to bring down?'),
            T('— O homem que dá as ordens na proa.', '— The man who gives the orders at the bow.'),
            T('Ele separa a seta mais reta da aljava e não larga mais.', 'He picks the straightest bolt from the quiver and doesn’t let go of it again.')] },
        { id: 'doce', fala: true, tom: 'seduzir', aviso: AV.brann, flag: 'brannAtira', aoEscolher: ganha('brann', 1), txt: T('Esta tripulação vai entrar para a história da Orla, Brann.', 'This crew is going into the Shore’s history, Brann.'),
          resultado: [T('Ponho a mão no ombro dele e sorrio. Ele olha a minha mão, e não tira.', 'I put my hand on his shoulder and smile. He looks at my hand, and doesn’t shrug it off.'),
            T('— Entrar para a história como?', '— Go into history how?'),
            T('— Vamos afundar a Sentença.', '— We are going to sink the Sentence.'),
            T('Ele engole em seco. — A Sentença. — Demora. — Quem eu derrubo, Madrinha?', 'He swallows. — The Sentence. — He takes his time. — Who do I bring down, Godmother?'),
            T('— O homem que dá as ordens na proa.', '— The man who gives the orders at the bow.')] },
        { id: 'fria', fala: true, tom: 'intimidar', aviso: AV.brann, flag: 'brannGuarda', txt: T('Eu não sei se sou a Madrinha de vocês. Mas sei que a água me obedece.', 'I don’t know if I am your Godmother. But I know the water obeys me.'),
          resultado: [T('Olho para a água junto dele. Uma onda sobe do nada e bate no costado bem onde ele está sentado, e molha o Brann da cabeça aos pés. O resto do mar continua liso.', 'I look at the water beside him. A wave rises from nowhere and slams the hull right where he sits, and soaks Brann from head to foot. The rest of the sea stays flat.'),
            T('Ele não responde. Fica muito tempo olhando a água que escorre da besta.', 'He doesn’t answer. He stays a long time looking at the water running off his crossbow.'),
            T('Depois separa uma seta das outras. — Essa é para quem tentar virar o barco — diz, sem olhar para mim.', 'Then he sets one bolt apart from the others. — That one’s for whoever tries to turn the boat — he says, without looking at me.')] },
      ] } },

    { id: 'b01', zona: 'mar', agua: 0, fundo: { video: VID('b01-mar'), img: IMG('b01-mar'), dim: .45, foco: '55% 50%' },
      // sem saber o dia, a espera no canal custa a todos; quem foi enganado sobre a rota descobre aqui
      aoEntrar: (st) => {
        if (!sabe(st, 'rota')) TRIP.forEach((k) => { if (noBarco(st, k)) ganha(k, -1)(st); });
      },
      texto: [
        T('No segundo dia, o Canal das Garças. Paredes de pedra dos dois lados e água funda no meio, por onde a galera passa. Mando baixar a vela e esperar à vista.', 'On the second day, the Heron Channel. Stone walls on both sides and deep water down the middle, where the galley passes. I order the sail lowered and we wait in plain sight.'),
        (st) => (noBarco(st, 'teshka') ? T('Teshka testa o gancho de abordagem no banco e não olha para mim.', 'Teshka tests the boarding hook against the bench and doesn’t look at me.')
          : noBarco(st, 'maru') ? T('Maru, que cantou baixo a viagem toda, põe o barco no meio do canal, onde qualquer vigia vê, e para de cantar.', 'Maru, who has sung under his breath the whole voyage, brings the boat to the middle of the channel, where any lookout can see, and stops singing.')
            : noBarco(st, 'brann') ? T('Brann ri pelo canto da boca e põe a seta mais reta em cima do joelho. — Então é isso. A senhora quer que ela veja a gente.', 'Brann laughs out of the side of his mouth and lays his straightest bolt across his knee. — So that’s it. You want her to see us.')
              : T('Lio não entende. Nhalé entende por ele e bate na quilha com força, de baixo.', 'Lio doesn’t understand. Nhalé understands for him and knocks hard on the keel from below.')),
        (st) => (sabe(st, 'rota') ? T('Em Alvena me contaram nove dias. Hoje é o nono.', 'In Alvena they told me nine days. Today is the ninth.')
          : T('Não sei o dia da galera. Esperamos três noites no canal, com o barco parado no caminho dela. Na primeira, a tripulação ainda canta. Na segunda, olha para mim para ver se eu sei. Na terceira, ninguém dorme, e eles já não perguntam.', 'I don’t know the galley’s day. We wait three nights in the channel, the boat sitting in her path. On the first, the crew still sings. On the second, they look at me to see whether I know. On the third, no one sleeps, and they no longer ask.')),
      ] },

    { id: 'b02', zona: 'galera', agua: 0, fundo: { video: VID('b02-sentenca'), img: IMG('b02-sentenca'), dim: .4, foco: '60% 45%' },
      aoEntrar: (st) => { st.f.motim = amotinado(st); },
      texto: [
        T('A Sentença aparece no fim da tarde. Três mastros, um costado de madeira escura e duas fileiras de besteiros no convés. Ao lado dela, o nosso barco é uma casca de noz.', 'The Sentence appears at the end of the afternoon. Three masts, a hull of dark timber, and two rows of crossbowmen on deck. Beside her, our boat is a nutshell.'),
        (st) => ({
          teshka: T('Teshka tira a mão do leme de quem estiver nele e começa a virar o barco. — A senhora disse que ia dar a Sentença ao mar. Não disse que ia ficar parada esperando que ela atire na gente.', 'Teshka pulls the tiller out of whoever’s hand is on it and starts to bring the boat about. — You said you would give the Sentence to the sea. You didn’t say you would sit still and wait for her to shoot us.'),
          maru: T('Maru vira o leme para o lado dos recifes sem dizer nada, com o olho bom fechado.', 'Maru swings the tiller toward the reefs without a word, his good eye shut.'),
          brann: T('Brann aponta a besta para mim. — Vira esse barco, Madrinha. Eu vim atirar, não vim morrer.', 'Brann aims his crossbow at me. — Turn this boat, Godmother. I came to shoot, not to die.'),
        }[st.f.motim] || T('A tripulação olha para a galera, depois para mim, e espera.', 'The crew looks at the galley, then at me, and waits.')),
        se((st) => !!st.f.motim && st.f.motim !== 'brann' && vivoBarco(st, 'brann') && !!st.f.brannGuarda, T('Brann ergue a besta com a seta que guardou separada e aponta para {MOT}. Não diz nada. Espera a minha ordem.', 'Brann raises his crossbow with the bolt he kept apart and aims it at {MOT}. He says nothing. He waits for my order.')),
      ],
      escolha: { id: 'ordem', pergunta: (st) => (st.f.motim ? T('O que eu faço?', 'What do I do?') : T('O que eu digo a eles?', 'What do I tell them?')), opcoes: [
        { id: 'mentira', fala: true, tom: 'manipular', aviso: AV.trip, txt: T('Ninguém morre hoje.', 'No one dies today.'),
          resultado: (st) => (st.f.motim
            ? [st.f.motim === 'brann' ? T('Brann abaixa a besta. Acredita, porque sou eu quem diz.', 'Brann lowers the crossbow. He believes it, because I’m the one saying it.') : leal(st, st.f.motim) >= 0 ? T('{MOT} solta o leme. Acredita, porque sou eu quem diz.', '{MOT} lets go of the tiller. Believes it, because I’m the one saying it.') : T('{MOT} não acredita. Solta o leme assim mesmo, porque os outros acreditaram.', '{MOT} doesn’t believe it. Lets go of the tiller anyway, because the others did.')]
            : [noBarco(st, 'lio') ? T('Eles acreditam, porque sou eu quem diz. Lio até sorri.', 'They believe me, because I’m the one saying it. Lio even smiles.') : T('Eles acreditam, porque sou eu quem diz.', 'They believe me, because I’m the one saying it.')]) },
        { id: 'verdade', fala: (st) => !st.f.motim, gesto: (st) => !!st.f.motim, tom: 'intimidar', aviso: AV.trip,
          txt: (st) => (st.f.motim ? (st.f.motim === 'brann' ? T('Andar até a besta e baixar a ponta com dois dedos.', 'Walk up to the crossbow and push the point down with two fingers.') : T('Pôr a mão em cima da mão no leme e apertar até soltar.', 'Lay my hand over the hand on the tiller and squeeze until it lets go.')) : T('Vocês foram dados ao mar. O mar já aceitou.', 'You were given to the sea. The sea has already accepted.')),
          resultado: (st) => (st.f.motim
            ? [st.f.motim === 'brann' ? T('A ponta desce. Brann não atira. Olha os meus dedos na besta dele e não mexe os dele.', 'The point goes down. Brann doesn’t shoot. He looks at my fingers on his crossbow and doesn’t move his own.') : T('Aperto até a mão soltar. Viro o barco de volta para a galera. O leme fica comigo.', 'I squeeze until the hand lets go. I bring the boat back toward the galley. The tiller stays with me.')]
            : [T('Eles não respondem. Um por um, eles se viram para a galera, como quem já está de pé dentro d’água.', 'No one answers. One by one, they turn toward the galley, like people already standing in the water.')]) },
        { id: 'olhar', se: (st) => !st.f.motim, gesto: true, tom: 'seduzir', aviso: AV.trip, txt: T('Passar a mão molhada no rosto de cada um, devagar.', 'Run my wet hand down each face, slowly.'),
          resultado: [T('Passo a mão no rosto de cada um, da testa ao queixo, como se fecha o olho de um morto. Eles não se mexem. Quando chego no último, estão todos quietos, e nenhum olha para trás.', 'I run my hand down each face, brow to chin, the way you close a dead man’s eyes. No one moves. By the time I reach the last, they are all quiet, and none of them looks back.')] },
        { id: 'matar', se: (st) => !!st.f.motim, gesto: true, tom: 'intimidar', corpos: 1, aviso: AV.trip, aoEscolher: (st) => { st.f.motimMorto = st.f.motim; }, txt: T('Cortar a garganta de {MOT} com a faca da manga.', 'Cut {MOT}’s throat with the knife from my sleeve.'),
          resultado: (st) => [st.f.motim === 'brann' ? T('A faca sai da manga e volta. Brann senta no fundo do barco com as duas mãos no pescoço, e a besta cai na água. Os outros não dizem mais nada até o fim.', 'The knife leaves my sleeve and comes back. Brann sits down in the bottom of the boat with both hands at his throat, and the crossbow falls into the water. The others don’t say another word until the end.') : T('A faca sai da manga e volta. {MOT} senta no fundo do barco com as duas mãos no pescoço, e eu tomo o leme. Os outros não dizem mais nada até o fim.', 'The knife leaves my sleeve and comes back. {MOT} sits down in the bottom of the boat with both hands at the throat, and I take the tiller. The others don’t say another word until the end.')] },
        { id: 'galera', se: (st) => !!st.f.motim, fala: true, tom: 'manipular', aviso: AV.trip,
          aoEscolher: (st) => { if (st.f.motim === 'teshka') st.f.teshkaGalera = true; if (st.f.motim === 'brann') st.f.brannAtira = true; if (st.f.motim === 'maru') st.f.maruCanta = true; },
          txt: (st) => ({ teshka: T('Teshka. O seu marido não virou o barco.', 'Teshka. Your husband didn’t turn the boat.'), brann: T('Quarenta besteiros, Brann. Nenhum melhor que você.', 'Forty crossbowmen, Brann. Not one better than you.'), maru: T('Maru. Os recifes ficam à esquerda, a galera à direita. A sua mãe ia querer saber de que lado você estava.', 'Maru. The reefs are to the left, the galley to the right. Your mother would want to know which side you were on.') }[st.f.motim]),
          resultado: (st) => ({
            teshka: [T('Teshka ri, sem graça nenhuma, e vira o leme de volta. — Três mastros — diz, e pega o gancho de abordagem de baixo do banco.', 'Teshka laughs, with no humor at all, and brings the tiller back. — Three masts — she says, and takes the boarding hook from under the bench.')],
            brann: [T('Brann olha a galera por cima da besta. Baixa a arma e escolhe uma seta. — Quarenta — diz, e conta outra vez, para ter certeza.', 'Brann looks at the galley over his crossbow. He lowers it and picks a bolt. — Forty — he says, and counts again, to be sure.')],
            maru: [T('Ele fecha o olho bom. Vira o leme de volta para a galera e canta a canção até o fim, sem recomeçar.', 'He shuts his good eye. He brings the tiller back toward the galley and sings the song to the end, without starting over.')],
          }[st.f.motim]) },
      ] } },

    // a Sentença chama o barco antes de atirar. Qualquer resposta acaba nas bestas, mas a dela pode trazer a galera colada
    { id: 'b02c', zona: 'galera', agua: 0, fundo: { img: IMG('b02-sentenca'), dim: .5, foco: '60% 45%' },
      texto: [
        T('A Sentença recolhe metade das velas e se detém a um tiro de besta de nós. Na amurada da proa, um oficial de capa vermelha sobe num degrau, com uma trombeta de latão na boca.', 'The Sentence takes in half her sails and holds a bowshot off from us. At the bow rail, an officer in a red cloak climbs onto a step, a brass trumpet at his mouth.'),
        T('— Barco da Orla! Nome da casa, carga e destino! Quem mente vai pendurado no molhe!', '— Shore boat! House, cargo and destination! Whoever lies hangs from the mole!'),
        T('Atrás dele, as duas fileiras de besteiros esperam com as armas baixas. Ainda baixas.', 'Behind him, the two rows of crossbowmen wait with their weapons lowered. Still lowered.'),
      ],
      escolha: { id: 'sentenca', pergunta: T('O que eu respondo?', 'What do I answer?'), opcoes: [
        { id: 'poupar', fala: true, tom: 'manipular', txt: T('Sou a dona da Orla. Levem a mim para a Laura de vocês e deixem o barco voltar.', 'I am the mistress of the Shore. Take me to your Laura and let the boat go home.'),
          resultado: [T('O oficial baixa a trombeta para rir, e os besteiros riem com ele.', 'The officer lowers the trumpet to laugh, and the crossbowmen laugh with him.'),
            T('— Dona da Orla — diz, alto, para o convés inteiro ouvir. — A forca de Alvena tem corda para quatro.', '— Mistress of the Shore — he says, loud, for the whole deck to hear. — The gallows at Alvena has rope for four.'),
            T('Ele levanta o braço. As bestas sobem, apontadas para os meus.', 'He raises his arm. The crossbows rise, aimed at my people.')] },
        { id: 'atacar', fala: true, tom: 'intimidar', txt: (st) => (vivoBarco(st, 'brann') ? T('Brann. Agora.', 'Brann. Now.') : T('Hoje o mar volta a ser da Orla, e você não dá mais nenhuma ordem.', 'Today the sea belongs to the Shore again, and you give no more orders.')),
          aoEscolher: (st) => { if (vivoBarco(st, 'brann')) st.f.brannAtira = true; },
          resultado: (st) => (vivoBarco(st, 'brann')
            ? [T('A seta sai antes de a trombeta descer. O oficial cai para trás da amurada com a ordem ainda na boca, e o convés da galera vira grito.', 'The bolt flies before the trumpet comes down. The officer falls back behind the rail with the order still in his mouth, and the galley’s deck turns to shouting.'),
              T('Quem sobe no degrau dele grita a ordem que ele não deu. As bestas sobem.', 'Whoever climbs onto his step shouts the order he never gave. The crossbows rise.')]
            : [T('Ele ainda está com a trombeta na boca, e a água do canal já parou de bater no costado da galera. Fica lisa, como a das estacas no dia em que eu subi.', 'He still has the trumpet at his mouth, and the channel water has already stopped slapping the galley’s side. It goes smooth, like the water at the pilings the day I came up.'),
              T('Alguém atrás dele grita. As bestas sobem sem esperar ordem.', 'Someone behind him shouts. The crossbows rise without waiting for an order.')]) },
      ] } },

    { id: 'b03', zona: 'galera', agua: .9, fundo: { img: IMG('s03-costado'), dim: .4, foco: '50% 40%' },
      texto: [
        T('A galera vira o costado para nós e vem chegando, de vela recolhida, para as bestas não errarem. Eu fico de pé na proa, onde a Sentença me vê.', 'The galley turns her broadside to us and comes on under short sail, so the crossbows won’t miss. I stand at the bow, where the Sentence can see me.'),
        V('D21', T('Preciso que ela me veja. Viva.', 'I need her to see me. Alive.')),
        se((st) => maruLado(st), T('Maru põe o barco de lado para a galera, como eu mandei. Assim a água pega a Sentença pelo costado.', 'Maru brings the boat broadside to the galley without my asking. That way the water takes the Sentence on her side.')),
        se((st) => brannAtira(st) && st.escolhas.sentenca === 'atacar', T('Brann já está com outra seta na besta. A primeira fileira atrasa, sem o homem da trombeta.', 'Brann already has another bolt in the crossbow. The first row falters, without the man with the trumpet.')),
        se((st) => brannAtira(st) && st.escolhas.sentenca !== 'atacar', T('Brann atira antes de todo mundo. O oficial da trombeta cai para trás da amurada, e a primeira fileira atrasa.', 'Brann shoots before anyone. The officer with the trumpet falls back behind the rail, and the first row falters.')),
        se((st) => teshkaAborda(st), T('Quando o costado deles chega a um remo do nosso, Teshka gira o gancho por cima da cabeça e solta. Prende na amurada. Ela sobe pela corda com a faca nos dentes.', 'When their side comes within an oar’s length of ours, Teshka whirls the hook over her head and lets it fly. It catches on the rail. She climbs the rope with the knife in her teeth.')),
        se((st) => vivoBarco(st, 'lio'), T('Lio rema para a galera sem olhar para ela, enquanto os outros gritam.', 'Lio rows toward the galley without looking at her, while the others shout.')),
        V('D25', T('Baixo as pálpebras. O barulho do convés vai ficando longe. Desço com a cabeça por baixo do barco, por baixo do canal, até a água pesada do fundo, parada há cem anos. Ela acorda borbulhando, como se a água sentisse raiva. Sobe pelas minhas pernas, fria por dentro dos ossos, e pesa nos meus dedos. Ela quer subir toda. Se eu deixar, a Sentença vira tábua solta no canal, e não sobra quem me leve.', 'I lower my eyelids. The noise on deck goes far away. I go down with my mind beneath the boat, beneath the channel, to the heavy water at the bottom, still for a hundred years. It wakes bubbling, as if the water felt rage. It climbs my legs, cold inside the bones, and weighs on my fingers. It wants to rise whole. If I let it, the Sentence becomes loose planks in the channel, and there is no one left to take me.')),
      ],
      minijogo: 'mao', jogoId: 'mao', mgDica: T('Toque o ouro antes que apague. Depois, escolha a hora de soltar.', 'Touch the gold before it fades. Then choose when to let go.'),
      aoTerminar: (st) => { st.f.naufragio = true; st.f.estrago = (maruLado(st) ? 1 : 0) + (brannAtira(st) ? 1 : 0) + (teshkaAborda(st) ? 1 : 0); },
      depois: (st) => [
        ...(J(st, 'mao').quando === 'cedo' ? [
          T('O mar recua de baixo dos dois barcos, como um lençol puxado. Depois volta em pé.', 'The sea draws back from under both ships, like a sheet pulled away. Then it comes back standing.'),
          V('D08', T('A água sobe pelo costado da Sentença e passa por cima de nós primeiro. É a minha água que leva a tripulação.', 'The water climbs the Sentence’s side and goes over us first. It is my water that takes the crew.')),
        ] : [
          T('A salva desce sobre o nosso convés. Eu espero a segunda. Só então abro a mão.', 'The volley comes down on our deck. I wait for the second. Only then do I open my hand.'),
          V('D09', T('O mar volta em pé, por cima de tudo. Os meus já estavam no chão quando a água chegou.', 'The sea comes back standing, over everything. My people were already down when the water arrived.')),
        ]),
        { t: T('A onda é mais alta que os mastros deles. Pega a Sentença pelo costado e varre o convés da proa à popa.', 'The wave is taller than their masts. It takes the Sentence on her side and sweeps the deck from bow to stern.'), sfx: 'onda-cinematica', fundo: { img: IMG('b03-onda'), dim: .4, lado: 'dir', foco: '30% 45%' }, v: .95 },
        se(() => maruLado(st), T('Porque o Maru pôs o barco de lado, ela bate de cheio. O mastro do meio quebra como espinha de peixe e cai em cima da segunda fileira.', 'Because Maru brought the boat broadside, it strikes whole. The middle mast snaps like a fishbone and comes down on the second row.')),
        se(() => brannAtira(st), T('Sem o homem que dava as ordens, a segunda fileira não sabe se atira ou se segura. Segura. A água chega antes da ordem.', 'Without the man who gave the orders, the second row doesn’t know whether to shoot or hold on. They hold on. The water arrives before the order.')),
        se(() => teshkaAborda(st), T('Teshka está no convés deles quando a onda chega. Vejo a faca dela subir duas vezes antes de a água levar tudo.', 'Teshka is on their deck when the wave arrives. I see her knife rise twice before the water takes everything.')),
        se(() => nhaleAjuda(st), T('Embaixo d’água, Nhalé puxa pelos pés os soldados que a onda derrubou. Eles não voltam para cima.', 'Underwater, Nhalé pulls down by the feet the soldiers the wave knocked over. They don’t come back up.')),
        T(CONTA(st).pt, CONTA(st).en),
        T('O mar ainda quer mais. Fecho a mão devagar, um dedo de cada vez, e ele desce. A Sentença não afunda. Fica adernada, com o costado quebrado. Essa eu deixo boiar.', 'The sea still wants more. I close my hand slowly, one finger at a time, and it goes down. The Sentence doesn’t sink. She lists, her side broken. That one I let float.'),
        T('Os meus dedos tremem de segurar, não de cansaço. Escondo as mãos na água antes que alguém na Sentença veja que eu ainda podia mais.', 'My fingers tremble from holding back, not from weariness. I hide my hands in the water before anyone on the Sentence can see I still had more.'),
      ] },

    { id: 'b04', zona: 'mar', agua: 1, veste: 'ela', fundo: { img: IMG('b04-destrocos'), dim: .5, foco: '55% 50%' },
      aoEntrar: (st) => { st.f.ultimo = ultimoDe(st); },
      texto: (st) => {
        const t = [], e = st.escolhas, cedo = J(st, 'mao').quando === 'cedo', u = st.f.ultimo;
        const conta = (k) => vivoBarco(st, k) && k !== u;
        if (st.f.motimMorto) t.push(T('{MOT} já estava no fundo do barco quando a água chegou. Esse fui eu.', '{MOT} was already in the bottom of the boat when the water came. That one was me.'));
        if (conta('maru')) t.push(st.f.maruCanta ? T('Maru afunda com a mão no leme. A canção acaba antes dele.', 'Maru goes down with his hand on the tiller. The song ends before he does.')
          : e.n_maru === 'cruel' ? T('Maru afunda com a mão no leme que nunca mais foi dele.', 'Maru goes down with his hand on the tiller that was never his again.')
            : T('Maru afunda com a mão no leme e o olho bom aberto, olhando para mim.', 'Maru goes down with his hand on the tiller and his good eye open, looking at me.'));
        if (conta('lio')) t.push(e.ordem === 'mentira' ? T('Lio boia de costas, com o pano ainda enrolado no braço. Eu disse a ele que hoje não. Ele acreditou até o fim.', 'Lio floats on his back, the cloth still wound around his arm. I told him not today. He believed it to the end.') : e.n_lio === 'divertida' ? T('Lio boia de costas, de boca aberta para o céu, esperando a chuva que eu prometi.', 'Lio floats on his back, mouth open to the sky, waiting for the rain I promised.') : T('Lio boia de costas, com o pano ainda enrolado no braço.', 'Lio floats on his back, the cloth still wound around his arm.'));
        if (vivoBarco(st, 'teshka') && teshkaAborda(st)) t.push(T('Teshka morre no convés da Sentença, com a faca na mão e dois soldados embaixo dela.', 'Teshka dies on the Sentence’s deck, knife in hand and two soldiers beneath her.'));
        else if (conta('teshka')) t.push(e.n_teshka === 'fria' ? T('Teshka afunda de olhos abertos, olhando para mim. O mar fica com ela como ficou com o marido.', 'Teshka goes down with her eyes open, looking at me. The sea keeps her as it kept her husband.') : T('Teshka afunda sem largar a faca. Foi dada ao mar, e o mar aceitou.', 'Teshka goes down without letting go of the knife. She was given to the sea, and the sea accepted.'));
        if (conta('brann')) t.push(brannAtira(st) ? T('Brann não para de atirar. Acerta mais um no pescoço antes de cair, e cai rindo.', 'Brann doesn’t stop shooting. He puts one more in the throat before he falls, and falls laughing.') : cedo ? T('Brann ainda tem a besta erguida quando a água chega, com a seta no lugar.', 'Brann still has his crossbow raised when the water comes, the bolt still in place.') : T('Brann ainda acerta um soldado antes de cair.', 'Brann still hits a soldier before he falls.'));
        if (noBarco(st, 'nhale')) t.push(nhaleAjuda(st) ? T('Embaixo de mim, uma sombra de escama sobe do fundo e espera.', 'Beneath me, a scaled shadow rises from the deep and waits.') : T('Nhalé bate na quilha por baixo, três vezes, e depois uma, e depois para.', 'Nhalé knocks on the keel from below, three times, then once, then stops.'));
        return t;
      },
      escolha: { id: 'rosto', se: (st) => !!st.f.ultimo, pergunta: T('{ULT} estende a mão para mim, na água.', '{ULT} reaches for me, in the water.'), opcoes: [
        { id: 'pegar', gesto: true, tom: 'seduzir', txt: T('Pegar a mão.', 'Take the hand.'), resultado: [T('Pego. A mão aperta a minha e vai afrouxando, e eu seguro até não ter mais o que segurar.', 'I take it. The hand squeezes mine and slowly loosens, and I hold on until there is nothing left to hold.')] },
        { id: 'ver', gesto: true, tom: 'intimidar', txt: T('Ver afundar.', 'Watch it go under.'), resultado: [T('Vejo. A água fecha em cima, e fecha bem.', 'I watch. The water closes over, and closes well.')] },
        { id: 'nhale', se: (st) => nhaleAjuda(st), gesto: true, tom: 'seduzir', aviso: (st) => AV[st.f.ultimo], txt: T('Empurrar a mão para baixo, para a Nhalé.', 'Push the hand down, to Nhalé.'),
          resultado: [T('Empurro a mão para baixo, e outra mão, de escama, pega a de {ULT}. As duas somem no escuro, para o fundo, onde seta nenhuma chega.', 'I push the hand down, and another hand, a scaled one, takes {ULT}’s. Both vanish into the dark, down to the deep, where no bolt can reach.'),
            T('Nhalé vai levar {ULT} de volta para a Orla, com a história.', 'Nhalé will carry {ULT} back to the Shore, with the story.')] },
      ] } },

    { id: 'b04b', zona: 'mar', agua: 1, fundo: { img: IMG('b04-destrocos'), dim: .62 },
      afoga: { filtro: (a, st) => { const s = salvo(st); return [AV.maru, AV.lio, AV.teshka, AV.nhale, AV.brann, AV.trip].includes(a) && !(s && (a === AV[s] || a === AV.nhale)); }, ultimo: AV.ninguem, ms: 900 },
      texto: (st) => [T('O nosso barco afunda devagar, cheio da minha água. Passo pela borda e entro no mar, entre os meus.', 'Our boat sinks slowly, full of my own water. I go over the side into the sea, among my own.'), sabe(st, 'perto')
        ? T('Uma seta perdida entra no meu ombro. Deixo o corpo boiar de bruços, como os afogados que a Sentença pesca para vender no molhe. Com morto, Redom não gasta a segunda seta.', 'A stray bolt goes into my shoulder. I let my body float face down, like the drowned the Sentence fishes up to sell on the mole. Redom doesn’t waste a second bolt on the dead.')
        : T('Uma seta entra no meu ombro, e outra passa raspando a orelha. Boio de bruços entre eles e paro de mexer, porque os que mexem levam a segunda.', 'A bolt goes into my shoulder, and another grazes my ear. I float face down among them and stop moving, because the ones who move take the second.')] },

    { id: 'b05', zona: 'conves', agua: 0, fundo: { img: IMG('s05-conves'), dim: .45, foco: '50% 35%' },
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
    { id: 'b05b', zona: 'conves', agua: 0, fundo: { img: IMG('b05b-olhos'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: (st) => (J(st, 'morta').toques >= 2 ? [
        T('Já sabem que estou viva. A ponta da lança contou a eles.', 'They already know I’m alive. The spear point told them.'),
        G('sargento', T('O sargento olha a seta, depois os meus olhos. — Seta inteira no ombro, lança na ferida, e ainda olha para a gente. Essa desgraçada é resistente igual Grakh. Conjuradora. Algema de pedra. A Lâmina julga essas pessoalmente.', 'The sergeant looks at the bolt, then at my eyes. — Whole bolt in the shoulder, a spear in the wound, and she’s still looking at us. This bitch is as tough as a Grakh. A conjurer. Stone shackles. The Blade judges these herself.')),
      ] : [
        T('Os soldados separam os corpos. Os da Orla vão num monte, para a balança de Alvena, onde afogado da Orla se vende por peso no molhe, para o curtume e para os porcos. Se eu continuar morta, vou com eles.', 'The soldiers sort the bodies. The Shore’s go in a heap, for the scales at Alvena, where the Shore’s drowned are sold by weight on the mole, to the tannery and the pigs. If I stay dead, I go with them.'),
        sabe(st, 'vivos') ? T('Quem conjura vai vivo para a Laura. Então mostro.', 'Whoever conjures goes to Laura alive. So I show them.') : T('Não sei o que Redom faz com quem conjura. Vou descobrir agora.', 'I don’t know what Redom does with conjurers. I am about to find out.'),
      ]),
      escolha: { id: 'olhos', se: (st) => J(st, 'morta').toques < 2, pergunta: T('Como eu volto a viver?', 'How do I come back to life?'), opcoes: [
        { id: 'devagar', gesto: true, tom: 'intimidar', txt: T('Abrir os olhos para o sargento, e só para ele.', 'Open my eyes for the sergeant, and only for him.'),
          resultado: [T('O primeiro que eu vejo é o sargento. Ele para no meio de uma ordem.', 'The first one I see is the sergeant. He stops in the middle of an order.'),
            G('sargento', T('— Essa está viva. Seta inteira no ombro, e viva. — Ele não grita. — A desgraçada é resistente igual Grakh. Conjuradora. Algema de pedra. A Lâmina julga essas pessoalmente.', '— This one’s alive. Whole bolt in the shoulder, and alive. — He doesn’t shout. — The bitch is as tough as a Grakh. A conjurer. Stone shackles. The Blade judges these herself.'))] },
        { id: 'sorrir', gesto: true, tom: 'seduzir', txt: T('Sorrir para o soldado que me carrega.', 'Smile at the soldier carrying me.'),
          resultado: [T('O soldado que me arrasta pelos pés vê o sorriso antes de entender. Larga as minhas pernas no convés e dá dois passos para trás. — Sargento. Essa aqui está viva.', 'The soldier dragging me by the feet sees the smile before he understands. He drops my legs on the deck and takes two steps back. — Sergeant. This one’s alive.'),
            G('sargento', T('O sargento olha a seta, depois os meus olhos. — Resistente igual Grakh, a desgraçada. Conjuradora. Algema de pedra. A Lâmina julga essas pessoalmente.', 'The sergeant looks at the bolt, then at my eyes. — Tough as a Grakh, the bitch. A conjurer. Stone shackles. The Blade judges these herself.'))] },
        { id: 'nome', fala: true, tom: 'manipular', txt: T('Laura.', 'Laura.'),
          resultado: [T('Digo baixinho, como quem chama alguém do outro quarto. O convés para.', 'I say it softly, the way you call someone in the next room. The deck goes still.'),
            T('O sargento se agacha perto do meu rosto. — De onde uma afogada da Orla tira o nome da General?', 'The sergeant crouches by my face. — Where does a drowned girl from the Shore get the General’s name?'),
            G('sargento', T('Eu não respondo. Ele se levanta. — Conjuradora. Algema de pedra. Ela vai querer ver essa.', 'I don’t answer. He stands. — A conjurer. Stone shackles. She’ll want to see this one.'))] },
      ] } },

    { id: 'b06', zona: 'conves', agua: 0, pedra: true, sons: [{ sfx: 'algema', p: 0, v: .7 }], fundo: { img: IMG('b06-algema'), dim: .45, foco: '55% 50%' },
      texto: [
        T('Fecham nos meus pulsos duas argolas de ferro com uma pedra cinzenta cravada em cada uma. Os soldados chamam de pedra surda.', 'They close two iron rings around my wrists, each with a grey stone set in it. The soldiers call it deafstone.'),
        V('D11', T('A pedra bebe. Sinto a boca dela nos pulsos, e cada rosto que eu sei vestir escorre para dentro do ferro.', 'The stone drinks. I feel its mouth on my wrists, and every face I know how to wear runs down into the iron.')),
        { t: T('A frase, não. A frase continua aqui.', 'The sentence doesn’t. The sentence stays.'), frase: 'fica' },
        T('Me jogam no porão, com três pescadores da Orla que esperam a forca de Alvena. Quando a lanterna passa pelo meu rosto, os três se ajoelham com as correntes, e o soldado da escada fica parado, olhando.', 'They throw me into the hold, with three fishermen of the Shore waiting for the gallows at Alvena. When the lantern passes over my face, all three kneel in their chains, and the soldier on the ladder stands still, watching.'),
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
        T('A carroça desce por uma rampa embaixo da Cidadela, e a luz do dia acaba no meio da descida. Os soldados que me trazem baixam a voz, como se baixa numa capela.', 'The cart goes down a ramp beneath the Citadel, and the daylight ends halfway down. The soldiers bringing me lower their voices, the way you do in a chapel.'),
        T('— Ala Funda — diz um para o outro. — Sempre me dá arrepio descer aqui.', '— The Deep Ward — one says to the other. — Going down here always gives me the shivers.'),
        T('No pé da escada, o sargento da guarda grita para cima os nomes de quem pode descer: Wim, Garrick, Pell, Dunstan. Ele fala os nomes com a naturalidade de quem chama os mesmos há anos. No alto da escada, a guarda não deixa passar outro rosto.', 'At the foot of the stairs the sergeant shouts up the names of those allowed down: Wim, Garrick, Pell, Dunstan. He says the names as easily as someone who has called the same ones for years. Up top, the guard lets no other face through.'),
        T('A cela do fundo é toda de pedra surda: chão, teto e paredes. Quando a porta fecha, a pedra bebe até o barulho da minha respiração.', 'The bottom cell is all deafstone: floor, ceiling and walls. When the door shuts, the stone drinks even the sound of my breathing.'),
        V('D13', T('Uma guarda que só deixa passar rosto conhecido. Eu, que só tenho rosto emprestado, acho graça.', 'A guard that lets through only known faces. I, who have only borrowed faces, find that funny.')),
        T('Aprendo os quatro pelo som dos passos e pelo nome que um grita para o outro na escada.', 'I learn the four by the sound of their steps, and by the names they shout to each other on the stairs.'),
        G('wim', T('Wim cantarola sempre a mesma canção, para o turno passar mais depressa, e esquece sempre a mesma palavra, no mesmo lugar.', 'Wim always hums the same song, to make the shift go faster, and always forgets the same word, in the same place.')),
        G('garrick', T('Garrick desce sem nunca olhar para dentro da cela. Os outros dizem o nome dele. Ele, nunca.', 'Garrick comes down without ever looking into the cell. The others say his name. He never does.')),
        G('pell', T('Pell reza para a Juíza na volta, alto e sério, e tropeça sempre no mesmo verso.', 'Pell prays to the Judge on the way back, loud and solemn, and always trips on the same line.')),
        G('dunstan', T('Dunstan conta as moedas do bolso, degrau por degrau, e o total nunca dá o que ele quer.', 'Dunstan counts the coins in his pocket, step by step, and the total never comes to what he wants.')),
        V('D22', T('A Laura vai descer. Antes dela, quero saber dela. Até lá, dá tempo de trabalhar dois.', 'Laura will come down. Before she does, I want to know her. Until then, there is time to work two of them.')),
      ],
      escolha: { id: 'carcereiro', pergunta: T('Qual eu trabalho primeiro?', 'Which one do I work first?'), opcoes: ALA_OPCOES() } },

    { id: 'c01b', zona: 'ala', agua: 0, sal: .22, pedra: true, fundo: { img: IMG('c01-escada'), dim: .55, foco: '55% 50%' },
      texto: [T('Mais quatro pães. A escada continua descendo nas mesmas horas, com os mesmos passos.', 'Four more loaves. The stairs keep coming down at the same hours, with the same steps.')],
      escolha: { id: 'carcereiro2', pergunta: T('E o segundo?', 'And the second?'), opcoes: ALA_OPCOES((st, id) => st.escolhas.carcereiro !== id) } },

    { id: 'c02', zona: 'ala', agua: 0, sal: .25, pedra: true, dor: true, fundo: { img: IMG('c02-cela'), dim: .45, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('De tempos em tempos, sem hora certa, um deles desce e bate nas grades com uma vara. Às vezes em mim. Na terceira vez eu entendo para quê: com a vara batendo, a cabeça nunca acha o silêncio de que precisa para conjurar.', 'Every now and then, at no set hour, one of them comes down and beats the bars with a rod. Sometimes me. The third time, I understand what for: with the rod beating, my head never finds the silence it needs to conjure.'),
        V('D14', T('Redom se protege de mim com método. Gosto de método.', 'Redom guards itself against me with method. I like method.')),
        T('Sem rosto emprestado, as orelhas são minhas outra vez, e mentem mal. Quando a vara bate na grade, elas colam no crânio antes de mim.', 'Without a borrowed face, my ears are mine again, and they lie badly. When the rod hits the bars, they press flat to my skull before I do.'),
        T('Conto os dias pelo pão. Sete pães.', 'I count the days by the bread. Seven loaves.'),
      ] },

    { id: 'c03', zona: 'ala', agua: 0, sal: .25, pedra: true, sons: [{ sfx: 'porta-cela', p: 0, v: .7 }], fundo: { img: IMG('c03-laura'), dim: .42, foco: '60% 40%' },
      texto: [
        T('No oitavo pão a porta abre sem bater, porque a porta é dela.', 'On the eighth loaf the door opens without a knock, because the door is hers.'),
        { moeda: true, t: T('Ela tem o rosto da moeda que o menino me deu, com o queixo mais baixo, e os olhos são verdes, coisa que a prata não mostra. O cabelo é cor de trigo, solto, de quem não teve tempo de prender. Tem calos nas mãos e olheiras de quem não dorme. Nenhuma coroa. Uma faixa escura amarrada no braço.', 'She has the face from the coin the boy gave me, with the chin lower, and her eyes are green, which silver doesn’t tell. Her hair is the color of wheat, loose, like someone who had no time to tie it. She has calluses on her hands and the shadows of someone who doesn’t sleep. No crown. A dark band tied around her arm.') },
        (st) => (consorte(st) === 'markus' ? T('Atrás dela, na porta, um homem alto com a mão no punho da espada. Ela não olha para ele, e ele não olha para outra coisa que não seja ela. Ao lado dele, um escrivão velho, de pena e livro aberto no braço.', 'Behind her, in the doorway, a tall man with his hand on his sword hilt. She doesn’t look at him, and he looks at nothing but her. Beside him, an old clerk, quill in hand and a book open on his arm.')
          : consorte(st) === 'justine' ? T('Atrás dela, uma mulher de pena entre os dentes e um livro aberto no braço. Escreve antes de a Laura falar.', 'Behind her, a woman with a quill between her teeth and a book open on her arm. She writes before Laura speaks.')
            : T('Atrás dela, um oficial velho com uma pena e um livro aberto no braço.', 'Behind her, an old officer with a quill and a book open on his arm.')),
        V('D26', T('Ela me lê. A boca não se mexe, mas os olhos param em mim de quando em quando, e eu ainda não descobri o que ela procura.', 'She reads me. Her lips don’t move, but her eyes stop on me now and then, and I haven’t worked out yet what she is looking for.')),
        T('A vara desce nas grades no meio da primeira pergunta.', 'The rod comes down on the bars in the middle of the first question.'),
        V(null, T('— Parem com isso. Quero ela pensando.', '— Stop that. I want her thinking.')),
      ] },

    // antes da primeira pergunta: o que ela vê na Laura puxa o que ela ouviu. Cada linha só aparece se o jogador ouviu de quem sabia
    { id: 'c03b', zona: 'ala', agua: 0, sal: .25, pedra: true, fundo: { img: IMG('c-laura'), dim: .6, foco: '62% 40%' },
      texto: [
        T('Na estrada, todo soldado dizia a mesma coisa: os Grakh estão no fim. Redom brigou com eles pela terra boa a vida inteira, e agora, sem guerra em terra, olha para o mar. Quem olhou primeiro foi ela. Tomou Alvena, pôs uma galera na frente de cada aldeia da costa, enforca pirata no molhe e manda trazer vivo quem conjura.', 'On the road, every soldier said the same thing: the Grakh are nearly finished. Redom has fought them for the good land all its life, and now, with no war on land, it looks to the sea. The first to look was her. She took Alvena, put a galley off every village on the coast, hangs pirates on the mole, and has whoever conjures brought to her alive.'),
        T('Na escada, quando acham que eu durmo, os quatro falam de outra coisa: ela pediu os mapas da Boca Seca, e quem matou o irmão ficou lá.', 'On the stairs, when they think I’m asleep, the four talk about something else: she has asked for the maps of the Dry Mouth, and whoever killed her brother stayed there.'),
        T('Ela puxa um banco e senta na minha frente, perto o bastante para os joelhos dela quase tocarem os meus.', 'She pulls up a stool and sits in front of me, close enough for her knees almost to touch mine.'),
        se((st) => fezCarcereiro(st, 'wim'), T('Não traz papel nenhum. O Wim avisou: ela pergunta o que já sabe, para ver se a gente mente.', 'She brings no paper. Wim warned me: she asks what she already knows, to see if you lie.')),
        se((st) => tem(st, 'hobb'), T('Os pulsos são finos demais para mãos com tantos calos. Desde que o irmão morreu, ela manda o prato de volta cheio.', 'Her wrists are too thin for hands with so many calluses. Since her brother died, she sends her plate back full.')),
        se((st) => fezCarcereiro(st, 'garrick'), T('A faixa escura no braço é pelo irmão, o comandante Simon. Na frente dela, o nome dele não se diz.', 'The dark band on her arm is for her brother, Commander Simon. In front of her, his name is not said.')),
        se((st) => tem(st, 'grisalho') || fezCarcereiro(st, 'pell'), T('Senta na ponta do banco, pronta para levantar e partir. Os soldados dela rezam para ela não levar todo mundo para a Boca Seca.', 'She sits on the edge of the stool, ready to get up and leave. Her soldiers pray she won’t take them all to the Dry Mouth.')),
        se((st) => fezCarcereiro(st, 'dunstan'), T('O olhar dela desce para as moedas da minha saia e sobe. O Dunstan contou na escada: cada galera parada na costa custa a Redom o imposto de uma aldeia por ano.', 'Her eyes drop to the coins on my skirt and come back up. Dunstan counted it out on the stairs: every galley sitting on the coast costs Redom a village’s taxes a year.')),
        V('D23', T('Ela quer o deserto e não pode ir, porque a costa prende as galeras dela. Se a Orla ajoelhar, a costa solta. Quero que ela mesma me mande de volta para fazer a Orla ajoelhar.', 'She wants the desert and can’t go, because the coast ties down her galleys. If the Shore kneels, the coast lets go. I want her to send me back to do it herself.')),
        T('Para isso, ela tem de acreditar em três coisas. Que fui eu que levantei o mar. Que a Orla faz o que eu mando. E que eu ganho alguma coisa entregando a Orla a Redom.', 'For that, she has to believe three things. That it was I who raised the sea. That the Shore does what I tell it. And that I gain something by handing the Shore to Redom.'),
        T('Não vou pedir nada. A ordem tem que sair da boca dela como ideia dela.', 'I will not ask for anything. The order has to come out of her mouth as her own idea.'),
      ] },

    { id: 'c04', checkpoint: true, zona: 'ala', agua: 0, sal: .25, pedra: true, fundo: { img: IMG('c-laura'), dim: .45, foco: '62% 40%' },
      texto: [
        T('Ela tem a porta, a tocha e quem está atrás dela. Eu tenho a boca.', 'She has the door, the torch, and whoever stands behind her. I have my mouth.'),
      ],
      minijogo: 'interrogatorio', jogoId: 'interrogatorio', mgNome: T('Responder à Laura', 'Answering Laura'),
      aoTerminar: (st, r) => { (r.flags || []).forEach((f) => { st.f[f] = true; }); if (st.f.usouSimon) st.f.semente = true; },
      depois: (st) => (J(st, 'interrogatorio').morte ? [T('Fico no escuro com o que eu disse. Não serviu para nada.', 'I stay in the dark with what I said. None of it was any use.')] : [
        st.f.lam_dona ? V(null, T('— Você quer ser dona da Orla. Eu quero a costa quieta. Uma dona eu sei onde achar, se ela mentir para mim.', '— You want to own the Shore. I want the coast quiet. An owner I know where to find, if she lies to me.'))
          : V(null, T('— Você quer a Orla com lei, e você do lado de quem escreve a lei. Eu quero a costa quieta. Por três meses, as duas coisas cabem no mesmo barco.', '— You want the Shore with a law, and yourself on the side of whoever writes it. I want the coast quiet. For three months, both things fit in the same boat.')),
        T('Depois fala para quem está atrás dela, e não para mim.', 'Then she speaks to the person behind her, not to me.'),
        V(null, T('— Tomar a Orla pela força custa décadas, porque lá só se chega de barco. Uma mulher que traga as facções vale mais que uma forca.', '— Taking the Shore by force costs decades, because you only get there by boat. A woman who brings the factions in is worth more than a gallows.')),
        V(null, T('— O comandante Aubert leva você a Nove Mastros. Você põe os chefes na mesa, e ele escreve o que eles prometerem. Depois você volta com ele e fica na Capital, como minha hóspede, até eu ver as velas sumirem da costa.', '— Commander Aubert takes you to Nine Masts. You bring the chiefs to the table, and he writes down what they promise. Then you come back with him and stay here, as my guest, until I see the sails vanish from the coast.')),
        V(null, { palavra: T('— Sem argolas. Você tem a minha palavra, e eu quero a sua.', '— No shackles. You have my word, and I want yours.'),
          sombra: T('— Ele não sai do seu lado. Nem para dormir.', '— He doesn’t leave your side. Not even to sleep.'),
          argola: T('— Uma argola fica no seu pulso até lá. Para os chefes, você fala com a sua cara.', '— One shackle stays on your wrist until then. With the chiefs, you speak in your own face.') }[termos(st)]),
      ]) },

    // a Lâmina não acreditou: a execução, e o jogo volta ao começo do interrogatório
    { id: 'morte', soDesvio: true, volta: true, zona: 'ala', agua: 0, sal: .3, pedra: true, fundo: { img: IMG('c02-cela'), dim: .62, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('Ao amanhecer, quem desce a escada não é nenhum dos quatro. São seis, de botas novas, e não dizem nome nenhum.', 'At dawn, the ones who come down the stairs are none of the four. There are six of them, in new boots, and they say no names.'),
        T('No pátio, o sol de Redom encontra a minha pele pela última vez. A frase continua na minha cabeça, sem quem a leve.', 'In the yard, Redom’s sun finds my skin for the last time. The sentence is still in my head, whole, with no one to carry it.'),
      ] },

    { id: 'c05', zona: 'ala', agua: 0, sal: .25, pedra: true, fundo: { img: IMG('c03-laura'), dim: .55, foco: '60% 40%' },
      aoEntrar: (st, ctx) => { st.avisos.push(AV.laura); ctx.toast(AV.laura); },
      texto: [
        T('Na porta, ela para e se vira. Traz a tocha de volta até a grade, perto do meu rosto, e espera.', 'At the door, she stops and turns. She brings the torch back to the bars, close to my face, and waits.'),
        V(null, T('— Já interroguei muitos de vocês. Todos tinham medo de mim. Você, não.', '— I’ve questioned plenty of your kind. Every one of them was afraid of me. You aren’t.')),
        T('Ela não espera resposta. A porta fecha sem bater.', 'She doesn’t wait for an answer. The door shuts without a sound.'),
        T('Agora sei o que ela procurava desde a porta: o meu medo. Não achou.', 'Now I know what she was looking for from the door: my fear. She didn’t find it.'),
        G('laura', T('Guardo o rosto dela com os outros. É o único em que eu não sei o que a pessoa quer.', 'I keep her face with the others. It is the only one where I don’t know what the person wants.')),
      ] },

    // ===================================================== PARTE IV · A TRÉGUA
    // o ponto de volta: presa na Capital ou derrotada no conselho, o capítulo recomeça daqui
    { id: 'p4', checkpoint: true, parte: T('IV · A Trégua', 'IV · The Truce'), zona: 'mar', agua: 0, sal: .2, pedra: false, fundo: { img: IMG('b02-sentenca'), dim: .55 },
      cartao: { num: T('Parte IV', 'Part IV'), nome: T('A Trégua', 'The Truce'), epigrafe: T('Na Orla, trégua é o tempo de afiar a faca.', 'On the Shore, a truce is the time it takes to sharpen the knife.'), fonte: T('dito das Viúvas do Sal', 'saying of the Salt Widows') } },

    { id: 't01', zona: 'mar', agua: 0, sal: .2, pedra: (st) => termos(st) === 'argola', veste: 'ela', fundo: { img: IMG('b02-sentenca'), dim: .45, foco: '60% 45%' },
      texto: (st) => [
        G('aubert', T('O comandante Aubert raspa a cabeça e a barba toda manhã, até na estrada, e escreve tudo num caderno de capa de couro. Na carroça, senta na minha frente e escreve que eu olho pela grade.', 'Commander Aubert shaves his head and his beard every morning, even on the road, and writes everything in a leather-bound notebook. In the cart he sits facing me and writes down that I look through the bars.')),
        { palavra: T('Na primeira parada, manda tirar as argolas, porque a Laura mandou. Escreve isso também.', 'At the first stop he has the shackles taken off, because Laura ordered it. He writes that down too.'),
          sombra: T('À noite ele dorme sentado, de frente para mim, com a faca no colo. Acorda cada vez que eu me mexo.', 'At night he sleeps sitting up, facing me, with the knife in his lap. He wakes every time I move.'),
          argola: T('Uma argola continua no meu pulso esquerdo. A chave ele guarda num cordão, por dentro da camisa.', 'One shackle stays on my left wrist. The key he keeps on a cord, inside his shirt.') }[termos(st)],
        T('Em Alvena, quem nos espera no molhe é a Sentença, com o costado remendado de madeira nova, mais clara que o resto.', 'In Alvena, what waits for us at the mole is the Sentence, her side patched with new timber, paler than the rest.'),
        T('Os soldados que sobraram da onda me olham subir a prancha. Nenhum fala comigo. Um deles faz o sinal da Juíza quando eu passo.', 'The soldiers the wave left alive watch me climb the gangplank. None of them speaks to me. One makes the Judge’s sign as I pass.'),
        T('Sento na proa da galera que eu quebrei. Deixo que olhem.', 'I sit at the bow of the galley I broke. I let them look.'),
      ] },

    { id: 't02', zona: 'cais', agua: 0, sal: .15, pedra: (st) => termos(st) === 'argola', fundo: { img: IMG('a02b-cais'), dim: .45, foco: '55% 45%' },
      texto: [
        T('A Sentença entra em Nove Mastros no fim da tarde, com a bandeira de Redom no mastro e dezenas de navios e barcos da Orla em volta, cercando. Não sai uma seta, porque eu estou a bordo. A cidade para nas pontes de corda. Depois vê quem está na proa.', 'The Sentence sails into Nine Masts at the end of the afternoon, Redom’s banner at the masthead and dozens of Shore ships and boats around her, closing in. Not one bolt flies, because I am aboard. The city stops on its rope bridges. Then it sees who is at the bow.'),
        T('Primeiro se ajoelha a velha da escada. Depois o cais, barco por barco, até onde a vista alcança.', 'First the old woman from the stairs kneels. Then the dock, boat by boat, as far as the eye can reach.'),
        se((st) => !!salvo(st), T('{ULT} está no meio deles, vivo. A Nhalé trouxe {ULT} de volta com a história, e a história já correu a Orla. É o único que não se ajoelha. Fica de pé, olhando para mim.', '{ULT} is among them, alive. Nhalé brought {ULT} back with the story, and the story has already run the length of the Shore. {ULT} is the only one who doesn’t kneel, and stands there, looking at me.')),
        T('Aubert fica muito tempo parado na amurada. Depois abre o caderno e escreve. Escreve muito.', 'Commander Aubert stands a long time at the rail. Then he opens the notebook and writes. He writes a great deal.'),
        T('Redom jurava que a Orla não tinha quem mandasse. Agora tem um homem de Redom que viu.', 'Redom swore the Shore had no one in charge. Now Redom has a man who saw.'),
      ] },

    { id: 't03', zona: 'cabine', agua: 0, sal: .15, pedra: (st) => termos(st) === 'argola', fundo: { img: IMG('t03-aubert-mesa'), dim: .5, foco: '60% 50%' },
      texto: [
        T('De noite, no navio do meio, os três chefes me esperam outra vez na mesma cabine. Desta vez tem uma cadeira a mais, e quem senta nela é Redom.', 'At night, on the ship in the middle, the three chiefs wait for me again in the same cabin. This time there is one more chair, and Redom sits in it.'),
        T('Aubert abre o caderno na mesa e não toca no vinho. Sarnai já está rezando quando eu entro. Ossian se ajoelha outra vez, de olho no caderno. Ruo nem entra: fica na porta, olhando o comandante.', 'Aubert opens the notebook on the table and doesn’t touch the wine. Sarnai is already praying when I come in. Ossian kneels again, with an eye on the notebook. Ruo doesn’t even come in: he stays at the door, watching the commander.'),
        T('Hoje cada palavra minha tem dois ouvidos: o da Orla e o do caderno.', 'Tonight every word of mine has two ears: the Shore’s and the notebook’s.'),
      ] },

    { id: 't03s', zona: 'cabine', agua: 0, sal: .15, pedra: (st) => termos(st) === 'argola', fundo: { img: IMG('t03-aubert-mesa'), dim: .62, foco: '60% 50%' },
      texto: [
        T('Sarnai reza com as pálpebras baixas e as mãos juntas sobre a mesa, e a reza é para mim. Em voz alta, na frente de Redom. Pede o porto de Alvena aberto, e foi a casa dela que vendeu a rota.', 'Sarnai prays with her eyelids lowered, her hands joined on the table, and the prayer is to me. Out loud, in front of Redom. She asks for the port of Alvena opened, and it was her house that sold the route.'),
        T('Aubert escreve que a velha reza para a prisioneira.', 'Aubert writes that the old woman prays to the prisoner.'),
        T('No fim, sem abrir os olhos, ela pergunta mais baixo: — A senhora ouviu as minhas rezas, Madrinha? Todas essas noites?', 'At the end, without opening her eyes, she asks more quietly: — Did you hear my prayers, Godmother? All those nights?'),
      ],
      escolha: { id: 'trSarnai', pergunta: T('Sarnai', 'Sarnai'), opcoes: [
        { id: 'reza', gesto: true, tom: 'seduzir', aoEscolher: (st) => trChefe(st), txt: T('Inclinar até a altura dela e responder no ouvido, onde o caderno não chega.', 'Lean down to her height and answer in her ear, where the notebook can’t reach.'),
          resultado: [T('— Tenho certeza que sim, querida.', '— I’m sure I did, dear.'),
            T('Ela abre os olhos e não consegue mais fechar. Põe a marca das Viúvas do Sal no papel do comandante sem ler o que está escrito.', 'She opens her eyes and can’t close them again. She puts the Salt Widows’ mark on the commander’s paper without reading what is written.'),
            T('Aubert escreve que eu falei com ela, e que não ouviu o quê.', 'Aubert writes that I spoke to her, and that he didn’t hear what.')] },
        { id: 'casa', fala: true, tom: 'intimidar', aoEscolher: (st) => { trChefe(st); trSusp(st); }, txt: T('A sua casa já fez negócio com Redom uma vez, Sarnai.', 'Your house has done business with Redom once already, Sarnai.'),
          resultado: [T('Sarnai abre os olhos no meio da reza. Diz que sim a tudo, depressa, para eu não dizer mais nada.', 'Sarnai opens her eyes mid-prayer. She says yes to everything, quickly, so I won’t say anything more.'),
            T('Aubert levanta a pena. Olha para Sarnai, depois para mim, e escreve uma linha comprida. Agora o caderno sabe que a Orla vende os seus, e que eu sei quem.', 'Aubert lifts the quill. He looks at Sarnai, then at me, and writes a long line. Now the notebook knows the Shore sells its own, and that I know who.')] },
        { id: 'mesa', fala: true, tom: 'manipular', txt: T('Não peça a mim, Sarnai. Peça a ele.', 'Don’t ask me, Sarnai. Ask him.'),
          resultado: [T('Ela abre os olhos e vê o comandante, com a pena parada no ar. Eu acabei de mandá-la pedir a Redom, na frente de Redom.', 'She opens her eyes and sees the commander, quill still in the air. I have just told her to ask Redom, in front of Redom.'),
            T('A reza acaba ali. Sarnai junta as mãos no colo e responde a todo o resto com a boca dura: vai pensar.', 'The prayer ends there. Sarnai folds her hands in her lap and answers everything else with a hard mouth: she will think about it.'),
            T('Aubert escreve: a velha não obedece.', 'Aubert writes: the old woman does not obey.')] },
      ] } },

    { id: 't03o', zona: 'cabine', agua: 0, sal: .15, pedra: (st) => termos(st) === 'argola', fundo: { img: IMG('t03-aubert-mesa'), dim: .62, foco: '60% 50%' },
      texto: [
        T('Ossian quer saber o que a Orla ganha. Pergunta para mim e olha para o caderno do comandante, porque sabe quem paga.', 'Ossian wants to know what the Shore gains. He asks me and looks at the commander’s notebook, because he knows who pays.'),
      ],
      escolha: { id: 'trOssian', pergunta: T('Ossian', 'Ossian'), opcoes: [
        { id: 'contar', fala: true, tom: 'manipular', aoEscolher: (st) => trChefe(st), txt: T('Redom vai precisar de alguém que conte os barcos da Orla. Melhor que você, Ossian, só eu.', 'Redom will need someone to count the Shore’s boats. Only I count better than you, Ossian.'),
          resultado: [T('Ossian demora um segundo para entender e meio segundo para sorrir. Já se vê na mesa de Redom, contando barcos por dinheiro.', 'Ossian takes one second to understand and half a second to smile. He already sees himself at Redom’s table, counting boats for money.'),
            T('Aubert anota o nome dele e sublinha. O que o Ossian contar para Redom, vai contar para mim primeiro.', 'Aubert writes his name and underlines it. Whatever Ossian counts for Redom, he will count for me first.')] },
        { id: 'pagar', gesto: true, tom: 'seduzir', aoEscolher: (st) => { trChefe(st); trSusp(st); }, txt: T('Sentar ao lado dele, com o joelho no dele, e dizer baixo: “Você não confia em mim, Ossian? O que eu faço é sempre o melhor para os meus.”', 'Sit beside him, my knee against his, and say low: “Don’t you trust me, Ossian? What I do is always best for my own.”'),
          resultado: [T('Ossian se endireita na cadeira como quem ganhou a mesa. Põe a marca dos Mastreiros primeiro, alto, para os outros verem quem a Madrinha chama de seu.', 'Ossian straightens in his chair like a man who has won the whole table. He puts the Mastmen’s mark down first, loudly, so the others see whom the Godmother calls her own.'),
            T('Aubert ouviu o “os meus”. Escreve que a prisioneira senta do lado dos Mastreiros, e sublinha. A Laura vai ler que eu já escolhi um lado.', 'Aubert heard the “my own”. He writes that the prisoner sits on the Mastmen’s side, and underlines it. Laura will read that I have already chosen a side.')] },
        { id: 'porta', fala: true, tom: 'intimidar', txt: T('A Orla ganha o que eu deixar, Ossian. E você ganha continuar sentado nessa cadeira.', 'The Shore gains whatever I allow, Ossian. And you gain the right to stay in that chair.'),
          resultado: [T('Ossian continua sentado, mas o sorriso some. Não assina. Os Mastreiros vão esperar o Ossian decidir, e o Ossian não decide nada sem ver para que lado o vento sopra.', 'Ossian stays seated, but the smile goes. He doesn’t sign. The Mastmen will wait for Ossian to decide, and Ossian decides nothing until he sees which way the wind blows.'),
            T('Aubert anota: a prisioneira ameaça os próprios chefes, e um dos três não assinou.', 'Aubert notes: the prisoner threatens her own chiefs, and one of the three didn’t sign.')] },
      ] } },

    { id: 't03r', zona: 'cabine', agua: 0, sal: .15, pedra: (st) => termos(st) === 'argola', fundo: { img: IMG('t03-aubert-mesa'), dim: .62, foco: '60% 50%' },
      texto: [
        T('Ruo não senta. Fala da porta, alto, para o comandante ouvir: a Sentença ainda boia, e o irmão dele não.', 'Ruo doesn’t sit. He speaks from the door, loudly, for the commander to hear: the Sentence still floats, and his brother doesn’t.'),
      ],
      escolha: { id: 'trRuo', pergunta: T('Ruo', 'Ruo'), opcoes: [
        { id: 'moeda', gesto: true, tom: 'manipular', aoEscolher: (st) => trChefe(st), txt: T('Pôr uma moeda na mão dele, como a Orla faz com a Madrinha antes de enganar alguém.', 'Put a coin in his hand, the way the Shore does for the Godmother before fooling someone.'),
          resultado: [{ moeda: true, t: T('Fecho os dedos dele por cima da moeda.', 'I close his fingers over the coin.') },
            T('Desta vez é a Madrinha que paga. Ruo olha a moeda, depois o comandante, e entende quem vai ser enganado. Entra, senta, e diz que o Recife espera três meses.', 'This time it is the Godmother who pays. Ruo looks at the coin, then at the commander, and understands who is going to be fooled. He comes in, sits, and says the Reef will wait three months.'),
            T('Aubert escreve: presente de paz.', 'Aubert writes: a gift of peace.')] },
        { id: 'deixei', fala: true, tom: 'intimidar', aoEscolher: (st) => { trChefe(st); trSusp(st); }, txt: T('A Sentença boia porque eu deixei, Ruo.', 'The Sentence floats because I let her, Ruo.'),
          resultado: [T('Ruo descruza os braços. Entra e senta.', 'Ruo uncrosses his arms. He comes in and sits.'),
            T('Aubert escreve palavra por palavra. A Laura vai ler que eu deixei a galera dela boiar.', 'Aubert writes word by word. Laura will read that I let her galley float.')] },
        { id: 'irmao', fala: true, tom: 'intimidar', aoEscolher: (st) => { trSusp(st); }, txt: T('Quem vendeu a rota do seu irmão está nesta mesa.', 'Whoever sold your brother’s route is at this table.'),
          resultado: [T('Ruo atravessa a cabine antes de eu terminar. A faca dele para no pescoço da Sarnai, e quem segura o braço dele é o comandante.', 'Ruo crosses the cabin before I finish. His knife stops at Sarnai’s throat, and the one who holds his arm is the commander.'),
            T('O Recife sai da cabine sem prometer nada. Aubert escreve tudo, e a Orla ganha uma briga que não é minha.', 'The Reef leaves the cabin without promising anything. Aubert writes all of it, and the Shore gains a quarrel that isn’t mine.')] },
      ] } },

    { id: 't04', zona: 'cabine', agua: 0, sal: .15, pedra: (st) => termos(st) === 'argola', fundo: { img: IMG('a06b-plano'), dim: .5, lado: 'dir', foco: '35% 50%' },
      texto: (st) => {
        const n = st.f.trChefes || 0;
        if (n <= 1) return [
          n === 0 ? T('De manhã, a página do comandante continua em branco. Nenhuma das três casas põe a marca.', 'By morning, the commander’s page is still blank. None of the three houses puts its mark on it.') : T('Antes do sol, a folha do caderno tem a marca de uma casa só.', 'Before sunrise, the notebook’s page bears the mark of one house only.'),
          V(null, T('— A Lâmina vai saber que a senhora não manda nem nesta mesa — diz Aubert, e fecha o caderno.', '— The Blade will know you don’t command even this table — says Aubert, and closes the notebook.')),
        ];
        return [
          n === 3 ? T('Antes do sol, a folha do caderno do comandante tem a marca das três casas.', 'Before sunrise, the page of the commander’s notebook bears the mark of all three houses.')
            : T('Antes do sol, a folha do caderno do comandante tem a marca de duas casas. A terceira manda dizer que não toca em barco de Redom enquanto as outras não tocarem.', 'Before sunrise, the page of the commander’s notebook bears the mark of two houses. The third sends word that it won’t touch a Redom boat while the others don’t.'),
          T('Não é rendição. É uma trégua: três meses sem pirataria na costa, enquanto as casas decidem o resto.', 'It isn’t surrender. It is a truce: three months without piracy on the coast, while the houses decide the rest.'),
          T('Três meses.', 'Three months.'),
          T('Na volta, da amurada da Sentença, Aubert anota as velas da Orla ao longo da costa. Toda manhã a linha é mais curta.', 'On the way back, from the Sentence’s rail, Aubert writes down the Shore’s sails along the coast. Every morning the line is shorter.'),
          (st.f.trSusp || 0) >= 2 ? T('O caderno dele engorda mais que a folha das casas.', 'His notebook grows fatter than the houses’ page.') : T('Ele escreve menos a cada dia. Quando o mar fica vazio, o caderno não tem mais o que dizer.', 'He writes less each day. When the sea goes empty, the notebook has nothing left to say.'),
        ];
      } },

    // a trégua não saiu: a Lâmina não precisa dela
    { id: 'falhouTregua', soDesvio: true, volta: true, zona: 'ala', agua: 0, sal: .25, pedra: true, fundo: { img: IMG('c02-cela'), dim: .5, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('Na Capital, a Laura lê o caderno do começo ao fim sem levantar os olhos. Depois manda abrir a Ala Funda outra vez.', 'In the Capital, Laura reads the notebook from start to finish without looking up. Then she has the Deep Ward opened again.'),
        T('A pedra surda bebe outra vez. Uma mulher que não traz as facções não vale mais que uma forca.', 'The deafstone drinks again. A woman who doesn’t bring the factions is worth no more than a gallows.'),
      ] },

    { id: 't05', zona: 'capital', agua: 0, sal: .25, pedra: (st) => termos(st) === 'argola', fundo: { img: IMG('t05-laura-aubert'), dim: .5, lado: 'dir', foco: '30% 40%' },
      texto: (st) => [
        T('Na Capital, a Laura recebe o comandante numa sala com um mapa na parede. Lê a folha das casas em pé. Lê o caderno sentada, e demora.', 'In the Capital, Laura receives the commander in a room with a map on the wall. She reads the houses’ page standing. She reads the notebook sitting, and takes her time.'),
        V(null, T('— Três meses. — Ela dobra a folha. — Em três meses eu vou ao deserto e volto.', '— Three months. — She folds the page. — In three months I can go to the desert and come back.')),
        T('Ela diz isso para o mapa, para o sul, e não para mim. A ideia já é dela.', 'She says it to the map, to the south, not to me. The idea is already hers.'),
        (st.f.trSusp || 0) >= 2 ? V(null, T('— O caderno diz que a senhora mente bem. Fica onde eu possa ver.', '— The notebook says you lie well. Stay where I can see you.'))
          : V(null, T('— Até lá, a senhora fica. Como hóspede.', '— Until then, you stay. As a guest.')),
      ] },

    { id: 't06', zona: 'capital', agua: 0, sal: .28, pedra: (st) => termos(st) === 'argola', veste: 'ela', fundo: { img: IMG('t06-quarto'), dim: .45, foco: '70% 55%' },
      texto: (st) => [
        T('A hospedagem que a Laura me dá é um quarto no térreo do templo do Cavaleiro, no alto da Capital, com cama de verdade, chão de laje e um guarda na porta. De manhã ele destranca e confere: uma hóspede. À noite, tranca.', 'The hospitality Laura gives me is a ground-floor room in the Knight’s temple, high in the Capital, with a real bed, a flagstone floor, and a guard at the door. In the morning he unlocks it and checks: one guest. At night, he locks it.'),
        termos(st) === 'sombra' ? T('Do lado de fora, numa cadeira encostada na porta, dorme o homem que o comandante deixou para mim.', 'Outside, on a chair tilted against the door, sleeps the man the commander left for me.') : null,
        T('De dia, posso andar pela praça e pelo mercado, com o guarda dez passos atrás. Ele vigia a minha cara. As caras que eu olho, ele não vigia.', 'By day I may walk the square and the market, with the guard ten paces behind. He watches my face. The faces I look at, he doesn’t watch.'),
      ].filter(Boolean) },

    // com a argola, a pedra bebe o rosto e a água. Mas a pele embaixo do ferro é dela, e molhada escorrega
    { id: 't06a', se: (st) => termos(st) === 'argola', zona: 'capital', agua: 0, sal: .3, pedra: true, veste: 'ela', fundo: { img: IMG('d01-argola'), dim: .45, foco: '55% 50%' },
      texto: [
        T('Com a argola no pulso, a pedra engole o que eu sei fazer. O rosto não muda, e a água não me ouve. De manhã o guarda confere a argola junto com a hóspede.', 'With the shackle on my wrist, the stone swallows what I can do. My face won’t change, and the water won’t hear me. In the morning the guard checks the shackle along with the guest.'),
        T('Mas a pele embaixo do ferro ainda é minha. De noite, molho o pulso na bacia e deixo a pele lembrar de onde veio. Ela fica lisa como peixe tirado agora do mar, e a mão escorrega pela argola sem quebrar nada.', 'But the skin under the iron is still mine. At night I wet my wrist in the basin and let the skin remember where it came from. It turns slick as a fish just pulled from the sea, and the hand slides out of the shackle without breaking anything.'),
        T('Antes do sol, molho o pulso outra vez, e a mão volta para dentro do ferro.', 'Before sunrise, I wet my wrist again, and the hand slides back inside the iron.'),
      ] },

    // a primeira noite: a água da cisterna esquecida corta a passagem, por baixo da cama
    { id: 't06b', zona: 'capital', agua: .4, sal: .3, pedra: false, veste: 'ela', fundo: { img: IMG('t06-quarto'), dim: .55, foco: '70% 55%' },
      texto: [
        T('Na primeira noite, deitada no escuro, sinto água embaixo do chão. Muita água, parada há tanto tempo que esqueceu o sal. O templo do Cavaleiro foi construído em cima de uma cisterna que a cidade esqueceu.', 'On the first night, lying in the dark, I feel water under the floor. A great deal of water, still for so long it has forgotten salt. The Knight’s temple was built on top of a cistern the city forgot.'),
        T('Chamo essa água para cima. Ela sobe pelas frestas, fina como linha e dura como faca, e corta a argamassa em volta da laje embaixo da cama sem barulho nenhum. Depois corta a terra embaixo da laje, até a cisterna.', 'I call that water up. It rises through the cracks, thin as thread and hard as a blade, and cuts the mortar around the flagstone under the bed without a sound. Then it cuts the earth beneath the flagstone, all the way to the cistern.'),
        T('Redom vigia a porta, a janela e o meu rosto.', 'Redom watches the door, the window, and my face.'),
        T('Antes do sol, a laje volta para o lugar. A junta fica fina como um fio de cabelo, e eu fecho com lama de cal.', 'Before sunrise, the flagstone goes back in its place. The seam is as thin as a hair, and I seal it with lime mud.'),
        T('Daí em diante é sempre assim. De noite, a água empurra a laje por baixo e desfaz a lama. Antes do sol, assenta a laje e fecha a junta. Quando o guarda destranca a porta, acha o que deixou: uma hóspede, uma cama, um chão.', 'From then on it is always the same. At night, the water pushes the flagstone up from below and washes the mud away. Before sunrise, it settles the stone and closes the seam. When the guard unlocks the door, he finds what he left: one guest, one bed, one floor.'),
      ] },

    { id: 'd02', zona: 'cisterna', agua: .9, sal: .12, pedra: false, veste: 'ela', fundo: { video: VID('d02-cisterna'), img: IMG('d02-cisterna'), dim: .45, clima: 'bolhas', foco: '55% 50%' },
      texto: [
        T('A cisterna é de colunas, mais velha que o templo, e a água tem gosto de cal. Não tem porta nem escada. A laje do quarto é inteira, e embaixo dela fica a cisterna: a água desfaz a junta, eu desço levada por ela, e a junta se fecha atrás de mim. Antes do sol, o mesmo caminho ao contrário. Da cisterna saem os canais de esgoto que correm por baixo da Capital inteira, até os bueiros da Rua das Fontes e da rua das lavanderias.', 'The cistern is all columns, older than the temple, and the water tastes of lime. It has no door and no stairs. The flagstone of my room is whole, and the cistern lies beneath it: the water undoes the joint, I go down carried by it, and the joint closes behind me. Before sunrise, the same way in reverse. From the cistern run the sewer channels that pass beneath the whole Capital, up to the drains on Fountain Street and the street of laundries.'),
        T('Nas semanas antes do conselho, aprendo a Capital por baixo. Cada bueiro é uma porta, e nenhum tem guarda.', 'In the weeks before the council, I learn the Capital from underneath. Every drain is a door, and none has a guard.'),
        T('Por cima, de dia, guardo os rostos que olho na praça. Dois servem para qualquer noite.', 'Up above, by day, I keep the faces I look at in the square. Two of them serve for any night.'),
        G('bento', T('O do Bento, um menino que carrega água das fontes para as casas. Com o balde, entra e sai de qualquer cozinha, e menino de balde não tem nome.', 'Bento’s, a boy who carries water from the fountains to the houses. With his bucket he goes in and out of any kitchen, and a boy with a bucket has no name.')),
        G('lume', T('O da Lume, a mais cara da Casa das Lanternas. Abre qualquer porta de homem, e nenhuma em silêncio.', 'Lume’s, the dearest at the House of Lanterns. She opens any man’s door, and none of them quietly.')),
        T('A minha cara eu nunca levo para a noite: a Capital toda já viu essa cara com o guarda atrás. De dia ela é minha, mas presa: as orelhas quietas, as escamas fechadas, a boca da hóspede que sorri para a praça.', 'My own face I never take into the night: the whole Capital has seen it with the guard behind. By day it is mine, but held: ears still, scales shut, the mouth of the guest who smiles at the square.'),
        V('D16', T('Toda noite, depois do trabalho, eu tiro o rosto do dia e durmo lá embaixo, na minha pele, no escuro. É a única hora em que a água me segura.', 'Every night, after the work, I take off the day’s face and sleep down there, in my own skin, in the dark. It is the only hour when the water holds me.')),
        T('O sal some um pouco. No dia seguinte volta, maior.', 'The salt fades a little. The next day it comes back, larger.'),
        T('Antes de o guarda abrir a porta, passo as mãos pelo corpo, da testa aos pés, e a água desce de mim pelas frestas da laje. Deito seca.', 'Before the guard opens the door, I run my hands down my body, from brow to feet, and the water leaves me through the cracks in the flagstone. I lie down dry.'),
      ] },

    // ===================================================== PARTE V · OS PEQUENOS
    { id: 'p5', parte: T('V · Os Pequenos', 'V · The Small Folk'), zona: 'capital', agua: 0, sal: .3, pedra: false, fundo: { img: IMG('d03-capital'), dim: .55 },
      cartao: { num: T('Parte V', 'Part V'), nome: T('Os Pequenos', 'The Small Folk'), epigrafe: T('Os pequenos dizem a verdade sobre os grandes.', 'The small tell the truth about the great.'), fonte: T('dito de Nove Mastros', 'saying of Nine Masts') } },

    { id: 'd03', zona: 'capital', agua: 0, sal: .3, fundo: { img: IMG('d03-capital'), dim: .45, clima: 'poeiraCal', foco: '55% 40%' },
      texto: [
        T('Da janela do quarto vejo as tropas da costa voltando para a Capital, uma leva por semana, com a poeira na frente. A Orla está quieta, e Redom não sabe o que fazer com tanto soldado parado.', 'From my window I watch the coast troops coming back to the Capital, one company a week, dust in front of them. The Shore is quiet, and Redom doesn’t know what to do with so many idle soldiers.'),
        T('Fora dos muros, a coluna para a Boca Seca está sendo montada há um mês: carroças, forjas, sacos de sal. Falta o conselho decidir quem vai, e quantos. Decide daqui a três dias.', 'Outside the walls, the column for the Dry Mouth has been assembling for a month: wagons, forges, sacks of salt. The council has still to decide who goes, and how many. It decides in three days.'),
        V('D17', T('Tenho três noites. De dia, ouço os pequenos. De noite, visto um deles e vou atrás dos grandes. Não dá para todos. Escolho.', 'I have three nights. By day I listen to the small. By night I wear one of them and go after the great. There isn’t time for all. I choose.')),
      ] },

    ...NOITE(1),

    // a lavadeira: na volta da primeira noite, antes do sol, ainda com o rosto da noite
    { id: 'l01', zona: 'capital', agua: 0, sal: .38, veste: (st) => window.LIVRO.mascNoite(st, 1), fundo: { img: IMG('l01-lavadeira'), dim: .45, lado: 'dir', foco: '35% 55%' },
      texto: [
        T('Na volta, antes do sol, corto caminho pela rua das lavanderias, até o bueiro. As lavadeiras já estão na água. Entre as mulheres de Redom, uma Nymae lava roupa de soldado, com uma argola de cativa no tornozelo. Veio de algum barco que a Sentença tomou.', 'On the way back, before sunrise, I cut through the street of laundries, toward the drain. The washerwomen are already in the water. Among the women of Redom, a Nymae washes soldiers’ clothes, a captive’s ring on her ankle. She came from some boat the Sentence took.'),
        T('Quando eu passo, a água do tanque dela fica lisa, e a roupa para de boiar. Ela levanta os olhos para mim, que estou com o rosto de {MASC}, e não vê {MASC}.', 'As I pass, the water in her trough goes smooth, and the washing stops floating. She lifts her eyes to me, in the face of {MASC}, and does not see {MASC}.'),
        T('Larga a roupa na água e se ajoelha na lama, no meio da rua. As outras param de bater roupa.', 'She drops the laundry in the water and kneels in the mud, in the middle of the street. The others stop beating their washing.'),
        T('Tantos olhos de uma vez pesam no rosto emprestado, e ele escorrega.', 'So many eyes at once weigh on the borrowed face, and it slips.'),
      ],
      piscar: { id: 'p2', antes: 4, erro: true, aoFalhar: (st) => { st.alarme += 1; },
        ok: [T('Fecho os olhos a tempo. Só ela viu.', 'I close my eyes in time. Only she saw.')],
        falha: [T('Demoro. Um soldado que passa com a roupa suja no braço vê escama no meu pescoço e para, com a mão no cinto.', 'I’m too slow. A soldier passing with dirty clothes over his arm sees scales on my neck and stops, his hand on his belt.')] } },

    { id: 'l02', zona: 'capital', agua: 0, sal: .38, fundo: { img: IMG('l01-lavadeira'), dim: .58, lado: 'dir', foco: '35% 55%' },
      texto: [
        G('lavadeira', T('Ela segura a barra da minha roupa com as duas mãos e não diz nada. Diz tudo com a testa, encostada no meu pé.', 'She holds the hem of my clothes with both hands and says nothing. She says everything with her forehead, pressed to my foot.')),
        T('Uma Nymae ajoelhada para alguém de Redom, no meio da rua. As janelas começam a abrir, e o guarda do templo vai abrir a minha porta quando o sol nascer.', 'A Nymae on her knees to someone of Redom, in the middle of the street. Shutters start to open, and the temple guard will open my door at sunrise.'),
      ],
      escolha: { id: 'lavadeira', pergunta: T('A lavadeira', 'The washerwoman'), opcoes: [
        { id: 'levantar', gesto: true, tom: 'seduzir', alarme: 1, aviso: AV.lavadeira, txt: T('Tocar a testa dela, um instante, e seguir.', 'Touch her brow, a moment, and walk on.'),
          resultado: [T('A mão é emprestada, e ela sente a minha por baixo. Fica de joelhos no meio da rua, de olhos fechados, até muito depois de eu dobrar a esquina, com a roupa dos soldados afundando na água.', 'The hand is borrowed, and she feels mine beneath it. She stays on her knees in the middle of the street, eyes closed, long after I turn the corner, the soldiers’ laundry sinking in the water.')] },
        { id: 'usar', fala: true, tom: 'manipular', flag: 'lavadeiraColuna', aviso: AV.lavadeira, txt: T('Levante. Quando a coluna sair, carregue água nela. Eu acho você lá.', 'Get up. When the column marches, carry water in it. I’ll find you there.'),
          resultado: [T('Ela beija a minha mão emprestada e diz que sim. Vai pedir. Vão aceitar: uma Nymae carrega água melhor que qualquer um.', 'She kisses my borrowed hand and says yes. She’ll ask. They’ll take her: a Nymae carries water better than anyone.')] },
        { id: 'matar', gesto: true, tom: 'intimidar', corpos: 1, aviso: AV.ninguem, txt: T('Voltar na noite seguinte e levá-la para a cisterna.', 'Come back the next night and take her to the cistern.'),
          resultado: [T('Na noite seguinte eu volto. Ela desce comigo pelo bueiro e anda pelo esgoto até a cisterna sem perguntar nada, porque sou eu. Lá embaixo, a água fica com ela.', 'The next night I come back. She goes down the drain with me and walks the sewer to the cistern without asking anything, because it is me. Down there, the water keeps her.')] },
      ] } },

    ...NOITE(2),
    ...NOITE(3),

    // presa: três rastros na Capital, e a conta dá nela
    { id: 'presa', soDesvio: true, volta: true, zona: 'ala', agua: 0, sal: .3, pedra: true, fundo: { img: IMG('c02-cela'), dim: .5, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('Desta vez, quando eu subo pela laje, o guarda está sentado na minha cama, com a tocha acesa e dois soldados atrás.', 'This time, when I come up through the flagstone, the guard is sitting on my bed, with the torch lit and two soldiers behind him.'),
        T('Alguém em Redom juntou as roupas que sumiram, as bocas que contaram, os rostos que escorregaram na rua. Tudo levou até mim.', 'Someone in Redom put together the clothes that went missing, the mouths that talked, the faces that slipped in the street. All of it led to me.'),
        T('A pedra surda volta para os meus pulsos, e a escada da Ala Funda desce outra vez.', 'The deafstone goes back on my wrists, and the stairs of the Deep Ward go down again.'),
      ] },

    // o conselho não ouviu o que ela precisava
    { id: 'falhouConselho', soDesvio: true, volta: true, zona: 'ala', agua: 0, sal: .4, pedra: true, fundo: { img: IMG('c02-cela'), dim: .5, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('De manhã, o conselho ouve "acabou" e respira aliviado. A coluna da Boca Seca vira uma patrulha de cem homens, e a Laura não vai com ela.', 'In the morning the council hears "it’s over" and breathes easier. The column for the Dry Mouth becomes a patrol of a hundred men, and Laura doesn’t go with it.'),
        T('À tarde ela manda me buscar no quarto. Hóspede só vale enquanto serve para alguma coisa, e uma Orla quieta não vale nada para quem não vai sair de casa.', 'In the afternoon she sends for me. A guest is worth keeping only while she is of use, and a quiet Shore is worth nothing to someone who isn’t leaving home.'),
        T('A pedra surda volta para os meus pulsos.', 'The deafstone goes back on my wrists.'),
      ] },

    { id: 'd10', zona: 'capital', agua: 0, sal: .55, frase: 'brilha', aoEntrar: (st) => { st.f.fraseBoca = true; }, fundo: { img: IMG('d10-praca'), dim: .45, clima: 'poeiraCal', foco: '55% 40%' },
      texto: (st) => {
        const cheias = trabalhados(st).filter((a) => resultadoDe(st, a) === 'cheia').length;
        return [
          T('Na manhã seguinte os pequenos sabem antes dos arautos. A moça do pão, o cavalariço, o menino dos recados, todos dizem a mesma coisa: Laura leva os melhores à Boca Seca.', 'The next morning the small folk know before the heralds. The bread girl, the stable boy, the errand boy, all of them say the same thing: Laura takes the best to the Dry Mouth.'),
          cheias >= 2 ? T('No conselho, dizem, três vozes falaram a mesma coisa com palavras diferentes, e cada uma achou que era a primeira.', 'In council, they say, three voices said the same thing in different words, and each thought it was the first.')
            : T('No conselho, dizem, uma voz falou mais alto que as outras, e as outras foram atrás.', 'In council, they say, one voice spoke louder than the rest, and the rest followed.'),
          V('D18', T('A frase na minha cabeça brilha uma vez e fica quieta, sem sumir.', 'The sentence in my head shines once and goes quiet, without fading.')),
        ];
      } },

    // a palavra cumprida: a Laura manda a hóspede de volta à Orla para segurar a trégua. O custo de sumir depende dos termos
    { id: 'd01p', se: (st) => termos(st) !== 'sombra', zona: 'estrada', agua: 0, sal: .4, pedra: false, veste: 'ela', fundo: { img: IMG('d01-estalagem'), dim: .5, foco: '55% 45%' },
      texto: (st) => [
        T('Com a coluna decidida, a Laura não quer a hóspede na Capital sem ela. Me manda de volta à Orla, para segurar a trégua de perto, com dois cavaleiros pela estrada da costa.', 'With the column decided, Laura doesn’t want her guest in the Capital without her. She sends me back to the Shore, to hold the truce up close, with two knights along the coast road.'),
        termos(st) === 'argola' ? T('Na beira da estrada, tiram a argola, porque a Laura mandou. Não sabem que ela já não me prendia.', 'At the roadside they take off the shackle, because Laura ordered it. They don’t know it no longer held me.') : null,
        T('Na primeira estalagem eles dormem com o rosto virado para a porta. A cozinha fica do outro lado.', 'At the first inn they sleep with their faces to the door. The kitchen is on the other side.'),
        G('criada', T('Quem não dorme é a criada, Greta, que limpa a cozinha cantando baixo, sozinha. Tem a minha altura e as mãos vermelhas de sabão.', 'The one who doesn’t sleep is the maid, Greta, scrubbing the kitchen alone and singing under her breath. She is my height, with hands red from soap.')),
      ].filter(Boolean),
      escolha: { id: 'trajeCriada', pergunta: T('A roupa da Greta', 'Greta’s clothes'), opcoes: [
        { id: 'roubar', gesto: true, preco: 'roubar', tom: 'manipular', alarme: 1, txt: T('Entrar no quartinho dela, enquanto ela canta na cozinha, e levar o vestido de reserva.', 'Slip into her little room while she sings in the kitchen, and take the spare dress.'),
          resultado: [{ t: T('O quartinho fica atrás do forno e não tem porta, só uma cortina. Enquanto ela canta, tiro o vestido de reserva do prego. Serve mal. Serve. De manhã ela vai dar falta e perguntar aos cavaleiros, e os cavaleiros vão ter duas coisas para não explicar.', 'The little room is behind the oven and has no door, only a curtain. While she sings, I take the spare dress off its nail. It fits badly. It fits. In the morning she’ll miss it and ask the knights, and the knights will have two things not to explain.'), veste: 'criada' }] },
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'seduzir', testemunha: 1, txt: T('Ficar na cozinha com a Greta e ouvir a canção dela.', 'Stay in the kitchen with Greta and listen to her song.'),
          resultado: [T('Escuto a canção dela até o fim, de queixo apoiado na mão, e ela canta pela primeira vez para alguém. Elogio a voz primeiro. Depois, o rosto.', 'I listen to her whole song, chin in my hand, and for the first time she sings it to someone. I praise her voice first. Then her face.'),
            T('Ela conta que viu poucas Nymae na vida, e que eu já sou a preferida dela, porque fui a única que prestou atenção nela.', 'She tells me she has seen few Nymae in her life, and that I am already her favorite, because I’m the only one who ever paid her any mind.'),
            T('Esbarro de propósito na bacia de lavar as tigelas. A água gordurosa, com resto de comida, suja a minha roupa toda.', 'I bump the bowl-washing basin on purpose. The greasy water, with scraps of food in it, soaks all my clothes.'),
            { t: T('Sem eu precisar pedir, ela me dá o vestido de reserva e um pedaço de pão para a estrada. Quando os cavaleiros perguntarem, vai mentir por mim.', 'Without my having to ask, she gives me her spare dress and a piece of bread for the road. When the knights ask, she’ll lie for me.'), veste: 'criada' }] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'intimidar', corpos: 1, alarme: 2, erro: true, txt: T('Seguir a Greta até o poço e jogá-la lá dentro.', 'Follow Greta to the well and throw her in.'),
          resultado: [{ t: T('O poço é fundo. Ela cai sem gritar. Mas de manhã os cavaleiros acordam com a cama vazia e uma criada no poço, e isso eles contam.', 'The well is deep. She falls without a scream. But in the morning the knights wake to an empty bed and a maid in the well, and that they will report.'), veste: 'criada' }] },
      ] },
      depois: [T('A Orla segura a trégua sem mim. A coluna vai para a Boca Seca, e a frase vai com ela. Eu também vou.', 'The Shore will hold the truce without me. The column is going to the Dry Mouth, and the sentence goes with it. So do I.'), T('Volto para a Capital antes do sol. Dois cavaleiros que perdem a hóspede da Laura não vão contar isso a ela. Vão procurar até a costa.', 'I am back in the Capital before sunrise. Two knights who lose Laura’s guest won’t tell her so. They’ll search all the way to the coast.')] },

    { id: 'd01s', se: (st) => termos(st) === 'sombra', zona: 'capital', agua: 0, sal: .4, pedra: false, veste: 'ela', fundo: { img: IMG('d01-sombra'), dim: .5, foco: '60% 45%' },
      texto: [
        T('Com a coluna decidida, a Laura não quer a hóspede na Capital sem ela, e me manda de volta à Orla, para segurar a trégua de perto. O homem do comandante vai junto. Anda bem: nunca perto, nunca longe.', 'With the column decided, Laura doesn’t want her guest in the Capital without her, and sends me back to the Shore, to hold the truce up close. The commander’s man comes too. He walks well: never close, never far.'),
        G('capa', T('No mercado, antes da porta da cidade, uma moça da minha altura experimenta uma capa velha e não tem dinheiro para ela.', 'At the market, before the city gate, a girl my height tries on an old cloak and doesn’t have the money for it.')),
      ],
      escolha: { id: 'sombra', pergunta: T('A sombra', 'The shadow'), opcoes: [
        { id: 'trocar', gesto: true, tom: 'manipular', testemunha: 1, txt: T('Trocar de roupa com a moça e deixar a minha capa roxa com ela.', 'Swap clothes with the girl and leave her my purple cloak.'),
          resultado: [{ t: T('Ofereço a minha capa roxa pela capa velha dela, e o vestido de troca. Ela acha que é brincadeira até eu tirar a capa. Trocamos atrás da barraca de panos. Ela sai do mercado de capa roxa, feliz da vida, para o lado do porto. A sombra segue a capa até a costa. Eu saio pelo outro lado, com o rosto dela.', 'I offer my purple cloak for her old one, and my dress in exchange. She thinks it’s a joke until I take off the cloak. We swap behind the cloth stall. She leaves the market in my purple cloak, delighted, toward the harbor. The shadow follows the cloak all the way to the coast. I leave the other way, in her face.'), veste: 'capa' }] },
        { id: 'matar', gesto: true, tom: 'intimidar', corpos: 1, alarme: 2, erro: true, txt: T('Levar a sombra para um beco e matá-lo lá.', 'Lead the shadow into an alley and kill him there.'),
          resultado: [{ t: T('Ele entra no beco atrás de mim, porque é o trabalho dele. Não sai. Saio eu, com o rosto da moça da capa. Um homem do comandante que não volta faz o comandante vir procurar.', 'He follows me into the alley, because that is his job. He doesn’t come out. I do, in the face of the girl with the cloak. A commander’s man who doesn’t come back brings the commander looking.'), veste: 'capa' }] },
      ] },
      depois: (st) => [
        T('Dou a volta pelos fundos das forjas e entro de novo pela porta das carroças de lenha, no rosto da moça da capa. Quem carrega lenha para uma coluna não é parado.', 'I circle round behind the forges and come back in by the gate of the firewood carts, in the face of the girl with the cloak. No one stops a person carrying wood for a column.'),
        ...(st.escolhas.sombra === 'matar' ? [T('Quando o comandante achar o corpo, a hóspede que ele procura já estará na cozinha do exército.', 'By the time the commander finds the body, the guest he is looking for will already be in the army’s kitchen.')] : []),
        T('A Orla segura a trégua sem mim. A coluna vai para a Boca Seca, e a frase vai com ela. Eu também vou.', 'The Shore will hold the truce without me. The column is going to the Dry Mouth, and the sentence goes with it. So do I.'),
      ] },

    // ===================================================== PARTE VI · A COLUNA
    { id: 'p6', parte: T('VI · A Coluna', 'VI · The Column'), zona: 'coluna', agua: 0, sal: .6, fundo: { img: IMG('e01-acampamento'), dim: .55, clima: 'poeira' },
      cartao: { num: T('Parte VI', 'Part VI'), nome: T('A Coluna', 'The Column'), epigrafe: T('Exército em marcha tem mais servo que soldado, e servo ninguém conta.', 'An army on the march has more servants than soldiers, and nobody counts servants.'), fonte: T('dito dos intendentes de Redom', 'saying of Redom’s stewards') } },

    { id: 'e01', zona: 'coluna', agua: 0, sal: .6, fundo: { video: VID('e01-acampamento'), img: IMG('e01-acampamento'), dim: .45, clima: 'poeira', foco: '55% 45%' },
      texto: [
        T('Fora dos muros, a coluna termina de se montar: carroças, cavalos, tendas, forjas de campanha, a cozinha do exército. Servo de todo tipo, e nenhum deles é visto.', 'Outside the walls, the column finishes taking shape: wagons, horses, tents, field forges, the army’s kitchen. Servants of every kind, and none of them is seen.'),
        (st) => ((st.f.erros || 0) >= 2 || st.alarme >= 4 ? T('Na porta de cada tenda, um soldado olha rostos. Alguém em Redom anda contando roupas roubadas e corpos na água.', 'At every tent flap a soldier is looking at faces. Someone in Redom has been counting stolen clothes and bodies in the water.')
          : (st.f.erros || 0) >= 1 || st.alarme >= 2 ? T('Na porta das tendas mais perto da Laura, um soldado olha rostos.', 'At the flaps of the tents nearest Laura, a soldier is looking at faces.')
            : T('Os soldados olham as carroças e não olham as pessoas.', 'The soldiers look at the wagons and not at the people.')),
      ],
      escolha: { id: 'disfarce', pergunta: T('O último rosto', 'The last face'), opcoes: [
        { id: 'estrebaria', gesto: true, guarda: 'estrebaria', txt: T('O de Wil, moço da estrebaria, que dorme no feno com os cavalos. Os cochos dos cavalos são de água.', 'Wil’s, the stable hand, who sleeps in the hay with the horses. The horses’ troughs are full of water.'), resultado: [T('Wil tem a minha altura e um jeito de andar torto que eu aprendo em uma tarde.', 'Wil is my height and has a crooked walk I learn in an afternoon.')] },
        { id: 'forja', gesto: true, guarda: 'forja', txt: T('O de Bram, ajudante de ferreiro, que dorme do lado da forja e acorda com qualquer faísca. Perto do fogo, os olhos fogem.', 'Bram’s, the smith’s helper, who sleeps beside the forge and wakes at any spark. Near the fire, eyes look away.'), resultado: [T('Perto do fogo, a pele vai secar mais rápido. Escolho assim mesmo: o fogo esconde.', 'Near the fire, my skin will dry faster. I choose it anyway: the fire hides.')] },
        { id: 'ilse', gesto: true, guarda: 'ilse', se: (st) => st.alarme <= 1, txt: T('O de Ilse, ajudante de curandeiro, que dorme cansada na tenda dos feridos, a vinte passos da tenda da Laura.', 'Ilse’s, the healer’s helper, who sleeps exhausted in the wounded tent, twenty paces from Laura’s.'), resultado: [T('Ilse quer ver a Laura de perto. Eu também.', 'Ilse wants to see Laura up close. So do I.')] },
        { id: 'nell', gesto: true, guarda: 'nell', se: (st) => st.alarme <= 3, txt: T('O de Nell, da cozinha, que dorme entre os sacos de sal com uma faca no avental. Água e sal ao alcance da mão.', 'Nell’s, from the kitchen, who sleeps among the salt sacks with a knife in her apron. Water and salt within reach.'), resultado: [T('Na cozinha tem sal em saco e água em barril. Tem também o prato da Laura, que volta cheio.', 'In the kitchen there is salt by the sack and water by the barrel. There is also Laura’s plate, which comes back full.')] },
      ] } },

    { id: 'e02', zona: 'coluna', agua: 0, sal: .62, fundo: { img: IMG('e02-tenda'), dim: .5, foco: '55% 45%' },
      texto: [T('A roupa, uma última vez.', 'The clothes, one last time.'), { t: T('Até a roupa estar no meu corpo, ando pelo acampamento com a cara da Lume, levando um cesto de pão para a cozinha dos oficiais. Ninguém olha duas vezes para o cesto.', 'Until they are on my body, I walk the camp in Lume’s face, carrying a basket of bread to the officers’ kitchen. No one looks twice at the basket.'), veste: 'lume' }],
      escolha: { id: 'trajeColuna', pergunta: (st) => T('A roupa de {DISFARCE}', '{DISFARCE}’s clothes'), opcoes: [
        { id: 'roubar', gesto: true, preco: 'roubar', tom: 'manipular', alarme: 1, erro: (st) => METODO_COLUNA(st, 'roubar')[0] === 'errado', txt: T('Pegar a roupa de {DISFARCE} enquanto dorme.', 'Take {DISFARCE}’s clothes while they sleep.'), resultado: (st) => [{ t: METODO_COLUNA(st, 'roubar')[1], veste: st.escolhas.disfarce }] },
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'seduzir', testemunha: 1, erro: (st) => METODO_COLUNA(st, 'seduzir')[0] === 'errado', txt: T('Usar a cara da Lume para ganhar a roupa de {DISFARCE}.', 'Use Lume’s face to win {DISFARCE}’s clothes.'), resultado: (st) => [{ t: METODO_COLUNA(st, 'seduzir')[1], veste: st.escolhas.disfarce }] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'intimidar', corpos: 1, alarme: 2, erro: (st) => METODO_COLUNA(st, 'matar')[0] === 'errado', txt: T('Matar {DISFARCE} e esconder o corpo.', 'Kill {DISFARCE} and hide the body.'), resultado: (st) => [{ t: METODO_COLUNA(st, 'matar')[1], veste: st.escolhas.disfarce }] },
      ] } },

    { id: 'e03', zona: 'coluna', agua: 0, sal: .66, fundo: { img: IMG('e03-odres'), dim: .45, foco: '55% 50%' },
      texto: [
        T('Os servos recebem um odre cada um. Cheio, ele pesa como um gato no ombro.', 'The servants are given one waterskin each. Full, it weighs like a cat on your shoulder.'),
        T('Para o meu corpo, um odre é um gole.', 'For my body, a waterskin is one swallow.'),
        se((st) => !!st.f.lavadeiraColuna, T('Na fila dos odres, a lavadeira da rua das lavanderias enche os barris da cozinha, com a argola de cativa no tornozelo. Não olha para mim. Quando eu passo, deixa um odre cheio a mais no chão, junto do meu pé.', 'In the waterskin line, the washerwoman from the street of laundries fills the kitchen barrels, the captive’s ring on her ankle. She doesn’t look at me. When I pass, she leaves one more full skin on the ground, by my foot.')),
      ],
      escolha: { id: 'agua', pergunta: T('A água', 'The water'), opcoes: [
        { id: 'um', gesto: true, txt: T('Um odre, como todo mundo.', 'One waterskin, like everyone.'), resultado: [T('Um odre, como todo mundo. O que faltar, a pele paga.', 'One skin, like everyone. Whatever is missing, my skin will pay.')] },
        { id: 'escondida', gesto: true, alarme: 1, txt: T('Dois odres e uma bexiga escondida debaixo da roupa.', 'Two skins and a bladder hidden under my clothes.'), resultado: [T('A bexiga faz um volume que um olho bom acharia estranho, e os olhos daqui ainda não aprenderam a olhar para servo.', 'The bladder makes a lump a good eye would find odd, and the eyes here haven’t yet learned to look at servants.')] },
        { id: 'cochos', gesto: true, txt: T('Nada além do que os outros levam. Beber dos cochos dos cavalos.', 'Nothing beyond what the others carry. Drink from the horses’ troughs.'), resultado: [T('Os cavalos não vão se importar. Os homens, se virem, vão.', 'The horses won’t mind. The men, if they see, will.')] },
      ] } },

    { id: 'e04', zona: 'coluna', agua: 0, sal: .72, fundo: { img: IMG('e04-revista'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        G('intendente', T('Na revista dos servos, um intendente passa pela fila puxando os queixos para a luz. Olha os dentes, como se olham os de um cavalo.', 'At the servants’ muster, a steward walks the line pulling chins up to the light. He looks at the teeth, the way you look at a horse’s.')),
        T('Chega em mim. Os dedos dele são quentes e secos, e o sol bate direto no meu rosto. Embaixo do queixo, a pele emprestada começa a repuxar.', 'He reaches me. His fingers are hot and dry, and the sun hits my face full on. Under my chin, the borrowed skin begins to pull.'),
      ],
      piscar: { id: 'p4', antes: 2, aoFalhar: (st) => { st.f.intendenteViu = true; },
        ok: [T('Seguro o rosto no lugar e deixo que ele vire o meu queixo como o de qualquer servo. Ele passa ao próximo.', 'I hold the face in place and let him turn my chin like any servant’s. He moves on to the next.')],
        falha: [T('Demoro. Ele sente a pele áspera embaixo do dedo, franze a testa e segue. Vai lembrar de mim no calor.', 'I’m too slow. He feels rough skin under his finger, frowns, and moves on. He’ll remember me in the heat.')] } },

    { id: 'e05', zona: 'coluna', agua: 0, sal: .85, frase: 'fica', aoEntrar: (st) => { st.f.fraseLaura = true; st.f.fraseBoca = true; }, fundo: { video: VID('e05-saida'), img: IMG('e05-saida'), dim: .42, clima: 'poeira', foco: '55% 45%' },
      texto: [
        T('A coluna sai pelo portão sul da Capital Branca. Eu caminho atrás dos cavalos, com o rosto de {DISFARCE}.', 'The column leaves by the south gate of the White Capital. I walk behind the horses, in {DISFARCE}’s face.'),
        T('Lá na frente, um ponto de cabelo cor de trigo monta um cavalo cinzento.', 'Far ahead, a spot of wheat-colored hair rides a grey horse.'),
        T('O sol de Redom ainda nem é o do deserto, e a pele do meu pulso já repuxa embaixo da manga. Provo o meu lábio. O sal está seco.', 'Redom’s sun isn’t even the desert’s yet, and the skin of my wrist already pulls tight under the sleeve. I taste my lip. The salt is dry.'),
        { t: T('A moeda anda pelos nós dos meus dedos.', 'The coin walks across my knuckles.'), moeda: true },
        V('D19', T('A frase está completa. Atrás dela não tem mais nada escrito.', 'The sentence is complete. Behind it, nothing else is written.')),
        T('É uma sensação estranha, como se o meu corpo não fosse mais necessário neste plano, como se eu fosse sumir de uma hora para outra. Mas então ela continua. Sozinha, brilhando como ouro nos meus pensamentos, com palavras que não parecem minhas.', 'It is a strange feeling, as if my body were no longer needed on this plane, as if I might vanish at any moment. But then it goes on. On its own, shining like gold in my thoughts, with words that don’t seem to be mine.'),
        { t: T('Laura leva os melhores à Boca Seca, e a Boca Seca bebe todos.', 'Laura takes the best to the Dry Mouth, and the Dry Mouth drinks them all.'), voz: 'D24', frase: 'inteira' },
        T('Ajeito o odre no ombro e sigo os cavalos. A frase sabia antes de mim.', 'I settle the waterskin on my shoulder and follow the horses. The sentence knew before I did.'),
      ],
      fim: true },
  ],

  // ---------------------------------------------------------------- as noites: quem é o alvo da noite k e que rosto ela usa
  alvoNoite: (st, k) => { const a = st.escolhas['alvo' + k]; return a === 'circulo' ? circulo(st) : a; },
  mascNoite: (st, k) => st.escolhas['masc' + k] || 'criadaC',

  // ---------------------------------------------------------------- os desvios: presa (três erros), a trégua que não saiu, o conselho que não ouviu
  desvio: (st, p) => {
    if (p.id === 'c04' && J(st, 'interrogatorio').morte) return 'morte';
    if ((st.f.erros || 0) >= ERROS_MAX && !p.soDesvio) return 'presa';
    if (p.id === 't04' && (st.f.trChefes || 0) <= 1) return 'falhouTregua';
    if (p.id === 'n3o' && !convenceu(st)) return 'falhouConselho';
    return null;
  },
  avisoErro: (st) => AVISO_ERRO[st.f.erros || 0] || null,

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
      tregua: { chefes: st.f.trChefes || 0, suspeita: st.f.trSusp || 0, sarnai: st.escolhas.trSarnai || null, ossian: st.escolhas.trOssian || null, ruo: st.escolhas.trRuo || null }, erros: st.f.erros || 0, tentativas: st.tentativas || 0,
      semente: !!st.f.semente, usouSimon: !!st.f.usouSimon, confessou: !!st.f.confessou,
      fuga: st.escolhas.trajeCriada || st.escolhas.sombra || null,
      alvos: [1, 2, 3].map((k) => ({ alvo: window.LIVRO.alvoNoite(st, k), mascara: st.escolhas['masc' + k] || null, saida: st.escolhas['saida' + k] || null, roupa: st.escolhas['traje' + k] || null, resultado: J(st, 'noite' + k).resultado || null })),
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
    const tom = Object.entries(st.tom).filter(([k]) => ['seduzir', 'intimidar', 'manipular'].includes(k)).sort((a, b) => b[1] - a[1])[0][0];
    const frase = t({
      seduzir: T('Ela chegou perto de cada um, e cada um deu a ela mais do que ela pediu. Ela não pediu nada.', 'She came close to each of them, and each gave her more than she asked. She asked for nothing.'),
      intimidar: T('Ela disse em voz alta o que cada um escondia. Depois disso, deixaram de esconder.', 'She said out loud what each of them hid. After that, no one hid anything from her again.'),
      manipular: T('Todos fizeram o que ela queria, e todos juram que a ideia foi deles.', 'They all did what she wanted, and they all swear the idea was theirs.'),
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
          ilse: T('Saiu com o exército de Redom pelo portão sul, com ataduras para a tenda dos feridos, a vinte passos da tenda da Laura.', 'She left with Redom’s army through the south gate, carrying bandages for the wounded tent, twenty paces from Laura’s.'),
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
        volta: t({ mentira: T('Ela tinha dito a eles que hoje não.', 'She had told them not today.'), verdade: T('Ela tinha dito a verdade, e eles foram assim mesmo.', 'She had told them the truth, and they went anyway.'), olhar: T('Ela não disse nada. Passou a mão no rosto de cada um, e eles foram.', 'She said nothing. She ran her hand down each face, and they went.') }[st.escolhas.ordem] || T('Eles foram porque era ela.', 'They went because it was her.')) },
      { titulo: t(T('Laura', 'Laura')),
        feito: t({ palavra: T('Laura a mandou à Orla com um comandante e a palavra dela.', 'Laura sent her to the Shore with a commander and her word.'), sombra: T('Laura a mandou à Orla com um comandante que não saía do lado dela.', 'Laura sent her to the Shore with a commander who never left her side.'), argola: T('Laura a mandou à Orla com uma argola no pulso.', 'Laura sent her to the Shore with a shackle on her wrist.') }[termos(st)]) + ' ' + t((st.f.trChefes || 0) >= 3 ? T('As três casas assinaram a trégua.', 'All three houses signed the truce.') : T('Duas casas assinaram a trégua.', 'Two houses signed the truce.')),
        volta: [st.f.confessou && t(T('Você disse que foi você que levantou o mar.', 'You said it was you who raised the sea.')), st.f.semente && t(T('Você falou da Boca Seca na frente dela.', 'You spoke of the Dry Mouth in front of her.')), st.f.usouSimon && t(T('Você falou do irmão dela.', 'You spoke of her brother.'))].filter(Boolean).join(' ') || t(T('Ela vai lembrar que você não teve medo.', 'She will remember you weren’t afraid.')) },
    ];
    const ditos = trabalhados(st).map((a) => {
      const al = a === 'circulo' ? circulo(st) : a, r = resultadoDe(st, a), nome = t(NOMES_ALVO[al]);
      return al === 'mapas' ? t({ cheia: T('Na Sala dos Mapas, os papéis disseram "agora".', 'In the Map Room, the papers said "now".'), meia: T('Na Sala dos Mapas, os papéis dividiram o conselho.', 'In the Map Room, the papers split the council.'), nada: T('Na Sala dos Mapas, os papéis disseram "acabou".', 'In the Map Room, the papers said "it’s over".') }[r])
        : nome + (lang === 'en' ? { cheia: ' said the gold sentence.', meia: ' said half of it.', nada: ' didn’t say it.' }[r] : { cheia: ' disse a frase de ouro.', meia: ' disse metade.', nada: ' não disse.' }[r]);
    });
    const algum = trabalhados(st).some((a) => resultadoDe(st, a) !== 'nada');
    pilares.push({ titulo: t(T('Os grandes', 'The great')), feito: ditos.join(' '), volta: algum ? t(T('Cada um achou que a ideia era dele.', 'Each one thought the idea was his own.')) : t(T('A ideia ficou com ela. A Laura levou os melhores do mesmo jeito.', 'The idea stayed with her. Laura took the best all the same.')) });
    const n = [];
    trip.forEach((k) => { const c = window.LIVRO.colecao[k]; const fimK = c.fim(st); n.push(t(c.nome).split(',')[0] + ': ' + t(fimK || (typeof c.quer === 'function' ? c.quer(st) : c.quer) || '').replace(/^./, (x) => x.toLowerCase())); });
    n.push((lang === 'en' ? 'Iska: ' : 'Iska: ') + t({ roubar: T('passou o dia no porão do navio, e conta isso até hoje.', 'spent the day in the ship’s hold, and still tells of it.'), seduzir: T('dormiu no navio da Madrinha, sorrindo.', 'slept on the Godmother’s ship, smiling.'), matar: T('dorme embaixo de Nove Mastros.', 'sleeps under Nine Masts.') }[st.escolhas.roupa1] || T('não soube de nada.', 'never knew a thing.')));
    if (st.escolhas.lavadeira) n.push(t(T('A lavadeira', 'The washerwoman')) + ': ' + t(window.LIVRO.colecao.lavadeira.fim(st)).replace(/^./, (x) => x.toLowerCase()));
    n.push(t(T('Rostos vestidos', 'Faces worn')) + ': ' + st.vestiu.length + ' · ' + t(T('corpos que a água guardou', 'bodies the water kept')) + ': ' + st.corpos);
    n.push(t({ um: T('A água: um odre, como todo mundo.', 'The water: one skin, like everyone.'), escondida: T('A água: dois odres e uma bexiga escondida.', 'The water: two skins and a hidden bladder.'), cochos: T('A água: os cochos dos cavalos.', 'The water: the horses’ troughs.') }[st.escolhas.agua] || T('A água: a que der.', 'The water: whatever comes.')));
    const fechou = Object.values(st.piscadas).filter(Boolean).length, total = Object.keys(st.piscadas).length;
    if (total) n.push(t(T('O rosto escorregou', 'The face slipped')) + ': ' + (total - fechou) + (lang === 'en' ? ' of ' : ' de ') + total + (lang === 'en' ? ' times.' : ' vezes.'));
    const colecao = st.colecao.map((id) => ({ id, nome: t(window.LIVRO.colecao[id] ? window.LIVRO.colecao[id].nome : id) }));
    const R = {
      chefes: { doce: T('Devolveu a cada um o seu pedido', 'Gave each their own request back'), fria: T('“Eu vou a Redom.”', '“I am going to Redom.”'), comida: T('Deixou que falassem até acabar', 'Let them talk until they ran out'), sarnai: T('Perguntou a Sarnai quem vendeu a rota', 'Asked Sarnai who sold the route') },
      oferendas: { nomes: T('Devolveu o nome de cada um', 'Gave each their name back'), chao: T('Deixou as moedas no chão', 'Left the coins on the floor'), mentira: T('Devolveu a moeda de quem mentiu', 'Gave back the liar’s coin') },
      ordem: { mentira: T('“Ninguém morre hoje.”', '“No one dies today.”'), verdade: T('“Vocês foram dados ao mar.”', '“You were given to the sea.”'), olhar: T('A mão molhada em cada rosto', 'The wet hand on every face'), matar: T('A lâmina, em quem tentou virar o barco', 'The blade, for whoever tried to turn the boat'), galera: T('Deu a quem ia fugir uma razão para ficar', 'Gave the one about to flee a reason to stay') },
      rosto: { pegar: T('Pegou a mão', 'Took the hand'), ver: T('Viu afundar', 'Watched it go under'), decorar: T('Decorou o rosto', 'Learned the face'), nhale: T('Deu a mão à Nhalé', 'Gave the hand to Nhalé') },
      olhos: { devagar: T('Abriu os olhos para o sargento', 'Opened her eyes for the sergeant'), sorrir: T('Sorriu para quem a carregava', 'Smiled at the one carrying her'), nome: T('Disse o nome da Laura', 'Said Laura’s name') },
      carcereiro: { wim: T('Wim, o que cantarola', 'Wim, who hums'), garrick: T('Garrick, o que nunca olha', 'Garrick, who never looks'), pell: T('Pell, o que reza', 'Pell, who prays'), dunstan: T('Dunstan, o que conta moedas', 'Dunstan, who counts coins') },
      trRuo: { moeda: T('Pôs uma moeda na mão do Ruo', 'Put a coin in Ruo’s hand'), deixei: T('“A Sentença boia porque eu deixei.”', '“The Sentence floats because I let her.”'), irmao: T('Apontou a Sarnai para o Ruo', 'Pointed Ruo at Sarnai') },
      lavadeira: { levantar: T('A mão no rosto dela', 'The hand on her face'), usar: T('Mandou para a coluna', 'Sent her to the column'), matar: T('A cisterna', 'The cistern') },
      disfarce: { estrebaria: T('Moço da estrebaria', 'Stable hand'), forja: T('Ajudante de ferreiro', 'Smith’s helper'), ilse: T('Ajudante de curandeiro', 'Healer’s helper'), nell: T('Moça da cozinha', 'Kitchen girl') },
      agua: { um: T('Um odre', 'One skin'), escondida: T('Água escondida', 'Hidden water'), cochos: T('Os cochos', 'The troughs') },
    };
    const Q = {
      chefes: T('Os chefes da Orla', 'The chiefs of the Shore'), oferendas: T('As oferendas', 'The offerings'), ordem: T('Diante da Sentença', 'Facing the Sentence'), rosto: T('A última mão', 'The last hand'), olhos: T('No convés da Sentença', 'On the Sentence’s deck'),
      carcereiro: T('Na Ala Funda', 'In the Deep Ward'), trRuo: T('A trégua', 'The truce'), lavadeira: T('A lavadeira', 'The washerwoman'), disfarce: T('O último rosto', 'The last face'), agua: T('A água', 'The water'),
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
  // "de o sargento" > "do sargento", "em a irmã" > "na irmã"
  const contrai = (prep, nome) => { const m = /^(o|a|os|as|um|uma) (.*)$/.exec(nome); if (!m || (prep === 'de' && /^um/.test(m[1]))) return prep + ' ' + nome; return (prep === 'de' ? 'd' : 'n') + m[1] + ' ' + m[2]; };
  const nomeMasc = () => tr(CURTO[window.LIVRO.mascNoite(st, k)] || CURTO.criadaC), nomeDisf = () => tr(CURTO[st.escolhas.disfarce] || CURTO.estrebaria);
  s = s.replace(/\b(de|em) \{MASC\}/g, (x, prep) => contrai(prep, nomeMasc())).replace(/\b(de|em) \{DISFARCE\}/g, (x, prep) => contrai(prep, nomeDisf()));
  return s.replace(/\{MOT\}/g, () => NOME_TRIP[st.f.motim || st.f.motimMorto] || '').replace(/\{ULT\}/g, () => NOME_TRIP[st.f.ultimo] || '').replace(/\{MASC\}/g, () => tr(CURTO[window.LIVRO.mascNoite(st, k)] || CURTO.criadaC))
    .replace(/\{DISFARCE\}/g, () => tr(CURTO[st.escolhas.disfarce] || CURTO.estrebaria))
    .replace(/\{LEITOR\}/g, () => (window.LIVRO.mascNoite(st, k) === 'edric' && st.escolhas['traje' + k] === 'matar' ? tr(T('eu mesma, com a voz do Edric', 'I myself, in Edric’s voice')) : tr(T('o Edric', 'Edric'))));
};

// ---------------------------------------------------------------- AS TRÊS NOITES (dia: ouvir um pequeno · noite: um alvo, um rosto, uma roupa, o Anzol)
function NOITE(k) {
  // de dia ela é a hóspede, com o próprio rosto e o guarda atrás; escolhe de quem guardar o rosto para a noite
  const DIA = {
    1: T('O primeiro dia. Ando pela praça sem rosto emprestado, com o guarda dez passos atrás. Ele me vigia. Eu escolho quem vou ser de noite.', 'The first day. I walk the square with no borrowed face, the guard ten paces behind. He watches me. I choose who I will be tonight.'),
    2: T('O segundo dia. Quem manda está no conselho, e quem serve fala alto. O guarda boceja dez passos atrás de mim.', 'The second day. Those who rule are in council, and those who serve talk loud. The guard yawns ten paces behind me.'),
    3: T('O terceiro dia. Amanhã de manhã o conselho decide. Hoje à noite eu subo à Sala dos Mapas, e preciso de um rosto que a guarda de lá conheça, ou de alguém que me diga como o conselho escuta.', 'The third day. Tomorrow morning the council decides. Tonight I go up to the Map Room, and I need a face the guard there knows, or someone to tell me how the council listens.'),
  };
  // a manhã seguinte: a frase da noite na boca dos pequenos (a cidade produzindo a decisão)
  const AGORA = T('Ele está vivo, e está fugindo. É agora ou nunca.', 'He’s alive, and he’s running. It’s now or never.');
  const fraseDe = (st, n) => { const a = window.LIVRO.alvoNoite(st, n); return a === 'mapas' ? AGORA : (window.LIVRO.anzol[a] || {}).ideia || ''; };
  const en = (pt) => (window.LIVRO_EN && window.LIVRO_EN[pt]) || pt;
  const metade = (f) => { const w = f.replace(/[.!?]+$/, '').split(' '); return w.slice(0, Math.ceil(w.length / 2)).join(' ') + '…'; };
  const ECO = (st) => {
    const r = J(st, 'noite' + (k - 1)).resultado || 'nada', f = fraseDe(st, k - 1);
    if (r === 'cheia') return k === 2 ? T('Na fila do pão, uma moça diz para outra: «' + f + '» Ontem à noite, só uma pessoa tinha dito isso. Dita pela cidade, parece ideia da cidade.',
      'In the bread line, one girl says to another: «' + en(f) + '» Last night only one person had said it. Said by the city, it sounds like the city’s idea.')
      : T('Na fonte da praça, uma criada diz para outra: «' + f + '» Ontem à noite, só uma pessoa tinha dito isso. Agora é a cidade que diz.',
        'At the square’s fountain, one maid says to another: «' + en(f) + '» Last night only one person had said it. Now it is the city saying it.');
    if (r === 'meia') return T('Na boca de um guarda, ouço metade da frase de ontem: «' + metade(f) + '» A outra metade ficou com quem eu não terminei.',
      'In a guard’s mouth I hear half of last night’s sentence: «' + metade(en(f)) + '» The other half stayed with the one I didn’t finish.');
    return k === 2 ? T('Na fila do pão ninguém repete nada da noite passada. A cidade amanhece igual, e eu tenho uma noite a menos.', 'In the bread line no one repeats anything from last night. The city wakes the same, and I have one night fewer.')
      : T('Da noite de ontem, a cidade não guardou nada. Sobra esta noite, e é a última.', 'Of last night, the city kept nothing. This night is what’s left, and it is the last.');
  };
  // antes de escolher o alvo: o objetivo, e quantas frases já andam sozinhas
  const RUMO = (st) => {
    if (k === 1) return T('Quero que o conselho escolha os melhores e ache que escolheu sozinho.', 'I want the council to choose the best and believe it chose alone.');
    const n = [1, 2].filter((x) => x < k && J(st, 'noite' + x).resultado === 'cheia').length;
    return n === 2 ? T('Duas frases minhas já andam pela cidade sem mim. Falta a última boca.', 'Two of my sentences already walk the city without me. One last mouth.')
      : n === 1 ? T('Uma frase minha já anda pela cidade sem mim. Preciso de outra.', 'One of my sentences already walks the city without me. I need another.')
        : k === 3 ? T('Nenhuma frase minha pegou na cidade. O conselho vai decidir com o que tiver na mesa.', 'None of my sentences took hold in the city. The council will decide with whatever is on the table.')
          : T('Nenhuma frase minha anda pela cidade ainda. O conselho não espera.', 'None of my sentences walks the city yet. The council won’t wait.');
  };
  const NT = {
    1: T('A primeira noite. A Capital Branca apaga as velas cedo e acende as tochas das rondas. Desço pela laje.', 'The first night. The White Capital puts out its candles early and lights the watch torches. I go down through the flagstone.'),
    2: T('A segunda noite. Chove fino, e a chuva lava a cal das ruas e o barulho dos meus passos.', 'The second night. A fine rain falls, washing the lime off the streets and the sound of my steps.'),
    3: T('A última noite. Amanhã de manhã o conselho decide o que já está decidido.', 'The last night. Tomorrow morning the council decides what is already decided.'),
  };
  const alvo = (st) => window.LIVRO.alvoNoite(st, k);
  const usado = (st, id) => [1, 2, 3].some((n) => n < k && st.escolhas['alvo' + n] === id);
  const MASC = { markus: ['cavalarico', 'escudeiro', 'guarda'], justine: ['novica', 'dama', 'criadaC'], joseph: ['vinho', 'viuva', 'moco'], varr: ['horne', 'maud', 'guarda'], ansel: ['bertha', 'aldo', 'moco'], mapas: ['edric', 'criadaC', 'guarda'] };
  const PASSAGEM = ['guarda', 'criadaC', 'moco'];
  // cada rosto traz a pista do jeito certo de pegar a roupa
  const ROT = {
    cavalarico: T('O rosto do Tam, cavalariço. Dorme no feno da baia do cavalo cinzento, e nem trovão o acorda. O marechal desce para ver o cavalo toda madrugada.', 'The face of Tam, the groom. He sleeps in the hay of the grey horse’s stall, and not even thunder wakes him. The marshal comes down to see the horse every morning before dawn.'),
    escudeiro: T('O rosto do Corin, o escudeiro mais velho do alojamento, já passado da idade de ser armado. Dorme com mais onze na mesma sala, e sempre tem um acordado. Faria tudo para ser notado.', 'The face of Corin, the oldest squire in the barracks, already past the age to be knighted. He sleeps with eleven others in one room, and one is always awake. He would do anything to be noticed.'),
    novica: T('O rosto da irmã Ada, a noviça. Dorme sozinha na sacristia, com o sono pesado de quem reza muito, e de manhã confessa tudo ao padre.', 'The face of Sister Ada, the novice. She sleeps alone in the sacristy, the heavy sleep of someone who prays a lot, and in the morning she confesses everything to the priest.'),
    dama: T('O rosto de Lady Elsbeth, dama de companhia da Guardiã. Tem vinte vestidos contados por uma criada e quer muito ser vista perto de quem importa. Moça de lanterna não passa da porta dela.', 'The face of Lady Elsbeth, the Keeper’s lady-in-waiting. She has twenty gowns counted by a maid and badly wants to be seen near people who matter. A lantern girl doesn’t get past her door.'),
    vinho: T('O rosto do Pip, o moço que serve vinho ao Sir Joseph pela esquerda. Dorme bêbado na adega.', 'The face of Pip, the young man who pours Sir Joseph’s wine from the left. He sleeps drunk in the cellar.'),
    viuva: T('O rosto da Hilde, a viúva da duna vazia. Mora sozinha, não recebe visita, e desde a notícia acorda com qualquer rangido.', 'The face of Hilde, the widow of the empty dune. She lives alone, has no visitors, and since the news she wakes at any creak.'),
    horne: T('O rosto do sargento Horne, viúvo. Bebe sozinho depois do turno, dorme de farda e conhece todas as ordens do quartel.', 'The face of Sergeant Horne, a widower. He drinks alone after his watch, sleeps in his uniform, and knows every order in the barracks.'),
    maud: T('O rosto da Maud, a irmã do Lorde Varr. Dorme no andar de cima, o guarda-roupa fica embaixo, e ela repara em tudo e em todos.', 'The face of Maud, Lord Varr’s sister. She sleeps upstairs, the wardrobe is downstairs, and she notices everything and everyone.'),
    bertha: T('O rosto da Bertha, a mãe do sentinela morto. Deixa a porta aberta para quem vier falar do filho, e gosta de quem fica para ouvir.', 'The face of Bertha, the dead sentry’s mother. She leaves her door open to anyone who comes to talk about her son, and loves whoever stays to listen.'),
    aldo: T('O rosto do mestre Aldo, o curandeiro. Dorme na enfermaria, entre doentes que morrem toda noite, e conversa com todos, até com os que morrem.', 'The face of Master Aldo, the healer. He sleeps in the infirmary, among patients who die every night, and talks with all of them, even the dying.'),
    edric: T('O rosto do Edric, o escrivão do conselho. Dorme pesado em cima da loja de tinta, guarda a chave da Sala dos Mapas e conta a todo mundo tudo o que acontece com ele.', 'The face of Edric, the council clerk. He sleeps heavily above the ink shop, keeps the Map Room key, and tells everyone everything that happens to him.'),
    guarda: T('O rosto de um guarda da Cidadela que vi de passagem. Novo no posto, sozinho no turno da noite, e ainda obedece a qualquer ordem.', 'The face of a Citadel guard I saw in passing. New to the post, alone on the night watch, and still obeys any order.'),
    criadaC: T('O rosto de uma criada do palácio que vi de passagem. Dormem dez num quarto e penduram a roupa no mesmo varal.', 'The face of a palace maid I saw in passing. They sleep ten to a room and hang their clothes on the same line.'),
    moco: T('O rosto de um moço de recados que vi de passagem. Dormem num monte embaixo da escada e fazem qualquer coisa por uma moeda.', 'The face of an errand boy I saw in passing. They sleep in a heap under the stairs and will do anything for a coin.'),
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
      T('Dei a eles a ordem que eles queriam ouvir.', 'I gave them the order they wanted to hear.'),
    ];
  };
  // a volta antes do sol (a primeira noite volta pela rua das lavanderias)
  const VOLTA = {
    2: T('Volto pelo bueiro com a chuva. Quando o guarda abre a porta, estou na cama, e só o travesseiro está molhado.', 'I come back through the drain with the rain. When the guard opens the door, I am in bed, and only the pillow is wet.'),
  };
  // a roupa: o jeito do dono × o rosto com que ela saiu (Bento ou Lume)
  const saida = (st) => st.escolhas['saida' + k] || 'bento';
  const metodo = (st, m) => { const M = METODO[window.LIVRO.mascNoite(st, k)] || METODO.criadaC; return m === 'matar' ? M.matar : m === 'roubar' ? M.roubar[saida(st)] : M.perto[saida(st)]; };
  const VESTE = (st) => ({ t: T('Visto a roupa. Penso em {MASC} até a pele obedecer.', 'I put on the clothes. I think of {MASC} until my skin obeys.'), veste: window.LIVRO.mascNoite(st, k) });
  const TRAJE = (m, extra) => Object.assign({ id: m, gesto: true, preco: m,
    erro: (st) => metodo(st, m)[0] === 'errado', alarme: (st) => ({ errado: 2, meio: 1 }[metodo(st, m)[0]] || 0),
    resultado: (st) => [metodo(st, m)[1], VESTE(st)] }, extra);
  const pgs = [
    { id: 'n' + k + 'd', noite: k, zona: 'capital', agua: 0, sal: .3 + k * .08, veste: 'ela',
      fundo: { img: IMG('n-dia' + k), dim: .45, clima: 'poeiraCal', foco: '55% 45%' },
      texto: (st) => [DIA[k], ...(k > 1 ? [ECO(st)] : []), ...(k === 3 && (st.f.erros || 0) > 0 ? [T('Na porta da Cidadela dobraram a guarda. Alguém deu falta de uma roupa, ou de uma pessoa, e agora olham duas vezes para cada rosto.', 'At the Citadel gate they have doubled the guard. Someone missed a set of clothes, or a person, and now they look twice at every face.')] : [])],
      minijogo: 'escuta', jogoId: 'dia' + k, mgNome: T('Ouvir um, guardar o rosto', 'Hear one, keep the face'),
      depois: [T('Guardo o rosto. De noite, ele serve.', 'I keep the face. By night it will be of use.')] },
    k < 3 ? { id: 'n' + k + 'a', noite: k, zona: 'noite', agua: 0, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .5, clima: k === 2 ? 'chuva' : null, foco: '55% 40%' },
      texto: (st) => [NT[k], RUMO(st)],
      escolha: { id: 'alvo' + k, pergunta: T('Atrás de quem eu vou?', 'Whom do I go after?'), opcoes: [
        { id: 'circulo', se: (st) => !usado(st, 'circulo'), txt: (st) => (circulo(st) === 'justine' ? T('Justine, na capela da Juíza.', 'Justine, in the Judge’s chapel.') : T('Markus, na sala de armas.', 'Markus, in the armory.')), resultado: (st) => [circulo(st) === 'justine' ? T('A mulher que escreve antes de a Laura falar.', 'The woman who writes before Laura speaks.') : T('O homem que não olha para outra coisa que não seja ela.', 'The man who looks at nothing but her.')] },
        { id: 'joseph', se: (st) => !usado(st, 'joseph'), txt: T('Sir Joseph, na taverna dos oficiais velhos.', 'Sir Joseph, in the old officers’ tavern.'), resultado: [T('Um velho oficial que perdeu para ela no Torneio, vinte anos atrás, e até hoje acha que devia ter ganhado.', 'An old officer who lost to her in the Tournament, twenty years ago, and still thinks he should have won.')] },
        { id: 'varr', se: (st) => !usado(st, 'varr'), txt: T('Lorde Varr, no refeitório da infantaria.', 'Lord Varr, in the infantry mess.'), resultado: [T('O homem que vai com dois mil, se deixarem.', 'The man who goes with two thousand, if they let him.')] },
        { id: 'ansel', se: (st) => !usado(st, 'ansel'), txt: T('O sentinela que voltou das Goelas, na enfermaria.', 'The sentry who came back from the Gullets, in the infirmary.'), resultado: [T('Tudo o que ele diz é verdade. Melhor ainda.', 'Everything he says is true. Better still.')] },
      ] } }
      : { id: 'n3a', noite: 3, zona: 'noite', agua: 0, sal: .56, aoEntrar: (st) => { st.escolhas.alvo3 = 'mapas'; }, fundo: { img: IMG('n-noite3'), dim: .5, foco: '55% 40%' },
        texto: (st) => [NT[3], RUMO(st), T('Esta noite não tem boca para trabalhar. Tem papel, na Sala dos Mapas.', 'Tonight there is no mouth to work. There is paper, in the Map Room.')] },
    { id: 'n' + k + 'm', noite: k, zona: 'noite', agua: 0, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .58, clima: k === 2 ? 'chuva' : null },
      texto: (st) => [alvo(st) === 'mapas' ? T('A Sala dos Mapas fica no alto da Cidadela. A guarda deixa entrar quem tem a chave e um rosto que ela conhece.', 'The Map Room is high in the Citadel. The guard lets in whoever has the key and a face it knows.') : window.LIVRO.anzol[alvo(st)].lugar],
      escolha: { id: 'masc' + k, pergunta: T('Quem eu vou ser lá dentro?', 'Who will I be in there?'), opcoes: Object.keys(ROT).map((id) => ({
        id, gesto: true, se: (st) => (MASC[alvo(st)] || []).includes(id) && (PASSAGEM.includes(id) || tem(st, id)), txt: ROT[id],
        aoEscolher: (st) => { if (PASSAGEM.includes(id) && !tem(st, id)) st.colecao.push(id); },
        resultado: [T('O rosto de {MASC} eu guardei de dia. Falta a roupa.', 'I kept {MASC}’s face by day. The clothes are still missing.')] })) } },
    { id: 'n' + k + 's', noite: k, zona: 'noite', agua: 0, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .6, clima: k === 2 ? 'chuva' : null },
      texto: [T('Para chegar perto de {MASC}, subo por um bueiro com outra cara.', 'To get close to {MASC}, I come up through a drain in another face.')],
      escolha: { id: 'saida' + k, pergunta: T('Com que rosto eu saio?', 'Which face do I go out in?'), opcoes: [
        { id: 'bento', gesto: true, txt: T('O do Bento, o menino aguadeiro. Entra em qualquer casa com a água e sai sem que lembrem dele. Serve para levar e para mentir.', 'Bento’s, the water boy. He goes into any house with the water and leaves without being remembered. Good for taking, and for lying.'),
          resultado: [{ t: T('Penso no Bento até a pele obedecer. Fico pequena, de joelho ralado, com um balde da fonte.', 'I think of Bento until my skin obeys. I turn small, with a scraped knee and a bucket from the fountain.'), veste: 'bento' }] },
        { id: 'lume', gesto: true, txt: T('O da Lume, da Casa das Lanternas. Quase todo mundo diz sim a ela, e todo mundo lembra. Serve para chegar perto.', 'Lume’s, from the House of Lanterns. Almost everyone says yes to her, and everyone remembers. Good for getting close.'),
          resultado: [{ t: T('Penso na Lume até a pele obedecer. A boca e os seios ficam mais cheios, e o cabelo cheira a água de rosas barata.', 'I think of Lume until my skin obeys. My mouth and breasts grow fuller, and my hair smells of cheap rosewater.'), veste: 'lume' }] },
      ] } },
    { id: 'n' + k + 'r', noite: k, zona: 'noite', agua: 0, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .62, clima: k === 2 ? 'chuva' : null },
      texto: (st) => [saida(st) === 'lume' ? T('Com a cara da Lume, chego perto de {MASC}.', 'In Lume’s face, I get close to {MASC}.') : T('Com a cara do Bento e o balde na mão, chego perto de {MASC}.', 'In Bento’s face, bucket in hand, I get close to {MASC}.')],
      escolha: { id: 'traje' + k, pergunta: T('A roupa de {MASC}', '{MASC}’s clothes'), opcoes: [
        TRAJE('roubar', { tom: 'manipular', txt: T('Levar a roupa enquanto {MASC} dorme.', 'Take the clothes while {MASC} sleeps.') }),
        TRAJE('seduzir', { tom: 'seduzir', testemunha: 1, se: (st) => saida(st) === 'lume' && window.LIVRO.mascNoite(st, k) !== 'moco', txt: T('Chegar perto, como a Lume, e deixar que {MASC} me dê a roupa.', 'Get close, as Lume, and let {MASC} give me the clothes.') }),
        TRAJE('moeda', { tom: 'manipular', se: (st) => saida(st) === 'lume' && window.LIVRO.mascNoite(st, k) === 'moco', txt: T('Mostrar uma moeda ao moço e pedir a roupa.', 'Show the boy a coin and ask for the clothes.') }),
        TRAJE('enganar', { tom: 'manipular', se: (st) => saida(st) === 'bento', txt: T('Bater na porta com um recado inventado e pedir a roupa.', 'Knock with a made-up message and ask for the clothes.') }),
        TRAJE('matar', { tom: 'intimidar', corpos: 1, txt: T('Matar {MASC} e sair com a roupa.', 'Kill {MASC} and leave with the clothes.') }),
      ] } },
  ];
  if (k === 1) pgs.push({ id: 'n1p', noite: 1, zona: 'noite', agua: 0, sal: .4, fundo: { img: IMG('n-tocha'), dim: .45, foco: '55% 45%' },
    texto: [
      T('No caminho, um guarda da ronda levanta a tocha para ver quem passa.', 'On the way, a watchman raises his torch to see who is passing.'),
      T('A chama chega perto demais do meu rosto, e o calor me pega de surpresa.', 'The flame comes too close to my face, and the heat catches me by surprise.'),
    ],
    piscar: { id: 'p3', antes: 2, erro: true, aoFalhar: (st) => { st.alarme += 1; },
      ok: [T('Baixo os olhos contra a luz, e a luz passa. Ele baixa a tocha e segue.', 'I lower my eyes against the light, and the light moves on. He lowers the torch and walks on.')],
      falha: [T('Demoro. A tocha para no ar. — O seu rosto… — ele começa, e eu já estou na outra esquina.', 'I’m too slow. The torch stops in the air. — Your face… — he begins, and I am already around the corner.')] } });
  pgs.push(
    { id: 'n' + k + 'j', noite: k, se: (st) => alvo(st) !== 'mapas', zona: 'dentro', agua: 0, sal: .36 + k * .08, fundo: (st) => ({ img: window.LIVRO.anzol[alvo(st)].img, dim: .48, lado: 'dir', foco: '35% 40%' }),
      texto: [T('Entro. O rosto passa.', 'I go in. The face gets through.')],
      minijogo: 'anzol', jogoId: 'noite' + k, mgNome: (st) => NOMES_ALVO[alvo(st)],
      aoTerminar: (st, r, ctx) => { ctx.guarda(alvo(st)); },
      depois: (st) => [...window.LIVRO.anzol[alvo(st)].fim[J(st, 'noite' + k).resultado || 'nada'], ...(VOLTA[k] ? [VOLTA[k]] : [])] },
    { id: 'n' + k + 'o', noite: k, se: (st) => alvo(st) === 'mapas', zona: 'dentro', agua: 0, sal: .36 + k * .08, fundo: { img: IMG('n-mapas'), dim: .45, foco: '55% 45%' },
      texto: [T('Os relatórios do conselho estão numa pasta de couro em cima da mesa grande, cinco papéis com selo. Edric lê todos em voz alta de manhã, na ordem em que estiverem na pasta.', 'The council’s reports lie in a leather folder on the great table, five sealed papers. Edric reads them all aloud in the morning, in the order they lie in the folder.')],
      minijogo: 'ordem', jogoId: 'noite' + k, mgNome: T('Os papéis do conselho', 'The council’s papers'),
      depois: ordemFim });
  return pgs;
}

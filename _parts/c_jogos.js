
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
        cheia: [T('Ele bate a taça na mesa.', 'He slams the cup on the table.'), { t: T('«Pouco, e ele escapa outra vez.', '«Too few, and he slips away again.') }, T('— Vou dizer isso a ela amanhã, na cara. Uma vez na vida ela vai ter que ouvir um velho.', '— I’ll tell her tomorrow, to her face. Once in her life she’ll have to listen to an old man.')],
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
        { id: 'conte', txt: T('Quantos dos seus voltaram daquele canal, Lâmina? Conte. Depois me pergunte de novo.', 'How many of yours came back from that channel, Blade? Count. Then ask me again.'), ouro: 2, verm: 1, resp: [T('Atrás dela, a pena para no papel.', 'Behind her, the quill stops on the page.'), T('— Sei quantos não voltaram — diz ela. — Contei um por um. Agora responda.', '— I know how many didn’t come back — she says. — I counted them one by one. Now answer.'), T('— Eu respondi.', '— I did.')] },
        { id: 'morde', txt: T('Para Redom saber que o mar sempre vai ser perigoso.', 'So Redom would know the sea will always be dangerous.'), ouro: 1, verm: 1, resp: [T('— O mar. Não você.', '— The sea. Not you.')] },
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
      2: { cedo: T('A mesa fica quieta. Alguém olha para a cadeira vazia da Lâmina.', 'The table goes quiet. Someone looks at the Blade’s empty chair.'), tarde: T('— O comandante… — e ninguém termina.', '— The commander… — and no one finishes.') },
      3: { cedo: T('— Vivo? O grande? E deixou o menino voltar?', '— Alive? The big one? And he let the boy come back?'), tarde: T('— Um sentinela assustado. Viu o que quis ver.', '— A frightened sentry. He saw what he wanted to see.') },
      4: { cedo: T('— Os poços são nossos. Ganhamos.', '— The wells are ours. We won.'), tarde: T('— Pelo menos os poços.', '— At least the wells.') },
      5: { cedo: T('— Para o norte. Estão indo embora. Melhor assim.', '— North. They’re leaving. All the better.'), tarde: T('— Para o norte. Fugindo. Vivo e fugindo.', '— North. Running. Alive and running.') },
    },
    dica: T('O que eles ouvem por último é o que levam para o almoço.', 'Whatever they hear last is what they take to lunch.'),
    ensaio: T('Leio os papéis na cabeça, na voz do Edric, e escuto a mesa.', 'I read the papers in my head, in Edric’s voice, and listen to the table.'),
  },

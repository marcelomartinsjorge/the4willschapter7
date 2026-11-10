
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


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

    { id: 'a02', zona: 'cais', agua: 0, fundo: { img: IMG('a02-escada'), dim: .45, foco: '62% 45%' },
      texto: [
        T('A cidade em cima da água é feita de navios. Dezenas deles, amarrados casco com casco, com pontes de corda de um convés a outro e lanternas penduradas nos mastros. Cheira a alcatrão, a peixe e a gente acordada cedo.', 'The city on top of the water is made of ships. Dozens of them, lashed hull to hull, with rope bridges from deck to deck and lanterns hung from the masts. It smells of tar, of fish, and of people up early.'),
        V('D02', T('Na escada do cais, uma mulher derruba o cesto e se ajoelha em cima dos peixes. Gagueja um título que eu nunca ouvi. Estendo a mão. Ela beija meus dedos. Deixo que termine.', 'On the dock stairs a woman drops her basket and kneels on the fish. She stammers a title I have never heard. I hold out my hand. She kisses my fingers. I let her finish.')),
        T('Outros param. Olham para as tábuas. Um velho começa a mesma frase três vezes e não termina nenhuma.', 'Others stop. They look at the planks. An old man starts the same sentence three times and finishes none of them.'),
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
        G('velha', T('— Da casa da minha avó só sobrei eu, Madrinha — diz a velha, mais baixo, só para mim. — Os outros a Sentença levou. Desde que a Lâmina subiu, cada ano é pior que o outro. O mar está ficando vermelho, Madrinha. Vermelho das bandeirolas de Redom.', '— Of my grandmother’s house there’s only me left, Godmother — the old woman says, lower, just for me. — The rest the Sentence took. Since the Blade rose, every year is worse than the last. The sea is turning red, Godmother. Red with Redom’s pennants.')),
      ] },

    { id: 'a04', zona: 'cabine', agua: 0, fundo: { img: IMG('a04-cabine'), dim: .5, foco: '60% 45%' },
      texto: [
        T('De noite me levam ao maior dos navios, o que fica no meio da cidade e não sai mais do lugar. Três pessoas me esperam na cabine. Cada uma acha que é mais importante que as outras duas.', 'At night they take me to the largest ship, the one in the middle of the city that no longer goes anywhere. Three people are waiting in the cabin. Each thinks they matter more than the other two.'),
        G('sarnai', T('Sarnai é das Viúvas do Sal e tem a idade da velha da escada. Reza de olhos fechados antes de falar e só abre quando chega na parte do pedido.', 'Sarnai is of the Salt Widows, as old as the woman on the stairs. She prays with her eyes shut before she speaks, and opens them only when she reaches the part with the request.')),
        G('ossian', T('Ossian Três-Dedos é humano, dos Mastreiros, com um raio desenhado na pele do pescoço até a orelha. Ele se ajoelha depressa, para ser o primeiro a se levantar.', 'Ossian Three-Fingers is human, of the Mastmen, with lightning drawn on his skin from neck to ear. He kneels quickly, so as to be the first to stand.')),
        G('ruo', T('Ruo é do Recife, é novo e não se ajoelha. Fica de braços cruzados na porta, procurando alguma coisa nos meus olhos. Conheço esse olhar: desconfia de mim. Dou a ele o meu melhor sorriso.', 'Ruo is of the Reef, young, and does not kneel. He stands at the door with his arms crossed, searching my eyes for something. I know that look: he doesn’t trust me. I give him my best smile.')),
      ] },

    { id: 'a05', zona: 'cabine', agua: 0, fundo: { img: IMG('a04-cabine'), dim: .62 },
      texto: [
        T('— Redom tomou Alvena há quatro verões, Madrinha — diz Sarnai. — Fechou o porto para a Orla. Quem leva peixe para vender sai de lá sem o barco.', '— Redom took Alvena four summers ago, Godmother — says Sarnai. — Closed the port to the Shore. Whoever brings fish to sell comes back without the boat.'),
        T('— Para eles, todo barco da Orla é pirata e todo Nymae é feiticeiro — diz Ossian. — Os homens, eles enforcam no molhe de Alvena. Os que eles acham que conjuram, levam vivos para a Capital, para a Lâmina ver com os olhos dela.', '— To them, every boat of the Shore is a pirate and every Nymae a sorcerer — says Ossian. — The men they hang on the mole at Alvena. The ones they think can conjure, they take alive to the Capital, for the Blade to see with her own eyes.'),
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
        T('Nem todos trazem moeda. Uma tecelã traz um vestido e uma capa, os dois tingidos de roxo, e me veste ali mesmo, na prancha. Um velho deixa no degrau uma faca de escamar, fina como folha, e não pede nada. A faca vai para a manga.', 'Not all of them bring coins. A weaver brings a dress and a cloak, both dyed purple, and dresses me right there on the gangplank. An old man leaves a scaling knife on the step, thin as a leaf, and asks for nothing. The knife goes into my sleeve.'),
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
        T('— É a Lâmina — diz ele, sem tocar. — A General-Rainha. Laura D’Orrose. Mandou fazer essa moeda no ano em que tomou Alvena.', '— That’s the Blade — he says, without touching it. — The General-Queen. Laura D’Orrose. She had that coin struck the year she took Alvena.'),
        T('Na porta, sem que eu pergunte, ele conta o que acha que vai me servir.', 'At the door, without my asking, he tells me what he thinks will be of use.'),
        T('— Em Alvena, quem sabe das coisas é a casa da Ondina. Taverna embaixo, camas em cima. Os soldados de Redom bebem lá de graça e pagam com a língua.', '— In Alvena, the one who knows things is Ondina’s house. Tavern downstairs, beds upstairs. Redom’s soldiers drink there for free and pay with their tongues.'),
        T('Ele espera alguma coisa em troca. Digo o nome dele, Ossian, devagar, e mais nada. Ele sai como quem foi pago.', 'He waits for something in return. I say his name, Ossian, slowly, and nothing more. He leaves like a man who has been paid.'),
      ] },

    { id: 'a06c', zona: 'cabine', agua: 0, fundo: { img: IMG('a06b-plano'), dim: .62, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('Sozinha, viro a moeda na mesa com a ponta do dedo. Laura. General-Rainha. A Lâmina, que manda trazer os conjuradores vivos, para ver de perto.', 'Alone, I turn the coin on the table with a fingertip. Laura. General-Queen. The Blade, who has conjurers brought to her alive, to see them up close.'),
        T('Ela não vem à Orla. Vai ter de mandar me buscar.', 'She doesn’t come to the Shore. She’ll have to send for me.'),
        V('D20', T('Para quem é da Orla, Redom só abre uma porta, e quem abre é o carcereiro. Preciso que a Sentença me pegue. Viva.', 'For anyone from the Shore, Redom opens only one door, and the one who opens it is the jailer. I need the Sentence to catch me. Alive.')),
      ] },

    { id: 'a07', zona: 'cais', agua: 0, fundo: { img: IMG('a07-taverna'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Antes da Sentença, Alvena. Fica a meio dia de vela, na costa, e é de Redom há quatro verões. No molhe de lá, Redom enforca Nymae. Para entrar, preciso de um rosto humano e da roupa que vem com ele.', 'Before the Sentence, Alvena. It lies half a day’s sail away, on the coast, and has been Redom’s for four summers. On its mole, Redom hangs Nymae. To get in, I need a human face and the clothes that come with it.'),
        T('Digo isso uma vez na taverna do cais, sem levantar a voz. Antes de eu terminar, três mulheres humanas da Orla estão de pé, oferecendo o rosto e a roupa. Fico com a que ri mais alto.', 'I say it once in the dockside tavern, without raising my voice. Before I finish, three human women of the Shore are on their feet, offering their face and their clothes. I take the one who laughs loudest.'),
        T('Iska vende peixe em Alvena toda semana, e os soldados de lá conhecem a cara dela. Ela sobe na mesa para mostrar o braço, feliz de ser a escolhida: uma cicatriz em zigue-zague do pulso ao cotovelo. — Raio! No meio do mar, com a âncora na mão. Fiquei três dias sem ouvir nada.', 'Iska sells fish in Alvena every week, and the soldiers there know her face. She climbs on the table to show her arm, glad to be the chosen one: a zigzag scar from wrist to elbow. — Lightning! In the middle of the sea, with the anchor in my hand. I couldn’t hear a thing for three days.'),
        G('iska', T('Os outros já ouviram a história e riem igual. Eu olho a cicatriz. Raio não deixa beira reta. Aquilo foi faca, de baixo para cima, de alguém que estava perto o bastante para ela não ver.', 'The others have heard the story before and laugh the same. I look at the scar. Lightning doesn’t leave a straight edge. That was a knife, from below, from someone close enough that she didn’t see it coming.')),
        T('Em Alvena, alguém pode perguntar da cicatriz. A Iska que eu vou ser tem de saber a verdade.', 'In Alvena, someone may ask about the scar. The Iska I am going to be has to know the truth.'),
      ],
      escolha: { id: 'iskaColo', pergunta: T('A Iska', 'Iska'), opcoes: [
        { id: 'colo', gesto: true, tom: 'seduzir', flag: 'iskaDente', txt: T('Levar a Iska para um canto, sentar no colo dela e perguntar, na orelha, quem fez a cicatriz.', 'Take Iska to a corner, sit in her lap, and ask, in her ear, who made the scar.'),
          resultado: [T('Ela para de rir. Depois ri mais baixo, só para mim, e conta: um soldado da guarnição, no molhe, por causa de um cesto de peixe que ela não quis dar.', 'She stops laughing. Then she laughs lower, only for me, and tells it: a soldier of the garrison, on the mole, over a basket of fish she wouldn’t hand over.'),
            T('— Ele ainda está lá — diz. — Tem um dente de ouro.', '— He’s still there — she says. — He has a gold tooth.'),
            T('De madrugada ela tira a roupa sem eu precisar pedir e deixa dobrada ao meu lado.', 'Before dawn she takes off her clothes without my having to ask, and leaves them folded beside me.')] },
      ] } },

    { id: 'a08', zona: 'cais', agua: 0, fundo: { video: VID('a08-metamorfose'), img: IMG('a08-metamorfose'), dim: .4, foco: '60% 40%' },
      texto: [
        T('A Iska senta diante de mim para eu olhar. Fecho os olhos e penso nela: a risada, o raio no braço, o peso todo numa perna só.', 'Iska sits before me so I can look. I close my eyes and think of her: the laugh, the lightning on her arm, all her weight on one leg.'),
        V('D06', T('A pele puxa. As escamas entram uma por uma, como dentes de pente. As orelhas se dobram e colam no crânio, e o mundo fica seco e alto. Minha boca muda de tamanho.', 'My skin pulls. The scales sink in one by one, like the teeth of a comb. My ears fold and press flat to my skull, and the world goes dry and loud. My mouth changes size.')),
        { t: T('Digo o nome dela em voz alta, para experimentar. A voz que sai é a dela, rouca de rir, na primeira tentativa.', 'I say her name aloud, to try it. The voice that comes out is hers, hoarse from laughing, on the first attempt.'), voz: 'D07', veste: 'iska' },
        T('Visto a camisa dela. Serve.', 'I put on her shirt. It fits.'),
        T('Duas Iskas no mesmo cais é uma Iska a mais.', 'Two Iskas on the same dock is one Iska too many.'),
      ],
      escolha: { id: 'roupa1', pergunta: T('E a Iska de verdade?', 'And the real Iska?'), opcoes: [
        { id: 'roubar', fala: true, tom: 'manipular', txt: T('Amanhã você não põe o pé em Alvena.', 'Tomorrow you don’t set foot in Alvena.'),
          resultado: [T('Ela não pergunta por quê. Faz que sim, rindo, e desce para o porão do navio com uma garrafa, para passar o dia lá embaixo.', 'She doesn’t ask why. She nods, laughing, and goes down into the ship’s hold with a bottle, to spend the day below.'),
            T('Vai contar essa noite pelo resto da vida.', 'She will tell of this night for the rest of her life.')] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'intimidar', corpos: 1, txt: T('Levar a Iska até a ponte de corda, e garantir que só exista uma.', 'Walk Iska to the rope bridge, and make sure there is only one.'),
          resultado: [T('Ela vai comigo, contando a história do raio outra vez. A lâmina sai da minha manga e volta. A ponte balança um pouco e para. A água embaixo da cidade aceita o que eu dou a ela.', 'She comes with me, telling the lightning story again. The blade leaves my sleeve and comes back. The bridge sways a little and stops. The water under the city takes what I give it.'),
            T('Amanhã, em Alvena, só existe uma Iska.', 'Tomorrow, in Alvena, there is only one Iska.')] },
      ] } },

    { id: 'a09', zona: 'alvena', agua: 0, veste: 'iska', fundo: { img: IMG('a09-alvena'), dim: .45, foco: '60% 40%' },
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

    { id: 'a10', zona: 'alvena', agua: 0, veste: 'iska', fundo: { img: IMG('a10-soldado'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Na saída do mercado, um soldado de Redom agarra o meu braço. Está bêbado e acha que me conhece.', 'At the market gate a Redom soldier grabs my arm. He is drunk and thinks he knows me.'),
        T('— Ô, marinheira. Você me deve um beijo desde o verão.', '— Hey, sailor girl. You’ve owed me a kiss since summer.'),
        se((st) => !!st.f.iskaDente, T('Ele ri, e na boca dele brilha um dente de ouro.', 'He laughs, and a gold tooth flashes in his mouth.')),
        T('O aperto dele dói, e a dor sobe pelo braço. O rosto da Iska escorrega.', 'His grip hurts, and the pain runs up my arm. Iska’s face slips.'),
      ],
      piscar: { id: 'p1', antes: 3,
        ok: (st) => [T('Fecho os olhos. Quando abro, sou a Iska outra vez.', 'I close my eyes. When I open them I am Iska again.'),
          st.f.iskaDente ? T('Ponho a minha mão por cima da dele e desço as duas até a cicatriz, sem pressa, pelo caminho que a faca dele fez. Ele olha o zigue-zague, depois a marinheira. O riso acaba. Solta o meu braço sozinho e vai embora sem o beijo.', 'I lay my hand over his and bring both down to the scar, unhurried, along the road his knife once made. He looks at the zigzag, then at the sailor. The laugh stops. He lets go of my arm on his own and leaves without the kiss.')
            : T('Ele já está rindo de outra coisa. Solta o meu braço.', 'He is already laughing at something else. He lets go of my arm.')],
        falha: [T('Demoro. Um menino parado ao lado do soldado vê a escama subir pelo pescoço da marinheira e afundar de novo. Arregala os olhos, sorri para mim e sai correndo com o segredo.', 'I’m too slow. A boy standing by the soldier sees scales rise along the sailor’s neck and sink again. His eyes go wide, he smiles at me, and he runs off with the secret.')] } },

    // o respiro: a noite depois de Alvena. Nenhuma informação nova: o que ela ouviu vira plano, na boca dela
    { id: 'a11', zona: 'cais', agua: 0, veste: 'ela', fundo: { img: IMG('a11-cais-noite'), dim: .5, foco: '60% 45%' },
      texto: (st) => [
        T('De volta a Nove Mastros, devolvo o rosto da Iska. Passei o dia com a boca dela, que ri de tudo e mastiga aberta. Lavo a minha no mar até o gosto sair.', 'Back in Nine Masts, I give Iska her face back. I spent the day in her mouth, which laughs at everything and chews open. I rinse mine in the sea until the taste is gone.'),
        T('Sento na popa do navio com os pés na água e espero a água esquentar.', 'I sit on the ship’s stern with my feet in the water and wait for the water to warm.'),
        sabe(st, 'rota') ? T('Nove dias, no Canal das Garças. Sei onde esperar.', 'Nine days, in the Heron Channel. I know where to wait.')
          : T('O dia da galera eu não sei. Espero no mar o tempo que for.', 'The galley’s day I don’t know. I’ll wait at sea as long as it takes.'),
        sabe(st, 'perto') ? T('Ela pesca os afogados da Orla para vender. Chego boiando.', 'She fishes up the Shore’s drowned to sell. I’ll arrive floating.')
          : T('Como chegar perto dela sem levar seta, ainda não sei.', 'How to get close to her without taking a bolt, I still don’t know.'),
        sabe(st, 'vivos') ? T('Quem conjura vai vivo para a Lâmina. Vão me ver conjurar.', 'Whoever conjures goes to the Blade alive. They’ll see me conjure.')
          : T('O que Redom faz com quem pega vivo, descubro lá.', 'What Redom does with those it takes alive, I’ll find out there.'),
        T('Falta o barco, e quem vá nele.', 'What’s missing is the boat, and who goes in it.'),
      ] },

    { id: 'a11b', zona: 'cais', agua: 0, veste: 'ela', fundo: { img: IMG('a02b-cais'), dim: .55, foco: '55% 45%' },
      texto: [
        T('Em Nove Mastros, quando uma casa quer uma coisa grande do mar, dá ao mar o melhor que tem. Um barco sai com o melhor piloto, a melhor capitã, o melhor besteiro. Nem todos voltam, e ninguém chama isso de morrer. Chamam de ser dado ao mar.', 'In Nine Masts, when a house wants something great from the sea, it gives the sea the best it has. A boat goes out with the best pilot, the best captain, the best crossbowman. Not all of them come back, and no one calls that dying. They call it being given to the sea.'),
        T('Ruo pediu a Sentença. Na manhã seguinte, as casas trazem os seus melhores até os degraus onde eu subi e param no degrau de baixo do meu, por conta própria.', 'Ruo asked for the Sentence. The next morning the houses bring their best to the steps where I came up and stop on the step below mine, without anyone telling them to.'),
        T('Cinco. Nenhum pergunta quantos voltam. Esperam que eu olhe.', 'Five. None of them asks how many come back. They wait for me to look.'),
      ],
      minijogo: 'tripulacao', jogoId: 'tripulacao', mgNome: T('Escolher três', 'Choose three'),
      aoTerminar: (st, r, ctx) => { (r.escolhidos || []).forEach((k, i) => { st.avisos.push(AV[k]); setTimeout(() => ctx.toast(AV[k]), 300 + i * 1100); }); },
      depois: [T('Três. Os escolhidos se ajoelham no degrau de alegria, e as casas deles choram de orgulho. O barco tem quatro lugares, e o quarto é meu.', 'Three. The chosen kneel on the step for joy, and their houses weep with pride. The boat has four places, and the fourth is mine.')] },

    // a véspera do canal: uma noite só. Cada um recebe uma tarefa, e o jeito de dar a tarefa muda a lealdade (escondida).
    // A lealdade decide quem tenta virar o barco diante da Sentença, quem ajuda e quem pode ser salvo.
    { id: 'a12', zona: 'mar', agua: 0, fundo: { video: VID('b01-mar'), img: IMG('b01-mar'), dim: .55, foco: '55% 50%' },
      texto: [
        T('De Nove Mastros ao Canal das Garças são dois dias de vela. A tripulação fala baixo perto de mim e não dorme quando eu durmo.', 'From Nine Masts to the Heron Channel is two days under sail. The crew speaks low near me and doesn’t sleep when I sleep.'),
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
          resultado: [T('Ela afunda até os olhos e some. Volta antes do sol, sozinha, e fica embaixo do barco sem bater na quilha.', 'She sinks to her eyes and is gone. She comes back before sunrise, alone, and stays beneath the boat without knocking on the keel.')] },
      ] } },

    { id: 'a12b', se: (st) => noBarco(st, 'brann'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-brann'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Brann engraxa a besta no colo. Cada vez que alguém do barco diz Madrinha, ele cospe na água.', 'Brann greases the crossbow in his lap. Every time someone on the boat says Godmother, he spits into the water.'),
        T('— Em Alvena, Madrinha era qualquer Nymae que soubesse fazer truque barato com caneca d’água na porta da taverna — diz. — Quantos de nós voltam?', '— In Alvena, Godmother was any Nymae who could do a cheap trick with a cup of water at the tavern door — he says. — How many of us come back?'),
      ],
      escolha: { id: 'n_brann', opcoes: [
        { id: 'doce', gesto: true, tom: 'seduzir', aviso: AV.brann, flag: 'brannAtira', aoEscolher: ganha('brann', 1), txt: T('Sentar ao lado dele, perto, e dizer no ouvido dele quem volta.', 'Sit beside him, close, and tell him in his ear who comes back.'),
          resultado: [T('— Volta quem eu escolher — digo.', '— Whoever I choose comes back — I say.'),
            T('Ele engole em seco. — E quem a senhora escolhe?', 'He swallows. — And whom do you choose?'),
            T('— Quem derrubar o homem que dá as ordens na proa, antes da primeira ordem.', '— Whoever brings down the man giving orders at the bow, before the first order.'),
            T('Ele separa a seta mais reta da aljava e não larga mais.', 'He pulls the straightest bolt from his quiver and doesn’t let go of it again.')] },
        { id: 'fria', fala: true, tom: 'intimidar', aviso: AV.brann, flag: 'brannGuarda', txt: T('Um. Para contar como os outros morreram.', 'One. To tell how the others died.'),
          resultado: [T('Ele para de engraxar. Não sabia que era isso, e acredita na hora.', 'He stops greasing. He didn’t know that was what this was, and he believes it at once.'),
            T('Separa uma seta das outras. — Essa é para quem tentar virar o barco — diz, sem olhar para mim.', 'He sets one bolt apart from the others. — This one is for whoever tries to turn the boat — he says, without looking at me.')] },
        { id: 'divertida', gesto: true, tom: 'manipular', aviso: AV.brann, flag: 'brannAtira', aoEscolher: ganha('brann', 1), txt: T('Olhar para a caneca dele.', 'Look at his cup.'),
          resultado: [T('A água da caneca sobe e fica de pé em cima da borda, uma coluna fina e parada, sem cair. Brann olha muito tempo. Quando ela desce, ele bebe tudo de uma vez.', 'The water in the cup rises and stands upright above the rim, a thin, still column that doesn’t fall. Brann looks a long time. When it settles, he drinks it all at once.'),
            T('— Quem a senhora quer que eu derrube?', '— Who do you want me to bring down?'),
            T('— O homem que dá as ordens na proa.', '— The man giving orders at the bow.')] },
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
          : T('Não sei o dia da galera. Esperamos três noites no canal, com o barco parado no caminho dela. Na terceira, ninguém no barco dorme.', 'I don’t know the galley’s day. We wait three nights in the channel, the boat sitting in her path. On the third, no one on the boat sleeps.')),
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
        { id: 'matar', se: (st) => !!st.f.motim, gesto: true, tom: 'intimidar', corpos: 1, aviso: AV.trip, aoEscolher: (st) => { st.f.motimMorto = st.f.motim; }, txt: T('Deixar a lâmina sair da manga.', 'Let the blade slip from my sleeve.'),
          resultado: (st) => [st.f.motim === 'brann' ? T('A lâmina sai da manga e volta. Brann senta no fundo do barco com as duas mãos no pescoço, e a besta cai na água. Os outros não dizem mais nada até o fim.', 'The blade leaves my sleeve and comes back. Brann sits down in the bottom of the boat with both hands at his throat, and the crossbow falls into the water. The others don’t say another word until the end.') : T('A lâmina sai da manga e volta. {MOT} senta no fundo do barco com as duas mãos no pescoço, e eu tomo o leme. Os outros não dizem mais nada até o fim.', 'The blade leaves my sleeve and comes back. {MOT} sits down in the bottom of the boat with both hands at the throat, and I take the tiller. The others don’t say another word until the end.')] },
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
        { id: 'poupar', fala: true, tom: 'manipular', txt: T('Sou a dona da Orla. Levem a mim para a sua Lâmina e deixem o barco voltar.', 'I am the mistress of the Shore. Take me to your Blade and let the boat go home.'),
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
        T('Baixo as pálpebras. O barulho do convés vai ficando longe. Desço com a cabeça por baixo do barco, por baixo do canal, até a água pesada do fundo, parada há cem anos.', 'I lower my eyelids. The noise on deck goes far away. I go down with my mind beneath the boat, beneath the channel, to the heavy water at the bottom, still for a hundred years.'),
        T('Ela acorda borbulhando, como se a água sentisse raiva. Sobe pelas minhas pernas, fria por dentro dos ossos, e pesa nos meus dedos.', 'It wakes bubbling, as if the water felt rage. It climbs my legs, cold inside the bones, and weighs on my fingers.'),
        T('Ela quer subir toda. Se eu deixar, a Sentença vira tábua solta no canal, e não sobra quem me leve.', 'It wants to rise whole. If I let it, the Sentence becomes loose planks in the channel, and there is no one left to take me.'),
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
        { t: T('A onda é mais alta que os mastros deles. Pega a Sentença pelo costado e varre o convés da proa à popa.', 'The wave is taller than their masts. It takes the Sentence on her side and sweeps the deck from bow to stern.'), sfx: 'onda-cinematica', v: .95 },
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
        { id: 'decorar', gesto: true, tom: 'manipular', txt: T('Decorar o rosto.', 'Learn the face by heart.'), resultado: [T('Decoro. Os cílios, os dentes, a última palavra, que não chega a sair. Guardo junto com os outros.', 'I learn it by heart. The lashes, the teeth, the last word, which never makes it out. I keep it with the others.')] },
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
        T('Os soldados separam os corpos. Os da Orla vão num monte, para a balança de Alvena. Se eu continuar morta, vou com eles.', 'The soldiers sort the bodies. The Shore’s go in a heap, for the scales at Alvena. If I stay dead, I go with them.'),
        sabe(st, 'vivos') ? T('Quem conjura vai vivo para a Lâmina. Então mostro.', 'Whoever conjures goes to the Blade alive. So I show them.') : T('Não sei o que Redom faz com quem conjura. Vou descobrir agora.', 'I don’t know what Redom does with conjurers. I am about to find out.'),
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


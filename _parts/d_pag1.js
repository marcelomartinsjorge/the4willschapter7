
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
        T('Alguém me cobre com um pano. Uma menina passa óleo no meu cabelo com os dedos, de trás para a frente, tremendo. Inclino a cabeça para ela alcançar melhor.', 'Someone covers me with a cloth. A girl works oil into my hair with her fingers, back to front, trembling. I tilt my head so she can reach.'),
      ] },

    { id: 'a02b', zona: 'cais', agua: 0, fundo: { img: IMG('a02b-cais'), dim: .45, foco: '55% 45%' },
      texto: [
        T('Até o meio-dia, Nove Mastros inteira sabe. Os barcos que iam sair ficam amarrados. Os que já tinham saído aparecem no horizonte, voltando de vela cheia.', 'By noon, all of Nine Masts knows. The boats that were about to leave stay tied up. The ones already out show on the horizon, coming back under full sail.'),
        T('Uma mulher ergue um bebê acima das cabeças, para ele me ver de longe. Dois meninos mergulham no lugar onde eu subi e voltam de mãos vazias, procurando o que eu deixei lá embaixo.', 'A woman lifts a baby above the heads so it can see me from afar. Two boys dive where I came up and surface empty-handed, looking for whatever I left down there.'),
        T('Os olhos deles não aguentam os meus por muito tempo. Olham, abaixam, voltam, como se olha o sol na água.', 'Their eyes can’t hold mine for long. They look, drop, come back, the way you look at sun on water.'),
        T('Deixo que olhem. Por enquanto, é de graça.', 'I let them look. For now, it’s free.'),
      ] },

    { id: 'a03', zona: 'cais', agua: 0, fundo: { img: IMG('a03-velha'), dim: .45, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Uma velha de orelhas rasgadas abre caminho entre eles. Tem os olhos amarelos de todo mundo aqui. Olha para os meus e ri com uma boca quase sem dente.', 'An old woman with torn ears pushes through them. She has the yellow eyes everyone here has. She looks into mine and laughs with a mouth nearly out of teeth.'),
        T('— A Madrinha voltou. Minha avó viu a senhora.', '— The Godmother is back. My grandmother saw you.'),
        V('D03', T('— Então a sua avó viu bem.', '— Then your grandmother saw well.')),
        T('Ela faz o resto da conta sozinha, e termina chorando.', 'She does the rest of the sum on her own, and finishes in tears.'),
      ] },

    { id: 'a03b', zona: 'cais', agua: 0, fundo: { img: IMG('a03-velha'), dim: .6, lado: 'dir', foco: '35% 40%' },
      texto: [
        T('Enquanto os mais velhos não chegam, ela senta no degrau abaixo do meu e conta o que a avó contava. Conta alto, para os outros ouvirem que ela sabe.', 'While the elders are still coming, she sits on the step below mine and tells what her grandmother used to tell. She tells it loud, so the others hear that she knows.'),
        T('— A Madrinha ensinou o primeiro barco a mentir para o vento. Quem vai navegar, quem vai se aventurar, quem vai enganar alguém, pede a ela. Pede antes, que depois ela não escuta.', '— The Godmother taught the first boat to lie to the wind. Whoever goes sailing, whoever goes adventuring, whoever means to fool someone, asks her. Asks before, because after she doesn’t listen.'),
        T('— E paga. Moeda no mar, antes de soltar o cabo. Ela não cobra. Mas lembra de quem não pagou.', '— And pays. A coin into the sea before you cast off. She doesn’t charge. But she remembers who didn’t pay.'),
        { t: T('Olho para a minha saia. As moedas costuradas na barra batem umas nas outras quando eu mexo a perna. Prata gasta, ouro velho, cobre verde. Tanta gente me pediu coisas. Passo o dedo nelas e não lembro de nenhuma.', 'I look down at my skirt. The coins sewn into the hem knock together when I move my leg. Worn silver, old gold, green copper. So many people asked me for things. I run a finger over them and don’t remember one.'), moeda: true },
        G('velha', T('— Da casa da minha avó só sobrei eu, Madrinha — diz a velha, mais baixo, só para mim. — Os outros a Sentença levou.', '— Of my grandmother’s house there’s only me left, Godmother — the old woman says, lower, just for me. — The rest the Sentence took.')),
      ] },

    { id: 'a04', zona: 'cabine', agua: 0, fundo: { img: IMG('a04-cabine'), dim: .5, foco: '60% 45%' },
      texto: [
        T('De noite me levam ao maior dos navios, o que fica no meio da cidade e não sai mais do lugar. Três pessoas me esperam na cabine. Cada uma acha que chegou primeiro.', 'At night they take me to the largest ship, the one in the middle of the city that no longer goes anywhere. Three people are waiting in the cabin. Each thinks they arrived first.'),
        G('sarnai', T('Sarnai é das Viúvas do Sal e tem a idade da velha da escada. Reza de olhos fechados antes de falar e só abre quando chega na parte do pedido.', 'Sarnai is of the Salt Widows, as old as the woman on the stairs. She prays with her eyes shut before she speaks, and opens them only when she reaches the part with the request.')),
        G('ossian', T('Ossian Três-Dedos é humano, dos Mastreiros, com um raio desenhado na pele do pescoço até a orelha. Ele se ajoelha depressa, para ser o primeiro a se levantar.', 'Ossian Three-Fingers is human, of the Mastmen, with lightning drawn on his skin from neck to ear. He kneels quickly, so as to be the first to stand.')),
        G('ruo', T('Ruo é do Recife, é novo e não se ajoelha. Fica de braços cruzados na porta, procurando nos meus olhos a costura de uma máscara.', 'Ruo is of the Reef, young, and does not kneel. He stands at the door with his arms crossed, searching my eyes for the seam of a mask.')),
      ] },

    { id: 'a05', zona: 'cabine', agua: 0, fundo: { img: IMG('a04-cabine'), dim: .62 },
      texto: [
        T('— Redom tomou Alvena há quatro verões, Madrinha — diz Sarnai. — Fechou o porto para a Orla. Quem leva peixe para vender sai de lá sem o barco.', '— Redom took Alvena four summers ago, Godmother — says Sarnai. — Closed the port to the Shore. Whoever brings fish to sell comes back without the boat.'),
        T('— Para eles, todo barco da Orla é pirata e todo Nymae é feiticeiro — diz Ossian. — Os homens, eles enforcam no molhe de Alvena. Os que eles acham que conjuram, levam vivos para a Capital, para a Lâmina ver com os olhos dela.', '— To them, every boat of the Shore is a pirate and every Nymae a sorcerer — says Ossian. — The men they hang on the mole at Alvena. The ones they think can conjure, they take alive to the Capital, for the Blade to see with her own eyes.'),
        T('— A Sentença queimou a frota do meu irmão no Canal das Garças — diz Ruo. — Ele saiu de noite, por uma rota que só três casas da Orla conheciam, e a galera já estava lá, de lanternas apagadas, esperando. Alguém vendeu a rota para Redom. Se a senhora é quem dizem, afunda a Sentença.', '— The Sentence burned my brother’s fleet in the Heron Channel — says Ruo. — He went out by night, by a route only three houses of the Shore knew, and the galley was already there, lanterns dark, waiting. Someone sold the route to Redom. If you are who they say, sink the Sentence.'),
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

    { id: 'a05c', zona: 'cais', agua: 0, fundo: { img: IMG('a05c-oferendas'), dim: .45, foco: '55% 45%' },
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
        T('— Em Alvena, quem sabe das coisas é a casa da Ondina. Taverna embaixo, camas em cima. Os soldados de Redom bebem lá de graça e pagam com o que contam.', '— In Alvena, the one who knows things is Ondina’s house. Tavern downstairs, beds upstairs. Redom’s soldiers drink there for free and pay with what they tell.'),
        T('Ele espera alguma coisa em troca. Olho para ele até ele lembrar que a porta é para sair.', 'He waits for something in return. I look at him until he remembers the door is for leaving.'),
      ] },

    { id: 'a06c', zona: 'cabine', agua: 0, fundo: { img: IMG('a06b-plano'), dim: .62, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('Sozinha, viro a moeda na mesa com a ponta do dedo. Laura. General-Rainha. A Lâmina, que manda trazer os conjuradores vivos, para ver de perto.', 'Alone, I turn the coin on the table with a fingertip. Laura. General-Queen. The Blade, who has conjurers brought to her alive, to see them up close.'),
        T('Ela não vem à Orla. Vai ter de mandar me buscar.', 'She doesn’t come to the Shore. She’ll have to send for me.'),
        V('D20', T('Para quem é da Orla, Redom só abre uma porta, e quem abre é o carcereiro. Preciso que a Sentença me pegue. Viva.', 'For anyone from the Shore, Redom opens only one door, and the one who opens it is the jailer. I need the Sentence to catch me. Alive.')),
      ] },

    { id: 'a07', zona: 'cais', agua: 0, fundo: { img: IMG('a07-taverna'), dim: .45, lado: 'dir', foco: '35% 40%' },
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
          resultado: [T('Ela para de rir. Depois ri mais baixo, só para mim, e conta um nome que nunca contou na taverna. De madrugada me dá a camisa sem eu precisar pedir. Vai lembrar de uma mulher de olhos acesos demais por uns dias, e depois vai achar que sonhou.', 'She stops laughing. Then she laughs lower, only for me, and tells me a name she has never told in the tavern. Before dawn she gives me the shirt without my having to ask. She’ll remember a woman whose eyes were too bright for a few days, and then she’ll think she dreamed it.')] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'cruel', corpos: 1, txt: T('Esperar por ela sozinha na ponte de corda.', 'Wait for her alone on the rope bridge.'),
          resultado: [T('A lâmina sai da minha manga e volta. A ponte balança um pouco e para. A água embaixo da cidade aceita o que eu dou a ela.', 'The blade leaves my sleeve and comes back. The bridge sways a little and stops. The water under the city takes what I give it.')] },
      ] } },

    { id: 'a08', zona: 'cais', agua: 0, fundo: { video: VID('a08-metamorfose'), img: IMG('a08-metamorfose'), dim: .4, foco: '60% 40%' },
      texto: [
        T('Fecho os olhos e penso na Iska: a risada, o raio no braço, o peso todo numa perna só.', 'I close my eyes and think of Iska: the laugh, the lightning on her arm, all her weight on one leg.'),
        V('D06', T('A pele puxa. As escamas entram uma por uma, como dentes de pente. As orelhas se dobram e colam no crânio, e o mundo fica seco e alto. Minha boca muda de tamanho.', 'My skin pulls. The scales sink in one by one, like the teeth of a comb. My ears fold and press flat to my skull, and the world goes dry and loud. My mouth changes size.')),
        { t: T('Digo o nome dela em voz alta, para experimentar. A voz que sai é a dela, rouca de rir, na primeira tentativa.', 'I say her name aloud, to try it. The voice that comes out is hers, hoarse from laughing, on the first attempt.'), voz: 'D07', veste: 'iska' },
        T('Visto a camisa. Serve.', 'I put on the shirt. It fits.'),
      ] },

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
        T('O susto sobe pelo braço que ele aperta, e o rosto da Iska escorrega.', 'The start runs up the arm he is squeezing, and Iska’s face slips.'),
      ],
      piscar: { id: 'p1', antes: 3,
        ok: [T('Fecho os olhos. Quando abro, sou a Iska outra vez, e ele já está rindo de outra coisa. Solta o meu braço.', 'I close my eyes. When I open them I am Iska again, and he is already laughing at something else. He lets go of my arm.')],
        falha: [T('Demoro. Um menino parado ao lado do soldado vê o ouro nos olhos da marinheira. Arregala os olhos, sorri para mim e sai correndo com o segredo.', 'I’m too slow. A boy standing by the soldier sees the gold in the sailor’s eyes. His own go wide, he smiles at me, and he runs off with the secret.')] } },

    // o respiro: a noite depois de Alvena. Nenhuma informação nova: o que ela ouviu vira plano, na boca dela
    { id: 'a11', zona: 'cais', agua: 0, veste: 'ela', fundo: { img: IMG('a11-cais-noite'), dim: .5, foco: '60% 45%' },
      texto: (st) => [
        T('De volta a Nove Mastros, devolvo o rosto da Iska. Passei o dia com a boca dela, que ri de tudo e mastiga aberta. Lavo a minha no mar até o gosto sair.', 'Back in Nine Masts, I give Iska her face back. I spent the day in her mouth, which laughs at everything and chews open. I rinse mine in the sea until the taste is gone.'),
        T('Sento na popa do meu barco com os pés na água e espero a água esquentar.', 'I sit on the stern of my boat with my feet in the water and wait for the water to warm.'),
        sabe(st, 'rota') ? T('Nove dias, no Canal das Garças. Sei onde esperar.', 'Nine days, in the Heron Channel. I know where to wait.')
          : T('O dia da galera eu não sei. Espero no mar o tempo que for.', 'The galley’s day I don’t know. I’ll wait at sea as long as it takes.'),
        sabe(st, 'perto') ? T('Ela pesca os afogados da Orla para vender. Chego boiando.', 'She fishes up the Shore’s drowned to sell. I’ll arrive floating.')
          : T('Como chegar perto dela sem levar seta, ainda não sei.', 'How to get close to her without taking a bolt, I still don’t know.'),
        sabe(st, 'vivos') ? T('Quem conjura vai vivo para a Lâmina. Vão me ver conjurar.', 'Whoever conjures goes to the Blade alive. They’ll see me conjure.')
          : T('O que Redom faz com quem pega vivo, descubro lá.', 'What Redom does with those it takes alive, I’ll find out there.'),
        T('Falta gente para remar.', 'I need people to row.'),
      ] },

    { id: 'a11b', zona: 'cais', agua: 0, veste: 'ela', fundo: { img: IMG('a02b-cais'), dim: .55, foco: '55% 45%' },
      texto: [
        T('Digo no cais que vou a Redom num barco pequeno e que preciso de três pessoas. Metade do cais se oferece aos gritos. Passo dois dias olhando os que ficaram quietos.', 'I say on the dock that I am going to Redom in a small boat and need three people. Half the dock volunteers at the top of its lungs. I spend two days watching the ones who kept quiet.'),
        T('Cinco valem a pena. Cada um quer uma coisa que eu posso dar.', 'Five are worth it. Each of them wants something I can give.'),
      ],
      minijogo: 'tripulacao', jogoId: 'tripulacao', mgNome: T('Escolher três', 'Choose three'),
      aoTerminar: (st, r, ctx) => { (r.escolhidos || []).forEach((k, i) => { st.avisos.push(AV[k]); setTimeout(() => ctx.toast(AV[k]), 300 + i * 1100); }); },
      depois: [T('Três. O barco tem quatro lugares, e o quarto é meu.', 'Three. The boat has four places, and the fourth is mine.')] },

    // as noites no mar: uma conversa séria com cada um dos três. A resposta muda a lealdade (escondida),
    // e a lealdade decide quem tenta virar o barco diante da Sentença, quem ajuda e quem pode ser salvo
    { id: 'a12m', se: (st) => noBarco(st, 'maru'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-maru'), dim: .45, lado: 'dir', foco: '35% 45%' },
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
    { id: 'a12l', se: (st) => noBarco(st, 'lio'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-lio'), dim: .45, lado: 'dir', foco: '35% 45%' },
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
    { id: 'a12t', se: (st) => noBarco(st, 'teshka'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-teshka'), dim: .45, lado: 'dir', foco: '35% 45%' },
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
    { id: 'a12n', se: (st) => noBarco(st, 'nhale'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-nhale'), dim: .45, lado: 'dir', foco: '35% 55%' },
      texto: [
        T('Nhalé passa a noite embaixo do barco. De vez em quando bate na quilha, três batidas, para dizer que está ali.', 'Nhalé spends the night under the boat. Every so often she knocks on the keel, three knocks, to say she is there.'),
        G('nhale', T('Sobe uma vez, só o rosto, com o cabelo aberto na água como tinta. Estava na roda que cantava em volta de mim quando eu abri os olhos lá embaixo.', 'She comes up once, just her face, her hair spread on the water like ink. She was in the ring that sang around me when I opened my eyes down there.')),
        T('— De onde a senhora veio, antes da roda?', '— Where did you come from, Godmother, before the ring?'),
      ],
      escolha: { id: 'n_nhale', opcoes: [
        { id: 'doce', gesto: true, tom: 'doce', aviso: AV.nhale, aoEscolher: ganha('nhale', 1), txt: T('Bater de volta na quilha, três vezes.', 'Knock back on the keel, three times.'),
          resultado: [T('Ela responde com três, e depois com mais três. Ficamos assim até o sol.', 'She answers with three, and then three more. We stay like that until the sun.')] },
        { id: 'fria', gesto: true, tom: 'fria', aviso: AV.nhale, aoEscolher: ganha('nhale', -1), txt: T('Não responder.', 'Don’t answer.'),
          resultado: [T('Ela espera um pouco e afunda sem fazer barulho. No resto da viagem, as batidas vêm mais espaçadas.', 'She waits a little and sinks without a sound. For the rest of the voyage, the knocks come further apart.')] },
        { id: 'divertida', fala: true, tom: 'divertida', aviso: AV.nhale, aoEscolher: ganha('nhale', 1), txt: T('Vocês cantaram errado o terceiro verso.', 'You sang the third line wrong.'),
          resultado: [T('Ela fica parada na água, de olhos muito abertos. Lá embaixo, não sabiam que eu estava ouvindo.', 'She goes still in the water, eyes very wide. Down there, they didn’t know I was listening.'), T('Depois ri, e o riso sobe em bolhas. Na noite seguinte ela canta o terceiro verso embaixo do barco, certo, e bate na quilha para eu ouvir.', 'Then she laughs, and the laugh comes up in bubbles. The next night she sings the third line under the boat, right this time, and knocks on the keel so I’ll hear.')] },
      ] } },
    { id: 'a12b', se: (st) => noBarco(st, 'brann'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-brann'), dim: .45, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Brann engraxa a besta no colo e me olha de lado. Para ele eu sou uma mulher de olhos acesos demais que paga bem, e ele não finge outra coisa.', 'Brann greases the crossbow in his lap and watches me sideways. To him I am a woman with too-bright eyes who pays well, and he doesn’t pretend otherwise.'),
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

    // a segunda noite no mar: cada um chega mais perto, e cada resposta pesa na lealdade
    { id: 'a13m', se: (st) => noBarco(st, 'maru'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-maru'), dim: .58, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Na segunda noite, Maru amarra o leme e senta no convés, encostado na minha perna, de costas para mim.', 'On the second night Maru lashes the tiller and sits on the deck, leaning against my leg, his back to me.'),
        T('— Minha mãe dizia que a Madrinha devolvia o olho de quem pedisse direito.', '— My mother used to say the Godmother gave back the eye of whoever asked right.'),
      ],
      escolha: { id: 'n2_maru', opcoes: [
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.maru, aoEscolher: ganha('maru', 1), txt: T('Então pede direito.', 'Then ask right.'),
          resultado: [T('Ele pede baixinho, com as palavras velhas, e erra duas. Ponho o polegar na pálpebra branca e deixo ali até ele parar de respirar alto.', 'He asks under his breath, in the old words, and gets two wrong. I lay my thumb on the white eyelid and leave it there until he stops breathing loud.'), T('De manhã ele jura que enxerga a ponta do mastro. Não enxerga. Canta até o meio-dia.', 'In the morning he swears he can see the top of the mast. He can’t. He sings until noon.')] },
        { id: 'fria', gesto: true, tom: 'fria', aviso: AV.maru, txt: T('Tapar o olho bom dele com a mão.', 'Cover his good eye with my hand.'),
          resultado: [T('Com o olho branco ele vê a minha mão, de perto, e mais nada.', 'With the white eye he sees my hand, close up, and nothing else.'), T('— Com esse você me vê melhor — digo, e tiro a mão. Ele passa o resto da noite virado para mim, com o olho branco.', '— You see me better with that one — I say, and take my hand away. He spends the rest of the night turned toward me, with the white eye.')] },
        { id: 'divertida', fala: true, tom: 'divertida', aviso: AV.maru, aoEscolher: ganha('maru', 1), txt: T('E o que você me dá por ele?', 'And what will you give me for it?'),
          resultado: [T('Ele pensa muito. Tira do pescoço um dente de tubarão furado, a única coisa que a mãe deixou, e põe na minha mão.', 'He thinks a long time. He takes a drilled shark’s tooth from around his neck, the only thing his mother left him, and puts it in my hand.'), T('Fico com o dente. O olho continua branco, e ele não reclama, porque pagou.', 'I keep the tooth. The eye stays white, and he doesn’t complain, because he paid.')] },
      ] } },
    { id: 'a13l', se: (st) => noBarco(st, 'lio'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-lio'), dim: .58, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Lio passa a noite seguinte sem dormir. Fica na proa, virado para o lado de Redom, com o pano nos ombros.', 'Lio spends the next night without sleeping. He stays at the bow, facing toward Redom, with the cloth on his shoulders.'),
        T('— Madrinha. Se der errado, a senhora me leva para o fundo com a senhora?', '— Godmother. If it goes wrong, will you take me down to the deep with you?'),
      ],
      escolha: { id: 'n2_lio', opcoes: [
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.lio, aoEscolher: ganha('lio', 1), txt: T('Levo. Pela mão.', 'I will. By the hand.'),
          resultado: [T('Ele me estende a mão para ver se eu seguro desde já. Seguro. Ele dorme assim, sentado, com o braço esticado para o meu lado.', 'He holds out his hand to see whether I’ll hold it already. I do. He falls asleep like that, sitting up, his arm stretched toward me.')] },
        { id: 'fria', fala: true, tom: 'fria', aviso: AV.lio, txt: T('Comigo não dá errado.', 'With me, nothing goes wrong.'),
          resultado: [T('Ele entende que é um sim e vai dormir sorrindo. Eu não disse sim.', 'He takes it for a yes and goes to sleep smiling. I didn’t say yes.')] },
        { id: 'cruel', fala: true, tom: 'cruel', aviso: AV.lio, aoEscolher: ganha('lio', -1), txt: T('Lá embaixo, quem vai sozinho chega mais rápido.', 'Down there, whoever goes alone gets there faster.'),
          resultado: [T('Ele ri, porque acha que é brincadeira. Depois para de rir e vai dormir do outro lado do barco.', 'He laughs, because he thinks it’s a joke. Then he stops laughing and goes to sleep at the other end of the boat.')] },
      ] } },
    { id: 'a13t', se: (st) => noBarco(st, 'teshka'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-teshka'), dim: .58, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Numa noite sem lua, Teshka para de limpar a faca e me estende o cabo.', 'On a moonless night Teshka stops cleaning her knife and holds the hilt out to me.'),
        T('— Se a senhora é o que dizem, corta a mão. Se sangrar igual a gente, eu fico sabendo.', '— If you are what they say, cut your hand. If you bleed like us, I’ll know.'),
      ],
      escolha: { id: 'n2_teshka', opcoes: [
        { id: 'divertida', gesto: true, tom: 'divertida', aviso: AV.teshka, aoEscolher: ganha('teshka', 1), txt: T('Cortar a palma devagar, olhando para ela.', 'Cut my palm slowly, looking at her.'),
          resultado: [T('O sangue sai escuro e grosso e não pinga. Fica na palma, parado, como água num prato.', 'The blood comes out dark and thick and doesn’t drip. It stays in my palm, still, like water in a dish.'), T('Teshka olha muito tempo. Pega a faca de volta pelo cabo e não diz mais nada até de manhã.', 'Teshka looks for a long time. She takes the knife back by the hilt and says nothing more until morning.')] },
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.teshka, aoEscolher: ganha('teshka', 1), txt: T('Corta você. Onde quiser.', 'You cut. Wherever you like.'),
          resultado: [T('Ela segura a faca perto do meu pescoço por muito tempo. Eu não pisco. Depois ela guarda a faca.', 'She holds the knife near my throat for a long time. I don’t blink. Then she puts the knife away.'), T('— Não precisa — diz, e me olha, enfim, sem fazer conta.', '— No need — she says, and looks at me, at last, without doing sums.')] },
        { id: 'cruel', gesto: true, tom: 'cruel', aviso: AV.teshka, aoEscolher: ganha('teshka', -1), txt: T('Pegar a faca e cortar a mão dela.', 'Take the knife and cut her hand.'),
          resultado: [T('Um risco curto na palma dela, antes que ela puxe a mão. — Pronto. Agora você sabe como você sangra — digo.', 'A short line across her palm, before she can pull away. — There. Now you know how you bleed — I say.'), T('Ela fecha a mão e não reclama. Guarda a faca do lado em que eu durmo.', 'She closes her hand and doesn’t complain. She keeps the knife on the side where I sleep.')] },
      ] } },
    { id: 'a13n', se: (st) => noBarco(st, 'nhale'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-nhale'), dim: .58, lado: 'dir', foco: '35% 55%' },
      texto: [
        T('Na outra noite, Nhalé sobe pela borda até a cintura, e o barco todo inclina para o lado dela. Nunca saiu tanto da água.', 'The next night Nhalé climbs the side up to her waist, and the whole boat leans her way. She has never come this far out of the water.'),
        T('— Na terra deles, a senhora seca?', '— In their land, will you dry out?'),
      ],
      escolha: { id: 'n2_nhale', opcoes: [
        { id: 'doce', gesto: true, tom: 'doce', aviso: AV.nhale, aoEscolher: ganha('nhale', 1), txt: T('Deitar na borda com o braço na água e segurar a mão dela até amanhecer.', 'Lie along the side with my arm in the water and hold her hand until dawn.'),
          resultado: [T('Ela volta para a água, mas não solta. A mão dela fica fria na minha a noite toda, e a minha não esquenta a dela.', 'She slides back into the water but doesn’t let go. Her hand stays cold in mine all night, and mine doesn’t warm hers.')] },
        { id: 'fria', fala: true, tom: 'fria', aviso: AV.nhale, aoEscolher: ganha('nhale', -1), txt: T('Volta para baixo. Você pesa no barco.', 'Go back down. You weigh on the boat.'),
          resultado: [T('Ela solta a borda na mesma hora. O barco se endireita, e as batidas na quilha só voltam de madrugada.', 'She lets go of the side at once. The boat rights itself, and the knocks on the keel only come back near dawn.')] },
        { id: 'divertida', gesto: true, tom: 'divertida', aviso: AV.nhale, txt: T('Puxá-la para dentro do barco.', 'Pull her into the boat.'),
          resultado: [T('Ela cai nas tábuas, a cauda batendo, e ri sem ar. Seguro-a ali enquanto conto até trinta, para ela saber o que é secar.', 'She tumbles onto the planks, tail slapping, and laughs with no breath. I hold her there while I count to thirty, so she’ll know what drying is.'), T('Quando devolvo à água, ela fica colada na quilha até o sol, sem bater.', 'When I give her back to the water, she stays pressed to the keel until sunrise, without knocking.')] },
      ] } },
    { id: 'a13b', se: (st) => noBarco(st, 'brann'), zona: 'mar', agua: 0, fundo: { img: IMG('a12-brann'), dim: .58, lado: 'dir', foco: '35% 45%' },
      texto: [
        T('Uma noite, uma gaivota pousa na ponta do mastro. Brann levanta a besta, mira e não atira.', 'One night a gull lands on the masthead. Brann raises the crossbow, aims, and doesn’t shoot.'),
        T('— Já atirou com uma dessas, Madrinha?', '— Ever shot one of these, Godmother?'),
      ],
      escolha: { id: 'n2_brann', opcoes: [
        { id: 'divertida', fala: true, tom: 'divertida', aviso: AV.brann, aoEscolher: ganha('brann', 1), txt: T('Me ensina.', 'Teach me.'),
          resultado: [T('Ele põe a besta nas minhas mãos e acerta o meu cotovelo com dois dedos, sem encostar mais que isso. Eu atiro. A gaivota cai no mar.', 'He puts the crossbow in my hands and sets my elbow with two fingers, touching no more than that. I shoot. The gull drops into the sea.'), T('Brann fica quieto um tempo. — A senhora já sabia — diz. Eu não sabia.', 'Brann is quiet a while. — You already knew how — he says. I didn’t.')] },
        { id: 'doce', fala: true, tom: 'doce', aviso: AV.brann, aoEscolher: ganha('brann', 1), txt: T('Atira você. Eu quero ver.', 'You shoot. I want to watch.'),
          resultado: [T('Ele erra a primeira. Acerta a segunda, e olha para mim antes de olhar para a gaivota.', 'He misses the first. He hits with the second, and looks at me before he looks at the gull.')] },
        { id: 'fria', gesto: true, tom: 'fria', aviso: AV.brann, aoEscolher: ganha('brann', -1), txt: T('Tirar a besta das mãos dele e guardar embaixo do banco.', 'Take the crossbow out of his hands and stow it under the bench.'),
          resultado: [T('— Até a galera, as setas são minhas — digo. Ele deixa. Passa a noite com as mãos abertas no colo, sem saber onde pôr.', '— Until the galley, the bolts are mine — I say. He lets me. He spends the night with his hands open in his lap, not knowing where to put them.')] },
      ] } },

    // ===================================================== PARTE II · A SENTENÇA
    { id: 'p2', parte: T('II · A Sentença', 'II · The Sentence'), zona: 'mar', agua: 0, fundo: { img: IMG('b01-mar'), dim: .55 },
      cartao: { num: T('Parte II', 'Part II'), nome: T('A Sentença', 'The Sentence'), epigrafe: T('Redom não afunda pirata. Redom enforca.', 'Redom doesn’t sink pirates. Redom hangs them.'), fonte: T('dito da Orla', 'saying of the Shore') } },

    { id: 'b01', zona: 'mar', agua: 0, fundo: { video: VID('b01-mar'), img: IMG('b01-mar'), dim: .45, foco: '55% 50%' },
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

    { id: 'b02', zona: 'galera', agua: 0, fundo: { video: VID('b02-sentenca'), img: IMG('b02-sentenca'), dim: .4, foco: '60% 45%' },
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
        se((st) => vivoBarco(st, 'lio'), T('Lio fica agachado, tirando água com as mãos, como se isso fosse adiantar.', 'Lio stays crouched, bailing with his hands, as if that would help.')),
        T('Baixo as pálpebras. O barulho do convés vai ficando longe. Desço com a cabeça por baixo do barco, por baixo do canal, até a água pesada do fundo, parada há cem anos.', 'I lower my eyelids. The noise on deck goes far away. I go down with my mind beneath the boat, beneath the channel, to the heavy water at the bottom, still for a hundred years.'),
        T('Ela acorda devagar, como bicho grande. Sobe pelas minhas pernas, fria por dentro dos ossos, e pesa nos meus dedos até eles doerem.', 'It wakes slowly, like a large animal. It climbs my legs, cold inside the bones, and weighs on my fingers until they ache.'),
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
        T('A onda é mais alta que os mastros deles. Pega a Sentença pelo costado e varre o convés da proa à popa.', 'The wave is taller than their masts. It takes the Sentence on her side and sweeps the deck from bow to stern.'),
        se(() => maruLado(st), T('Porque o Maru pôs o barco de lado, ela bate de cheio. O mastro do meio quebra como espinha de peixe e cai em cima da segunda fileira.', 'Because Maru brought the boat broadside, it strikes whole. The middle mast snaps like a fishbone and comes down on the second row.')),
        se(() => brannAtira(st), T('Sem o homem que dava as ordens, a segunda fileira não sabe se atira ou se segura. Segura. A água chega antes da ordem.', 'Without the man who gave the orders, the second row doesn’t know whether to shoot or hold on. They hold on. The water arrives before the order.')),
        se(() => teshkaAborda(st), T('Teshka está no convés deles quando a onda chega. Vejo a faca dela subir duas vezes antes de a água levar tudo.', 'Teshka is on their deck when the wave arrives. I see her knife rise twice before the water takes everything.')),
        se(() => nhaleAjuda(st), T('Embaixo d’água, Nhalé puxa pelos pés os soldados que a onda derrubou. Eles não voltam para cima.', 'Underwater, Nhalé pulls down by the feet the soldiers the wave knocked over. They don’t come back up.')),
        T(CONTA(st).pt, CONTA(st).en),
        T('A Sentença não afunda. Fica adernada, com o costado quebrado. Essa eu deixo boiar.', 'The Sentence doesn’t sink. She lists, her side broken. That one I let float.'),
        T('Os meus dedos não fecham mais. Ficam abertos, tremendo, muito tempo depois que o mar baixa.', 'My fingers won’t close. They stay open, trembling, long after the sea has gone down.'),
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
        { id: 'devagar', gesto: true, tom: 'fria', txt: T('Abrir os olhos para o sargento, e só para ele.', 'Open my eyes for the sergeant, and only for him.'),
          resultado: [T('O primeiro que eu vejo é o sargento. Ele para no meio de uma ordem.', 'The first one I see is the sergeant. He stops in the middle of an order.'),
            G('sargento', T('— Essa está viva. Seta inteira no ombro, e viva. — Ele não grita. — A desgraçada é resistente igual Grakh. Conjuradora. Algema de pedra. A Lâmina julga essas pessoalmente.', '— This one’s alive. Whole bolt in the shoulder, and alive. — He doesn’t shout. — The bitch is as tough as a Grakh. A conjurer. Stone shackles. The Blade judges these herself.'))] },
        { id: 'sorrir', gesto: true, tom: 'divertida', txt: T('Sorrir para o soldado que me carrega.', 'Smile at the soldier carrying me.'),
          resultado: [T('O soldado que me arrasta pelos pés vê o sorriso antes de entender. Larga as minhas pernas no convés e dá dois passos para trás. — Sargento. Essa aqui está viva.', 'The soldier dragging me by the feet sees the smile before he understands. He drops my legs on the deck and takes two steps back. — Sergeant. This one’s alive.'),
            G('sargento', T('O sargento olha a seta, depois os meus olhos. — Resistente igual Grakh, a desgraçada. Conjuradora. Algema de pedra. A Lâmina julga essas pessoalmente.', 'The sergeant looks at the bolt, then at my eyes. — Tough as a Grakh, the bitch. A conjurer. Stone shackles. The Blade judges these herself.'))] },
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


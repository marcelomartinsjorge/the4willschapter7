
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

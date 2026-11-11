
    // ===================================================== PARTE III · A ALA FUNDA
    { id: 'p3', parte: T('III · A Ala Funda', 'III · The Deep Ward'), zona: 'ala', agua: 0, sal: .2, pedra: true, fundo: { img: IMG('c01-escada'), dim: .6 },
      cartao: { num: T('Parte III', 'Part III'), nome: T('A Ala Funda', 'The Deep Ward'), epigrafe: T('Na cela do fundo, nome nenhum se escreve.', 'In the bottom cell, no name is written.'), fonte: T('ordem da Cidadela', 'order of the Citadel') } },

    { id: 'c01', zona: 'ala', agua: 0, sal: .2, pedra: true, fundo: { img: IMG('c01-escada'), dim: .45, foco: '55% 50%' },
      texto: [
        T('A carroça desce por uma rampa embaixo da Cidadela, e a luz do dia acaba no meio da descida. Os soldados que me trazem baixam a voz, como se baixa numa capela.', 'The cart goes down a ramp beneath the Citadel, and the daylight ends halfway down. The soldiers bringing me lower their voices, the way you do in a chapel.'),
        T('— Ala Funda — diz um para o outro. — Sempre me dá arrepio descer aqui.', '— The Deep Ward — one says to the other. — Going down here always gives me the shivers.'),
        T('No pé da escada, o sargento grita para cima os nomes de quem pode descer: Wim, Garrick, Pell, Dunstan. Ele fala os nomes com a naturalidade de quem chama os mesmos há anos. No alto da escada, a guarda não deixa passar outro rosto.', 'At the foot of the stairs the sergeant shouts up the names of those allowed down: Wim, Garrick, Pell, Dunstan. He says the names as easily as someone who has called the same ones for years. Up top, the guard lets no other face through.'),
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
        (st) => (consorte(st) === 'markus' ? T('Atrás dela, na porta, um homem alto com a mão no punho da espada. Ela não olha para ele, e ele não olha para outra coisa que não seja ela.', 'Behind her, in the doorway, a tall man with his hand on his sword hilt. She doesn’t look at him, and he looks at nothing but her.')
          : consorte(st) === 'justine' ? T('Atrás dela, uma mulher de pena entre os dentes e um livro aberto no braço. Escreve antes de a Laura falar.', 'Behind her, a woman with a quill between her teeth and a book open on her arm. She writes before Laura speaks.')
            : T('Atrás dela, um oficial velho com uma pena e um livro aberto no braço.', 'Behind her, an old officer with a quill and a book open on his arm.')),
        V('D15', T('Ela me lê. A boca não se mexe, mas os olhos param em mim de quando em quando, e eu ainda não descobri o que ela procura.', 'She reads me. Her lips don’t move, but her eyes stop on me now and then, and I haven’t worked out yet what she is looking for.')),
        T('A vara desce nas grades no meio da primeira pergunta.', 'The rod comes down on the bars in the middle of the first question.'),
        V(null, T('— Parem com isso. Quero ela pensando.', '— Stop that. I want her thinking.')),
      ] },

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
        T('Os Grakh estão no fim, todo soldado de Redom diz isso. A Boca Seca já não assusta Redom, e por isso os homens dela foram mandados para a costa, vigiar a Orla. Ela quer levá-los de volta ao deserto e acabar com o resto.', 'The Grakh are nearly finished, every soldier in Redom says so. The Dry Mouth no longer frightens Redom, and so her men were sent to the coast, to watch the Shore. She wants to take them back to the desert and finish the rest.'),
        T('Volte e ponha a Orla de joelhos. Quero ouvir isso da boca dela.', 'Go back and bring the Shore to its knees. I want to hear it from her mouth.'),
      ] },

    { id: 'c04', checkpoint: true, zona: 'ala', agua: 0, sal: .25, pedra: true, fundo: { img: IMG('c-laura'), dim: .45, foco: '62% 40%' },
      texto: [
        T('Ela tem a porta, a tocha e quem está atrás dela. Eu tenho a boca.', 'She has the door, the torch, and whoever stands behind her. I have my mouth.'),
      ],
      minijogo: 'interrogatorio', jogoId: 'interrogatorio', mgNome: T('Responder à Lâmina', 'Answer the Blade'),
      aoTerminar: (st, r) => { (r.flags || []).forEach((f) => { st.f[f] = true; }); if (st.f.usouSimon) st.f.semente = true; },
      depois: (st) => (J(st, 'interrogatorio').morte ? [T('Fico no escuro com o que eu disse. Não serviu para nada.', 'I stay in the dark with what I said. None of it was any use.')] : [
        T('Ela fala para quem está atrás dela, e não para mim.', 'She speaks to the person behind her, not to me.'),
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
        { palavra: T('Na primeira parada, manda tirar as argolas, porque a Lâmina mandou. Escreve isso também.', 'At the first stop he has the shackles taken off, because the Blade ordered it. He writes that down too.'),
          sombra: T('À noite ele dorme sentado, de frente para mim, com a faca no colo. Acorda cada vez que eu me mexo.', 'At night he sleeps sitting up, facing me, with the knife in his lap. He wakes every time I move.'),
          argola: T('Uma argola continua no meu pulso esquerdo. A chave ele guarda num cordão, por dentro da camisa.', 'One shackle stays on my left wrist. The key he keeps on a cord, inside his shirt.') }[termos(st)],
        T('Em Alvena, quem nos espera no molhe é a Sentença, com o costado remendado de madeira nova, mais clara que o resto.', 'In Alvena, what waits for us at the mole is the Sentence, her side patched with new timber, paler than the rest.'),
        T('Os soldados que sobraram da onda me olham subir a prancha. Nenhum fala comigo. Um deles faz o sinal da Juíza quando eu passo.', 'The soldiers the wave left alive watch me climb the gangplank. None of them speaks to me. One makes the Judge’s sign as I pass.'),
        T('Sento na proa da galera que eu quebrei. Deixo que olhem.', 'I sit at the bow of the galley I broke. I let them look.'),
      ] },

    { id: 't02', zona: 'cais', agua: 0, sal: .15, pedra: (st) => termos(st) === 'argola', fundo: { img: IMG('a02b-cais'), dim: .45, foco: '55% 45%' },
      texto: [
        T('A Sentença entra em Nove Mastros no fim da tarde, com a bandeira de Redom no mastro. A cidade para nas pontes de corda. Depois vê quem está na proa.', 'The Sentence sails into Nine Masts at the end of the afternoon, Redom’s banner at the masthead. The city stops on its rope bridges. Then it sees who is at the bow.'),
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
        { id: 'pagar', gesto: true, tom: 'seduzir', aoEscolher: (st) => { trChefe(st); trSusp(st); }, txt: T('Sentar ao lado dele, perto, com o joelho encostado no dele.', 'Sit beside him, close, my knee against his.'),
          resultado: [T('Ossian se endireita na cadeira como quem ganhou a mesa. Põe a marca dos Mastreiros primeiro, alto, para os outros verem com quem eu sentei.', 'Ossian straightens in his chair like a man who has won the whole table. He puts the Mastmen’s mark down first, loudly, so the others see whom I sat with.'),
            T('Aubert escreve que a prisioneira senta do lado dos Mastreiros, e sublinha. A Lâmina vai ler que eu já escolhi um lado.', 'Aubert writes that the prisoner sits on the Mastmen’s side, and underlines it. The Blade will read that I have already chosen a side.')] },
        { id: 'porta', gesto: true, tom: 'intimidar', txt: T('Olhar para ele até ele lembrar onde fica a porta.', 'Look at him until he remembers where the door is.'),
          resultado: [T('Ele lembra. Sai sem resposta e sem o meu nome do lado dele da mesa. Os Mastreiros vão esperar o Ossian decidir, e o Ossian não decide nada sem ver para que lado o vento sopra.', 'He remembers. He leaves without an answer and without my name on his side of the table. The Mastmen will wait for Ossian to decide, and Ossian decides nothing until he sees which way the wind blows.'),
            T('Aubert anota: um dos três saiu.', 'Aubert notes: one of the three walked out.')] },
      ] } },

    { id: 't03r', zona: 'cabine', agua: 0, sal: .15, pedra: (st) => termos(st) === 'argola', fundo: { img: IMG('t03-aubert-mesa'), dim: .62, foco: '60% 50%' },
      texto: [
        T('Ruo não senta. Fala da porta, alto, para o comandante ouvir: a Sentença ainda boia, e o irmão dele não.', 'Ruo doesn’t sit. He speaks from the door, loudly, for the commander to hear: the Sentence still floats, and his brother doesn’t.'),
      ],
      escolha: { id: 'trRuo', pergunta: T('Ruo', 'Ruo'), opcoes: [
        { id: 'moeda', gesto: true, tom: 'manipular', aoEscolher: (st) => trChefe(st), txt: T('Soltar uma moeda da barra da saia e pôr na mão dele.', 'Work a coin loose from my hem and put it in his hand.'),
          resultado: [{ moeda: true, t: T('Fecho os dedos dele por cima da moeda.', 'I close his fingers over the coin.') },
            T('Na Orla, quem vai enganar alguém paga a Madrinha antes. Ruo olha a moeda, depois o comandante, e entende quem está sendo enganado. Entra, senta, e diz que o Recife espera três meses.', 'On the Shore, whoever means to fool someone pays the Godmother first. Ruo looks at the coin, then at the commander, and understands who is being fooled. He comes in, sits, and says the Reef will wait three months.'),
            T('Aubert escreve: presente de paz.', 'Aubert writes: a gift of peace.')] },
        { id: 'deixei', fala: true, tom: 'intimidar', aoEscolher: (st) => { trChefe(st); trSusp(st); }, txt: T('A Sentença boia porque eu deixei, Ruo.', 'The Sentence floats because I let her, Ruo.'),
          resultado: [T('Ruo descruza os braços. Entra e senta.', 'Ruo uncrosses his arms. He comes in and sits.'),
            T('Aubert escreve palavra por palavra. A Lâmina vai ler que eu deixei a galera dela boiar.', 'Aubert writes word by word. The Blade will read that I let her galley float.')] },
        { id: 'irmao', fala: true, tom: 'intimidar', aoEscolher: (st) => { trSusp(st); }, txt: T('Quem vendeu a rota do seu irmão está nesta mesa.', 'Whoever sold your brother’s route is at this table.'),
          resultado: [T('Ruo atravessa a cabine antes de eu terminar. A faca dele para no pescoço da Sarnai, e quem segura o braço dele é o comandante.', 'Ruo crosses the cabin before I finish. His knife stops at Sarnai’s throat, and the one who holds his arm is the commander.'),
            T('O Recife sai da cabine sem prometer nada. Aubert escreve tudo, e a Orla ganha uma briga que não é minha.', 'The Reef leaves the cabin without promising anything. Aubert writes all of it, and the Shore gains a quarrel that isn’t mine.')] },
      ] } },

    { id: 't04', zona: 'cabine', agua: 0, sal: .15, pedra: (st) => termos(st) === 'argola', fundo: { img: IMG('a06b-plano'), dim: .5, lado: 'dir', foco: '35% 50%' },
      texto: (st) => {
        const n = st.f.trChefes || 0;
        if (n <= 1) return [
          T('Antes do sol, só uma casa põe a marca na folha do caderno. Uma casa não é a Orla, e o comandante sabe disso.', 'Before sunrise, only one house puts its mark on the notebook’s page. One house is not the Shore, and the commander knows it.'),
          V(null, T('— A Lâmina vai saber que a senhora não manda nem nesta mesa — diz Aubert, e fecha o caderno.', '— The Blade will know you don’t command even this table — says Aubert, and closes the notebook.')),
        ];
        return [
          n === 3 ? T('Antes do sol, as três casas põem a marca numa folha do caderno do comandante.', 'Before sunrise, all three houses put their mark on a page of the commander’s notebook.')
            : T('Antes do sol, duas casas põem a marca numa folha do caderno do comandante. A terceira manda dizer que não toca em barco de Redom enquanto as outras não tocarem.', 'Before sunrise, two houses put their mark on a page of the commander’s notebook. The third sends word that it won’t touch a Redom boat while the others don’t.'),
          T('Não é rendição. É uma trégua: três meses sem pirataria na costa, enquanto as casas decidem o resto.', 'It isn’t surrender. It is a truce: three months without piracy on the coast, while the houses decide the rest.'),
          T('Três meses. A Orla nunca decidiu nada em três meses. A Lâmina não sabe disso.', 'Three months. The Shore has never decided anything in three months. The Blade doesn’t know that.'),
          T('Na volta, da amurada da Sentença, Aubert anota as velas da Orla ao longo da costa. Toda manhã a linha é mais curta.', 'On the way back, from the Sentence’s rail, Aubert writes down the Shore’s sails along the coast. Every morning the line is shorter.'),
          (st.f.trSusp || 0) >= 2 ? T('O caderno dele engorda mais que a folha das casas.', 'His notebook grows fatter than the houses’ page.') : T('Ele escreve menos a cada dia. Quando o mar fica vazio, o caderno não tem mais o que dizer.', 'He writes less each day. When the sea goes empty, the notebook has nothing left to say.'),
        ];
      } },

    // a trégua não saiu: a Lâmina não precisa dela
    { id: 'falhouTregua', soDesvio: true, volta: true, zona: 'ala', agua: 0, sal: .25, pedra: true, fundo: { img: IMG('c02-cela'), dim: .5, lado: 'dir', foco: '35% 50%' },
      texto: [
        T('Na Capital, a Lâmina lê o caderno do começo ao fim sem levantar os olhos. Depois manda abrir a Ala Funda outra vez.', 'In the Capital, the Blade reads the notebook from start to finish without looking up. Then she has the Deep Ward opened again.'),
        T('A pedra surda bebe outra vez. Uma mulher que não traz as facções não vale mais que uma forca.', 'The deafstone drinks again. A woman who doesn’t bring the factions is worth no more than a gallows.'),
      ] },

    { id: 't05', zona: 'capital', agua: 0, sal: .25, pedra: (st) => termos(st) === 'argola', fundo: { img: IMG('c-laura'), dim: .5, foco: '62% 40%' },
      texto: (st) => [
        T('Na Capital, a Lâmina recebe o comandante numa sala com um mapa na parede. Lê a folha das casas em pé. Lê o caderno sentada, e demora.', 'In the Capital, the Blade receives the commander in a room with a map on the wall. She reads the houses’ page standing. She reads the notebook sitting, and takes her time.'),
        V(null, T('— Três meses. — Ela dobra a folha. — Em três meses eu vou ao deserto e volto.', '— Three months. — She folds the page. — In three months I can go to the desert and come back.')),
        T('Ela diz isso para o mapa, para o sul, e não para mim. A ideia já é dela.', 'She says it to the map, to the south, not to me. The idea is already hers.'),
        (st.f.trSusp || 0) >= 2 ? V(null, T('— O caderno diz que a senhora mente bem. Fica onde eu possa ver.', '— The notebook says you lie well. Stay where I can see you.'))
          : V(null, T('— Até lá, a senhora fica. Como hóspede.', '— Until then, you stay. As a guest.')),
      ] },

    { id: 't06', zona: 'capital', agua: 0, sal: .28, pedra: (st) => termos(st) === 'argola', veste: 'ela', fundo: { img: IMG('t06-quarto'), dim: .45, foco: '70% 55%' },
      texto: (st) => [
        T('A hospedagem da Lâmina é um quarto em cima do templo do Cavaleiro, com cama de verdade e um guarda na porta. De manhã ele destranca e confere: uma hóspede. À noite, tranca.', 'The Blade’s hospitality is a room above the Knight’s temple, with a real bed and a guard at the door. In the morning he unlocks it and checks: one guest. At night, he locks it.'),
        termos(st) === 'sombra' ? T('Do lado de fora, numa cadeira encostada na porta, dorme o homem que o comandante deixou para mim.', 'Outside, on a chair tilted against the door, sleeps the man the commander left for me.') : null,
        T('De dia, posso andar pela praça e pelo mercado, com o guarda dez passos atrás. Ele vigia a minha cara. As caras que eu olho, ele não vigia.', 'By day I may walk the square and the market, with the guard ten paces behind. He watches my face. The faces I look at, he doesn’t watch.'),
        T('Na primeira noite, embaixo da cama, uma laje mexe. Embaixo da laje, uma escada de pedra desce para o escuro, e o escuro cheira a água parada.', 'On the first night, under the bed, a flagstone shifts. Under the flagstone, stone steps go down into the dark, and the dark smells of still water.'),
      ].filter(Boolean) },

    // com a argola, o rosto não muda: ela precisa sair dela antes das noites
    { id: 't06a', se: (st) => termos(st) === 'argola', zona: 'capital', agua: 0, sal: .3, pedra: true, veste: 'ela', fundo: { img: IMG('d01-argola'), dim: .45, foco: '55% 50%' },
      texto: [
        T('Com a argola no pulso, o rosto não muda, e de manhã o guarda confere a argola junto com a hóspede.', 'With the shackle on my wrist, my face won’t change, and in the morning the guard checks the shackle along with the guest.'),
        G('ferreiro', T('A argola tem a marca de um ferreiro da Rua das Forjas. A escada embaixo da laje dá numa cisterna, e a cisterna dá num bueiro da Rua das Fontes, a três ruas da forja dele.', 'The shackle bears the mark of a smith on Forge Street. The stairs under the flagstone lead to a cistern, and the cistern to a drain on Fountain Street, three streets from his forge.')),
      ],
      escolha: { id: 'argola', pergunta: T('A argola', 'The shackle'), opcoes: [
        { id: 'polegar', gesto: true, tom: 'intimidar', flag: 'polegar', txt: T('Quebrar o polegar, para a mão sair da argola e voltar quando eu quiser.', 'Break my thumb, so the hand can slip out of the shackle and back in whenever I want.'),
          resultado: [T('Encosto a mão numa pedra e piso. O estalo é pequeno. A mão passa pela argola como peixe por uma rede rasgada.', 'I set my hand on a stone and step on it. The crack is small. The hand slides through the shackle like a fish through a torn net.'),
            T('Enfaixo com um pedaço da barra da roupa e escondo na manga. De manhã a mão volta para dentro da argola, e o guarda confere: uma hóspede, uma argola.', 'I bind it with a strip from my hem and hide it in my sleeve. In the morning the hand goes back into the shackle, and the guard checks: one guest, one shackle.')] },
        { id: 'seduz', gesto: true, tom: 'seduzir', testemunha: 1, txt: T('Ir de noite até o ferreiro, com a minha cara, e deixar que ele ofereça a chave.', 'Go to the smith by night, in my own face, and let him offer the key.'),
          resultado: [T('Desço pela laje e saio pelo bueiro, de capuz, sem rosto emprestado. O ferreiro dorme em cima da forja e abre a porta de camisa, com o martelo na mão.', 'I go down through the flagstone and out through the drain, hooded, with no borrowed face. The smith sleeps above his forge and opens the door in his shirt, hammer in hand.'),
            T('Mostro o pulso, e deixo que ele olhe o resto. Não peço nada. Ele acende a forja sozinho, faz uma chave antes do galo e não pergunta de quem é a argola. Vai ficar com a minha voz na cabeça por uns dias.', 'I show him my wrist, and let him look at the rest. I ask for nothing. He lights the forge himself, makes a key before cockcrow, and doesn’t ask whose shackle it is. He’ll keep my voice in his head for a few days.'),
            T('A chave eu guardo embaixo da língua.', 'The key I keep under my tongue.')] },
        { id: 'mata', gesto: true, tom: 'intimidar', corpos: 1, alarme: 2, erro: true, txt: T('Ir de noite até o ferreiro, obrigá-lo a abrir a argola e depois matá-lo.', 'Go to the smith by night, make him open the shackle, and then kill him.'),
          resultado: [T('Saio pelo bueiro com o capuz baixo. O ferreiro atende com o martelo na mão.', 'I go out through the drain with my hood low. The smith answers with his hammer in his hand.'),
            T('Abre a argola com a minha lâmina no pescoço. Faz uma chave sem que eu diga nada, porque a lâmina continua lá. Depois a forja esfria.', 'He opens the shackle with my blade at his throat. He makes a key without my saying a word, because the blade is still there. Then the forge goes cold.'),
            T('Na Rua das Forjas, uma forja fria de manhã chama mais gente que uma quente.', 'On Forge Street, a cold forge in the morning draws more people than a hot one.')] },
      ] } },

    { id: 'd02', zona: 'cisterna', agua: .9, sal: .12, pedra: false, veste: 'ela', fundo: { video: VID('d02-cisterna'), img: IMG('d02-cisterna'), dim: .45, clima: 'bolhas', foco: '55% 50%' },
      texto: [
        T('Embaixo do templo do Cavaleiro tem uma cisterna velha, de colunas, que a cidade esqueceu. A água é parada e tem gosto de cal. Serve.', 'Under the Knight’s temple there is an old cistern, full of columns, that the city has forgotten. The water is still and tastes of lime. It will do.'),
        V('D16', T('Toda noite, depois do trabalho, eu tiro o rosto do dia e durmo lá embaixo, na minha pele, no escuro. É a única hora em que a água me segura.', 'Every night, after the work, I take off the day’s face and sleep down there, in my own skin, in the dark. It is the only hour when the water holds me.')),
        T('O sal some um pouco. No dia seguinte volta, maior.', 'The salt fades a little. The next day it comes back, larger.'),
        T('Antes de o guarda abrir a porta, já estou na cama, seca.', 'Before the guard opens the door, I am already in bed, dry.'),
      ] },

    // ===================================================== PARTE V · OS PEQUENOS
    { id: 'p5', parte: T('V · Os Pequenos', 'V · The Small Folk'), zona: 'capital', agua: 0, sal: .3, pedra: false, fundo: { img: IMG('d03-capital'), dim: .55 },
      cartao: { num: T('Parte V', 'Part V'), nome: T('Os Pequenos', 'The Small Folk'), epigrafe: T('Os pequenos dizem a verdade sobre os grandes.', 'The small tell the truth about the great.'), fonte: T('dito de Nove Mastros', 'saying of Nine Masts') } },

    { id: 'd03', zona: 'capital', agua: 0, sal: .3, fundo: { img: IMG('d03-capital'), dim: .45, clima: 'poeiraCal', foco: '55% 40%' },
      texto: [
        T('As semanas passam. Da janela do quarto vejo as tropas da costa voltando para a Capital, uma leva por semana, com a poeira na frente. A Orla está quieta, e Redom não sabe o que fazer com tanto soldado parado.', 'The weeks pass. From my window I watch the coast troops coming back to the Capital, one company a week, dust in front of them. The Shore is quiet, and Redom doesn’t know what to do with so many idle soldiers.'),
        T('Fora dos muros, a coluna para a Boca Seca está sendo montada há um mês: carroças, forjas, sacos de sal. Falta o conselho decidir quem vai, e quantos. Decide daqui a três dias.', 'Outside the walls, the column for the Dry Mouth has been assembling for a month: wagons, forges, sacks of salt. The council has still to decide who goes, and how many. It decides in three days.'),
        V('D17', T('Tenho três noites. De dia, ouço os pequenos. De noite, visto um deles e vou atrás dos grandes. Não dá para todos. Escolho.', 'I have three nights. By day I listen to the small. By night I wear one of them and go after the great. There isn’t time for all. I choose.')),
      ] },

    ...NOITE(1),

    // a lavadeira: na volta da primeira noite, antes do sol, ainda com o rosto da noite
    { id: 'l01', zona: 'capital', agua: 0, sal: .38, veste: (st) => window.LIVRO.mascNoite(st, 1), fundo: { img: IMG('l01-lavadeira'), dim: .45, lado: 'dir', foco: '35% 55%' },
      texto: [
        T('Na volta, antes do sol, corto caminho por uma rua de lavanderias. As lavadeiras já estão na água. Entre as mulheres de Redom, uma Nymae lava roupa de soldado, com uma argola de cativa no tornozelo. Veio de algum barco que a Sentença tomou.', 'On the way back, before sunrise, I cut through a street of laundries. The washerwomen are already in the water. Among the women of Redom, a Nymae washes soldiers’ clothes, a captive’s ring on her ankle. She came from some boat the Sentence took.'),
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
          resultado: [T('Na noite seguinte eu volto. Ela vem comigo até a cisterna sem perguntar nada, porque sou eu. Lá embaixo, a água fica com ela.', 'The next night I come back. She follows me to the cistern without asking anything, because it is me. Down there, the water keeps her.')] },
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
        T('De manhã, o conselho ouve "acabou" e respira aliviado. A coluna da Boca Seca vira uma patrulha de cem homens, e a Lâmina não vai com ela.', 'In the morning the council hears "it’s over" and breathes easier. The column for the Dry Mouth becomes a patrol of a hundred men, and the Blade doesn’t go with it.'),
        T('À tarde ela manda me buscar no quarto. Hóspede só vale enquanto serve para alguma coisa, e uma Orla quieta não vale nada para quem não vai sair de casa.', 'In the afternoon she sends for me. A guest is worth keeping only while she is of use, and a quiet Shore is worth nothing to someone who isn’t leaving home.'),
        T('A pedra surda volta para os meus pulsos.', 'The deafstone goes back on my wrists.'),
      ] },

    { id: 'd10', zona: 'capital', agua: 0, sal: .55, frase: 'brilha', aoEntrar: (st) => { st.f.fraseBoca = true; }, fundo: { img: IMG('d10-praca'), dim: .45, clima: 'poeiraCal', foco: '55% 40%' },
      texto: (st) => {
        const cheias = trabalhados(st).filter((a) => resultadoDe(st, a) === 'cheia').length;
        return [
          T('Na manhã seguinte os pequenos sabem antes dos arautos. A moça do pão, o cavalariço, o menino dos recados, todos dizem a mesma coisa: a Lâmina leva os melhores à Boca Seca.', 'The next morning the small folk know before the heralds. The bread girl, the stable boy, the errand boy, all of them say the same thing: the Blade takes the best to the Dry Mouth.'),
          cheias >= 2 ? T('No conselho, dizem, três vozes falaram a mesma coisa com palavras diferentes, e cada uma achou que era a primeira.', 'In council, they say, three voices said the same thing in different words, and each thought it was the first.')
            : T('No conselho, dizem, uma voz falou mais alto que as outras, e as outras foram atrás.', 'In council, they say, one voice spoke louder than the rest, and the rest followed.'),
          V('D18', T('A frase na minha cabeça brilha uma vez e fica quieta, sem sumir.', 'The sentence in my head shines once and goes quiet, without fading.')),
        ];
      } },

    // a palavra cumprida: a Laura manda a hóspede de volta à Orla para segurar a trégua. O custo de sumir depende dos termos
    { id: 'd01p', se: (st) => termos(st) !== 'sombra', zona: 'estrada', agua: 0, sal: .4, pedra: false, veste: 'ela', fundo: { img: IMG('d01-estalagem'), dim: .5, foco: '55% 45%' },
      texto: (st) => [
        T('Com a coluna decidida, a Lâmina cumpre a palavra dela e me manda de volta à Orla, para segurar a trégua de perto, com dois cavaleiros pela estrada da costa.', 'With the column decided, the Blade keeps her word. She sends me back to the Shore, to hold the truce up close, with two knights along the coast road.'),
        termos(st) === 'argola' ? T('Na beira da estrada, tiram a argola, porque a Lâmina mandou. Não sabem que ela já não me prendia.', 'At the roadside they take off the shackle, because the Blade ordered it. They don’t know it no longer held me.') : null,
        tem(st, 'mira') ? T('Na primeira estalagem eles dormem com o rosto virado para a porta, como a Mira, da casa da Ondina, disse que os de Redom dormem.', 'At the first inn they sleep with their faces to the door, just as Mira, from Ondina’s house, said Redom’s men sleep.') : T('Na primeira estalagem eles dormem com o rosto virado para a porta.', 'At the first inn they sleep with their faces to the door.'),
        G('criada', T('Quem não dorme é a criada, Greta, que limpa a cozinha cantando baixo, sozinha. Tem a minha altura e as mãos vermelhas de sabão.', 'The one who doesn’t sleep is the maid, Greta, scrubbing the kitchen alone and singing under her breath. She is my height, with hands red from soap.')),
      ].filter(Boolean),
      escolha: { id: 'trajeCriada', pergunta: T('A roupa da Greta', 'Greta’s clothes'), opcoes: [
        { id: 'roubar', gesto: true, preco: 'roubar', tom: 'manipular', alarme: 1, txt: T('Levar o vestido de reserva do quartinho dela.', 'Take the spare dress from her little room.'),
          resultado: [{ t: T('O vestido serve mal. Serve. De manhã ela vai dar falta e perguntar aos cavaleiros, e os cavaleiros vão ter duas coisas para não explicar.', 'The dress fits badly. It fits. In the morning she’ll miss it and ask the knights, and the knights will have two things not to explain.'), veste: 'criada' }] },
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'seduzir', testemunha: 1, txt: T('Sentar na cozinha com ela até ela me oferecer a roupa.', 'Sit in the kitchen with her until she offers me the clothes.'),
          resultado: [{ t: T('Escuto a canção dela até o fim, de queixo apoiado na mão, e ela canta pela primeira vez para alguém. Ela me dá o vestido e um pedaço de pão para a estrada. Quando os cavaleiros perguntarem, vai mentir por mim.', 'I listen to her whole song, chin in my hand, and for the first time she sings it to someone. She gives me the dress and a piece of bread for the road. When the knights ask, she’ll lie for me.'), veste: 'criada' }] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'intimidar', corpos: 1, alarme: 2, erro: true, txt: T('Esperar que ela vá buscar água no poço.', 'Wait for her to go and draw water at the well.'),
          resultado: [{ t: T('O poço é fundo. Ela cai sem gritar. Mas de manhã os cavaleiros acordam com a cama vazia e uma criada no poço, e isso eles contam.', 'The well is deep. She falls without a scream. But in the morning the knights wake to an empty bed and a maid in the well, and that they will report.'), veste: 'criada' }] },
      ] },
      depois: [T('Volto para a Capital antes do sol. Dois cavaleiros que perdem a hóspede da Lâmina não vão dizer isso à Lâmina. Vão procurar até a costa.', 'I am back in the Capital before sunrise. Two knights who lose the Blade’s guest won’t tell the Blade so. They’ll search all the way to the coast.')] },

    { id: 'd01s', se: (st) => termos(st) === 'sombra', zona: 'capital', agua: 0, sal: .4, pedra: false, veste: 'ela', fundo: { img: IMG('d01-sombra'), dim: .5, foco: '60% 45%' },
      texto: [
        T('Com a coluna decidida, a Lâmina cumpre a palavra dela e me manda de volta à Orla, para segurar a trégua de perto. O homem do comandante vai junto. Anda bem: nunca perto, nunca longe.', 'With the column decided, the Blade keeps her word and sends me back to the Shore, to hold the truce up close. The commander’s man comes too. He walks well: never close, never far.'),
        G('capa', T('No mercado, antes da porta da cidade, uma moça da minha altura experimenta uma capa velha e não tem dinheiro para ela.', 'At the market, before the city gate, a girl my height tries on an old cloak and doesn’t have the money for it.')),
      ],
      escolha: { id: 'sombra', pergunta: T('A sombra', 'The shadow'), opcoes: [
        { id: 'trocar', gesto: true, tom: 'manipular', testemunha: 1, txt: T('Trocar de roupa com a moça e deixar a minha capa roxa com ela.', 'Swap clothes with the girl and leave her my purple cloak.'),
          resultado: [{ t: T('Ela sai do mercado de capa roxa, feliz da vida, para o lado do porto. A sombra segue a capa até a costa. Eu saio pelo outro lado, com o rosto dela.', 'She leaves the market in my purple cloak, delighted, toward the harbor. The shadow follows the cloak all the way to the coast. I leave the other way, in her face.'), veste: 'capa' }] },
        { id: 'matar', gesto: true, tom: 'intimidar', corpos: 1, alarme: 2, erro: true, txt: T('Levar a sombra para um beco.', 'Lead the shadow into an alley.'),
          resultado: [{ t: T('Ele entra no beco atrás de mim, porque é o trabalho dele. Não sai. Saio eu, com o rosto da moça da capa. Um homem do comandante que não volta faz o comandante vir procurar.', 'He follows me into the alley, because that is his job. He doesn’t come out. I do, in the face of the girl with the cloak. A commander’s man who doesn’t come back brings the commander looking.'), veste: 'capa' }] },
      ] } },

    // ===================================================== PARTE VI · A COLUNA
    { id: 'p6', parte: T('VI · A Coluna', 'VI · The Column'), zona: 'coluna', agua: 0, sal: .6, fundo: { img: IMG('e01-acampamento'), dim: .55, clima: 'poeira' },
      cartao: { num: T('Parte VI', 'Part VI'), nome: T('A Coluna', 'The Column'), epigrafe: T('Exército em marcha tem mais servo que soldado, e servo ninguém conta.', 'An army on the march has more servants than soldiers, and nobody counts servants.'), fonte: T('dito dos intendentes de Redom', 'saying of Redom’s stewards') } },

    { id: 'e01', zona: 'coluna', agua: 0, sal: .6, fundo: { video: VID('e01-acampamento'), img: IMG('e01-acampamento'), dim: .45, clima: 'poeira', foco: '55% 45%' },
      texto: [
        T('Fora dos muros, a coluna termina de se montar: carroças, cavalos, tendas, forjas de campanha, a cozinha do exército. Servo de todo tipo, e nenhum deles é visto.', 'Outside the walls, the column finishes taking shape: wagons, horses, tents, field forges, the army’s kitchen. Servants of every kind, and none of them is seen.'),
        (st) => ((st.f.erros || 0) >= 2 || st.alarme >= 4 ? T('Na porta de cada tenda, um soldado olha rostos. Alguém em Redom anda contando roupas roubadas e corpos na água.', 'At every tent flap a soldier is looking at faces. Someone in Redom has been counting stolen clothes and bodies in the water.')
          : (st.f.erros || 0) >= 1 || st.alarme >= 2 ? T('Na porta das tendas mais perto da Lâmina, um soldado olha rostos.', 'At the flaps of the tents nearest the Blade, a soldier is looking at faces.')
            : T('Os soldados olham as carroças e não olham as pessoas.', 'The soldiers look at the wagons and not at the people.')),
      ],
      escolha: { id: 'disfarce', pergunta: T('O último rosto', 'The last face'), opcoes: [
        { id: 'estrebaria', gesto: true, guarda: 'estrebaria', txt: T('O de Wil, moço da estrebaria, que dorme no feno com os cavalos. Os cochos dos cavalos são de água.', 'Wil’s, the stable hand, who sleeps in the hay with the horses. The horses’ troughs are full of water.'), resultado: [T('Wil tem a minha altura e um jeito de andar torto que eu aprendo em uma tarde.', 'Wil is my height and has a crooked walk I learn in an afternoon.')] },
        { id: 'forja', gesto: true, guarda: 'forja', txt: T('O de Bram, ajudante de ferreiro, que dorme do lado da forja e acorda com qualquer faísca. Perto do fogo, os olhos fogem.', 'Bram’s, the smith’s helper, who sleeps beside the forge and wakes at any spark. Near the fire, eyes look away.'), resultado: [T('Perto do fogo, a pele vai secar mais rápido. Escolho assim mesmo: o fogo esconde.', 'Near the fire, my skin will dry faster. I choose it anyway: the fire hides.')] },
        { id: 'ilse', gesto: true, guarda: 'ilse', se: (st) => st.alarme <= 1, txt: T('O de Ilse, ajudante de curandeiro, que dorme cansada na tenda dos feridos, a vinte passos da tenda da Lâmina.', 'Ilse’s, the healer’s helper, who sleeps exhausted in the wounded tent, twenty paces from the Blade’s.'), resultado: [T('Ilse quer ver a Lâmina de perto. Eu também.', 'Ilse wants to see the Blade up close. So do I.')] },
        { id: 'nell', gesto: true, guarda: 'nell', se: (st) => st.alarme <= 3, txt: T('O de Nell, da cozinha, que dorme entre os sacos de sal com uma faca no avental. Água e sal ao alcance da mão.', 'Nell’s, from the kitchen, who sleeps among the salt sacks with a knife in her apron. Water and salt within reach.'), resultado: [T('Na cozinha tem sal em saco e água em barril. Tem também o prato da Lâmina, que volta cheio.', 'In the kitchen there is salt by the sack and water by the barrel. There is also the Blade’s plate, which comes back full.')] },
      ] } },

    { id: 'e02', zona: 'coluna', agua: 0, sal: .62, fundo: { img: IMG('e02-tenda'), dim: .5, foco: '55% 45%' },
      texto: [T('A roupa, uma última vez.', 'The clothes, one last time.')],
      escolha: { id: 'trajeColuna', pergunta: (st) => T('A roupa de {DISFARCE}', '{DISFARCE}’s clothes'), opcoes: [
        { id: 'roubar', gesto: true, preco: 'roubar', tom: 'manipular', alarme: 1, erro: (st) => METODO_COLUNA(st, 'roubar')[0] === 'errado', txt: T('Roubar enquanto dorme.', 'Steal them while they sleep.'), resultado: (st) => [{ t: METODO_COLUNA(st, 'roubar')[1], veste: st.escolhas.disfarce }] },
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'seduzir', testemunha: 1, erro: (st) => METODO_COLUNA(st, 'seduzir')[0] === 'errado', txt: T('Chegar perto demais e esperar que me ofereça a roupa.', 'Stand too close and wait to be offered the clothes.'), resultado: (st) => [{ t: METODO_COLUNA(st, 'seduzir')[1], veste: st.escolhas.disfarce }] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'intimidar', corpos: 1, alarme: 2, erro: (st) => METODO_COLUNA(st, 'matar')[0] === 'errado', txt: T('Fazer sumir o dono da roupa.', 'Make the owner of the clothes disappear.'), resultado: (st) => [{ t: METODO_COLUNA(st, 'matar')[1], veste: st.escolhas.disfarce }] },
      ] } },

    { id: 'e03', zona: 'coluna', agua: 0, sal: .66, fundo: { img: IMG('e03-odres'), dim: .45, foco: '55% 50%' },
      texto: [
        T('Os servos recebem um odre cada um. Cheio, ele pesa como um gato no ombro.', 'The servants are given one waterskin each. Full, it weighs like a cat on your shoulder.'),
        T('Para o meu corpo, um odre é um gole.', 'For my body, a waterskin is one swallow.'),
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
        (st) => (st.f.polegar ? T('A mão enfaixada segura o odre. Lá na frente, um ponto de cabelo cor de trigo monta um cavalo cinzento.', 'My bound hand holds the waterskin. Far ahead, a spot of wheat-colored hair rides a grey horse.') : T('Lá na frente, um ponto de cabelo cor de trigo monta um cavalo cinzento.', 'Far ahead, a spot of wheat-colored hair rides a grey horse.')),
        T('O sol de Redom ainda nem é o do deserto, e a pele do meu pulso já repuxa embaixo da manga. Provo o meu lábio. O sal está seco.', 'Redom’s sun isn’t even the desert’s yet, and the skin of my wrist already pulls tight under the sleeve. I taste my lip. The salt is dry.'),
        { t: T('A moeda anda pelos nós dos meus dedos.', 'The coin walks across my knuckles.'), moeda: true },
        V('D19', T('A frase está completa. Atrás dela não tem mais nada escrito.', 'The sentence is complete. Behind it, nothing else is written.')),
        T('Então ela continua. Sozinha, no ouro, com palavras que eu nunca li.', 'Then it goes on. On its own, in the gold, with words I have never read.'),
        { t: T('Laura leva os melhores à Boca Seca, e a Boca Seca bebe todos.', 'Laura takes the best to the Dry Mouth, and the Dry Mouth drinks them all.'), voz: 'D24', frase: 'inteira' },
        T('Ajeito o odre no ombro e sigo os cavalos. A frase sabia antes de mim.', 'I settle the waterskin on my shoulder and follow the horses. The sentence knew before I did.'),
      ],
      fim: true },
  ],

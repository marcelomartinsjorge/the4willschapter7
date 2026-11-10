
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


  // ---------------------------------------------------------------- as noites: quem é o alvo da noite k e que rosto ela usa
  alvoNoite: (st, k) => { const a = st.escolhas['alvo' + k]; return a === 'circulo' ? circulo(st) : a; },
  mascNoite: (st, k) => st.escolhas['masc' + k] || 'criadaC',

  // ---------------------------------------------------------------- o que este capítulo deixa para os próximos
  estadoFinal: (st) => {
    const it = J(st, 'interrogatorio'), m = J(st, 'morta');
    return {
      tripulacao: (J(st, 'tripulacao').escolhidos || []).map((k) => ({ id: k, resposta: st.escolhas['n_' + k] || null })),
      ordem: st.escolhas.ordem || null, abriuMao: J(st, 'mao').quando || null, rosto: st.escolhas.rosto || null,
      morta: { toques: m.toques || 0, ouvidas: (m.ouvidas || []).length }, carcereiro: st.escolhas.carcereiro || null,
      interrogatorio: { ouro: it.ouro || 0, vermelho: it.verm || 0, termos: termos(st) },
      semente: !!st.f.semente, usouSimon: !!st.f.usouSimon, confessou: !!st.f.confessou,
      fuga: st.escolhas.trajeCriada || st.escolhas.sombra || st.escolhas.argola || null, polegar: !!st.f.polegar,
      alvos: [1, 2, 3].map((k) => ({ alvo: window.LIVRO.alvoNoite(st, k), mascara: st.escolhas['masc' + k] || null, roupa: st.escolhas['traje' + k] || null, resultado: J(st, 'noite' + k).resultado || null })),
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
    const tom = Object.entries(st.tom).sort((a, b) => b[1] - a[1])[0][0];
    const frase = t({
      doce: T('Ela mentiu com carinho do começo ao fim, e todos a quem ela mentiu ficaram agradecidos.', 'She lied tenderly from beginning to end, and everyone she lied to was grateful.'),
      fria: T('Ela disse a verdade quase sempre. A verdade matou do mesmo jeito.', 'She told the truth nearly every time. The truth killed just the same.'),
      cruel: T('Quando roubar bastava, ela matou.', 'Where stealing would have done, she killed.'),
      divertida: T('Ela riu de tudo, inclusive da Lâmina. Os outros não riram junto.', 'She laughed at everything, the Blade included. The others didn’t laugh along.'),
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
          ilse: T('Saiu com o exército de Redom pelo portão sul, com ataduras para a tenda dos feridos, a vinte passos da tenda da Lâmina.', 'She left with Redom’s army through the south gate, carrying bandages for the wounded tent, twenty paces from the Blade’s.'),
          nell: T('Saiu com o exército de Redom pelo portão sul, com um saco de sal no ombro, na cozinha do exército.', 'She left with Redom’s army through the south gate, a sack of salt on her shoulder, in the army’s kitchen.') }[disf]),
        t(T('Laura D’Orrose não sabe que ela está lá.', 'Laura D’Orrose does not know she is there.')),
      ],
    };
    const trip = (J(st, 'tripulacao').escolhidos || ['maru', 'lio', 'brann']);
    const nomesTrip = trip.map((k) => t(window.LIVRO.colecao[k].nome).split(',')[0]);
    const lista = (a) => (a.length <= 1 ? a.join('') : a.slice(0, -1).join(', ') + (lang === 'en' ? ' and ' : ' e ') + a[a.length - 1]);
    const pilares = [
      { titulo: t(T('A tripulação', 'The crew')),
        feito: (lang === 'en' ? 'You took ' : 'Você levou ') + lista(nomesTrip) + '. ' + (J(st, 'mao').quando === 'cedo' ? t(T('Quem os matou foi a água dela.', 'What killed them was her water.')) : t(T('Quem os matou foram as bestas de Redom, enquanto ela esperava.', 'What killed them was Redom’s crossbows, while she waited.'))),
        volta: t({ mentira: T('Ela tinha dito a eles que hoje não.', 'She had told them not today.'), verdade: T('Ela tinha dito a verdade, e eles foram assim mesmo.', 'She had told them the truth, and they went anyway.'), olhar: T('Ela não disse nada. Eles foram pelo olhar dela.', 'She said nothing. They went on her look alone.') }[st.escolhas.ordem] || T('Eles foram porque era ela.', 'They went because it was her.')) },
      { titulo: t(T('A Lâmina', 'The Blade')),
        feito: t({ palavra: T('Laura a soltou com dois cavaleiros e a palavra dela.', 'Laura released her with two knights and her word.'), sombra: T('Laura a soltou com um homem atrás.', 'Laura released her with a man behind her.'), argola: T('Laura a soltou com uma argola no pulso.', 'Laura released her with a shackle on her wrist.') }[termos(st)]),
        volta: [st.f.confessou && t(T('Você disse que foi você que levantou o mar.', 'You said it was you who raised the sea.')), st.f.semente && t(T('Você falou da Boca Seca na frente dela.', 'You spoke of the Dry Mouth in front of her.')), st.f.usouSimon && t(T('Você falou do irmão dela.', 'You spoke of her brother.'))].filter(Boolean).join(' ') || t(T('Ela vai lembrar dos olhos.', 'She will remember the eyes.')) },
    ];
    const ditos = trabalhados(st).map((a) => {
      const al = a === 'circulo' ? circulo(st) : a, r = resultadoDe(st, a), nome = t(NOMES_ALVO[al]);
      return al === 'mapas' ? t({ cheia: T('Na Sala dos Mapas, os papéis disseram "agora".', 'In the Map Room, the papers said "now".'), meia: T('Na Sala dos Mapas, os papéis dividiram o conselho.', 'In the Map Room, the papers split the council.'), nada: T('Na Sala dos Mapas, os papéis disseram "acabou".', 'In the Map Room, the papers said "it’s over".') }[r])
        : nome + (lang === 'en' ? { cheia: ' said the gold sentence.', meia: ' said half of it.', nada: ' didn’t say it.' }[r] : { cheia: ' disse a frase de ouro.', meia: ' disse metade.', nada: ' não disse.' }[r]);
    });
    const algum = trabalhados(st).some((a) => resultadoDe(st, a) !== 'nada');
    pilares.push({ titulo: t(T('Os grandes', 'The great')), feito: ditos.join(' '), volta: algum ? t(T('Cada um achou que a ideia era dele.', 'Each one thought the idea was his own.')) : t(T('A ideia ficou com ela. A Lâmina levou os melhores do mesmo jeito.', 'The idea stayed with her. The Blade took the best all the same.')) });
    const n = [];
    trip.forEach((k) => { const c = window.LIVRO.colecao[k]; n.push(t(c.nome).split(',')[0] + ': ' + t(c.fim(st) || c.quer).replace(/^./, (x) => x.toLowerCase())); });
    n.push((lang === 'en' ? 'Iska: ' : 'Iska: ') + t({ roubar: T('procura a camisa até hoje.', 'still looking for her shirt.'), seduzir: T('acha que sonhou.', 'thinks she dreamed it.'), matar: T('dorme embaixo de Nove Mastros.', 'sleeps under Nine Masts.') }[st.escolhas.roupa1] || T('não soube de nada.', 'never knew a thing.')));
    if (st.escolhas.lavadeira) n.push(t(T('A lavadeira', 'The washerwoman')) + ': ' + t(window.LIVRO.colecao.lavadeira.fim(st)).replace(/^./, (x) => x.toLowerCase()));
    n.push(t(T('Rostos vestidos', 'Faces worn')) + ': ' + st.vestiu.length + ' · ' + t(T('corpos que a água guardou', 'bodies the water kept')) + ': ' + st.corpos);
    n.push(t({ um: T('A água: um odre, como todo mundo.', 'The water: one skin, like everyone.'), escondida: T('A água: dois odres e uma bexiga escondida.', 'The water: two skins and a hidden bladder.'), cochos: T('A água: os cochos dos cavalos.', 'The water: the horses’ troughs.') }[st.escolhas.agua] || T('A água: a que der.', 'The water: whatever comes.')));
    const fechou = Object.values(st.piscadas).filter(Boolean).length, total = Object.keys(st.piscadas).length;
    if (total) n.push(t(T('O ouro vazou', 'The gold leaked')) + ': ' + (total - fechou) + (lang === 'en' ? ' of ' : ' de ') + total + (lang === 'en' ? ' times.' : ' vezes.'));
    const colecao = st.colecao.map((id) => ({ id, nome: t(window.LIVRO.colecao[id] ? window.LIVRO.colecao[id].nome : id) }));
    const R = {
      chefes: { doce: T('“Redom vai pagar por cada barco.”', '“Redom will pay for every boat.”'), fria: T('“Eu vou a Redom.”', '“I am going to Redom.”'), comida: T('Pediu comida e os fez esperar', 'Asked for food and made them wait') },
      ordem: { mentira: T('“Ninguém morre hoje.”', '“No one dies today.”'), verdade: T('“Eu preciso que me vejam. Vocês, não.”', '“I need them to see me. Not you.”'), olhar: T('O olhar, até abaixarem os olhos', 'The look, until they lowered their eyes') },
      rosto: { pegar: T('Pegou a mão', 'Took the hand'), ver: T('Viu afundar', 'Watched it go under'), decorar: T('Decorou o rosto', 'Learned the face') },
      carcereiro: { wim: T('Wim, o que cantarola', 'Wim, who hums'), garrick: T('Garrick, o que nunca olha', 'Garrick, who never looks'), pell: T('Pell, o que reza', 'Pell, who prays'), dunstan: T('Dunstan, o que conta moedas', 'Dunstan, who counts coins') },
      lavadeira: { levantar: T('Levantou e seguiu', 'Lifted her and walked on'), usar: T('Mandou para a coluna', 'Sent her to the column'), matar: T('A cisterna', 'The cistern') },
      disfarce: { estrebaria: T('Moço da estrebaria', 'Stable hand'), forja: T('Ajudante de ferreiro', 'Smith’s helper'), ilse: T('Ajudante de curandeiro', 'Healer’s helper'), nell: T('Moça da cozinha', 'Kitchen girl') },
      agua: { um: T('Um odre', 'One skin'), escondida: T('Água escondida', 'Hidden water'), cochos: T('Os cochos', 'The troughs') },
    };
    const Q = {
      chefes: T('Os chefes da Orla', 'The chiefs of the Shore'), ordem: T('Diante da Sentença', 'Facing the Sentence'), rosto: T('A última mão', 'The last hand'),
      carcereiro: T('Na Ala Funda', 'In the Deep Ward'), lavadeira: T('A lavadeira', 'The washerwoman'), disfarce: T('O último rosto', 'The last face'), agua: T('A água', 'The water'),
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
  return s.replace(/\{MASC\}/g, () => tr(CURTO[window.LIVRO.mascNoite(st, k)] || CURTO.criadaC))
    .replace(/\{DISFARCE\}/g, () => tr(CURTO[st.escolhas.disfarce] || CURTO.estrebaria))
    .replace(/\{LEITOR\}/g, () => (window.LIVRO.mascNoite(st, k) === 'edric' && st.escolhas['traje' + k] === 'matar' ? tr(T('eu mesma, com a voz do Edric', 'I myself, in Edric’s voice')) : tr(T('o Edric', 'Edric'))));
};

// ---------------------------------------------------------------- AS TRÊS NOITES (dia: ouvir um pequeno · noite: um alvo, um rosto, uma roupa, o Anzol)
function NOITE(k) {
  const DIA = {
    1: T('O primeiro dia. Visto o rosto de uma criada do palácio que vi no corredor e ando pela Capital ouvindo quem serve.', 'The first day. I wear the face of a palace maid I saw in a corridor and walk the Capital listening to those who serve.'),
    2: T('Depois da lavadeira, sigo. A Capital cheira a cal e a pão, e quem serve fala alto quando quem manda não está.', 'After the washerwoman, I move on. The Capital smells of lime and bread, and those who serve talk loud when those who rule are away.'),
    3: T('O terceiro dia. Amanhã a coluna sai, e a cidade toda já sabe, menos o tamanho.', 'The third day. Tomorrow the column leaves, and the whole city knows it, all but the size.'),
  };
  const NT = {
    1: T('A primeira noite. A Capital Branca apaga as velas cedo e acende as tochas das rondas.', 'The first night. The White Capital puts out its candles early and lights the watch torches.'),
    2: T('A segunda noite. Chove fino, e a chuva lava a cal das ruas.', 'The second night. A fine rain falls, and it washes the lime off the streets.'),
    3: T('A última noite. Amanhã de manhã o conselho decide o que já está decidido.', 'The last night. Tomorrow morning the council decides what is already decided.'),
  };
  const alvo = (st) => window.LIVRO.alvoNoite(st, k);
  const usado = (st, id) => [1, 2, 3].some((n) => n < k && st.escolhas['alvo' + n] === id);
  const MASC = { markus: ['cavalarico', 'escudeiro', 'guarda'], justine: ['novica', 'dama', 'criadaC'], joseph: ['vinho', 'viuva', 'moco'], varr: ['horne', 'maud', 'guarda'], ansel: ['bertha', 'aldo', 'moco'], mapas: ['edric', 'criadaC'] };
  const PASSAGEM = ['guarda', 'criadaC', 'moco'];
  const ROT = {
    cavalarico: T('O rosto do Tam, o cavalariço que cuida do cavalo do comandante.', 'The face of Tam, the stable boy who tends the commander’s horse.'),
    escudeiro: T('O rosto do Corin, o escudeiro da espada de pau.', 'The face of Corin, the squire with the wooden sword.'),
    novica: T('O rosto da irmã Ada, a noviça que varre a capela.', 'The face of Sister Ada, the novice who sweeps the chapel.'),
    dama: T('O rosto de Lady Elsbeth, a dama de companhia.', 'The face of Lady Elsbeth, the lady-in-waiting.'),
    vinho: T('O rosto do Pip, o moço que serve vinho pela esquerda.', 'The face of Pip, the boy who pours from the left.'),
    viuva: T('O rosto da Hilde, a viúva da duna vazia.', 'The face of Hilde, the widow of the empty dune.'),
    horne: T('O rosto do sargento Horne, do portão do quartel.', 'The face of Sergeant Horne, from the barracks gate.'),
    maud: T('O rosto da Maud, a irmã dele.', 'The face of Maud, his sister.'),
    bertha: T('O rosto da Bertha, a mãe que escuta toda tarde.', 'The face of Bertha, the mother who listens every afternoon.'),
    aldo: T('O rosto do mestre Aldo, o curandeiro do chá que não adianta.', 'The face of Master Aldo, the healer whose tea does nothing.'),
    edric: T('O rosto do Edric, o escrivão que lê em voz alta.', 'The face of Edric, the clerk who reads aloud.'),
    guarda: T('O rosto de um guarda da Cidadela que vi de passagem.', 'The face of a Citadel guard I saw in passing.'),
    criadaC: T('O rosto de uma criada do palácio que vi de passagem.', 'The face of a palace maid I saw in passing.'),
    moco: T('O rosto de um moço de recados que vi de passagem.', 'The face of an errand boy I saw in passing.'),
  };
  const ordemFim = (st) => {
    const r = J(st, 'noite' + k).resultado;
    return r === 'cheia' ? [
      T('De manhã, {LEITOR} lê os papéis na ordem que eu deixei. Começa pelo sentinela e pelo Grakh vivo, e termina na Pira indo para o norte.', 'In the morning, {LEITOR} reads the papers in the order I left them. He starts with the sentry and the Grakh alive, and ends with the Pyre moving north.'),
      T('Um velho do conselho é o primeiro a falar, e fala como se tivesse pensado sozinho:', 'An old man on the council is the first to speak, and speaks as if he had thought of it alone:'),
      { t: T('«Ele está vivo, e está fugindo. É agora ou nunca.', '«He’s alive, and he’s running. It’s now or never.') },
    ] : r === 'meia' ? [
      T('De manhã, {LEITOR} lê os papéis na ordem que eu deixei. Metade do conselho ouve "acabou", e a outra metade ouve "ainda não".', 'In the morning, {LEITOR} reads the papers in the order I left them. Half the council hears "it’s over", and the other half hears "not yet".'),
      T('Briga de conselho também empurra. Só empurra mais devagar.', 'A council quarrel pushes too. It just pushes slower.'),
    ] : [
      T('De manhã, {LEITOR} lê os papéis na ordem que eu deixei, e o conselho ouve "acabou". Respira aliviado.', 'In the morning, {LEITOR} reads the papers in the order I left them, and the council hears "it’s over". It breathes easier.'),
      T('Dei a eles a ordem que eles queriam ouvir. Esse papel vai ter de ser feito por outra boca.', 'I gave them the order they wanted to hear. This work will have to be done by another mouth.'),
    ];
  };
  const pgs = [
    { id: 'n' + k + 'd', noite: k, zona: 'capital', agua: .24 - k * .05, sal: .3 + k * .08, veste: 'criadaC', aoEntrar: (st, ctx) => ctx.guarda('criadaC', true),
      fundo: { img: IMG('n-dia' + k), dim: .45, clima: 'poeiraCal', foco: '55% 45%' },
      texto: [DIA[k]], minijogo: 'escuta', jogoId: 'dia' + k, mgNome: T('Ouvir um dos pequenos', 'Listen to one of the small'),
      depois: [T('Guardo. De noite vai servir.', 'I keep it. By night it will be useful.')] },
    { id: 'n' + k + 'a', noite: k, zona: 'noite', agua: .2 - k * .04, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .5, clima: k === 2 ? 'chuva' : null, foco: '55% 40%' },
      texto: [NT[k]],
      escolha: { id: 'alvo' + k, pergunta: T('Atrás de quem eu vou?', 'Whom do I go after?'), opcoes: [
        { id: 'circulo', se: (st) => !usado(st, 'circulo'), txt: (st) => (circulo(st) === 'justine' ? T('Justine, na capela da Juíza.', 'Justine, in the Judge’s chapel.') : T('Markus, na sala de armas.', 'Markus, in the armory.')), resultado: (st) => [circulo(st) === 'justine' ? T('A mulher que escreve antes de a Laura falar.', 'The woman who writes before Laura speaks.') : T('O homem que não olha para outra coisa que não seja ela.', 'The man who looks at nothing but her.')] },
        { id: 'joseph', se: (st) => !usado(st, 'joseph'), txt: T('Sir Joseph, na taverna dos oficiais velhos.', 'Sir Joseph, in the old officers’ tavern.'), resultado: [T('Um velho que perdeu para ela e nunca terminou de perder.', 'An old man who lost to her and never finished losing.')] },
        { id: 'varr', se: (st) => !usado(st, 'varr'), txt: T('Lorde Varr, no refeitório da infantaria.', 'Lord Varr, in the infantry mess.'), resultado: [T('O homem que vai com dois mil, se ninguém disser o contrário.', 'The man who goes with two thousand, if no one says otherwise.')] },
        { id: 'ansel', se: (st) => !usado(st, 'ansel'), txt: T('O sentinela que voltou das Goelas, na enfermaria.', 'The sentry who came back from the Gullets, in the infirmary.'), resultado: [T('Tudo o que ele diz é verdade. Melhor ainda.', 'Everything he says is true. Better still.')] },
        { id: 'mapas', se: (st) => !usado(st, 'mapas'), txt: T('A Sala dos Mapas, antes de amanhecer.', 'The Map Room, before dawn.'), resultado: [T('Lá não tem boca para trabalhar. Tem papel.', 'There’s no mouth to work there. There’s paper.')] },
      ] } },
    { id: 'n' + k + 'm', noite: k, zona: 'noite', agua: .2 - k * .04, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .58, clima: k === 2 ? 'chuva' : null },
      texto: (st) => [alvo(st) === 'mapas' ? T('A Sala dos Mapas fica no alto da Cidadela. A guarda deixa entrar quem tem a chave e um rosto que ela conhece.', 'The Map Room is high in the Citadel. The guard lets in whoever has the key and a face it knows.') : window.LIVRO.anzol[alvo(st)].lugar],
      escolha: { id: 'masc' + k, pergunta: T('Que rosto eu visto?', 'Which face do I wear?'), opcoes: Object.keys(ROT).map((id) => ({
        id, gesto: true, se: (st) => (MASC[alvo(st)] || []).includes(id) && (PASSAGEM.includes(id) || tem(st, id)), txt: ROT[id],
        aoEscolher: (st) => { if (PASSAGEM.includes(id) && !tem(st, id)) st.colecao.push(id); },
        resultado: [{ t: T('Penso em {MASC} até a pele obedecer. Obedece.', 'I think of {MASC} until my skin obeys. It does.'), veste: id }] })) } },
    { id: 'n' + k + 'r', noite: k, zona: 'noite', agua: .2 - k * .04, sal: .32 + k * .08, fundo: { img: IMG('n-noite' + k), dim: .62, clima: k === 2 ? 'chuva' : null },
      texto: [T('Falta a roupa.', 'The clothes are still missing.')],
      escolha: { id: 'traje' + k, pergunta: T('A roupa de {MASC}', '{MASC}’s clothes'), opcoes: [
        { id: 'roubar', gesto: true, preco: 'roubar', tom: 'divertida', alarme: 1, txt: T('Roubar enquanto dorme.', 'Steal them while they sleep.'), resultado: [T('A roupa sai de uma cadeira, de um baú, de um prego na parede. Amanhã alguém vai dar falta e procurar.', 'The clothes come off a chair, out of a chest, off a nail on the wall. Tomorrow someone will miss them and search.')] },
        { id: 'seduzir', gesto: true, preco: 'seduzir', tom: 'doce', testemunha: 1, txt: T('Tirar com as minhas próprias mãos, numa porta dos fundos.', 'Take them off with my own hands, at a back door.'), resultado: [T('Saio vestida. Fica alguém lembrando de uma mulher bonita que não é de lugar nenhum.', 'I leave dressed. Someone is left remembering a beautiful woman from nowhere at all.')] },
        { id: 'matar', gesto: true, preco: 'matar', tom: 'cruel', corpos: 1, alarme: 2, txt: T('Esperar numa rua sem luz.', 'Wait in an unlit street.'), resultado: [T('A lâmina sai da manga e volta. Um bueiro da Rua das Fontes desce até a cisterna, e a água da cidade aceita.', 'The blade leaves my sleeve and comes back. A drain on Fountain Street runs down to the cistern, and the city’s water accepts.')] },
      ] } },
  ];
  if (k === 1) pgs.push({ id: 'n1p', noite: 1, zona: 'noite', agua: .16, sal: .4, fundo: { img: IMG('n-tocha'), dim: .45, foco: '55% 45%' },
    texto: [
      T('No caminho, um guarda da ronda levanta a tocha para ver quem passa.', 'On the way, a watchman raises his torch to see who is passing.'),
      T('A chama chega perto demais do meu rosto, e o calor me pega de surpresa.', 'The flame comes too close to my face, and the heat catches me by surprise.'),
    ],
    piscar: { id: 'p3', antes: 2, aoFalhar: (st) => { st.alarme += 1; },
      ok: [T('Fecho os olhos contra a luz, como todo mundo faz. Ele baixa a tocha e segue.', 'I shut my eyes against the light, as anyone would. He lowers the torch and walks on.')],
      falha: [T('Demoro. A tocha para no ar. — Os seus olhos… — ele começa, e eu já estou na outra esquina.', 'I’m too slow. The torch stops in the air. — Your eyes… — he begins, and I am already around the corner.')] } });
  pgs.push(
    { id: 'n' + k + 'j', noite: k, se: (st) => alvo(st) !== 'mapas', zona: 'dentro', agua: .15, sal: .36 + k * .08, fundo: (st) => ({ img: window.LIVRO.anzol[alvo(st)].img, dim: .48, lado: 'dir', foco: '35% 40%' }),
      texto: [T('Entro. O rosto passa.', 'I go in. The face gets through.')],
      minijogo: 'anzol', jogoId: 'noite' + k, mgNome: (st) => NOMES_ALVO[alvo(st)],
      aoTerminar: (st, r, ctx) => { ctx.guarda(alvo(st)); },
      depois: (st) => window.LIVRO.anzol[alvo(st)].fim[J(st, 'noite' + k).resultado || 'nada'] },
    { id: 'n' + k + 'o', noite: k, se: (st) => alvo(st) === 'mapas', zona: 'dentro', agua: .15, sal: .36 + k * .08, fundo: { img: IMG('n-mapas'), dim: .45, foco: '55% 45%' },
      texto: [T('Os relatórios do conselho estão numa pasta de couro em cima da mesa grande, cinco papéis com selo. Só quem lê em voz alta abre a pasta antes do conselho.', 'The council’s reports lie in a leather folder on the great table, five sealed papers. Only the one who reads them aloud opens the folder before council.')],
      minijogo: 'ordem', jogoId: 'noite' + k, mgNome: T('Os papéis do conselho', 'The council’s papers'),
      depois: ordemFim });
  return pgs;
}

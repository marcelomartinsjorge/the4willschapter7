
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
      interrogatorio: { ouro: it.ouro || 0, vermelho: it.verm || 0, termos: termos(st), nome: (it.flags || []).includes('nome') },
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

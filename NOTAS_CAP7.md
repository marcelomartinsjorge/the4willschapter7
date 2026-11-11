# Cap. VII · A Madrinha — A Mulher Sem Nome · Notas da v1

*06/11/2026. Feito sobre o `CAP7_ESQUELETO_v2.md` aprovado, com as suas respostas (Nymae = povo dela, Merés = sereias, “a Madrinha”, Redom sem nome para ela, Consorte só com romance).*

## O que tem no pacote
- `index.html` · o livro
- `capitulo7.js` · o roteiro: páginas, escolhas, a Coleção, os dados dos jogos e a tela final, com os textos em par `T('português', 'english')`; o inglês é o original
- `motor7.js` · o motor: a água, o sal, a frase de ouro, o medalhão, a Coleção, o “Fechar os olhos”, a dor, os avisos que se afogam, as escolhas, o som, a pontuação e a tela final
- `jogos7.js` · os sete minijogos
- `livro.css` + `content/cap07/tema.css` · o visual
- `content/cap07/chapter-config.js` · o codex impessoal (Orla Trêmula, Nymae, Merés, Nove Mastros, Alvena, a Sentença, Redom, Capital Branca, Ala Funda, pedra surda, o Cavaleiro e a Juíza, e os três do Cap. VI)
- `MIDIAS_CAP7.md` · tudo o que falta gerar, com contexto de cada cena
- `tools/` · o robô que joga o capítulo, as fotos de conferência e a checagem do texto (não precisa subir no GitHub)
- `assets/` · as provisórias (telas escuras com o nome do arquivo) e a silhueta dos rostos

## Os sistemas dela (o que o jogador sente)
| Sistema | O que é | Onde aparece |
|---|---|---|
| **A água** | a tela refrata como água: forte debaixo d’água e na Orla, fraca em Redom, nenhuma na pedra surda | o capítulo inteiro |
| **O sal** | uma crosta fina que cresce nas bordas conforme ela seca; some um pouco na cisterna e volta maior | da estrada até a coluna |
| **A frase** | *Laura leva os melhores à Boca Seca*, em ouro velho no alto. “Laura” e “Boca Seca” ficam turvas até ela saber o que são | a01 (nasce), a06 (Laura), Alvena ou a Morta (Boca Seca), b06 (fica sob a pedra), d10 (brilha), e05 (completa) |
| **O véu** | o medalhão no alto mostra o rosto que ela está usando; fica cinza na pedra; acende quando o ouro vaza | o capítulo inteiro |
| **A Coleção** | o codex dela: um cartão por rosto (Quer · Não diz · Disse). Abre tocando no medalhão ou com a tecla C. As opções que nascem dela mostram o rostinho de quem contou | 50 cartões possíveis |
| **Fechar os olhos** | o ouro vaza pelo rosto emprestado; um toque duplo no fôlego (2,4 s na primeira vez, com a dica; 1,6 s depois) | a10, l01, n1p, e04 |
| **Os avisos** | “Lio vai lembrar disso.” Na Sentença, os avisos da tripulação voltam, afundam e ficam só um: “Ninguém vai lembrar disso.” | a05, a11, a12, b02, b04b, c05, l02 |
| **O tom e o alarme** | escondidos. O tom (doce, fria, cruel, divertida) escolhe a frase da tela final; o alarme decide os lugares da coluna e o que a Laura vai notar no Cap. VIII | o capítulo inteiro |

## O mapa do capítulo (67 páginas; cada partida vê 60)
**I · A Água** · a01 o fundo · a02 a escada · a03 a velha · a04/a05 os chefes (**ESCOLHA** `chefes`) · a06 a moeda · a07 a Iska (**ESCOLHA** `roupa1`: roubar, seduzir, matar) · a08 a primeira metamorfose · a09 Alvena (**JOGO** Ouvir, 3 de 5) · a10 o soldado (**Fechar os olhos 1**) · a11 a tripulação (**JOGO** 3 de 5) · a12 a noite de partir (uma conversa com cada um dos três)
**II · A Sentença** · b01 o mar · b02 a ordem (**ESCOLHA** `ordem`) · b03 (**JOGO** Abrir a mão) · b04 quem morre como (**ESCOLHA** `rosto`) · b04b os avisos afundam · b05 (**JOGO** A Morta) · b06 a pedra surda · b07 a estrada
**III · A Ala Funda** · c01 a escada (**ESCOLHA** `carcereiro`) · c02 a dor · c03 a Laura entra · c04 (**JOGO** A Lâmina) · c05 o cartão dela
**IV · Os Pequenos** · d01 sumir (três versões: a palavra, a sombra, a argola) · d02 a cisterna · d03 o laço · **três noites** (dia: Ouvir 1 de 3; noite: o alvo, o rosto, a roupa, o Anzol ou a Ordem) · entre a 1ª e a 2ª, a lavadeira (**Fechar os olhos 2**, **ESCOLHA** `lavadeira`) · na 1ª noite, a tocha (**Fechar os olhos 3**) · d10 a notícia
**V · A Coluna** · e01 o último rosto (**ESCOLHA** `disfarce`, depende do alarme) · e02 a roupa · e03 a água (**ESCOLHA** `agua`) · e04 a revista (**Fechar os olhos 4**) · e05 a saída

## Os minijogos (pela régua do prompt de auditoria)
| Jogo | Verbo | O interesse | Risco a testar com gente de fora |
|---|---|---|---|
| **Ouvir** | escolher quem ouvir | o tempo não dá para todos; quem você ouve vira rosto e porta | nenhum: é curto |
| **Tripulação** | escolher três | gostar de quem vai morrer | nenhum |
| **Abrir a mão** | um toque, e o quando | antes da salva, a água dela mata a tripulação; depois, as bestas. Depois do toque, dez segundos sem controle | a pessoa entende que pode esperar? (Se ninguém espera, a rota “tarde” some na prática) |
| **A Morta** | não tocar | quem espera ouve segredos que viram cartões e portas; o primeiro toque é de graça, o segundo dói | a pessoa acha que travou e toca? Na segunda vez que joga, espera? |
| **O Anzol** | fazer o outro dizer | a frase de ouro acende palavra por palavra; Porta (da Coleção) e Pergunta acendem; o Silêncio funciona com quem fala demais; o Direto apaga duas e deixa uma farpa (duas farpas, ele fecha a conversa). O rosto certo dá uma palavra de presente | o Direto parece a resposta certa na primeira vez? (É o erro que ensina.) Três noites cansam? |
| **A Lâmina** | o Anzol ao contrário | duas frases: a de ouro (ela) e a vermelha (a Laura). Mentir acende o vermelho sozinho, porque as orelhas falam. O ouro sempre se completa; o vermelho decide a saída: a palavra (até 2), a sombra (3 a 5), a argola (6 ou mais, ou “Fui eu”) | o vermelho sobe rápido demais para quem joga honesto? |
| **A Ordem** | mudar a ordem de papéis verdadeiros | nenhuma palavra muda; a ordem muda o sentido. Deixar como está dá “acabou”; o sentinela em cima e a Pira para o norte embaixo dá “agora ou nunca” | a pessoa descobre sem dica qual ordem empurra? (A dica diz como jogar, não qual é a ordem.) |
| **Fechar os olhos** | toque duplo no fôlego | raro de propósito; cada falha custa pouco e fica (alarme, o intendente) | o toque duplo dá zoom em algum celular? (Travado no CSS, mas conferir num iPhone.) |

**Pontuação escondida (cap07):** o Anzol (até 10.500), a Morta (até 4.450), os olhos (até 3.600), a Ala Funda (até 4.200). Vai para o Supabase e soma a jornada.

## O que o capítulo lê dos anteriores
- `cap4.noite` e `cap4.beijoJustine`: o círculo da Laura. **Markus** é o Consorte se a noite foi com ele; **Justine** é a Consorte se houve o beijo; sem romance, sem consorte (Markus marechal, Justine casada com Joseph). Quem não jogou o Cap. IV cai no “sem romance”.
- `cap4.varr` (ajudar, errar, recusar): o que o sargento Horne conta do Lorde Varr e a primeira porta do Anzol dele.
- `cap6.rangido`: lido, mas sem efeito nesta versão (o sentinela conta o mesmo nas duas rotas).

## O que o capítulo grava para o Cap. VIII (`aqv_estado.cap7`)
`tripulacao` (quem e o que ela disse a cada um) · `ordem` · `abriuMao` (cedo/tarde) · `rosto` · `morta` (toques, falas ouvidas) · `carcereiro` · `interrogatorio` (ouro, vermelho, termos) · `semente` (falou da Boca Seca à Laura) · `usouSimon` · `confessou` · `fuga` e `polegar` (a mão enfaixada) · `alvos` (alvo, rosto, roupa e resultado de cada noite) · `lavadeira` (levantou, usou: **ela está na coluna**, ou matou) · `piscadas` · `rostos` · `corpos` · `testemunhas` · `alarme` · `disfarce` · `agua` · `intendenteViu` · `tom` · `colecao` · `consorte`.
**Sinais que o Cap. VIII pode dar ao jogador:** a moeda nos nós dos dedos de um servo; a mão enfaixada (se ela quebrou o polegar); a Nymae que carrega água (se usou a lavadeira); o servo que bebe dos cochos; o intendente franzindo a testa; guardas dobrados (alarme).

## A checagem do texto (Etapa 0, script enxuto em `tools/checa7.py`)
O script do projeto (`checagem_texto.py`) não estava nesta sessão; fiz uma versão enxuta com a mesma lista fixa de muletas, os vícios #2, #4, #5, #8 e #15, os moldes de 3 palavras em 4+ linhas e as palavras que ela não pode dizer. Resultado depois do passe:

| Muleta | Conta |
|---|---|
| ninguém | 3 (fora os motivos) |
| inteiro/a | 2 |
| devagar · do jeito que · fica olhando | 1 cada |
| as outras | 0 |

Ela nunca diz medo, deus, jogo, peça, destino ou vontade. Os moldes que voltam são nomes (casa da Ondina, Canal das Garças, Ala Funda, comandante Simon) ou ecos de propósito (abaixo).

**D1 · Motivos para declarar no Anexo A** (quando você aprovar, entram no bloco `motivos cap07`):
```motivos cap07
Ninguém vai lembrar disso | fórmula da tela: o aviso que afoga os outros (b04b) e a lavadeira morta
Ninguém morre hoje | a mentira dela à tripulação (e a linha da tela final)
dura igual Grakh | a fala do soldado que o briefing pediu
pelos nós dos meus dedos | a moeda: o gesto dela
manda o prato de volta cheio | o eco da Laura que não come: o soldado da Sentença, o Markus, a Justine
Fecho os olhos | o reflexo do véu (quatro vezes, uma por cena)
em voz alta | o Anzol: o outro diz em voz alta
```
```gestos cap07
nomes: Markus, Justine, Joseph, Laura, Simon
pelos nós dos meus dedos | a Madrinha
pelo nariz | Markus
pena entre os dentes | Justine
taça gira | Joseph
ri sozinho | Joseph
```

## Decisões que tomei e que você pode mudar
- **D2 · “à Boca Seca”.** O briefing tinha “Laura leva os melhores ao Boca Seca”. Os Caps. V e VI dizem “a Boca Seca” (feminino); usei “à”. Em inglês: *Laura takes the best to the Dry Mouth.*
- **D3 · As idades em Redom aos 36 da Laura (ano 51).** Markus 48 (fim dos vinte no Cap. IV), Joseph 61, Justine 36, Lorde Varr 38, Maud 36. O esqueleto dizia “Markus 37”: estava errado.
- **D4 · Coisas que inventei sobre gente que você criou:** o Markus treinou o Simon com espada de pau aos nove anos; o Simon odiava vela (“cheira a velório”); o Joseph disse ao pai da Laura que escaramuça não acaba a guerra. Se alguma contradiz o que você imagina, eu troco.
- **D5 · O nome do Kronk em Redom:** “o Grakh grande”. Redom não dá apelido; é o que um sentinela diria.
- **D6 · A frase que a Laura diz no fim do interrogatório** é a frase de ouro: *“Volte e ponha a Orla de joelhos.”* É ela quem completa o Anzol da avatar, com a boca dela.
- **D7 · A Sentença não afunda, e a Madrinha só “abre a mão” uma vez no capítulo.** Toda a outra magia dela é o rosto. Assim a magia grande fica guardada para o Cap. IX.
- **D8 · A pedra surda:** “a pedra que bebe”; os ferreiros que a trabalham ficam surdos de um ouvido, e daí o nome (está no codex).
- **D9 · Dublagem:** só a voz dela é dublada (D01 a D19). As falas da Laura, dos soldados da Sentença e dos alvos aparecem só em texto.

## v3 · Reescrita das partes I a III (10/11)
O plano está em `CAP7_REESCRITA_v3_PLANO.md`. Esta seção diz o que entrou no código.

- **A voz dela:** saíram cantar junto, rezar junto, comprar vela, "eu não durmo" e a aposta da moeda. Os quatro tons agora são Mel, Água parada, Lâmina e Gato, e em todos ela dobra alguém. Ela só usa reza, canção ou nome que ouviu antes, na tela.
- **Parte I:** passou de 12 para 19 páginas por partida.
  - **Páginas novas:**
    - **a02b:** o cais de joelhos;
    - **a03b:** a velha conta o mito, e as moedas da saia são de quem pediu;
    - **a05c:** as oferendas, uma escolha nova;
    - **a06b:** a moeda vira a Lâmina, e entra a casa da Ondina;
    - **a06c:** o plano: "preciso que a Sentença me pegue. Viva.";
    - **a07:** a Iska na taverna, com a cicatriz vista.
  - **O menino da moeda:** moeda do inimigo é a que mais pede.
  - **Os chefes:** ganharam uma quarta opção, Lâmina: "Sarnai, quem da sua casa vendeu a rota?"
- **Alvena:** são três perguntas na tela, com respostas marcadas, e as pessoas indicam umas às outras. O que ela aprende muda a Parte II:
  - **rota:** o dia certo;
  - **vivos:** a frase antes de abrir os olhos;
  - **perto:** boiar como afogado.
- **Tripulação:** a lealdade é escondida e nasce do que cada um é. Muda nas noites e cai se ela mentiu sobre os recifes ou se esperaram três noites sem saber o dia.
  - **O motim:** diante da Sentença, o primeiro sem lealdade tenta virar o barco. As saídas são "Ninguém morre hoje", tomar o leme, a lâmina, ou dar ao amotinado uma razão para ficar.
  - **O estrago:** Maru de lado quebra o mastro, Brann derruba o mestre dos besteiros, e Teshka aborda e morre no convés deles.
  - **A Nhalé:** se ela é leal, salva o último que estende a mão, e ele volta para a Orla. Isso aparece na Coleção e no fim.
- **A Morta:** agora serve para ouvir: "Não se mexa. Quem se mexe para de ouvir." A página nova b05b mostra que ela é presa porque abre os olhos de propósito, e ela escolhe o jeito. As falas dos soldados mudam com o estrago.
- **Ala Funda:** ela trabalha dois carcereiros, com as opções novas, e cada um dá uma pista sobre a Laura.
  - **c03b:** antes do interrogatório, mostra o que ela sabe, linha por linha, e o que ela quer.
  - **Na Lâmina:** cada resposta com rosto mostra "de: fulano", e a Laura reage a cada resposta (inclina-se, guarda a resposta, uma mão vai à espada, olha as orelhas).
- **Os olhos:** a Laura agora diz "Nenhum tinha olho que acende quando a tocha baixa."
- **A Coleção:**
  - os cartões estão agrupados por lugar, e os que abrem uma opção na tela vêm primeiro com o selo "serve agora";
  - o aviso de cartão novo mostra o que ela aprendeu;
  - os campos só dizem o que apareceu na tela.
- **Partes IV e V:**
  - cada manhã repete na cidade o efeito da noite anterior, e no 3º dia a guarda dobra se houve alarme;
  - o Ansel muda o relato conforme o Kronk olhou o Simon até parar ou acabou com ele (Cap. VI);
  - saíram mais quatro frases com vício;
  - o Markus treinou o Simon depois do Torneio, aos 15 anos, e não aos 9.
- **Codex:** entrou a casa da Ondina.
- **Mídias novas:** a §7 do `MIDIAS_CAP7.md` traz 6 imagens, o vídeo da onda e as falas D20 a D23.
- **Testes:** 15 partidas automáticas passaram por todos os caminhos novos (motim com lâmina e com razão para ficar, Nhalé salvando, os três jeitos de abrir os olhos), sem erro de script e sem arquivo faltando além dos novos.

## v3.2 · Feedback de leitura (10/11)
- **Respiro depois de Alvena:** a a11 virou uma noite calma. Ela tira o rosto da Iska, senta com os pés na água, e o que ouviu em Alvena vira plano na boca dela ("Nove dias, no Canal das Garças. Sei onde esperar."). O recrutamento foi para uma página própria (a11b). O "depois" de Alvena ficou com uma linha só.
- **Três tripulantes, com motivo:** "O barco tem quatro lugares, e o quarto é meu."
- **b01 sem "é o primeiro a entender":** a faca da Teshka para no meio da lâmina, a canção do Maru acaba no meio de um verso, e o Brann começa a contar as setas.
- **Carcereiros reconhecíveis:** cada um tem nome e som num parágrafo próprio, entra na Coleção com rosto quando aparece, e as opções mostram o rosto de cada um.
- **"A cada tantas horas"** virou "de tempos em tempos, sem hora certa".
- **A Laura sem dossiê:** cada coisa que ela sabe sai de algo que vê na Laura (ela não traz papel, tem pulsos finos para mãos com calos, uma faixa de luto no braço, senta na ponta do banco, olha as moedas da saia). A ligação com a moeda ficou explícita ("a moeda que o menino me deu"), com o tilintar da moeda.
- **As duas frases:** depois da D23 entra "Volte e ponha a Orla de joelhos. Quero ouvir isso da boca dela." No interrogatório, a frase de ouro tem o rótulo "o que eu quero ouvir da boca dela" e a vermelha tem "o que ela vai concluir de mim". Nas noites, o rótulo é "o que eu quero ouvir dessa boca". A frase que ela carrega desde o fundo continua só no alto da tela, fora dos jogos.
- **O que a Laura conta:** em c05, "Agora sei o que ela contava desde a porta: as minhas orelhas."
- **A Mira pelo nome:** em b05 e na estalagem.
- **As três noites:**
  - antes de escolher o alvo, ela diz o objetivo e quantas frases dela já andam pela cidade;
  - de manhã, a frase da noite aparece concreta na boca dos pequenos (inteira ou pela metade);
  - a Sala dos Mapas diz por onde a leitura começou e onde terminou, e por que o conselho reagiu daquele jeito.
- **Correção:** quando ela mata o Edric e lê os papéis com a voz dele, o texto agora diz "eu leio" (antes saía "eu mesma, com a voz do Edric, lê").

## v3.1 · Passe de voz da Madrinha e mídias da reescrita (10/11)
- **Mídias instaladas:** as 6 imagens da §7 (o cais, as oferendas, a moeda, a Iska, os olhos e a casa da Ondina), o vídeo da onda, as falas D20 a D23 e as versões novas de `d02-cisterna.mp4` e `b07-carroca.mp4`. O capítulo não tem mais nenhuma mídia faltando.
- **A onda:** o vídeo foi cortado em 6,9 s, porque o fim original escurece. Agora ele entra junto com o recuo do mar (1,9 s depois do toque), o rugido toca quando a parede de água sobe e o branco entra quando a espuma cobre a tela.
- **Painel trocado de lado** para não cobrir o assunto: a moeda (a06b, a06c) e o rosto dela no convés (b05b).
- **Texto ajustado às imagens:** a casa da Ondina anota as dívidas na parede da frente (o codex dizia "dos fundos"), e a Laura tem "o rosto da moeda, com o queixo mais baixo".
- **Passe de voz (teste: "uma pessoa comum diria isso?"):** saíram as frases que explicavam a regra dela em vez de mostrar, como "vi e ouvi", "falta a roupa, porque a roupa não muda comigo", "o que eles veem em mim eu ainda não sei", "não confirmo e não desminto", "isso é perigoso", "faço a conta e não gosto do resultado" e "sinto muito pelo seu irmão". No lugar delas entraram frases em que ela toma, cobra ou lê o desejo do outro. Os carcereiros: ela dá ao Wim uma palavra errada para a canção e ri do Pell quando ele erra o verso, em vez de cantar ou rezar junto.
- **Moldes cortados:** as três mesas da noite (Justine, Joseph e Varr) usavam o mesmo "fica calado e ele fala por dois". Agora cada uma é diferente. "Ninguém" caiu de 16 para 8.
- **Correções:** "a lança no ombro" virou "a ponta da lança" (era seta no ombro). "A última coisa que ela tenta dizer" estava errado quando o último é homem. "Eu já disse para não brincar" só aparece se ela brincou antes.

### Regravar (D02 regravada e instalada em 10/11; o antigo ficou fora do pacote)
- **D02.** A frase "and I let her, because it is lovely to be expected" explica o gosto em vez de mostrar. Sugestão: *"She kisses my fingers. I leave my hand there as long as she needs."* (PT: "Ela beija meus dedos. Deixo a mão ali o tempo que ela precisar.")

### Motivos do capítulo (proposta D1, falta o ok do autor)
O script trava em 30 grupos de 3 palavras. Quase todos são nomes próprios (casa da Ondina, Canal das Garças, Boca Seca, comandante Simon, Sala dos Mapas), a fórmula "vai lembrar disso" e cartões da Coleção que repetem de propósito o que a pessoa disse. O bloco proposto está em `_midias/motivos_cap07.md`. Com ele, nenhum grupo fica ACIMA, e todas as muletas ficam dentro do limite.

## v1.1 · Mídias instaladas (10/11)
- **Instalado:** 51 imagens de página, a capa, 10 do codex, 46 rostos, 5 vídeos, 14 trilhas de fundo, 18 efeitos e as 19 falas dela.
- **Compressão:** as trilhas foram cortadas em até 60 s, com emenda cruzada de 3 s para o laço não estalar, e niveladas no mesmo volume (MP3 96 kbps). Os vídeos ficaram em 1280×720 e sem áudio, e as imagens em JPG. As mídias caíram de cerca de 560 MB para 35 MB.
- **Ajustes de texto para bater com as imagens:**
  - a velha agora ri "com uma boca quase sem dente";
  - o cabelo da Laura agora está solto;
  - "ela fala para quem está atrás dela" (antes era "o homem", que estava errado na rota da Justine);
  - a fala do Maru depois de "Conheço" ficou clara.
- **Entregues depois (10/11):** os vídeos a01-fundo, a08-metamorfose e b02-sentenca, e os rostos capa, capitao, desertor, grisalho, hobb, padre e pedagio. O Maru foi refeito.
- **Não falta mais nenhum rosto, vídeo ou imagem** da lista do capítulo.
- **Refazer se quiser (◻):** resolvido na v3.1 (a Iska nova e a cisterna em 720p).

## Pendências
- Nenhuma mídia faltando. No vídeo da onda, o casco da galera tem "REDOM" pintado. Passa rápido, mas se quiser refazer, peça sem letreiro.
- O botão final do Cap. VI ainda aponta para nada: quando o Cap. VII estiver no ar, troque `proximo.url` no `capitulo6.js` para o endereço novo.
- Teste com 3 a 5 leitores de fora: os riscos da tabela dos jogos.

## Instalar
Use o `subir_cap7.ps1`. Ele descompacta o zip da pasta Downloads, copia para `C:\projetos\the4willschapter7` e faz o commit e o push. Na primeira vez, ligue o Pages em Settings > Pages > Branch `main` / `(root)`. Para as próximas versões, é só rodar de novo.

O endereço fica `https://marcelomartinsjorge.github.io/the4willschapter7/`.

---

## v4 · 10/11/2026 · o feedback jogando o capítulo inteiro

**Estrutura nova depois da cela.** A Laura manda a Madrinha a Nove Mastros com o comandante Aubert (a escolta muda com os termos do interrogatório: palavra, sombra ou argola). Lá ela convence os três chefes diante do caderno dele (Parte IV · A Trégua, três escolhas: Sarnai, Ossian, Ruo; cada resposta conta chefes convencidos e o quanto o caderno desconfia). Se só uma casa assina, a Laura a devolve à Ala Funda e o capítulo volta ao início da Parte IV. Com duas ou três, a carta pede três meses sem pirataria "enquanto as casas decidem", Redom vê as velas sumirem, e a Laura a guarda como hóspede num quarto em cima do templo do Cavaleiro, sobre a cisterna. As semanas passam; a coluna é montada há um mês; o conselho decide em três dias. As noites são saídas escondidas pela laje e pelo bueiro, com volta antes do sol. No fim, a Laura cumpre a palavra e a manda de volta à Orla com escolta (Greta ou a sombra), e ela some e entra na coluna (Parte VI).

**Checkpoint.** O cartão da Parte IV guarda o estado inteiro. Três desvios voltam para ele: três erros na Capital (presa), trégua com uma casa só, conselho não convencido (pontos das noites: cheia 2, meia 1; precisa de 4). O botão diz "Tentar de novo". `st.tentativas` conta as voltas.

**Método com consequência.** Cada rosto (14 nas noites, 4 na coluna, Greta, a sombra, o ferreiro) tem um jeito certo, um meio e um errado; a pista está na descrição do rosto ("dorme sozinha na sacristia e confessa tudo de manhã"). O errado conta um erro e mostra aviso ("A Capital começou a procurar." / "Mais um rastro, e a Capital me acha."); olho que vaza na Capital (tocha, lavadeira) também conta. Tabela em `METODO` e `METODO_C` (a_head.js).

**A Sala dos Mapas** é sempre a terceira noite. O terceiro dia oferece o Edric (rosto), um guarda (pista: ninguém olha para o Edric) ou a criada que serve água ao conselho (pista: o último papel é o que eles levam para o almoço). Depois de "Deixar assim", ela ensaia a leitura: cada papel acende e a mesa murmura, conforme a posição.

**A magia (b03).** Narração de concentração antes; minijogo novo inspirado no do Aheryn: brilhos dourados sobem da água funda, tocar antes de apagar enche a barra; o vermelho é o convés e custa água; acelera perto do fim ("Qualquer outra já teria soltado."). Cheia, ela escolhe a hora de abrir a mão. A salva vem aos 22 s: quem demora a encher já solta "tarde". Depois: a onda varre o convés, o número de mortos de Redom soma o que a tripulação fez (14 a 26), Nhalé puxa soldados para o fundo, os dedos dela não fecham mais.

**Outros pontos do feedback, um por um:**
- Rota vendida: o Ruo agora conta que o irmão saiu por uma rota que só três casas conheciam e a galera já esperava. O D04 (dublado) fica claro depois disso. Cartão do Ruo atualizado.
- "Luva molhada" saiu: ela devolve o rosto da Iska com nojo da boca dela.
- Olhos: "estranhos/esquisitos" viraram "acesos demais".
- Segunda noite no mar com cada tripulante (a13*): Maru e o olho, Lio e o fundo, Teshka e a faca, Nhalé e o secar, Brann e a gaivota. A Nhalé não pergunta mais de cheiro: estava na roda que cantava quando ela acordou.
- Fingir de morta: os soldados acham que ela morreu do começo ao fim; "resistente igual Grakh" só quando descobrem que está viva (b05b).
- Ala Funda: ela aprende tudo pelo que ouve (rampa, soldados, sargento gritando os nomes).
- D23 ganhou o complemento: os Grakh estão no fim, por isso os homens dela foram para a costa; ela quer levá-los ao deserto.
- "Contava as minhas orelhas" virou "as vezes em que o ouro acendia nos meus olhos".
- O ferreiro virou cena (bueiro, forja, martelo), e a opção diz o que faz: "obrigá-lo a abrir a argola e depois matá-lo".
- Tela tremendo: a água só refrata debaixo d'água (a01, b03, b04, cisterna).
- Primeiro dia: ela anda com o próprio rosto e o guarda atrás; o jogo diz "Ouvir um, guardar o rosto"; a pergunta da noite é "Que rosto eu visto esta noite?".
- "4 dias" saiu. Português: "esperar que me ofereça a roupa", "deixar que me dê a roupa", próclise no começo de frase na narração, tempos verbais.

**Checagem (PROMPT_MESTRE v5.4):** muletas dentro do limite (ninguém 7, inteiro 4, devagar 6); moldes ACIMA: 0, com o bloco `motivos cap07` aprovado e instalado (mais 6 motivos novos: guarda da Cidadela, o Lorde Varr, Viúvas do Sal, o comandante Aubert, bate na quilha, resistente igual Grakh).

---

## v5 · 10/11/2026 · a voz da Madrinha (MADRINHA_VOZ v2)

**Os tons viraram verbos.** Toda escolha conta `seduzir`, `intimidar` ou `manipular` (o motor converte os tons antigos de saves velhos). O resumo final diz qual ela mais usou. Os rótulos "· roubar / · seduzir / · matar" que o estilo pendurava nos botões das noites saíram: o botão mostra só o gesto ou a fala.

**Reescrito com a voz nova:**
- Orla: a água fica lisa quando ela sobe a escada; os chefes (cada um ouve o seu pedido; o vinho sobe das taças; o silêncio que os faz oferecer mais; a pergunta da rota vendida); a fila (o mentiroso coça a orelha).
- A tripulação como **oferenda ao mar**: as casas trazem os seus melhores aos degraus; ser dado ao mar não é morrer. Textos do minijogo da tripulação, cartões (Teshka quer que o mar devolva o que levou; Brann quer ver se a Madrinha é tinta; Maru quer pegar a Sentença pelos recifes).
- As duas noites no mar, para os cinco: sem "quanto paga", sem verso cantado errado, sem puxar a Nhalé da água, sem tirar a besta do Brann. Magia à vista: a corrente que vira o barco, a chuva sem sal para o Lio, o mar liso que mostra o canal, a língua d'água que leva a gaivota, o sangue que volta para o corte. Lealdades e flags (maruLado, brannAtira, brannGuarda, teshkaGalera, nhaleAjuda) mantidas.
- O canal: a tripulação queria cair de noite pelos recifes; ela vai de dia, à vista. Motim da Teshka reescrito. "Vocês foram dados ao mar. O mar já aceitou."
- **A onda dosada:** ela segura o mar ("O mar quer subir todo. Seguro."), fecha a mão um dedo de cada vez, e os dedos tremem de segurar, não de cansaço.
- O porão da Sentença: três presos da Orla se ajoelham para ela (a prova que a Laura ouve do guarda).
- Carcereiros: Wim pelo olhar, Garrick pelo nome, Pell pela pergunta sobre a Juíza (nada de rir da reza), Dunstan pela moeda.
- **Interrogatório remontado:** a Laura conhece o mito ("Li sobre ela, num livro de povos de fora, ao lado do dragão do norte"); cada opção responde à pergunta feita; "Fui eu" vale mais e custa mais; a pergunta assenta 1,5 s antes das opções. **Ouro abaixo de 6: a Laura decreta a execução**, a página `morte` mostra o pátio, e "Tentar de novo" volta ao começo do interrogatório (c04 é ponto de volta).
- Nove Mastros: a Sarnai reza **para a Madrinha** e pergunta se ela ouviu; a resposta certa é no ouvido: "— Tenho certeza que sim, querida." O "Não peça a mim. Peça a ele." faz a reza acabar (errada). Ossian: contar barcos (certo), sentar ao lado dele (certo, mas o caderno anota um lado). Ruo: a moeda.
- Argola, lavadeira, Greta, sombra, coluna: tons novos e gestos sem pedir.
- **A frase inteira:** no fim da coluna, depois do D19, a frase continua sozinha no ouro: *Laura leva os melhores à Boca Seca, e a Boca Seca bebe todos.* Toca a D24.

**Checagem:** muletas dentro do limite (devagar 9, ninguém 7, inteiro 5); moldes ACIMA: 0.

---

## v5.1 · 11/11/2026 · o teu teste até a onda

- **A velha da escada:** sem "conta"; ela se ajoelha e o choro escorre nos pés da Madrinha, que recua para não molhar a saia e sorri; ela toma o sorriso por bênção. Espera os chefes das maiores casas (não "os mais velhos"). A Sentença: "Desde que a Lâmina subiu, cada ano é pior que o outro. O mar está ficando vermelho, Madrinha. Vermelho das bandeirolas de Redom."
- **A cabine:** "Cada uma acha que é mais importante que as outras duas." Ruo: "Conheço esse olhar: desconfia de mim. Dou a ele o meu melhor sorriso." "E eu, de algum jeito, sei todos eles, como se a Orla fosse a minha enseada." Toda resposta fecha a conversa: o navio passa a ser dela e ela recebe o povo ao nascer do sol. Rota da Sarnai: "Não existe segredo entre um peixe e o mar." O vinho que subia virou o navio inteiro subindo um palmo.
- **Alvena e a Iska:** Alvena é de Redom (meio dia de vela, na costa). Na Orla ninguém precisa ser enganado: três mulheres humanas oferecem rosto e roupa; ela fica com a Iska porque os soldados de Alvena conhecem a cara dela. A escolha agora é o que fazer com a Iska: no colo, saber a verdade da cicatriz (um soldado de dente de ouro, que aparece no mercado); mandá-la se esconder, porque Alvena não pode ver duas; ou garantir na ponte que só exista uma. Saiu o varal.
- **As noites no mar viraram uma noite só, a véspera do canal:** cada tripulante recebe uma tarefa (Maru vira o barco de lado, Lio rema quando os outros quiserem voltar, Teshka sobe primeiro, Nhalé leva de volta quem cair perto, Brann derruba o oficial da proa). O jeito de dar a tarefa muda a lealdade. Saíram a gaivota, o "seca ou não seca", a faca na mão, o "quanto paga". Brann: "truque barato com caneca d'água".
- **A Sentença chama antes de atirar** (página nova b02c): o oficial da trombeta pede casa, carga e destino. Ela pode tentar poupar todos ("Sou a dona da Orla. Levem a mim"), chamá-lo para buscá-la (a galera encosta, e a onda leva os besteiros de uma vez) ou mandar virar. Tudo acaba nas bestas. É esse oficial que o Brann derruba.
- **A onda:** "Ela acorda borbulhando, como se a água sentisse raiva." O minijogo ganhou som: gota que afina conforme o mar sobe, pancada de convés no vermelho, escorrido no perdido e um acorde a cada quarto da barra. Depois do Continuar, na linha "A onda é mais alta que os mastros deles", toca o teu `onda-cinematica`.
- **Olhos:** o menino de Alvena vê escama, não ouro.
- **Checagem:** "conta" figurada entrou como muleta de limite zero no script e no PROMPT_MESTRE (v5.5). Muletas e moldes: 0 acima.
- **Imagem nova** `t03-aubert-mesa` instalada.

---

## v5.2 · 11/11/2026 · leitura do capítulo inteiro

Li o capítulo de ponta a ponta, em português, como leitor. O que mudou:
- **A velha:** saiu a "barra da saia" (ela acabou de sair do mar). Ficou: "Choro de gente é mais grosso que água do mar. Tiro o pé de baixo dele, sem pressa, e sorrio para ela."
- **"Meu barco" antes de haver barco:** a Iska dorme no navio dela, e ela senta na popa do navio.
- **Medo:** deusa não leva susto. Em Alvena, quem faz o rosto escorregar é a dor do aperto do soldado; na lavanderia, o peso de tantos olhos.
- **Olhos:** nada mais acende ou denuncia pelo olho. A lavadeira Nymae a reconhece porque a água do tanque fica lisa quando ela passa (o mesmo sinal do cais). O guarda da tocha diz "O seu rosto…". O intendente sente a pele emprestada repuxar no queixo. A tela final diz "O rosto escorregou", não "o ouro vazou".
- **A Laura na cela:** o que ela procurava não era ouro no olho, era medo. "— Já interroguei muitos de vocês. Todos tinham medo de mim. Você, não." / "Agora sei o que ela procurava desde a porta: o meu medo. Não achou." A tela final diz "Ela vai lembrar que você não teve medo."
- **Continuidade da Teshka:** ela não diz mais o nome do Ossian antes de a Madrinha perguntar quem prometeu Alvena.
- **Maru:** não "vem por último" (aparece primeiro); ela vai até ele no leme.
- **Lio:** boia "de boca aberta para o céu, esperando a chuva que eu prometi" (se ela fez chover) ou "com o pano ainda enrolado no braço". O cartão quer "ser dado ao mar no lugar do irmão".
- **Aubert** raspa a cabeça e a barba toda manhã (bate com o retrato).
- **Sarnai:** a narradora não chama a si mesma de "a Madrinha".
- **"Conta" restante, trocado:** o guarda "confere" a hóspede e a argola; Aubert "anota" as velas; os pequenos "sabem" antes dos arautos; Dunstan e "o total nunca dá o que ele quer".
- "dado ao mar" declarado como motivo do capítulo no PROMPT_MESTRE (é o costume da oferenda).

**Checagem:** muletas e moldes dentro do limite (0 ACIMA); robô em duas rotas até a Parte V, sem erro.

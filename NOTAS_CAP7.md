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

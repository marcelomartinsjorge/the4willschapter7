#!/usr/bin/env python3
"""Checagem mecânica do Cap. VII (Etapa 0 do Prompt Mestre v5.3, versão enxuta).
Lê os pares T('pt','en') do roteiro, as strings dos jogos e o codex. Conta as muletas
(fora dos motivos declarados), os vícios #2, #4, #5, #8, #15, as palavras proibidas
na boca dela, os moldes de 3 palavras em 4+ linhas e as palavras mais frequentes."""
import re, sys, collections, unicodedata, os
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def norm(s): return unicodedata.normalize('NFD', s.lower()).encode('ascii', 'ignore').decode()
def le_str(s, i):
    q = s[i]; i += 1; out = []
    while i < len(s) and s[i] != q:
        if s[i] == '\\': out.append(s[i + 1]); i += 2
        else: out.append(s[i]); i += 1
    return ''.join(out), i + 1
def pares(src):
    res = []
    for m in re.finditer(r"\bT\(\s*'", src):
        pt, j = le_str(src, m.end() - 1); k = j
        while k < len(src) and src[k] in ' ,\n': k += 1
        en = None
        if k < len(src) and src[k] == "'": en, k = le_str(src, k)
        res.append((src.count('\n', 0, m.start()) + 1, pt, en))
    return res
MULETAS = {'devagar': r'\bdevagar\b', 'um instante': r'\bum instante\b', 'um tempo': r'\bum tempo\b', 'duas vezes': r'\bduas vezes\b', 'de novo': r'\bde novo\b', 'inteiro/a': r'\binteir[oa]s?\b', 'como quem': r'\bcomo quem\b', 'do jeito que': r'\bdo jeito que\b', 'sem olhar': r'\bsem olhar\b', 'fica olhando': r'\bfic\w* olhando\b', 'ninguém': r'\bningu[eé]m\b'}
MUL_EN = {'slowly': r'\bslowly\b', 'a moment': r'\ba moment\b', 'twice': r'\btwice\b', 'again': r'\bagain\b', 'whole': r'\bwhole\b', 'the way': r'\bthe way\b', 'as if': r'\bas if\b', 'like a': r'\blike a\b', 'no one/nobody': r'\b(no one|nobody)\b'}
VICIOS = {'#2 negação curta': r'[.!?]\s+(?:Mas\s+)?[Nn]ão\s+\w+(?:\s+\w+){0,2}[.!?]\s*$', '#4 não é X, é Y': r'\bnão é\b[^.]{1,40}\.\s*É\b', '#5 comparação': r'\b(como se|do jeito que|como quem|feito um|feito uma|parece|igual)\b', '#8 correção irônica': r'\b(ou seja|o que quer dizer|se essa é a palavra|ou não só)\b', '#15 travessão fora de fala': r'[^\s—]\s—\s[a-záéíóú]'}
PROIBIDAS = r'\b(medo|temo|deus|deusa|jogo|tabuleiro|peça|destino|vontade|véspera)\b'
MOTIVOS = ['ninguem vai lembrar disso', 'ninguem morre hoje', 'dura igual grakh', 'os nos dos meus dedos', 'pelos nos dos meus dedos']
def main():
    rot = open(os.path.join(BASE, 'capitulo7.js'), encoding='utf-8').read()
    jg = open(os.path.join(BASE, 'jogos7.js'), encoding='utf-8').read()
    cx = open(os.path.join(BASE, 'content/cap07/chapter-config.js'), encoding='utf-8').read()
    ps = pares(rot)
    # o codex: frases soltas em pages
    cod = [(0, t, None) for t in re.findall(r"'((?:[^'\\]|\\.){20,})'", cx) if re.search(r'[ãçéíó]| que | de ', t)]
    todos = [p for p in ps if p[1].strip()]
    R = []
    R.append(f'# Checagem · Cap. VII\n\n{len(todos)} pares no roteiro · {len(cod)} frases no codex\n')
    tot = collections.Counter(); onde = collections.defaultdict(list)
    for l, pt, en in todos:
        for fr in re.split(r'(?<=[.!?])\s+', pt):
            if any(m in re.sub(r'[^a-z ]', '', norm(fr)) for m in MOTIVOS): continue
            for n, rx in MULETAS.items():
                k = len(re.findall(rx, fr, re.I))
                if k: tot[n] += k; onde[n].append((l, fr.strip()[:110]))
    R.append('## B · Muletas (limite 10; motivos declarados não contam)\n')
    for n in MULETAS: R.append(f"- {n}: {tot[n]}" + (' **ACIMA**' if tot[n] > 10 else ''))
    for n in MULETAS:
        if tot[n]: R.append(f"  - {n}: " + ' | '.join(f'l.{l} {t}' for l, t in onde[n]))
    totEN = collections.Counter(); ondeEN = collections.defaultdict(list)
    for l, pt, en in todos:
        if not en: continue
        for n, rx in MUL_EN.items():
            k = len(re.findall(rx, en, re.I))
            if k: totEN[n] += k; ondeEN[n].append((l, en[:100]))
    R.append('\n## B-en · Muletas no inglês\n')
    for n in MUL_EN: R.append(f"- {n}: {totEN[n]}" + ((' · ' + ' | '.join(f'l.{l} {t}' for l, t in ondeEN[n][:14])) if totEN[n] else ''))
    R.append('\n## Vícios (para a leitura conferir)\n')
    for l, pt, en in todos:
        for fr in re.split(r'(?<=[.!?])\s+(?=[A-ZÀ-Ú—«])', pt):
            v = [n for n, rx in VICIOS.items() if re.search(rx, fr) and not (n.startswith('#15') and fr.lstrip().startswith(('—', '«')))]
            if v: R.append(f"- l.{l}: {fr.strip()[:140]} → {', '.join(v)}")
    R.append('\n## Palavras que ela não diz (aparecem no texto; conferir se é a boca dela)\n')
    for l, pt, en in todos:
        if re.search(PROIBIDAS, pt, re.I): R.append(f"- l.{l}: {pt[:150]}")
    R.append('\n## Moldes: trechos de 3 palavras em 4+ linhas\n')
    STOP = set('o a os as um uma de da do das dos e que em no na nos nas eu ele ela se me te lhe por para com sem mais ja nao meu minha seu sua'.split())
    gr = collections.defaultdict(set)
    for l, pt, en in todos:
        w = re.findall(r'[a-z]+', norm(pt))
        for i in range(len(w) - 2):
            g = w[i:i + 3]
            if sum(1 for x in g if x not in STOP) >= 2: gr[' '.join(g)].add(l)
    for g, ls in sorted(gr.items(), key=lambda x: -len(x[1])):
        if len(ls) >= 4 and not any(g in m for m in MOTIVOS): R.append(f"- “{g}” · {len(ls)} linhas: {sorted(ls)[:12]}")
    R.append('\n## Palavras de conteúdo mais frequentes\n')
    c = collections.Counter()
    for l, pt, en in todos:
        for w in re.findall(r'[a-z]+', norm(pt)):
            if len(w) >= 5 and w not in ('quando', 'porque', 'depois', 'antes', 'ainda', 'sobre', 'outra', 'outro', 'senhor', 'senhora', 'disso', 'ninguem', 'tambem', 'aqui', 'agora', 'mesmo'): c[w] += 1
    R.append(', '.join(f'{w} ×{n}' for w, n in c.most_common(40)))
    txt = '\n'.join(R)
    if len(sys.argv) > 1: open(sys.argv[1], 'w', encoding='utf-8').write(txt); print('relatório em', sys.argv[1])
    else: print(txt)
main()

# TechFix — IBM-Projeto-1DS-AMS-2025

Site institucional/plataforma de serviços da **TechFix** (manutenção e reparo),
construído em **PHP + HTML, CSS e JavaScript puros** (sem frameworks), com os
dados dos profissionais em JSON.

## Como executar

O projeto usa PHP, portanto **não** funciona via Live Server estático.

No Windows, dê um duplo clique em `serve.bat` ou rode:

```bat
php -S localhost:8000
```

Depois acesse <http://localhost:8000>. O `index.php` redireciona para
`src/pages/home.php`.

Requisitos: PHP 8+ (o `serve.bat` procura o `php` no `PATH` e usa
`%USERPROFILE%\php\php.exe` como fallback).

## Estrutura de pastas

```
/
├─ index.php            # ponto de entrada (redireciona para a home)
├─ serve.bat            # sobe o servidor embutido do PHP
├─ src/
│  ├─ pages/            # páginas (.php)
│  └─ partials/         # header.php e footer.php compartilhados
├─ assets/
│  ├─ css/              # folhas de estilo (base.css carrega por último)
│  ├─ js/               # scripts por página + utilitários globais
│  └─ img/              # imagens (Perfis/, Projetos/, Sobre/ e arquivos raiz)
└─ data/
   └─ profissionais.json # base de dados dos profissionais
```

## Convenções

- **Caminhos relativos**: as páginas em `src/pages/` referenciam
  `../../assets/...` e `../../data/profissionais.json`; os partials usam
  `__DIR__`.
- **CSS**: `base.css` concentra variáveis (`:root`), o sistema de botões
  (`.btn`, `.btn-primario`, `.btn-secundario`) e header/footer, e é carregado
  **antes** das folhas específicas. Breakpoints padronizados: **1024 / 768 /
  480px**.
- **Headings**: cada página possui **um único `<h1>`**, com hierarquia
  `h2`/`h3` coerente (sem pulos de nível).
- **Estilo de código**: sem comentários supérfluos; indentação de 2 espaços.

## Dados

`data/profissionais.json` alimenta a listagem (`assets/js/profissionais.js` e
`servico.js`) e as páginas de perfil (`contratar.php`). Schema de cada
profissional: `id, nome, cargo, categoria, imagem, descricao_curta, biografia,
educacao, contato, preco_dia, avaliacao, total_avaliacoes, distribuicao,
projetos_concluidos, selos, trabalhos, item, avaliacoes_clientes`.

Categorias: `predial`, `eletro`, `veiculos`, `informatica`, `industriais`.

## Observação

O estado do usuário (perfil, login, agendamentos, avaliações) é persistido
apenas no `localStorage` do navegador — este é um projeto acadêmico e não há
backend/persistência server-side.

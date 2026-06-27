# CLAUDE.md

Orientações para agentes (e pessoas) trabalhando neste repositório.

## Visão geral

**Despensa Compartilhada** é uma aplicação web para organizar alimentos em
despensas virtuais: cadastrar despensas, registrar produtos (com quantidade e
validade) e, futuramente, compartilhar despensas com outras pessoas.

O código da aplicação fica em **`dispensa/`** (projeto Next.js). Rode os
comandos a partir dessa pasta.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Bootstrap 5** + **react-bootstrap** para UI; CSS Modules para estilos locais
- **SQLite** via **`node:sqlite`** (SQLite nativo do Node; sem flag a partir do
  **Node 24**, sem dependência nativa para compilar)
- **bcryptjs** para hash de senha; sessão por **cookie httpOnly assinado**

> Não há mais Supabase. Toda a persistência e autenticação são locais.

## Como rodar

```bash
cd dispensa
npm install
cp .env.example .env   # defina SESSION_SECRET
npm run dev            # http://localhost:3000
npm run build          # build de produção
```

O banco SQLite é criado automaticamente em `dispensa/data/dispensa.sqlite` na
primeira execução. As imagens enviadas ficam em `dispensa/public/uploads/`.
Ambos são ignorados pelo git.

## Arquitetura

- **Rotas de API** (`src/app/api/**/route.js`): toda a lógica de servidor.
  Derivam o usuário logado da sessão (cookie) — o cliente nunca envia `userId`.
  - `api/auth/{register,login,logout,me}`
  - `api/pantries` e `api/pantries/[id]`
  - `api/pantries/[id]/products` e `api/products/[pid]`
- **Camada de servidor** (`src/app/lib/`):
  - `db/index.js` — conexão SQLite (singleton) e schema
  - `session.js` — cria/lê/destroi a sessão por cookie (HMAC)
  - `upload.js` — grava/remove imagens em `public/uploads`
- **Clientes** (`src/app/lib/`): `pantries.js`, `products.js`, `signinUser.js`,
  `signupUser.js`, `auth.js` — fazem `fetch` para a API. Mantêm assinaturas
  tolerantes (argumentos extras antigos, como `userId`, são ignorados).
- **Páginas** (`src/app/**/page.js`) e **componentes** (`src/app/components/`).
- **Estilos**: `src/app/globals.css` (tokens de design e acessibilidade) +
  CSS Modules em `src/app/style/`.

### Modelo de dados (SQLite)

- `users(id, email, username, password, created_at)`
- `pantries(id, name, description, image, user_id, created_at)`
- `products(id, name, description, quantity, pantry_id, expiration, image, created_at)`

Chaves estrangeiras com `ON DELETE CASCADE` (apagar despensa remove produtos).

## Convenções

- **Idioma:** UI, comentários e mensagens de commit em **português**.
- **Acessibilidade** (requisito do projeto): todo campo tem `<label>` associado;
  erros ligados por `aria-describedby`; foco de teclado sempre visível; imagens
  decorativas com `alt=""` e informativas com `alt` descritivo; landmark
  `main#main-content` como alvo do link "pular para o conteúdo".
- **Commits:** Conventional Commits em português
  (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`), com escopo quando fizer
  sentido (ex.: `feat(pantries): ...`). O repositório está no GitHub.
- **Cor de marca:** `#271d94` (definida como token e aplicada via Bootstrap).

## Documentos úteis

- `dispensa/docs/personas.md` — personas e proto-personas do sistema
- `dispensa/wireframe.png` / `.excalidraw` — wireframe base do design atual

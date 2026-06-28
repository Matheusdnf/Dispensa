# Despensa Compartilhada

Aplicação web para organizar alimentos em **despensas virtuais**: cadastre suas
despensas, registre os produtos que tem em casa (com quantidade e validade) e
compartilhe uma despensa com outras pessoas.

Projeto da disciplina de Programação Web (PWEB).

## Funcionalidades

- Cadastro e login de usuários (sessão por cookie, senha com hash)
- Criação, edição e exclusão de **despensas**
- Cadastro, edição e exclusão de **produtos** dentro de cada despensa
- **Compartilhamento de despensas**: convide pessoas por e-mail para acessar
  uma despensa e gerenciar seus produtos em conjunto
- Upload de imagens para despensas e produtos
- Interface responsiva e com foco em **acessibilidade**

## Tecnologias

- [Next.js 15](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- [Bootstrap 5](https://getbootstrap.com/) e react-bootstrap
- **SQLite** local via `node:sqlite` (SQLite nativo do Node, sem dependência
  nativa para compilar)
- `bcryptjs` para hash de senha; sessão por cookie httpOnly assinado

> O projeto roda totalmente local — **não depende de serviços externos**.

## Pré-requisitos

- **Node.js 24 ou superior** — o projeto usa o módulo nativo `node:sqlite`, que
  só está disponível sem flags experimentais a partir do Node 24.
- npm

Verifique sua versão com `node --version`. Em versões mais antigas (ex.: Node 22
LTS), o cadastro/login falha com erro 500 porque o `node:sqlite` ainda exige a
flag `--experimental-sqlite`.

> **Não é preciso instalar o SQLite separadamente.** Ele vem embutido no próprio
> Node (como `node:crypto` ou `node:fs`); o `npm install` cuida apenas das
> dependências JavaScript.

## Como rodar

O código da aplicação fica na pasta **`dispensa/`**.

```bash
# 1. Clonar o repositório
git clone git@github.com:Matheusdnf/Dispensa.git
cd Dispensa/dispensa

# 2. Instalar as dependências
npm install

# 3. Configurar as variáveis de ambiente
cp .env.example .env
# edite o .env e defina um SESSION_SECRET (veja abaixo)

# 4. Rodar em modo de desenvolvimento
npm run dev
```

Acesse **[http://localhost:3000](http://localhost:3000)**.

Na primeira execução, o banco SQLite é criado automaticamente em
`dispensa/data/dispensa.sqlite` e as imagens enviadas ficam em
`dispensa/public/uploads/`. Ambos são ignorados pelo git.

### Variáveis de ambiente

| Variável         | Descrição                                            |
| ---------------- | ---------------------------------------------------- |
| `SESSION_SECRET` | Segredo usado para assinar o cookie de sessão (HMAC) |

Para gerar um valor aleatório:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Scripts

| Comando         | Descrição                                |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Servidor de desenvolvimento (porta 3000) |
| `npm run build` | Build de produção                        |
| `npm run start` | Servir o build de produção               |
| `npm run lint`  | Verificação de lint                      |

## Estrutura do projeto

```
dispensa/
├── src/app/
│   ├── api/            # rotas de API (auth, despensas, produtos)
│   ├── components/     # componentes de UI
│   ├── lib/            # banco (SQLite), sessão, upload e clientes da API
│   ├── style/          # CSS Modules
│   ├── globals.css     # tokens de design e acessibilidade
│   └── **/page.js      # páginas (App Router)
├── docs/personas.md    # personas e proto-personas
├── public/             # imagens estáticas e uploads
└── wireframe.png       # wireframe base do design
```

## Primeiros passos no app

1. Crie uma conta. A senha precisa ter ao menos 6 caracteres, incluindo
   maiúscula, minúscula, número e caractere especial (ex.: `Senha1!`).
2. Você é levado para **Minhas Despensas**.
3. Crie uma despensa e, dentro dela, adicione produtos.
4. Para compartilhar, abra a despensa e clique em **Adicionar pessoa**: informe
   o e-mail de outra conta já cadastrada para conceder acesso.

### Compartilhamento

O **dono** da despensa convida outras pessoas pelo e-mail da conta delas. Quem
recebe o convite passa a ver a despensa na própria lista (marcada com o selo
**"Compartilhada"**) e pode **adicionar, editar e excluir produtos**.

Continuam exclusivos do dono: **renomear/excluir a despensa** e **gerenciar quem
tem acesso** (adicionar ou remover pessoas). O botão "Adicionar pessoa" só
aparece para o dono.

## Documentação

- [`dispensa/docs/personas.md`](dispensa/docs/personas.md) — personas e
  proto-personas do sistema
- `dispensa/wireframe.png` — wireframe que serviu de base para o design

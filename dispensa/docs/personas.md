# Personas e Proto-personas — Despensa Compartilhada

Este documento descreve para quem o sistema é construído. Ele reúne
**proto-personas** (esboços rápidos, baseados em suposições da equipe, úteis no
início do projeto) e **personas** (perfis mais detalhados, que representam
grupos de usuários e orientam decisões de produto, design e acessibilidade).

O produto é uma **despensa virtual compartilhada**: a pessoa cadastra suas
despensas, registra os produtos que tem em casa (com quantidade e validade) e,
no futuro, poderá compartilhar uma despensa com outras pessoas.

---

## Proto-personas

> Esboços baseados em suposições, ainda não validados com pesquisa. Servem para
> alinhar a equipe e levantar hipóteses a serem testadas.

### 1. A organizadora da casa
- **Quem é:** responsável principal pelas compras e pela organização da casa.
- **Comportamentos:** faz compras semanais ou mensais; gosta de listas; checa o
  que falta antes de ir ao mercado.
- **Necessidades:** saber rapidamente o que tem em casa e o que está perto de
  vencer.
- **Dores:** comprar item repetido, perder comida vencida no fundo do armário.

### 2. O estudante de república
- **Quem é:** jovem que mora com colegas e divide despesas e mantimentos.
- **Comportamentos:** usa o celular para quase tudo; compras informais e
  divididas entre os moradores.
- **Necessidades:** uma despensa compartilhada onde todos enxergam o mesmo
  estoque.
- **Dores:** confusão sobre de quem é cada coisa e quem precisa repor o quê.

### 3. O comprador consciente
- **Quem é:** pessoa preocupada em evitar desperdício e controlar gastos.
- **Comportamentos:** acompanha validades; planeja refeições pelo que está
  prestes a vencer.
- **Necessidades:** alertas e visibilidade das datas de validade.
- **Dores:** jogar comida fora, sensação de desperdiçar dinheiro.

---

## Personas

> Perfis mais detalhados, que dão rosto e contexto aos principais grupos de
> usuários. Usados para priorizar funcionalidades e validar fluxos.

### Persona 1 — Marina Alves
- **Idade:** 34 anos
- **Ocupação:** analista administrativa; principal responsável pela casa
- **Dispositivos:** smartphone Android (uso principal) e notebook
- **Familiaridade com tecnologia:** média-alta

**Bio.** Marina mora com o marido e dois filhos. Concentra a organização da
casa e faz as compras do mês. Vive sem saber se ainda tem arroz, café ou
fralda, e acaba comprando duplicado "por garantia".

**Objetivos**
- Ver num relance o que há em casa antes de ir ao mercado.
- Saber o que está perto de vencer para usar primeiro.
- Manter tudo organizado sem gastar muito tempo.

**Frustrações**
- Aplicativos complicados e cheios de passos.
- Cadastrar produto demora e exige informação demais.

**Cenário de uso.** Antes da compra mensal, Marina abre a Despensa Virtual no
celular, confere a despensa "Cozinha", vê o que está acabando e monta a lista
com base no que realmente falta.

---

### Persona 2 — Lucas Pereira
- **Idade:** 22 anos
- **Ocupação:** estudante de graduação; mora em república com 3 colegas
- **Dispositivos:** smartphone; eventualmente notebook
- **Familiaridade com tecnologia:** alta

**Bio.** Lucas divide a casa e os mantimentos com os colegas. Compras são
informais e ninguém sabe ao certo o que já tem, o que gera desperdício e
pequenas discussões.

**Objetivos**
- Compartilhar uma despensa com os colegas para todos verem o mesmo estoque.
- Registrar rapidamente o que comprou.

**Frustrações**
- Falta de transparência sobre o que existe na casa.
- Combinar reposição por mensagens soltas que se perdem.

**Cenário de uso.** Lucas cria a despensa "República 302" e quer convidar os
colegas. Cada um adiciona o que compra; todos consultam antes de comprar de
novo. *(O compartilhamento entre pessoas está sinalizado na interface como
recurso futuro.)*

---

### Persona 3 — João Mendes (foco em acessibilidade)
- **Idade:** 58 anos
- **Ocupação:** aposentado; cuida da casa e dos netos
- **Dispositivos:** notebook com navegador; usa ampliação de tela e, às vezes,
  leitor de tela
- **Familiaridade com tecnologia:** básica

**Bio.** João tem baixa visão. Navega bastante pelo teclado e depende de bom
contraste, textos legíveis e elementos bem rotulados. Interfaces com campos sem
rótulo ou foco invisível o impedem de concluir tarefas.

**Objetivos**
- Cadastrar e consultar produtos sem depender de ajuda.
- Entender claramente onde está o foco e o que cada campo significa.

**Frustrações**
- Campos identificados apenas por *placeholder*, que some ao digitar.
- Baixo contraste e foco de teclado que não aparece.

**Cenário de uso.** João aumenta o zoom do navegador, navega pelos formulários
com Tab — cada campo tem rótulo associado e o foco fica sempre visível — e usa
o link "Pular para o conteúdo" para ir direto ao que importa.

**Implicações de design (atendidas no redesign)**
- Todos os campos têm `<label>` associado e erros ligados por
  `aria-describedby`.
- Foco de teclado sempre visível e com alto contraste.
- Paleta com contraste adequado (AA) e link "pular para o conteúdo".
- Imagens decorativas com `alt` vazio; imagens informativas com `alt`
  descritivo.

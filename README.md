# 💰 FinTrack

![Version](https://img.shields.io/badge/version-0.5.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![CI](https://github.com/cidolla/fintrack/actions/workflows/ci.yml/badge.svg)

Aplicação web de controle de gastos pessoais desenvolvida com Node.js, Express e SQLite.

## 🎯 Problema resolvido

Muitas pessoas não sabem para onde vai o próprio dinheiro. O FinTrack permite registrar entradas e saídas, ver o saldo atual e entender em quais categorias os gastos se concentram, tudo em uma interface simples e local.

## 📋 Funcionalidades

| Funcionalidade | Status |
|---|---|
| Cadastrar transação | ✅ Implementado |
| Listar transações | ✅ Implementado |
| Editar transação | ✅ Implementado |
| Deletar transação | ✅ Implementado |
| Filtrar por tipo (entrada/saída) | ✅ Implementado |
| Cards de resumo (entradas, saídas e saldo) | ✅ Implementado |
| Gráfico de gastos por categoria | ✅ Implementado |
| Testes automatizados (Jest + Supertest) | ✅ Implementado |
| Pipeline de CI (GitHub Actions) | ✅ Implementado |
| Autenticação de usuários | 🔄 Planejado |
| Exportação de relatórios | 🔄 Planejado |

## 🚀 Como executar

Pré-requisito: **Node.js 22 ou superior** (recomendado: Node 24 LTS).

```bash
# 1. Clone o repositório
git clone https://github.com/cidolla/fintrack.git

# 2. Entre na pasta
cd fintrack

# 3. Instale as dependências
npm ci

# 4. Inicie o servidor
npm start
```

Acesse: http://localhost:3000

> Para desenvolvimento com recarregamento automático, use `npm run dev`.

## 🛠️ Stack

- Node.js + Express
- SQLite (better-sqlite3)
- HTML5 + CSS3 + JavaScript (vanilla)
- Chart.js (gráfico, via CDN)
- Jest + Supertest (testes)
- GitHub Actions (CI)

## 📁 Documentação

- [Project Charter](docs/project-charter.md)
- [Requisitos (RF e RNF)](docs/requisitos.md)
- [Casos de Uso](docs/casos-de-uso.md)
- [User Stories](docs/user-stories.md)
- [Arquitetura](docs/arquitetura.md)
- [Matriz de Rastreabilidade](docs/matrix-rastreabilidade.md)

## 🧪 Testes

Os testes automatizados usam Jest + Supertest e cobrem as rotas GET, POST, PUT e DELETE de `/transacoes` (82 testes em `tests/transacoes.test.js`).

```bash
npm test
```

## ⚙️ Integração Contínua (CI)

O pipeline do GitHub Actions (`.github/workflows/ci.yml`) roda a cada push e pull request nas branches `main` e `develop`, executando `npm ci` e `npm test` com Node.js 24.x.

## 🌿 Fluxo de branches (Git Flow)

| Branch | Descrição |
|---|---|
| `main` | Produção estável (somente via PR a partir de `develop`) |
| `develop` | Integração do desenvolvimento |
| `feature/*` | Uma branch por issue/funcionalidade, aberta a partir de `develop` |

```
feature/* ──PR (Closes #N)──▶ develop ──PR──▶ main ──▶ tag vX.Y.Z
```

Padrões adotados: [Conventional Commits](https://www.conventionalcommits.org/pt-br/), commits atômicos e [Versionamento Semântico](https://semver.org/lang/pt-BR/) com tags anotadas (`v0.1.0` a `v0.5.0`).

## 👤 Autor

Cid José Espíndola Filho — ADS Turma 103, Senac-PE

# Project Charter — FinTrack

## 1. Visão Geral
O **FinTrack** é uma aplicação web de controle de gastos pessoais que permite ao usuário registrar entradas e saídas financeiras, visualizar o saldo atual e filtrar transações por tipo e categoria.

## 2. Justificativa
Muitas pessoas têm dificuldade em controlar seus gastos do dia a dia. O FinTrack oferece uma solução simples, rápida e acessível via navegador, sem necessidade de instalação.

## 3. Objetivos SMART
- **Específico:** Desenvolver uma API REST com Node.js e um front-end em HTML/CSS/JS para controle de transações financeiras pessoais.
- **Mensurável:** Implementar ao menos 4 rotas (GET, POST, PUT, DELETE) e uma interface funcional.
- **Atingível:** Projeto desenvolvido individualmente em 3 dias com tecnologias já conhecidas.
- **Relevante:** Exercita habilidades de Back-End, banco de dados e versionamento profissional.
- **Temporal:** Entrega até o final da semana da atividade.

## 4. Escopo

### Dentro do escopo
- Cadastrar, listar, editar e deletar transações
- Calcular e exibir saldo atual
- Filtrar transações por tipo (entrada/saída)
- Interface web simples e funcional

### Fora do escopo
- Autenticação e login de usuários
- Gráficos avançados
- Relatórios em PDF
- Multi-moeda
- Aplicativo mobile

## 5. Stakeholders
| Papel | Descrição |
|---|---|
| Desenvolvedor | Cid José Espíndola Filho |
| Usuário final | Pessoa que deseja controlar gastos pessoais |
| Avaliador | Professor da disciplina |

## 6. Stack Tecnológica
- **Back-End:** Node.js + Express
- **Banco de dados:** SQLite (better-sqlite3)
- **Front-End:** HTML5 + CSS3 + JavaScript vanilla
- **Versionamento:** Git + GitHub (Git Flow + Conventional Commits + SemVer)
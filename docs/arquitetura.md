# Arquitetura — FinTrack

## Visão Geral
O FinTrack segue uma arquitetura Cliente-Servidor simples de duas camadas:

## Camadas do Sistema

### 1. Cliente (Browser)
- index.html — estrutura da página
- style.css — estilização visual
- app.js — lógica de comunicação com a API via fetch

### 2. Servidor (Node.js + Express)
- Roda na porta 3000
- Expõe 4 rotas REST:
  - GET /transacoes — listar
  - POST /transacoes — cadastrar
  - PUT /transacoes/:id — editar
  - DELETE /transacoes/:id — deletar

### 3. Banco de Dados (SQLite)
- Arquivo físico:
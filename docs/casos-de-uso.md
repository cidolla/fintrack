# Casos de Uso — FinTrack

## Atores
- **Usuário:** pessoa que utiliza o sistema para controlar seus gastos pessoais.

---

## UC01 — Cadastrar Transação
**Ator:** Usuário  
**Pré-condição:** Aplicação rodando no navegador  
**Fluxo Principal:**
1. Usuário preenche descrição, valor, tipo, categoria e data
2. Usuário clica em "Adicionar"
3. Sistema valida os campos
4. Sistema salva a transação no banco
5. Sistema atualiza a lista e o saldo

**Fluxo de Exceção:**
- Se algum campo obrigatório estiver vazio, o sistema exibe alerta e não salva

---

## UC02 — Listar Transações
**Ator:** Usuário  
**Pré-condição:** Existir ao menos uma transação cadastrada  
**Fluxo Principal:**
1. Sistema carrega automaticamente todas as transações ao abrir a página
2. Sistema exibe descrição, categoria, data e valor de cada transação
3. Sistema exibe o saldo atual atualizado

---

## UC03 — Filtrar Transações
**Ator:** Usuário  
**Pré-condição:** Existir ao menos uma transação cadastrada  
**Fluxo Principal:**
1. Usuário seleciona um filtro (Todos / Entradas / Saídas)
2. Sistema exibe apenas as transações do tipo selecionado

---

## UC04 — Deletar Transação
**Ator:** Usuário  
**Pré-condição:** Existir ao menos uma transação cadastrada  
**Fluxo Principal:**
1. Usuário clica no botão 🗑 da transação desejada
2. Sistema exibe confirmação
3. Usuário confirma
4. Sistema remove a transação do banco
5. Sistema atualiza a lista e o saldo

**Fluxo Alternativo:**
- Se o usuário cancelar a confirmação, nada é alterado
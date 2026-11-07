const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Listar todas as transações
app.get('/transacoes', (req, res) => {
  const transacoes = db.prepare('SELECT * FROM transacoes ORDER BY data DESC').all();
  res.json(transacoes);
});

// Cadastrar transação
app.post('/transacoes', (req, res) => {
  const { descricao, valor, tipo, categoria, data } = req.body;
  const stmt = db.prepare('INSERT INTO transacoes (descricao, valor, tipo, categoria, data) VALUES (?, ?, ?, ?, ?)');
  const result = stmt.run(descricao, valor, tipo, categoria, data);
  res.status(201).json({ id: result.lastInsertRowid, descricao, valor, tipo, categoria, data });
});

// Editar transação
app.put('/transacoes/:id', (req, res) => {
  const { descricao, valor, tipo, categoria, data } = req.body;
  const stmt = db.prepare('UPDATE transacoes SET descricao=?, valor=?, tipo=?, categoria=?, data=? WHERE id=?');
  stmt.run(descricao, valor, tipo, categoria, data, req.params.id);
  res.json({ message: 'Atualizado com sucesso' });
});

// Deletar transação
app.delete('/transacoes/:id', (req, res) => {
  db.prepare('DELETE FROM transacoes WHERE id=?').run(req.params.id);
  res.json({ message: 'Deletado com sucesso' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
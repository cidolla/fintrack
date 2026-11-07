const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'fintrack.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS transacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL,
    valor REAL NOT NULL,
    tipo TEXT NOT NULL CHECK(tipo IN ('entrada', 'saida')),
    categoria TEXT NOT NULL,
    data TEXT NOT NULL
  )
`);

module.exports = db;
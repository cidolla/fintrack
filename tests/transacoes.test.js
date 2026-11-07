const request = require('supertest');
const app = require('../src/server');

jest.setTimeout(30000);

const CATEGORIAS = ['alimentação', 'transporte', 'lazer', 'moradia', 'saúde', 'educação', 'salário', 'outros'];

function gerarCasosDeTeste(qtd) {
  const casos = [];
  for (let i = 0; i < qtd; i++) {
    casos.push({
      _idx: i,
      descricao: `Transação de teste nº ${i + 1} - ${i % 2 === 0 ? 'compra' : 'recebimento'}`,
      valor: Number((10 + i * 7.35).toFixed(2)),
      tipo: i % 2 === 0 ? 'saida' : 'entrada',
      categoria: CATEGORIAS[i % CATEGORIAS.length],
      data: `2026-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
    });
  }
  return casos;
}

const CASOS = gerarCasosDeTeste(22);
const idsCriados = [];

describe('GET /transacoes - estado inicial', () => {
  test('deve retornar status 200', async () => {
    const res = await request(app).get('/transacoes');
    expect(res.statusCode).toBe(200);
  });

  test('deve retornar um array', async () => {
    const res = await request(app).get('/transacoes');
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /transacoes - criação de transações', () => {
  test.each(CASOS)('deve criar a transação "$descricao"', async (caso) => {
    const res = await request(app).post('/transacoes').send(caso);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.descricao).toBe(caso.descricao);
    expect(res.body.valor).toBe(caso.valor);
    expect(res.body.tipo).toBe(caso.tipo);
    expect(res.body.categoria).toBe(caso.categoria);
    idsCriados[caso._idx] = res.body.id;
  });
});

describe('GET /transacoes - após criação', () => {
  test('deve conter ao menos as transações criadas', async () => {
    const res = await request(app).get('/transacoes');
    expect(res.body.length).toBeGreaterThanOrEqual(CASOS.length);
  });

  test.each(CASOS.slice(0, 10))('deve conter a transação "$descricao" na listagem', async (caso) => {
    const res = await request(app).get('/transacoes');
    const encontrada = res.body.find((t) => t.descricao === caso.descricao);
    expect(encontrada).toBeDefined();
    expect(encontrada.valor).toBe(caso.valor);
  });
});

describe('PUT /transacoes/:id - edição', () => {
  test.each(CASOS)('deve editar a transação "$descricao"', async (caso) => {
    const id = idsCriados[caso._idx];
    const atualizada = { ...caso, descricao: `${caso.descricao} (editada)`, valor: caso.valor + 1 };
    const res = await request(app).put(`/transacoes/${id}`).send(atualizada);
    expect(res.statusCode).toBe(200);

    const lista = await request(app).get('/transacoes');
    const encontrada = lista.body.find((t) => t.id === id);
    expect(encontrada.descricao).toBe(atualizada.descricao);
    expect(encontrada.valor).toBe(atualizada.valor);
  });

  test('deve responder sem erro ao editar um id inexistente', async () => {
    const res = await request(app).put('/transacoes/999999').send({
      descricao: 'inexistente', valor: 1, tipo: 'entrada', categoria: 'outros', data: '2026-01-01'
    });
    expect(res.statusCode).toBe(200);
  });
});

describe('DELETE /transacoes/:id - remoção', () => {
  test.each(CASOS)('deve deletar a transação "$descricao"', async (caso) => {
    const id = idsCriados[caso._idx];
    const res = await request(app).delete(`/transacoes/${id}`);
    expect(res.statusCode).toBe(200);

    const lista = await request(app).get('/transacoes');
    const encontrada = lista.body.find((t) => t.id === id);
    expect(encontrada).toBeUndefined();
  });

  test('deve responder sem erro ao deletar um id inexistente', async () => {
    const res = await request(app).delete('/transacoes/999999');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /transacoes - estado final', () => {
  test('não deve mais conter as transações criadas neste arquivo', async () => {
    const res = await request(app).get('/transacoes');
    idsCriados.forEach((id) => {
      expect(res.body.find((t) => t.id === id)).toBeUndefined();
    });
  });
});
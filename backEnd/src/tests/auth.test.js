import request from 'supertest';
import app from '../app.js';
import database from '../config/database.js';

describe('Autenticação', () => {
  beforeAll(async () => {
    await database.connect();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  describe('POST /api/v1/login', () => {
    it('deve retornar erro quando email não é fornecido', async () => {
      const response = await request(app)
        .post('/api/v1/login')
        .send({ password: 'senha123' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Email e senha são obrigatórios');
    });

    it('deve retornar erro quando senha não é fornecida', async () => {
      const response = await request(app)
        .post('/api/v1/login')
        .send({ email: 'teste@exemplo.com' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Email e senha são obrigatórios');
    });

    it('deve retornar erro para credenciais inválidas', async () => {
      const response = await request(app)
        .post('/api/v1/login')
        .send({
          email: 'usuario@inexistente.com',
          password: 'senha123'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Email ou senha inválidos');
    });
  });

  describe('Middleware de Autenticação', () => {
    it('deve retornar erro quando token não é fornecido', async () => {
      const response = await request(app)
        .get('/api/v1/beehive');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Token não fornecido');
    });

    it('deve retornar erro para token inválido', async () => {
      const response = await request(app)
        .get('/api/v1/beehive')
        .set('Authorization', 'Bearer token_invalido');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Token inválido');
    });
  });
}); 
// Configuração global para testes
import dotenv from 'dotenv';

// Carrega variáveis de ambiente para testes
dotenv.config({ path: '.env.test' });

// Configurações globais do Jest
global.console = {
  ...console,
  // Suprime logs durante os testes
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Timeout padrão para testes
jest.setTimeout(10000); 
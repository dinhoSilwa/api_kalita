// Configuração global para testes

// Configurar timezone para testes
process.env.TZ = 'America/Sao_Paulo';

// Configurar variáveis de ambiente para testes
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'mongodb://localhost:27017/kalita_test';
process.env.JWT_SECRET = 'test_secret_key';

// Mock global do console para testes mais limpos (opcional)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };

// Configuração de timeout global
jest.setTimeout(10000);
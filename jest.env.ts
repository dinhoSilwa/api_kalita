// Configuração de variáveis de ambiente para testes
process.env.TZ = 'America/Sao_Paulo';
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'mongodb://localhost:27017/kalita_test';
process.env.JWT_SECRET = 'test_secret_key';
process.env.EMAIL_USER = 'test@example.com';
process.env.EMAIL_PASS = 'test_password';
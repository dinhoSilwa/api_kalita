import { app } from './app';
import { connectDatabase, databaseHealthCheck, disconnectDatabase } from './db/prisma';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('Iniciando servidor...');

    console.log(' Conectando ao MongoDB...');
    await connectDatabase();
    console.log(' Conectado ao MongoDB com sucesso!');

    const isHealthy = await databaseHealthCheck();
    if (!isHealthy) {
      throw new Error('Database health check failed');
    }

    const server = app.listen(PORT, () => {
      console.log(` Servidor rodando em: http://localhost:${PORT}`);
      console.log(` Health Check: http://localhost:${PORT}/health`);
      console.log(` API Docs: http://localhost:${PORT}/docs`);
    });

    setupGracefulShutdown(server);

  } catch (error) {
    console.error(' Falha ao iniciar servidor:', error);
    process.exit(1);
  }
}

function setupGracefulShutdown(server: any) {
  const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

  signals.forEach(signal => {
    process.on(signal, async () => {
      console.log(`\n${signal} recebido, encerrando servidor graciosamente...`);
      
      server.close(async () => {
        console.log(' Servidor HTTP fechado');
        
        await disconnectDatabase();
        console.log(' Conexão com banco de dados fechada');
        
        process.exit(0);
      });

      setTimeout(() => {
        console.log(' Forçando encerramento...');
        process.exit(1);
      }, 10000);
    });
  });
}

startServer();
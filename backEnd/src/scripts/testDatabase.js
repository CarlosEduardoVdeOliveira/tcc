import database from "../config/database.js";
import logger from "../utils/logger.js";

async function testDatabase() {
  try {
    logger.info('🧪 Iniciando testes do banco de dados...');

    // Teste 1: Conectar ao banco
    logger.info('Teste 1: Conectando ao banco...');
    await database.connect();
    
    // Teste 2: Verificar se está conectado
    logger.info('Teste 2: Verificando status da conexão...');
    const isConnected = database.isConnected();
    logger.info(`Status da conexão: ${isConnected}`);

    // Teste 3: Health check
    logger.info('Teste 3: Executando health check...');
    const health = await database.healthCheck();
    logger.info('Health check:', health);

    // Teste 4: Estatísticas da conexão
    logger.info('Teste 4: Obtendo estatísticas...');
    const stats = database.getConnectionStats();
    logger.info('Estatísticas:', stats);

    // Teste 5: Testar query simples
    logger.info('Teste 5: Executando query de teste...');
    const prisma = database.getClient();
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    logger.info('Resultado da query:', result);

    // Teste 6: Testar reconexão
    logger.info('Teste 6: Testando reconexão...');
    await database.ensureConnection();
    logger.info('Reconexão bem-sucedida');

    // Teste 7: Testar getClientWithConnection
    logger.info('Teste 7: Testando getClientWithConnection...');
    const client = await database.getClientWithConnection();
    const testResult = await client.$queryRaw`SELECT 'test' as message`;
    logger.info('Resultado com getClientWithConnection:', testResult);

    logger.info('✅ Todos os testes passaram com sucesso!');

  } catch (error) {
    logger.error('❌ Erro nos testes:', error);
    process.exit(1);
  } finally {
    // Desconectar do banco
    await database.disconnect();
    logger.info('🔌 Testes finalizados, desconectando do banco...');
    process.exit(0);
  }
}

// Executar os testes
testDatabase(); 
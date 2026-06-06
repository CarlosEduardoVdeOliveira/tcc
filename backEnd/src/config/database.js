import { PrismaClient } from "../generated/prisma/client.js";
import logger from "../utils/logger.js";

class Database {
  constructor() {
    this.prisma = null;
    this.isConnecting = false;
    this.connectionAttempts = 0;
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 segundo
  }

  async connect() {
    if (this.isConnecting) {
      logger.warn('Tentativa de conexão já em andamento');
      return;
    }

    if (this.prisma && this.isConnected()) {
      logger.info('Conexão já estabelecida');
      return;
    }

    this.isConnecting = true;
    this.connectionAttempts = 0;

    while (this.connectionAttempts < this.maxRetries) {
      try {
        this.connectionAttempts++;
        logger.info(`Tentativa de conexão ${this.connectionAttempts}/${this.maxRetries}`);

        // Fecha conexão anterior se existir
        if (this.prisma) {
          await this.prisma.$disconnect();
        }

        // Cria nova instância do Prisma
        this.prisma = new PrismaClient({
          log: [
            { level: 'error', emit: 'event' },
            { level: 'warn', emit: 'event' },
            { level: 'info', emit: 'event' },
            { level: 'query', emit: 'event' }
          ],
          errorFormat: 'pretty',
        });

        // Configura listeners de log
        this.prisma.$on('error', (e) => {
          logger.error('Prisma Error:', e);
        });

        this.prisma.$on('warn', (e) => {
          logger.warn('Prisma Warning:', e);
        });

        this.prisma.$on('info', (e) => {
          logger.info('Prisma Info:', e);
        });

        this.prisma.$on('query', (e) => {
          logger.debug('Prisma Query:', {
            query: e.query,
            params: e.params,
            duration: `${e.duration}ms`
          });
        });

        // Conecta ao banco
        await this.prisma.$connect();
        
        // Testa a conexão
        await this.prisma.$queryRaw`SELECT 1`;
        
        this.connectionAttempts = 0; // Reset contador de tentativas
        logger.info('Conexão com o banco de dados estabelecida com sucesso');
        break;

      } catch (error) {
        logger.error(`Erro na tentativa ${this.connectionAttempts}:`, error);
        
        if (this.connectionAttempts >= this.maxRetries) {
          logger.error('Número máximo de tentativas de conexão atingido');
          this.isConnecting = false;
          throw new Error(`Falha ao conectar com o banco de dados após ${this.maxRetries} tentativas: ${error.message}`);
        }

        // Aguarda antes da próxima tentativa
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * this.connectionAttempts));
      }
    }

    this.isConnecting = false;
  }

  async disconnect() {
    if (this.prisma) {
      try {
        await this.prisma.$disconnect();
        this.prisma = null;
        logger.info('Conexão com o banco de dados encerrada com sucesso');
      } catch (error) {
        logger.error('Erro ao desconectar do banco de dados:', error);
        throw error;
      }
    }
  }

  isConnected() {
    return this.prisma && !this.isConnecting;
  }

  async ensureConnection() {
    if (!this.isConnected()) {
      logger.warn('Conexão não estabelecida, tentando reconectar...');
      await this.connect();
    }

    // Testa se a conexão ainda está ativa
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch (error) {
      logger.warn('Conexão inativa detectada, reconectando...');
      await this.connect();
    }
  }

  getClient() {
    if (!this.prisma) {
      throw new Error('Database não foi inicializada. Chame connect() primeiro.');
    }
    return this.prisma;
  }

  async getClientWithConnection() {
    await this.ensureConnection();
    return this.getClient();
  }

  // Método para health check
  async healthCheck() {
    try {
      if (!this.isConnected()) {
        return { status: 'disconnected', message: 'Database não conectado' };
      }

      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'healthy', message: 'Database conectado e funcionando' };
    } catch (error) {
      return { status: 'unhealthy', message: `Database com problemas: ${error.message}` };
    }
  }

  // Método para obter estatísticas da conexão
  getConnectionStats() {
    return {
      isConnected: this.isConnected(),
      isConnecting: this.isConnecting,
      connectionAttempts: this.connectionAttempts,
      maxRetries: this.maxRetries,
      hasClient: !!this.prisma
    };
  }
}

// Cria uma única instância (singleton)
const database = new Database();

// Configura graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM recebido, desconectando do banco...');
  await database.disconnect();
});

process.on('SIGINT', async () => {
  logger.info('SIGINT recebido, desconectando do banco...');
  await database.disconnect();
});

export default database; 
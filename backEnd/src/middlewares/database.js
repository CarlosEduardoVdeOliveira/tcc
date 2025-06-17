import database from "../config/database.js";
import logger from "../utils/logger.js";

/**
 * Middleware para garantir que o banco de dados esteja conectado
 * antes de processar as requisições
 */
export const ensureDatabaseConnection = async (req, res, next) => {
  try {
    await database.ensureConnection();
    next();
  } catch (error) {
    logger.error('Erro ao garantir conexão com o banco:', error);
    res.status(503).json({
      error: 'Serviço temporariamente indisponível',
      message: 'Erro de conexão com o banco de dados'
    });
  }
};

/**
 * Middleware para rotas que não precisam de conexão com o banco
 * (como health check, login, etc.)
 */
export const optionalDatabaseConnection = async (req, res, next) => {
  try {
    await database.ensureConnection();
  } catch (error) {
    logger.warn('Conexão com banco não disponível para rota opcional:', error.message);
  }
  next();
}; 
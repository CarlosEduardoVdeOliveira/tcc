import logger from '../utils/logger.js';
import { AppError, ValidationError } from '../utils/errors.js';
import config from '../config/app.js';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log do erro
  logger.error('Erro na aplicação', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Erro do Prisma
  if (err.code === 'P2002') {
    const message = 'Valor duplicado para um campo único';
    error = new AppError(message, 409);
  }

  if (err.code === 'P2025') {
    const message = 'Registro não encontrado';
    error = new AppError(message, 404);
  }

  // Erro de validação do Zod
  if (err.name === 'ZodError') {
    const message = 'Dados de entrada inválidos';
    error = new ValidationError(message, err.errors);
  }

  // Erro JWT
  if (err.name === 'JsonWebTokenError') {
    const message = 'Token inválido';
    error = new AppError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expirado';
    error = new AppError(message, 401);
  }

  // Erro de cast do MongoDB (se migrar para MongoDB no futuro)
  if (err.name === 'CastError') {
    const message = 'ID inválido';
    error = new AppError(message, 400);
  }

  // Erro de validação do MongoDB
  if (err.name === 'ValidationError') {
    const message = 'Dados de entrada inválidos';
    error = new AppError(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || 'Erro interno do servidor',
      ...(config.nodeEnv === 'development' && { stack: error.stack }),
      ...(error.errors && { details: error.errors }),
    },
  });
};

export const notFound = (req, res, next) => {
  const error = new AppError(`Rota não encontrada: ${req.originalUrl}`, 404);
  next(error);
}; 
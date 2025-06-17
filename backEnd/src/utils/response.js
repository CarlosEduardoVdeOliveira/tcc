export class ApiResponse {
  static success(res, data = null, message = 'Operação realizada com sucesso', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static created(res, data = null, message = 'Recurso criado com sucesso') {
    return this.success(res, data, message, 201);
  }

  static noContent(res) {
    return res.status(204).send();
  }

  static error(res, message = 'Erro interno do servidor', statusCode = 500, errors = null) {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  static validationError(res, errors, message = 'Dados de entrada inválidos') {
    return this.error(res, message, 400, errors);
  }

  static notFound(res, message = 'Recurso não encontrado') {
    return this.error(res, message, 404);
  }

  static unauthorized(res, message = 'Não autorizado') {
    return this.error(res, message, 401);
  }

  static forbidden(res, message = 'Acesso negado') {
    return this.error(res, message, 403);
  }

  static conflict(res, message = 'Conflito de dados') {
    return this.error(res, message, 409);
  }
} 
const auth = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Dados inválidos',
      errors: error.errors,
    });
  }
};

module.exports = auth;
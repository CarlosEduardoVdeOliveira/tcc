import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import database from "../config/database.js";
import logger from "../utils/logger.js";
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const prisma = database.getClient();
    logger.info('Tentando login para:', { email });
    const user = await prisma.producer.findUnique({
      where: { email },
    });

    if (!user) {
      logger.warn('Usuário não encontrado:', { email });
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.warn('Senha inválida para usuário:', { email });
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    if (!process.env.JWT_SECRET) {
      logger.error('JWT_SECRET não definido nas variáveis de ambiente!');
      return res.status(500).json({ error: 'Erro de configuração do servidor' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    logger.info('Login bem-sucedido para:', { email });
    res.status(200).json({
      message: "Login bem-sucedido",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error('Erro no login:', error);
    res.status(500).json({ error: error.message });
  }
};
export default login;

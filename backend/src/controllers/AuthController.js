const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { AppError } = require('../middleware/errorHandler');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validação básica
  if (!email || !password) {
    throw new AppError('Email e senha são obrigatórios', 400);
  }

  // Busca usuário
  const user = await User.findOne({ where: { email } });
  if (!user || !user.active) {
    throw new AppError('Credenciais inválidas', 401);
  }

  // Verifica senha
  const isPasswordValid = await user.checkPassword(password);
  if (!isPasswordValid) {
    throw new AppError('Credenciais inválidas', 401);
  }

  // Gera token
  const token = jwt.sign(
    { 
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  // Remove senha do objeto de resposta
  const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  res.json({
    user: userResponse,
    token
  });
});

exports.me = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'name', 'email', 'role']
  });
  
  if (!user) {
    throw new AppError('Usuário não encontrado', 404);
  }

  res.json(user);
}); 
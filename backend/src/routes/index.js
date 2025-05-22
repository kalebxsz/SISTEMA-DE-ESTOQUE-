const express = require('express');
const router = express.Router();
const db = require('../models/db');
const authRoutes = require('./auth');
const productRoutes = require('./products');
const { protect } = require('../middleware/authMiddleware');

// Rota de teste
router.get('/status', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({
      status: 'online',
      timestamp: result.rows[0].now
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao conectar com o banco de dados' });
  }
});

// Rotas públicas
router.use('/auth', authRoutes);

// Rotas protegidas
router.use('/products', protect, productRoutes);

module.exports = router; 
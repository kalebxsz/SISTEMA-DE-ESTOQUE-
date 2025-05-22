require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize, testConnection } = require('./config/database');
const config = require('./config/config');
const productRoutes = require('./routes/products');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// Middleware de segurança e utilidades
app.use(morgan('dev'));
app.use(cors(config.server.cors));
app.use(helmet());
app.use(express.json());

// Middleware para adicionar headers úteis
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'EstoqueJá API');
  res.setHeader('X-Total-Time', Date.now() - req.startTime);
  next();
});

// Rotas
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    environment: config.server.nodeEnv
  });
});

app.use('/api/products', productRoutes);

// Tratamento de erros
app.use(notFound);
app.use(errorHandler);

// Inicialização do servidor
const startServer = async () => {
  try {
    // Testa a conexão com o banco
    const dbConnected = await testConnection();
    if (!dbConnected) {
      throw new Error('Falha ao conectar com o banco de dados');
    }

    // Sincroniza os modelos com o banco
    await sequelize.sync();
    console.log('Modelos sincronizados com o banco de dados');

    // Inicia o servidor
    const port = config.server.port;
    app.listen(port, () => {
      console.log(`
=================================
🚀 Servidor rodando na porta ${port}
👉 http://localhost:${port}
=================================
      `);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION! Encerrando...');
  console.error(err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION! Encerrando...');
  console.error(err);
  process.exit(1);
});

startServer(); 
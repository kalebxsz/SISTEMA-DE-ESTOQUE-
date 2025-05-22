require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const sequelize = require('./config/database');
const seedProducts = require('./config/seedProducts');
const productRoutes = require('./routes/products');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// Middleware de segurança e utilidades
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

// Middleware para adicionar headers úteis
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'EstoqueJá API');
  res.setHeader('X-Total-Time', Date.now() - req.startTime);
  next();
});

// Rota raiz com documentação básica
app.get('/', (req, res) => {
  res.json({
    name: 'EstoqueJá API',
    version: '1.0.0',
    description: 'API para gerenciamento de estoque',
    endpoints: {
      '/': 'Esta documentação',
      '/health': 'Status da API',
      '/api/products': {
        GET: 'Listar produtos',
        POST: 'Criar novo produto'
      },
      '/api/products/:id': {
        GET: 'Buscar produto por ID',
        PUT: 'Atualizar produto',
        DELETE: 'Remover produto'
      },
      '/api/products/:id/stock': {
        PATCH: 'Atualizar quantidade em estoque'
      }
    }
  });
});

// Rota de status
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString()
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
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    // Sincroniza os modelos com o banco
    await sequelize.sync();
    console.log('✅ Modelos sincronizados com o banco de dados');

    // Cria produtos de exemplo
    await seedProducts();

    // Inicia o servidor
    const port = process.env.PORT || 3000;
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
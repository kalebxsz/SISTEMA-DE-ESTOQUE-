// Verificar e criar arquivo .env se necessário
require('./config/checkEnv');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const sequelize = require('./config/database');
const productRoutes = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rotas
app.use('/api', productRoutes);

// Rota básica
app.get('/', (req, res) => {
  res.json({ message: 'EstoqueJá API funcionando!' });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Teste a conexão com o banco de dados e inicie o servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincronize os modelos com o banco de dados
    return sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados');
    
    // Inicie o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  }); 
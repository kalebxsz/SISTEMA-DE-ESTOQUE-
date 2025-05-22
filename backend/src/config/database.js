const { Sequelize } = require('sequelize');
const path = require('path');

// Configuração para usar SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'database.sqlite'),
  logging: false // Desativa logs SQL para desenvolvimento
});

module.exports = sequelize; 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    }
  }
});

// Método para verificar senha
User.prototype.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Criar usuário admin padrão
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ where: { email: 'admin@villela.com' } });
    if (!adminExists) {
      await User.create({
        name: 'Administrador',
        email: 'admin@villela.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Usuário admin criado com sucesso');
    }
  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error);
  }
};

// Sincroniza o modelo e cria o admin
sequelize.sync()
  .then(() => {
    console.log('✅ Modelo User sincronizado com o banco de dados');
    createDefaultAdmin();
  })
  .catch(err => {
    console.error('❌ Erro ao sincronizar modelo User:', err);
  });

module.exports = User; 
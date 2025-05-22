const Product = require('../models/Product');

const seedProducts = async () => {
  try {
    // Verifica se já existem produtos
    const count = await Product.count();
    if (count > 0) {
      console.log('✅ Produtos já existem no banco de dados');
      return;
    }

    // Produtos iniciais
    const produtos = [
      {
        name: 'Notebook Dell Inspiron',
        description: 'Notebook Dell Inspiron 15 polegadas, 8GB RAM, SSD 256GB',
        price: 3599.99,
        quantity: 15,
        minQuantity: 5,
        unit: 'un',
        category: 'Eletrônicos'
      },
      {
        name: 'Mouse Wireless Logitech',
        description: 'Mouse sem fio Logitech M185',
        price: 89.90,
        quantity: 50,
        minQuantity: 10,
        unit: 'un',
        category: 'Periféricos'
      },
      {
        name: 'Teclado Mecânico',
        description: 'Teclado Mecânico RGB Switch Blue',
        price: 299.90,
        quantity: 30,
        minQuantity: 8,
        unit: 'un',
        category: 'Periféricos'
      },
      {
        name: 'Monitor LED 24"',
        description: 'Monitor LED 24 polegadas Full HD',
        price: 899.90,
        quantity: 20,
        minQuantity: 5,
        unit: 'un',
        category: 'Monitores'
      },
      {
        name: 'Headset Gamer',
        description: 'Headset Gamer 7.1 Surround',
        price: 199.90,
        quantity: 40,
        minQuantity: 10,
        unit: 'un',
        category: 'Áudio'
      }
    ];

    // Insere os produtos
    await Product.bulkCreate(produtos);
    console.log('✅ Produtos de exemplo criados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar produtos de exemplo:', error);
  }
};

module.exports = seedProducts; 
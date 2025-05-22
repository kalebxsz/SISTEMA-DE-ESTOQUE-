const asyncHandler = require('express-async-handler');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const Product = require('../models/Product');
const { AppError } = require('../middleware/errorHandler');

// Listar todos os produtos com filtros e paginação
exports.listProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, status, search } = req.query;
  const offset = (page - 1) * limit;
  
  const where = {};
  if (category) where.category = category;
  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
      { sku: { [Op.iLike]: `%${search}%` } }
    ];
  }

  const { count, rows: products } = await Product.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['createdAt', 'DESC']]
  });

  res.json({
    products,
    currentPage: parseInt(page),
    totalPages: Math.ceil(count / limit),
    totalItems: count
  });
});

// Buscar produto por ID
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    throw new AppError('Produto não encontrado', 404);
  }
  res.json(product);
});

// Criar produto
exports.createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new AppError(error.errors.map(e => e.message).join(', '), 400);
    }
    if (error instanceof UniqueConstraintError) {
      throw new AppError('SKU já está em uso', 400);
    }
    throw error;
  }
});

// Atualizar produto
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    throw new AppError('Produto não encontrado', 404);
  }

  try {
    const updatedProduct = await product.update(req.body);
    res.json(updatedProduct);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new AppError(error.errors.map(e => e.message).join(', '), 400);
    }
    if (error instanceof UniqueConstraintError) {
      throw new AppError('SKU já está em uso', 400);
    }
    throw error;
  }
});

// Deletar produto
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    throw new AppError('Produto não encontrado', 404);
  }

  await product.destroy();
  res.status(204).end();
});

// Atualizar estoque
exports.updateStock = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    throw new AppError('Quantidade deve ser um número', 400);
  }

  const product = await Product.findByPk(req.params.id);
  if (!product) {
    throw new AppError('Produto não encontrado', 404);
  }

  const newQuantity = product.quantity + quantity;
  if (newQuantity < 0) {
    throw new AppError('Quantidade em estoque não pode ser negativa', 400);
  }

  product.quantity = newQuantity;
  await product.save();

  res.json(product);
}); 
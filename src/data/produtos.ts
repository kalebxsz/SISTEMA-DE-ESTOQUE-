import { Produto } from '../types';

export const PRODUTOS_MOCK: Produto[] = [
  {
    id: '1',
    nome: 'Notebook Dell Inspiron',
    descricao: 'Notebook Dell Inspiron 15 i5-1135G7 8GB 256GB SSD 15.6" Windows 11',
    categoria: 'Eletrônicos',
    preco: 3599.90,
    quantidade: 15,
    estoqueMinimo: 5,
    codigoBarras: '7891234567890',
    fornecedor: 'Dell Computadores',
    imagem: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    dataCriacao: new Date('2023-01-15'),
    dataAtualizacao: new Date('2023-01-15')
  },
  {
    id: '2',
    nome: 'Smartphone Samsung Galaxy S21',
    descricao: 'Smartphone Samsung Galaxy S21 128GB 8GB RAM Tela 6.2" Câmera Tripla',
    categoria: 'Eletrônicos',
    preco: 2999.90,
    quantidade: 8,
    estoqueMinimo: 3,
    codigoBarras: '7891234567891',
    fornecedor: 'Samsung Brasil',
    imagem: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    dataCriacao: new Date('2023-02-10'),
    dataAtualizacao: new Date('2023-05-20')
  },
  {
    id: '3',
    nome: 'Monitor LG UltraWide',
    descricao: 'Monitor LG UltraWide 29" 29WK600 IPS Full HD HDR 2560x1080 FreeSync',
    categoria: 'Eletrônicos',
    preco: 1599.90,
    quantidade: 3,
    estoqueMinimo: 2,
    codigoBarras: '7891234567892',
    fornecedor: 'LG Electronics',
    imagem: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    dataCriacao: new Date('2023-03-05'),
    dataAtualizacao: new Date('2023-03-05')
  },
  {
    id: '4',
    nome: 'Teclado Mecânico Logitech G Pro',
    descricao: 'Teclado Mecânico Gamer Logitech G Pro RGB Switch GX Blue ABNT2',
    categoria: 'Periféricos',
    preco: 599.90,
    quantidade: 12,
    estoqueMinimo: 4,
    codigoBarras: '7891234567893',
    fornecedor: 'Logitech Brasil',
    imagem: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    dataCriacao: new Date('2023-04-12'),
    dataAtualizacao: new Date('2023-04-12')
  }
];

export const MOVIMENTACOES_MOCK = [
  {
    id: '1',
    produtoId: '1',
    tipo: 'entrada',
    quantidade: 10,
    data: new Date('2023-01-15'),
    responsavelId: '1',
    observacao: 'Compra inicial'
  },
  {
    id: '2',
    produtoId: '1',
    tipo: 'saida',
    quantidade: 2,
    data: new Date('2023-02-10'),
    responsavelId: '2',
    observacao: 'Venda para cliente'
  },
  {
    id: '3',
    produtoId: '2',
    tipo: 'entrada',
    quantidade: 5,
    data: new Date('2023-02-15'),
    responsavelId: '1',
    observacao: 'Reposição de estoque'
  }
] as const;
import React from 'react';
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';
import { PRODUTOS_MOCK } from '../data/produtos';

const Dashboard = () => {
  // Calcular estatísticas
  const totalProdutos = PRODUTOS_MOCK.length;
  const valorTotalEstoque = PRODUTOS_MOCK.reduce(
    (total, produto) => total + produto.preco * produto.quantidade,
    0
  );
  const produtosBaixoEstoque = PRODUTOS_MOCK.filter(
    (produto) => produto.quantidade <= produto.estoqueMinimo
  );

  const cards = [
    {
      title: 'Total de Produtos',
      value: totalProdutos,
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Valor do Estoque',
      value: `R$ ${valorTotalEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Produtos com Estoque Baixo',
      value: produtosBaixoEstoque.length,
      icon: AlertTriangle,
      color: 'bg-yellow-500'
    },
    {
      title: 'Movimentações Recentes',
      value: '8',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-600">{card.title}</div>
              <div className={`p-2 rounded-md ${card.color}`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Produtos com Estoque Baixo</h2>
          {produtosBaixoEstoque.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produto
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantidade
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mínimo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {produtosBaixoEstoque.map((produto) => (
                    <tr key={produto.id}>
                      <td className="px-4 py-2 whitespace-nowrap">{produto.nome}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          {produto.quantidade}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">{produto.estoqueMinimo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">Nenhum produto com estoque baixo.</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Movimentações Recentes</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 border-l-4 border-green-500 bg-green-50 rounded-r-md">
              <div className="ml-2">
                <p className="text-sm font-medium">Entrada: Notebook Dell Inspiron</p>
                <p className="text-xs text-gray-500">Quantidade: 5 • Hoje, 14:30</p>
              </div>
            </div>
            <div className="flex items-center p-3 border-l-4 border-red-500 bg-red-50 rounded-r-md">
              <div className="ml-2">
                <p className="text-sm font-medium">Saída: Smartphone Samsung Galaxy S21</p>
                <p className="text-xs text-gray-500">Quantidade: 2 • Hoje, 11:15</p>
              </div>
            </div>
            <div className="flex items-center p-3 border-l-4 border-green-500 bg-green-50 rounded-r-md">
              <div className="ml-2">
                <p className="text-sm font-medium">Entrada: Teclado Mecânico Logitech G Pro</p>
                <p className="text-xs text-gray-500">Quantidade: 10 • Ontem, 16:45</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
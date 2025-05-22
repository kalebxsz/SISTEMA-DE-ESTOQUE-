import React, { useState } from 'react';
import { Plus, Filter, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { MOVIMENTACOES_MOCK } from '../../data/produtos';
import { PRODUTOS_MOCK } from '../../data/produtos';

const MovimentacoesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Combinar dados para mostrar informações do produto
  const movimentacoesComProdutos = MOVIMENTACOES_MOCK.map((mov) => {
    const produto = PRODUTOS_MOCK.find((p) => p.id === mov.produtoId);
    return {
      ...mov,
      produto
    };
  });
  
  // Filtrar movimentações com base no termo de busca
  const movimentacoesFiltradas = movimentacoesComProdutos.filter((mov) =>
    mov.produto?.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movimentações de Estoque</h1>
        <div className="flex gap-2">
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center transition-colors">
            <ArrowDown className="h-5 w-5 mr-1" />
            Entrada
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center transition-colors">
            <ArrowUp className="h-5 w-5 mr-1" />
            Saída
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por produto..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            Filtros
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Responsável
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Observação
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movimentacoesFiltradas.map((movimentacao) => (
                <tr key={movimentacao.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {movimentacao.produto?.imagem ? (
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={movimentacao.produto.imagem}
                          alt={movimentacao.produto.nome}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-gray-200" />
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {movimentacao.produto?.nome}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        movimentacao.tipo === 'entrada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {movimentacao.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {movimentacao.quantidade} unidades
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {movimentacao.data.toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {movimentacao.data.toLocaleTimeString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {movimentacao.responsavelId === '1' ? 'Administrador' : 'Usuário Comum'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {movimentacao.observacao || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {movimentacoesFiltradas.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Nenhuma movimentação encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovimentacoesPage;
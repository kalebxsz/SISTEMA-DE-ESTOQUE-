import React, { useState } from 'react';
import { BarChart2, Download, Calendar, FileText, PieChart } from 'lucide-react';
import { PRODUTOS_MOCK } from '../../data/produtos';

const RelatoriosPage = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes');
  
  const categorias = [...new Set(PRODUTOS_MOCK.map((produto) => produto.categoria))];
  const produtosPorCategoria = categorias.map((categoria) => {
    const produtos = PRODUTOS_MOCK.filter((produto) => produto.categoria === categoria);
    return {
      categoria,
      quantidade: produtos.length,
      valorTotal: produtos.reduce((total, produto) => total + produto.preco * produto.quantidade, 0)
    };
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center transition-colors">
          <Download className="h-5 w-5 mr-1" />
          Exportar
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <button
            className={`py-2 px-4 rounded-md ${
              periodoSelecionado === 'dia'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setPeriodoSelecionado('dia')}
          >
            Hoje
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              periodoSelecionado === 'semana'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setPeriodoSelecionado('semana')}
          >
            Última semana
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              periodoSelecionado === 'mes'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setPeriodoSelecionado('mes')}
          >
            Último mês
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              periodoSelecionado === 'ano'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setPeriodoSelecionado('ano')}
          >
            Último ano
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              periodoSelecionado === 'personalizado'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setPeriodoSelecionado('personalizado')}
          >
            <Calendar className="h-4 w-4 inline mr-1" />
            Personalizado
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Produtos por Categoria</h2>
            <PieChart className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {produtosPorCategoria.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{item.categoria}</span>
                  <span className="text-sm text-gray-600">{item.quantidade} produtos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(item.quantidade / PRODUTOS_MOCK.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Valor em Estoque por Categoria</h2>
            <BarChart2 className="h-5 w-5 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            {produtosPorCategoria.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{item.categoria}</span>
                  <span className="text-sm text-gray-600">
                    {item.valorTotal.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (item.valorTotal /
                          produtosPorCategoria.reduce((acc, curr) => acc + curr.valorTotal, 0)) *
                        100
                      }%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Relatórios Disponíveis</h2>
          <FileText className="h-5 w-5 text-gray-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <h3 className="font-medium mb-2">Inventário Atual</h3>
            <p className="text-sm text-gray-600 mb-4">
              Lista completa de todos os produtos em estoque com quantidades e valores.
            </p>
            <button className="text-blue-600 text-sm flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Gerar Relatório
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <h3 className="font-medium mb-2">Movimentações do Período</h3>
            <p className="text-sm text-gray-600 mb-4">
              Todas as entradas e saídas de produtos no período selecionado.
            </p>
            <button className="text-blue-600 text-sm flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Gerar Relatório
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <h3 className="font-medium mb-2">Produtos com Estoque Baixo</h3>
            <p className="text-sm text-gray-600 mb-4">
              Produtos com estoque abaixo do mínimo estabelecido.
            </p>
            <button className="text-blue-600 text-sm flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Gerar Relatório
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <h3 className="font-medium mb-2">Análise de Fornecedores</h3>
            <p className="text-sm text-gray-600 mb-4">
              Produtos agrupados por fornecedor com estatísticas relevantes.
            </p>
            <button className="text-blue-600 text-sm flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Gerar Relatório
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <h3 className="font-medium mb-2">Histórico de Preços</h3>
            <p className="text-sm text-gray-600 mb-4">
              Evolução dos preços dos produtos ao longo do tempo.
            </p>
            <button className="text-blue-600 text-sm flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Gerar Relatório
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <h3 className="font-medium mb-2">Relatório Financeiro</h3>
            <p className="text-sm text-gray-600 mb-4">
              Resumo financeiro do valor total em estoque e movimentações.
            </p>
            <button className="text-blue-600 text-sm flex items-center">
              <Download className="h-4 w-4 mr-1" />
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatoriosPage;
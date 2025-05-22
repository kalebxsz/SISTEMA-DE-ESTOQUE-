import { useState, useEffect } from 'react';
import { Product, productService } from '../services/api';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  async function loadProducts() {
    try {
      const data = await productService.list({ page: currentPage, limit: 10 });
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      setMessage('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStock(id: number, quantity: number) {
    try {
      await productService.updateStock(id, quantity);
      setMessage('Estoque atualizado com sucesso');
      loadProducts();
    } catch (error) {
      setMessage('Erro ao atualizar estoque');
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Produtos em Estoque</h2>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${
          message.includes('Erro') 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">
                Preço: R$ {product.price.toFixed(2)}
              </span>
              <span className={`px-2 py-1 rounded text-sm ${
                product.quantity <= product.minQuantity 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                Estoque: {product.quantity} {product.unit}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleUpdateStock(product.id, -1)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -
              </button>
              <button
                onClick={() => handleUpdateStock(product.id, 1)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 my-8">
          Nenhum produto encontrado
        </p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
} 
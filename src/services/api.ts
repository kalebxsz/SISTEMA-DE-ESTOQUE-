import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  minQuantity: number;
  unit: string;
  category: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export const productService = {
  // Listar produtos
  list: async (params?: { page?: number; limit?: number; category?: string; search?: string }) => {
    const response = await api.get<{
      products: Product[];
      currentPage: number;
      totalPages: number;
      totalItems: number;
    }>('/products', { params });
    return response.data;
  },

  // Buscar produto por ID
  getById: async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Criar produto
  create: async (product: Omit<Product, 'id' | 'lastUpdated' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post<Product>('/products', product);
    return response.data;
  },

  // Atualizar produto
  update: async (id: number, product: Partial<Product>) => {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  // Deletar produto
  delete: async (id: number) => {
    await api.delete(`/products/${id}`);
  },

  // Atualizar estoque
  updateStock: async (id: number, quantity: number) => {
    const response = await api.patch<Product>(`/products/${id}/stock`, { quantity });
    return response.data;
  }
}; 
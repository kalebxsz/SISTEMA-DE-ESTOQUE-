export interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  role: 'admin' | 'comum';
  ativo: boolean;
  dataCriacao: Date;
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
  quantidade: number;
  estoqueMinimo: number;
  codigoBarras?: string;
  fornecedor?: string;
  imagem?: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface Movimentacao {
  id: string;
  produtoId: string;
  tipo: 'entrada' | 'saida';
  quantidade: number;
  data: Date;
  responsavelId: string;
  observacao?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

export interface SidebarItem {
  title: string;
  path: string;
  icon: React.ComponentType;
  adminOnly: boolean;
}
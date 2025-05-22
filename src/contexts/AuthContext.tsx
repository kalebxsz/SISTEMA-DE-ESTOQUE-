import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType, User } from '../types';

// Mock data para autenticação (em produção, isso viria de uma API)
const MOCK_USERS: User[] = [
  {
    id: '1',
    nome: 'Administrador',
    email: 'admin@estoque.com',
    senha: 'admin123',
    role: 'admin',
    ativo: true,
    dataCriacao: new Date()
  },
  {
    id: '2',
    nome: 'Usuário Comum',
    email: 'usuario@estoque.com',
    senha: 'usuario123',
    role: 'comum',
    ativo: true,
    dataCriacao: new Date()
  }
];

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  isAdmin: () => false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Verificar se há um usuário no localStorage ao iniciar
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, senha: string) => {
    // Simulando chamada de API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (user) => user.email === email && user.senha === senha && user.ativo
        );
        
        if (foundUser) {
          // Remover a senha antes de armazenar
          const { senha: _, ...userWithoutPassword } = foundUser;
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve();
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
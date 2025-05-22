import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import LoginForm from './components/Autenticacao/LoginForm';
import Dashboard from './pages/Dashboard';
import ProdutosPage from './pages/Produtos';
import UsuariosPage from './pages/Usuarios';
import MovimentacoesPage from './pages/Movimentacoes';
import RelatoriosPage from './pages/Relatorios';

// Componente para rotas protegidas
const RotaProtegida = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
                <MainLayout />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="produtos" element={<ProdutosPage />} />
            <Route path="usuarios" element={<UsuariosPage />} />
            <Route path="movimentacoes" element={<MovimentacoesPage />} />
            <Route path="relatorios" element={<RelatoriosPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { ProductList } from './components/ProductList';
import { PrivateRoute } from './components/PrivateRoute';
import { useAuthStore } from './stores/authStore';

function App() {
  const isAuthenticated = useAuthStore((state: { isAuthenticated: boolean }) => state.isAuthenticated);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Sistema de Gerenciamento do Estoque Villela
            </h1>
          </div>
        </header>

        <main>
          <Routes>
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/produtos" replace /> : <LoginForm />} 
            />
            <Route
              path="/produtos"
              element={
                <PrivateRoute>
                  <ProductList />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={<Navigate to="/produtos" replace />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
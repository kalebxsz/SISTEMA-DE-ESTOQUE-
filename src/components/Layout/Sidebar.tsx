import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Users, BarChart2, Home, LogOut, ShoppingCart, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SidebarItem } from '../../types';

const Sidebar = () => {
  const location = useLocation();
  const { isAdmin, logout } = useAuth();
  
  const menuItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      path: '/',
      icon: Home,
      adminOnly: false
    },
    {
      title: 'Produtos',
      path: '/produtos',
      icon: Package,
      adminOnly: false
    },
    {
      title: 'Movimentações',
      path: '/movimentacoes',
      icon: ShoppingCart,
      adminOnly: false
    },
    {
      title: 'Relatórios',
      path: '/relatorios',
      icon: BarChart2,
      adminOnly: false
    },
    {
      title: 'Usuários',
      path: '/usuarios',
      icon: Users,
      adminOnly: true
    }
  ];

  const filteredMenuItems = menuItems.filter(item => !item.adminOnly || isAdmin());

  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <img src= " ../public/images/Logo.png" className="h-8 w-8 text-blue-500" />
        <span className="text-xl font-bold">EstoqueJá</span>
      </div>
      
      <div className="flex-1">
        <ul>
          {filteredMenuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <button
        onClick={logout}
        className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700 mt-auto"
      >
        <LogOut className="h-5 w-5 mr-3" />
        <span>Sair</span>
      </button>
    </div>
  );
};

export default Sidebar;
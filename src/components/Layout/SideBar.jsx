// src/components/Layout/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';
import {
  Home,
  Package,
  BarChart2,
  AlertTriangle,
  Settings,
  Users,
  Menu,
} from 'lucide-react';

const navItems = [
  { title: 'Dashboard', to: '/dashboard', icon: <Home size={18} /> },
  { title: 'Produtos', to: '/products', icon: <Package size={18} /> },
  { title: 'Alertas', to: '/alerts', icon: <AlertTriangle size={18} /> },
  {
    title: 'Relatórios',
    to: '/reports',
    icon: <BarChart2 size={18} />,
    adminOnly: true,
  },
  {
    title: 'Usuários',
    to: '/users',
    icon: <Users size={18} />,
    adminOnly: true,
  },
  { title: 'Configurações', to: '/settings', icon: <Settings size={18} /> },
];

const SideNavItem = ({ icon, title, to, adminOnly = false }) => {
  const { user } = useAuth();
  if (adminOnly && user?.role !== 'ADMIN') return null;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-4 py-2 rounded-md transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-sidebar-accent text-sidebar-foreground'
        )
      }
    >
      {icon}
      <span className="flex-1">{title}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  if (!isAuthenticated) return null;

  return (
    <>
      {/* botão mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white md:hidden"
        onClick={() => setOpen(!open)}
      >
        <Menu size={24} />
      </button>

      {/* sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-gray-200 z-40 transform transition-transform',
          open ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:top-14 md:h-[calc(100vh-3.5rem)]'
        )}
      >
        <div className="p-4 space-y-1">
          {navItems.map(item => (
            <SideNavItem key={item.to} {...item} />
          ))}
        </div>
      </aside>

      {/* overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;

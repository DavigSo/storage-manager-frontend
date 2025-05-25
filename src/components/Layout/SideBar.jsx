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
          'flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors transition-transform duration-200',
          isActive
            ? 'bg-[#f68597] text-white scale-105'
            : 'text-[#f68597] hover:bg-[#f68597] hover:text-white hover:scale-105'
        )
      }
    >
      {icon}
      <span className="flex-1">{title}</span>
    </NavLink>
  );
};

const Sidebar = ({ open, onClose }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <>
      {/* botão mobile */}
      {open && (
        <div className="fixed inset-0  z-30 md:hidden" onClick={onClose} />
      )}

      {/* sidebar */}
      <aside
        className={cn(
          'bg-[#feebee] fixed left-0 w-64 bg-sidebar border-r border-gray-200 z-40 transform transition-transform',
          'top-14 h-[calc(100vh-3.5rem)]',
          open ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0'
        )}
      >
        <div className="p-4 space-y-1">
          {navItems.map(item => (
            <SideNavItem key={item.to} {...item} />
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

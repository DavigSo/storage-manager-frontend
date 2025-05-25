import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

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
      <div className="w-5 h-5">{icon}</div>
      <span className="flex-1">{title}</span>
    </NavLink>
  );
};

export default SideNavItem;

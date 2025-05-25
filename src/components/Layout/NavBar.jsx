import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png';
import { Menu } from 'lucide-react';

export default function NavBar({ onToggleSidebar }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#feebee] p-4 shadow-md h-14 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <button
              className="p-2 rounded-md bg-primary text-white md:hidden"
              onClick={onToggleSidebar}
            >
              <Menu
                size={20}
                className="text-[#f68597]
    cursor-pointer
    transition-transform
    duration-200
    ease-in-out
    hover:scale-110 "
              />
            </button>
          )}
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="flex items-center"
          >
            <img src={logo} alt="Storage Manager" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="space-x-4 text-[#f68597]">
          {isAuthenticated ? (
            <>
              <span className="text-sm font-medium">Olá, {user.name}</span>
              <button onClick={logout} className="hover:underline">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

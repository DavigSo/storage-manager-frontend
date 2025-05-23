// src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png'; // ajuste o caminho conforme sua pasta

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="top-0 left-0 w-full z-50 bg-[#feebee] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Storage Manager" className="h-10 w-15" />
        </Link>
        <div className="space-x-4 text-[#f68597]">
          {user ? (
            <>
              <span className="text-sm font-medium">Olá, {user.name}</span>
              <button
                onClick={handleLogout}
                className="hover:underline cursor-pointer"
              >
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

export default NavBar;

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="top-0 left-0 w-full z-50 bg-[#feebee] text-[#f68597] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Storage Manager
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/create-product" className="hover:underline">
                Criar Produto
              </Link>
              <Link to="/manage-product" className="hover:underline">
                Gerenciar Produtos
              </Link>
              <button onClick={handleLogout} className="hover:underline">
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

import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../components/Forms/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#bbe4e5] px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#f68597]">Storage Manager</h1>
          <h2 className="mt-2 text-3xl text-[#4bb9ba]">
            Abrace um Recém-Nascido
          </h2>
          <p className="mt-2 text-3xl text-[#4bb9ba]">
            Faça login para acessar o sistema de gerencimanto de estoque
          </p>
        </div>

        <LoginForm />

        <div className="text-center mt-4">
          <p className="text-xl text-[#f68597]">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-[#4bb9ba] hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

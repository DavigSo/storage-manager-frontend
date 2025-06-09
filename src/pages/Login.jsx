import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../components/Forms/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import bg from '../assets/bg-login.png';

function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="bg-[#8FD3D5] min-h-screen pt-14 flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#f68597]">
            Abrace um Recém-Nascidor
          </h1>

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

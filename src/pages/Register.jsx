import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from '../components/forms/RegisterForm';
import bg from '../assets/bg-login.png';

function Register() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="bg-[#8FD3D5] h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <p className="mt-2 text-3xl text-[#f68597]">
            Crie sua conta para acessar o sistema de gerenciamento de estoque
          </p>
        </div>

        <RegisterForm />

        <div className="text-center mt-4">
          <p className="text-xl text-[#f68597]">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-[#4bb9ba] hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>

      {/* Container para as toasts */}
      <ToastContainer />
    </div>
  );
}

export default Register;

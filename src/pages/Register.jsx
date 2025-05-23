import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from '../components/forms/RegisterForm';

function Register() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#bbe4e5] px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#f68597]">Storage Manager</h1>
          <p className="mt-2 text-3xl text-[#4bb9ba]">
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

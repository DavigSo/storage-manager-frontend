import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg bg-[#feebee] text-card-foreground shadow-sm">
        <h1 className="flex flex-col space-y-1.5 p-6 text-5xl font-bold text-[#f68597]">
          Acessar Conta
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="p-6 pt-0 space-y-4">
            <div className="space-y-2">
              <label className="text-[#4bb9ba] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border-input 
                     bg-white px-3 py-2 text-[#f68597] 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium 
                    file:text-foreground placeholder:text-[#f68597]
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[#4bb9ba] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Senha
                </label>
                <a href="" className="text-sm text-[#4bb9ba] hover:underline">
                  Esqueceu sua senha?
                </a>
              </div>
              <input
                className="flex h-10 w-full rounded-md border-input 
                     bg-white px-3 py-2 text-[#f68597] 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium 
                    file:text-foreground placeholder:text-[#f68597]
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-ring focus-visible:ring-offset-2 
                    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="password"
                type="password"
                placeholder="*********"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-5 w-5 accent-[#f68597] cursor-pointer rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f68597]"
                id="remember"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#4bb9ba]"
              >
                Lembrar-me
              </label>
            </div>
          </div>
          <div className="flex items-center p-6 pt-0">
            <Link
              to="/dashboard"
              className="
                w-full                     
                bg-[#f68597]               
                text-white               
                font-medium               
                px-4 py-2                  
                rounded-md                 
                shadow-md                  
                hover:bg-[#e76a88]         
                focus:outline-none         
                focus:ring-2               
                focus:ring-[#f68597]      
                transition                 
                duration-200              
              "
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : 'Entrar'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

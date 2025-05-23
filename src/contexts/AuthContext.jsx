import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Simular verificação de token com o backend
      // Aqui você faria uma chamada para validar o token
      setUser({ role: 'USER' }); // Exemplo: substituir por dados reais
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      // Simular chamada ao backend (substituir por Axios)
      const response = {
        token: 'fake-jwt-token',
        user: { email, role: 'USER', password },
      };
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      navigate('/');
    } catch (error) {
      console.error('Erro de login:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

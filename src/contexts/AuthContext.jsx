import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const storedToken = localStorage.getItem('token');
  const storedUserJson = localStorage.getItem('userData');
  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(
    storedUserJson ? JSON.parse(storedUserJson) : null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const stored = JSON.parse(localStorage.getItem('userData'));
      setUser(stored);
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (!email || password.length < 6) {
        toast.error('Credenciais inválidas');
        return false;
      }
      await new Promise(res => setTimeout(res, 500)); // delay simulado

      const fakeUser = { name: 'Usuário Exemplo', email, role: 'USER' };
      const fakeToken = 'fake-jwt-token';

      localStorage.setItem('token', fakeToken);
      localStorage.setItem('userData', JSON.stringify(fakeUser));
      setToken(fakeToken);
      setUser(fakeUser);

      toast.success('Login realizado com sucesso!');
      return true;
    } catch (err) {
      console.error(err);
      toast.error('Erro no login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      if (!name || !email || password.length < 6) {
        toast.error('Dados de registro inválidos');
        return false;
      }
      await new Promise(res => setTimeout(res, 500));

      const fakeUser = { name, email, role: 'USER' };
      const fakeToken = 'fake-jwt-token';

      localStorage.setItem('token', fakeToken);
      localStorage.setItem('userData', JSON.stringify(fakeUser));
      setToken(fakeToken);
      setUser(fakeUser);

      toast.success('Registro concluído com sucesso!');
      return true;
    } catch (err) {
      console.error(err);
      toast.error('Erro no registro');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    toast.info('Você saiu da conta');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading: loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}

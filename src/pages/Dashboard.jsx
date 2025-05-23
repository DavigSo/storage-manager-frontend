import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import StockOverview from '../components/dashboard/StockOverview';

function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }
  return (
    <div className="bg-[#bbe4e5] pt-16 pl-64">
      <div className="p-6">
        <h1 className="text-2xl text-[#d37080] font-bold mb-6">
          Painel de controle
        </h1>
        <div className="space-y-8">
          <StockOverview />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

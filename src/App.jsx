import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/Layout/NavBar';
import './App.css';
import Dashboard from './pages/Dashboard';
import { ProductProvider } from './contexts/ProductContext';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ProductProvider>
      <Toaster />
      <div className="min-h-screen bg-gray-600">
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </ProductProvider>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/Layout/NavBar';
import './App.css';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import { ProductProvider } from './contexts/ProductContext';
import { Toaster } from './components/ui/toaster';
import Sidebar from './components/Layout/SideBar';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ProductProvider>
      <Toaster />
      <NavBar onToggleSidebar={() => setSidebarOpen(v => !v)} />
      <div className="min-h-screen bg-[#8FD3D5] ">
        <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </ProductProvider>
  );
}

export default App;

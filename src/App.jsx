import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/Layout/NavBar';
import Sidebar from './components/Layout/SideBar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from "./pages/ProductDetail";
import ProductForm from './components/forms/ProductForm';
import { ProductProvider } from './contexts/ProductContext';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProductProvider>
      <Toaster />
      <NavBar onToggleSidebar={() => setSidebarOpen(v => !v)} />
      <div className="min-h-screen bg-[#8FD3D5]">
        <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:id"
            element={
              <div className="pt-16 pl-64">
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Detalhes do Produto</h1>
                  <ProductDetail />
                </div>
              </div>
            }
          />
          <Route
            path="/products/add"
            element={
              <div className="pt-16 pl-64">
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Adicionar Produto</h1>
                  <ProductForm />
                </div>
              </div>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <div className="pt-16 pl-64">
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
                  <ProductForm isEdit={true} />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </ProductProvider>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';
import api from '../services/api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    getProducts();
  }, []);

  const handleError = err => {
    console.error(err);
    const message =
      err.response?.data?.message || err.message || 'Erro desconhecido.';
    setError(message);
    toast({
      title: 'Erro',
      description: message,
      variant: 'destructive',
    });
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/items');
      setProducts(data);
      setError(null);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = id => products.find(p => p._id === id);

  const addProduct = async product => {
    setLoading(true);
    try {
      const { data } = await api.post('/items', product);
      setProducts(prev => [...prev, data]);
      toast({
        title: 'Produto adicionado',
        description: 'O produto foi adicionado com sucesso.',
      });
      return true;
    } catch (err) {
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, updates) => {
    setLoading(true);
    try {
      const { data } = await api.put(`/items/${id}`, updates);
      setProducts(prev => prev.map(p => (p._id === id ? data : p)));
      toast({
        title: 'Produto atualizado',
        description: 'O produto foi atualizado com sucesso.',
      });
      return true;
    } catch (err) {
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async id => {
    setLoading(true);
    try {
      await api.delete(`/items/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast({
        title: 'Produto excluído',
        description: 'O produto foi excluído com sucesso.',
      });
      return true;
    } catch (err) {
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const lowStockProducts = products.filter(p => p.quantity < p.minimumStock);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        getProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        lowStockProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx)
    throw new Error('useProducts deve ser usado dentro de ProductProvider');
  return ctx;
};

export const getCategoryName = category =>
  ({
    ROUPA_0_3M: 'Roupas 0-3 meses',
    ROUPA_3_6M: 'Roupas 3-6 meses',
    ROUPA_6_9M: 'Roupas 6-9 meses',
    ROUPA_9_12M: 'Roupas 9-12 meses',
    UTILITARIOS: 'Utilitários',
    HIGIENE: 'Higiene',
  })[category] || category;

export const getGenderName = gender =>
  ({
    MASCULINO: 'Masculino',
    FEMININO: 'Feminino',
    UNISEX: 'Unissex',
  })[gender] || gender;

export const getCategoryOptions = () => [
  { value: 'ROUPA_0_3M', label: getCategoryName('ROUPA_0_3M') },
  { value: 'ROUPA_3_6M', label: getCategoryName('ROUPA_3_6M') },
  { value: 'ROUPA_6_9M', label: getCategoryName('ROUPA_6_9M') },
  { value: 'ROUPA_9_12M', label: getCategoryName('ROUPA_9_12M') },
  { value: 'UTILITARIOS', label: getCategoryName('UTILITARIOS') },
  { value: 'HIGIENE', label: getCategoryName('HIGIENE') },
];

export const getGenderOptions = () => [
  { value: 'MASCULINO', label: getGenderName('MASCULINO') },
  { value: 'FEMININO', label: getGenderName('FEMININO') },
  { value: 'UNISEX', label: getGenderName('UNISEX') },
];

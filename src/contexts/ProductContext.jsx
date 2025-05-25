import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';

const ProductContext = createContext();

const mockProducts = [
  {
    id: '1',
    name: 'Body de algodão',
    category: 'ROUPA_0_3M',
    gender: 'UNISEX',
    quantity: 15,
    minimumStock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Macacão manga longa',
    category: 'ROUPA_0_3M',
    gender: 'MASCULINO',
    quantity: 8,
    minimumStock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Macacão manga longa',
    category: 'ROUPA_0_3M',
    gender: 'FEMININO',
    quantity: 12,
    minimumStock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Fraldas descartáveis P',
    category: 'HIGIENE',
    gender: 'UNISEX',
    quantity: 5,
    minimumStock: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Toalha com capuz',
    category: 'UTILITARIOS',
    gender: 'UNISEX',
    quantity: 18,
    minimumStock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      // simula fetch
      await new Promise(res => setTimeout(res, 1000));
      setProducts(mockProducts);
      setError(null);
    } catch {
      setError('Falha ao carregar produtos.');
      toast({
        title: 'Erro',
        description: 'Falha ao carregar produtos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getProductById = id => products.find(p => p.id === id);

  const addProduct = async product => {
    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1000));
      const newProduct = {
        ...product,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: 'Produto adicionado',
        description: 'O produto foi adicionado com sucesso.',
      });
      return true;
    } catch {
      setError('Falha ao adicionar produto.');
      toast({
        title: 'Erro',
        description: 'Falha ao adicionar produto.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, update) => {
    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1000));
      setProducts(prev =>
        prev.map(p =>
          p.id === id
            ? { ...p, ...update, updatedAt: new Date().toISOString() }
            : p
        )
      );
      toast({
        title: 'Produto atualizado',
        description: 'O produto foi atualizado com sucesso.',
      });
      return true;
    } catch {
      setError('Falha ao atualizar produto.');
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar produto.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async id => {
    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1000));
      setProducts(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'Produto excluído',
        description: 'O produto foi excluído com sucesso.',
      });
      return true;
    } catch {
      setError('Falha ao excluir produto.');
      toast({
        title: 'Erro',
        description: 'Falha ao excluir produto.',
        variant: 'destructive',
      });
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

// Helpers para nomes legíveis
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

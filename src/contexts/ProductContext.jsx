// File: src/contexts/ProductContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


// Define product-related types
export type ProductCategory = 'ROUPA_0_3M' | 'ROUPA_3_6M' | 'ROUPA_6_9M' | 'ROUPA_9_12M' | 'UTILITARIOS' | 'HIGIENE';
export type ProductGender = 'MASCULINO' | 'FEMININO' | 'UNISEX';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  gender: ProductGender;
  quantity: number;
  minimumStock: number;
  expirationDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  lowStockProducts: Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const mockProducts: Product[] = [
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

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    getProducts();
  }, []);
  
  const getProducts = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call
      setProducts(mockProducts);
      setError(null);
    } catch (err) {
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
  
  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };
  
  const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new product with generated ID and timestamps
      const newProduct: Product = {
        ...product,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setProducts(prevProducts => [...prevProducts, newProduct]);
      
      toast({
        title: 'Produto adicionado',
        description: 'O produto foi adicionado com sucesso.',
      });
      
      return true;
    } catch (err) {
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
  
  const updateProduct = async (id: string, productUpdate: Partial<Product>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(prevProducts => prevProducts.map(product => {
        if (product.id === id) {
          return {
            ...product,
            ...productUpdate,
            updatedAt: new Date().toISOString(),
          };
        }
        return product;
      }));
      
      toast({
        title: 'Produto atualizado',
        description: 'O produto foi atualizado com sucesso.',
      });
      
      return true;
    } catch (err) {
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
  
  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      
      toast({
        title: 'Produto excluído',
        description: 'O produto foi excluído com sucesso.',
      });
      
      return true;
    } catch (err) {
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
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};

export const getCategoryName = (category: ProductCategory): string => {
  const map: Record<ProductCategory, string> = {
    ROUPA_0_3M: 'Roupas 0-3 meses',
    ROUPA_3_6M: 'Roupas 3-6 meses',
    ROUPA_6_9M: 'Roupas 6-9 meses',
    ROUPA_9_12M: 'Roupas 9-12 meses',
    UTILITARIOS: 'Utilitários',
    HIGIENE: 'Higiene',
  };
  return map[category] || category;
};

export const getGenderName = (gender: ProductGender): string => {
  const map: Record<ProductGender, string> = {
    MASCULINO: 'Masculino',
    FEMININO: 'Feminino',
    UNISEX: 'Unissex',
  };
  return map[gender] || gender;
};
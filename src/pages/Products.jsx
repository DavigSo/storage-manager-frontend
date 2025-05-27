import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import Input from '../components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

const Products = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { products, loading, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const getCategoryOptions = () => {
    const categories = ['ROUPA', 'HIGIENE', 'UTILITARIO'];
    return categories.map(category => ({
      value: category,
      label:
        category === 'ROUPA'
          ? 'Roupa'
          : category === 'HIGIENE'
            ? 'Higiene'
            : 'Utilitário',
    }));
  };

  const getGenderOptions = () => {
    const genders = ['MASCULINO', 'FEMININO', 'UNISSEX'];
    return genders.map(gender => ({
      value: gender,
      label:
        gender === 'MASCULINO'
          ? 'Masculino'
          : gender === 'FEMININO'
            ? 'Feminino'
            : 'Unissex',
    }));
  };

  const categoryOptions = [
    { value: 'all', label: 'Todas as categorias' },
    ...getCategoryOptions(),
  ];
  const genderOptions = [
    { value: 'all', label: 'Todos os gêneros' },
    ...getGenderOptions(),
  ];

  const handleDeleteProduct = id => {
    setProductToDelete(id);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;
    const matchesGender =
      genderFilter === 'all' || product.gender === genderFilter;

    return matchesSearch && matchesCategory && matchesGender;
  });

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="pt-16 pl-64">
      <div className="p-6">
        <div className="text-2xl text-center text-[#f68597] border-[#93c2d2] bg-[#feebee] p-2 border rounded-2xl font-bold mb-6">
          <h1 className="text-2xl font-bold">Controle de Produtos</h1>
          <Button
            onClick={() => navigate('/products/add')}
            className="
    flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
    transition-colors transition-transform duration-200
    hover:bg-[#f68597] hover:text-white hover:scale-105 cursor-pointer 
  "
          >
            <Plus className="h-4 w-4 mr-2 " />
            Adicionar Produto
          </Button>
        </div>

        <div className="text-2xl text-center text-[#f68597] border-[#93c2d2] bg-[#feebee] p-2 border rounded-2xl font-bold mb-6">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="relative flex-1">
              <Search className="cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 "
              />
            </div>

            <div className="w-full md:w-64">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent className=" text-[#f68597] border-[#93c2d2] bg-[#feebee] p-2 border rounded-2xl font-bold mb-6">
                  {categoryOptions.map(option => (
                    <SelectItem
                      className="cursor-pointer transition-colors transition-transform duration-200
    hover:bg-[#f68597] hover:text-white hover:scale-105"
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-64">
              <Select
                className="cursor-pointer"
                value={genderFilter}
                onValueChange={setGenderFilter}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Filtrar por gênero" />
                </SelectTrigger>
                <SelectContent className=" text-[#f68597] border-[#93c2d2] bg-[#feebee] p-2 border rounded-2xl font-bold mb-6">
                  {genderOptions.map(option => (
                    <SelectItem
                      className="cursor-pointer transition-colors transition-transform duration-200
    hover:bg-[#f68597] hover:text-white hover:scale-105"
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  Nenhum produto encontrado.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onDelete={handleDeleteProduct}
                  />
                ))}
              </div>
            )}

            <Dialog
              open={!!productToDelete}
              onOpenChange={() => setProductToDelete(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar exclusão</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja excluir este produto? Esta ação não
                    pode ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="  p-10 w-full bg-[#5a474a] text-[#cdcdcd] cursor-pointer cursor-pointer transition-colors transition-transform duration-200
    hover:bg-[#cdcdcd] hover:text-[#5a474a] hover:scale-105"
                    variant="outline"
                    onClick={cancelDelete}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className=" border-red-400 bg-#ae606b cursor-pointer cursor-pointer transition-colors transition-transform duration-200
    hover:bg-[#e96666] hover:text-white hover:scale-105"
                    variant="destructive"
                    onClick={confirmDelete}
                  >
                    Excluir
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;

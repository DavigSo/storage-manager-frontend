import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts,getCategoryOptions,getGenderOptions } from '../../contexts/ProductContext';
import { Button } from '../ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Label from '../ui/LABEL.JSX';

export function ProductForm({ productId, isEdit = false }) {
  const { getProductById, addProduct, updateProduct, loading } = useProducts();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('ROUPA_0_3M');
  const [gender, setGender] = useState('UNISEX');
  const [quantity, setQuantity] = useState(0);
  const [minimumStock, setMinimumStock] = useState(10);
  const [expirationDate, setExpirationDate] = useState('');

  useEffect(() => {
    if (isEdit && productId) {
      const product = getProductById(productId);
      if (product) {
        setName(product.name);
        setCategory(product.category);
        setGender(product.gender);
        setQuantity(product.quantity);
        setMinimumStock(product.minimumStock);
        setExpirationDate(product.expirationDate || '');
      }
    }
  }, [isEdit, productId, getProductById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, category, gender, quantity, minimumStock, expirationDate: expirationDate || undefined };
    let success;
    if (isEdit && productId) success = await updateProduct(productId, productData);
    else success = await addProduct(productData);
    if (success) navigate('/products');
  };

  const categoryOptions = getCategoryOptions();
  const genderOptions = getGenderOptions();

  return (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}</CardTitle>
          <CardDescription>
            {isEdit ? 'Edite as informações do produto existente.' : 'Preencha os detalhes para adicionar um novo produto.'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nome do produto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gênero</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <input id="quantity" type="number" min="0" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minimumStock">Estoque Mínimo</Label>
                <input id="minimumStock" type="number" min="0" value={minimumStock} onChange={(e) => setMinimumStock(Number(e.target.value))} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Data de Validade (se aplicável)</Label>
              <input id="expirationDate" type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate('/products')}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : isEdit ? 'Salvar Alterações' : 'Adicionar Produto'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default ProductForm;
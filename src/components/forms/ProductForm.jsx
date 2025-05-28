import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useProducts,
  getCategoryOptions,
  getGenderOptions,
} from '../../contexts/ProductContext';
import { Button } from '../ui/button';
import Input from '../ui/Input';
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
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../ui/card';
import Label from '../ui/LABEL.JSX';

export function ProductForm({ productId, isEdit = false }) {
  const { id: routeId } = useParams();
  const effectiveId = productId || routeId;

  const { getProductById, addProduct, updateProduct, loading } = useProducts();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('ROUPA_0_3M');
  const [gender, setGender] = useState('UNISEX');
  const [quantity, setQuantity] = useState(0);
  const [minimumStock, setMinimumStock] = useState(10);
  const [expirationDate, setExpirationDate] = useState('');

  useEffect(() => {
    if (isEdit && effectiveId) {
      const product = getProductById(effectiveId);
      if (product) {
        setName(product.name);
        setCategory(product.category);
        setGender(product.gender);
        setQuantity(product.quantity);
        setMinimumStock(product.minimumStock);
        setExpirationDate(product.expirationDate || '');
      }
    }
  }, [isEdit, effectiveId, getProductById]);

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      name,
      category,
      gender,
      quantity,
      minimumStock,
      expirationDate: expirationDate || undefined,
    };
    console.log('[ProductForm] dados enviados:', data);

    const success =
      isEdit && effectiveId
        ? await updateProduct(effectiveId, data)
        : await addProduct(data);

    if (success) {
      navigate('/products');
    }
  };

  const categoryOptions = getCategoryOptions();
  const genderOptions = getGenderOptions();

  return (
    <div className="pt-16 md:pl-64 pl-0">
      <div className="p-6">
        <div className="text-2xl text-center text-[#f68597] border-[#93c2d2] bg-[#feebee] p-2 border rounded-2xl font-bold mb-6">
          <h1 className="text-2xl font-bold">
            {isEdit ? 'Editar Produto' : 'Adicionar Produto'}
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detalhes do Produto</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {isEdit
                ? 'Atualize os campos desejados.'
                : 'Preencha os campos para cadastrar.'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nome do produto"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger
                    id="category"
                    className="
                      flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                      transition-colors transition-transform duration-200
                      hover:bg-[#f68597] hover:text-white hover:scale-105 cursor-pointer"
                  >
                    <SelectValue placeholder="Selecione categoria" />
                  </SelectTrigger>
                  <SelectContent className="text-[#f68597] border-[#93c2d2] bg-[#feebee] p-2 border rounded-2xl">
                    {categoryOptions.map(opt => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="cursor-pointer transition-colors transition-transform duration-200 hover:bg-[#f68597] hover:text-white hover:scale-105"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gênero</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger
                    id="gender"
                    className="
                      flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                      transition-colors transition-transform duration-200
                      hover:bg-[#f68597] hover:text-white hover:scale-105 cursor-pointer"
                  >
                    <SelectValue placeholder="Selecione gênero" />
                  </SelectTrigger>
                  <SelectContent className="text-[#f68597] border-[#93c2d2] bg-[#feebee] p-2 border rounded-2xl">
                    {genderOptions.map(opt => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="cursor-pointer transition-colors transition-transform duration-200 hover:bg-[#f68597] hover:text-white hover:scale-105"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={0}
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minimumStock">Estoque Mínimo</Label>
                <Input
                  id="minimumStock"
                  type="number"
                  min={0}
                  value={minimumStock}
                  onChange={e => setMinimumStock(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expirationDate">
                Data de Validade (se aplicável)
              </Label>
              <input
                id="expirationDate"
                type="date"
                value={expirationDate}
                onChange={e => setExpirationDate(e.target.value)}
              />
            </div>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/products')}
                className="p-2 rounded-md cursor-pointer transition-colors transition-transform duration-200 hover:bg-[#f68597] hover:text-white hover:scale-105"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="p-2 rounded-md cursor-pointer transition-colors transition-transform duration-200 hover:bg-[#f68597] hover:text-white hover:scale-105"
              >
                {loading
                  ? isEdit
                    ? 'Salvando...'
                    : 'Adicionando...'
                  : isEdit
                    ? 'Salvar'
                    : 'Adicionar'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default ProductForm;

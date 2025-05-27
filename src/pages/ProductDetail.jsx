import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  useProducts,
  getCategoryName,
  getGenderName,
} from '@/contexts/ProductContext';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Edit, ArrowLeft, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../components/ui/dialog';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const { getProductById, deleteProduct, loading } = useProducts();
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  const product = id ? getProductById(id) : null;
  const lowStock = product ? product.quantity < product.minimumStock : false;

  const handleDelete = async () => {
    if (id) {
      const ok = await deleteProduct(id);
      if (ok) navigate('/products');
    }
    setOpenDelete(false);
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-16 pl-64">
        <div className="p-6">
          <div className="text-2xl text-center text-[#f68597] border-[#93c2d2] bg-[#feebee] p-2 border rounded-2xl font-bold mb-6">
            <h1 className="text-2xl font-bold">Produto Não Encontrado</h1>
          </div>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                Este produto não existe ou foi removido.
              </p>
              <Button
                onClick={() => navigate('/products')}
                className="mt-4 p-2 rounded-md transition-colors transition-transform duration-200 hover:bg-[#f68597] hover:text-white hover:scale-105"
              >
                Voltar para Produtos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pl-64">
      <div className="p-6">
        <div className="text-2xl text-center text-[#f68597] border-[#93c2d2] bg-[#feebee] p-2 border rounded-2xl font-bold mb-6">
          <h1 className="text-2xl font-bold">{product.name}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detalhes do Produto</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Veja as informações completas abaixo
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate('/products')}
                className="p-2 rounded-md transition-colors transition-transform duration-200 hover:bg-[#f68597] hover:text-white hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/products/edit/${id}`)}
                  className="p-2 rounded-md transition-colors transition-transform duration-200 hover:bg-[#f68597] hover:text-white hover:scale-105"
                >
                  <Edit className="h-4 w-4 mr-2" /> Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setOpenDelete(true)}
                  className="p-2 rounded-md transition-colors transition-transform duration-200 hover:bg-red-600 hover:text-white hover:scale-105"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Excluir
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary">
                {getCategoryName(product.category)}
              </Badge>
              <Badge
                variant={
                  product.gender === 'MASCULINO'
                    ? 'default'
                    : product.gender === 'FEMININO'
                      ? 'secondary'
                      : 'outline'
                }
              >
                {getGenderName(product.gender)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-y py-4">
              <div>
                <h3 className="font-medium text-muted-foreground">
                  Quantidade em estoque
                </h3>
                <p
                  className={`text-2xl font-semibold ${lowStock ? 'text-destructive' : 'text-green-600'}`}
                >
                  {product.quantity}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">
                  Estoque mínimo
                </h3>
                <p className="text-2xl font-semibold">{product.minimumStock}</p>
              </div>
              {product.expirationDate && (
                <div>
                  <h3 className="font-medium text-muted-foreground">
                    Validade
                  </h3>
                  <p className="text-2xl font-semibold">
                    {new Date(product.expirationDate).toLocaleDateString(
                      'pt-BR'
                    )}
                  </p>
                </div>
              )}
              <div>
                <h3 className="font-medium text-muted-foreground">Status</h3>
                <div className="mt-1">
                  <Badge
                    variant={lowStock ? 'destructive' : 'outline'}
                    className={
                      lowStock
                        ? 'bg-red-100 text-red-800 hover:bg-red-100'
                        : 'bg-green-100 text-green-800 hover:bg-green-100'
                    }
                  >
                    {lowStock ? 'Estoque Baixo' : 'Estoque Adequado'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Atualizado em</span>
                <span>
                  {new Date(product.updatedAt).toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cadastrado em</span>
                <span>
                  {new Date(product.createdAt).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir “{product.name}”? Esta ação não
                pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpenDelete(false)}
                className="p-2 rounded-md transition-colors transition-transform duration-200 hover:bg-[#f68597] hover:text-white hover:scale-105"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="p-2 rounded-md transition-colors transition-transform duration-200 hover:bg-red-600 hover:text-white hover:scale-105"
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default ProductDetail;

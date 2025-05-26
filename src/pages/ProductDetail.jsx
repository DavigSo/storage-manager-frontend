import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts, getCategoryName, getGenderName } from '@/contexts/ProductContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const { isAuthenticated, isLoading } = useAuth();
  const { getProductById, deleteProduct, loading } = useProducts();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const product = id ? getProductById(id) : null;
  const isLowStock = product ? product.quantity < product.minimumStock : false;

  const handleDelete = async () => {
    if (id) {
      const success = await deleteProduct(id);
      if (success) {
        navigate('/products');
      }
    }
    setShowDeleteDialog(false);
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
          <Button variant="outline" onClick={() => navigate('/products')} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Produtos
          </Button>
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Produto não encontrado.</p>
                <Button onClick={() => navigate('/products')} className="mt-4">
                  Ver todos os produtos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pl-64">
      <div className="p-6">
        <Button variant="outline" onClick={() => navigate('/products')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Produtos
        </Button>
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{product.name}</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => navigate(`/products/edit/${id}`)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary">{getCategoryName(product.category)}</Badge>
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
              <div className="grid grid-cols-2 gap-4 border-t border-b py-4">
                <div>
                  <h3 className="font-medium text-muted-foreground">Quantidade em estoque</h3>
                  <p className={`text-xl font-semibold ${isLowStock ? 'text-destructive' : 'text-green-600'}`}>
                    {product.quantity}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-muted-foreground">Estoque mínimo</h3>
                  <p className="text-xl font-semibold">{product.minimumStock}</p>
                </div>
                {product.expirationDate && (
                  <div>
                    <h3 className="font-medium text-muted-foreground">Data de validade</h3>
                    <p className="text-xl font-semibold">
                      {new Date(product.expirationDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-muted-foreground">Status</h3>
                  <div className="mt-1">
                    {isLowStock ? (
                      <Badge variant="destructive">Estoque Baixo</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Estoque Adequado
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Última atualização</span>
                  <span>{new Date(product.updatedAt).toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Cadastrado em</span>
                  <span>{new Date(product.createdAt).toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir "{product.name}"? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
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
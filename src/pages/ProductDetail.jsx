import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  useProducts,
  getCategoryName,
  getGenderName,
} from '../contexts/ProductContext';
import api from '../services/api';
import { useToast } from '../components/ui/use-toast';
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
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { getProductById, deleteProduct } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  // Redireciona se não autenticado
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Carrega o produto: primeiro do contexto, depois da API
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        // Tenta do contexto
        const ctxItem = getProductById(id);
        if (ctxItem) {
          setProduct(ctxItem);
        } else {
          const { data } = await api.get(`/items/${id}`);
          setProduct(data);
        }
      } catch {
        setError('Este produto não existe ou foi removido.');
        toast({
          title: 'Erro',
          description: 'Este produto não existe ou foi removido.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, getProductById, toast]);

  // Ações de delete
  const handleDelete = async () => {
    console.log('handleDelete dispara!'); // pra verificar no console
    if (!product) return;

    // exibe um loading local se quiser
    try {
      const ok = await deleteProduct(product._id);
      if (ok) {
        toast({ title: 'Produto excluído com sucesso.' });
        navigate('/products');
      } else {
        // Se algo falhar no contexto, avise o usuário
        toast({
          title: 'Erro',
          description: 'Não foi possível excluir o produto.',
          variant: 'destructive',
        });
      }
    } catch (e) {
      console.error('Erro inesperado ao excluir:', e);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro inesperado.',
        variant: 'destructive',
      });
    } finally {
      setOpenDelete(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-16 md:pl-64 pl-0">
        <div className="p-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">{error}</p>
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

  const lowStock = product.quantity < product.minimumStock;

  return (
    <div className="pt-16 md:pl-64 pl-0">
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="text-2xl text-center text-[#f68597] border-[#93c2d2] bg-[#feebee] p-2 border rounded-2xl font-bold">
          {product.name}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Produto</CardTitle>
            <CardDescription>Informações completas abaixo</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
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
                  onClick={() => navigate(`/products/edit/${product._id}`)}
                  className="p-2 rounded-md transition-colors transition-transform duration-200 hover:bg-[#f68597] hover:text-white hover:scale-105"
                >
                  <Edit className="h-4 w-4 mr-2" /> Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    console.log('Botão Excluir clicado');
                    handleDelete();
                  }}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y py-4">
              <div>
                <h3 className="font-medium text-muted-foreground">
                  Estoque atual
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
              <Button variant="outline" onClick={() => setOpenDelete(false)}>
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

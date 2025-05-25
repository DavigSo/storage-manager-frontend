import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getCategoryName, getGenderName } from '@/contexts/ProductContext';

const ProductCard = ({ product, onDelete }) => {
  const isLowStock = product.quantity < product.minimumStock;

  const getGenderColor = () => {
    switch (product.gender) {
      case 'MASCULINO':
        return 'bg-baby-blue';
      case 'FEMININO':
        return 'bg-baby-pink';
      case 'UNISEX':
        return 'bg-baby-yellow';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <Card className={`card-hover ${getGenderColor()}/20`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">
              {getCategoryName(product.category)}
            </p>
          </div>
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
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Quantidade:</span>
            <span
              className={`font-semibold ${isLowStock ? 'text-destructive' : 'text-green-600'}`}
            >
              {product.quantity}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Estoque mínimo:
            </span>
            <span className="font-medium">{product.minimumStock}</span>
          </div>

          {product.expirationDate && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Validade:</span>
              <span className="font-medium">
                {new Date(product.expirationDate).toLocaleDateString('pt-BR')}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex justify-between w-full gap-2">
          <Link to={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full" size="sm">
              Detalhes
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(product.id)}
            >
              Excluir
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;

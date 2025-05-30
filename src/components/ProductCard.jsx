import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getCategoryName, getGenderName } from '@/contexts/ProductContext';

const genderStyles = {
  MASCULINO: {
    headerBg: 'bg-blue-100',
    badgeVariant: 'masculino',
    textColor: 'text-blue-900',
  },
  FEMININO: {
    headerBg: 'bg-pink-300',
    badgeVariant: 'feminino',
    textColor: 'text-pink-900',
  },
  UNISEX: {
    headerBg: 'bg-purple-200',
    badgeVariant: 'unisex',
    textColor: 'text-purple-900',
  },
};

const ProductCard = ({ product, onDelete }) => {
  const gender = product.gender;
  const genderLabel = getGenderName(gender);
  const styles = genderStyles[gender] || {};

  return (
    <Card className="flex flex-col h-full bg-white text-inherit transition-transform transform hover:scale-105">
      <CardHeader
        className={`flex flex-col sm:flex-row justify-between items-start gap-2 p-4 sm:p-6 ${styles.headerBg}`}
      >
        <div className="flex-1 space-y-1">
          <h3
            className={`text-base sm:text-lg md:text-xl font-semibold break-words ${styles.textColor}`}
          >
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {getCategoryName(product.category)}
          </p>
        </div>

        <Badge
          variant={styles.badgeVariant}
          className="self-start sm:self-center"
        >
          {genderLabel}
        </Badge>
      </CardHeader>

      <CardContent
        className={`flex-grow p-4 sm:p-6 space-y-4 ${styles.headerBg}`}
      >
        <div>
          <p className="mt-1 text-base">{genderLabel}</p>
        </div>

        <div>
          <span className="text-xs sm:text-sm text-muted-foreground">
            Quantidade:
          </span>
          <span className="mt-1 font-semibold text-green-600">
            {product.quantity}
          </span>
        </div>

        <div>
          <span className="text-xs sm:text-sm text-muted-foreground">
            Estoque mínimo:
          </span>
          <span className="mt-1 font-medium">{product.minimumStock}</span>
        </div>

        {product.expirationDate && (
          <div>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Validade:
            </span>
            <span className="mt-1 font-medium">
              {new Date(product.expirationDate).toLocaleDateString('pt-BR')}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter
        className={`flex flex-col sm:flex-row sm:justify-between items-center gap-2 p-4 sm:p-6 flex-wrap mt-auto  ${styles.headerBg}`}
      >
        <Link to={`/products/${product._id}`} className="w-full sm:flex-1">
          <Button className="w-full" variant="outline">
            Detalhes
          </Button>
        </Link>
        {onDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(product._id)}
          >
            Excluir
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

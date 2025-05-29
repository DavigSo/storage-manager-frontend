import React from 'react';
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

const ProductCard = ({ product, onDelete }) => {
  const isLowStock = product.quantity < product.minimumStock;

  // Define cores por gênero
  const genderColors = {
    MASCULINO: '#2c2cc7',
    FEMININO: '#ad83bd',
    UNISEX: '#9090cf',
  };
  const genderColor = genderColors[product.gender] || '#F3F4F6';

  return (
    <Card
      style={{
        backgroundColor: `${genderColor}20`,
        color: genderColor,
      }}
      className="card-hover transition-transform transform hover:scale-105"
    >
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-2 pb-2 p-4 sm:p-6">
        <div className="flex-1 space-y-1">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold break-words">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
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
      </CardHeader>

      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 p-4 sm:p-6">
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm text-muted-foreground">
            Quantidade:
          </span>
          <span
            className={`mt-1 font-semibold ${
              isLowStock ? 'text-destructive' : 'text-green-600'
            }`}
            style={{ color: genderColor }}
          >
            {product.quantity}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs sm:text-sm text-muted-foreground">
            Estoque mínimo:
          </span>
          <span className="mt-1 font-medium" style={{ color: genderColor }}>
            {product.minimumStock}
          </span>
        </div>

        {product.expirationDate && (
          <div className="flex flex-col sm:col-span-2">
            <span className="text-xs sm:text-sm text-muted-foreground">
              Validade:
            </span>
            <span className="mt-1 font-medium" style={{ color: genderColor }}>
              {new Date(product.expirationDate).toLocaleDateString('pt-BR')}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-stretch p-4 sm:p-6 pt-2 gap-2">
        <Link to={`/products/${product._id}`} className="flex-1">
          <Button
            variant="outline"
            
            style={{ borderColor: genderColor, color: genderColor }}
          >
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

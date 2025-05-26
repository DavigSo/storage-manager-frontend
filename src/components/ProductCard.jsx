import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getCategoryName, getGenderName } from '../contexts/ProductContext';

const ProductCard = ({ product, onDelete }) => {
  const isLowStock = product.quantity < product.minimumStock;

  const getGenderColor = () => {
    switch (product.gender) {
      case 'MASCULINO':
        return '#2c2cc7';
      case 'FEMININO':
        return '#ad83bd';
      case 'UNISEX':
        return '#9090cf';
      default:
        return '#F3F4F6';
    }
  };

  const genderColor = getGenderColor();

  return (
    <Card
      style={{ backgroundColor: `${genderColor}20` }}
      className="card-hover transition-transform transform hover:scale-105"
    >
      <CardHeader className="flex flex-col sm:flex-row flex-wrap justify-between items-start gap-2 pb-2 p-4 sm:p-6">
        <div className="flex-1 space-y-1">
          <h3
            className="text-base sm:text-lg md:text-xl font-semibold break-words"
            style={{ color: genderColor }}
          >
            {product.name}
          </h3>
          <p
            className="text-xs sm:text-sm text-muted-foreground"
            style={{ color: genderColor }}
          >
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
          className="mt-2 sm:mt-0 whitespace-nowrap px-2"
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
            className={`mt-1 font-semibold ${isLowStock ? 'text-destructive' : 'text-green-600'}`}
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

      <CardFooter className=" flex-col sm:flex-row items-stretch p-4 sm:p-6 pt-2 gap-2">
        <Link to={`/products/${product.id}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full bg-[#5a474a] text-[#cdcdcd] cursor-pointer cursor-pointer transition-colors transition-transform duration-200
    hover:bg-[#cdcdcd] hover:text-[#5a474a] hover:scale-105"
            size="sm"
          >
            Detalhes
          </Button>
        </Link>
        {onDelete && (
          <Button
            variant="destructive"
            size="sm"
            className="border border-red-400 bg-#ae606b cursor-pointer cursor-pointer transition-colors transition-transform duration-200
    hover:bg-[#e96666] hover:text-white hover:scale-105"
            onClick={() => onDelete(product.id)}
          >
            Excluir
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

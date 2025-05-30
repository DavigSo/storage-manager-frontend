import { useProducts } from '../../contexts/ProductContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import ProductCard from '../../components/ProductCard';

const LowStockAlerts = () => {
  const { lowStockProducts } = useProducts();

  if (lowStockProducts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alertas de Estoque Baixo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-6 text-muted-foreground">
            Não há produtos com estoque baixo no momento.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas de Estoque Baixo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {lowStockProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStockAlerts;

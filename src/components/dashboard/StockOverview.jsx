import { useEffect, useState } from 'react';
import { useProducts, getCategoryName, getGenderName } from '@/contexts/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryData {
  name: string;
  value: number;
}

interface GenderData {
  name: string;
  value: number;
}

// Color constants
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2'];
const GENDER_COLORS: Record<string, string> = {
  MASCULINO: '#AED6F1',
  FEMININO: '#EBDEF0',
  UNISEX: '#F9E79F',
};

const StockOverview = () => {
  const { products } = useProducts();
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [genderData, setGenderData] = useState<GenderData[]>([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    // Build category data
    const categoryMap = new Map<string, number>();
    products.forEach((p) => {
      const name = getCategoryName(p.category);
      categoryMap.set(name, (categoryMap.get(name) || 0) + p.quantity);
    });
    setCategoryData(
      Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }))
    );

    // Build gender data
    const genderMap = new Map<string, number>();
    products.forEach((p) => {
      const name = getGenderName(p.gender);
      genderMap.set(name, (genderMap.get(name) || 0) + p.quantity);
    });
    setGenderData(
      Array.from(genderMap.entries()).map(([name, value]) => ({ name, value }))
    );
  }, [products]);

  // Totals
  const totalTypes = products.length;
  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockCount = products.filter((p) => p.quantity < p.minimumStock).length;

  // Label renderer
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RAD = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RAD);
    const y = cy + radius * Math.sin(-midAngle * RAD);
    return (
      <text x={x} y={y} fill="#fff" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total de Produtos</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTypes}</div>
            <p className="text-xs text-muted-foreground">Tipos de produtos cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Quantidade em Estoque</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnits}</div>
            <p className="text-xs text-muted-foreground">Itens disponíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Alertas de Estoque</CardTitle></CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${lowStockCount > 0 ? 'text-destructive' : 'text-green-600'}`}> {lowStockCount} </div>
            <p className="text-xs text-muted-foreground">Produtos com estoque baixo</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-[300px]">
          <CardHeader><CardTitle>Estoque por Categoria</CardTitle></CardHeader>
          <CardContent className="h-[230px]">
            {categoryData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={80} labelLine={false} label={renderLabel} paddingAngle={2}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => [`${val} unidades`, 'Quantidade']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">Sem dados para exibir</div>
            )}
          </CardContent>
        </Card>

        <Card className="h-[300px]">
          <CardHeader><CardTitle>Estoque por Gênero</CardTitle></CardHeader>
          <CardContent className="h-[230px]">
            {genderData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={genderData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={80} labelLine={false} label={renderLabel} paddingAngle={2}>
                    {genderData.map((entry) => (
                      <Cell key={entry.name} fill={GENDER_COLORS[entry.name] || COLORS[0]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => [`${val} unidades`, 'Quantidade']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">Sem dados para exibir</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockOverview;

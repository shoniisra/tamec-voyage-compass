
import React from 'react';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Users, 
  CreditCard, 
  DollarSign, 
  UserPlus 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SalesOverviewChart from './charts/SalesOverviewChart';
import SessionsByCountryChart from './charts/SessionsByCountryChart';
import SessionsByBrowserChart from './charts/SessionsByBrowserChart';
import TopPagesTable from './tables/TopPagesTable';

const AdminDashboardContent = () => {
  const statsCards = [
    {
      title: 'Campañas Enviadas',
      value: '13,647',
      change: '+2.3%',
      isIncrease: true,
      period: 'desde el mes pasado',
      icon: <Users className="h-6 w-6 text-muted-foreground" />
    },
    {
      title: 'Nuevos Leads',
      value: '9,526',
      change: '+8.1%',
      isIncrease: true,
      period: 'desde el mes pasado',
      icon: <UserPlus className="h-6 w-6 text-muted-foreground" />
    },
    {
      title: 'Ventas',
      value: '976',
      change: '-0.3%',
      isIncrease: false,
      period: 'desde el mes pasado',
      icon: <CreditCard className="h-6 w-6 text-muted-foreground" />
    },
    {
      title: 'Ingresos Reservados',
      value: '$123.6k',
      change: '-10.6%',
      isIncrease: false,
      period: 'desde el mes pasado',
      icon: <DollarSign className="h-6 w-6 text-muted-foreground" />
    }
  ];

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-sm dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración, aquí puedes ver un resumen de las métricas clave.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                {card.isIncrease ? (
                  <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3 text-rose-500" />
                )}
                <span className={card.isIncrease ? "text-emerald-500" : "text-rose-500"}>
                  {card.change}
                </span>
                <span className="ml-1">{card.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Desempeño</CardTitle>
            <CardDescription>
              Visitas a páginas y clicks por mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SalesOverviewChart />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Conversiones</CardTitle>
            <CardDescription>
              Tasa de retorno de clientes
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="flex flex-col items-center gap-2">
                <div className="text-3xl font-bold">65.2%</div>
                <p className="text-sm text-muted-foreground">Clientes que regresan</p>
                <div className="w-full mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Esta semana</p>
                    <p className="text-xl font-semibold">23.5k</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Semana pasada</p>
                    <p className="text-xl font-semibold">41.05k</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sesiones por País</CardTitle>
            <CardDescription>Distribución geográfica de usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <SessionsByCountryChart />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Sesiones por Navegador</CardTitle>
            <CardDescription>Navegadores más utilizados</CardDescription>
          </CardHeader>
          <CardContent>
            <SessionsByBrowserChart />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Páginas más visitadas</CardTitle>
            <CardDescription>Las páginas con más tráfico</CardDescription>
          </CardHeader>
          <CardContent>
            <TopPagesTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardContent;

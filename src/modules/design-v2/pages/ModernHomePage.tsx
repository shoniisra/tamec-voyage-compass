
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  MapPin, 
  Building2, 
  FileText,
  ArrowRight,
  Star,
  TrendingUp,
  Clock
} from 'lucide-react';
import ModernLayout from '../components/layout/ModernLayout';
import ModernCard from '../components/common/ModernCard';
import ServiceCard from '../components/common/ServiceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const ModernHomePage = () => {
  const { language } = useLanguage();

  const quickActions = [
    {
      icon: <Plane className="h-6 w-6" />,
      title: language === 'en' ? 'Book Flights' : 'Reservar Vuelos',
      description: language === 'en' ? 'Find the best deals' : 'Encuentra las mejores ofertas',
      href: '/v2/flights',
      color: 'bg-blue-500'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: language === 'en' ? 'Explore Tours' : 'Explorar Tours',
      description: language === 'en' ? 'Discover amazing places' : 'Descubre lugares increíbles',
      href: '/v2/tours',
      color: 'bg-green-500'
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: language === 'en' ? 'Book Hotels' : 'Reservar Hoteles',
      description: language === 'en' ? 'Comfortable stays' : 'Estadías cómodas',
      href: '/v2/hotels',
      color: 'bg-purple-500'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: language === 'en' ? 'Visa Services' : 'Servicios de Visa',
      description: language === 'en' ? 'Easy visa processing' : 'Trámites fáciles',
      href: '/v2/visas',
      color: 'bg-orange-500'
    }
  ];

  const featuredServices = [
    {
      title: 'Galápagos Adventure',
      description: 'Explore the unique wildlife and pristine beaches of the Galápagos Islands',
      image: '/assets/images/hero/turtle-background.webp',
      href: '/v2/tours/galapagos',
      price: '$2,450',
      rating: 4.9,
      popular: true,
      features: ['7 días', 'Todo incluido', 'Guía experto']
    },
    {
      title: 'European Discovery',
      description: 'Visit the most beautiful cities in Europe with our curated tour package',
      image: '/assets/images/hero/hero-background.webp',
      href: '/v2/tours/europe',
      price: '$3,200',
      rating: 4.8,
      features: ['14 días', 'Vuelos incluidos', '5 países']
    },
    {
      title: 'Visa Processing',
      description: 'Fast and reliable visa processing for all major destinations',
      image: '/assets/images/hero/visa-background.webp',
      href: '/v2/visas',
      price: '$150',
      rating: 4.7,
      features: ['Rápido', 'Confiable', 'Soporte 24/7']
    }
  ];

  return (
    <ModernLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-tamec-50 via-background to-yellow-50 dark:from-gray-900 dark:via-background dark:to-gray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-tamec-600 text-white">
                {language === 'en' ? 'Welcome to TAMEC' : 'Bienvenido a TAMEC'}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-tamec-600 to-yellow-500 bg-clip-text text-transparent">
                {language === 'en' ? 'Good afternoon' : 'Buenas tardes'}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {language === 'en' 
                  ? 'Discover amazing destinations, book flights, and create unforgettable memories with TAMEC Travel Agency'
                  : 'Descubre destinos increíbles, reserva vuelos y crea recuerdos inolvidables con TAMEC Travel Agency'
                }
              </p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href} className="group">
                  <ModernCard className="text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${action.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-tamec-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </ModernCard>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-tamec-600" />
                <h2 className="text-2xl font-bold">
                  {language === 'en' ? 'Featured for you' : 'Destacado para ti'}
                </h2>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/v2/tours" className="flex items-center">
                  {language === 'en' ? 'View all' : 'Ver todo'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center space-x-2 mb-8">
              <Clock className="h-5 w-5 text-tamec-600" />
              <h2 className="text-2xl font-bold">
                {language === 'en' ? 'Continue exploring' : 'Continúa explorando'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <ModernCard key={item} className="group cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-tamec-500 to-yellow-500 rounded-lg flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm group-hover:text-tamec-600 transition-colors">
                        {language === 'en' ? 'Recent Search' : 'Búsqueda Reciente'}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'Paris, France' : 'París, Francia'}
                      </p>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ModernLayout>
  );
};

export default ModernHomePage;

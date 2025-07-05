
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star,
  TrendingUp,
  Clock
} from 'lucide-react';
import ModernLayout from '../components/layout/ModernLayout';
import ModernCard from '../components/common/ModernCard';
import ServiceCard from '../components/common/ServiceCard';
import MobileCarousel from '../components/common/MobileCarousel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const ModernHomePage = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const popularOptions = [
    {
      title: language === 'en' ? 'Galápagos Tour' : 'Tour a Galápagos',
      image: '/assets/images/hero/turtle-background.webp',
      href: '/v2/tours/galapagos',
      popular: true
    },
    {
      title: language === 'en' ? 'Panama Tour' : 'Tour a Panamá',
      image: '/assets/images/hero/hero-background.webp',
      href: '/v2/tours/panama'
    },
    {
      title: language === 'en' ? 'USA Tourist Visa' : 'Visa Turismo EEUU',
      image: '/assets/images/hero/visa-background.webp',
      href: '/v2/visas/usa-tourist'
    },
    {
      title: language === 'en' ? 'USA Work Visa' : 'Visa Trabajo EEUU',
      image: '/assets/images/hero/visa-background.webp',
      href: '/v2/visas/usa-work'
    },
    {
      title: language === 'en' ? 'Turkey Tour' : 'Tour a Turquía',
      image: '/assets/images/hero/hero-background.webp',
      href: '/v2/tours/turkey'
    },
    {
      title: language === 'en' ? 'Book Flights' : 'Reservar Vuelos',
      image: '/assets/images/hero/avion-background.webp',
      href: '/v2/flights'
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
      <div className="min-h-screen overflow-x-hidden">
        {/* Popular Options Section */}
        <section className="py-2 md:py-8 px-2 md:px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-3 md:mb-6">
              <h1 className="text-lg md:text-2xl font-bold mb-1 text-foreground">
                {language === 'en' ? 'Popular Options' : 'Opciones Populares'}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                {language === 'en' 
                  ? 'Discover our most requested services'
                  : 'Descubre nuestros servicios más solicitados'
                }
              </p>
            </div>

            {/* Popular Options Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-8">
              {popularOptions.map((option, index) => (
                <Link key={index} to={option.href} className="group block">
                  <div className="flex items-center bg-card border border-border hover:shadow-md transition-all duration-200 group-hover:scale-[1.01] overflow-hidden rounded-lg">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                      <img
                        src={option.image}
                        alt={option.title}
                        className="w-full h-full object-cover"
                      />
                      {option.popular && (
                        <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs px-1 py-0 h-4 text-[10px]">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1 bg-muted/50 h-12 md:h-16 flex items-center px-2 md:px-3">
                      <h3 className="font-semibold text-xs md:text-sm text-foreground group-hover:text-tamec-600 transition-colors line-clamp-2">
                        {option.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-4 md:py-12 px-2 md:px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-3 md:mb-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-tamec-600" />
                <h2 className="text-lg md:text-xl font-bold">
                  {language === 'en' ? 'Featured for you' : 'Destacado para ti'}
                </h2>
              </div>
              <Button variant="ghost" asChild className="text-xs md:text-sm hidden md:flex">
                <Link to="/v2/tours" className="flex items-center">
                  {language === 'en' ? 'View all' : 'Ver todo'}
                </Link>
              </Button>
            </div>

            {/* Mobile Carousel / Desktop Grid */}
            {isMobile ? (
              <MobileCarousel services={featuredServices} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {featuredServices.map((service, index) => (
                  <div key={index} className="w-full">
                    <ServiceCard {...service} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recent Activity - More compact on mobile */}
        <section className="py-4 md:py-12 px-2 md:px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center space-x-2 mb-3 md:mb-6">
              <Clock className="h-4 w-4 md:h-5 md:w-5 text-tamec-600" />
              <h2 className="text-lg md:text-xl font-bold">
                {language === 'en' ? 'Continue exploring' : 'Continúa explorando'}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {[1, 2, 3, 4].map((item) => (
                <ModernCard key={item} className="group cursor-pointer p-2 md:p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-tamec-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xs md:text-sm group-hover:text-tamec-600 transition-colors truncate">
                        {language === 'en' ? 'Recent Search' : 'Búsqueda Reciente'}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
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

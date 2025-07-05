
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
      popular: true,
      gradient: 'from-blue-500 to-teal-500'
    },
    {
      title: language === 'en' ? 'Panama Tour' : 'Tour a Panamá',
      image: '/assets/images/hero/hero-background.webp',
      href: '/v2/tours/panama',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: language === 'en' ? 'USA Tourist Visa' : 'Visa Turismo EEUU',
      image: '/assets/images/hero/visa-background.webp',
      href: '/v2/visas/usa-tourist',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      title: language === 'en' ? 'USA Work Visa' : 'Visa Trabajo EEUU',
      image: '/assets/images/hero/visa-background.webp',
      href: '/v2/visas/usa-work',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: language === 'en' ? 'Turkey Tour' : 'Tour a Turquía',
      image: '/assets/images/hero/hero-background.webp',
      href: '/v2/tours/turkey',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      title: language === 'en' ? 'Book Flights' : 'Reservar Vuelos',
      image: '/assets/images/hero/avion-background.webp',
      href: '/v2/flights',
      gradient: 'from-sky-500 to-blue-500'
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
        {/* Popular Options Section */}
        <section className="py-6 md:py-12 px-4 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-6 md:mb-8">
              <h1 className="text-xl md:text-3xl font-bold mb-2 text-foreground">
                {language === 'en' ? 'Good afternoon' : 'Buenas tardes'}
              </h1>
              <p className="text-sm md:text-lg text-muted-foreground">
                {language === 'en' 
                  ? 'What would you like to explore today?'
                  : '¿Qué te gustaría explorar hoy?'
                }
              </p>
            </div>

            {/* Popular Options Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8 md:mb-12">
              {popularOptions.map((option, index) => (
                <Link key={index} to={option.href} className="group">
                  <div className="relative overflow-hidden rounded-xl aspect-square bg-card border border-border hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-80`} />
                    <img
                      src={option.image}
                      alt={option.title}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                    />
                    {option.popular && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500 text-black text-xs z-10">
                        Popular
                      </Badge>
                    )}
                    <div className="absolute inset-0 flex items-end p-2 md:p-3 z-10">
                      <h3 className="text-white font-semibold text-xs md:text-sm leading-tight line-clamp-2">
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
        <section className="py-8 md:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-tamec-600" />
                <h2 className="text-lg md:text-2xl font-bold">
                  {language === 'en' ? 'Featured for you' : 'Destacado para ti'}
                </h2>
              </div>
              <Button variant="ghost" asChild className="text-xs md:text-sm hidden md:flex">
                <Link to="/v2/tours" className="flex items-center">
                  {language === 'en' ? 'View all' : 'Ver todo'}
                  <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </Button>
            </div>

            {/* Mobile Carousel / Desktop Grid */}
            {isMobile ? (
              <MobileCarousel services={featuredServices} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
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
        <section className="py-8 md:py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center space-x-2 mb-4 md:mb-8">
              <Clock className="h-4 w-4 md:h-5 md:w-5 text-tamec-600" />
              <h2 className="text-lg md:text-2xl font-bold">
                {language === 'en' ? 'Continue exploring' : 'Continúa explorando'}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[1, 2, 3, 4].map((item) => (
                <ModernCard key={item} className="group cursor-pointer p-3 md:p-6">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-tamec-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="h-3 w-3 md:h-5 md:w-5 text-white" />
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

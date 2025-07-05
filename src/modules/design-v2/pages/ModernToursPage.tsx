
import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Users, Star } from 'lucide-react';
import ModernLayout from '../components/layout/ModernLayout';
import ModernCard from '../components/common/ModernCard';
import ServiceCard from '../components/common/ServiceCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const ModernToursPage = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const tours = [
    {
      title: 'Galápagos Islands Adventure',
      description: 'Explore unique wildlife and pristine beaches in this UNESCO World Heritage site',
      image: '/assets/images/hero/turtle-background.webp',
      href: '/v2/tours/galapagos',
      price: '$2,450',
      rating: 4.9,
      popular: true,
      features: ['7 días', 'Todo incluido', 'Guía experto']
    },
    {
      title: 'Amazon Rainforest Experience',
      description: 'Immerse yourself in the biodiversity of the Amazon jungle',
      image: '/assets/images/hero/hero-background.webp',
      href: '/v2/tours/amazon',
      price: '$1,850',
      rating: 4.7,
      features: ['5 días', 'Lodge incluido', 'Actividades']
    },
    {
      title: 'Andes Mountain Trek',
      description: 'Challenge yourself with breathtaking mountain landscapes',
      image: '/assets/images/hero/mainbg.png',
      href: '/v2/tours/andes',
      price: '$1,200',
      rating: 4.8,
      features: ['4 días', 'Camping', 'Trekking']
    }
  ];

  const categories = [
    { label: language === 'en' ? 'Adventure' : 'Aventura', count: 12 },
    { label: language === 'en' ? 'Cultural' : 'Cultural', count: 8 },
    { label: language === 'en' ? 'Wildlife' : 'Vida Silvestre', count: 15 },
    { label: language === 'en' ? 'Beach' : 'Playa', count: 6 }
  ];

  return (
    <ModernLayout showSidebar>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <MapPin className="mr-3 h-8 w-8 text-tamec-600" />
            {language === 'en' ? 'Discover Tours' : 'Descubrir Tours'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Find amazing tours and create unforgettable memories'
              : 'Encuentra tours increíbles y crea recuerdos inolvidables'
            }
          </p>
        </div>

        {/* Search and Filters */}
        <ModernCard className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={language === 'en' ? 'Search destinations...' : 'Buscar destinos...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={language === 'en' ? 'Duration' : 'Duración'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-3">{language === 'en' ? '1-3 days' : '1-3 días'}</SelectItem>
                <SelectItem value="4-7">{language === 'en' ? '4-7 days' : '4-7 días'}</SelectItem>
                <SelectItem value="8+">{language === 'en' ? '8+ days' : '8+ días'}</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder={language === 'en' ? 'Price Range' : 'Rango Precio'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                <SelectItem value="2000+">$2,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ModernCard>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'en' ? 'Browse by Category' : 'Explorar por Categoría'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <ModernCard key={index} className="text-center cursor-pointer hover:bg-tamec-50 dark:hover:bg-tamec-900/20 transition-colors">
                <h3 className="font-semibold mb-1">{category.label}</h3>
                <p className="text-sm text-muted-foreground">{category.count} tours</p>
              </ModernCard>
            ))}
          </div>
        </div>

        {/* Featured Tours */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Star className="mr-2 h-5 w-5 text-yellow-500" />
              {language === 'en' ? 'Featured Tours' : 'Tours Destacados'}
            </h2>
            <Badge variant="secondary">
              {tours.length} {language === 'en' ? 'tours available' : 'tours disponibles'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour, index) => (
              <ServiceCard key={index} {...tour} />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            {language === 'en' ? 'Load More Tours' : 'Cargar Más Tours'}
          </Button>
        </div>
      </div>
    </ModernLayout>
  );
};

export default ModernToursPage;

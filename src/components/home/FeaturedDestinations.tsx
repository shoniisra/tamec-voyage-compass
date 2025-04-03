
import React from 'react';
import { ArrowRight } from 'lucide-react';
import DestinationCard from './DestinationCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const destinations = [
  {
    id: 1,
    name: 'Santorini Island',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600&q=80',
    price: '1,299',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Bali Beaches',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=600&q=80',
    price: '899',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Kyoto Gardens',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80',
    price: '1,499',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Maldives Resort',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80',
    price: '2,099',
    rating: 4.9,
  },
];

const FeaturedDestinations = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50 hero-pattern">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('home.featured.title')}</h2>
            <p className="text-gray-600 max-w-2xl">
              {t('home.featured.subtitle')}
            </p>
          </div>
          <Button variant="link" className="text-tamec-600 flex items-center mt-4 md:mt-0 p-0">
            {t('home.featured.viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              name={destination.name}
              location={destination.location}
              image={destination.image}
              price={destination.price}
              rating={destination.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;

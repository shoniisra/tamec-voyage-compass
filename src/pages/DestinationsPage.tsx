
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import DestinationsFilter from '@/components/destinations/DestinationsFilter';
import DestinationsList from '@/components/destinations/DestinationsList';
import { useTours } from '@/hooks/use-tours';
import { TourFilterParams } from '@/types/tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPinned } from 'lucide-react';

const DestinationsPage: React.FC = () => {
  const { language } = useLanguage();
  const [filters, setFilters] = useState<TourFilterParams>({});
  const { tours, loading, error } = useTours(filters);
  
  const handleFilterChange = (newFilters: TourFilterParams) => {
    setFilters(newFilters);
  };
  
  return (
    <Layout>
        <div className="bg-tamec-600 py-16">
        <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center text-white">
            <MapPinned className="h-6 w-6 mr-2 text-tamec-600" />
            {language === 'en' ? 'Tours Destinations and experiences' : 'Tours, Destinos y Experiencias'}
          </h1>
          <p className="text-tamec-100 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover your next travel adventure around the world.' 
              : 'Descubre tu siguiente aventura de viaje alrededor del mundo.'}
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <DestinationsFilter onFilterChange={handleFilterChange} />
        
        <DestinationsList
          tours={tours}
          loading={loading}
          error={error}
        />
      </div>
    </Layout>
  );
};

export default DestinationsPage;


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
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
            <MapPinned className="h-6 w-6 mr-2 text-tamec-600" />
            {language === 'en' ? 'Our Destinations' : 'Nuestros Destinos'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover our selection of handpicked tours and travel experiences around the world.' 
              : 'Descubre nuestra selección de tours y experiencias de viaje seleccionadas alrededor del mundo.'}
          </p>
        </div>
        
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

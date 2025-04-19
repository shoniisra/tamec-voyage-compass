
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import DestinationsFilter from '@/components/destinations/DestinationsFilter';
import DestinationsList from '@/components/destinations/DestinationsList';
import { useTours } from '@/hooks/use-tours';
import { TourFilterParams } from '@/types/tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPinned, Search } from 'lucide-react';

const DestinationsPage: React.FC = () => {
  const { language } = useLanguage();
  const [filters, setFilters] = useState<TourFilterParams>({});
  const { tours, loading, error } = useTours(filters);
  
  const handleFilterChange = (newFilters: TourFilterParams) => {
    setFilters(newFilters);
  };
  
  return (
    <Layout>
      {/* Hero Section with Pattern Background */}
      <div className="relative bg-tamec-600 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-poppins animate-fade-in">
              <MapPinned className="inline-block h-8 w-8 mr-3 mb-1 text-tamec-200" />
              {language === 'en' ? 'Discover Your Next Adventure' : 'Descubre Tu Próxima Aventura'}
            </h1>
            <p className="text-lg md:text-xl text-tamec-100 dark:text-gray-300 max-w-2xl mx-auto font-inter animate-fade-up">
              {language === 'en' 
                ? 'Explore unique destinations and create unforgettable memories.' 
                : 'Explora destinos únicos y crea recuerdos inolvidables.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 -mt-12 relative z-20 animate-fade-up">
          <DestinationsFilter onFilterChange={handleFilterChange} />
        </div>
        
        {/* Tours List */}
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

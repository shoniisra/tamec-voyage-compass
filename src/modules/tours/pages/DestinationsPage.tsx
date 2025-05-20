
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { DestinationsFilter, DestinationsList } from '../components';
import { useTours } from '../hooks/use-tours';
import { TourFilterParams } from '../types/tour';
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
      {/* Hero Section with Pattern Background */}
    {/* Hero Section with Background Image */}
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden bg-gradient-to-r from-white via-gray-50 to-tamec-50/20">
        {/* Background Image Section */}
        <div className="absolute right-0 top-0 w-2/3 h-full overflow-hidden">
          <img 
            src="/assets/images/hero/hero-background.webp" 
            alt="Travel adventures background"
            className="w-full h-full object-cover object-center"
          />
          {/* Curved Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent" 
               style={{ borderTopLeftRadius: '50%', borderBottomLeftRadius: '50%' }} />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-6 h-full flex items-center">
          <div className="max-w-lg pr-8">
            <h1 className="text-5xl font-black text-tamec-800 mb-6">
              <MapPinned className="inline-block h-8 w-8 mr-3 mb-1 text-tamec-600" />
              {language === 'en' ? 'Discover Your Next Adventure' : 'Descubre Tu Próxima Aventura'}
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 max-w-md">
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 -mt-24 relative z-20 animate-fade-up">
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

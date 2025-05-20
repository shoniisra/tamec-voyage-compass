
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { DestinationsFilter, DestinationsList } from '@/modules/tours/components';
import { useTours } from '@/modules/tours/hooks/use-tours';
import { TourFilterParams } from '@/modules/tours/types/tour';
import { MapPinned } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const SpanishDestinationsPage: React.FC = () => {
  const [filters, setFilters] = useState<TourFilterParams>({});
  const { tours, loading, error } = useTours(filters);
  
  const handleFilterChange = (newFilters: TourFilterParams) => {
    setFilters(newFilters);
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Descubrir Destinos | TAMEC Agencia de Viajes</title>
        <meta name="description" content="Explore destinos únicos y paquetes de viaje con TAMEC Agencia de Viajes. Encuentre sus próximas vacaciones soñadas." />
        <link rel="canonical" href="https://tamecviajes.com/es/destinos" />
        <meta property="og:title" content="Descubrir Destinos | TAMEC Agencia de Viajes" />
        <meta property="og:description" content="Explore destinos únicos y paquetes de viaje con TAMEC Agencia de Viajes. Encuentre sus próximas vacaciones soñadas." />
        <meta property="og:url" content="https://tamecviajes.com/es/destinos" />
      </Helmet>
      
      {/* Hero Section with Pattern Background */}
      <div className="relative bg-tamec-600 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-poppins animate-fade-in">
              <MapPinned className="inline-block h-8 w-8 mr-3 mb-1 text-tamec-200" />
              Descubre Tu Próxima Aventura
            </h1>
            <p className="text-lg md:text-xl text-tamec-100 dark:text-gray-300 max-w-2xl mx-auto font-inter animate-fade-up">
              Explora destinos únicos y crea recuerdos inolvidables.
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

export default SpanishDestinationsPage;

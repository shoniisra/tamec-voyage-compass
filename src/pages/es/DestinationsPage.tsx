
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
      <div className="relative h-[80vh] min-h-[600px] overflow-hidden bg-gradient-to-r from-white via-gray-50 to-tamec-50/20">
        {/* Background Image Section */}
        <div className="absolute right-0 top-0 w-full h-full overflow-hidden">
          <img 
            src="/assets/images/hero/mainbg.png" 
            alt="Travel adventures background"
            className="w-full h-full object-cover object-center"
          />
         
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-6 h-full flex ">
          <div className="max-w-xxl pr-8 pt-16">
            <h1 className="text-5xl font-black text-tamec-800 mb-6 max-w-lg">
              <MapPinned className="inline-block h-8 w-8 mr-3 mb-1 text-tamec-600" />
               Descubre Tu Próxima Aventura
            </h1>
            
            <p className="text-lg text-gray-700 mb-4 ">
              Explora destinos únicos y crea recuerdos inolvidables.
            </p>
             {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6  relative z-20 animate-fade-up mb-24">
            <DestinationsFilter onFilterChange={handleFilterChange} />
          </div>
          </div>
         
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
       
       
        
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

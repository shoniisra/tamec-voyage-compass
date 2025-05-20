
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { DestinationsFilter, DestinationsList } from '@/modules/tours/components';
import SideFilters from '@/modules/tours/components/SideFilters';
import { useTours } from '@/modules/tours/hooks/use-tours';
import { TourFilterParams } from '@/modules/tours/types/tour';
import { MapPinned } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const EnglishDestinationsPage: React.FC = () => {
  const [filters, setFilters] = useState<TourFilterParams>({});
  const { tours, loading, error } = useTours(filters);
  const [hasActiveFilters, setHasActiveFilters] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if there are any active filters
    const filterValues = Object.values(filters).filter(Boolean);
    setHasActiveFilters(filterValues.length > 0);
  }, [filters]);
  
  const handleFilterChange = (newFilters: TourFilterParams) => {
    // Process 'all' values to be undefined for API compatibility
    const processedFilters = { ...newFilters };
    
    if (processedFilters.destino && processedFilters.destino[0] === 'all') {
      delete processedFilters.destino;
    }
    
    setFilters(processedFilters);
  };
  
  const handleClearFilters = () => {
    setFilters({});
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Discover Destinations | TAMEC Travel Agency</title>
        <meta name="description" content="Explore unique destinations and travel packages with TAMEC Travel Agency. Find your next dream vacation." />
        <link rel="canonical" href="https://tamecviajes.com/en/destinations" />
        <meta property="og:title" content="Discover Destinations | TAMEC Travel Agency" />
        <meta property="og:description" content="Explore unique destinations and travel packages with TAMEC Travel Agency. Find your next dream vacation." />
        <meta property="og:url" content="https://tamecviajes.com/en/destinations" />
      </Helmet>
      
      {/* Hero Section - Only shown when no active filters */}
      {!hasActiveFilters && (
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
               Discover Your Next Adventure
              </h1>
              
              <p className="text-lg text-gray-700 mb-4 ">
               Explore unique destinations and create unforgettable memories.
              </p>
              
              {/* Search and Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative z-20 animate-fade-up mb-24">
                <DestinationsFilter onFilterChange={handleFilterChange} />
              </div>
            </div>
           
          </div>
        </div>
      )}

      {/* Search bar when filters are active - Compact version */}
      {hasActiveFilters && (
        <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4">
          <div className="container mx-auto px-4">
            <DestinationsFilter onFilterChange={handleFilterChange} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {hasActiveFilters ? (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Side Filters - Only visible when there are active filters */}
            <div className="md:w-1/4 lg:w-1/5">
              <SideFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
            
            {/* Tours List */}
            <div className="md:w-3/4 lg:w-4/5">
              <DestinationsList
                tours={tours}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        ) : (
          <DestinationsList
            tours={tours}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </Layout>
  );
};

export default EnglishDestinationsPage;


import React from 'react';
import { Tour } from '@/types/tour';
import TourCard from './TourCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface DestinationsListProps {
  tours: Tour[];
  loading: boolean;
  error: string | null;
}

const DestinationsList: React.FC<DestinationsListProps> = ({ tours, loading, error }) => {
  const { language } = useLanguage();
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-tamec-600 text-white rounded-md hover:bg-tamec-700"
          onClick={() => window.location.reload()}
        >
          {language === 'en' ? 'Try Again' : 'Intentar de Nuevo'}
        </button>
      </div>
    );
  }
  
  if (tours.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {language === 'en' 
            ? 'No tours found matching your criteria.' 
            : 'No se encontraron tours que coincidan con tus criterios.'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tours.map(tour => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};

export default DestinationsList;

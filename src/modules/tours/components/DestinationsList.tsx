
import React from 'react';
import { Tour } from '@/modules/tours/types';
import TourCard from './TourCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          <div key={index} className="animate-pulse">
            <div className="rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
              <div className="h-64 bg-gray-300 dark:bg-gray-600" />
              <div className="p-4 space-y-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-4">
          <p className="text-red-500 font-medium">{error}</p>
          <Button 
            variant="default"
            onClick={() => window.location.reload()}
            className="bg-tamec-600 hover:bg-tamec-700 text-white"
          >
            {language === 'en' ? 'Try Again' : 'Intentar de Nuevo'}
          </Button>
        </div>
      </div>
    );
  }
  
  // Handle case when tours is undefined
  if (!tours || tours.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-4">
          <FileSearch className="h-12 w-12 mx-auto text-gray-400" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {language === 'en' 
              ? 'No tours found matching your criteria.' 
              : 'No se encontraron tours que coincidan con tus criterios.'}
          </p>
          <p className="text-gray-500 text-sm">
            {language === 'en'
              ? 'Try adjusting your filters or search for something else.'
              : 'Intenta ajustar tus filtros o busca algo diferente.'}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tours.map(tour => (
        <div key={tour.id} className="animate-fade-up">
          <TourCard tour={tour} />
        </div>
      ))}
    </div>
  );
};

export default DestinationsList;

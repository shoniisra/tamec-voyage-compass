
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, FilterIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTours } from '@/modules/tours';
import { TourFilterParams } from '@/modules/tours/types/tour';
import ToursList from '@/components/admin/tours/ToursList';
import ToursFilter from '@/components/admin/tours/ToursFilter';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const ToursPage: React.FC = () => {
  const { language } = useLanguage();
  const [filterParams, setFilterParams] = useState<TourFilterParams>({});
  const { tours, loading, error } = useTours(filterParams);
  
  const handleFilterSubmit = (filters: TourFilterParams) => {
    // Convert 'all' values to undefined for API compatibility
    const processedFilters = { ...filters };
    
    if (processedFilters.destino_id === 'all') {
      delete processedFilters.destino_id;
    }
    
    if (processedFilters.active === 'all') {
      delete processedFilters.active;
    }
    
    setFilterParams(processedFilters);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {language === 'en' ? 'Tours' : 'Tours'}
          </h1>
          
          <div className="flex space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <FilterIcon className="h-4 w-4" />
                  {language === 'en' ? 'Filters' : 'Filtros'}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="px-1 py-6">
                  <h3 className="text-lg font-medium mb-5">
                    {language === 'en' ? 'Filter Tours' : 'Filtrar Tours'}
                  </h3>
                  <ToursFilter onSubmit={handleFilterSubmit} initialValues={filterParams} />
                </div>
              </SheetContent>
            </Sheet>
            
            <Button asChild>
              <Link to="/admin/tours/create" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>{language === 'en' ? 'Create Tour' : 'Crear Tour'}</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div>
          <ToursList tours={tours} loading={loading} error={error} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ToursPage;

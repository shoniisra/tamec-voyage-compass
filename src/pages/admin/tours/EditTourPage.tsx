
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import TourForm from '@/components/admin/tours/TourForm';
import { useTour, useTourManagement } from '@/modules/tours';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Tour } from '@/modules/tours/types';

const EditTourPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tourId = parseInt(id || '0');
  
  const { language } = useLanguage();
  const { tour, loading, error } = useTour(tourId);
  const { updateTour } = useTourManagement();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (tourData: Partial<Tour>) => {
    if (!tourId) return;
    
    setIsSubmitting(true);
    
    try {
      await updateTour(tourId, tourData);
      
      toast({
        title: language === 'en' ? 'Tour Updated' : 'Tour Actualizado',
        description: language === 'en' 
          ? 'Tour has been updated successfully' 
          : 'El tour ha sido actualizado exitosamente',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error updating tour:', error);
      
      toast({
        title: language === 'en' ? 'Error' : 'Error',
        description: language === 'en' 
          ? 'There was an error updating the tour' 
          : 'Hubo un error actualizando el tour',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/2 mb-8"></div>
          
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }
  
  if (error || !tour) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-500 dark:text-red-400 mb-2">
            {language === 'en' ? 'Error Loading Tour' : 'Error al Cargar el Tour'}
          </h2>
          <p className="text-muted-foreground">
            {error || (language === 'en' ? 'Tour not found' : 'Tour no encontrado')}
          </p>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            {language === 'en' ? 'Edit Tour' : 'Editar Tour'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? `Update details for tour: ${tour.titulo}` 
              : `Actualizar detalles para el tour: ${tour.titulo}`}
          </p>
        </div>
        
        <TourForm 
          tour={tour} 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </AdminLayout>
  );
};

export default EditTourPage;

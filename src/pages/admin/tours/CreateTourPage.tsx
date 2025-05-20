
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import TourForm from '@/components/admin/tours/TourForm';
import { useTourManagement } from '@/modules/tours';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Tour } from '@/modules/tours/types';

const CreateTourPage: React.FC = () => {
  const { language } = useLanguage();
  const { createTour } = useTourManagement();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (tourData: Partial<Tour>) => {
    setIsSubmitting(true);
    try {
      const newTourId = await createTour(tourData);
      toast({
        title: language === 'en' ? 'Tour Created' : 'Tour Creado',
        description: language === 'en' 
          ? 'Tour has been created successfully' 
          : 'El tour ha sido creado exitosamente',
        variant: 'success',
      });
      navigate(`/admin/tours/edit/${newTourId}`);
    } catch (error) {
      console.error('Error creating tour:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Error',
        description: language === 'en' 
          ? 'There was an error creating the tour' 
          : 'Hubo un error creando el tour',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            {language === 'en' ? 'Create Tour' : 'Crear Tour'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Fill in the details to create a new tour.' 
              : 'Complete los detalles para crear un nuevo tour.'}
          </p>
        </div>
        
        <TourForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </AdminLayout>
  );
};

export default CreateTourPage;

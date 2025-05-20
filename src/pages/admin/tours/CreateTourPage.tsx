
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import TourForm from '@/components/admin/tours/TourForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTourManagement } from '@/modules/tours';
import { Tour } from '@/modules/tours';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CreateTourPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { createTour, isLoading } = useTourManagement();
  
  const handleSubmit = async (tourData: Partial<Tour>) => {
    try {
      const newTour = await createTour(tourData);
      navigate(`/admin/tours/edit/${newTour.id}`);
    } catch (error) {
      console.error('Error creating tour:', error);
    }
  };
  
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/admin/tours')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Back to Tours' : 'Volver a Tours'}
            </Button>
            <h1 className="text-2xl font-bold">
              {language === 'en' ? 'Create New Tour' : 'Crear Nuevo Tour'}
            </h1>
          </div>
        </div>
        
        <TourForm onSubmit={handleSubmit} isSubmitting={isLoading} />
      </div>
    </AdminLayout>
  );
};

export default CreateTourPage;

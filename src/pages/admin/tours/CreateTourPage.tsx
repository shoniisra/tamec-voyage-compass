
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTourManagement } from '@/modules/tours';
import TourForm from '@/components/admin/tours/TourForm';
import { useToast } from '@/components/ui/use-toast';
import { Tour } from '@/modules/tours/types/tour';

const CreateTourPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { createTour } = useTourManagement();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (tourData: Partial<Tour>) => {
    setIsSubmitting(true);
    try {
      // Create empty arrays for required arguments
      const destinos: Array<{ destino_id: number; orden: number }> = [];
      const salidas: Array<{ fecha_salida: string | null; dias_duracion: number; cupos_disponibles: number | null }> = [];
      const precios: Array<{
        ciudad_salida: string;
        tipo_habitacion: 'doble' | 'triple' | 'individual' | 'child';
        forma_pago: 'efectivo' | 'tarjeta';
        precio: number;
      }> = [];
      const regalos: Array<{ regalo_id: number }> = [];
      
      await createTour(tourData, destinos, salidas, precios, regalos);
      
      toast({
        title: language === 'en' ? 'Tour created successfully' : 'Tour creado con éxito',
        description: language === 'en' ? 'The tour has been created.' : 'El tour ha sido creado.',
        variant: "default",
      });
      navigate('/admin/tours');
    } catch (error: any) {
      console.error('Error creating tour:', error);
      toast({
        title: language === 'en' ? 'Error creating tour' : 'Error al crear el tour',
        description: error.message || (language === 'en' ? 'Please try again.' : 'Por favor, inténtalo de nuevo.'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/admin/tours')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {language === 'en' ? 'Create New Tour' : 'Crear Nuevo Tour'}
          </h1>
        </div>
      </div>
      
      <div className="space-y-6">
        <TourForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </AdminLayout>
  );
};

export default CreateTourPage;

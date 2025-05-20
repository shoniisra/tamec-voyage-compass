
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTour, useTourManagement } from '@/modules/tours';
import TourForm from '@/components/admin/tours/TourForm';
import { useToast } from '@/components/ui/use-toast';
import { Tour } from '@/modules/tours/types/tour';

const EditTourPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { updateTour } = useTourManagement();
  const { tour, loading, error } = useTour(id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Redirect if tour not found
  useEffect(() => {
    if (!loading && (!tour || error)) {
      toast({
        title: language === 'en' ? 'Tour not found' : 'Tour no encontrado',
        description: language === 'en' ? 'The requested tour could not be found.' : 'El tour solicitado no pudo ser encontrado.',
        variant: "destructive",
      });
      navigate('/admin/tours');
    }
  }, [tour, loading, error, navigate, language, toast]);
  
  const handleSubmit = async (tourData: Partial<Tour>) => {
    if (!tour) return;
    
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
      
      await updateTour(tour.id, tourData, destinos, salidas, precios, regalos);
      
      toast({
        title: language === 'en' ? 'Tour updated successfully' : 'Tour actualizado con éxito',
        description: language === 'en' ? 'The tour has been updated.' : 'El tour ha sido actualizado.',
        variant: "default",
      });
      // Refresh page to show updated data
      window.location.reload();
    } catch (error: any) {
      console.error('Error updating tour:', error);
      toast({
        title: language === 'en' ? 'Error updating tour' : 'Error al actualizar el tour',
        description: error.message || (language === 'en' ? 'Please try again.' : 'Por favor, inténtalo de nuevo.'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>{language === 'en' ? 'Loading tour details...' : 'Cargando detalles del tour...'}</p>
        </div>
      </AdminLayout>
    );
  }
  
  if (!tour) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/admin/tours')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {language === 'en' ? 'Edit Tour' : 'Editar Tour'}: {tour.titulo}
          </h1>
        </div>
      </div>
      
      <div className="space-y-6">
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


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTourManagement } from '@/modules/tours';
import { useToast } from '@/components/ui/use-toast';
import TourBasicInfoForm from '@/components/admin/tours/forms/TourBasicInfoForm';
import TourDestinationsForm from '@/components/admin/tours/forms/TourDestinationsForm';
import TourDeparturesForm from '@/components/admin/tours/forms/TourDeparturesForm';
import TourPricingForm from '@/components/admin/tours/forms/TourPricingForm';
import TourInclusionsForm from '@/components/admin/tours/forms/TourInclusionsForm';
import TourMediaForm from '@/components/admin/tours/forms/TourMediaForm';
import TourGiftsForm from '@/components/admin/tours/forms/TourGiftsForm';
import TourActivitiesForm from '@/components/admin/tours/forms/TourActivitiesForm';
import { Tour, TourDestino, Salida, Precio, Regalo } from '@/modules/tours/types/tour';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CreateTourPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { createTour } = useTourManagement();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // State for the form data
  const [tourData, setTourData] = useState<Partial<Tour>>({
    titulo: '',
    descripcion: '',
    dias_duracion: 1,
    incluye_vuelo: false,
    incluye_hotel: false,
    incluye_transporte: false,
    incluye_hospedaje: false,
    incluye_comida: false,
    incluye_actividades: false,
    incluye_maleta_10: false,
    incluye_maleta_23: false,
    incluye_articulo_personal: false,
  });
  
  const [destinos, setDestinos] = useState<Array<{ destino_id: number; orden: number }>>([]);
  const [salidas, setSalidas] = useState<Array<{
    fecha_salida: string | null;
    dias_duracion: number;
    cupos_disponibles: number | null;
  }>>([]);
  const [precios, setPrecios] = useState<Array<{
    ciudad_salida: string;
    tipo_habitacion: 'doble' | 'triple' | 'individual' | 'child';
    forma_pago: 'efectivo' | 'tarjeta';
    precio: number;
  }>>([]);
  const [regalos, setRegalos] = useState<Array<{ regalo_id: number }>>([]);
  const [actividades, setActividades] = useState<Array<{
    nombre: string;
    descripcion?: string;
    costo_adicional?: number;
    incluida: boolean;
  }>>([]);
  const [fotos, setFotos] = useState<Array<{
    url_imagen: string;
    descripcion?: string;
    orden?: number;
  }>>([]);
  const [adjuntos, setAdjuntos] = useState<Array<{
    url_archivo: string;
    descripcion?: string;
    tipo_archivo?: string;
  }>>([]);
  
  // Form validation state
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Handle updating the tour data
  const handleTourDataChange = (field: string, value: any) => {
    setTourData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Validate the form before submission
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!tourData.titulo) {
      newErrors.titulo = language === 'en' ? 'Title is required' : 'El título es obligatorio';
    }
    
    if (destinos.length === 0) {
      newErrors.destinos = language === 'en' ? 'At least one destination is required' : 'Se requiere al menos un destino';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle the form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: language === 'en' ? 'Validation Error' : 'Error de Validación',
        description: language === 'en' ? 'Please fix the errors before submitting' : 'Por favor, corrige los errores antes de enviar',
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Generate slug if not provided
      if (!tourData.slug) {
        const slug = tourData.titulo
          ?.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');
        tourData.slug = slug;
      }
      
      await createTour(
        tourData,
        destinos,
        salidas,
        precios,
        regalos
      );
      
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
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {language === 'en' ? 'Creating...' : 'Creando...'}
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {language === 'en' ? 'Save Tour' : 'Guardar Tour'}
            </>
          )}
        </Button>
      </div>
      
      <div className="space-y-6">
        <Tabs defaultValue="basic-info">
          <Card>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8">
              <TabsTrigger value="basic-info">
                {language === 'en' ? 'Basic Info' : 'Info Básica'}
              </TabsTrigger>
              <TabsTrigger value="destinations">
                {language === 'en' ? 'Destinations' : 'Destinos'}
              </TabsTrigger>
              <TabsTrigger value="departures">
                {language === 'en' ? 'Departures' : 'Salidas'}
              </TabsTrigger>
              <TabsTrigger value="pricing">
                {language === 'en' ? 'Pricing' : 'Precios'}
              </TabsTrigger>
              <TabsTrigger value="inclusions">
                {language === 'en' ? 'Inclusions' : 'Inclusiones'}
              </TabsTrigger>
              <TabsTrigger value="media">
                {language === 'en' ? 'Media' : 'Multimedia'}
              </TabsTrigger>
              <TabsTrigger value="gifts">
                {language === 'en' ? 'Gifts' : 'Regalos'}
              </TabsTrigger>
              <TabsTrigger value="activities">
                {language === 'en' ? 'Activities' : 'Actividades'}
              </TabsTrigger>
            </TabsList>
          </Card>
          
          <TabsContent value="basic-info">
            <Card>
              <CardContent className="pt-6">
                <TourBasicInfoForm 
                  tourData={tourData} 
                  onChange={handleTourDataChange}
                  errors={errors}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="destinations">
            <Card>
              <CardContent className="pt-6">
                <TourDestinationsForm 
                  destinos={destinos} 
                  setDestinos={setDestinos}
                  errors={errors}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="departures">
            <Card>
              <CardContent className="pt-6">
                <TourDeparturesForm 
                  salidas={salidas} 
                  setSalidas={setSalidas}
                  tourDuration={tourData.dias_duracion || 1}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pricing">
            <Card>
              <CardContent className="pt-6">
                <TourPricingForm 
                  precios={precios} 
                  setPrecios={setPrecios}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inclusions">
            <Card>
              <CardContent className="pt-6">
                <TourInclusionsForm 
                  tourData={tourData} 
                  onChange={handleTourDataChange}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="media">
            <Card>
              <CardContent className="pt-6">
                <TourMediaForm 
                  fotos={fotos} 
                  setFotos={setFotos}
                  adjuntos={adjuntos}
                  setAdjuntos={setAdjuntos}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gifts">
            <Card>
              <CardContent className="pt-6">
                <TourGiftsForm 
                  regalos={regalos} 
                  setRegalos={setRegalos}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activities">
            <Card>
              <CardContent className="pt-6">
                <TourActivitiesForm 
                  actividades={actividades} 
                  setActividades={setActividades}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            size="lg"
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {language === 'en' ? 'Creating...' : 'Creando...'}
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {language === 'en' ? 'Save Tour' : 'Guardar Tour'}
              </>
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateTourPage;

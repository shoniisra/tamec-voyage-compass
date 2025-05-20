import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTour } from '../hooks/use-tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Plane, 
  Bus, 
  Bed, 
  Utensils, 
  Camera, 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Star, 
  Heart, 
  Luggage, 
  Info 
} from 'lucide-react';
import TourHead from '@/components/seo/TourHead';
import TourStructuredData from '@/components/seo/TourStructuredData';
import { preloadTourImage } from '@/utils/seoUtils';
import { supabase } from '@/integrations/supabase/client';

const TourDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour, loading, error } = useTour(slug || '');
  const { language } = useLanguage();
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();
  
  // Default placeholder for images
  const defaultPlaceholder = 'https://placehold.co/600x400?text=Beautiful+Destination';
  
  // Build canonical URL for SEO
  const baseUrl = window.location.origin;
  const canonicalUrl = `${baseUrl}/destinations/${slug}`;
  
  const handleImageError = (index: number) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  // Preload next tour if available
  useEffect(() => {
    if (tour?.id) {
      // Try to preload related tours based on same destination
      const preloadRelatedTour = async () => {
        try {
          if (tour.destinos && tour.destinos.length > 0) {
            const mainDestinationId = tour.destinos[0].destino_id;
            
            // Find other tours with the same main destination
            const { data } = await supabase
              .from('tour_destinos')
              .select('tour_id, tours!inner(slug)')
              .eq('destino_id', mainDestinationId)
              .neq('tour_id', tour.id)
              .limit(1);
              
            if (data && data.length > 0 && data[0].tours?.slug) {
              // Preload the related tour data
              // We don't need to use prefetchTour as it's been removed
              // Just preload the image
              if (data[0].tours.slug) {
                const { data: tourData } = await supabase
                  .from('tours')
                  .select('*')
                  .eq('slug', data[0].tours.slug)
                  .single();
                  
                if (tourData) {
                  const { data: fotosData } = await supabase
                    .from('fotos')
                    .select('url_imagen')
                    .eq('tour_id', tourData.id)
                    .limit(1);
                    
                  if (fotosData && fotosData.length > 0 && fotosData[0].url_imagen) {
                    preloadTourImage(fotosData[0].url_imagen);
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error('Error preloading related tour:', error);
        }
      };
      
      preloadRelatedTour();
    }
  }, [tour?.id]);
  
  // Helper function to format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Skeleton className="h-80 w-full mb-6" />
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-6 w-5/6 mb-3" />
                <Skeleton className="h-6 w-4/6 mb-6" />
              </div>
              <div>
                <Skeleton className="h-60 w-full mb-4" />
                <Skeleton className="h-8 w-full mb-3" />
                <Skeleton className="h-8 w-full mb-3" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !tour) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/destinations">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Back to All Tours' : 'Volver a Todos los Tours'}
              </Link>
            </Button>
            <h1 className="text-2xl font-bold mb-4">
              {language === 'en' ? 'Tour Not Found' : 'Tour No Encontrado'}
            </h1>
            <p className="text-red-500">
              {error || (language === 'en' ? 'Failed to load tour.' : 'No se pudo cargar el tour.')}
            </p>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Process tour images with improved error handling
  const tourImages = [];
  
  if (tour.fotos && tour.fotos.length > 0) {
    // Sort photos by order if available
    const sortedPhotos = [...tour.fotos].sort((a, b) => ((a.orden || 0) - (b.orden || 0)));
    
    for (let i = 0; i < sortedPhotos.length; i++) {
      const foto = sortedPhotos[i];
      if (foto.url_imagen && !imageErrors[i]) {
        tourImages.push(foto.url_imagen);
      }
    }
  }
  
  // If no valid images after processing, use placeholder
  if (tourImages.length === 0) {
    tourImages.push(defaultPlaceholder);
  }

  // Sort the destinations by order if available
  const sortedDestinations = tour.destinos ? 
    [...tour.destinos].sort((a, b) => (a.orden || 0) - (b.orden || 0)) : 
    [];

  // Get upcoming departures
  const upcomingDepartures = tour.salidas ? 
    tour.salidas
      .filter(s => s.fecha_salida && new Date(s.fecha_salida) > new Date())
      .sort((a, b) => new Date(a.fecha_salida!).getTime() - new Date(b.fecha_salida!).getTime())
    : [];

  return (
    <Layout>
      {/* Add SEO components */}
      {tour && (
        <>
          <TourHead tour={tour} canonicalUrl={canonicalUrl} />
          <TourStructuredData tour={tour} canonicalUrl={canonicalUrl} />
        </>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/destinations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Back to All Tours' : 'Volver a Todos los Tours'}
            </Link>
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="md:col-span-2">
              {/* Hero Image */}
              {tourImages.length > 0 && (
                <div className="mb-6 relative rounded-lg overflow-hidden">
                  <img 
                    src={tourImages[0]} 
                    alt={tour.titulo} 
                    onError={() => handleImageError(0)}
                    className="w-full h-[400px] object-cover" 
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900/80 to-transparent p-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{tour.titulo}</h1>
                    {tour.aerolinea && (
                      <div className="text-white/90 flex items-center">
                        <Plane className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Operated by' : 'Operado por'}: {tour.aerolinea.nombre}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Tabs for Tour Details */}
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="details">{language === 'en' ? 'Details' : 'Detalles'}</TabsTrigger>
                  <TabsTrigger value="itinerary">{language === 'en' ? 'Itinerary' : 'Itinerario'}</TabsTrigger>
                  <TabsTrigger value="gallery">{language === 'en' ? 'Gallery' : 'Galería'}</TabsTrigger>
                  <TabsTrigger value="documents">{language === 'en' ? 'Documents' : 'Documentos'}</TabsTrigger>
                </TabsList>
                
                {/* Details Tab */}
                <TabsContent value="details">
                  {/* Description */}
                  {tour.descripcion && (
                    <div className="prose dark:prose-invert mb-6 max-w-none">
                      <h2 className="text-2xl font-semibold mb-3">
                        {language === 'en' ? 'Description' : 'Descripción'}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">{tour.descripcion}</p>
                    </div>
                  )}
                  
                  {/* General Information */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">
                      {language === 'en' ? 'General Information' : 'Información General'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <Clock className="text-tamec-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{language === 'en' ? 'Duration' : 'Duración'}</div>
                          <div>
                            {tour.dias_duracion} {language === 'en' ? 'days' : 'días'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="text-tamec-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">
                            {language === 'en' ? 'Publication Date' : 'Fecha de publicación'}
                          </div>
                          <div>{formatDate(tour.fecha_publicacion)}</div>
                        </div>
                      </div>
                      
                      {tour.fecha_caducidad && (
                        <div className="flex items-start">
                          <Calendar className="text-tamec-600 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">
                              {language === 'en' ? 'Expiration Date' : 'Fecha de caducidad'}
                            </div>
                            <div>{formatDate(tour.fecha_caducidad)}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Destinations */}
                  {sortedDestinations.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold mb-3">
                        {language === 'en' ? 'Destinations' : 'Destinos'}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sortedDestinations.map((destino, index) => (
                          <div key={destino.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-tamec-600 text-white rounded-full mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{destino.destino?.pais}</div>
                              {destino.destino?.ciudad && (
                                <div className="text-gray-500 dark:text-gray-400 text-sm">{destino.destino.ciudad}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* What's included */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">
                      {language === 'en' ? 'What\'s Included' : 'Qué Incluye'}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {/* Flight */}
                      <div className={`p-3 rounded-lg border ${tour.incluye_vuelo || tour.incluye_boleto_aereo ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}>
                        <div className="flex items-center">
                          <Plane className={`h-5 w-5 mr-2 ${tour.incluye_vuelo || tour.incluye_boleto_aereo ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                          <span className={tour.incluye_vuelo || tour.incluye_boleto_aereo ? 'font-medium' : 'text-gray-500'}>
                            {language === 'en' ? 'Flight' : 'Vuelo'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Transportation */}
                      <div className={`p-3 rounded-lg border ${tour.incluye_transporte ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}>
                        <div className="flex items-center">
                          <Bus className={`h-5 w-5 mr-2 ${tour.incluye_transporte ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                          <span className={tour.incluye_transporte ? 'font-medium' : 'text-gray-500'}>
                            {language === 'en' ? 'Transportation' : 'Transporte'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Accommodation */}
                      <div className={`p-3 rounded-lg border ${tour.incluye_hospedaje || tour.incluye_hotel ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}>
                        <div className="flex items-center">
                          <Bed className={`h-5 w-5 mr-2 ${tour.incluye_hospedaje || tour.incluye_hotel ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                          <span className={tour.incluye_hospedaje || tour.incluye_hotel ? 'font-medium' : 'text-gray-500'}>
                            {language === 'en' ? 'Accommodation' : 'Hospedaje'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Meals */}
                      <div className={`p-3 rounded-lg border ${tour.incluye_comida ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}>
                        <div className="flex items-center">
                          <Utensils className={`h-5 w-5 mr-2 ${tour.incluye_comida ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                          <span className={tour.incluye_comida ? 'font-medium' : 'text-gray-500'}>
                            {language === 'en' ? 'Meals' : 'Comidas'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Activities */}
                      <div className={`p-3 rounded-lg border ${tour.incluye_actividades ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}>
                        <div className="flex items-center">
                          <Camera className={`h-5 w-5 mr-2 ${tour.incluye_actividades ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                          <span className={tour.incluye_actividades ? 'font-medium' : 'text-gray-500'}>
                            {language === 'en' ? 'Activities' : 'Actividades'}
                          </span>
                        </div>
                      </div>
                      
                      {/* 23kg Luggage */}
                      <div className={`p-3 rounded-lg border ${tour.incluye_maleta_23 ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}>
                        <div className="flex items-center">
                          <Luggage className={`h-5 w-5 mr-2 ${tour.incluye_maleta_23 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                          <span className={tour.incluye_maleta_23 ? 'font-medium' : 'text-gray-500'}>
                            {language === 'en' ? '23kg Luggage' : 'Maleta 23kg'}
                          </span>
                        </div>
                      </div>
                      
                      {/* 10kg Luggage */}
                      <div className={`p-3 rounded-lg border ${tour.incluye_maleta_10 ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}>
                        <div className="flex items-center">
                          <Luggage className={`h-5 w-5 mr-2 ${tour.incluye_maleta_10 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                          <span className={tour.incluye_maleta_10 ? 'font-medium' : 'text-gray-500'}>
                            {language === 'en' ? '10kg Luggage' : 'Maleta 10kg'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Personal Item */}
                      <div className={`p-3 rounded-lg border ${tour.incluye_articulo_personal ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}>
                        <div className="flex items-center">
                          <Luggage className={`h-5 w-5 mr-2 ${tour.incluye_articulo_personal ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                          <span className={tour.incluye_articulo_personal ? 'font-medium' : 'text-gray-500'}>
                            {language === 'en' ? 'Personal Item' : 'Artículo Personal'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Gifts */}
                  {tour.regalos && tour.regalos.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold mb-3">
                        {language === 'en' ? 'Complimentary Gifts' : 'Regalos Incluidos'}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {tour.regalos.map(regalo => (
                          <div key={regalo.id} className="flex items-center p-3 bg-tamec-50 dark:bg-tamec-900/10 rounded-md">
                            <Heart className="text-tamec-600 h-5 w-5 mr-3" />
                            <div className="font-medium">{regalo.nombre}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Courtesy */}
                  {tour.coortesias && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold mb-3">
                        {language === 'en' ? 'Courtesies' : 'Cortesías'}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">{tour.coortesias}</p>
                    </div>
                  )}
                  
                  {/* Activities */}
                  {tour.actividades && tour.actividades.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold mb-3">
                        {language === 'en' ? 'Activities' : 'Actividades'}
                      </h2>
                      <div className="space-y-4">
                        {tour.actividades.map(actividad => (
                          <div key={actividad.id} className="p-4 border rounded-lg bg-white dark:bg-gray-800">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-lg">{actividad.nombre}</div>
                                {actividad.descripcion && (
                                  <p className="text-gray-600 dark:text-gray-400 mt-1">{actividad.descripcion}</p>
                                )}
                              </div>
                              {actividad.costo_adicional && actividad.costo_adicional > 0 ? (
                                <div className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 px-3 py-1 rounded-full text-sm">
                                  + ${actividad.costo_adicional}
                                </div>
                              ) : (
                                <div className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                                  {language === 'en' ? 'Included' : 'Incluido'}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Terms & Conditions */}
                  {(tour.terminos_condiciones || tour.terminos_condiciones_id) && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold mb-3">
                        {language === 'en' ? 'Terms & Conditions' : 'Términos y Condiciones'}
                      </h2>
                      {tour.terminos_condiciones && (
                        <div className="prose dark:prose-invert max-w-none">
                          <p>{tour.terminos_condiciones}</p>
                        </div>
                      )}
                      {/* We would need to fetch the terminos_condiciones details if it's just an ID reference */}
                    </div>
                  )}
                  
                  {/* Cancellation Policies */}
                  {tour.politicas_cancelacion && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold mb-3">
                        {language === 'en' ? 'Cancellation Policy' : 'Políticas de Cancelación'}
                      </h2>
                      <div className="prose dark:prose-invert max-w-none">
                        <p>{tour.politicas_cancelacion}</p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                {/* Itinerary Tab */}
                <TabsContent value="itinerary">
                  {sortedDestinations.length > 0 ? (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold mb-3">
                        {language === 'en' ? 'Trip Itinerary' : 'Itinerario del Viaje'}
                      </h2>
                      
                      <div className="relative">
                        {/* Timeline */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-tamec-200 dark:bg-tamec-800 ml-0.5"></div>
                        
                        {/* Destinations */}
                        <div className="space-y-8 relative pl-12">
                          {sortedDestinations.map((destino, index) => (
                            <div key={destino.id} className="relative">
                              {/* Timeline marker */}
                              <div className="absolute -left-12 mt-1.5 flex items-center justify-center">
                                <div className="h-9 w-9 rounded-full border-4 border-white dark:border-gray-900 bg-tamec-600 flex items-center justify-center text-white font-bold">
                                  {index + 1}
                                </div>
                              </div>
                              
                              {/* Content */}
                              <Card className="p-4">
                                <h3 className="text-xl font-semibold">{destino.destino?.pais}</h3>
                                {destino.destino?.ciudad && (
                                  <p className="text-gray-600 dark:text-gray-400">{destino.destino.ciudad}</p>
                                )}
                                
                                {/* Here we would add day-by-day activities if available */}
                                {index === 0 && (
                                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    {language === 'en' 
                                      ? 'Start of your journey - Welcome to this beautiful destination!' 
                                      : '¡Inicio de tu viaje - Bienvenido a este hermoso destino!'}
                                  </p>
                                )}
                                
                                {index === sortedDestinations.length - 1 && (
                                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    {language === 'en' 
                                      ? 'Final destination of your journey.' 
                                      : 'Destino final de tu viaje.'}
                                  </p>
                                )}
                              </Card>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      {language === 'en' 
                        ? 'No detailed itinerary available for this tour.' 
                        : 'No hay un itinerario detallado disponible para este tour.'}
                    </div>
                  )}
                </TabsContent>
                
                {/* Gallery Tab */}
                <TabsContent value="gallery">
                  {tourImages.length > 0 ? (
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">
                        {language === 'en' ? 'Photo Gallery' : 'Galería de Fotos'}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tourImages.map((image, index) => (
                          <div 
                            key={index} 
                            className="relative overflow-hidden rounded-lg aspect-[4/3] group cursor-pointer"
                          >
                            <img 
                              src={image} 
                              alt={`${tour.titulo} - ${index + 1}`} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                              onError={() => handleImageError(index)}
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="text-white text-xl">
                                <Camera className="h-8 w-8" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      {language === 'en' 
                        ? 'No photos available for this tour.' 
                        : 'No hay fotos disponibles para este tour.'}
                    </div>
                  )}
                </TabsContent>
                
                {/* Documents Tab */}
                <TabsContent value="documents">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      {language === 'en' ? 'Documents & Attachments' : 'Documentos y Adjuntos'}
                    </h2>
                    
                    {/* PDF Details */}
                    {tour.pdf_detalles_url ? (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">
                          {language === 'en' ? 'Tour Details PDF' : 'PDF con Detalles del Tour'}
                        </h3>
                        <Button asChild variant="outline" className="mb-4">
                          <a href={tour.pdf_detalles_url} target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-2 h-4 w-4" />
                            {language === 'en' ? 'Download Tour PDF' : 'Descargar PDF del Tour'}
                          </a>
                        </Button>
                      </div>
                    ) : null}
                    
                    {/* Other attachments */}
                    {tour.adjuntos && tour.adjuntos.length > 0 ? (
                      <div>
                        <h3 className="text-lg font-medium mb-3">
                          {language === 'en' ? 'Additional Documents' : 'Documentos Adicionales'}
                        </h3>
                        <div className="space-y-3">
                          {tour.adjuntos.map((adjunto, index) => (
                            <div key={index} className="flex items-center p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
                              <FileText className="text-tamec-600 mr-3 h-5 w-5" />
                              <div className="flex-grow">
                                <div>{adjunto.descripcion || `${language === 'en' ? 'Document' : 'Documento'} ${index + 1}`}</div>
                                {adjunto.tipo_archivo && (
                                  <div className="text-sm text-gray-500">{adjunto.tipo_archivo}</div>
                                )}
                              </div>
                              <Button asChild size="sm" variant="ghost">
                                <a href={adjunto.url_archivo} target="_blank" rel="noopener noreferrer">
                                  {language === 'en' ? 'View' : 'Ver'}
                                </a>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 text-gray-500">
                        {language === 'en' 
                          ? 'No additional documents available for this tour.' 
                          : 'No hay documentos adicionales disponibles para este tour.'}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column - Booking Info */}
            <div>
              {/* Price and Booking Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">
                  {language === 'en' ? 'Tour Details' : 'Detalles del Tour'}
                </h2>
                
                {/* Duration */}
                {tour.dias_duracion && (
                  <div className="flex items-center mb-3">
                    <Clock className="text-tamec-600 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500">
                        {language === 'en' ? 'Duration' : 'Duración'}
                      </div>
                      <div className="font-medium">
                        {tour.dias_duracion} {language === 'en' ? 'days' : 'días'}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Price */}
                {tour.precio_desde && (
                  <div className="flex items-center mb-5">
                    <Info className="text-tamec-600 mr-3 h-5 w-5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500">
                        {language === 'en' ? 'Price from' : 'Precio desde'}
                      </div>
                      <div className="text-2xl font-bold text-tamec-600">
                        ${tour.precio_desde.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Booking Button */}
                <Button className="w-full bg-tamec-600 hover:bg-tamec-700 mb-4">
                  {language === 'en' ? 'Book Now' : 'Reservar Ahora'}
                </Button>
                
                {/* Quick Contact Button */}
                <Button variant="outline" className="w-full">
                  <Link to="/contact">
                    {language === 'en' ? 'Request Information' : 'Solicitar Información'}
                  </Link>
                </Button>
              </div>
              
              {/* Upcoming Departures */}
              {upcomingDepartures.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-semibold mb-3">
                    {language === 'en' ? 'Upcoming Departures' : 'Próximas Salidas'}
                  </h2>
                  
                  <div className="space-y-3">
                    {upcomingDepartures.slice(0, 5).map((salida, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <div>
                          <div className="font-medium">
                            {formatDate(salida.fecha_salida)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {salida.dias_duracion} {language === 'en' ? 'days' : 'días'}
                          </div>
                        </div>
                        
                        {salida.cupos_disponibles !== null && salida.cupos_disponibles !== undefined && (
                          <div className={`text-sm rounded-full px-3 py-1 ${
                            salida.cupos_disponibles < 5 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' 
                              : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          }`}>
                            {salida.cupos_disponibles} {language === 'en' ? 'spots left' : 'cupos disponibles'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Prices */}
              {tour.precios && tour.precios.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-semibold mb-3">
                    {language === 'en' ? 'Price Options' : 'Opciones de Precio'}
                  </h2>
                  
                  <div className="space-y-3">
                    {tour.precios.map((precio, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium">
                            {language === 'en' ? 'From ' : 'Desde '} {precio.ciudad_salida}
                          </div>
                          <div className="font-bold text-tamec-600">${precio.precio.toLocaleString()}</div>
                        </div>
                        <div className="flex flex-wrap text-sm text-gray-500 dark:text-gray-400 gap-x-4">
                          {precio.tipo_habitacion && (
                            <div>
                              {language === 'en' ? 'Room: ' : 'Habitación: '}
                              {precio.tipo_habitacion === 'doble' ? (language === 'en' ? 'Double' : 'Doble') : 
                               precio.tipo_habitacion === 'triple' ? (language === 'en' ? 'Triple' : 'Triple') :
                               precio.tipo_habitacion === 'individual' ? (language === 'en' ? 'Single' : 'Individual') : 
                               precio.tipo_habitacion === 'child' ? (language === 'en' ? 'Child' : 'Niño') : 
                               precio.tipo_habitacion}
                            </div>
                          )}
                          {precio.forma_pago && (
                            <div>
                              {language === 'en' ? 'Payment: ' : 'Pago: '}
                              {precio.forma_pago === 'efectivo' ? (language === 'en' ? 'Cash' : 'Efectivo') :
                               precio.forma_pago === 'tarjeta' ? (language === 'en' ? 'Card' : 'Tarjeta') :
                               precio.forma_pago}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TourDetailPage;

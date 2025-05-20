import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTour } from '../hooks/use-tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Calendar, Clock, Users, Check, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Helmet } from 'react-helmet-async';
import TourStructuredData from '@/components/seo/TourStructuredData';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TourDetailPageProps {
  slug?: string;
}

const TourDetailPage: React.FC<TourDetailPageProps> = ({ slug: propSlug }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const finalSlug = propSlug || paramSlug || '';
  const { tour, loading, error } = useTour(finalSlug);
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('details');
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-lg text-gray-500">
            {language === 'en' ? 'Loading tour details...' : 'Cargando detalles del tour...'}
          </p>
        </div>
      </div>
    );
  }
  
  if (error || !tour) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-lg text-red-500 mb-4">
            {language === 'en' ? 'Error loading tour' : 'Error al cargar el tour'}
          </p>
          <p className="text-gray-600">
            {language === 'en' ? 'The requested tour could not be found.' : 'El tour solicitado no pudo ser encontrado.'}
          </p>
        </div>
      </div>
    );
  }
  
  // SEO Title and Description
  const seoTitle = `${tour.titulo} | ${language === 'en' ? 'TAMEC Travel Agency' : 'TAMEC Agencia de Viajes'}`;
  const seoDescription = tour.descripcion || (language === 'en' ? 'Explore this amazing tour with TAMEC Travel Agency' : 'Explora este increíble tour con TAMEC Agencia de Viajes');
  
  // Get the main image
  const mainImage = tour.fotos?.length > 0 ? tour.fotos[0].url_imagen : '/placeholder.svg';
  
  // Generate canonical URL for structured data
  const canonicalUrl = `https://tamecviajes.com/${language === 'en' ? 'en/destinations' : 'es/destinos'}/${tour.slug || tour.id}`;
  
  // Get first destination name
  const mainDestination = tour.destinos?.length > 0 
    ? tour.destinos.find(d => d.orden === 1)?.destino?.nombre || tour.destino_principal
    : tour.destino_principal;
  
  // Get next available departure
  const nextDeparture = tour.salidas?.length > 0 
    ? tour.salidas.sort((a, b) => new Date(a.fecha_salida).getTime() - new Date(b.fecha_salida).getTime())[0]
    : null;
  
  // Find the starting price
  const startingPrice = tour.precios?.length > 0
    ? Math.min(...tour.precios.map(p => p.precio))
    : null;
  
  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={mainImage} />
      </Helmet>
      
      <TourStructuredData tour={tour} canonicalUrl={canonicalUrl} />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={mainImage} 
            alt={tour.titulo} 
            className="w-full h-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
            {tour.titulo}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-white">
            {mainDestination && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{mainDestination}</span>
              </div>
            )}
            
            {tour.dias_duracion && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  {tour.dias_duracion} {language === 'en' ? 'days' : 'días'}
                </span>
              </div>
            )}
            
            {nextDeparture && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(nextDeparture.fecha_salida).toLocaleDateString(
                    language === 'en' ? 'en-US' : 'es-ES', 
                    { day: 'numeric', month: 'short', year: 'numeric' }
                  )}
                </span>
              </div>
            )}
            
            {startingPrice && (
              <div className="flex items-center gap-1 font-semibold">
                <DollarSign className="h-4 w-4" />
                <span>
                  {language === 'en' ? 'From' : 'Desde'} ${startingPrice}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="details">
                  {language === 'en' ? 'Details' : 'Detalles'}
                </TabsTrigger>
                <TabsTrigger value="itinerary">
                  {language === 'en' ? 'Itinerary' : 'Itinerario'}
                </TabsTrigger>
                <TabsTrigger value="includes">
                  {language === 'en' ? 'What\'s Included' : 'Qué Incluye'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {language === 'en' ? 'Tour Overview' : 'Descripción General'}
                  </h2>
                  <div className="prose max-w-none">
                    <p>{tour.descripcion}</p>
                  </div>
                </div>
                
                {tour.fotos && tour.fotos.length > 1 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'en' ? 'Gallery' : 'Galería'}
                    </h3>
                    <Carousel className="w-full">
                      <CarouselContent>
                        {tour.fotos.map((foto) => (
                          <CarouselItem key={foto.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                              <Card>
                                <CardContent className="p-0">
                                  <AspectRatio ratio={4/3}>
                                    <img 
                                      src={foto.url_imagen} 
                                      alt={foto.descripcion || tour.titulo} 
                                      className="w-full h-full object-cover rounded-md"
                                    />
                                  </AspectRatio>
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="itinerary" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {language === 'en' ? 'Tour Itinerary' : 'Itinerario del Tour'}
                  </h2>
                  
                  {tour.destinos && tour.destinos.length > 0 ? (
                    <div className="space-y-4">
                      {tour.destinos
                        .sort((a, b) => (a.orden || 0) - (b.orden || 0))
                        .map((destino) => (
                          <Card key={destino.id}>
                            <CardContent className="p-4">
                              <h3 className="font-semibold">
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm mr-2">
                                  {destino.orden}
                                </span>
                                {destino.destino.nombre}
                                {destino.destino.ciudad && ` - ${destino.destino.ciudad}`}
                              </h3>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {language === 'en' 
                        ? 'Detailed itinerary information will be provided soon.' 
                        : 'La información detallada del itinerario se proporcionará pronto.'}
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="includes" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {language === 'en' ? 'What\'s Included' : 'Qué Incluye'}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className={tour.incluye_vuelo ? "border-primary" : "border-gray-200"}>
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className={`mt-1 p-1 rounded-full ${tour.incluye_vuelo ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}>
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{language === 'en' ? 'Flight' : 'Vuelo'}</h4>
                          <p className="text-sm text-muted-foreground">
                            {tour.incluye_vuelo 
                              ? (language === 'en' ? 'Included in the package' : 'Incluido en el paquete')
                              : (language === 'en' ? 'Not included' : 'No incluido')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className={tour.incluye_hotel ? "border-primary" : "border-gray-200"}>
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className={`mt-1 p-1 rounded-full ${tour.incluye_hotel ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}>
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{language === 'en' ? 'Hotel' : 'Hotel'}</h4>
                          <p className="text-sm text-muted-foreground">
                            {tour.incluye_hotel 
                              ? (language === 'en' ? 'Included in the package' : 'Incluido en el paquete')
                              : (language === 'en' ? 'Not included' : 'No incluido')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className={tour.incluye_transporte ? "border-primary" : "border-gray-200"}>
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className={`mt-1 p-1 rounded-full ${tour.incluye_transporte ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}>
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{language === 'en' ? 'Transportation' : 'Transporte'}</h4>
                          <p className="text-sm text-muted-foreground">
                            {tour.incluye_transporte 
                              ? (language === 'en' ? 'Included in the package' : 'Incluido en el paquete')
                              : (language === 'en' ? 'Not included' : 'No incluido')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className={tour.incluye_comida ? "border-primary" : "border-gray-200"}>
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className={`mt-1 p-1 rounded-full ${tour.incluye_comida ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}>
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{language === 'en' ? 'Meals' : 'Comidas'}</h4>
                          <p className="text-sm text-muted-foreground">
                            {tour.incluye_comida 
                              ? (language === 'en' ? 'Included in the package' : 'Incluido en el paquete')
                              : (language === 'en' ? 'Not included' : 'No incluido')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className={tour.incluye_actividades ? "border-primary" : "border-gray-200"}>
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className={`mt-1 p-1 rounded-full ${tour.incluye_actividades ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}>
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{language === 'en' ? 'Activities' : 'Actividades'}</h4>
                          <p className="text-sm text-muted-foreground">
                            {tour.incluye_actividades 
                              ? (language === 'en' ? 'Included in the package' : 'Incluido en el paquete')
                              : (language === 'en' ? 'Not included' : 'No incluido')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {tour.actividades && tour.actividades.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">
                        {language === 'en' ? 'Included Activities' : 'Actividades Incluidas'}
                      </h3>
                      <ul className="space-y-2">
                        {tour.actividades.map((actividad) => (
                          <li key={actividad.id} className="flex items-start gap-2">
                            <Check className="h-4 w-4 mt-1 text-primary" />
                            <span>{actividad.nombre}</span>
                            {actividad.descripcion && (
                              <span className="text-sm text-muted-foreground"> - {actividad.descripcion}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Booking Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'en' ? 'Booking Information' : 'Información de Reserva'}
                </h3>
                
                {startingPrice && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Starting from' : 'Desde'}
                    </p>
                    <p className="text-3xl font-bold">${startingPrice}</p>
                  </div>
                )}
                
                {tour.salidas && tour.salidas.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">
                      {language === 'en' ? 'Available Departures' : 'Salidas Disponibles'}
                    </h4>
                    <div className="space-y-2">
                      {tour.salidas
                        .filter(s => s.fecha_salida)
                        .sort((a, b) => new Date(a.fecha_salida).getTime() - new Date(b.fecha_salida).getTime())
                        .slice(0, 3)
                        .map((salida) => (
                          <div key={salida.id} className="flex justify-between items-center p-2 rounded bg-gray-50">
                            <span>
                              {new Date(salida.fecha_salida).toLocaleDateString(
                                language === 'en' ? 'en-US' : 'es-ES', 
                                { day: 'numeric', month: 'short', year: 'numeric' }
                              )}
                            </span>
                            {salida.cupos_disponibles !== null && (
                              <span className="text-sm">
                                <Users className="h-3 w-3 inline mb-1 mr-1" />
                                {salida.cupos_disponibles} {language === 'en' ? 'spots left' : 'cupos disponibles'}
                              </span>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                <Button className="w-full">
                  {language === 'en' ? 'Request Information' : 'Solicitar Información'}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {language === 'en' 
                    ? 'Our team will contact you with more details.' 
                    : 'Nuestro equipo te contactará con más detalles.'}
                </p>
              </CardContent>
            </Card>
            
            {tour.aerolinea && (
              <div>
                <h4 className="font-medium mb-2">
                  {language === 'en' ? 'Airline Partner' : 'Aerolínea Asociada'}
                </h4>
                <div className="p-4 bg-gray-50 rounded flex items-center justify-center">
                  {tour.aerolinea.nombre && (
                    <span>{tour.aerolinea.nombre}</span>
                  )}
                </div>
              </div>
            )}
            
            {tour.terminos_condiciones && (
              <div className="text-sm text-muted-foreground">
                <h4 className="font-medium text-foreground mb-1">
                  {language === 'en' ? 'Terms & Conditions' : 'Términos y Condiciones'}
                </h4>
                <p className="line-clamp-3">{tour.terminos_condiciones}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetailPage;

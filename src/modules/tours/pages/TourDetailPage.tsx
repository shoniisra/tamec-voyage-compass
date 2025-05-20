import React from 'react';
import { useTour } from '../hooks/use-tour';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TourHead from '@/components/seo/TourHead';
import TourStructuredData from '@/components/seo/TourStructuredData';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Plane,
  Hotel,
  Bus,
  Utensils,
  Sun,
  Briefcase,
  File,
  FileText,
  Info,
  Download,
  Star
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface TourDetailPageProps {
  slug: string;
}

const TourDetailPage: React.FC<TourDetailPageProps> = ({ slug }) => {
  const { tour, loading, error } = useTour(slug);
  const [activeTab, setActiveTab] = useState('details');
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Skeleton Hero */}
          <div className="w-full h-96 bg-gray-200 dark:bg-gray-800 rounded-xl mb-8 animate-pulse" />
          
          {/* Skeleton Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
            
            <div>
              <Skeleton className="h-64 w-full" />
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
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Info className="h-12 w-12 text-muted-foreground mb-4" />
              <h1 className="text-2xl font-bold mb-2">
                {language === 'en' ? 'Tour Not Found' : 'Tour No Encontrado'}
              </h1>
              <p className="text-muted-foreground mb-6">
                {language === 'en'
                  ? 'The tour you are looking for does not exist or is no longer available.'
                  : 'El tour que estás buscando no existe o ya no está disponible.'}
              </p>
              <Button asChild>
                <a href="/destinations">
                  {language === 'en' ? 'View All Tours' : 'Ver Todos los Tours'}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Create a canonicalUrl for SEO components
  const canonicalUrl = `https://tamecviajes.com/${language}/destinations/${slug}`;
  
  // Get main destination
  const mainDestination = tour.destinos?.[0]?.destino;
  
  // Get hero image
  const heroImage = tour.fotos?.find(foto => foto.orden === 1)?.url_imagen || tour.fotos?.[0]?.url_imagen;
  
  // Handle tour dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-EC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <Layout>
      {/* SEO Components */}
      <TourHead tour={tour} canonicalUrl={canonicalUrl} />
      <TourStructuredData tour={tour} canonicalUrl={canonicalUrl} />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-gray-900">
        {heroImage ? (
          <img
            src={heroImage}
            alt={tour.titulo}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-12">
          <div className="max-w-3xl text-white">
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 text-tamec-400 mr-2" />
              <span className="text-tamec-400 font-semibold">
                {mainDestination?.nombre || tour.destino_principal || 'Tour'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.titulo}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {tour.dias_duracion && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {tour.dias_duracion}{' '}
                    {language === 'en' 
                      ? `day${tour.dias_duracion > 1 ? 's' : ''}` 
                      : `día${tour.dias_duracion > 1 ? 's' : ''}`}
                  </span>
                </div>
              )}
              
              {tour.aerolinea && (
                <div className="flex items-center">
                  <Plane className="h-4 w-4 mr-1" />
                  <span>{tour.aerolinea.nombre}</span>
                </div>
              )}
              
              {tour.precio_desde && (
                <div className="bg-tamec-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {language === 'en' ? 'From ' : 'Desde '}
                  ${tour.precio_desde.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="details">
                  <Info className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Details' : 'Detalles'}
                </TabsTrigger>
                <TabsTrigger value="itinerary">
                  <Clock className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Itinerary' : 'Itinerario'}
                </TabsTrigger>
                <TabsTrigger value="gallery">
                  <Sun className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Gallery' : 'Galería'}
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Documents' : 'Documentos'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-8">
                {/* Tour Description */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    {language === 'en' ? 'Tour Description' : 'Descripción del Tour'}
                  </h2>
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    {tour.descripcion ? (
                      <p>{tour.descripcion}</p>
                    ) : (
                      <p className="text-muted-foreground">
                        {language === 'en' ? 'No description available.' : 'No hay descripción disponible.'}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Includes Section */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    {language === 'en' ? 'What\'s Included' : '¿Qué Incluye?'}
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.incluye_vuelo && (
                      <div className="flex items-start">
                        <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 mr-3">
                          <Plane className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {language === 'en' ? 'Flight' : 'Vuelo'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {tour.aerolinea?.nombre || 
                              (language === 'en' ? 'Included' : 'Incluido')}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {tour.incluye_hotel && (
                      <div className="flex items-start">
                        <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 mr-3">
                          <Hotel className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {language === 'en' ? 'Hotel' : 'Hotel'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'en' ? 'Included' : 'Incluido'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {tour.incluye_transporte && (
                      <div className="flex items-start">
                        <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 mr-3">
                          <Bus className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {language === 'en' ? 'Transport' : 'Transporte'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'en' ? 'Included' : 'Incluido'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {tour.incluye_comida && (
                      <div className="flex items-start">
                        <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 mr-3">
                          <Utensils className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {language === 'en' ? 'Meals' : 'Comidas'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'en' ? 'Included' : 'Incluido'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {tour.incluye_actividades && (
                      <div className="flex items-start">
                        <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 mr-3">
                          <Sun className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {language === 'en' ? 'Activities' : 'Actividades'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'en' ? 'Included' : 'Incluido'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {tour.incluye_maleta_23 && (
                      <div className="flex items-start">
                        <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 mr-3">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {language === 'en' ? '23kg Luggage' : 'Maleta 23kg'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'en' ? 'Included' : 'Incluido'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {tour.incluye_maleta_10 && (
                      <div className="flex items-start">
                        <div className="flex items-center justify-center rounded-full bg-primary/10 p-2 mr-3">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {language === 'en' ? '10kg Luggage' : 'Maleta 10kg'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'en' ? 'Included' : 'Incluido'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Activities */}
                {tour.actividades && tour.actividades.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">
                      {language === 'en' ? 'Activities' : 'Actividades'}
                    </h2>
                    
                    <div className="space-y-4">
                      {tour.actividades.map((actividad) => (
                        <Card key={actividad.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">{actividad.nombre}</h3>
                                {actividad.descripcion && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {actividad.descripcion}
                                  </p>
                                )}
                              </div>
                              {actividad.costo_adicional !== undefined && actividad.costo_adicional > 0 && (
                                <div className="bg-muted px-3 py-1 rounded text-sm">
                                  {language === 'en' ? 'Extra ' : 'Extra '}
                                  ${actividad.costo_adicional.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Terms and Conditions */}
                {tour.terminos_condiciones && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">
                      {language === 'en' ? 'Terms and Conditions' : 'Términos y Condiciones'}
                    </h2>
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      <p>{tour.terminos_condiciones}</p>
                    </div>
                  </div>
                )}
                
                {/* Cancellation Policy */}
                {tour.politicas_cancelacion && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">
                      {language === 'en' ? 'Cancellation Policy' : 'Políticas de Cancelación'}
                    </h2>
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      <p>{tour.politicas_cancelacion}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="itinerary" className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    {language === 'en' ? 'Destinations' : 'Destinos'}
                  </h2>
                  
                  {tour.destinos && tour.destinos.length > 0 ? (
                    <div className="space-y-4">
                      {tour.destinos
                        .sort((a, b) => a.orden - b.orden)
                        .map((tourDestino, index) => (
                          <Card key={tourDestino.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className="flex items-center justify-center rounded-full bg-primary/10 h-10 w-10 p-2 shrink-0">
                                  <span className="font-semibold">{index + 1}</span>
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {tourDestino.destino?.nombre}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {tourDestino.destino?.ciudad && tourDestino.destino.pais
                                      ? `${tourDestino.destino.ciudad}, ${tourDestino.destino.pais}`
                                      : tourDestino.destino?.pais}
                                  </p>
                                  {tourDestino.destino?.descripcion && (
                                    <p className="mt-2">{tourDestino.destino.descripcion}</p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {language === 'en' 
                        ? 'No destination details available.' 
                        : 'No hay detalles de destino disponibles.'}
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="gallery" className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    {language === 'en' ? 'Gallery' : 'Galería'}
                  </h2>
                  
                  {tour.fotos && tour.fotos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tour.fotos.map((foto) => (
                        <div key={foto.id} className="aspect-video overflow-hidden rounded-lg">
                          <img 
                            src={foto.url_imagen} 
                            alt={foto.descripcion || tour.titulo}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {language === 'en' ? 'No photos available.' : 'No hay fotos disponibles.'}
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    {language === 'en' ? 'Documents' : 'Documentos'}
                  </h2>
                  
                  {tour.adjuntos && tour.adjuntos.length > 0 ? (
                    <div className="space-y-4">
                      {tour.adjuntos.map((adjunto) => (
                        <Card key={adjunto.id}>
                          <CardContent className="p-4 flex justify-between items-center">
                            <div className="flex items-center">
                              <File className="h-6 w-6 text-primary mr-3" />
                              <div>
                                <p className="font-medium">
                                  {adjunto.descripcion || language === 'en' ? 'Document' : 'Documento'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {adjunto.tipo_archivo || ''}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <a href={adjunto.url_archivo} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4 mr-2" />
                                {language === 'en' ? 'Download' : 'Descargar'}
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {language === 'en' ? 'No documents available.' : 'No hay documentos disponibles.'}
                    </p>
                  )}
                  
                  {/* PDF Details */}
                  {tour.pdf_detalles_url && (
                    <div className="mt-6">
                      <Card>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText className="h-6 w-6 text-primary mr-3" />
                            <div>
                              <p className="font-medium">
                                {language === 'en' ? 'Tour Details PDF' : 'PDF de Detalles del Tour'}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={tour.pdf_detalles_url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-2" />
                              {language === 'en' ? 'Download' : 'Descargar'}
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Booking Info */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="bg-white dark:bg-gray-800 border border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">
                  {language === 'en' ? 'Booking Information' : 'Información de Reserva'}
                </h3>
                
                {/* Available Departures */}
                {tour.salidas && tour.salidas.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      {language === 'en' ? 'Available Departures' : 'Salidas Disponibles'}
                    </h4>
                    {tour.salidas.map((salida) => (
                      <div key={salida.id} className="border rounded-md p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-tamec-600" />
                          <span className="font-medium">{formatDate(salida.fecha_salida)}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span>
                              {salida.dias_duracion}{' '}
                              {language === 'en'
                                ? `day${salida.dias_duracion > 1 ? 's' : ''}`
                                : `día${salida.dias_duracion > 1 ? 's' : ''}`}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span>
                              {salida.cupos_disponibles}{' '}
                              {language === 'en'
                                ? 'available'
                                : 'disponibles'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Prices */}
                {tour.precios && tour.precios.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      {language === 'en' ? 'Prices' : 'Precios'}
                    </h4>
                    
                    <div className="space-y-2">
                      {tour.precios.map((precio) => (
                        <div key={precio.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">
                              {precio.tipo_habitacion === 'doble' 
                                ? language === 'en' ? 'Double Room' : 'Habitación Doble'
                                : precio.tipo_habitacion === 'triple' 
                                ? language === 'en' ? 'Triple Room' : 'Habitación Triple'
                                : precio.tipo_habitacion === 'individual'
                                ? language === 'en' ? 'Single Room' : 'Habitación Individual'
                                : language === 'en' ? 'Child Price' : 'Precio Niño'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {precio.forma_pago === 'efectivo' 
                                ? language === 'en' ? 'Cash payment' : 'Pago en efectivo'
                                : language === 'en' ? 'Card payment' : 'Pago con tarjeta'}
                              {precio.ciudad_salida && ` - ${precio.ciudad_salida}`}
                            </p>
                          </div>
                          <div className="font-semibold">${precio.precio.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Book Button */}
                <Button className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Book Now' : 'Reservar Ahora'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TourDetailPage;

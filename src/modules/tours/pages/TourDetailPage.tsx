
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useTour } from '@/modules/tours/hooks/use-tour';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Briefcase,
  Calendar,
  Clock,
  FileText,
  Globe,
  Image,
  MapPin,
  Package,
  Plane,
  Utensils,
  Bed,
  Bus,
  CheckCircle2,
  XCircle,
  Download,
  AlertCircle,
  PlaneTakeoff,
  ArrowLeft
} from 'lucide-react';
import { Tour } from '../types';
import { useLanguage } from '@/contexts/LanguageContext';
import TourHead from '@/components/seo/TourHead';
import TourStructuredData from '@/components/seo/TourStructuredData';

// Default props interface
interface TourDetailPageProps {
  slug?: string;
}

const TourDetailPage: React.FC<TourDetailPageProps> = ({ slug: propSlug }) => {
  // If slug was not passed as prop, try to get it from URL params
  const { slug: paramSlug } = useParams<{ slug?: string }>();
  const slug = propSlug || paramSlug || '';
  const { tour, loading, error } = useTour(slug);
  const { language } = useLanguage();

  // Format price to show cents only if needed
  const formatPrice = (price: number) => {
    return price % 1 === 0
      ? `$${price.toFixed(0)}`
      : `$${price.toFixed(2)}`;
  };

  // Tour details loader skeleton
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <Skeleton className="h-96 w-full rounded-xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-2/3 mb-6" />
              <Skeleton className="h-10 w-48 mb-8" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-72 w-full rounded-lg mb-4" />
              <Skeleton className="h-12 w-full mb-4" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error || !tour) {
    return (
      <Layout>
        <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
        
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Tour Not Found' : 'Tour No Encontrado'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {language === 'en'
              ? 'The tour you are looking for does not exist or has been removed.'
              : 'El tour que estás buscando no existe o ha sido eliminado.'}
          </p>
          <Button className="mb-4">
                <Link to="/destinations">
                  {language === 'en' ? 'Back to All Tours' : 'Volver a Todos los Tours'}
                </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Find main destination
  const mainDestination = tour.destinos?.length
    ? tour.destinos.find(d => d.orden === 1)?.destino || tour.destinos[0].destino
    : null;

  return (
    <Layout>
      {/* Add SEO metadata */}
      <TourHead tour={tour} /> {/*todo: add canonical url*/} 
      <TourStructuredData tour={tour} /> {/*todo: add canonical url*/} 

      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        {tour.fotos && tour.fotos.length > 0 ? (
          <img
            src={tour.fotos[0].url_imagen}
            alt={tour.titulo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Package className="h-16 w-16 text-muted-foreground opacity-50" />
          </div>
        )}
       
        <div className="absolute  inset-0  bg-gradient-to-t from-black/70 to-transparent flex items-end">  
        <Button asChild variant="ghost" className="mb-4 absolute top-0">
            <Link to="/destinations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Back' : 'Volver'}
            </Link>
          </Button>      
          <div className="container mx-auto px-4 pb-8 md:pb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {tour.titulo}
            </h1>
            {mainDestination && (
              <div className="flex items-center text-white/90 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {mainDestination.ciudad || ''} {mainDestination.ciudad && mainDestination.pais && ','}{' '}
                  {mainDestination.pais}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="max-w-5xl">
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/destinations">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Back to All Tours' : 'Volver a Todos los Tours'}
              </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Tour Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="details">
                  <FileText className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Details' : 'Detalles'}
                </TabsTrigger>
                <TabsTrigger value="itinerary">
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Itinerary' : 'Itinerario'}
                </TabsTrigger>
                <TabsTrigger value="gallery">
                  <Image className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Gallery' : 'Galería'}
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Documents' : 'Documentos'}
                </TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                {tour.descripcion && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === 'en' ? 'Description' : 'Descripción'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {tour.descripcion}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Tour Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Tour Information' : 'Información del Tour'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {tour.dias_duracion && (
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-primary" />
                          <div>
                            <p className="text-sm font-medium">
                              {language === 'en' ? 'Duration' : 'Duración'}
                            </p>
                            <p className="text-muted-foreground">
                              {tour.dias_duracion}{' '}
                              {language === 'en'
                                ? `day${tour.dias_duracion > 1 ? 's' : ''}`
                                : `día${tour.dias_duracion > 1 ? 's' : ''}`}
                            </p>
                          </div>
                        </div>
                      )}

                      {tour.aerolinea?.nombre && (
                        <div className="flex items-center">
                          <Plane className="h-5 w-5 mr-2 text-primary" />
                          <div>
                            <p className="text-sm font-medium">
                              {language === 'en' ? 'Airline' : 'Aerolínea'}
                            </p>
                            <p className="text-muted-foreground">{tour.aerolinea.nombre}</p>
                          </div>
                        </div>
                      )}

                      {tour.destinos && tour.destinos.length > 0 && (
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-primary" />
                          <div>
                            <p className="text-sm font-medium">
                              {language === 'en' ? 'Destinations' : 'Destinos'}
                            </p>
                            <p className="text-muted-foreground">
                              {tour.destinos.length}{' '}
                              {language === 'en'
                                ? `destination${tour.destinos.length > 1 ? 's' : ''}`
                                : `destino${tour.destinos.length > 1 ? 's' : ''}`}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* What's Included */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'What\'s Included' : '¿Qué Incluye?'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        {tour.incluye_vuelo || tour.incluye_boleto_aereo ? (
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 mr-2 text-destructive" />
                        )}
                        <span>
                          {language === 'en' ? 'Flights' : 'Vuelos'}
                        </span>
                      </div>

                      <div className="flex items-center">
                        {tour.incluye_hospedaje || tour.incluye_hotel ? (
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 mr-2 text-destructive" />
                        )}
                        <span>
                          {language === 'en' ? 'Accommodation' : 'Hospedaje'}
                        </span>
                      </div>

                      <div className="flex items-center">
                        {tour.incluye_comida ? (
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 mr-2 text-destructive" />
                        )}
                        <span>
                          {language === 'en' ? 'Meals' : 'Comidas'}
                        </span>
                      </div>

                      <div className="flex items-center">
                        {tour.incluye_transporte ? (
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 mr-2 text-destructive" />
                        )}
                        <span>
                          {language === 'en' ? 'Transportation' : 'Transporte'}
                        </span>
                      </div>

                      <div className="flex items-center">
                        {tour.incluye_actividades ? (
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 mr-2 text-destructive" />
                        )}
                        <span>
                          {language === 'en' ? 'Activities' : 'Actividades'}
                        </span>
                      </div>

                      {(tour.incluye_maleta_10 || tour.incluye_maleta_23) && (
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                          <span>
                            {language === 'en' ? 'Luggage' : 'Equipaje'} 
                            {tour.incluye_maleta_23 ? ' (23kg)' : ''} 
                            {tour.incluye_maleta_10 ? ' (10kg)' : ''}
                          </span>
                        </div>
                      )}

                      {tour.incluye_articulo_personal && (
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                          <span>
                            {language === 'en' ? 'Personal Item' : 'Artículo Personal'}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Activities */}
                {tour.actividades && tour.actividades.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === 'en' ? 'Activities' : 'Actividades'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tour.actividades.map((actividad) => (
                          <li key={actividad.id} className="flex items-start">
                            {actividad.incluida ? (
                              <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                            ) : (
                              <AlertCircle className="h-5 w-5 mr-2 text-amber-500 mt-0.5" />
                            )}
                            <div>
                              <p className="font-medium">{actividad.nombre}</p>
                              {actividad.descripcion && (
                                <p className="text-sm text-muted-foreground">
                                  {actividad.descripcion}
                                </p>
                              )}
                              {actividad.costo_adicional && !actividad.incluida && (
                                <p className="text-sm font-medium text-primary">
                                  {language === 'en' 
                                    ? `Additional cost: ${formatPrice(actividad.costo_adicional)}`
                                    : `Costo adicional: ${formatPrice(actividad.costo_adicional)}`}
                                </p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Terms and Conditions */}
                {tour.terminos_condiciones && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === 'en' 
                          ? 'Terms & Conditions' 
                          : 'Términos y Condiciones'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none dark:prose-invert">
                        <div className="whitespace-pre-line text-muted-foreground">
                          {tour.terminos_condiciones}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Cancellation Policy */}
                {tour.politicas_cancelacion && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === 'en' 
                          ? 'Cancellation Policy' 
                          : 'Política de Cancelación'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none dark:prose-invert">
                        <div className="whitespace-pre-line text-muted-foreground">
                          {tour.politicas_cancelacion}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Courtesy Items */}
                {tour.coortesias && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === 'en' ? 'Courtesy Items' : 'Cortesías'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none dark:prose-invert">
                        <div className="whitespace-pre-line text-muted-foreground">
                          {tour.coortesias}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Itinerary Tab */}
              <TabsContent value="itinerary" className="space-y-6">
                {tour.destinos && tour.destinos.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === 'en' ? 'Destination Itinerary' : 'Itinerario de Destinos'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Sort destinations by order field and map them */}
                        {[...tour.destinos]
                          .sort((a, b) => (a.orden || 0) - (b.orden || 0))
                          .map((tourDestino) => (
                            <div 
                              key={tourDestino.id} 
                              className="flex items-start border-b border-border last:border-0 pb-4 last:pb-0"
                            >
                              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                                <span className="font-medium text-primary">
                                  {tourDestino.orden || '-'}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-medium">
                                  {tourDestino.destino?.nombre || 
                                    (language === 'en' ? 'Unknown Destination' : 'Destino Desconocido')}
                                </h3>
                                <p className="text-muted-foreground">
                                  {tourDestino.destino?.ciudad || ''} 
                                  {tourDestino.destino?.ciudad && tourDestino.destino?.pais ? ', ' : ''} 
                                  {tourDestino.destino?.pais || ''}
                                </p>
                                {tourDestino.destino?.descripcion && (
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    {tourDestino.destino.descripcion}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Globe className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                      <p className="text-muted-foreground">
                        {language === 'en' 
                          ? 'No itinerary information available for this tour.' 
                          : 'No hay información de itinerario disponible para este tour.'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery">
                {tour.fotos && tour.fotos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.fotos.map((foto) => (
                      <div 
                        key={foto.id} 
                        className="relative aspect-square rounded-md overflow-hidden bg-muted"
                      >
                        <img
                          src={foto.url_imagen}
                          alt={foto.descripcion || tour.titulo}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Image className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                      <p className="text-muted-foreground">
                        {language === 'en'
                          ? 'No gallery images available for this tour.'
                          : 'No hay imágenes de galería disponibles para este tour.'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents">
                {(tour.adjuntos && tour.adjuntos.length > 0) || tour.pdf_detalles_url ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === 'en' ? 'Documents' : 'Documentos'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tour.pdf_detalles_url && (
                          <li>
                            <a 
                              href={tour.pdf_detalles_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 border border-border rounded-md hover:bg-muted transition-colors"
                            >
                              <FileText className="h-5 w-5 mr-3 text-primary" />
                              <div className="flex-1">
                                <p className="font-medium">
                                  {language === 'en' ? 'Tour Details PDF' : 'PDF de Detalles del Tour'}
                                </p>
                              </div>
                              <Download className="h-4 w-4 text-muted-foreground" />
                            </a>
                          </li>
                        )}
                        
                        {tour.adjuntos && tour.adjuntos.map((adjunto) => (
                          <li key={adjunto.id}>
                            <a 
                              href={adjunto.url_archivo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 border border-border rounded-md hover:bg-muted transition-colors"
                            >
                              <FileText className="h-5 w-5 mr-3 text-primary" />
                              <div className="flex-1">
                                <p className="font-medium">
                                  {adjunto.descripcion || (language === 'en' ? 'Document' : 'Documento')}
                                </p>
                                {adjunto.tipo_archivo && (
                                  <p className="text-xs text-muted-foreground uppercase">
                                    {adjunto.tipo_archivo}
                                  </p>
                                )}
                              </div>
                              <Download className="h-4 w-4 text-muted-foreground" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                      <p className="text-muted-foreground">
                        {language === 'en'
                          ? 'No documents available for this tour.'
                          : 'No hay documentos disponibles para este tour.'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Pricing and Booking */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Booking Information' : 'Información de Reserva'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pricing */}
                {tour.precios && tour.precios.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      {language === 'en' ? 'Prices' : 'Precios'}
                    </h3>
                    
                    {/* Group prices by ciudad_salida */}
                    {Object.entries(
                      tour.precios.reduce((acc: any, precio) => {
                        const key = precio.ciudad_salida;
                        if (!acc[key]) acc[key] = [];
                        acc[key].push(precio);
                        return acc;
                      }, {})
                    ).map(([ciudad, precios]: [string, any[]]) => (
                      <div key={ciudad} className="space-y-2">
                        <h4 className="font-medium text-sm flex items-center">
                          <PlaneTakeoff className="h-4 w-4 mr-2" />
                          {language === 'en' ? 'From ' : 'Desde '} 
                          {ciudad}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {precios.map((precio) => (
                            <div 
                              key={`${precio.id}-${precio.tipo_habitacion}`} 
                              className="bg-muted p-2 rounded-md"
                            >
                              <p className="font-medium">
                                {(() => {
                                  switch (precio.tipo_habitacion) {
                                    case 'doble':
                                      return language === 'en' ? 'Double Room' : 'Habitación Doble';
                                    case 'triple':
                                      return language === 'en' ? 'Triple Room' : 'Habitación Triple';
                                    case 'individual':
                                      return language === 'en' ? 'Single Room' : 'Habitación Individual';
                                    case 'child':
                                      return language === 'en' ? 'Child' : 'Niño';
                                    default:
                                      return precio.tipo_habitacion;
                                  }
                                })()}
                              </p>
                              <div className="flex justify-between items-center">
                                <span className="text-primary text-lg font-semibold">
                                  {formatPrice(precio.precio)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {precio.forma_pago === 'efectivo' 
                                    ? (language === 'en' ? 'Cash' : 'Efectivo')
                                    : (language === 'en' ? 'Card' : 'Tarjeta')}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">
                    {language === 'en' 
                      ? 'Contact us for pricing information' 
                      : 'Contáctanos para información de precios'}
                  </p>
                )}

                {/* Departure Dates */}
                {tour.salidas && tour.salidas.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      {language === 'en' ? 'Departure Dates' : 'Fechas de Salida'}
                    </h3>
                    <div className="space-y-2">
                      {tour.salidas.map((salida) => (
                        <div 
                          key={salida.id}
                          className="flex justify-between items-center bg-muted p-3 rounded-md"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-primary" />
                              <span className="font-medium">
                                {new Date(salida.fecha_salida).toLocaleDateString(
                                  language === 'en' ? 'en-US' : 'es-ES',
                                  { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  }
                                )}
                              </span>
                            </div>
                            {salida.cupos_disponibles !== undefined && (
                              <p className="text-xs text-muted-foreground">
                                {language === 'en' ? 'Available spots: ' : 'Cupos disponibles: '}
                                <span className="font-medium">{salida.cupos_disponibles}</span>
                              </p>
                            )}
                          </div>
                          <div>
                            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                              {salida.dias_duracion || tour.dias_duracion}{' '}
                              {language === 'en' 
                                ? `day${(salida.dias_duracion || tour.dias_duracion || 0) > 1 ? 's' : ''}` 
                                : `día${(salida.dias_duracion || tour.dias_duracion || 0) > 1 ? 's' : ''}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gifts/Rewards */}
                {tour.regalos && tour.regalos.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">
                      {language === 'en' ? 'Gifts Included' : 'Regalos Incluidos'}
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {tour.regalos.map((regalo) => (
                        <li key={regalo.id} className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                          <span>{regalo.nombre}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Call to Action */}
                <div className="pt-4">
                  <Button className="w-full" size="lg">
                    {language === 'en' ? 'Book Now' : 'Reservar Ahora'}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    {language === 'en' 
                      ? 'Contact us for availability and booking' 
                      : 'Contáctanos para disponibilidad y reservas'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TourDetailPage;


import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useTour } from '@/hooks/use-tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Calendar, 
  MapPinned, 
  PlaneIcon, 
  Clock, 
  Users, 
  CreditCard, 
  Check, 
  X,
  FileText,
  ChevronLeft,
  Star,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const TourDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const { tour, actividades, adjuntos, loading, error } = useTour(slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div>
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Error Loading Tour' : 'Error al Cargar el Tour'}
          </h1>
          <p className="text-red-500 mb-4">{error}</p>
          <Link to="/destinations">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Back to Destinations' : 'Volver a Destinos'}
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const formattedDestinations = tour.destinos
    ?.filter(d => d.destino)
    .map(d => d.destino?.ciudad || d.destino?.pais)
    .join(', ');
  
  const sortedImages = tour.fotos?.sort((a, b) => (a.orden || 0) - (b.orden || 0)) || [];
  const mainImage = sortedImages[currentImageIndex]?.url_imagen || 'https://placehold.co/800x400?text=No+Image';
  
  // Format dates properly
  const formatDateString = (dateString: string | null) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return format(date, language === 'en' ? 'MMMM d, yyyy' : 'd MMMM yyyy', {
        locale: language === 'es' ? es : undefined
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString;
    }
  };
  
  // Find lowest price
  const lowestPrice = tour.salidas?.reduce((lowest, salida) => {
    const salidaLowestPrice = salida.precios?.reduce((min, precio) => 
      precio.precio < min ? precio.precio : min
    , Infinity) || Infinity;
    
    return salidaLowestPrice < lowest ? salidaLowestPrice : lowest;
  }, Infinity) || 0;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/destinations" className="inline-flex items-center mb-6 text-tamec-600 hover:text-tamec-700">
          <ChevronLeft className="h-5 w-5 mr-1" />
          {language === 'en' ? 'Back to Destinations' : 'Volver a Destinos'}
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tour Images and Info - Left Column */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative rounded-lg overflow-hidden mb-4 h-96">
              <img 
                src={mainImage} 
                alt={tour.titulo} 
                className="w-full h-full object-cover"
              />
              
              {/* Featured Badge */}
              {tour.id % 3 === 0 && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    {language === 'en' ? 'Featured' : 'Destacado'}
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {sortedImages.slice(0, 5).map((image, index) => (
                <div 
                  key={image.id}
                  className={`relative rounded-md overflow-hidden cursor-pointer h-20 ${
                    index === currentImageIndex ? 'ring-2 ring-tamec-600' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={image.url_imagen} 
                    alt={image.descripcion || `Tour image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              {sortedImages.length > 5 && (
                <div className="relative rounded-md overflow-hidden cursor-pointer h-20 bg-gray-800 flex items-center justify-center text-white">
                  <span>+{sortedImages.length - 5}</span>
                </div>
              )}
            </div>
            
            {/* Tour Title and Location */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{tour.titulo}</h1>
              
              {formattedDestinations && (
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <MapPinned className="h-5 w-5 mr-2 text-tamec-600" />
                  <span>{formattedDestinations}</span>
                </div>
              )}
              
              {/* Rating (Simulated) */}
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{(4 + (tour.id % 10) / 10).toFixed(1)}</span>
                <span className="ml-1 text-gray-600 dark:text-gray-300">
                  ({Math.floor(Math.random() * 50) + 10} {language === 'en' ? 'reviews' : 'reseñas'})
                </span>
              </div>
            </div>
            
            {/* Tour Information Tabs */}
            <Tabs defaultValue="description" className="mb-6">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="description">
                  {language === 'en' ? 'Description' : 'Descripción'}
                </TabsTrigger>
                <TabsTrigger value="itinerary">
                  {language === 'en' ? 'Activities' : 'Actividades'}
                </TabsTrigger>
                <TabsTrigger value="dates">
                  {language === 'en' ? 'Dates & Prices' : 'Fechas y Precios'}
                </TabsTrigger>
                <TabsTrigger value="includes">
                  {language === 'en' ? 'Includes' : 'Incluye'}
                </TabsTrigger>
                <TabsTrigger value="terms">
                  {language === 'en' ? 'Terms' : 'Términos'}
                </TabsTrigger>
              </TabsList>
              
              {/* Description */}
              <TabsContent value="description" className="p-4">
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'en' ? 'Tour Description' : 'Descripción del Tour'}
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  {tour.descripcion ? (
                    <p>{tour.descripcion}</p>
                  ) : (
                    <p className="text-gray-500 italic">
                      {language === 'en' 
                        ? 'No description available for this tour.' 
                        : 'No hay descripción disponible para este tour.'}
                    </p>
                  )}
                </div>
                
                {/* Key Features */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3">
                    {language === 'en' ? 'Tour Features' : 'Características del Tour'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-tamec-600" />
                      <span>
                        {tour.dias_duracion} {language === 'en' ? 'days' : 'días'}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <PlaneIcon className="h-5 w-5 mr-2 text-tamec-600" />
                      <span>
                        {tour.incluye_boleto_aereo 
                          ? language === 'en' ? 'Flight included' : 'Vuelo incluido'
                          : language === 'en' ? 'Flight not included' : 'Vuelo no incluido'}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-tamec-600" />
                      <span>
                        {tour.salidas && tour.salidas.length > 0 
                          ? `${tour.salidas.length} ${language === 'en' ? 'available dates' : 'fechas disponibles'}`
                          : language === 'en' ? 'No scheduled departures' : 'Sin salidas programadas'}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-tamec-600" />
                      <span>
                        {language === 'en' ? 'Group tour' : 'Tour grupal'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Attachments */}
                {adjuntos && adjuntos.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-3">
                      {language === 'en' ? 'Documents' : 'Documentos'}
                    </h4>
                    <div className="space-y-2">
                      {adjuntos.map(adjunto => (
                        <a 
                          key={adjunto.id}
                          href={adjunto.url_archivo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <FileText className="h-5 w-5 mr-2 text-tamec-600" />
                          <span>{adjunto.descripcion || (language === 'en' ? 'Document' : 'Documento')}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              {/* Activities */}
              <TabsContent value="itinerary" className="p-4">
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'en' ? 'Tour Activities' : 'Actividades del Tour'}
                </h3>
                
                {actividades && actividades.length > 0 ? (
                  <div className="space-y-4">
                    {actividades.map((actividad, index) => (
                      <Card key={actividad.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-medium">{actividad.nombre}</h4>
                              {actividad.descripcion && (
                                <p className="text-gray-600 dark:text-gray-300 mt-1">{actividad.descripcion}</p>
                              )}
                            </div>
                            <div>
                              {actividad.incluida ? (
                                <Badge className="bg-green-600 hover:bg-green-700">
                                  {language === 'en' ? 'Included' : 'Incluido'}
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                                  {actividad.costo_adicional 
                                    ? `+$${actividad.costo_adicional}`
                                    : language === 'en' ? 'Optional' : 'Opcional'}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    {language === 'en' 
                      ? 'No activities listed for this tour.' 
                      : 'No hay actividades registradas para este tour.'}
                  </p>
                )}
              </TabsContent>
              
              {/* Dates and Prices */}
              <TabsContent value="dates" className="p-4">
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'en' ? 'Available Dates & Prices' : 'Fechas y Precios Disponibles'}
                </h3>
                
                {tour.salidas && tour.salidas.length > 0 ? (
                  <div className="space-y-4">
                    {tour.salidas.map(salida => (
                      <Card key={salida.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="mb-4 md:mb-0">
                              <div className="flex items-center mb-2">
                                <Calendar className="h-5 w-5 mr-2 text-tamec-600" />
                                <span className="font-semibold">
                                  {formatDateString(salida.fecha_salida)}
                                </span>
                              </div>
                              
                              <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <Clock className="h-5 w-5 mr-2 text-tamec-600" />
                                <span>{salida.dias_duracion} {language === 'en' ? 'days' : 'días'}</span>
                              </div>
                              
                              {salida.cupos_disponibles !== null && (
                                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                                  <Users className="h-5 w-5 mr-2 text-tamec-600" />
                                  <span>
                                    {salida.cupos_disponibles} {language === 'en' ? 'spots available' : 'cupos disponibles'}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">
                                {language === 'en' ? 'Prices' : 'Precios'}
                              </h4>
                              
                              {salida.precios && salida.precios.length > 0 ? (
                                <div className="space-y-2">
                                  {salida.precios.map(precio => (
                                    <div key={precio.id} className="flex justify-between">
                                      <span className="capitalize">
                                        {language === 'en' 
                                          ? precio.tipo_habitacion 
                                          : precio.tipo_habitacion === 'doble' ? 'Doble' 
                                            : precio.tipo_habitacion === 'triple' ? 'Triple'
                                            : precio.tipo_habitacion === 'individual' ? 'Individual'
                                            : 'Niño'}
                                        {precio.forma_pago === 'efectivo' 
                                          ? ` (${language === 'en' ? 'cash' : 'efectivo'})`
                                          : ` (${language === 'en' ? 'card' : 'tarjeta'})`}
                                      </span>
                                      <span className="font-medium">${precio.precio}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 italic">
                                  {language === 'en' 
                                    ? 'No price information' 
                                    : 'Sin información de precios'}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    {language === 'en' 
                      ? 'No scheduled departures for this tour.' 
                      : 'No hay salidas programadas para este tour.'}
                  </p>
                )}
              </TabsContent>
              
              {/* Includes */}
              <TabsContent value="includes" className="p-4">
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'en' ? 'What\'s Included' : 'Qué Incluye'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-600" />
                      {language === 'en' ? 'Included' : 'Incluido'}
                    </h4>
                    
                    <ul className="space-y-2">
                      {tour.incluye_boleto_aereo && (
                        <li className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{language === 'en' ? 'Airfare' : 'Boleto aéreo'}</span>
                        </li>
                      )}
                      
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{language === 'en' ? 'Accommodation' : 'Alojamiento'}</span>
                      </li>
                      
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{language === 'en' ? 'Guided tours' : 'Tours guiados'}</span>
                      </li>
                      
                      {actividades && actividades
                        .filter(a => a.incluida)
                        .map(actividad => (
                          <li key={actividad.id} className="flex items-start">
                            <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{actividad.nombre}</span>
                          </li>
                        ))}
                      
                      {tour.coortesias && (
                        <li className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{tour.coortesias}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <X className="h-5 w-5 mr-2 text-red-600" />
                      {language === 'en' ? 'Not Included' : 'No Incluido'}
                    </h4>
                    
                    <ul className="space-y-2">
                      {!tour.incluye_boleto_aereo && (
                        <li className="flex items-start">
                          <X className="h-5 w-5 mr-2 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>{language === 'en' ? 'Airfare' : 'Boleto aéreo'}</span>
                        </li>
                      )}
                      
                      <li className="flex items-start">
                        <X className="h-5 w-5 mr-2 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{language === 'en' ? 'Personal expenses' : 'Gastos personales'}</span>
                      </li>
                      
                      <li className="flex items-start">
                        <X className="h-5 w-5 mr-2 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{language === 'en' ? 'Travel insurance' : 'Seguro de viaje'}</span>
                      </li>
                      
                      {actividades && actividades
                        .filter(a => !a.incluida)
                        .map(actividad => (
                          <li key={actividad.id} className="flex items-start">
                            <X className="h-5 w-5 mr-2 text-red-600 flex-shrink-0 mt-0.5" />
                            <span>
                              {actividad.nombre}
                              {actividad.costo_adicional ? ` (+$${actividad.costo_adicional})` : ''}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Terms */}
              <TabsContent value="terms" className="p-4">
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'en' ? 'Terms & Conditions' : 'Términos y Condiciones'}
                </h3>
                
                {tour.terminos_condiciones ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{tour.terminos_condiciones}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    {language === 'en' 
                      ? 'No terms and conditions specified for this tour.' 
                      : 'No se han especificado términos y condiciones para este tour.'}
                  </p>
                )}
                
                {tour.politicas_cancelacion && (
                  <>
                    <h4 className="text-lg font-semibold mt-6 mb-3">
                      {language === 'en' ? 'Cancellation Policy' : 'Política de Cancelación'}
                    </h4>
                    <div className="prose dark:prose-invert max-w-none">
                      <p>{tour.politicas_cancelacion}</p>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Booking Panel - Right Column */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <DollarSign className="h-6 w-6 text-tamec-600" />
                    <span className="text-2xl font-bold">${lowestPrice}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    {language === 'en' ? 'per person' : 'por persona'}
                  </span>
                </div>
                
                <Separator className="mb-4" />
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-tamec-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">
                        {language === 'en' ? 'Duration' : 'Duración'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {tour.dias_duracion} {language === 'en' ? 'days' : 'días'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <PlaneIcon className="h-5 w-5 mr-2 text-tamec-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">
                        {language === 'en' ? 'Flight' : 'Vuelo'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {tour.incluye_boleto_aereo 
                          ? language === 'en' ? 'Included' : 'Incluido'
                          : language === 'en' ? 'Not included' : 'No incluido'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-tamec-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">
                        {language === 'en' ? 'Payment' : 'Pago'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {language === 'en' 
                          ? 'Cash or credit card' 
                          : 'Efectivo o tarjeta'}
                      </p>
                    </div>
                  </div>
                  
                  {tour.salidas && tour.salidas.length > 0 && tour.salidas[0].fecha_salida && (
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-tamec-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">
                          {language === 'en' ? 'Next Departure' : 'Próxima Salida'}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {formatDateString(tour.salidas[0].fecha_salida)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <Button className="w-full mb-3">
                  {language === 'en' ? 'Book Now' : 'Reservar Ahora'}
                </Button>
                
                <Button variant="outline" className="w-full">
                  {language === 'en' ? 'Request Information' : 'Solicitar Información'}
                </Button>
                
                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' 
                    ? 'Reserve with just $100 and pay up to 30 days before the trip.' 
                    : 'Reserva con solo $100 y paga hasta 30 días antes del viaje.'}
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


import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useParams } from 'react-router-dom';
import { useTour } from '../hooks/use-tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TourDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour, loading, error } = useTour(slug || '');
  const { language } = useLanguage();
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Default placeholder for images
  const defaultPlaceholder = 'https://placehold.co/600x400?text=Beautiful+Destination';
  
  const handleImageError = (index: number) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }));
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
          
          <h1 className="text-3xl font-bold mb-4">{tour.titulo}</h1>
          
          {tour.descripcion && (
            <div className="prose dark:prose-invert mb-6 max-w-none">
              <p>{tour.descripcion}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {tourImages.length > 0 && (
                <img 
                  src={tourImages[0]} 
                  alt={tour.titulo || 'Tour destination'} 
                  onError={() => handleImageError(0)}
                  className="w-full h-80 object-cover rounded-lg mb-6" 
                  loading="lazy"
                />
              )}
              
              <h2 className="text-xl font-semibold mb-2">
                {language === 'en' ? 'Destinations' : 'Destinos'}
              </h2>
              {tour.destinos && tour.destinos.length > 0 ? (
                <ul className="space-y-2">
                  {tour.destinos.map(destino => (
                    <li key={destino.id} className="flex items-center">
                      <span className="w-2 h-2 bg-tamec-600 rounded-full mr-2"></span>
                      {destino.destino?.pais} {destino.destino?.ciudad ? `- ${destino.destino.ciudad}` : ''}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{language === 'en' ? 'No destinations specified.' : 'No se especificaron destinos.'}</p>
              )}
              
              {tourImages.length > 1 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Gallery' : 'Galería'}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {tourImages.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${tour.titulo} - ${index + 1}`}
                        onError={() => handleImageError(index + 1)}
                        className="w-full h-40 object-cover rounded-md"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  {language === 'en' ? 'Tour Details' : 'Detalles del Tour'}
                </h3>
                
                {tour.dias_duracion && (
                  <div className="mb-3">
                    <strong className="text-gray-700 dark:text-gray-300">
                      {language === 'en' ? 'Duration:' : 'Duración:'}
                    </strong> 
                    <span className="ml-2">{tour.dias_duracion} {language === 'en' ? 'days' : 'días'}</span>
                  </div>
                )}
                
                {tour.precio_desde && (
                  <div className="mb-3">
                    <strong className="text-gray-700 dark:text-gray-300">
                      {language === 'en' ? 'Price from:' : 'Precio desde:'}
                    </strong> 
                    <span className="ml-2 text-lg font-semibold text-tamec-600">${tour.precio_desde.toLocaleString()}</span>
                  </div>
                )}
                
                {tour.salidas && tour.salidas.length > 0 && (
                  <div className="mb-3">
                    <strong className="text-gray-700 dark:text-gray-300">
                      {language === 'en' ? 'Next Departures:' : 'Próximas Salidas:'}
                    </strong>
                    <ul className="mt-2 space-y-1">
                      {tour.salidas
                        .filter(s => s.fecha_salida && new Date(s.fecha_salida) > new Date())
                        .sort((a, b) => new Date(a.fecha_salida!).getTime() - new Date(b.fecha_salida!).getTime())
                        .slice(0, 3)
                        .map((salida, index) => (
                          <li key={index} className="text-sm">
                            {new Date(salida.fecha_salida!).toLocaleDateString()} 
                            {salida.cupos_disponibles && (
                              <span className={salida.cupos_disponibles < 5 ? "text-red-500 ml-1" : "text-gray-500 ml-1"}>
                                ({salida.cupos_disponibles} {language === 'en' ? 'spots' : 'cupos'})
                              </span>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                
                <Button className="w-full mt-4 bg-tamec-600 hover:bg-tamec-700">
                  {language === 'en' ? 'Book Now' : 'Reservar Ahora'}
                </Button>
              </div>
              
              {/* Included services */}
              {(tour.componentes || tour.incluye_vuelo || tour.incluye_transporte || 
                tour.incluye_hospedaje || tour.incluye_comida || tour.incluye_actividades) && (
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-sm mt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {language === 'en' ? 'What\'s Included' : 'Qué Incluye'}
                  </h3>
                  <ul className="space-y-2">
                    {(tour.incluye_vuelo || tour.componentes?.incluye_vuelo) && (
                      <li className="flex items-center">
                        <Plane className="text-tamec-600 mr-2 h-5 w-5" />
                        <span>{language === 'en' ? 'Flight' : 'Vuelo'}</span>
                      </li>
                    )}
                    {(tour.incluye_transporte || tour.componentes?.incluye_transporte) && (
                      <li className="flex items-center">
                        <Bus className="text-tamec-600 mr-2 h-5 w-5" />
                        <span>{language === 'en' ? 'Transportation' : 'Transporte'}</span>
                      </li>
                    )}
                    {(tour.incluye_hospedaje || tour.componentes?.incluye_hotel) && (
                      <li className="flex items-center">
                        <Bed className="text-tamec-600 mr-2 h-5 w-5" />
                        <span>{language === 'en' ? 'Accommodation' : 'Hospedaje'}</span>
                      </li>
                    )}
                    {(tour.incluye_comida || tour.componentes?.incluye_comida) && (
                      <li className="flex items-center">
                        <Utensils className="text-tamec-600 mr-2 h-5 w-5" />
                        <span>{language === 'en' ? 'Meals' : 'Comidas'}</span>
                      </li>
                    )}
                    {(tour.incluye_actividades || tour.componentes?.incluye_actividades) && (
                      <li className="flex items-center">
                        <Camera className="text-tamec-600 mr-2 h-5 w-5" />
                        <span>{language === 'en' ? 'Activities' : 'Actividades'}</span>
                      </li>
                    )}
                  </ul>
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

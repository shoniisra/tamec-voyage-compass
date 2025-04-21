// File moved from src/pages/TourDetailPage.tsx
// Imports rewritten to use the module paths
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useParams } from 'react-router-dom';
import { useTour } from '../hooks/use-tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';

const TourDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { tour, loading, error } = useTour(slug || '');
  const { language } = useLanguage();
  
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
  
  const tourImages = tour?.fotos && tour.fotos.length > 0
    ? tour.fotos.map(foto => foto.url_imagen)
    : ['https://placehold.co/600x400?text=No+Image'];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{tour.titulo}</h1>
          
          {tour.descripcion && (
            <div className="prose mb-6">
              <p>{tour.descripcion}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {tourImages.length > 0 && (
                <img 
                  src={tourImages[0]} 
                  alt={tour.titulo} 
                  className="w-full h-80 object-cover rounded-lg mb-6" 
                />
              )}
              
              <h2 className="text-xl font-semibold mb-2">
                {language === 'en' ? 'Destinations' : 'Destinos'}
              </h2>
              {tour.destinos && tour.destinos.length > 0 ? (
                <ul>
                  {tour.destinos.map(destino => (
                    <li key={destino.id}>
                      {destino.destino?.pais} - {destino.destino?.ciudad}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{language === 'en' ? 'No destinations specified.' : 'No se especificaron destinos.'}</p>
              )}
            </div>
            
            <div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'en' ? 'Details' : 'Detalles'}
                </h3>
                <p>
                  <strong>{language === 'en' ? 'Duration:' : 'Duración:'}</strong> {tour.dias_duracion} {language === 'en' ? 'days' : 'días'}
                </p>
                {tour.precio_desde && (
                  <p>
                    <strong>{language === 'en' ? 'Price from:' : 'Precio desde:'}</strong> ${tour.precio_desde}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TourDetailPage;

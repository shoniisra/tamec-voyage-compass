
import React from 'react';
import { Link } from 'react-router-dom';
import { Tour } from '@/types/tour';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPinned, PlaneIcon, Star, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const { language } = useLanguage();
  
  // Format destinations
  const destinationText = tour.destinos
    ?.filter(d => d.destino)
    .map(d => d.destino?.ciudad || d.destino?.pais)
    .join(', ');

  // Get the first image
  const featuredImage = tour.fotos?.sort((a, b) => 
    (a.orden || 0) - (b.orden || 0)
  )[0]?.url_imagen || 'https://placehold.co/600x400?text=No+Image';

  // Get the next available departure date
  const nextDeparture = tour.salidas
    ?.filter(s => s.fecha_salida && new Date(s.fecha_salida) > new Date())
    .sort((a, b) => 
      new Date(a.fecha_salida!).getTime() - new Date(b.fecha_salida!).getTime()
    )[0];
    
  const formatDateString = (dateString: string | null) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return format(date, language === 'en' ? 'MMM d, yyyy' : 'd MMM yyyy', {
        locale: language === 'es' ? es : undefined
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString;
    }
  };
  
  return (
    <Link to={`/destinations/${tour.slug}`} className="block h-full">
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative">
          {/* Featured Image */}
          <div className="relative h-60 overflow-hidden">
            <img 
              src={featuredImage} 
              alt={tour.titulo} 
              className="w-full h-full object-cover"
            />
            
            {/* Price Badge */}
            {tour.precio_desde && (
              <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-sm font-medium text-gray-800 shadow-sm">
                ${tour.precio_desde}
              </div>
            )}
            
            {/* Featured Badge */}
            {tour.id % 3 === 0 && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                  {language === 'en' ? 'Featured' : 'Destacado'}
                </Badge>
              </div>
            )}
          </div>
          
          <CardContent className="p-4">
            {/* Tour Title */}
            <h3 className="text-lg font-semibold line-clamp-1 mb-1">{tour.titulo}</h3>
            
            {/* Destination */}
            {destinationText && (
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPinned className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{destinationText}</span>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-2 mt-3">
              {/* Duration */}
              {tour.dias_duracion && (
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1 flex-shrink-0 text-tamec-600" />
                  <span>{tour.dias_duracion} {language === 'en' ? 'days' : 'días'}</span>
                </div>
              )}
              
              {/* Flight Included */}
              {tour.incluye_boleto_aereo && (
                <div className="flex items-center text-sm text-gray-600">
                  <PlaneIcon className="h-4 w-4 mr-1 flex-shrink-0 text-tamec-600" />
                  <span>{language === 'en' ? 'Flight included' : 'Vuelo incluido'}</span>
                </div>
              )}
              
              {/* Next Departure */}
              {nextDeparture?.fecha_salida && (
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1 flex-shrink-0 text-tamec-600" />
                  <span className="line-clamp-1">{formatDateString(nextDeparture.fecha_salida)}</span>
                </div>
              )}
              
              {/* Available spots */}
              {nextDeparture?.cupos_disponibles && (
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1 flex-shrink-0 text-tamec-600" />
                  <span>{nextDeparture.cupos_disponibles} {language === 'en' ? 'spots' : 'cupos'}</span>
                </div>
              )}
            </div>
            
            {/* Rating (Simulated) */}
            <div className="flex items-center mt-3">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium ml-1">{(4 + (tour.id % 10) / 10).toFixed(1)}</span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default TourCard;

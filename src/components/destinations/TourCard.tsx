
import React from 'react';
import { Link } from 'react-router-dom';
import { Tour } from '@/types/tour';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPinned, Star, Users, Sparkles, Plane, Bus, Bed, Utensils, Camera, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const { language } = useLanguage();
  
  const destinationText = tour.destinos
    ?.filter(d => d.destino)
    .map(d => d.destino?.ciudad || d.destino?.pais)
    .join(', ');

  const featuredImage = tour.fotos?.sort((a, b) => 
    (a.orden || 0) - (b.orden || 0)
  )[0]?.url_imagen || 'https://placehold.co/600x400?text=No+Image';

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

  const isServiceIncluded = (serviceType: 'vuelo' | 'transporte' | 'hospedaje' | 'comida' | 'actividades'): boolean => {
    switch (serviceType) {
      case 'vuelo':
        return !!tour.incluye_vuelo;
      case 'transporte':
        return !!tour.incluye_transporte;
      case 'hospedaje':
        return !!tour.incluye_hospedaje;
      case 'comida':
        return !!tour.incluye_comida;
      case 'actividades':
        return !!tour.incluye_actividades;
      default:
        return false;
    }
  };
  
  const getIconColor = (serviceType: 'vuelo' | 'transporte' | 'hospedaje' | 'comida' | 'actividades') => 
    isServiceIncluded(serviceType) ? "text-yellow-500 fill-yellow-500" : "text-gray-300";
  
  return (
    <Link to={`/destinations/${tour.slug}`} className="block h-full">
      <Card className="group overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl bg-white dark:bg-gray-800">
        <div className="relative">
          <div className="relative h-64 overflow-hidden rounded-t-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 z-10" />
            <img 
              src={featuredImage} 
              alt={tour.titulo}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-white/95 hover:bg-white text-gray-900 px-3 py-1.5 text-sm font-semibold shadow-lg backdrop-blur-sm">
                ${tour.precio_desde?.toLocaleString()}
              </Badge>
            </div>
            
            {tour.id % 3 === 0 && (
              <div className="absolute top-4 left-4 z-20">
                <Badge className="bg-yellow-500/95 hover:bg-yellow-500 text-yellow-950 px-3 py-1.5 font-semibold shadow-lg backdrop-blur-sm flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  {language === 'en' ? 'Featured' : 'Destacado'}
                </Badge>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                {tour.titulo}
              </h3>
              {destinationText && (
                <div className="flex items-center text-white/90 text-sm">
                  <MapPinned className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">{destinationText}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center px-2">
              <div className="tooltip" data-tip={language === 'en' ? 'Flight included' : 'Vuelo incluido'}>
                <Plane className={`h-5 w-5 ${getIconColor('vuelo')}`} />
              </div>
              <div className="tooltip" data-tip={language === 'en' ? 'Transportation' : 'Transporte'}>
                <Bus className={`h-5 w-5 ${getIconColor('transporte')}`} />
              </div>
              <div className="tooltip" data-tip={language === 'en' ? 'Accommodation' : 'Hospedaje'}>
                <Bed className={`h-5 w-5 ${getIconColor('hospedaje')}`} />
              </div>
              <div className="tooltip" data-tip={language === 'en' ? 'Meals included' : 'Comidas incluidas'}>
                <Utensils className={`h-5 w-5 ${getIconColor('comida')}`} />
              </div>
              <div className="tooltip" data-tip={language === 'en' ? 'Activities included' : 'Actividades incluidas'}>
                <Camera className={`h-5 w-5 ${getIconColor('actividades')}`} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {tour.dias_duracion && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2 text-tamec-600" />
                  <span>{tour.dias_duracion} {language === 'en' ? 'days' : 'días'}</span>
                </div>
              )}
              
              {nextDeparture?.fecha_salida && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2 text-tamec-600" />
                  <span className="line-clamp-1">{formatDateString(nextDeparture.fecha_salida)}</span>
                </div>
              )}
              
              {nextDeparture?.cupos_disponibles && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-2 text-tamec-600" />
                  <span>
                    {nextDeparture.cupos_disponibles < 5 ? (
                      <span className="text-red-500 font-medium">
                        {language === 'en' 
                          ? `Only ${nextDeparture.cupos_disponibles} spots left!`
                          : `¡Solo ${nextDeparture.cupos_disponibles} cupos!`}
                      </span>
                    ) : (
                      `${nextDeparture.cupos_disponibles} ${language === 'en' ? 'spots' : 'cupos'}`
                    )}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`h-4 w-4 ${star <= (4 + (tour.id % 10) / 10) 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium ml-2 text-gray-600 dark:text-gray-400">
                {(4 + (tour.id % 10) / 10).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default TourCard;


import React from 'react';
import { Tour } from '@/modules/tours/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface TourStructuredDataProps {
  tour: Tour;
  canonicalUrl: string;
}

const TourStructuredData: React.FC<TourStructuredDataProps> = ({ tour, canonicalUrl }) => {
  const { language } = useLanguage();
  
  // Create structured data for the tour
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour.titulo,
    "description": tour.descripcion,
    "url": canonicalUrl,
    ...(tour.fotos && tour.fotos[0] && {
      "image": tour.fotos[0].url_imagen
    }),
    "touristType": ["Adventure Travel", "Cultural Tourism"],
    ...(tour.dias_duracion && {
      "itinerary": {
        "@type": "ItemList",
        "numberOfItems": tour.dias_duracion,
        "itemListOrder": "Ascending"
      }
    }),
    ...(tour.precio_desde && {
      "offers": {
        "@type": "Offer",
        "price": tour.precio_desde,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString().split('T')[0]
      }
    }),
    ...(tour.destinos && tour.destinos.length > 0 && {
      "location": tour.destinos.map(destino => ({
        "@type": "Place",
        "name": destino.destino?.ciudad || destino.destino?.pais
      }))
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
};

export default TourStructuredData;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Tour } from '@/modules/tours/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface TourHeadProps {
  tour: Tour;
  canonicalUrl: string;
}

const TourHead: React.FC<TourHeadProps> = ({ tour, canonicalUrl }) => {
  const { language } = useLanguage();
  
  // Create description from tour details, limiting to around 160 characters
  const description = tour.descripcion 
    ? (tour.descripcion?.length > 160 
        ? `${tour.descripcion?.substring(0, 157)}...` 
        : tour.descripcion)
    : (language === 'en' 
        ? `Explore ${tour.titulo} with TAMEC Travels. All-inclusive packages, certified guides, and unforgettable experiences.`
        : `Explora ${tour.titulo} con TAMEC Viajes. Paquetes todo incluido, guías certificados y experiencias inolvidables.`);
  
  // Calculate price display
  const priceDisplay = tour.precio_desde 
    ? `${tour.precio_desde.toLocaleString()} USD` 
    : (language === 'en' ? 'Contact for pricing' : 'Consultar precio');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{`${tour.titulo} | TAMEC ${language === 'en' ? 'Travels' : 'Viajes'}`}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={`${tour.titulo} | TAMEC ${language === 'en' ? 'Travels' : 'Viajes'}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      {tour.fotos && tour.fotos[0] && (
        <meta property="og:image" content={tour.fotos[0].url_imagen} />
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${tour.titulo} | TAMEC ${language === 'en' ? 'Travels' : 'Viajes'}`} />
      <meta name="twitter:description" content={description} />
      {tour.fotos && tour.fotos[0] && (
        <meta name="twitter:image" content={tour.fotos[0].url_imagen} />
      )}
      
      {/* Additional SEO Tags */}
      <meta name="keywords" content={`${tour.titulo}, ${tour.destinos?.map(d => d.destino?.pais).join(', ')}, travel, tours, TAMEC`} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default TourHead;

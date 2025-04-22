
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const GalapagosGallery = () => {
  const { language } = useLanguage();

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1590433332518-a711d5df0daa?auto=format&fit=crop&w=600&h=400&q=80',
      alt: language === 'en' ? 'Snorkeling with sea lions' : 'Buceo con lobos marinos'
    },
    {
      url: 'https://images.unsplash.com/photo-1585089858717-f741d224d6b8?auto=format&fit=crop&w=600&h=400&q=80',
      alt: language === 'en' ? 'Galapagos giant tortoise' : 'Tortuga gigante de Galápagos'
    },
    {
      url: 'https://images.unsplash.com/photo-1618255697752-48769f0992ae?auto=format&fit=crop&w=600&h=400&q=80',
      alt: language === 'en' ? 'Luxury cruise ship' : 'Crucero de lujo'
    },
    {
      url: 'https://images.unsplash.com/photo-1600978112370-56d6e601ca3e?auto=format&fit=crop&w=600&h=400&q=80',
      alt: language === 'en' ? 'Blue-footed booby' : 'Pájaro bobo de patas azules'
    },
    {
      url: 'https://images.unsplash.com/photo-1550950005-75cf0a97b15f?auto=format&fit=crop&w=600&h=400&q=80',
      alt: language === 'en' ? 'Pristine beach' : 'Playa prístina'
    },
    {
      url: 'https://images.unsplash.com/photo-1580745289852-e44141a9e28d?auto=format&fit=crop&w=600&h=400&q=80',
      alt: language === 'en' ? 'Happy travelers' : 'Viajeros felices'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'en' ? 'Galapagos Gallery' : 'Galería de Galápagos'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative h-64 overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
            >
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalapagosGallery;

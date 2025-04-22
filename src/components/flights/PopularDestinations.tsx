
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PopularDestinations = () => {
  const { language } = useLanguage();

  const destinations = [
    {
      name: language === 'en' ? 'New York' : 'Nueva York',
      image: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=600&q=80',
      country: language === 'en' ? 'United States' : 'Estados Unidos'
    },
    {
      name: language === 'en' ? 'Paris' : 'París',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
      country: language === 'en' ? 'France' : 'Francia'
    },
    {
      name: language === 'en' ? 'Tokyo' : 'Tokio',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
      country: language === 'en' ? 'Japan' : 'Japón'
    },
    {
      name: language === 'en' ? 'Rome' : 'Roma',
      image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=600&q=80',
      country: language === 'en' ? 'Italy' : 'Italia'
    },
    {
      name: 'Cancún',
      image: 'https://images.unsplash.com/photo-1580094333632-438bdc04f79f?auto=format&fit=crop&w=600&q=80',
      country: language === 'en' ? 'Mexico' : 'México'
    },
    {
      name: language === 'en' ? 'Sydney' : 'Sídney',
      image: 'https://images.unsplash.com/photo-1524820197278-540916411e20?auto=format&fit=crop&w=600&q=80',
      country: language === 'en' ? 'Australia' : 'Australia'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Popular Destinations' : 'Destinos Populares'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Explore some of our most popular destinations. We can help you find the perfect flight to any of these cities and many more.'
              : 'Explora algunos de nuestros destinos más populares. Podemos ayudarte a encontrar el vuelo perfecto a cualquiera de estas ciudades y muchas más.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div 
              key={index}
              className="relative h-72 rounded-lg overflow-hidden group cursor-pointer"
            >
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{destination.name}</h3>
                <p>{destination.country}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg">
            {language === 'en'
              ? 'Ready to explore these destinations and more?'
              : '¿Listo para explorar estos destinos y más?'}
          </p>
          <p className="font-medium text-tamec-600">
            {language === 'en'
              ? 'Contact us today to find your perfect flight!'
              : '¡Contáctanos hoy para encontrar tu vuelo perfecto!'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;


import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Plane } from 'lucide-react';

const DestinationCoverage = () => {
  const { language } = useLanguage();

  const regions = [
    {
      id: 1,
      icon: <Plane className="h-8 w-8 text-tamec-600" />,
      title: language === 'en' ? 'Domestic Flights' : 'Vuelos nacionales',
      description: language === 'en'
        ? 'Fly to any city within your country with convenience and competitive rates.'
        : 'Vuela a cualquier ciudad dentro de tu país con comodidad y tarifas competitivas.'
    },
    {
      id: 2,
      icon: <Globe className="h-8 w-8 text-tamec-600" />,
      title: language === 'en' ? 'The Americas' : 'América',
      description: language === 'en'
        ? 'Explore North, Central, and South America with our wide range of flight options.'
        : 'Explora América del Norte, Central y del Sur con nuestra amplia gama de opciones de vuelo.'
    },
    {
      id: 3,
      icon: <Globe className="h-8 w-8 text-tamec-600" />,
      title: language === 'en' ? 'Europe' : 'Europa',
      description: language === 'en'
        ? 'Discover European capitals and hidden gems with our carefully selected flights.'
        : 'Descubre capitales europeas y joyas escondidas con nuestros vuelos cuidadosamente seleccionados.'
    },
    {
      id: 4,
      icon: <Globe className="h-8 w-8 text-tamec-600" />,
      title: language === 'en' ? 'Asia & Oceania' : 'Asia y Oceanía',
      description: language === 'en'
        ? 'Journey to the far corners of the world with our extensive international network.'
        : 'Viaja a los rincones más lejanos del mundo con nuestra extensa red internacional.'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Destination Coverage' : 'Cobertura de destinos'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Our global network allows you to fly anywhere in the world with ease and confidence.'
              : 'Nuestra red global te permite volar a cualquier parte del mundo con facilidad y confianza.'}
          </p>
        </div>

        <div className="relative">
          {/* World Map Background */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5 z-0">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png" 
              alt="World Map"
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regions.map((region) => (
              <div key={region.id} className="bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  {region.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{region.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {region.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="font-medium">
            {language === 'en'
              ? '190+ countries accessible through our service'
              : '190+ países accesibles a través de nuestro servicio'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DestinationCoverage;

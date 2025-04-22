
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';

const AirlineLogos = () => {
  const { language } = useLanguage();
  
  const airlines = [
    { name: 'LATAM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/LATAM_Airlines_Logo_2.svg/1200px-LATAM_Airlines_Logo_2.svg.png' },
    { name: 'Avianca', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Avianca_logo.svg/1200px-Avianca_logo.svg.png' },
    { name: 'Copa Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Copa_Airlines_logo.svg/1200px-Copa_Airlines_logo.svg.png' },
    { name: 'American Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/American_Airlines_logo_2013.svg/1200px-American_Airlines_logo_2013.svg.png' },
    { name: 'Delta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/1200px-Delta_logo.svg.png' },
    { name: 'Iberia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Iberia_Logo.svg/1200px-Iberia_Logo.svg.png' },
    { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png' },
    { name: 'Air France', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Air_France_Logo.svg/1200px-Air_France_Logo.svg.png' },
    { name: 'Turkish Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Turkish_Airlines_logo_2019_compact.svg/1200px-Turkish_Airlines_logo_2019_compact.svg.png' },
    { name: 'KLM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/KLM_logo.svg/1200px-KLM_logo.svg.png' },
    { name: 'Aeroméxico', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Aerom%C3%A9xico_logo_2016.svg/1200px-Aerom%C3%A9xico_logo_2016.svg.png' },
    { name: 'Lufthansa', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Lufthansa_Logo_2018.svg/1200px-Lufthansa_Logo_2018.svg.png' },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-8">
          {language === 'en' ? 'We Work With All Major Airlines' : 'Trabajamos Con Todas Las Principales Aerolíneas'}
        </h2>
        
        <div className="flex overflow-x-auto pb-4 scrollbar-none gap-8 justify-start">
          <div className="flex min-w-max animate-slide">
            {airlines.map((airline, index) => (
              <div key={index} className="flex items-center justify-center mx-6 grayscale hover:grayscale-0 transition-all">
                <img 
                  src={airline.logo} 
                  alt={airline.name} 
                  className="h-12 object-contain" 
                  title={airline.name}
                />
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
          {language === 'en' 
            ? 'And many more...' 
            : 'Y muchas más...'}
        </p>
      </div>
    </section>
  );
};

export default AirlineLogos;

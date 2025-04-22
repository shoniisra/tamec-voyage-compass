
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Clock, Shield, Check } from 'lucide-react';

const WhyBookWithUs = () => {
  const { language } = useLanguage();

  const reasons = [
    {
      id: 1,
      icon: <Users className="h-10 w-10 text-tamec-600 mb-4" />,
      title: language === 'en' ? 'Human and Personal Support' : 'Atención humana y cercana',
      description: language === 'en'
        ? 'Tired of dealing with bots and automated systems? Our team provides personalized assistance every step of the way.'
        : '¿Cansado de tratar con bots y sistemas automatizados? Nuestro equipo te brinda asistencia personalizada en cada paso.'
    },
    {
      id: 2,
      icon: <Clock className="h-10 w-10 text-tamec-600 mb-4" />,
      title: language === 'en' ? 'Avoid Complications' : 'Evita complicaciones',
      description: language === 'en'
        ? 'We handle complex itineraries, transit visas, and special requirements so you don't have to worry about them.'
        : 'Nos encargamos de itinerarios complejos, visados de tránsito y requisitos especiales para que no tengas que preocuparte.'
    },
    {
      id: 3,
      icon: <Shield className="h-10 w-10 text-tamec-600 mb-4" />,
      title: language === 'en' ? 'Support Throughout the Process' : 'Acompañamiento durante todo el proceso',
      description: language === 'en'
        ? 'From the moment you contact us until you return home, we're just a message away if you need any assistance.'
        : 'Desde el momento en que nos contactas hasta que regresas a casa, estamos a solo un mensaje si necesitas ayuda.'
    },
    {
      id: 4,
      icon: <Check className="h-10 w-10 text-tamec-600 mb-4" />,
      title: language === 'en' ? 'No Surprises at the Airport' : 'Sin sorpresas al llegar al aeropuerto',
      description: language === 'en'
        ? 'We ensure all details are covered, from baggage policies to check-in requirements and travel documents.'
        : 'Nos aseguramos de que todos los detalles estén cubiertos, desde políticas de equipaje hasta requisitos de check-in y documentos de viaje.'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Why Book With Us?' : '¿Por qué reservar con nosotros?'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Beyond just finding flights, we provide a complete booking experience with real human support.'
              : 'Más allá de solo encontrar vuelos, ofrecemos una experiencia de reserva completa con apoyo humano real.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div key={reason.id} className="flex flex-col items-center text-center">
              {reason.icon}
              <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-tamec-50 dark:bg-tamec-900/30 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=400&q=80" 
                alt="Happy Traveler" 
                className="rounded-full w-24 h-24 object-cover"
              />
            </div>
            <div className="md:w-3/4 md:pl-6">
              <p className="text-gray-700 dark:text-gray-200 italic text-lg">
                {language === 'en'
                  ? '"I was trying to book a complicated multi-city trip with long layovers and was getting frustrated with online booking sites. Your team made it so easy, found me great options, and took care of everything. I'll never go back to booking flights myself!"'
                  : '"Estaba tratando de reservar un viaje complicado con múltiples ciudades y largas escalas, y me estaba frustrando con los sitios de reserva en línea. Su equipo lo hizo muy fácil, me encontró excelentes opciones y se encargó de todo. ¡Nunca volveré a reservar vuelos por mi cuenta!"'}
              </p>
              <p className="mt-4 font-semibold">
                {language === 'en' ? '- Maria G., Business Traveler' : '- María G., Viajera de negocios'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBookWithUs;

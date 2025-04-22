
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check } from 'lucide-react';

const ServiceIncludes = () => {
  const { language } = useLanguage();

  const serviceItems = [
    {
      id: 1,
      title: language === 'en' ? 'Search and booking of the best flight for you' : 'Búsqueda y reserva del mejor vuelo para ti',
      description: language === 'en'
        ? 'We analyze multiple options to find the flight that best suits your needs and budget.'
        : 'Analizamos múltiples opciones para encontrar el vuelo que mejor se adapte a tus necesidades y presupuesto.'
    },
    {
      id: 2,
      title: language === 'en' ? 'Personalized advice throughout the process' : 'Asesoría personalizada en todo el proceso',
      description: language === 'en'
        ? 'Our experts guide you from the initial query to your return trip.'
        : 'Nuestros expertos te guían desde la consulta inicial hasta tu viaje de regreso.'
    },
    {
      id: 3,
      title: language === 'en' ? 'Online check-in (avoid lines!)' : 'Check-in online (¡evita filas!)',
      description: language === 'en'
        ? 'We take care of your check-in and send your boarding pass directly to your email or WhatsApp.'
        : 'Nos encargamos de tu check-in y te enviamos tu pase de abordar directamente a tu correo o WhatsApp.'
    },
    {
      id: 4,
      title: language === 'en' ? 'Rates with all taxes and airport fees included' : 'Tarifas con todos los impuestos y tasas aeroportuarias incluidas',
      description: language === 'en'
        ? 'What you see is what you pay. No hidden charges or surprises at the airport.'
        : 'Lo que ves es lo que pagas. Sin cargos ocultos ni sorpresas en el aeropuerto.'
    },
    {
      id: 5,
      title: language === 'en' ? 'Help in special situations' : 'Ayuda en situaciones especiales',
      description: language === 'en'
        ? 'Long layovers, transit visas, additional baggage, and other special requirements.'
        : 'Escalas largas, visados de tránsito, equipaje adicional y otros requisitos especiales.'
    },
    {
      id: 6,
      title: language === 'en' ? 'Coverage with all airlines worldwide' : 'Cobertura con todas las aerolíneas del mundo',
      description: language === 'en'
        ? 'Access to all major airlines and alternative options.'
        : 'Acceso a todas las principales aerolíneas y opciones alternativas.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'What Does Our Service Include?' : '¿Qué incluye nuestro servicio?'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en'
              ? 'We offer a comprehensive flight booking experience to ensure your journey starts right.'
              : 'Ofrecemos una experiencia completa de reserva de vuelos para asegurar que tu viaje comience bien.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceItems.map((item) => (
            <div key={item.id} className="flex">
              <div className="mr-4 mt-1">
                <span className="flex items-center justify-center bg-tamec-600 rounded-full p-2">
                  <Check className="h-5 w-5 text-white" />
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceIncludes;

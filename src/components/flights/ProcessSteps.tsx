
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProcessSteps = () => {
  const { language } = useLanguage();

  const steps = [
    {
      id: 1,
      number: '01',
      title: language === 'en' ? 'Contact Us' : 'Nos contactas',
      description: language === 'en'
        ? 'Tell us your destination, tentative dates, and preferences (schedules, layovers, airline, etc.).'
        : 'Cuéntanos tu destino, fechas tentativas y preferencias (horarios, escalas, aerolínea, etc).'
    },
    {
      id: 2,
      number: '02',
      title: language === 'en' ? 'We Send You the Best Options' : 'Te enviamos las mejores opciones',
      description: language === 'en'
        ? 'We search for the most convenient fares and present the best alternatives, always with final prices, no surprises.'
        : 'Buscamos las tarifas más convenientes y te presentamos las mejores alternativas, siempre con precios finales, sin sorpresas.'
    },
    {
      id: 3,
      number: '03',
      title: language === 'en' ? 'We Make the Reservation for You' : 'Realizamos la reserva por ti',
      description: language === 'en'
        ? 'We take care of everything: reservations, online check-in, and explain important details like layovers, transit visas, baggage, etc.'
        : 'Nos encargamos de todo: reservas, check-in online, y te explicamos los detalles importantes como escalas, visado de tránsito, equipaje, etc.'
    },
    {
      id: 4,
      number: '04',
      title: language === 'en' ? 'We Send Your Boarding Pass' : 'Te enviamos tu pase de abordar',
      description: language === 'en'
        ? 'You\'ll receive your complete itinerary and boarding pass via email or WhatsApp. Ready to fly without stress!'
        : 'Recibirás tu itinerario completo y tu pase de abordar en tu correo o WhatsApp. ¡Listo para volar sin estrés!'
    },
    {
      id: 5,
      number: '05',
      title: language === 'en' ? 'Support Until Your Trip' : 'Acompañamiento hasta tu viaje',
      description: language === 'en'
        ? 'Questions before the flight? Something changed? We\'re here to help you at all times.'
        : '¿Dudas antes del vuelo? ¿Algo cambió? Estamos para ayudarte en todo momento.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'How Our Process Works' : '¿Cómo funciona nuestro proceso?'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Traveling has never been easier. This is how we work with you:'
              : 'Viajar nunca fue tan fácil. Así trabajamos contigo:'}
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-tamec-600/30 -translate-x-1/2"></div>
          
          {steps.map((step, index) => (
            <div key={step.id} className={`relative flex flex-col md:flex-row md:items-center mb-12 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:mx-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-tamec-600 text-white font-bold z-10 relative">
                  {step.number}
                </div>
              </div>
              
              <div className="md:w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;

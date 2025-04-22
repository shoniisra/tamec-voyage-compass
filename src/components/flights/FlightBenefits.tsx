
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Check, Globe, Plane, FileText, Clock, DollarSign, Calendar, Users } from 'lucide-react';

const FlightBenefits = () => {
  const { language } = useLanguage();
  
  const benefits = [
    {
      id: 1,
      icon: <DollarSign className="h-10 w-10 text-tamec-600" />,
      title: language === 'en' ? 'Accessible & Personalized Rates' : 'Tarifas accesibles y personalizadas',
      description: language === 'en' 
        ? 'We find the best prices tailored to your needs and budget.' 
        : 'Encontramos los mejores precios adaptados a tus necesidades y presupuesto.'
    },
    {
      id: 2,
      icon: <Globe className="h-10 w-10 text-tamec-600" />,
      title: language === 'en' ? 'International Destination Network' : 'Red de destinos internacionales',
      description: language === 'en' 
        ? 'Access to flights to more than 190 countries around the world.' 
        : 'Acceso a vuelos a más de 190 países alrededor del mundo.'
    },
    {
      id: 3,
      icon: <Plane className="h-10 w-10 text-tamec-600" />,
      title: language === 'en' ? 'Easy Reservations & Flexible Changes' : 'Reservas fáciles y cambios flexibles',
      description: language === 'en' 
        ? 'Book with minimal effort and modify your trip when needed.' 
        : 'Reserva con un mínimo esfuerzo y modifica tu viaje cuando lo necesites.'
    },
    {
      id: 4,
      icon: <FileText className="h-10 w-10 text-tamec-600" />,
      title: language === 'en' ? 'Final Prices Without Hidden Charges' : 'Precios finales sin cargos ocultos',
      description: language === 'en' 
        ? 'What you see is what you pay, with all taxes and fees included.' 
        : 'Lo que ves es lo que pagas, con todos los impuestos y tasas incluidos.'
    },
    {
      id: 5,
      icon: <Check className="h-10 w-10 text-tamec-600" />,
      title: language === 'en' ? 'Online Check-in Included' : 'Check-in online incluido',
      description: language === 'en' 
        ? 'Skip the lines at the airport with our online check-in service.' 
        : 'Evita las filas en el aeropuerto con nuestro servicio de check-in online.'
    },
    {
      id: 6,
      icon: <Clock className="h-10 w-10 text-tamec-600" />,
      title: language === 'en' ? 'Flights Based on Your Schedule' : 'Vuelos según tus horarios',
      description: language === 'en' 
        ? 'Choose departure and arrival times that suit your needs.' 
        : 'Elige horarios de salida y llegada que se adapten a tus necesidades.'
    }
  ];

  return (
    <section id="flight-benefits" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-sm font-bold text-yellow-400 uppercase mb-2">
            {language === 'en' ? 'Our Benefits' : 'Nuestros Beneficios'}
          </h3>
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Why Choose Our Flight Service?' : '¿Por qué elegir nuestro servicio de vuelos?'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'We make booking flights easier, more transparent, and tailored to your needs.' 
              : 'Hacemos la reserva de vuelos más fácil, más transparente y adaptada a tus necesidades.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.id} className="p-6 border border-border hover:shadow-md transition-shadow">
              <div className="p-2 rounded-full bg-primary/10 inline-block mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlightBenefits;

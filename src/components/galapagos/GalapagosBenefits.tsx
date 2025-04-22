
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plane, Hotel, Coffee, Users, Bus, Ticket } from 'lucide-react';
import { Card } from '@/components/ui/card';

const GalapagosBenefits = () => {
  const { language } = useLanguage();

  const benefits = [
    {
      icon: <Plane className="h-8 w-8" />,
      title: language === 'en' ? 'Flights from Quito/Guayaquil' : 'Vuelos desde Quito o Guayaquil'
    },
    {
      icon: <Hotel className="h-8 w-8" />,
      title: language === 'en' ? 'Comfort or Luxury Lodging' : 'Hospedaje confort o lujo'
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: language === 'en' ? 'Full Board' : 'Alimentación completa'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: language === 'en' ? 'Certified Local Guides' : 'Guías locales certificados'
    },
    {
      icon: <Bus className="h-8 w-8" />,
      title: language === 'en' ? 'Internal Transfers' : 'Traslados internos'
    },
    {
      icon: <Ticket className="h-8 w-8" />,
      title: language === 'en' ? 'Tourist Site Tickets' : 'Entradas a sitios turísticos'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' 
              ? 'Your Galapagos Experience, at Your Own Pace' 
              : 'Tu experiencia en Galápagos, a tu ritmo'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'en'
              ? 'Whether you want a short getaway or a complete adventure, we have options for you.'
              : 'Ya sea que quieras una escapada corta o una aventura completa, tenemos opciones para ti.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 rounded-full p-3 bg-tamec-50 dark:bg-tamec-900">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-lg">{benefit.title}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalapagosBenefits;

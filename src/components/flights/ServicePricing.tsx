
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Plane, DollarSign } from 'lucide-react';

const ServicePricing = () => {
  const { language } = useLanguage();

  const pricingOptions = [
    {
      id: 1,
      icon: <Plane className="h-8 w-8 text-tamec-600" />,
      title: language === 'en' ? 'Domestic' : 'Nacional',
      price: language === 'en' ? 'From $20' : 'Desde $20',
      description: language === 'en'
        ? 'For flights within your country'
        : 'Para vuelos dentro de tu país'
    },
    {
      id: 2,
      icon: <Plane className="h-8 w-8 text-tamec-600" />,
      title: language === 'en' ? 'The Americas' : 'América',
      price: language === 'en' ? 'From $40' : 'Desde $40',
      description: language === 'en'
        ? 'For flights within North, Central, and South America'
        : 'Para vuelos dentro de América del Norte, Central y del Sur'
    },
    {
      id: 3,
      icon: <Plane className="h-8 w-8 text-tamec-600" />,
      title: language === 'en' ? 'Intercontinental' : 'Intercontinental',
      price: language === 'en' ? 'From $50' : 'Desde $50',
      description: language === 'en'
        ? 'For flights to Europe, Asia, Africa, and Oceania'
        : 'Para vuelos a Europa, Asia, África y Oceanía'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Our Service Prices' : 'Precios de nuestro servicio'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Transparent pricing for our flight booking assistance. The following rates are for our service only and do not include the actual cost of tickets.'
              : 'Precios transparentes por nuestra asistencia en la reserva de vuelos. Las siguientes tarifas son solo por nuestro servicio y no incluyen el costo real de los boletos.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingOptions.map((option) => (
            <Card key={option.id} className="relative overflow-hidden border border-border transition-all hover:shadow-lg">
              <div className="p-6">
                <div className="mb-4">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
                <div className="text-3xl font-bold text-tamec-600 mb-4">
                  {option.price}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {option.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg text-center">
          <p className="text-gray-700 dark:text-gray-200">
            <DollarSign className="inline h-5 w-5 mr-1 text-yellow-600 dark:text-yellow-400" />
            {language === 'en'
              ? 'Note: Our prices are for the search and management service, and do not include the value of the ticket.'
              : 'Nota: Nuestros precios son por el servicio de búsqueda y gestión, y no incluyen el valor del pasaje.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicePricing;

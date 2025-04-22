
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingPackages = () => {
  const { language } = useLanguage();
  
  const packages = [
    {
      id: 'basic',
      name: language === 'en' ? 'Basic Guidance' : 'Orientación Básica',
      price: language === 'en' ? '$99' : '$99',
      frequency: language === 'en' ? 'One-time' : 'Único pago',
      description: language === 'en'
        ? 'Essential guidance for those who want to manage most of the process themselves.'
        : 'Orientación esencial para aquellos que quieren gestionar la mayor parte del proceso por sí mismos.',
      features: [
        {
          text: language === 'en' ? 'Initial consultation (60 min)' : 'Consulta inicial (60 min)',
          included: true
        },
        {
          text: language === 'en' ? 'Customized document checklist' : 'Lista de documentos personalizada',
          included: true
        },
        {
          text: language === 'en' ? 'Form review (1 revision)' : 'Revisión de formularios (1 revisión)',
          included: true
        },
        {
          text: language === 'en' ? 'Basic email support' : 'Soporte básico por email',
          included: true
        },
        {
          text: language === 'en' ? 'Appointment scheduling assistance' : 'Asistencia en programación de citas',
          included: false
        },
        {
          text: language === 'en' ? 'Interview preparation' : 'Preparación para entrevista',
          included: false
        },
        {
          text: language === 'en' ? 'Form filling assistance' : 'Asistencia en llenado de formularios',
          included: false
        },
        {
          text: language === 'en' ? 'Application submission management' : 'Gestión de envío de solicitud',
          included: false
        }
      ]
    },
    {
      id: 'standard',
      name: language === 'en' ? 'Standard Package' : 'Paquete Estándar',
      price: language === 'en' ? '$249' : '$249',
      frequency: language === 'en' ? 'One-time' : 'Único pago',
      description: language === 'en'
        ? 'Comprehensive support throughout most of the visa application process.'
        : 'Apoyo integral durante la mayor parte del proceso de solicitud de visa.',
      popular: true,
      features: [
        {
          text: language === 'en' ? 'Initial consultation (90 min)' : 'Consulta inicial (90 min)',
          included: true
        },
        {
          text: language === 'en' ? 'Customized document checklist' : 'Lista de documentos personalizada',
          included: true
        },
        {
          text: language === 'en' ? 'Form review (unlimited revisions)' : 'Revisión de formularios (revisiones ilimitadas)',
          included: true
        },
        {
          text: language === 'en' ? 'Priority email and phone support' : 'Soporte prioritario por email y teléfono',
          included: true
        },
        {
          text: language === 'en' ? 'Appointment scheduling assistance' : 'Asistencia en programación de citas',
          included: true
        },
        {
          text: language === 'en' ? 'Basic interview preparation' : 'Preparación básica para entrevista',
          included: true
        },
        {
          text: language === 'en' ? 'Form filling assistance' : 'Asistencia en llenado de formularios',
          included: true
        },
        {
          text: language === 'en' ? 'Application submission management' : 'Gestión de envío de solicitud',
          included: false
        }
      ]
    },
    {
      id: 'premium',
      name: language === 'en' ? 'Premium Full Service' : 'Servicio Completo Premium',
      price: language === 'en' ? '$499' : '$499',
      frequency: language === 'en' ? 'One-time' : 'Único pago',
      description: language === 'en'
        ? 'Complete end-to-end management of your visa application with priority service.'
        : 'Gestión completa de principio a fin de tu solicitud de visa con servicio prioritario.',
      features: [
        {
          text: language === 'en' ? 'Comprehensive consultation (120 min)' : 'Consulta integral (120 min)',
          included: true
        },
        {
          text: language === 'en' ? 'Customized document checklist' : 'Lista de documentos personalizada',
          included: true
        },
        {
          text: language === 'en' ? 'Form review (unlimited revisions)' : 'Revisión de formularios (revisiones ilimitadas)',
          included: true
        },
        {
          text: language === 'en' ? '24/7 VIP email and phone support' : 'Soporte VIP por email y teléfono 24/7',
          included: true
        },
        {
          text: language === 'en' ? 'Priority appointment scheduling' : 'Programación prioritaria de citas',
          included: true
        },
        {
          text: language === 'en' ? 'Advanced interview preparation with mock interviews' : 'Preparación avanzada para entrevista con simulacros',
          included: true
        },
        {
          text: language === 'en' ? 'Complete form filling service' : 'Servicio completo de llenado de formularios',
          included: true
        },
        {
          text: language === 'en' ? 'Full application submission management' : 'Gestión completa de envío de solicitud',
          included: true
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Our Pricing Packages' : 'Nuestros Paquetes de Precios'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Choose the level of service that best fits your needs and budget. All packages can be customized for specific visa types.' 
              : 'Elige el nivel de servicio que mejor se adapte a tus necesidades y presupuesto. Todos los paquetes pueden personalizarse para tipos específicos de visa.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`border ${pkg.popular ? 'border-tamec-600 dark:border-tamec-500 shadow-lg ring-2 ring-tamec-200 dark:ring-tamec-800' : 'border-border'} relative flex flex-col h-full`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-tamec-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  {language === 'en' ? 'Most Popular' : 'Más Popular'}
                </div>
              )}
              
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">{pkg.frequency}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {pkg.description}
                </p>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-tamec-600 mr-2 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 pt-0 mt-auto">
                <Button 
                  className={`w-full ${pkg.popular ? 'bg-tamec-600 hover:bg-tamec-700' : 'bg-tamec-600/90 hover:bg-tamec-600'} text-white`}
                >
                  {language === 'en' ? 'Choose Plan' : 'Elegir Plan'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-center">
          <h3 className="text-xl font-bold mb-4">
            {language === 'en' ? 'Custom Solutions' : 'Soluciones Personalizadas'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            {language === 'en'
              ? 'Need something specific or have a complex case? Contact us for a customized solution tailored to your unique situation.'
              : '¿Necesitas algo específico o tienes un caso complejo? Contáctanos para una solución personalizada adaptada a tu situación única.'}
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            {language === 'en' ? 'Contact for Custom Quote' : 'Contactar para Cotización Personalizada'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPackages;

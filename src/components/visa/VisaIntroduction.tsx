
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Check, Clock, Shield, FileText } from 'lucide-react';

const VisaIntroduction = () => {
  const { language } = useLanguage();

  const benefits = [
    {
      id: 1,
      icon: <Check className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Extensive Experience' : 'Amplia Experiencia',
      description: language === 'en' 
        ? 'Our team has successfully processed thousands of visas with a high approval rate.'
        : 'Nuestro equipo ha procesado exitosamente miles de visas con una alta tasa de aprobación.'
    },
    {
      id: 2,
      icon: <FileText className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Personalized Support' : 'Acompañamiento Personalizado',
      description: language === 'en'
        ? 'We provide individualized attention throughout the entire process, from start to finish.'
        : 'Brindamos atención individualizada durante todo el proceso, desde el inicio hasta el final.'
    },
    {
      id: 3,
      icon: <Clock className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Time Saving' : 'Ahorro de Tiempo',
      description: language === 'en'
        ? 'Avoid mistakes and unnecessary delays with our expert guidance on your application.'
        : 'Evita errores y retrasos innecesarios con nuestra guía experta en tu solicitud.'
    },
    {
      id: 4,
      icon: <Shield className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Transparency and Clarity' : 'Transparencia y Claridad',
      description: language === 'en'
        ? 'Clear information about requirements, costs, and realistic expectations for your case.'
        : 'Información clara sobre requisitos, costos y expectativas realistas para tu caso.'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'What We Do' : 'Qué Hacemos'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'We specialize in streamlining the visa application process, offering expert guidance and support to ensure your application has the best chance of approval.'
              : 'Nos especializamos en agilizar el proceso de solicitud de visa, ofreciendo orientación y apoyo experto para asegurar que tu solicitud tenga la mejor oportunidad de aprobación.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <div className="mt-12 text-center">
          <p className="text-lg max-w-3xl mx-auto">
            {language === 'en'
              ? 'With our expert guidance, you can avoid common mistakes, save time on paperwork, and increase your chances of visa approval. We handle the complexities so you can focus on preparing for your journey.'
              : 'Con nuestra guía experta, puedes evitar errores comunes, ahorrar tiempo en papeleo y aumentar tus posibilidades de aprobación de visa. Nos encargamos de las complejidades para que puedas concentrarte en prepararte para tu viaje.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisaIntroduction;

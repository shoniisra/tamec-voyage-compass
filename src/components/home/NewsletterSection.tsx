
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const NewsletterSection = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 hero-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Ready for your next adventure?' : '¿Listo para tu próxima aventura?'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            {language === 'en'
              ? 'Schedule your first appointment at no cost and receive expert advice. We help you plan a unique trip, tailored to you and stress-free.'
              : 'Agenda tu primera cita sin costo y recibe asesoría experta. Te ayudamos a planificar un viaje único, a tu medida y sin estrés.'}
          </p>
          
          <div className="flex justify-center">
            <Button size="lg" className="bg-tamec-600 hover:bg-tamec-700 py-6 px-8">
              <Calendar className="mr-2 h-5 w-5" />
              {language === 'en' ? 'Schedule your free appointment now' : 'Agenda tu cita gratis ahora'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

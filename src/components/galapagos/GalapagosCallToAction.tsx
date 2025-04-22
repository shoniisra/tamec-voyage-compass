
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';

const GalapagosCallToAction = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-tamec-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {language === 'en' 
            ? 'Ready to discover one of the most magical places on Earth?' 
            : '¿Listo para conocer uno de los lugares más mágicos del mundo?'}
        </h2>
        
        <p className="max-w-2xl mx-auto mb-8 text-tamec-100">
          {language === 'en'
            ? 'Book your Galapagos adventure today and create memories that will last a lifetime.'
            : 'Reserva tu aventura en Galápagos hoy y crea recuerdos que durarán toda la vida.'}
        </p>
        
        <Button size="lg" className="bg-white hover:bg-tamec-50 text-tamec-600">
          <Plane className="mr-2 h-5 w-5" />
          {language === 'en' ? 'Book Your Trip Now!' : '¡Reserva tu viaje ahora!'}
        </Button>
      </div>
    </section>
  );
};

export default GalapagosCallToAction;

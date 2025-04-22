
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { CalendarDays, Send } from 'lucide-react';

const GalapagosHero = () => {
  const { language } = useLanguage();

  return (
    <div className="relative min-h-[90vh] w-full">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=2000" 
          alt="Galapagos Islands" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            {language === 'en' 
              ? 'Galapagos Like Never Before' 
              : 'Galápagos como nunca antes lo imaginaste'}
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 animate-fade-in delay-150">
            {language === 'en'
              ? 'Explore this natural paradise with our tailor-made all-inclusive packages. No worries, just pure adventure.'
              : 'Explora este paraíso natural con nuestros paquetes hechos a tu medida. Todo incluido, sin preocupaciones.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
            <Button size="lg" className="bg-tamec-600 hover:bg-tamec-700">
              <CalendarDays className="mr-2 h-5 w-5" />
              {language === 'en' ? 'See Available Dates' : 'Ver fechas disponibles'}
            </Button>
            
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Send className="mr-2 h-5 w-5" />
              {language === 'en' ? 'Get a Quote' : 'Cotiza tu viaje'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalapagosHero;

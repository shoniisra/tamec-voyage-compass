
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const VisaHero = () => {
  const { t, language } = useLanguage();

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1587743224878-71f849c10165?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Visa Processing Hero" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto h-full px-6 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-sm font-semibold uppercase tracking-wider text-yellow-400 mb-4">
            {language === 'en' ? 'Visa Processing Services' : 'Servicios de Trámite de Visas'}
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {language === 'en' 
              ? 'Expert Assistance for Your Visa Applications' 
              : 'Asistencia Experta para tus Solicitudes de Visa'}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            {language === 'en'
              ? 'We make the visa application process simple, transparent, and stress-free with our expert guidance and support at every step.'
              : 'Hacemos que el proceso de solicitud de visa sea simple, transparente y sin estrés con nuestra guía y apoyo experto en cada paso.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-tamec-600 hover:bg-tamec-700 text-white">
              {language === 'en' ? 'Schedule a Consultation' : 'Agenda una Consulta'}
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white bg-white/20 hover:bg-white/10 py-6" asChild>
              <Link to="#visa-types" className="flex items-center">
                {language === 'en' ? 'Explore Visa Types' : 'Explora Tipos de Visas'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaHero;

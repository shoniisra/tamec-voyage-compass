
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FlightHero = () => {
  const { t, language } = useLanguage();

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1500&q=80" 
          alt="Flight Service Hero" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto h-full px-6 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-sm font-semibold uppercase tracking-wider text-yellow-400 mb-4">
            {language === 'en' ? 'Flight Booking Services' : 'Servicios de Reserva de Vuelos'}
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {language === 'en' 
              ? 'Tailored Flights, Without Complications' 
              : 'Vuelos a tu medida, sin complicaciones'}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            {language === 'en'
              ? 'We find the best airfares for your trip, with personalized attention and no surprises in the price.'
              : 'Encontramos las mejores tarifas aéreas para tu viaje, con atención personalizada y sin sorpresas en el precio.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-tamec-600 hover:bg-tamec-700 text-white">
              {language === 'en' ? 'Request Your Flight' : 'Solicita tu vuelo'}
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="#flight-benefits" className="flex items-center">
                {language === 'en' ? 'Learn More' : 'Más información'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightHero;

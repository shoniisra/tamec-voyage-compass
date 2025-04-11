
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="relative h-[650px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: "url('/assets/images/hero/hero-background.webp')",
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>
      
      <div className="container mx-auto px-4 relative h-full flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-2xl animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {language === 'en' ? 'Your next trip starts with us' : 'Tu próximo viaje empieza con nosotros'}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            {language === 'en' 
              ? 'Authentic travel, human attention, and zero worries. At TAMEC, we plan every step with you, so you can just focus on living the experience.' 
              : 'Viajes auténticos, atención humana y cero preocupaciones. En TAMEC planificamos contigo cada paso, para que solo te dediques a vivir la experiencia.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-tamec-600 hover:bg-tamec-700 text-white py-6">
              <Calendar className="mr-2 h-5 w-5" />
              {language === 'en' ? 'Schedule a free meeting' : 'Agenda tu cita gratis'}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white bg-white/20 hover:bg-white/10 py-6">
              <MessageCircle className="mr-2 h-5 w-5" />
              {language === 'en' ? 'Contact us via WhatsApp' : 'Contáctanos por WhatsApp'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

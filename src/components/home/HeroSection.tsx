
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative h-[600px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80')",
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>
      
      <div className="relative container mx-auto h-full flex flex-col justify-center px-4">
        <div className="max-w-xl animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg text-white/90 mb-8">
            {t('home.hero.subtitle')}
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <div className="flex-grow">
                <Input 
                  type="text" 
                  placeholder={t('home.hero.search')}
                  className="border-gray-300 focus:ring-tamec-500"
                />
              </div>
              <Button className="bg-tamec-600 hover:bg-tamec-700">
                <Search className="mr-2 h-4 w-4" /> {t('home.hero.searchButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

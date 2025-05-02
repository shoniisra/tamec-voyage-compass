
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSwitch = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    
    // Handle URL changes for services pages
    const currentPath = location.pathname;
    let newPath = currentPath;

    // Map service pages between languages
    const pathMappings: Record<string, string> = {
      // English to Spanish
      '/en/services/visa-processing': '/es/servicios/tramite-de-visas',
      '/en/services/flights': '/es/servicios/vuelos',
      '/en/services/galapagos': '/es/servicios/galapagos',
      // Spanish to English
      '/es/servicios/tramite-de-visas': '/en/services/visa-processing',
      '/es/servicios/vuelos': '/en/services/flights',
      '/es/servicios/galapagos': '/en/services/galapagos',
      // Legacy paths (for backward compatibility)
      '/services/visa-processing': newLanguage === 'en' ? '/en/services/visa-processing' : '/es/servicios/tramite-de-visas',
      '/services/flights': newLanguage === 'en' ? '/en/services/flights' : '/es/servicios/vuelos',
      '/services/galapagos': newLanguage === 'en' ? '/en/services/galapagos' : '/es/servicios/galapagos',
    };
    
    if (pathMappings[currentPath]) {
      newPath = pathMappings[currentPath];
      navigate(newPath);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1"
      title={language === 'en' ? t('language.spanish') : t('language.english')}
    >
      <Languages size={16} />
      <span className="ml-1 hidden md:inline">{language === 'en' ? 'ES' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitch;

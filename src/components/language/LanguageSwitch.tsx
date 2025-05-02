
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
    
    // Handle URL changes for different pages
    const currentPath = location.pathname;
    let newPath = currentPath;

    // Map paths between languages
    const pathMappings: Record<string, string> = {
      // Main pages - English to Spanish
      '/en/about-us': '/es/sobre-nosotros',
      '/en/contact': '/es/contacto',
      '/en/blog': '/es/blog',
      '/en/destinations': '/es/destinos',
      
      // Service pages - English to Spanish
      '/en/services/visa-processing': '/es/servicios/tramite-de-visas',
      '/en/services/flights': '/es/servicios/vuelos',
      '/en/services/galapagos': '/es/servicios/galapagos',
      
      // Main pages - Spanish to English
      '/es/sobre-nosotros': '/en/about-us',
      '/es/contacto': '/en/contact',
      '/es/blog': '/en/blog',
      '/es/destinos': '/en/destinations',
      
      // Service pages - Spanish to English
      '/es/servicios/tramite-de-visas': '/en/services/visa-processing',
      '/es/servicios/vuelos': '/en/services/flights',
      '/es/servicios/galapagos': '/en/services/galapagos',
      
      // Legacy paths (for backward compatibility)
      '/': newLanguage === 'en' ? '/en/destinations' : '/es/destinos',
      '/about-us': newLanguage === 'en' ? '/en/about-us' : '/es/sobre-nosotros',
      '/contact': newLanguage === 'en' ? '/en/contact' : '/es/contacto',
      '/blog': newLanguage === 'en' ? '/en/blog' : '/es/blog',
      '/destinations': newLanguage === 'en' ? '/en/destinations' : '/es/destinos',
      '/services/visa-processing': newLanguage === 'en' ? '/en/services/visa-processing' : '/es/servicios/tramite-de-visas',
      '/services/flights': newLanguage === 'en' ? '/en/services/flights' : '/es/servicios/vuelos',
      '/services/galapagos': newLanguage === 'en' ? '/en/services/galapagos' : '/es/servicios/galapagos',
    };
    
    // Check for path mappings including dynamic routes
    if (pathMappings[currentPath]) {
      newPath = pathMappings[currentPath];
    } else if (currentPath.includes('/en/blog/')) {
      // Handle blog detail pages
      const slug = currentPath.split('/').pop();
      newPath = `/es/blog/${slug}`;
    } else if (currentPath.includes('/es/blog/')) {
      const slug = currentPath.split('/').pop();
      newPath = `/en/blog/${slug}`;
    } else if (currentPath.includes('/en/destinations/')) {
      // Handle destination detail pages
      const slug = currentPath.split('/').pop();
      newPath = `/es/destinos/${slug}`;
    } else if (currentPath.includes('/es/destinos/')) {
      const slug = currentPath.split('/').pop();
      newPath = `/en/destinations/${slug}`;
    }
    
    navigate(newPath);
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

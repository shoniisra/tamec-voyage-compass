
import React from 'react';
import { Button } from '@/components/common/buttons/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSwitch = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
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

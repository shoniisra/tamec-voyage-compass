
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/common/buttons/button';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{t('theme.toggle')}</span>
    </Button>
  );
}

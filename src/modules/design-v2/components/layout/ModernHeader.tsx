
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  User, 
  Settings,
  LogOut,
  Moon,
  Sun,
  Languages
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ModernHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/v2" className="flex items-center space-x-2">
            <img
              src={`/assets/images/logos/${theme === 'dark' ? 'dark' : 'light'} horizontal.png`}
              alt="TAMEC"
              className="h-8"
            />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={language === 'en' ? 'Search destinations, tours...' : 'Buscar destinos, tours...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-0 focus:bg-background h-9"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button - Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="Usuario" />
                    <AvatarFallback className="bg-tamec-100 dark:bg-tamec-900">
                      <User className="h-4 w-4 text-tamec-600" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {language === 'en' ? 'Account' : 'Cuenta'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      usuario@ejemplo.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                  {theme === 'dark' ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  {theme === 'dark' 
                    ? (language === 'en' ? 'Light Mode' : 'Modo Claro')
                    : (language === 'en' ? 'Dark Mode' : 'Modo Oscuro')
                  }
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={toggleLanguage} className="cursor-pointer">
                  <Languages className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Español' : 'English'}
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Settings' : 'Configuración'}
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Sign Out' : 'Cerrar Sesión'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModernHeader;

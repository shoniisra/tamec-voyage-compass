
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  User, 
  Menu, 
  X, 
  Bell, 
  Settings,
  Plane,
  MapPin,
  Building2,
  FileText,
  Briefcase,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/providers/ThemeProvider';
import LanguageSwitch from '@/components/language/LanguageSwitch';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();
  const { language } = useLanguage();

  const navigationItems = [
    {
      icon: <Plane className="h-4 w-4" />,
      label: language === 'en' ? 'Flights' : 'Vuelos',
      href: '/v2/flights'
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: language === 'en' ? 'Tours' : 'Tours',
      href: '/v2/tours'
    },
    {
      icon: <Building2 className="h-4 w-4" />,
      label: language === 'en' ? 'Hotels' : 'Hoteles',
      href: '/v2/hotels'
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: language === 'en' ? 'Visas' : 'Visas',
      href: '/v2/visas'
    },
    {
      icon: <Briefcase className="h-4 w-4" />,
      label: language === 'en' ? 'Jobs' : 'Empleos',
      href: '/v2/jobs'
    },
    {
      icon: <Info className="h-4 w-4" />,
      label: language === 'en' ? 'About' : 'Nosotros',
      href: '/v2/about'
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/v2" className="flex items-center space-x-2">
            <img
              src={`/assets/images/logos/${theme === 'dark' ? 'dark' : 'light'} horizontal.png`}
              alt="TAMEC"
              className="h-10"
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={language === 'en' ? 'Search destinations, tours...' : 'Buscar destinos, tours...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-0 focus:bg-background"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitch />
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            {/* Mobile Search */}
            <div className="mb-4 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={language === 'en' ? 'Search...' : 'Buscar...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-0"
                />
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-foreground hover:bg-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default ModernHeader;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Search,
  ShoppingBag,
  Plane,
  MapPin,
  Building2,
  FileText,
  Briefcase,
  Info,
  Heart,
  Clock,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Languages
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ModernSidebar = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const sidebarItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: language === 'en' ? 'Home' : 'Inicio',
      href: '/v2',
      category: 'main'
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: language === 'en' ? 'Search' : 'Buscar',
      href: '/v2/search',
      category: 'main'
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      label: language === 'en' ? 'Orders' : 'Pedidos',
      href: '/v2/orders',
      category: 'main'
    },
    {
      icon: <Plane className="h-5 w-5" />,
      label: language === 'en' ? 'Flights' : 'Vuelos',
      href: '/v2/flights',
      category: 'services'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: language === 'en' ? 'Tours' : 'Tours',
      href: '/v2/tours',
      category: 'services'
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      label: language === 'en' ? 'Hotels' : 'Hoteles',
      href: '/v2/hotels',
      category: 'services'
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: language === 'en' ? 'Visas' : 'Visas',
      href: '/v2/visas',
      category: 'services'
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: language === 'en' ? 'Favorites' : 'Favoritos',
      href: '/v2/favorites',
      category: 'personal'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: language === 'en' ? 'Recent' : 'Recientes',
      href: '/v2/recent',
      category: 'personal'
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: language === 'en' ? 'Jobs' : 'Empleos',
      href: '/v2/jobs',
      category: 'opportunities'
    },
    {
      icon: <Info className="h-5 w-5" />,
      label: language === 'en' ? 'About Us' : 'Nosotros',
      href: '/v2/about',
      category: 'company'
    }
  ];

  const categories = {
    main: language === 'en' ? 'Main' : 'Principal',
    services: language === 'en' ? 'Services' : 'Servicios',
    personal: language === 'en' ? 'Personal' : 'Personal',
    opportunities: language === 'en' ? 'Opportunities' : 'Oportunidades',
    company: language === 'en' ? 'Company' : 'Empresa'
  };

  const groupedItems = sidebarItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof sidebarItems>);

  return (
    <aside className="hidden md:block fixed left-0 top-0 h-screen w-64 bg-background border-r border-border overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Logo Section */}
        <div className="pb-4 border-b border-border">
          <Link to="/v2" className="flex items-center justify-center">
            <img
              src={`/assets/images/logos/${theme === 'dark' ? 'dark' : 'light'} horizontal.png`}
              alt="TAMEC"
              className="h-8"
            />
          </Link>
        </div>

        {/* Navigation Sections */}
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {categories[category as keyof typeof categories]}
            </h3>
            <nav className="space-y-1">
              {items.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-tamec-600 text-white shadow-lg'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}

        {/* Account Section */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {language === 'en' ? 'Account' : 'Cuenta'}
          </h3>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-3 py-2 h-auto">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="" alt="Usuario" />
                  <AvatarFallback className="bg-tamec-100 dark:bg-tamec-900">
                    <User className="h-4 w-4 text-tamec-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'My Account' : 'Mi Cuenta'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    usuario@ejemplo.com
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" forceMount>
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
    </aside>
  );
};

export default ModernSidebar;

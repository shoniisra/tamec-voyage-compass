
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Plane,
  MapPin,
  Building2,
  FileText,
  Briefcase,
  Info,
  Heart,
  Clock,
  User
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const ModernSidebar = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const sidebarItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: language === 'en' ? 'Home' : 'Inicio',
      href: '/v2',
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
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background border-r border-border overflow-y-auto">
      <div className="p-4 space-y-6">
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
      </div>
    </aside>
  );
};

export default ModernSidebar;

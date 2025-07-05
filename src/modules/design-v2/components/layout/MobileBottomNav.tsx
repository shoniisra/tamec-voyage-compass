
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const MobileBottomNav = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const navItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: language === 'en' ? 'Home' : 'Inicio',
      href: '/v2',
      id: 'home'
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: language === 'en' ? 'Search' : 'Buscar',
      href: '/v2/search',
      id: 'search'
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      label: language === 'en' ? 'Orders' : 'Pedidos',
      href: '/v2/orders',
      id: 'orders'
    },
    {
      icon: <User className="h-5 w-5" />,
      label: language === 'en' ? 'Account' : 'Cuenta',
      href: '/v2/account',
      id: 'account'
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
                          (item.id === 'home' && location.pathname.startsWith('/v2') && location.pathname.split('/').length === 2);
          
          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg transition-colors',
                isActive
                  ? 'text-tamec-600 bg-tamec-50 dark:bg-tamec-900/20'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;

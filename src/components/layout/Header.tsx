import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMobile } from '@/hooks/use-mobile';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";

function Header() {
  const { language, toggleLanguage } = useLanguage();
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Define navigation links
  const navLinks = [
    {
      label: language === 'en' ? 'Home' : 'Inicio',
      href: '/',
    },
    {
      label: language === 'en' ? 'Destinations' : 'Destinos',
      href: '/destinations',
    },
    {
      label: language === 'en' ? 'Blog' : 'Blog',
      href: '/blog',
    },
    {
      label: language === 'en' ? 'Contact' : 'Contacto',
      href: '/contact',
    },
  ];

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b",
        isScrolled ? "shadow-sm" : "border-b-transparent",
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-bold text-2xl">
          TAMEC
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 pt-6">
              <SheetHeader className="pl-6 pr-8 pb-4">
                <SheetTitle>TAMEC</SheetTitle>
                <SheetDescription>
                  {language === 'en' ? 'Menu' : 'Menú'}
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <ul className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="block px-6 py-3 hover:bg-secondary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pl-6 pr-8">
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <ModeToggle />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

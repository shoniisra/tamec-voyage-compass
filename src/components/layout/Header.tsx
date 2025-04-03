
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageSwitch from '../language/LanguageSwitch';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-tamec-600">TAMEC</span>
          <span className="ml-2 text-sm text-gray-500">Travel Agency</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-tamec-600 transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/destinations" className="text-gray-700 hover:text-tamec-600 transition-colors">
            {t('nav.destinations')}
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-tamec-600 transition-colors">
            {t('nav.blog')}
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-tamec-600 transition-colors">
            {t('nav.contact')}
          </Link>
          <Button className="bg-tamec-600 hover:bg-tamec-700 text-white">
            {t('nav.bookNow')}
          </Button>
          <LanguageSwitch />
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitch />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b animate-fade-in">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/destinations" 
              className="text-gray-700 hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.destinations')}
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <Button className="bg-tamec-600 hover:bg-tamec-700 text-white w-full">
              {t('nav.bookNow')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

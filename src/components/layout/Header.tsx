
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/common/buttons/button";
import { Menu, X, LogOut, User, Settings } from "lucide-react";
import LanguageSwitch from '../language/LanguageSwitch';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useTheme } from '@/providers/ThemeProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { user, signOut, isAdmin } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/auth');
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center">
          <img
            src={`/assets/images/logos/${theme === 'dark' ? 'dark':'light'} horizontal.png`}
            alt="TAMEC Travel Agency"
            className="h-16 w-auto"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-foreground hover:text-tamec-600 transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/destinations" className="text-foreground hover:text-tamec-600 transition-colors">
            {t('nav.destinations')}
          </Link>
          <Link to="/blog" className="text-foreground hover:text-tamec-600 transition-colors">
            {t('nav.blog')}
          </Link>
          <Link to="/contact" className="text-foreground hover:text-tamec-600 transition-colors">
            {t('nav.contact')}
          </Link>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitch />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem onClick={handleAdminDashboard} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('nav.logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLogin}>{t('nav.login')}</Button>
            )}
          </div>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
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
        <div className="md:hidden bg-background border-b animate-fade-in">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link 
              to="/" 
              className="text-foreground hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/destinations" 
              className="text-foreground hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.destinations')}
            </Link>
            <Link 
              to="/blog" 
              className="text-foreground hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            
            {user ? (
              <>
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    className="w-full flex justify-start"
                    onClick={handleAdminDashboard}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="w-full flex justify-start"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <Button 
                className="w-full"
                onClick={handleLogin}
              >
                {t('nav.login')}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

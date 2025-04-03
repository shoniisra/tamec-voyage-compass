
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            Home
          </Link>
          <Link to="/destinations" className="text-gray-700 hover:text-tamec-600 transition-colors">
            Destinations
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-tamec-600 transition-colors">
            Blog
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-tamec-600 transition-colors">
            Contact
          </Link>
          <Button className="bg-tamec-600 hover:bg-tamec-700 text-white">
            Book Now
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
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
              Home
            </Link>
            <Link 
              to="/destinations" 
              className="text-gray-700 hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-tamec-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button className="bg-tamec-600 hover:bg-tamec-700 text-white w-full">
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

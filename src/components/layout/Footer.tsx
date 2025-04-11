
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img
              src={`/assets/images/logos/dark vertical.png`}
              alt="TAMEC Travel Agency"
              className="h-24 w-auto mb-4"
            />
            <p className="text-gray-400 mb-4">
              {language === 'en' ? 'Unique travels, eternal memories.' : 'Viajes únicos, recuerdos eternos.'}
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-gray-400 hover:text-tamec-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-tamec-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://wa.me/593999778220" className="text-gray-400 hover:text-tamec-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-tamec-300 transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-400 hover:text-tamec-300 transition-colors">{t('nav.destinations')}</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-tamec-300 transition-colors">{t('nav.blog')}</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-tamec-300 transition-colors">{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.popularDestinations')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations/galapagos" className="text-gray-400 hover:text-tamec-300 transition-colors">Galápagos, Ecuador</Link>
              </li>
              <li>
                <Link to="/destinations/cancun" className="text-gray-400 hover:text-tamec-300 transition-colors">Cancún, México</Link>
              </li>
              <li>
                <Link to="/destinations/paris" className="text-gray-400 hover:text-tamec-300 transition-colors">París, Francia</Link>
              </li>
              <li>
                <Link to="/destinations/new-york" className="text-gray-400 hover:text-tamec-300 transition-colors">Nueva York, USA</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-tamec-300 flex-shrink-0" />
                <span className="text-gray-400">
                  {language === 'en' 
                    ? 'Quito, Ecuador - Francisco Ruiz & Jorge Gutiérrez Ave.'
                    : 'Quito, Ecuador - Av. Francisco Ruiz y Jorge Gutiérrez'}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-tamec-300 flex-shrink-0" />
                <span className="text-gray-400">tamecviajes@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-tamec-300 flex-shrink-0" />
                <span className="text-gray-400">+593 999778220</span>
              </li>
              <li className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-tamec-300 flex-shrink-0" />
                <span className="text-gray-400">Ecuador</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} TAMEC Travel Agency. {t('footer.rights')}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-400 hover:text-tamec-300 text-sm transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-tamec-300 text-sm transition-colors">
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

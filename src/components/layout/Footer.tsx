
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-tamec-300 mb-4">TAMEC Travel</h3>
            <p className="text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-tamec-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-tamec-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-tamec-300 transition-colors">
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
                <Link to="/destinations/bali" className="text-gray-400 hover:text-tamec-300 transition-colors">Bali, Indonesia</Link>
              </li>
              <li>
                <Link to="/destinations/santorini" className="text-gray-400 hover:text-tamec-300 transition-colors">Santorini, Greece</Link>
              </li>
              <li>
                <Link to="/destinations/kyoto" className="text-gray-400 hover:text-tamec-300 transition-colors">Kyoto, Japan</Link>
              </li>
              <li>
                <Link to="/destinations/maldives" className="text-gray-400 hover:text-tamec-300 transition-colors">Maldives</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-tamec-300" />
                <span className="text-gray-400">123 Travel Street, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-tamec-300" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-tamec-300" />
                <span className="text-gray-400">info@tamectravel.com</span>
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

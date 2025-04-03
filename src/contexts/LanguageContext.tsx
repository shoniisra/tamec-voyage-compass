
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Language } from '@/types/language';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  // Header translations
  'nav.home': {
    en: 'Home',
    es: 'Inicio'
  },
  'nav.destinations': {
    en: 'Destinations',
    es: 'Destinos'
  },
  'nav.blog': {
    en: 'Blog',
    es: 'Blog'
  },
  'nav.contact': {
    en: 'Contact',
    es: 'Contacto'
  },
  'nav.bookNow': {
    en: 'Book Now',
    es: 'Reservar Ahora'
  },
  
  // Footer translations
  'footer.description': {
    en: 'Discover the world with TAMEC Travel Agency. We offer exceptional travel experiences tailored to your needs.',
    es: 'Descubre el mundo con TAMEC Travel Agency. Ofrecemos experiencias de viaje excepcionales adaptadas a tus necesidades.'
  },
  'footer.quickLinks': {
    en: 'Quick Links',
    es: 'Enlaces Rápidos'
  },
  'footer.popularDestinations': {
    en: 'Popular Destinations',
    es: 'Destinos Populares'
  },
  'footer.contactUs': {
    en: 'Contact Us',
    es: 'Contáctanos'
  },
  'footer.terms': {
    en: 'Terms & Conditions',
    es: 'Términos y Condiciones'
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    es: 'Política de Privacidad'
  },
  'footer.rights': {
    en: 'All rights reserved.',
    es: 'Todos los derechos reservados.'
  },
  
  // Home page translations
  'home.hero.title': {
    en: 'Discover the World with TAMEC',
    es: 'Descubre el Mundo con TAMEC'
  },
  'home.hero.subtitle': {
    en: 'Extraordinary destinations and unforgettable experiences tailored just for you.',
    es: 'Destinos extraordinarios y experiencias inolvidables hechas a tu medida.'
  },
  'home.hero.search': {
    en: 'Where do you want to go?',
    es: '¿Adónde quieres ir?'
  },
  'home.hero.searchButton': {
    en: 'Search',
    es: 'Buscar'
  },
  'home.featured.title': {
    en: 'Featured Destinations',
    es: 'Destinos Destacados'
  },
  'home.featured.subtitle': {
    en: 'Explore our handpicked selection of stunning destinations around the world.',
    es: 'Explora nuestra selección de impresionantes destinos alrededor del mundo.'
  },
  'home.featured.viewAll': {
    en: 'View All Destinations',
    es: 'Ver Todos los Destinos'
  },
  'home.destinations.exploreNow': {
    en: 'Explore Now',
    es: 'Explorar Ahora'
  },
  
  // Blog page translations
  'blog.title': {
    en: 'Travel Blog',
    es: 'Blog de Viajes'
  },
  'blog.subtitle': {
    en: 'Discover travel tips, destination guides, and stories from around the world.',
    es: 'Descubre consejos de viaje, guías de destinos e historias de todo el mundo.'
  },
  'blog.readMore': {
    en: 'Read More',
    es: 'Leer Más'
  },
  
  // Contact page translations
  'contact.title': {
    en: 'Contact Us',
    es: 'Contáctanos'
  },
  'contact.subtitle': {
    en: 'Have questions or ready to plan your next adventure? Get in touch with our travel experts.',
    es: '¿Tienes preguntas o estás listo para planificar tu próxima aventura? Ponte en contacto con nuestros expertos en viajes.'
  },
  'contact.form.title': {
    en: 'Send Us a Message',
    es: 'Envíanos un Mensaje'
  },
  'contact.form.description': {
    en: 'Fill out the form below and our team will get back to you as soon as possible.',
    es: 'Completa el formulario a continuación y nuestro equipo se pondrá en contacto contigo lo antes posible.'
  },
  'contact.form.fullName': {
    en: 'Full Name',
    es: 'Nombre Completo'
  },
  'contact.form.email': {
    en: 'Email',
    es: 'Correo Electrónico'
  },
  'contact.form.subject': {
    en: 'Subject',
    es: 'Asunto'
  },
  'contact.form.message': {
    en: 'Message',
    es: 'Mensaje'
  },
  'contact.form.submit': {
    en: 'Send Message',
    es: 'Enviar Mensaje'
  },
  'contact.form.namePlaceholder': {
    en: 'John Doe',
    es: 'Juan Pérez'
  },
  'contact.form.emailPlaceholder': {
    en: 'john@example.com',
    es: 'juan@ejemplo.com'
  },
  'contact.form.subjectPlaceholder': {
    en: 'How can we help you?',
    es: '¿Cómo podemos ayudarte?'
  },
  'contact.form.messagePlaceholder': {
    en: 'Your message here...',
    es: 'Tu mensaje aquí...'
  },
  'contact.findUs': {
    en: 'Find Us',
    es: 'Encuéntranos'
  },
  
  // Language switcher
  'language.english': {
    en: 'English',
    es: 'Inglés'
  },
  'language.spanish': {
    en: 'Spanish',
    es: 'Español'
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

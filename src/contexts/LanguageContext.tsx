
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TranslationType } from '@/types/language';

type LanguageType = 'en' | 'es';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string) => string;
}

const translations: Record<LanguageType, TranslationType> = {
  en: {
    nav: {
      home: 'Home',
      destinations: 'Destinations',
      blog: 'Blog',
      contact: 'Contact',
      bookNow: 'Book Now',
      login: 'Login',
      logout: 'Logout',
    },
    home: {
      heroTitle: 'Discover the World with TAMEC Travels',
      heroSubtitle: 'Exceptional travel experiences tailored to your desires',
      exploreCta: 'Explore Destinations',
      featuredDestinations: 'Featured Destinations',
      viewAllDestinations: 'View All Destinations',
      testimonialsTitle: 'What Our Travelers Say',
      testimonialsSubtitle: 'Hear from our satisfied clients about their experiences',
      packagesTitle: 'Popular Travel Packages',
      packagesSubtitle: 'Curated travel experiences for your next adventure',
      newsletterTitle: 'Subscribe to Our Newsletter',
      newsletterSubtitle: 'Receive travel tips, exclusive offers, and inspiration',
      subscribeButton: 'Subscribe',
      emailPlaceholder: 'Your email address',
    },
    blog: {
      title: 'Our Travel Blog',
      subtitle: 'Stories, tips, and inspiration for your next journey',
      readMore: 'Read More',
      comments: 'Comments',
      commentsSectionTitle: 'Comments',
      leaveComment: 'Leave a Comment',
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      yourComment: 'Your Comment',
      submitComment: 'Post Comment',
      loadingComments: 'Loading comments...',
      noComments: 'No comments yet. Be the first to comment!',
      commentSubmitted: 'Your comment was submitted successfully!',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Have questions? Reach out to us and we\'ll be happy to help.',
      formName: 'Your Name',
      formEmail: 'Your Email',
      formSubject: 'Subject',
      formMessage: 'Message',
      formSubmit: 'Send Message',
      infoTitle: 'Get In Touch',
      infoAddressLabel: 'Address',
      infoEmailLabel: 'Email',
      infoPhoneLabel: 'Phone',
      infoSocialLabel: 'Follow Us',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      welcomeBack: 'Welcome Back',
      loginDescription: 'Enter your credentials to access your account',
      createAccount: 'Create Account',
      registerDescription: 'Sign up to join our community',
      loggingIn: 'Logging in...',
      registering: 'Creating account...',
    },
    theme: {
      light: 'Light Mode',
      dark: 'Dark Mode',
      toggle: 'Toggle theme',
    },
    footer: {
      description: 'Your trusted travel agency for unforgettable experiences and adventures around the world.',
      quickLinks: 'Quick Links',
      popularDestinations: 'Popular Destinations',
      contactUs: 'Contact Us',
      rights: 'All rights reserved.',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
    },
    language: {
      english: 'English',
      spanish: 'Spanish',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      destinations: 'Destinos',
      blog: 'Blog',
      contact: 'Contacto',
      bookNow: 'Reservar',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
    },
    home: {
      heroTitle: 'Descubre el mundo con TAMEC Viajes',
      heroSubtitle: 'Experiencias de viaje excepcionales adaptadas a tus deseos',
      exploreCta: 'Explorar Destinos',
      featuredDestinations: 'Destinos Destacados',
      viewAllDestinations: 'Ver Todos los Destinos',
      testimonialsTitle: 'Lo que dicen nuestros viajeros',
      testimonialsSubtitle: 'Escucha a nuestros clientes satisfechos sobre sus experiencias',
      packagesTitle: 'Paquetes de Viaje Populares',
      packagesSubtitle: 'Experiencias de viaje seleccionadas para tu próxima aventura',
      newsletterTitle: 'Suscríbete a nuestro boletín',
      newsletterSubtitle: 'Recibe consejos de viaje, ofertas exclusivas e inspiración',
      subscribeButton: 'Suscribirse',
      emailPlaceholder: 'Tu correo electrónico',
    },
    blog: {
      title: 'Nuestro Blog de Viajes',
      subtitle: 'Historias, consejos e inspiración para tu próximo viaje',
      readMore: 'Leer Más',
      comments: 'Comentarios',
      commentsSectionTitle: 'Comentarios',
      leaveComment: 'Dejar un Comentario',
      yourName: 'Tu Nombre',
      yourEmail: 'Tu Email',
      yourComment: 'Tu Comentario',
      submitComment: 'Publicar Comentario',
      loadingComments: 'Cargando comentarios...',
      noComments: '¡No hay comentarios todavía. Sé el primero en comentar!',
      commentSubmitted: '¡Tu comentario fue enviado con éxito!',
    },
    contact: {
      title: 'Contáctanos',
      subtitle: '¿Tienes preguntas? Comunícate con nosotros y estaremos encantados de ayudarte.',
      formName: 'Tu Nombre',
      formEmail: 'Tu Email',
      formSubject: 'Asunto',
      formMessage: 'Mensaje',
      formSubmit: 'Enviar Mensaje',
      infoTitle: 'Ponte en Contacto',
      infoAddressLabel: 'Dirección',
      infoEmailLabel: 'Email',
      infoPhoneLabel: 'Teléfono',
      infoSocialLabel: 'Síguenos',
    },
    auth: {
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      welcomeBack: 'Bienvenido de Nuevo',
      loginDescription: 'Introduce tus credenciales para acceder a tu cuenta',
      createAccount: 'Crear Cuenta',
      registerDescription: 'Regístrate para unirte a nuestra comunidad',
      loggingIn: 'Iniciando sesión...',
      registering: 'Creando cuenta...',
    },
    theme: {
      light: 'Modo Claro',
      dark: 'Modo Oscuro',
      toggle: 'Cambiar tema',
    },
    footer: {
      description: 'Tu agencia de viajes de confianza para experiencias inolvidables y aventuras alrededor del mundo.',
      quickLinks: 'Enlaces Rápidos',
      popularDestinations: 'Destinos Populares',
      contactUs: 'Contáctanos',
      rights: 'Todos los derechos reservados.',
      terms: 'Términos de Servicio',
      privacy: 'Política de Privacidad',
    },
    language: {
      english: 'Inglés',
      spanish: 'Español',
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>(localStorage.getItem('tamec-language') as LanguageType || 'en');

  useEffect(() => {
    localStorage.setItem('tamec-language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return value as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

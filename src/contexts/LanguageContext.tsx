import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Language, Translations } from "@/types/language";

type LanguageType = "en" | "es";

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  en: {
    nav: {
      home: "Home",
      destinations: "Destinations",
      services: "Services",
      about: "About Us",
      blog: "Blog",
      contact: "Contact",
      bookNow: "Book Now",
      login: "Login",
      logout: "Logout",
      visaProcessing: "Visa Processing",
      visaProcessingDesc:"Specialized assistance for all visa categories.",
      flights:"Flights",
      flightsDesc:"We find the best airfares for your trip",
      toursPrograms:"Tours & Programs",
      toursProgramsDesc:"Unique travel experiences with quality accommodations",
      galapagos:"Galápagos",
      galapagosDesc:"Discover one of the most amazing natural paradises",
      exchangePrograms:"Student Exchange Programs",
      exchangeProgramsDesc:"Educational experiences abroad that enrich your academic profile",
    },
    home: {
      hero: {
        title: "Your next trip starts with us",
        subtitle:
          "Authentic travel, human attention, and zero worries. At TAMEC, we plan every step with you, so you can just focus on living the experience.",
        search: "Where do you want to go?",
        searchButton: "Search",
      },
      differentiators: {
        title: "Our Differentiators",
        noHiddenPrices: "No hidden prices",
        noHiddenPricesDesc: "Total transparency from the first contact.",
        personalizedAttention: "Personalized attention",
        personalizedAttentionDesc:
          "We accompany you every step of the way, as if you were part of the family.",
        visaProcessing: "Visa processing",
        visaProcessingDesc:
          "Visa specialists, we advise you with real experience.",
        stressFreeTravel: "Stress-free travel",
        stressFreeTravelDesc:
          "We take care of everything: flights, accommodations, tours, insurance and more.",
      },
      whyUs: {
        title: "Why TAMEC?",
        happyClients: "Happy clients",
        destinations: "Destinations worldwide",
        visasApproved: "Visas approved",
        support: "Support before, during and after your trip",
      },
      experiences: {
        title: "Experiences you will remember for a lifetime",
        description:
          "From the most vibrant cities to the quietest beaches, we design unique trips for people who want to discover the world with excitement, safety, and warmth.",
        urbanTrips: "Urban Trips",
        natureAdventures: "Nature Adventures",
        relaxGetaways: "Relaxation Getaways",
        groupTours: "Group or Custom Tours",
      },
      services: {
        title: "Our Services",
        airfares: {
          title: "Airfares",
          features: [
            "Accessible and personalized rates",
            "International destination network",
            "Easy reservations, flexible changes",
          ],
        },
        visas: {
          title: "Visa Processing",
          features: [
            "American, Schengen, Mexican visas and more",
            "Support at every step",
            "Documentation and appointments without complications",
          ],
        },
        tours: {
          title: "Tours and Programs",
          features: [
            "3, 4, and 5-star hotels",
            "Itineraries adapted to your style",
            "Activities for all tastes",
          ],
        },
      },
      galapagos: {
        title: "Travel to Galapagos in 3 steps",
        step1: "Choose your favorite plan",
        step1Desc: "Hotels, activities, number of islands. You decide.",
        step2: "Choose the dates",
        step2Desc: "We have confirmed departures all year round.",
        step3: "Book with just $100",
        step3Desc: "Plan today and pay up to 30 days before.",
        bookNow: "Book Now",
      },
      cta: {
        title: "Ready for your next adventure?",
        description:
          "Schedule your first appointment at no cost and receive expert advice. We help you plan a unique trip, tailored to you and stress-free.",
        button: "Schedule your free appointment now",
      },
      testimonials: {
        title: "Real Testimonials",
        subtitle:
          "Hear from our satisfied customers who've experienced unforgettable journeys with TAMEC Travel.",
      },
      featuredDestinations: "Featured Destinations",
      viewAllDestinations: "View All Destinations",
      testimonialsTitle: "What Our Travelers Say",
      testimonialsSubtitle:
        "Hear from our satisfied clients about their experiences",
      packagesTitle: "Popular Travel Packages",
      packagesSubtitle: "Curated travel experiences for your next adventure",
      newsletterTitle: "Subscribe to Our Newsletter",
      newsletterSubtitle:
        "Receive travel tips, exclusive offers, and inspiration",
      subscribeButton: "Subscribe",
      emailPlaceholder: "Your email address",
    },
    blog: {
      title: "Our Travel Blog",
      subtitle: "Stories, tips, and inspiration for your next journey",
      readMore: "Read More",
      comments: "Comments",
      leaveComment: "Leave a Comment",
      name: "Your Name",
      email: "Your Email",
      comment: "Your Comment",
      namePlaceholder: "Your Name",
      emailPlaceholder: "user@email.com",
      commentPlaceholder: "Your Comment",
      postComment: "Post Comment",
      loadingComments: "Loading comments...",
      noComments: "No comments yet. Be the first to comment!",
      commentSubmitted: "Comment submitted successfully!",
      posting: "Posting...",
      searchPlaceholder: "Search articles...",
      latestStories: "Latest Travel Stories",
      latestStoriesSubtitle:
        "Discover travel tips, destination guides, and personal stories from our global adventures",
      noResults: "No articles found matching your search.",
      discoverMore: "Discover More",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Have questions? Reach out to us and we'll be happy to help.",
      form: {
        title: "Get In Touch",
        description:
          "Write us a message and we'll get back to you as soon as possible.",
        fullName: "Your Name",
        email: "Your Email",
        phone: "Phone",
        message: "Message",

        namePlaceholder: "Write your name",
        emailPlaceholder: "nombre@email.com",
        phonePlaceholder: "0987654321",
        messagePlaceholder: "Write your message",
        submit: "Send Message",
      },

      findUs: "Find Us",
    },
    auth: {
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      welcomeBack: "Welcome Back",
      loginDescription: "Enter your credentials to access your account",
      createAccount: "Create Account",
      registerDescription: "Sign up to join our community",
      loggingIn: "Logging in...",
      registering: "Creating account...",
    },
    theme: {
      light: "Light Mode",
      dark: "Dark Mode",
      toggle: "Toggle theme",
    },
    footer: {
      description:
        "Your trusted travel agency for unforgettable experiences and adventures around the world.",
      quickLinks: "Quick Links",
      popularDestinations: "Popular Destinations",
      contactUs: "Contact Us",
      rights: "All rights reserved.",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },
    language: {
      english: "English",
      spanish: "Spanish",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      destinations: "Destinos",
      blog: "Blog",
      about: "Sobre Nosotros",
      services: "Servicios",
      contact: "Contacto",
      bookNow: "Reservar",
      login: "Iniciar Sesión",
      logout: "Cerrar Sesión",
      visaProcessing: "Trámite de Visas",
      visaProcessingDesc:"Asistencia experta con toda clase de visas.",
      flights:"Vuelos Aéreos",
      flightsDesc:"Encontramos las mejores tarifas aéreas para tu viaje",
      toursPrograms:"Tours y Programas",
      toursProgramsDesc:"Experiencias de viaje únicas",
      galapagos:"Galápagos",
      galapagosDesc:"Conoce la belleza de Galápagos",
      exchangePrograms:"Programas de Intercambio Estudiantil",
      exchangeProgramsDesc:"Experiencias educativas en el extranjero",
    },
    home: {
      hero: {
        title: "Tu próximo viaje empieza con nosotros",
        subtitle:
          "Viajes auténticos, atención humana y cero preocupaciones. En TAMEC planificamos contigo cada paso, para que solo te dediques a vivir la experiencia.",
        search: "¿Dónde quieres ir?",
        searchButton: "Buscar",
      },
      differentiators: {
        title: "Nuestros Diferenciadores",
        noHiddenPrices: "Cero precios ocultos",
        noHiddenPricesDesc: "Transparencia total desde el primer contacto.",
        personalizedAttention: "Atención personalizada",
        personalizedAttentionDesc:
          "Te acompañamos en cada paso, como si fueras parte de la familia.",
        visaProcessing: "Trámite de visas",
        visaProcessingDesc:
          "Especialistas en visados, te asesoramos con experiencia real.",
        stressFreeTravel: "Viajes sin estrés",
        stressFreeTravelDesc:
          "Nos encargamos de todo: vuelos, hospedajes, tours, seguros y más.",
      },
      whyUs: {
        title: "¿Por qué TAMEC?",
        happyClients: "Clientes felices",
        destinations: "Destinos alrededor del mundo",
        visasApproved: "Visas aprobadas",
        support: "Atención antes, durante y después de tu viaje",
      },
      experiences: {
        title: "Experiencias que vas a recordar toda la vida",
        description:
          "Desde las ciudades más vibrantes hasta las playas más tranquilas, diseñamos viajes únicos para personas que quieren descubrir el mundo con emoción, seguridad y calidez.",
        urbanTrips: "Viajes urbanos",
        natureAdventures: "Aventura en la naturaleza",
        relaxGetaways: "Escapadas de relax",
        groupTours: "Tours grupales o personalizados",
      },
      services: {
        title: "Nuestros Servicios",
        airfares: {
          title: "Vuelos Aéreos",
          features: [
            "Tarifas accesibles y personalizadas",
            "Red de destinos internacionales",
            "Reservas fáciles, cambios flexibles",
          ],
        },
        visas: {
          title: "Trámite de Visas",
          features: [
            "Visa americana, Schengen, mexicana y más",
            "Acompañamiento en cada paso",
            "Documentación y turnos sin complicaciones",
          ],
        },
        tours: {
          title: "Tours y Programas",
          features: [
            "Hoteles de 3, 4 y 5 estrellas",
            "Itinerarios adaptados a tu estilo",
            "Actividades para todos los gustos",
          ],
        },
      },
      galapagos: {
        title: "Viaja a Galápagos en 3 pasos",
        step1: "Elige tu plan favorito",
        step1Desc: "Hoteles, actividades, número de islas. Tú decides.",
        step2: "Escoge las fechas",
        step2Desc: "Tenemos salidas confirmadas todo el año.",
        step3: "Reserva con solo $100",
        step3Desc: "Planifica hoy y paga hasta 30 días antes.",
        bookNow: "Reserva ahora",
      },
      cta: {
        title: "¿Listo para tu próxima aventura?",
        description:
          "Agenda tu primera cita sin costo y recibe asesoría experta. Te ayudamos a planificar un viaje único, a tu medida y sin estrés.",
        button: "Agenda tu cita gratis ahora",
      },
      testimonials: {
        title: "Testimonios reales",
        subtitle:
          "Escucha a nuestros clientes satisfechos que han experimentado viajes inolvidables con TAMEC Travel.",
      },
      featuredDestinations: "Destinos Destacados",
      viewAllDestinations: "Ver Todos los Destinos",
      testimonialsTitle: "Lo que dicen nuestros viajeros",
      testimonialsSubtitle:
        "Escucha las experiencias de nuestros clientes satisfechos",
      packagesTitle: "Paquetes de Viaje Populares",
      packagesSubtitle:
        "Experiencias de viaje seleccionadas para tu próxima aventura",
      newsletterTitle: "Suscríbete a nuestro boletín",
      newsletterSubtitle:
        "Recibe consejos de viaje, ofertas exclusivas e inspiración",
      subscribeButton: "Suscribirse",
      emailPlaceholder: "Tu correo electrónico",
    },
    blog: {
      title: "Nuestro Blog de Viajes",
      subtitle: "Historias, consejos e inspiración para tu próximo viaje",
      readMore: "Leer Más",
      comments: "Comentarios",
      leaveComment: "Deja un Comentario",
      name: "Tu Nombre",
      email: "Tu Email",
      comment: "Tu Comentario",
      namePlaceholder: "Tu Nombre",
      emailPlaceholder: "usuario@email.com",
      commentPlaceholder: "Tu Comentario",
      postComment: "Publicar Comentario",
      loadingComments: "Cargando comentarios...",
      noComments: "¡No hay comentarios aún. Sé el primero en comentar!",
      commentSubmitted: "¡Comentario publicado exitosamente!",
      posting: "Publicando...",
      searchPlaceholder: "Buscar artículos...",
      latestStories: "Últimas Historias de Viaje",
      latestStoriesSubtitle:
        "Descubre consejos de viaje, guías de destinos e historias personales de nuestras aventuras globales",
      noResults: "No se encontraron artículos que coincidan con tu búsqueda.",
      discoverMore: "Descubrir Más",
    },
    contact: {
      title: "Contáctanos",
      subtitle:
        "¿Tienes preguntas? Comunícate con nosotros y estaremos encantados de ayudarte.",
      form: {
        title: "Escríbenos un mensaje",
        description: "Envianos un mensaje y te responderemos lo antes posible.",
        fullName: "Tu Nombre",
        email: "Tu Email",
        phone: "Teléfono",
        message: "Mensaje",

        namePlaceholder: "Escribe tu nombre",
        emailPlaceholder: "nombre@email.com",
        phonePlaceholder: "0987654321",
        messagePlaceholder: "Escribe tu Mensaje",
        submit: "Enviar Mensaje",
      },

      findUs: "Encuéntranos",
    },
    auth: {
      login: "Iniciar Sesión",
      register: "Registrarse",
      email: "Correo Electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar Contraseña",
      welcomeBack: "Bienvenido de Nuevo",
      loginDescription: "Introduce tus credenciales para acceder a tu cuenta",
      createAccount: "Crear Cuenta",
      registerDescription: "Regístrate para unirte a nuestra comunidad",
      loggingIn: "Iniciando sesión...",
      registering: "Creando cuenta...",
    },
    theme: {
      light: "Modo Claro",
      dark: "Modo Oscuro",
      toggle: "Cambiar tema",
    },
    footer: {
      description:
        "Tu agencia de viajes de confianza para experiencias inolvidables y aventuras alrededor del mundo.",
      quickLinks: "Enlaces Rápidos",
      popularDestinations: "Destinos Populares",
      contactUs: "Contáctanos",
      rights: "Todos los derechos reservados.",
      terms: "Términos de Servicio",
      privacy: "Política de Privacidad",
    },
    language: {
      english: "Inglés",
      spanish: "Español",
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<LanguageType>(
    (localStorage.getItem("tamec-language") as LanguageType) || "en"
  );

  useEffect(() => {
    localStorage.setItem("tamec-language", language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value = translations[language];

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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

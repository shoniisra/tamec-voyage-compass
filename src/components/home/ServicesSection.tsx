
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Check, Plane, FileText, Map, Globe, GraduationCap } from 'lucide-react';
import { Button } from '@/components/common/buttons/button';

const ServicesSection = () => {
  const { language } = useLanguage();
  
  const services = [
    {
      id: 1,
      title: language === 'en' ? 'Visa Processing' : 'Trámite de Visas',
      description: language === 'en' 
        ? 'Expert assistance with American, Schengen, Mexican visas and more. We guide you through every step of the process.'
        : 'Asistencia experta con visas americanas, Schengen, mexicanas y más. Te guiamos en cada paso del proceso.',
      image: 'https://blob.diariodelyaqui.mx/images/2024/04/24/visa-americana-que-hacer-si-fue-aprobada-y-aun-no-te-llega-198f0ee6-focus-0-0-1479-828.webp',
      icon: <FileText className="h-6 w-6 text-tamec-600" />,
      features: [
        language === 'en' ? 'American, Schengen, Mexican visas and more' : 'Visa americana, Schengen, mexicana y más',
        language === 'en' ? 'Support at every step' : 'Acompañamiento en cada paso',
        language === 'en' ? 'Documentation and appointments without complications' : 'Documentación y turnos sin complicaciones',
      ],
      stat: {
        value: '98%',
        label: language === 'en' ? 'Visa approval rate' : 'Tasa de aprobación de visas'
      }
    },
    {
      id: 2,
      title: language === 'en' ? 'Flights' : 'Vuelos Aéreos',
      description: language === 'en'
        ? 'We find the best airfares for your trip with personalized rates and a wide network of international destinations.'
        : 'Encontramos las mejores tarifas aéreas para tu viaje con tarifas personalizadas y una amplia red de destinos internacionales.',
      image: 'https://images.unsplash.com/photo-1606768666853-403c90a981ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      icon: <Plane className="h-6 w-6 text-tamec-600" />,
      features: [
        language === 'en' ? 'Accessible and personalized rates' : 'Tarifas accesibles y personalizadas',
        language === 'en' ? 'International destination network' : 'Red de destinos internacionales',
        language === 'en' ? 'Easy reservations, flexible changes' : 'Reservas fáciles, cambios flexibles',
      ],
      stat: {
        value: '58+',
        label: language === 'en' ? 'International destinations' : 'Destinos internacionales'
      }
    },
    {
      id: 3,
      title: language === 'en' ? 'Tours & Programs' : 'Tours y Programas',
      description: language === 'en'
        ? 'Unique travel experiences with quality accommodations, personalized itineraries, and activities for all tastes.'
        : 'Experiencias de viaje únicas con hospedajes de calidad, itinerarios personalizados y actividades para todos los gustos.',
      image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      icon: <Map className="h-6 w-6 text-tamec-600" />,
      features: [
        language === 'en' ? '3, 4, and 5-star hotels' : 'Hoteles de 3, 4 y 5 estrellas',
        language === 'en' ? 'Itineraries adapted to your style' : 'Itinerarios adaptados a tu estilo',
        language === 'en' ? 'Activities for all tastes' : 'Actividades para todos los gustos',
      ],
      stat: {
        value: '1320+',
        label: language === 'en' ? 'Happy travelers' : 'Viajeros felices'
      }
    },
    {
      id: 4,
      title: language === 'en' ? 'Galapagos' : 'Galápagos',
      description: language === 'en'
        ? 'Discover one of the most amazing natural paradises in the world with our specialized Galapagos packages.'
        : 'Descubre uno de los paraísos naturales más asombrosos del mundo con nuestros paquetes especializados a Galápagos.',
      image: 'https://media.viajando.travel/p/f6c1afd28f13a4d893f2af36c93b2921/adjuntos/236/imagenes/000/745/0000745467/1200x675/smart/galapagosjpg.jpg',
      icon: <Globe className="h-6 w-6 text-tamec-600" />,
      features: [
        language === 'en' ? 'All-inclusive packages' : 'Paquetes todo incluido',
        language === 'en' ? 'Expert local guides' : 'Guías locales expertos',
        language === 'en' ? 'Unique natural experiences' : 'Experiencias naturales únicas',
      ],
      stat: {
        value: '24/7',
        label: language === 'en' ? 'Support before, during and after' : 'Soporte antes, durante y después'
      }
    },
    {
      id: 5,
      title: language === 'en' ? 'Student Exchange Programs' : 'Programas de Intercambio Estudiantil',
      description: language === 'en'
        ? 'Educational experiences abroad that enrich your academic profile and broaden your cultural horizons.'
        : 'Experiencias educativas en el extranjero que enriquecen tu perfil académico y amplían tus horizontes culturales.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      icon: <GraduationCap className="h-6 w-6 text-tamec-600" />,
      features: [
        language === 'en' ? 'Programs in top universities' : 'Programas en universidades de primer nivel',
        language === 'en' ? 'Cultural and language immersion' : 'Inmersión cultural y lingüística',
        language === 'en' ? 'Complete guidance for the application process' : 'Orientación completa para el proceso de solicitud',
      ],
      stat: {
        value: '100%',
        label: language === 'en' ? 'Student satisfaction' : 'Satisfacción de estudiantes'
      }
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-sm font-bold text-yellow-400 uppercase mb-2">
            {language === 'en' ? 'Our Services' : 'Nuestros Servicios'}
          </h3>
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Comprehensive Travel Solutions' : 'Soluciones Integrales de Viaje'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'We offer a complete range of services to make your travel experience seamless, from planning to return.' 
              : 'Ofrecemos una gama completa de servicios para hacer tu experiencia de viaje sin contratiempos, desde la planificación hasta el regreso.'}
          </p>
        </div>

        <div className="space-y-12 ">
          {services.map((service, index) => (
            <Card key={service.id} className=" bg-gray-100 dark:bg-gray-800  overflow-hidden border shadow-lg border border-gray-400 dark:border-gray-50 cursor-pointer
            transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white dark:hover:bg-gray-700">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} h-full`}>
                <div className="lg:w-1/2">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-3">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-tamec-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                    <div className="bg-tamec-600 text-white px-4 py-2 rounded-md mb-4 sm:mb-0 text-center">
                      <div className="text-2xl font-bold">{service.stat.value}</div>
                      <div className="text-sm text-tamec-100">{service.stat.label}</div>
                    </div>
                    <Button className="bg-tamec-600 hover:bg-tamec-700 text-white">
                      {language === 'en' ? 'Learn More' : 'Más Información'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className='my-16'>
          <h2 className="text-3xl font-bold text-center mb-6">
            {language === 'en' ? 'Experiences you will remember for a lifetime' : 'Experiencias que vas a recordar toda la vida'}
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12">
            {language === 'en' 
              ? 'From the most vibrant cities to the quietest beaches, we design unique trips for people who want to discover the world with excitement, safety, and warmth.' 
              : 'Desde las ciudades más vibrantes hasta las playas más tranquilas, diseñamos viajes únicos para personas que quieren descubrir el mundo con emoción, seguridad y calidez.'}
          </p>
        </div>
    </section>
  );
};

export default ServicesSection;

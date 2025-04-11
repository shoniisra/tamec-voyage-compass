
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CircleCheck, Users, FileUser, Plane } from 'lucide-react';

const FeaturedDestinations = () => {
  const { language } = useLanguage();
  
  const differentiators = [
    {
      id: 1,
      icon: <CircleCheck className="h-10 w-10 text-tamec-600" />,
      title: language === 'en' ? 'No hidden prices' : 'Cero precios ocultos',
      description: language === 'en' ? 'Total transparency from the first contact.' : 'Transparencia total desde el primer contacto.'
    },
    {
      id: 2,
      icon: <Users className="h-10 w-10 text-tamec-600" />,
      title: language === 'en' ? 'Personalized attention' : 'Atención personalizada',
      description: language === 'en' ? 'We accompany you every step of the way, as if you were part of the family.' : 'Te acompañamos en cada paso, como si fueras parte de la familia.'
    },
    {
      id: 3,
      icon: <FileUser className="h-10 w-10 text-tamec-600" />,
      title: language === 'en' ? 'Honesty' : 'Honestidad',
      description: language === 'en' ? 'Total transparency at every step: no small print, no surprises.' : 'Transparencia total en cada paso: sin letras pequeñas, sin sorpresas.'
    },
    {
      id: 4,
      icon: <Plane className="h-10 w-10 text-tamec-600" />,
      title: language === 'en' ? 'Experience' : 'Experiencia',
      description: language === 'en' ? 'We are experts in providing you with authentic, safe and memorable trips.' : 'Somos expertos en brindarte viajes auténticos, seguros y memorables.'
    }
  ];

  // Stats
  const stats = [
    {
      id: 1,
      value: '1320+',
      label: language === 'en' ? 'Happy clients' : 'Clientes felices'
    },
    {
      id: 2,
      value: '58+',
      label: language === 'en' ? 'Destinations worldwide' : 'Destinos alrededor del mundo'
    },
    {
      id: 3,
      value: '98%',
      label: language === 'en' ? 'Visas approved' : 'Visas aprobadas'
    },
    {
      id: 4,
      value: '24/7',
      label: language === 'en' ? 'Support before, during and after your trip' : 'Atención antes, durante y después de tu viaje'
    }
  ];
  
  return (
    <section className="my-16 bg-gray-50 dark:bg-transparent">
      <div className="container mx-auto px-4">
        <div >
        <h1 className="text-sm font-bold text-center text-yellow-400 uppercase">
            {language === 'en' ? 'Why TAMEC' : '¿Por qué TAMEC?'}
          </h1>
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Our Differentiators' : 'Nuestros Diferenciadores'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map(item => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-tamec-50 dark:hover:bg-gray-700 group"
              >
                <div className="flex flex-col items-center text-center cursor-default">
                  <div className="transform transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                  <h3 className="mt-4 mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Why TAMEC?' : '¿Por qué TAMEC?'}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(stat => (
              <div 
                key={stat.id} 
                className="bg-tamec-600 text-white p-8 rounded-lg text-center"
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-tamec-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div> */}
        
       
      </div>
    </section>
  );
};

export default FeaturedDestinations;

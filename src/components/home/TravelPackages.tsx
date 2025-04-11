
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, FileUser, Map, Check } from 'lucide-react';

const TravelPackages = () => {
  const { language } = useLanguage();
  
  const services = [
    {
      id: 1,
      icon: <Plane className="h-12 w-12 text-tamec-600 mb-4" />,
      title: language === 'en' ? 'Airfares' : 'Vuelos Aéreos',
      features: [
        language === 'en' ? 'Accessible and personalized rates' : 'Tarifas accesibles y personalizadas',
        language === 'en' ? 'International destination network' : 'Red de destinos internacionales',
        language === 'en' ? 'Easy reservations, flexible changes' : 'Reservas fáciles, cambios flexibles'
      ]
    },
    {
      id: 2,
      icon: <FileUser className="h-12 w-12 text-tamec-600 mb-4" />,
      title: language === 'en' ? 'Visa Processing' : 'Trámite de Visas',
      features: [
        language === 'en' ? 'American, Schengen, Mexican visas and more' : 'Visa americana, Schengen, mexicana y más',
        language === 'en' ? 'Support at every step' : 'Acompañamiento en cada paso',
        language === 'en' ? 'Documentation and appointments without complications' : 'Documentación y turnos sin complicaciones'
      ]
    },
    {
      id: 3,
      icon: <Map className="h-12 w-12 text-tamec-600 mb-4" />,
      title: language === 'en' ? 'Tours and Programs' : 'Tours y Programas',
      features: [
        language === 'en' ? '3, 4, and 5-star hotels' : 'Hoteles de 3, 4 y 5 estrellas',
        language === 'en' ? 'Itineraries adapted to your style' : 'Itinerarios adaptados a tu estilo',
        language === 'en' ? 'Activities for all tastes' : 'Actividades para todos los gustos'
      ]
    }
  ];

  const tripTypes = [
    {
      id: 1,
      name: language === 'en' ? 'Urban Trips' : 'Viajes urbanos',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 2,
      name: language === 'en' ? 'Nature Adventures' : 'Aventura en la naturaleza',
      image: 'https://images.unsplash.com/photo-1542332213-31f87c6a4428?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 3,
      name: language === 'en' ? 'Relaxation Getaways' : 'Escapadas de relax',
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 4,
      name: language === 'en' ? 'Group or Custom Tours' : 'Tours grupales o personalizados',
      image: 'https://images.unsplash.com/photo-1581688440584-8044f057df2a?auto=format&fit=crop&w=500&q=80',
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 hero-pattern">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'en' ? 'Our Services' : 'Nuestros Servicios'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map(service => (
            <Card key={service.id} className="border-0 shadow-lg h-full transition-transform hover:-translate-y-1 duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-tamec-600 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            {language === 'en' ? 'Types of Trips We Offer' : 'Tipos de Viajes que Ofrecemos'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-[25rem]">
            {tripTypes.map(type => (
              <div 
                key={type.id}
                className="rounded-lg overflow-hidden shadow-md relative group h-[25rem]"
              >
                <img 
                  src={type.image} 
                  alt={type.name} 
                  className="w-full h-[25rem] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h4 className="text-white text-xl font-semibold">{type.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-tamec-600 text-white rounded-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">
            {language === 'en' ? 'Travel to Galapagos in 3 steps' : 'Viaja a Galápagos en 3 pasos'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-white text-tamec-600 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Choose your favorite plan' : 'Elige tu plan favorito'}
              </h4>
              <p className="text-tamec-100">
                {language === 'en' ? 'Hotels, activities, number of islands. You decide.' : 'Hoteles, actividades, número de islas. Tú decides.'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white text-tamec-600 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Choose the dates' : 'Escoge las fechas'}
              </h4>
              <p className="text-tamec-100">
                {language === 'en' ? 'We have confirmed departures all year round.' : 'Tenemos salidas confirmadas todo el año.'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white text-tamec-600 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Book with just $100' : 'Reserva con solo $100'}
              </h4>
              <p className="text-tamec-100">
                {language === 'en' ? 'Plan today and pay up to 30 days before.' : 'Planifica hoy y paga hasta 30 días antes.'}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="bg-white text-tamec-600 hover:bg-tamec-50">
              {language === 'en' ? 'Book Now' : 'Reserva ahora'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelPackages;
